// Aeldari — faction rules. Resolved from the same source priority as the other
// factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex >
// Index.
//
//   Codex: Aeldari (sources/codex/xenos/aeldari_codex.pdf — image-only PDF, transcribed
//     from page renders pp101–117) → army rule (Battle Focus + Agile Manoeuvres) + 8 base
//     detachments (Warhost, Windrider Host, Spirit Conclave, Guardian Battlehost, Ghosts of
//     the Webway, Devoted of Ynnead, Seer Council, Aspect Host).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/xenos/Aeldari.pdf) → 7 extra detachments
//     (Armoured Warhost, Fateful Performance, Path of the Outcast, Twilight Flickers,
//     Serpent's Brood, Eldritch Raiders, Corsair Coterie) + Rules Updates.
//   MFM (src/data/mfm/aeldari.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the ACROBATIC `unique` tag.
//
// 15 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been folded
// into the army rule / codex detachment rules / stratagems (they are the authoritative newer
// wording) — see inline notes. Four detachments carry the ACROBATIC tag (mutually exclusive;
// `unique` field): Fateful Performance, Ghosts of the Webway, Twilight Flickers and Serpent's
// Brood.
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions); swap in
// a translated object later. Markup follows useRenderInline / RuleBlock / StratCard
// conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet lines,
// `### ` subheadings. Datasheets are a later pass (`datasheets`).

const en = {
  slug: 'aeldari',
  name: 'Aeldari',

  // Battle Focus — the army rule plus the six Agile Manoeuvres. Faction-Pack Rules Update
  // reworded the Star Engines Agile Manoeuvre (now triggers on an Advance move and grants
  // [ASSAULT] rather than extra Move) — folded in below.
  armyRule: {
    id: 'battle-focus',
    name: 'Battle Focus',
    flavor:
      'In war, as in all things, the Aeldari bring the full might of their intellect, skill and agility to bear upon the task. Coupled with their exceptional technology, this ensures they move with swiftness and grace that is impossible for the foe to match.',
    body: `If your Army Faction is **Asuryani**, at the start of the battle round, you receive a number of Battle Focus tokens based on the battle size, as shown below:
▪ **Incursion:** 2 Battle Focus tokens.
▪ **Strike Force:** 4 Battle Focus tokens.
▪ **Onslaught:** 6 Battle Focus tokens.

Each time one of the triggers shown in the Agile Manoeuvres section below occurs, you can spend one Battle Focus token to enable the relevant eligible unit to perform that Agile Manoeuvre. A unit is eligible to perform an Agile Manoeuvre if it has this ability and has not already performed an Agile Manoeuvre in the same phase. Unless otherwise stated, you cannot trigger the same Agile Manoeuvre more than once per phase. At the end of the battle round, all unspent Battle Focus tokens are lost.

### Swift as the Wind
**TRIGGER:** When an eligible unit from your army is selected to make a Normal, Advance or Fall Back move. You can trigger this Agile Manoeuvre more than once per phase (provided a different unit performs it each time).
**EFFECT:** Until the end of the phase, add 2" to the Move characteristic of models in that unit.

### Flitting Shadows
**TRIGGER:** When an eligible unit from your army is selected to make a Normal, Advance or Fall Back move, is set up on the battlefield, or declares a charge.
**EFFECT:** Until the end of the turn, enemy units cannot use the Fire Overwatch Stratagem to shoot at that unit.

### Star Engines
**TRIGGER:** When an eligible VEHICLE unit from your army is selected to make an Advance move.
**EFFECT:** Until the end of the turn, ranged weapons equipped by this unit have the [ASSAULT] ability.

### Sudden Strike
**TRIGGER:** When an eligible unit from your army is selected to fight.
**EFFECT:** Until the end of the phase, each time a model in that unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".

### Opportunity Seized
**TRIGGER:** When an enemy unit ends a Fall Back move.
**EFFECT:** One eligible unit from your army (excluding TITANIC units) that started the phase within Engagement Range of that enemy unit can make a Normal move of up to D6+1".

### Fade Back
**TRIGGER:** In your opponent's Shooting phase, just after an enemy unit has shot.
**EFFECT:** One eligible unit from your army (excluding TITANIC units) that was hit by one or more of those attacks can make a Normal move of up to D6+1".

**Disparate Paths:** When mustering your army, you can include Harlequins units in your army, even though they do not have the **Asuryani** Faction keyword. Unless otherwise stated, you cannot select Harlequins or Ynnari as your Army Faction.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'warhost',
      name: 'Warhost',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Martial Grace',
        flavor:
          'Every element of a Warhost operates with speed and efficiency, units swirling around one another in an agile storm of blades and tightly controlled ferocity. The Aeldari know precisely where they must be at any given stage of the battle plan and move with inhuman elegance that leaves their enemies reeling in their wake.',
        body: `▪ At the start of the battle round, you receive 1 additional Battle Focus token.
▪ Each time a unit from your army performs the Swift as the Wind Agile Manoeuvre, until the end of the phase, add an additional 1" to the Move characteristic of models in that unit.
▪ Each time a unit from your army performs an Agile Manoeuvre that involves rolling a D6, add 1 to the result.`,
      },
      stratagems: [
        {
          name: 'Lightning-Fast Reactions',
          sublabel: 'Warhost – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Processing events at incredible speed, these warriors easily evade attacks that would have slain any less celeritous combatants.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Asuryani unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Blitzing Firepower',
          sublabel: 'Warhost – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When unleashed in a close-ranged storm, Aeldari weapons fire can completely eradicate all life within the target zone.',
          when: 'Your Shooting phase.',
          target: 'One Asuryani unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability while targeting an enemy unit within 12". If such a weapon already has that ability, until the end of the phase, each time an attack is made with that weapon, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Skyborne Sanctuary',
          sublabel: 'Warhost – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The Aeldari excel in striking swiftly, then leaping back into the safety of their skimming transports.',
          // Faction-Pack Rules Update rewrote the Target and Effect sections.
          when: 'End of the Fight phase.',
          target: 'One unengaged Asuryani unit from your army that was eligible to fight this phase and one friendly TRANSPORT it is able to embark within.',
          effect: 'If your Asuryani unit is wholly within 6" of that TRANSPORT, it can embark within it.',
          restrictions: '',
        },
        {
          name: 'Fire and Fade',
          sublabel: 'Warhost – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Aeldari are masters of hit-and-run tactics, engaging a target with a flurry of shots before swiftly ducking back out of harm’s way.',
          when: 'Your Shooting phase, just after an Asuryani Infantry unit from your army (excluding AIRCRAFT, ASURMEN and WRAITH CONSTRUCT units) has shot.',
          target: 'That Asuryani unit.',
          effect: 'Your unit can make a Normal move of up to D6+1".',
          // Faction-Pack Rules Update rewrote the Restrictions section.
          restrictions: 'Until the end of the turn, your unit is not eligible to declare a charge or embark within a TRANSPORT.',
        },
        {
          name: 'Feigned Retreat',
          sublabel: 'Warhost – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'What appears to be a full retreat one moment is revealed as the deceptive prelude to a devastating attack the next.',
          when: 'Your Movement phase, just after an Asuryani unit from your army Falls Back.',
          target: 'That Asuryani unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Webway Tunnel',
          sublabel: 'Warhost – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'By slipping away into the ethereal confines of the Webway, Aeldari warriors can circumnavigate the foe and strike from new and unexpected quarters.',
          when: "End of your opponent's Fight phase.",
          target: 'One Asuryani Infantry unit from your army that is wholly within 9" of one or more battlefield edges.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, remove it from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Phoenix Gem',
          points: 35,
          flavor: 'Aeldari myth tells how Isha once drew down the heat of a hundred stars into a glittering gem to save Asuryan. The Phoenix Gem is the only surviving fragment of this ancient stone and retains the power to return life to the fallen.',
          body: `Asuryani model only. The first time the bearer is destroyed, remove it from play, then, at the end of the phase, roll one D6: on a 2+, set the bearer back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with its full wounds remaining.`,
        },
        {
          name: 'Timeless Strategist',
          points: 15,
          flavor: 'This ancient Aeldari war leader has commanded armies for the entire lifetimes of the younger mortal species. Their mastery of the swift, decisive and reactive strategy is second to none.',
          body: `Asuryani model only. At the start of the battle round, if the bearer is on the battlefield (or any TRANSPORT it is embarked within is on the battlefield), you receive 1 additional Battle Focus token.`,
        },
        {
          name: 'Gift of Foresight',
          points: 15,
          flavor: 'It is far easier to avoid fatal battlefield errors if one has already foreseen when they will occur and how to prevent them.',
          body: `Asuryani model only. Once per battle round, you can target the bearer's unit with the Command Re-roll Stratagem for 0CP.`,
        },
        {
          name: 'Psychic Destroyer',
          points: 30,
          flavor: 'This psyker has refined the destructive potential of their mental abilities, honing them to a fine and frighteningly lethal point.',
          body: `Asuryani Psyker model only. Add 1 to the Damage characteristic of ranged Psychic weapons equipped by the bearer.`,
        },
      ],
    },

    {
      id: 'windrider-host',
      name: 'Windrider Host',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Ride the Wind',
        flavor:
          'These hosts strike from many quarters, employing their incredible speed and agility to evade and ambush the foe at every turn.',
        body: `In the Declare Battle Formations step you can set up **Asuryani Mounted** and **Vyper** units from your army in Reserves. During the battle, such units can be set up on the battlefield as if they were arriving from Strategic Reserves. For the purposes of setting up **Asuryani Mounted** or **Vyper** units from your army on the battlefield, treat the current battle round number as being one higher than it actually is.

In addition, at the end of your opponent's turn, you can select a number of **Asuryani Mounted** or **Vyper** units from your army (excluding units within Engagement Range of one or more enemy units), then remove those units from the battlefield and place them into Strategic Reserves. The maximum number of units you can select depends on the battle size:
▪ **Incursion:** 1 unit.
▪ **Strike Force:** 2 units.
▪ **Onslaught:** 3 units.`,
      },
      stratagems: [
        {
          name: 'Death from on High',
          sublabel: 'Windrider Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Streaking suddenly down from on high, the Aeldari strike like the fall of an executioner’s blade.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Asuryani Mounted or Vyper unit from your army that was set up on the battlefield from Reserves this turn and has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, you can re-roll the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Overflight',
          sublabel: 'Windrider Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'These airborne warriors arc up and away from the ruin of their foes, already seeking fresh prey.',
          // Faction-Pack Rules Update rewrote this Stratagem (When / Target / Effect).
          when: 'End of your Shooting phase or the end of the Fight phase.',
          target: 'One Asuryani Mounted unit from your army that destroyed one or more enemy units this phase.',
          effect: 'Your unit can make a Normal move of up to 7".',
          restrictions: '',
        },
        {
          name: 'Wind of Blades',
          sublabel: 'Windrider Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Warriors such as these cannot be pinned down or held back. They hit and run at will, hammering the foe with constant fire and slashing blows.',
          when: 'Your Movement phase.',
          target: 'One Asuryani Mounted or Vyper unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back.',
          restrictions: '',
        },
        {
          name: 'Daring Riders',
          sublabel: 'Windrider Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Some of the Windrider Hosts are especially aggressive, unable to restrain the fierce joy of racing perilously close to the foe while strafing them with fire.',
          when: 'The Reinforcements step of your Movement phase.',
          target: 'One Asuryani Mounted or Vyper unit from your army in Reserves.',
          // Faction-Pack Rules Update changed the Effect's 9" to 8" (the "within 8"" clause).
          // The set-up distance is 6" per appdata (was mis-transcribed as 3").
          effect: 'Until the end of the phase, when setting up your unit on the battlefield from Reserves, it can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy units. When doing so, if your unit is set up within 8" horizontally of one or more enemy units, until the end of the turn, it is not eligible to declare a charge.',
          restrictions: '',
        },
        {
          name: 'Focused Firepower',
          sublabel: 'Windrider Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Able to analyse and assess target data at incredible speeds, these Aeldari isolate the foe’s weak spot and pour all their fire into it as they hurtle past.',
          when: 'Your Shooting phase.',
          target: 'One Asuryani Mounted or Vyper unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, improve the Armour Penetration characteristic of that attack by 1.',
          restrictions: '',
        },
        {
          name: 'Spiralling Evasion',
          sublabel: 'Windrider Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'None but the Aeldari could risk such breakneck and seemingly suicidal evasive manoeuvres to jink around incoming enemy fire.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Asuryani Mounted or Vyper unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Firstdrawn Blade',
          points: 10,
          flavor: 'Those who lead the Windrider Hosts do so from the front, embodying the first of the Swords of Vaul drawn in wrath.',
          body: `Asuryani Mounted model only. Models in the bearer's unit have the Scouts 9" ability.`,
        },
        {
          name: 'Mirage Field',
          points: 25,
          flavor: 'This field generator surrounds its bearer with contradictory sensor ghosts and split-second illusions that make them incredibly challenging to target, particularly when moving at speed.',
          body: `Asuryani Mounted model only. Each time an attack targets the bearer's unit, subtract 1 from the Hit roll.`,
        },
        {
          name: 'Seersight Strike',
          points: 15,
          flavor: 'This warrior has mastered the art of augmenting their mounted attack runs with lashing blades of focused psychic power that punch through the heaviest armour and monstrous hide to vital targets deep within.',
          body: `Asuryani Mounted Psyker model only. Psychic weapons equipped by the bearer have the [ANTI-MONSTER 2+] and [ANTI-VEHICLE 2+] abilities.`,
        },
        {
          name: 'Echoes of Ulthanesh',
          points: 20,
          flavor: 'Riding out to battle upon their skimming steed, this charismatic commander is reminiscent of the great Aeldari hero come again. The mere sight of them swooping down upon their foes inspires their warriors to remarkable feats of heroism in their turn.',
          body: `Asuryani Mounted model only. In your Command phase, roll one D6, adding 1 to the result if the bearer is not within your deployment zone, and adding an additional 1 to the result if the bearer is within your opponent's deployment zone: on a 5+, you gain 1CP.`,
        },
      ],
    },

    {
      id: 'spirit-conclave',
      name: 'Spirit Conclave',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Shepherds of the Dead',
        flavor:
          'When guided by a Spirit Conclave, the ghost warriors gain a clarity and prowess they would otherwise lack. Moreover, should the foe slay any of their precious spirit guides, the dead will surely have their vengeance.',
        body: `Each time an **Asuryani Psyker** model from your army is destroyed by an enemy unit, that enemy unit gains a Vengeful Dead token. Each time a **Wraith Construct** model from your army makes an attack that targets a unit with one or more Vengeful Dead tokens, add 1 to the Hit roll and add 1 to the Wound roll.

Asuryani Psyker models from your army have the following ability:
▪ **Spirit Guides (Aura):** While a Wraithblades, Wraithguard or Wraithlord unit from your army is within 12" of this model, that unit has the Battle Focus ability.`,
      },
      stratagems: [
        {
          name: "Seer's Eye",
          sublabel: 'Spirit Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Seeing their prey as much through the eyes of their guiding seer as with any sense of their own, the wraith constructs strike swift and true.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Aeldari Psyker model from your army and one friendly Wraith Construct unit within 12" of it that has not been selected to shoot or fight this phase.',
          effect: 'Select one enemy unit visible to your Psyker model. Until the end of the phase, each time a model in your Wraith Construct unit makes an attack that targets that enemy unit, you can ignore any or all modifiers to the Armour Penetration and/or Damage characteristics of that attack.',
          restrictions: '',
        },
        {
          name: 'Wraithbone Armour',
          sublabel: 'Spirit Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The apparent fragility of wraith constructs’ lithe bodies belies their incredible resilience.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Wraith Construct unit from your army (excluding TITANIC units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: 'Blades from Beyond',
          sublabel: 'Spirit Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Sometimes, the twinned perceptions of ghost warriors allow them to perceive — and strike at — the souls of their foes.',
          when: 'Fight phase.',
          target: 'One Wraithblades, Wraithlord or Wraithknight unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [DEVASTATING WOUNDS] ability.',
          restrictions: '',
        },
        {
          name: 'Soul Bridge',
          sublabel: 'Spirit Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'It is risky for a Spiritseer to cast their awareness so far, but aiding the dead is sometimes necessary.',
          when: 'Your Command phase.',
          target: 'One Wraithblades, Wraithguard or Wraithlord unit from your army and one Asuryani Psyker model from your army.',
          effect: 'Until the start of your next Command phase, your Wraithblades, Wraithguard or Wraithlord unit is considered to be within 12" of your Psyker model for the purposes of the Psychic Guidance and Spirit Guides abilities.',
          restrictions: '',
        },
        {
          name: 'Spirit Token',
          sublabel: 'Spirit Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'By leaving psycho-resonant wraithbone markers upon the battlefield, these warriors wreathe vital strategic locations in an aura of dread not easily overcome.',
          when: 'Start of your Movement phase.',
          target: 'One Wraithblades or Wraithguard unit from your army.',
          effect: "Select one objective marker you control that your unit is within range of. That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Crushing Strides',
          sublabel: 'Spirit Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Elegant they may be, but the weight and implacable strength of wraith constructs on the charge can smash enemies to the ground bloody and broken.',
          when: 'Your Charge phase, just after a Wraithblades, Wraithlord or Wraithknight unit from your army ends a Charge move.',
          target: 'That Wraithblades, Wraithlord or Wraithknight unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit and roll one D6 for each Wraithblades model in your unit, or roll four D6 if your unit has the Wraithlord keyword, or roll six D6 if your unit has the Wraithknight keyword: for each 3+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Light of Clarity',
          points: 30,
          flavor: 'The mind of this Spiritseer shines with psychic illumination, burning away the veils that cloud the senses of the dead.',
          body: `Spiritseer model only. In your Command phase, select one friendly Wraith Construct unit within 12" of the bearer. Until the start of your next Command phase, add 1 to the Objective Control characteristic of Infantry models in that unit and add 3 to the Objective Control characteristic of Monster models in that unit.`,
        },
        {
          name: 'Stave of Kurnous',
          points: 15,
          flavor: 'Wound about with finely inscribed myths of Kurnous, the Hunter, this wraithbone staff imbues ghost warriors with an echo of the slain god’s keen-eyed skill.',
          body: `Spiritseer model only. In your Command phase, select one friendly Wraith Construct unit within 12" of the bearer (excluding TITANIC units). Until the start of your next Command phase, each time a model in that unit makes an attack, on a Critical Wound, that attack has the [PRECISION] ability.`,
        },
        {
          name: 'Rune of Mists',
          points: 10,
          flavor: 'This rare psychic rune binds occluding psychic energies about nearby wraith constructs to baffle the foe’s senses.',
          body: `Spiritseer model only. In your Command phase, select one friendly Wraith Construct unit within 12" of the bearer. Until the start of your next Command phase, each time a ranged attack targets that unit, unless the attacking model is within 18", models in that unit have the Benefit of Cover against that attack.`,
        },
        {
          name: 'Higher Duty',
          points: 25,
          flavor: 'Knowing their crucial role in guiding the ghost warriors, this seer chooses duty over personal glory.',
          // Faction-Pack Rules Update rewrote this enhancement.
          body: `Spiritseer model only. In your opponent's Movement phase, if an enemy unit ends a move within 8" of this unit, if this unit is not within Engagement Range of one or more enemy units, this unit can make a Normal move of up to 6".`,
        },
      ],
    },

    {
      id: 'guardian-battlehost',
      name: 'Guardian Battlehost',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Defend at All Costs',
        flavor:
          'Battlehosts often deploy to protect arterial Webway gates, the world shrines of vulnerable Exodite worlds or the domes and galleries of their home craftworld; this lends their warriors an especially keen determination to protect their holdings from foes.',
        body: `Each time a **Dire Avenger**, **Guardian**, **Support Weapon** or **War Walker** model from your army makes an attack, if that model's unit and/or the target unit are within range of one or more objective markers, add 1 to the Hit roll.`,
      },
      stratagems: [
        {
          name: 'Warding Salvoes',
          sublabel: 'Guardian Battlehost – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Woe betide the foe that seeks to claim the holdings of armed and determined Asuryani.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Dire Avengers or Guardians unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit within range of one or more objective markers, you can re-roll the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Shield Nodes',
          sublabel: 'Guardian Battlehost – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Exploiting a spar of old Aeldari technology, these warriors engage the flickering ghosts of ancient defensive force fields.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Dire Avengers or Guardians unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'If your unit is within range of one or more objective markers, until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: "Vaul's Vengeance",
          sublabel: 'Guardian Battlehost – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Swift and terrible vengeance comes for those who dare strike down the warriors of the Aeldari in the form of searing heavy weapons fire.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit destroys a Dire Avengers or Guardians unit from your army.",
          target: 'One War Walkers unit from your army.',
          effect: 'After that enemy unit has finished making its attacks, your unit can shoot as if it were your Shooting phase, but when resolving those attacks, it can only target that enemy unit (and only if it is an eligible target).',
          restrictions: 'You can only use this Stratagem once per battle round.',
        },
        {
          name: 'Time to Strike',
          sublabel: 'Guardian Battlehost – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Storm Guardians train to recognise where and when their selfless aggression can best benefit their craftworld and never to miss such opportunities.',
          when: 'Your Movement phase.',
          target: 'One Storm Guardians unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the phase, each time your unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit. Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          restrictions: '',
        },
        {
          name: 'Blades of Asuryan',
          sublabel: 'Guardian Battlehost – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Asuryani martial teachings enable those wielding ranged weapons to employ them as close-quarter implements of death as well.',
          when: 'Your Shooting phase.',
          target: 'One Dire Avengers or Guardians unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [PISTOL] ability.',
          restrictions: '',
        },
        {
          name: 'Cost of Victory',
          sublabel: 'Guardian Battlehost – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'In so desperate and vital a fight, the Aeldari must accept casualties they would normally avoid and even send fresh warriors in to bolster the flagging ranks if it means victory.',
          when: "End of your opponent's Fight phase.",
          target: 'One Guardians unit from your army.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, remove it from the battlefield and place it into Strategic Reserves. When doing so, return every destroyed Guardians model to your unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: "Craftworld's Champion",
          points: 25,
          flavor: 'Appointed as the mastermind behind the defence of an entire craftworld, this warrior will hold vital ground at all costs.',
          body: `Asuryani model only. The bearer has an Objective Control characteristic of 5.`,
        },
        {
          name: 'Ethereal Pathway',
          points: 30,
          flavor: 'Knowing secret paths through the Webway, the bearer can direct warriors to outmanoeuvre the foe.',
          body: `Asuryani model only. In the Deploy Armies step, select up to two Guardians units from your army. Models in the selected units have the Infiltrators ability.`,
        },
        {
          name: 'Protector of the Paths',
          points: 20,
          flavor: 'This warrior’s knowledge of the home ground on which they fight allows them to expertly position their forces to bracket the routes of the enemy’s approach with fire.',
          body: `Asuryani model only. While the bearer is leading a Dire Avengers or Guardians unit, once per battle round, you can target the bearer's unit with the Fire Overwatch Stratagem for 0CP, and while resolving that Stratagem, hits are scored on unmodified Hit rolls of 5+, or unmodified Hit rolls of 4+ instead if the bearer's unit is within range of an objective marker you control.`,
        },
        {
          name: 'Breath of Vaul',
          points: 10,
          flavor: 'An ancient relic of Aeldari technology, this device enhances the lethality of those weapons said to channel the killing heat of Vaul’s blazing forges.',
          // Faction-Pack Rules Update rewrote this enhancement.
          body: `Asuryani model only. While the bearer is leading a Storm Guardians unit, each time you roll to determine the number of attacks made with a flamer equipped by a model in that unit, you can re-roll the result, and each time you make a Damage roll for a model equipped with a fusion gun in that unit, you can re-roll the result.`,
        },
      ],
    },

    {
      id: 'ghosts-of-the-webway',
      name: 'Ghosts of the Webway',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      unique: 'ACROBATIC',
      rule: {
        name: 'Acrobatic Onslaught',
        flavor:
          'Trying to fight the Harlequins of the Laughing God is like battling bladed smoke. They flip and bound through the enemy ranks with contemptuous ease, springing across the heads and shoulders of dumbfounded combatants, sprinting across the hulls of war engines, all the while bearing down with murderous intent upon their true intended victims.',
        body: `Each time a **Harlequins** model from your army makes a Charge move, it can move through enemy models.

**Travelling Players:**
▪ Troupe units from your army gain the **Battleline** keyword and Troupe models in those units have an Objective Control characteristic of 2.
▪ You can include up to three of each of the following models in your army: Death Jester, Shadowseer, Troupe Master.

This detachment has the **ACROBATIC** tag and cannot be taken with another **ACROBATIC** detachment.`,
      },
      stratagems: [
        {
          name: 'Staged Death',
          sublabel: 'Ghosts of the Webway – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'A feigned death and sudden, shocking return are as impactful as dismaying to the foe.',
          when: 'Any phase.',
          target: 'One Harlequins Character model from your army that was just destroyed. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'At the end of the phase, set your model back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with half of its starting number of wounds remaining.',
          restrictions: 'Each model can only be targeted with this Stratagem once per battle.',
        },
        {
          name: "Heroes' Fall",
          sublabel: 'Ghosts of the Webway – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Though they may be slain, this step of the saedath calls on the players to act out the demise of tragic heroes who take their enemies with them to death.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Harlequins unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6. On a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Mocking Flight',
          sublabel: 'Ghosts of the Webway – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Harlequins tumble away in mock terror and panic before spinning back into the fight with cruel laughter and redoubled fury.',
          when: 'Your Movement phase, just after a Harlequins unit from your army Falls Back.',
          target: 'That Harlequins unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: "Tricksters' Retort",
          sublabel: 'Ghosts of the Webway – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'To the Harlequins, the foe are simply unwitting dance partners, their every move matched with graceful aplomb.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update changed the Target's 9" to 8".
          target: 'One Troupe unit from your army that is within 8" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Bloody Dance',
          sublabel: 'Ghosts of the Webway – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Enemies goaded into following the steps of the saedath come unwittingly on cue to their executions.',
          when: "End of your opponent's Charge phase.",
          target: 'One Harlequins Infantry or Harlequins Mounted unit from your army that is within 6" of one or more enemy units and would be eligible to declare a charge against one or more of those enemy units if it were your Charge phase.',
          effect: 'Your unit now declares a charge that only targets one or more of those enemy units, and you resolve that charge.',
          restrictions: 'Note that even if this charge is successful, your unit does not receive any Charge bonus this turn.',
        },
        {
          name: 'Exit the Stage',
          sublabel: 'Ghosts of the Webway – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Players know when to fade back from the stage of war, ready to strike again when their moment comes.',
          when: "End of your opponent's Fight phase.",
          target: 'One Harlequins unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: "Cegorach's Coil",
          points: 25,
          flavor: 'This vicious monofilament lariat unspools from its wielder’s gauntlet in a heartbeat, lashing through the foe before retracting as they tumble into bloody chunks.',
          body: `Troupe Master model only. Each time the bearer's unit ends a Charge move, select one enemy unit within Engagement Range of the bearer's unit, then roll one D6 for each model in the bearer's unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).`,
        },
        {
          name: 'Mask of Secrets',
          points: 15,
          flavor: 'So terrifying and yet so captivating are the shifting aspects of this Harlequin’s psychoreactive mask that they can hypnotise foes or stop their hearts with fear.',
          body: `Harlequins model only. Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearer's unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.`,
        },
        {
          name: "Murder's Jest",
          points: 20,
          flavor: 'This malevolent shrieker cannon catalyses its victims’ fear impulses into exaggerated bioelectric shocks, forcing them to scare themselves to death.',
          body: `Death Jester model only. Each time the bearer makes an attack that targets a unit that is Below Half-strength, each successful Hit roll scores a Critical Hit.`,
        },
        {
          name: 'Mistweave',
          points: 15,
          flavor: 'Employing their psychic powers of illusion and obfuscation, this Shadowseer can cause their comrades to vanish from the foe’s perceptions.',
          body: `Shadowseer model only. While the bearer is leading a unit, models in that unit have the Infiltrators ability.`,
        },
      ],
    },

    {
      id: 'devoted-of-ynnead',
      name: 'Devoted of Ynnead',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Strength from Death',
        flavor:
          'Surrounded by the slaughter on the battlefield, the Ynnari channel the sinister supernatural gifts of Ynnead to great effect.',
        // Faction-Pack Rules Update rewrote Lethal Intent and Lethal Surge.
        body: `You can use the following rules:

### Lethal Intent
At the end of your opponent's Shooting phase, if one or more **Ynnari** units from your army were destroyed this phase, select one **Ynnari Infantry** or **Ynnari Mounted** unit from your army that was within 6" of your destroyed unit. That unit can make a Normal move of up to D6+1".

### Lethal Surge
Once per turn, when a **Ynnari** unit from your army performs the Fade Back Agile Manoeuvre, it can make a surge move of up to D6+1" instead of a Normal move.

### Lethal Reprisal
At the start of the Fight phase, select one **Ynnari** unit from your army (excluding TITANIC units) that is below its Starting Strength. Until the end of the phase, that unit has the Fights First ability.

**Servants of the Whispering God:**
▪ You can include **Ynnari** units in your army, even though they do not have the **Asuryani** Faction keyword.
▪ **Asuryani** units (excluding **Epic Heroes**) from your army gain the **Ynnari** keyword.
▪ You must include Yvraine and/or The Yncarne in your army, and one of those models must be your **Warlord**.`,
      },
      stratagems: [
        {
          name: 'Pall of Dread',
          sublabel: 'Devoted of Ynnead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Even after they fall, the most fervent Ynnari leave a sinister sense of watchfulness in their wake like some invisible death shroud.',
          when: 'Any phase.',
          target: 'One Ynnari unit from your army that was just destroyed while it was within range of one or more objective markers you controlled at the end of the previous phase. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: "Select one of those objective markers. That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Macabre Resilience',
          sublabel: 'Devoted of Ynnead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Such is the conviction and power of the Ynnari that sometimes even mortal wounds cannot slow them.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Ynnari Infantry or Ynnari Mounted unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Emissaries of Ynnead',
          sublabel: 'Devoted of Ynnead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Immersed in murder and gripped by holy purpose, these warriors bring Ynnead’s fatal message and his final gift to all who face them.',
          when: 'Fight phase, just after a Ynnari Infantry unit from your army has selected its targets.',
          target: 'That Ynnari Infantry unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1. If your unit is below its Starting Strength, you can re-roll the Hit roll instead.',
          restrictions: '',
        },
        {
          name: 'Parting the Veil',
          sublabel: 'Devoted of Ynnead – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'In the moment of transcendent glory, before the Ynnari give their essence to their god, they fight harder than ever to take the foe with them to death.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Ynnari unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Soulsight',
          sublabel: 'Devoted of Ynnead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Perceiving the flickering soulstuff of their foes, the Ynnari strike with ruthless precision.',
          when: 'Your Shooting phase.',
          target: 'One Ynnari unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] and [IGNORES COVER] abilities.',
          restrictions: '',
        },
        {
          name: 'Death Answers Death',
          sublabel: 'Devoted of Ynnead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'As the foe slays their warriors, a terrible vigour grips the Ynnari and compels them to repay the slaughter in kind.',
          when: "End of your opponent's Shooting phase.",
          target: 'One Ynnari unit from your army (excluding WRAITH CONSTRUCT units), if one or more models in that unit were destroyed this phase.',
          effect: 'Your unit can shoot as if it were your Shooting phase.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Gaze of Ynnead',
          points: 15,
          flavor: 'This psychic executioner projects the extinguishing will of the Aeldari death god into the minds of the foe, reducing them to ashen grey husks in moments.',
          body: `Farseer model only. The bearer's Eldritch Storm weapon has the [DEVASTATING WOUNDS] ability.`,
        },
        {
          name: 'Storm of Whispers',
          points: 10,
          flavor: 'As though this Warlock were a conduit to the realm of the unquiet dead, they are surrounded by an endless susurrus that chills the foe with terror.',
          body: `Warlock model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test.`,
        },
        {
          name: 'Borrowed Vigour',
          points: 10,
          flavor: 'This cruel warrior steals a portion of animus from each vanquished foe, keeping a little of Ynnead’s due to empower themselves and slay more foes in his name.',
          body: `Archon model only. Add 2 to the Attacks characteristic of the bearer's melee weapons.`,
        },
        {
          name: 'Morbid Might',
          points: 15,
          flavor: 'Driven to new heights of cold fury and icy strength by the death energies flowing through their sinews, this arena champion fights with supernatural vigour.',
          body: `Succubus model only. Each time the bearer makes a melee attack, you can re-roll the Wound roll.`,
        },
      ],
    },

    {
      id: 'seer-council',
      name: 'Seer Council',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Strands of Fate',
        flavor:
          'Though future sight is not a precise art, the Aeldari seers excel in its craft. Having read the strands of fate that twine and branch through the upcoming battle, they direct events down their favoured paths at the most opportune moments.',
        body: `At the start of the first battle round, you generate Fate dice by rolling a number of D6 based on the battle size, as shown below. Keep your Fate dice to one side — this is your Fate dice pool.
▪ **Incursion:** 3 D6.
▪ **Strike Force:** 6 D6.
▪ **Onslaught:** 9 D6.

Each time you use one of the Stratagems opposite, if your Fate dice pool contains one or more Fate dice showing the corresponding value in the table below, you can discard one of those corresponding Fate dice. If you do, reduce the CP cost of that usage of that Stratagem by 1CP:
▪ **Presentiment of Dread** — Fate dice value **1**.
▪ **Forewarned** — Fate dice value **2**.
▪ **Unshrouded Truth** — Fate dice value **3**.
▪ **Fate Inescapable** — Fate dice value **4**.
▪ **Isha's Fury** — Fate dice value **5**.
▪ **Psychic Shield** — Fate dice value **6**.`,
      },
      stratagems: [
        {
          name: 'Presentiment of Dread',
          sublabel: 'Seer Council – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The seer plucks fate to find the foe suffering a horrible death, then projects it into their minds.',
          when: 'Command phase.',
          target: 'One Asuryani Psyker model from your army.',
          effect: 'Select one enemy unit within 18" of and visible to your model. That enemy unit must take a Battle-shock test, subtracting 1 from that test.',
          restrictions: '',
        },
        {
          name: 'Forewarned',
          sublabel: 'Seer Council – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Having foreseen already how this fight will play out, the seer projects their insights and warnings into the minds of the Aeldari who must fight it.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Asuryani Infantry unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unit's attacks and is within 9\" of one or more friendly Asuryani Psyker models.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll and subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Unshrouded Truth',
          sublabel: 'Seer Council – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Dispelling the psychosomatic mirage that has so far beguiled and assailed the foe, the seer reveals the true location of the warriors it was masquerading as.',
          when: 'Your Movement phase.',
          // Faction-Pack Rules Update rewrote the Target and Effect sections (errata): the target
          // range is 9" and the effect now moves the unit via strategic reserves + ingress.
          target: 'One Asuryani Infantry unit from your army (excluding WRAITH CONSTRUCT units) that has not been selected to move this phase, was not set up on the battlefield this phase, and is within 9" of one or more friendly Asuryani Psyker models.',
          effect: `▪ Place your unit in strategic reserves.
▪ Your unit has Deep Strike.
▪ Your unit must make an ingress move this phase.`,
          restrictions: 'Until the end of the phase, your unit is not eligible to be selected to move.',
        },
        {
          name: 'Fate Inescapable',
          sublabel: 'Seer Council – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Aeldari have already seen how best to lay low this enemy and strike in the sure knowledge the foe cannot evade their terrible fate.',
          when: 'Your Shooting phase.',
          target: 'One Asuryani Infantry unit from your army (excluding WRAITH CONSTRUCT units) that has not been selected to shoot this phase and is within 9" of one or more friendly Asuryani Psyker models.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability and each time a model in your unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.',
          restrictions: '',
        },
        {
          name: "Isha's Fury",
          sublabel: 'Seer Council – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Leaping from the seer’s outstretched hand, this blast of empyric energy is a raw expression of the sorrow and bitterness suffered by the Aeldari people.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Asuryani Psyker model from your army within 9" of that enemy unit.',
          effect: 'Roll six D6: for each 3+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
        {
          name: 'Psychic Shield',
          sublabel: 'Seer Council – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'A twist of the seer’s psychic powers raises a whirling shield of empyric energy and psychokinetic debris to screen the Aeldari from enemy fire.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Asuryani Infantry unit from your army (excluding WRAITH CONSTRUCT units) that was selected as the target of one or more of the attacking unit's attacks and is within 9\" of one or more friendly Asuryani Psyker models.",
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Lucid Eye',
          points: 30,
          flavor: 'This helm houses a psychocrystalline weave that aids the wearer in sifting clarity and truth from the myriad ghosts of unrealised futures.',
          body: `Asuryani Psyker model only. In your Command phase, you can add 1 to or subtract 1 from the value of one Fate dice in your Fate dice pool.`,
        },
        {
          name: 'Runes of Warding',
          points: 25,
          flavor: 'These precisely crafted runic wards hold harmful empyric energies and predatory entities at bay, protecting the bearer’s mind and soul.',
          body: `Asuryani Psyker model only. Models in the bearer's unit have the Feel No Pain 4+ ability against mortal wounds, Psychic Attacks and Critical Wounds caused by attacks with the [DEVASTATING WOUNDS] ability.`,
        },
        {
          name: 'Stone of Eldritch Fury',
          points: 15,
          flavor: 'This ancient gem was recovered from the crone world of Lleghaine and is said to resonate with the rage of that dead world’s ghosts. It acts as a magnifying lens for destructive psychic powers.',
          body: `Asuryani Psyker model only. Add 12" to the Range characteristic of ranged Psychic weapons equipped by the bearer.`,
        },
        {
          name: 'Torc of Morai-Heg',
          points: 20,
          flavor: 'Waves of malevolent energies roll from this article of warrior jewellery. Though they leave Aeldari systems and minds untouched, they cloud the enemy’s thoughts with doubt, lace their communications with mournful wails and scatter confusing sensor ghosts across their instruments.',
          body: `Asuryani Psyker model only. Once per turn, when your opponent targets a unit from their army within 12" of the bearer with a Stratagem, the bearer can use this Enhancement. If it does, increase the CP cost of that usage of that Stratagem by 1CP.`,
        },
      ],
    },

    {
      id: 'aspect-host',
      name: 'Aspect Host',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Path of the Warrior',
        flavor:
          'The teachings of Khaine’s martial aspects are diverse and highly specialised, each completely lethal in its own nuanced fashion.',
        body: `Each time an **Aspect Warriors** or **Avatar of Khaine** unit from your army is selected to shoot or fight, select one of the following abilities for it to gain until the end of the phase:
▪ Each time a model in this unit makes an attack, re-roll a Hit roll of 1.
▪ Each time a model in this unit makes an attack, re-roll a Wound roll of 1.`,
      },
      stratagems: [
        {
          name: 'Warrior Focus',
          sublabel: 'Aspect Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'So absolute is the focus of these warriors in battle that nothing can distract them or stay their blows.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Aspect Warriors or Avatar of Khaine unit from your army that has not been selected to shoot or fight this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes an attack, you can ignore any or all modifiers to that attack's Ballistic Skill, Weapon Skill, Strength, Armour Penetration and Damage characteristics and/or any or all modifiers to the Hit roll.",
          restrictions: '',
        },
        {
          name: 'To Their Final Breath',
          sublabel: 'Aspect Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'As champions and defenders of a dying race, these warriors fight furiously to the very end.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Aspect Warriors or Avatar of Khaine unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Each time you use this Stratagem, you can remove one Aspect Shrine token your unit has (see datasheets). Then, until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if you removed an Aspect Shrine token during this usage of this Stratagem. On a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Skyborne Sanctuary',
          sublabel: 'Aspect Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The Aeldari excel in striking swiftly then leaping back into the safety of their skimming transports.',
          // Faction-Pack Rules Update rewrote the Target and Effect sections.
          when: 'End of the Fight phase.',
          target: 'One unengaged Asuryani unit from your army that was eligible to fight this phase, and one friendly TRANSPORT it is able to embark within.',
          effect: 'If your Asuryani unit is wholly within 6" of that TRANSPORT, it can embark within it.',
          restrictions: '',
        },
        {
          name: 'Doom Inescapable',
          sublabel: 'Aspect Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Cast with the force of a thunderbolt, the Avatar’s weapon strikes the foe with meteoric force.',
          when: 'Your Shooting phase.',
          target: 'One Avatar of Khaine model from your army that has not been selected to shoot this phase.',
          effect: "Until the end of the phase, your model's Wailing Doom ranged weapon has a Range characteristic of 18\" and a Damage characteristic of 8.",
          restrictions: '',
        },
        {
          name: 'Preternatural Precision',
          sublabel: 'Aspect Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Analysing their targets’ weaknesses with incredible skill, the Aeldari fire for lethal effect.',
          when: 'Your Shooting phase.',
          target: 'One Aspect Warriors unit from your army that has not been selected to shoot this phase.',
          effect: 'Each time you use this Stratagem, you can remove one Aspect Shrine token your unit has (see datasheets). Then, select one of the following abilities, or select two of the following abilities if you removed an Aspect Shrine token during this usage of this Stratagem: [IGNORES COVER], [LETHAL HITS], [SUSTAINED HITS 1]. Until the end of the phase, ranged weapons equipped by models in your unit have the selected abilities.',
          restrictions: '',
        },
        {
          name: "Khaine's Vengeance",
          sublabel: 'Aspect Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Embodying the rage of Khaine himself, these warriors press home their attack and strike down those cowards who seek to flee their fury.',
          when: "Your opponent's Movement phase, just after an enemy unit (excluding MONSTERS and VEHICLES) is selected to Fall Back.",
          target: 'One Aspect Warriors or Avatar of Khaine unit from your army that is within Engagement Range of that enemy unit.',
          effect: 'All models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Aspect of Murder',
          points: 15,
          flavor: 'Khaine is a murderous deity, and many of his aspects channel this element of his nature to some degree. Combining these teachings renders this warrior a truly fearsome assassin.',
          body: `Autarch or Autarch Wayleaper model only. Add 1 to the Damage characteristic of melee weapons equipped by the bearer, and those weapons have the [PRECISION] ability.`,
        },
        {
          name: 'Mantle of Wisdom',
          points: 20,
          flavor: 'This ritual relic marks the bearer out as one who has walked the Path of Command for ages untold and whose understanding of all things martial borders on the preternatural.',
          body: `Autarch or Autarch Wayleaper model only. While the bearer is leading an Aspect Warriors unit, each time that unit is selected to shoot or fight, until the end of the phase, models in that unit gain both of the abilities from the Path of the Warrior Detachment rule.`,
        },
        {
          name: 'Shimmerstone',
          points: 10,
          flavor: 'This simple and elegant gem conceals complex technology based on Dire Avenger shimmershields, its protective aegis extending across the bearer and those who fight at their side.',
          body: `Autarch or Autarch Wayleaper model only. While the bearer is leading an Aspect Warriors unit, each time a ranged attack targets that unit, subtract 1 from the Wound roll.`,
        },
        {
          name: 'Strategic Savant',
          points: 10,
          flavor: 'A commander who knows with absolute certainty which strategic goals must be achieved, this warrior can appraise the battlefield at a glance.',
          body: `Autarch or Autarch Wayleaper model only. While the bearer is leading an Aspect Warriors unit, add 1 to the Objective Control characteristic of models in that unit.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'armoured-warhost',
      name: 'Armoured Warhost',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Skilled Crews',
        flavor:
          "Asuryani vehicle crews are amongst the galaxy's most naturally gifted pilots and gunners. They can coax every last iota of performance from the formidable machines and weapon systems under their control.",
        body: `Friendly AELDARI VEHICLE units' ranged attacks have [ASSAULT].`,
      },
      stratagems: [
        {
          name: 'Layered Wards',
          sublabel: 'Armoured Warhost – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The wraithbone superstructure of this vehicle has been interlaced with warding runes, enabling its hull to resist incoming fire.',
          when: 'Any phase, when a friendly AELDARI VEHICLE unit suffers a mortal wound.',
          target: 'That AELDARI VEHICLE unit.',
          effect: 'Your unit has Feel No Pain 5+ against mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Soulsight',
          sublabel: 'Armoured Warhost – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Spirit stones containing the souls of gifted seers have been embedded into this vehicle’s targeting matrices. The essences within lend guidance even in death.',
          when: 'Your Shooting phase, when a friendly AELDARI VEHICLE unit is selected to shoot.',
          target: 'That AELDARI VEHICLE unit.',
          effect: `Your unit's attacks can re-roll:
▪ One Hit roll.
▪ One Wound roll.
▪ One Damage roll.`,
          restrictions: '',
        },
        {
          name: 'Vectored Engines',
          sublabel: 'Armoured Warhost – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The result of exquisite and ingenious Aeldari engineering, vectored engines enable grav vehicles to evade their enemies while maintaining accurate fire.',
          when: 'Your Movement phase, when a friendly AELDARI VEHICLE unit makes a Fall Back move.',
          target: 'That AELDARI VEHICLE unit.',
          effect: 'That move does not prevent your unit from being eligible to shoot.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Spirit Stone of Raelyth',
          points: 20,
          flavor: 'This spirit stone contains the essence of Bonesinger Raelyth. Those Asuryani psykers who bear this item to battle can draw upon the fallen artisan’s talents.',
          body: `AELDARI PSYKER model only.
▪ While this model is within 3" of a friendly AELDARI VEHICLE unit, this model has Lone Operative.
▪ In your Movement phase, at the start or end of this unit's move, you can select one friendly AELDARI VEHICLE model within 3" of this model. That VEHICLE model heals D3 wounds.`,
        },
        {
          name: 'Guiding Presence',
          points: 25,
          flavor: 'This seer is closely attuned to their craftworld’s vehicles. Communicating with the souls inhabiting hull-mounted spirit stones can sharpen the tactical awareness of spirits and crew.',
          body: `AELDARI PSYKER model only. At the start of your Shooting phase, select one visible friendly AELDARI VEHICLE unit within 6" of this model. That VEHICLE unit's ranged attacks have +1 to Hit rolls.`,
        },
      ],
    },

    {
      id: 'fateful-performance',
      name: 'Fateful Performance',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Disruption',
      unique: 'ACROBATIC',
      rule: {
        name: 'Acrobatic Onslaught',
        flavor:
          'Trying to fight the Harlequins of the Laughing God is like battling bladed smoke. They flip and bound through the enemy ranks with contemptuous ease, springing across the heads and shoulders of dumbfounded combatants, sprinting across the hulls of war engines, all the while bearing down with murderous intent upon their true intended victims.',
        body: `While a friendly **HARLEQUINS** unit is making a Charge move, that unit can move through enemy models.

This detachment has the **ACROBATIC** tag and cannot be taken with another **ACROBATIC** detachment.`,
      },
      stratagems: [
        {
          name: "Heroes' Fall",
          sublabel: 'Fateful Performance – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Though they may be slain, this step of the saedath calls on the players to act out the demise of tragic heroes who take their enemies with them to death.',
          when: 'Fight phase, when an enemy unit targets a friendly HARLEQUINS unit.',
          target: 'That HARLEQUINS unit.',
          effect: 'When a model in your unit is destroyed, if your unit has not been selected to fight this phase, roll one D6: on a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.',
          restrictions: '',
        },
        {
          name: 'Exit the Stage',
          sublabel: 'Fateful Performance – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Players know when to fade back from the stage of war, ready to strike again when their moment comes.',
          when: "End of your opponent's Fight phase.",
          target: 'One friendly unengaged HARLEQUINS unit.',
          effect: 'Place your unit in Strategic Reserves.',
          restrictions: '',
        },
        {
          name: 'Deceptive Feint',
          sublabel: 'Fateful Performance – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Advancing foes assured of cutting the Harlequins down are often left thwarted with naught but a swirl of holofield shards where their prey once stood.',
          when: "Your opponent's Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged HARLEQUINS INFANTRY unit.",
          target: 'That HARLEQUINS INFANTRY unit.',
          effect: 'Your unit can make a Normal move of up to D3+3".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'A Foot in the Future',
          points: 15,
          flavor: 'Flowing like starlight across the field of battle, this warrior-artiste leads their chorus in a dance whose speed peaks as they surge into the foe.',
          body: `TROUPE MASTER model only. This unit can re-roll Charge rolls.`,
        },
        {
          name: 'Mistweave',
          points: 20,
          flavor: 'Employing their psychic powers of illusion and obfuscation, this Shadowseer can cause their comrades to vanish from the foe’s perceptions.',
          body: `SHADOWSEER model only. This unit has Infiltrators.`,
        },
      ],
    },

    {
      id: 'path-of-the-outcast',
      name: 'Path of the Outcast',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Far-Reaching Doom',
        flavor:
          'With snipers’ instincts and psychoresponsive gunsights, the Asuryani frontier scouts can pierce almost any barrier to find the hearts of their targets.',
        body: `When a friendly **RANGERS**/**SHROUD RUNNERS** unit is selected to shoot, enemy units have +6" detection range until that friendly unit has shot.`,
      },
      stratagems: [
        {
          name: 'Eldritch Suppression',
          sublabel: 'Path of the Outcast – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Struck by a sudden volley of precision shots when no foe can be pinpointed can shake the resolve of the most stoic warriors.',
          when: 'Your Shooting phase, when a friendly RANGERS/SHROUD RUNNERS unit has shot.',
          target: 'That RANGERS/SHROUD RUNNERS unit.',
          effect: 'Select one enemy unit hit by those ranged attacks. That enemy unit makes a Battle-shock roll, with -1 to that Battle-shock roll if a model in that enemy unit was destroyed by those attacks.',
          restrictions: '',
        },
        {
          name: 'Casting Back the Veil',
          sublabel: 'Path of the Outcast – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Once these snipers have found their range to a shrouded foe with marksmen’s instincts and esoteric targeting technology, they swiftly pass this knowledge onto their allies.',
          when: 'Your Shooting phase, when a friendly RANGERS/SHROUD RUNNERS unit has shot.',
          target: 'That RANGERS/SHROUD RUNNERS unit.',
          effect: 'Select one enemy unit hit by those ranged attacks. That enemy unit has +6" detection range.',
          restrictions: '',
        },
        {
          name: 'Nomads of the Hidden Way',
          sublabel: 'Path of the Outcast – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The unconstrained nomadism of a craftworld’s outcasts extends to the battlefield, such that few foes can respond before they melt back into hiding to hunt elsewhere.',
          when: 'Your Shooting phase, when a friendly RANGERS/SHROUD RUNNERS unit has shot.',
          target: 'That RANGERS/SHROUD RUNNERS unit.',
          effect: `▪ Your unit can make a Normal move of up to D6".
▪ Your unit is not eligible to declare a charge or embark within a TRANSPORT until the end of the turn.`,
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Camouflaged Snipers',
          points: 10,
          upgrade: true,
          flavor: 'Aeldari Rangers rely upon fieldcraft and marksmanship to defeat their foes. They conceal themselves so expertly that even the act of firing upon the enemy does not reveal their precise location.',
          body: `RANGERS unit only. This unit's ranged attacks do not prevent this unit from being hidden.`,
        },
        {
          name: "Assassins' Eye",
          points: 15,
          upgrade: true,
          flavor: 'Having trodden the Path of the Outcast for so long that they risk becoming trapped upon it, these snipers have honed their talents until they can pinpoint eye lenses, armour seals and other weaknesses to fell the toughest foes.',
          body: `RANGERS/SHROUD RUNNERS unit only. This unit's ranged attacks that target a CHARACTER unit have +1 AP.`,
        },
      ],
    },

    {
      id: 'twilight-flickers',
      name: 'Twilight Flickers',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Take and Hold',
      unique: 'ACROBATIC',
      rule: {
        name: 'Dance of Distortion',
        flavor:
          'With their holofields attuned to a mistwreathed shadow performance, the Harlequins are insubstantial blurs as they dash through cover to reach their chosen stage.',
        body: `Friendly **HARLEQUINS** units have Stealth.

This detachment has the **ACROBATIC** tag and cannot be taken with another **ACROBATIC** detachment.`,
      },
      stratagems: [
        {
          name: 'Presaged Rehearsal',
          sublabel: 'Twilight Flickers – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Amongst the performances of a saedath is the climactic sundering of monstrous foes or the enemy’s hateful barques, acts the Harlequins have long mastered.',
          when: 'Fight phase, when a friendly TROUPE unit is selected to fight.',
          target: 'That TROUPE unit.',
          effect: "Your unit's melee attacks have [LANCE].",
          restrictions: '',
        },
        {
          name: 'Captivating Performance',
          sublabel: 'Twilight Flickers – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With the placement of sentinel nodes and a performance that echoes their guardianship of things lost to other Aeldari, the Harlequins guard well that which is sacred to them.',
          when: 'End of your Movement phase.',
          target: 'One friendly TROUPE unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Phantasmal Mirage',
          sublabel: 'Twilight Flickers – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The mirage launchers carried by a masque’s graceful craft can be triggered to produce haunting simulacra long enough to deceive the foe and allow a crew to manoeuvre away again to their next stage.',
          when: 'Your Shooting phase, when a friendly HARLEQUINS VEHICLE unit has shot.',
          target: 'That HARLEQUINS VEHICLE unit.',
          effect: `▪ Your unit can make a Normal move of up to D6".
▪ Your unit is not eligible to declare a charge until the end of the turn.`,
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Shadowfall Masks',
          points: 15,
          upgrade: true,
          flavor: 'These nightmarish masks torment the enemy with a psychoresponsive bombardment laced through the murk generated by the wearers’ holofields. The confusing distortion leaves enemies vulnerable to the blades that suddenly spear from the terrifying gloom.',
          body: `TROUPE unit only. This unit has Fights First.`,
        },
        {
          name: 'Prelude Performer',
          points: 20,
          flavor: 'With breathtakingly subtle yet rapid movements, this master of the opening act leads the Harlequins in a deadly dance that can catch their foes off guard.',
          body: `HARLEQUINS model only. This unit has Scouts 6".`,
        },
      ],
    },

    {
      id: 'serpents-brood',
      name: "Serpent's Brood",
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      unique: 'ACROBATIC',
      rule: {
        name: 'Boons of the Brood',
        flavor:
          "Playing their roles to perfection, the Harlequins embody the swift-striking fangs and deadly venoms of the Cosmic Serpent's brood, dominating the stage of the battlefield with their swift and vicious performances.",
        body: `Weapons equipped by **Harlequins Mounted** and **Harlequins Vehicle** models from your army have the [SUSTAINED HITS 1] ability.

Each time a **Harlequins** unit from your army disembarks from a Transport, until the end of the turn, that unit's weapons have the [SUSTAINED HITS 1] ability.

**Travelling Players:**
▪ Troupe units from your army gain the **Battleline** keyword, and Troupe models in those units have an Objective Control characteristic of 2.
▪ You can include up to three of each of the following models in your army: Death Jester, Shadowseer, Troupe Master.

This detachment has the **ACROBATIC** tag and cannot be taken with another **ACROBATIC** detachment.`,
      },
      stratagems: [
        {
          name: 'Fangs of the Brood',
          sublabel: "Serpent's Brood – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: "Many are the heads of the brood, and many their fangs. As they spring and tumble over their foes, the Harlequins' weapons echo the multiplicity of strikes unleashed by that mythic nest of snakes.",
          when: 'Start of the Fight phase.',
          target: 'One Troupe unit from your army.',
          effect: "Until the end of the phase, when using your unit's Dance of Death ability, you can select three of the abilities for your unit to gain, instead of one.",
          restrictions: '',
        },
        {
          name: 'Venomous Wrath',
          sublabel: "Serpent's Brood – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Embodying the serpent that strikes with blinding swiftness, this grav-skimmer lunges suddenly into range and unleashes its full fury on the foe.',
          when: 'Your Shooting phase.',
          target: 'One Harlequins Vehicle unit from your army that has not been selected to shoot this phase.',
          effect: 'After your unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6". Until the end of the turn, your unit is not eligible to declare a charge.',
          restrictions: '',
        },
        {
          name: 'Striking Stride',
          sublabel: "Serpent's Brood – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Springing between pillars and rubble, bounding forwards as though running on thin air, the Harlequins acrobatically hurl themselves into battle.',
          when: 'Your Charge phase.',
          target: 'One Harlequins unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          restrictions: '',
        },
        {
          name: "Weaver’s Coils",
          sublabel: "Serpent's Brood – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Inescapable yet impossible to catch, this unit personifies the ever-winding and incorporeal coils of the Skyweavers of myth.',
          when: 'End of your Fight phase.',
          target: 'One Harlequins Mounted unit from your army that was eligible to fight this phase.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, it can make a Normal move. Otherwise, your unit can make a Fall Back move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Weaving Stride',
          sublabel: "Serpent's Brood – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Maintaining their blistering pace, these warriors respond to their foes’ steps in the saedath with their own gravity-defying motions.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Harlequins Infantry unit from your army that is within 8" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Skyward Lunge',
          sublabel: "Serpent's Brood – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Like a serpent rearing back to strike at its prey anew, the Harlequins sweep high and appear to quit the field, ready to descend in fury a moment later.',
          when: "End of your opponent's Fight phase.",
          target: 'One Harlequins Vehicle or Harlequins Mounted unit from your army.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Key of Ghosts',
          points: 20,
          flavor: 'This mystic wraithbone implement allows the bearer to slip onto the stage from the Webway even before the curtain’s rise, beginning their performance in full and furious flow.',
          body: `Harlequins model only (excluding Solitaire models). Models in the bearer's unit have the Scouts 6" ability.`,
        },
        {
          name: "Weavers' Wail",
          points: 20,
          flavor: 'A cruel weapon more often kept locked away, this ill-omened implement is said to resonate with the Cosmic Serpent’s own dismay at the suffering of its brood during the Fall.',
          body: `Troupe Master model only. Add 3 to the Strength and add 1 to the Attacks characteristics of the bearer's melee weapons.`,
        },
        {
          name: 'Fanged Leer',
          points: 10,
          flavor: 'This cruel mask is worn when performing the Serpent’s Brood, and lends its wearer a supernatural degree of venom and spite.',
          body: `Death Jester model only. When using the bearer's Cruel Amusement ability, you can select two of the abilities for its shrieker cannon to gain, instead of one.`,
        },
        {
          name: 'Shedskin Raiment',
          points: 25,
          flavor: 'This glittering cloak projects a grand illusion that falls away as its wearer sheds it like a discarded serpent’s hide, revealing a still-more dismaying reality beneath.',
          body: `Shadowseer model only. After both players have deployed their armies, select up to three Harlequins units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
      ],
    },

    {
      id: 'eldritch-raiders',
      name: 'Eldritch Raiders',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: "Yriel's Own",
        flavor:
          'These are Yriel’s most elite raiders, skilled in fast-paced raids and used to fighting superior forces using a combination of guile, superior technology, and physical prowess.',
        body: `**Aeldari** units in your army are eligible to declare a charge in a turn in which they Advanced. In addition, each time an **Anhrathe**, **Rangers** or **Shroud Runners** unit from your army Advances, you can re-roll the Advance roll.

**Veterans of the Void:** Each time you add an **Anhrathe** unit to your army, it can be given up to one Corsair Enhancement (see below). Each Corsair Enhancement included in your army must be unique. If a unit is given a Corsair Enhancement, you must increase the points cost of that unit by the amount shown (see Munitorum Field Manual). If this causes your army to exceed the points limit for the battle you are playing, you cannot include that unit in your army.`,
      },
      stratagems: [
        {
          name: "Raider’s Spoils",
          sublabel: 'Eldritch Raiders – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Even as battle rages around them, the Eldritch Raiders prioritise the seizing of treasures above the destruction of their foes.',
          when: 'Command phase.',
          target: 'One Anhrathe unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Until the start of the next Command phase, add 1 to the Objective Control characteristic of models in your unit.',
          restrictions: '',
        },
        {
          name: 'Ruthless Killers',
          sublabel: 'Eldritch Raiders – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'These are Yriel’s chosen killers, and there is no escape for their prey.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Corsair Voidscarred unit from your army that has not been selected to shoot or Fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: "Yriel's Example",
          sublabel: 'Eldritch Raiders – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Inspired by their prince, who has felt Ynnead’s touch, the Eldritch Raiders laugh in the face of death.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Aeldari Infantry unit from your army (excluding Wraith Construct units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability.',
          restrictions: '',
        },
        {
          name: 'No Prey Too Big',
          sublabel: 'Eldritch Raiders – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'By accurately targeting weak points in anatomies and superstructures, the Anhrathe can bring down even the most resilient of foes.',
          when: 'Your Shooting phase.',
          target: 'One Anhrathe, Rangers or Shroud Runners unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, if the Strength characteristic of that attack is less than the highest Toughness characteristic of models in the target unit, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Impeding Fire',
          sublabel: 'Eldritch Raiders – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'As the foes attempt to close in, Yriel’s cunning outcasts stymie their assault with a dazzling burst of distracting fire.',
          when: "Start of your opponent's Charge phase.",
          target: 'One Rangers, Shroud Runners or Starfang unit from your army.',
          effect: 'Select one enemy unit (excluding Titanic units) visible to and within 36" of your unit. Until the end of the phase, each time that enemy unit declares a charge, subtract 2 from the Charge roll (this is not cumulative with any other negative modifiers to that Charge roll).',
          restrictions: '',
        },
        {
          name: 'Withdraw and Reinforce',
          sublabel: 'Eldritch Raiders – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Prince Yriel commands resources beyond the dreams of most Corsair Princes. Depleted bands may fall back from the battlefield to be reinforced and resupplied at a moment’s notice.',
          when: "End of your opponent's Fight phase.",
          target: 'One Anhrathe unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves. If that unit is below Starting Strength, return all destroyed models (excluding Character models) to that unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Pirate Prince',
          points: 15,
          flavor: 'Yriel’s speed, both of thought and action, ensures that he remains one step ahead of his opponents at all times.',
          body: `Prince Yriel unit only. Each time you spend a Battle Focus token to enable this unit to perform an Agile Manoeuvre, roll one D6: on a 3+, you gain 1 Battle Focus token.`,
        },
        {
          name: 'Alacritous Assault',
          points: 20,
          flavor: 'The key to any raid is the shock of the opening strike. Anhrathe warriors strike at breakneck speed, power swords and boarding hooks finding gaps in enemy armour and inflicting devastating wounds.',
          body: `Anhrathe unit only. Melee weapons equipped by models in this unit have the [LANCE] ability.`,
        },
        {
          name: 'Exotic Munitions',
          points: 15,
          flavor: 'In their travels through the void, these Anhrathe warriors have collected a bounty of esoteric ammunition. The most lethal of these munitions are toxic or acidic enough to fell monstrous foes or to burn through armour and servo-motors with frightening rapidity.',
          body: `Anhrathe unit only. Ranged weapons equipped by models in this unit have the [ANTI-MONSTER 5+] and [ANTI-VEHICLE 5+] abilities.`,
        },
        {
          name: 'Adrenal Infusions',
          points: 20,
          flavor: 'Amongst the hauls taken by Aeldari Corsairs are many stimulants and elixirs, the most powerful of which enhance the already impressive grace and agility of the Aeldari physiology.',
          body: `Anhrathe Infantry unit only. This unit can perform the Fade Back Agile Manoeuvre without spending a Battle Focus token to do so. It can do so even if other units have done so in the same phase, and doing so does not prevent other units from performing the same Agile Manoeuvre in the same phase.`,
        },
      ],
    },

    {
      id: 'corsair-coterie',
      name: 'Corsair Coterie',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Relentless Raiders',
        flavor:
          'Should the Anhrathe detect valuable plunder, they will go to great lengths to seize it, and fight with shocking ferocity to protect their prize.',
        body: `While an objective marker is under your control, each time an enemy unit ends a Normal, Advance, Fall Back or Charge move within range of that objective marker, roll one D6: on a 2+, that enemy unit suffers D3 mortal wounds.

**Anhrathe** units from your army have the following ability:
▪ **Void Thieves:** At the end of a phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.

**Veterans of the Void:** Each time you add an **Anhrathe** unit to your army, it can be given up to one Corsair Enhancement (see below). Each Corsair Enhancement included in your army must be unique. If a unit is given a Corsair Enhancement, you must increase the points cost of that unit by the amount shown (see Munitorum Field Manual). If this causes your army to exceed the points limit for the battle you are playing, you cannot include that unit in your army.`,
      },
      stratagems: [
        {
          name: "Pirates' Due",
          sublabel: 'Corsair Coterie – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'In their pursuit of riches, Anhrathe warriors will fight with violent fury to seize their due.',
          when: 'The Fight phase.',
          target: 'One Aeldari unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1. If your unit has the Anhrathe keyword, then until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit within range of an objective marker, you can re-roll the Wound roll instead.',
          restrictions: '',
        },
        {
          name: 'Lethal Ruse',
          sublabel: 'Corsair Coterie – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With a final flurry of gunshots, blade strikes and explosives, these warriors feign retreat before striking again with renewed aggression.',
          when: 'Your Movement phase, just after an Aeldari unit from your army Falls Back.',
          target: 'That Aeldari unit.',
          effect: 'Until the end of the turn, your unit is eligible to declare a charge in a turn in which it Fell Back. If it is an Anhrathe unit, also select one enemy unit your unit was within Engagement Range of at the start of the phase, and roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
        {
          name: 'Outcast Ambush',
          sublabel: 'Corsair Coterie – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Anhrathe raiders often find common ground with other Aeldari Outcasts, who use the distraction of the Corsair onslaught to ambush unsuspecting foes.',
          when: 'Your Shooting phase.',
          target: 'One Rangers or Shroud Runners unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] and [RAPID FIRE 1] abilities, and until the end of the phase, improve the Armour Penetration characteristic of those weapons by 1.',
          restrictions: '',
        },
        {
          name: 'Into the Breach',
          sublabel: 'Corsair Coterie – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Corsair raiders are swift to exploit gaps in the enemy line and advance upon their objectives.',
          when: 'Your Shooting phase, just after an Anhrathe unit from your army destroyed one or more enemy units.',
          target: 'That Anhrathe unit.',
          effect: 'After your unit has resolved all of its shooting attacks, it can make a Normal move of up to D6+1".',
          restrictions: '',
        },
        {
          name: 'Cloak and Shadow',
          sublabel: 'Corsair Coterie – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Having secured their prize, the Anhrathe melt into the shadows, leaving their foes shooting at shadows.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Aeldari Infantry unit from your army that is within range of an objective marker that you control and that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have the Stealth ability and your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          restrictions: '',
        },
        {
          name: 'Vengeful Sorrow',
          sublabel: 'Corsair Coterie – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Anhrathe share bonds forged in battle. The loss of an ally inspires sorrow and fury in equal measure.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: 'One Aeldari Infantry unit from your army, if one or more models in that unit were destroyed as a result of those attacks, and if that Aeldari unit is neither Battle-shocked nor within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a surge move of up to D6+1".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Infamy',
          points: 25,
          aura: true,
          flavor: 'These infamous raiders are rightly feared, and use their reputation to their advantage with easily identifiable armour and insignia.',
          body: `Anhrathe unit only. While an enemy unit is within 3" of this unit, subtract 1 from the Objective Control characteristic of models in that unit (to a minimum of 1).`,
        },
        {
          name: 'Webway Pathstone',
          points: 25,
          flavor: 'This smooth token contains esoteric knowledge of local Webway spurs. When activated by psychic impulse, it projects a mental map of these routes into the minds of the bearer, enabling them to locate hidden gates, bypass their foes, and seize the treasures they seek.',
          body: `Anhrathe unit only. Models in this unit have the Deep Strike ability. In addition, once per battle, at the end of your opponent's turn, if this unit is not within Engagement Range of one or more enemy units, it can use this ability. If it does, remove this unit from the battlefield and place it into Strategic Reserves.`,
        },
        {
          name: 'Archraider',
          points: 35,
          flavor: 'A master of the lightning assault, this commander appears prescient in their ability to confound the foe.',
          body: `Anhrathe Character unit only. At the start of the battle, select one Character model in this unit. That model has the following ability:
▪ **Lord of Deceit (Aura):** Once per turn, when your opponent targets a unit from their army within 12" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP.`,
        },
        {
          name: 'Voidstone',
          points: 15,
          flavor: 'Seized from an alien tomb, this obsidian artefact seems to absorb light itself, offering the bearer and their unit a degree of protection against even the strongest attacks.',
          body: `Anhrathe Infantry unit only. Models in this unit have a 5+ invulnerable save.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const aeldari = { en, ru: en }
