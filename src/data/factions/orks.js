// Orks — faction rules. Resolved from the same source priority as the other factions
// (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex > Index.
//
//   Codex: Orks (sources/codex/xenos/Orks.pdf — image-only PDF, transcribed from page
//     renders p79–91) → army rule (Waaagh!) + 6 base detachments (War Horde, Da Big Hunt,
//     Kult of Speed, Dread Mob, Green Tide, Bully Boyz).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/xenos/ORKZ.pdf) → 5 extra detachments
//     (Rollin' Deff, More Dakka!, Taktikal Brigade, Speedwaaagh!, Blitz Brigade,
//     Freebooter Krew) + Rules Updates.
//   MFM (src/data/mfm/orks.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the WAGONS `unique` tag.
//
// 12 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been
// folded into the army rule / codex detachment rules / stratagems (they are the
// authoritative newer wording) — see inline notes. Rollin' Deff and Blitz Brigade both
// carry the WAGONS tag (mutually exclusive; `unique` field).
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions);
// swap in a translated object later. Markup follows useRenderInline / RuleBlock /
// StratCard conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ `
// bullet lines, `### ` subheadings. Datasheets are a later pass (`datasheets`).

const en = {
  slug: 'orks',
  name: 'Orks',

  armyRule: {
    id: 'waaagh',
    name: 'Waaagh!',
    flavor:
      'The infamous war cry of the Orks is known and feared throughout the galaxy. When it echoes across the battlefield, bellowed from hundreds or even thousands of toothy maws, even the most stalwart warriors fear the onslaught to come.',
    // Faction-Pack Rules Update moved the trigger to the Command phase ("start of your
    // Command phase" / "start of your next Command phase" instead of the battle round).
    body: `If your Army Faction is Orks, once per battle, at the start of your Command phase, you can call a Waaagh!. If you do, until the start of your next Command phase, the Waaagh! is active for your army and:
▪ Units from your army with this ability are eligible to declare a charge in a turn in which they Advanced.
▪ Add 1 to the Strength and Attacks characteristics of melee weapons equipped by models from your army with this ability.
▪ Models from your army with this ability have a 5+ invulnerable save.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'war-horde',
      name: 'War Horde',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Get Stuck In!',
        flavor:
          'Once an Ork gets stuck into hand-to-hand combat, they quickly overwhelm their enemies through sheer ferocity and an eagerness to give the gitz a good kicking.',
        body: `Melee weapons equipped by Orks models from your army have the [SUSTAINED HITS 1] ability.`,
      },
      stratagems: [
        {
          name: 'Careen!',
          sublabel: 'War Horde – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'If their vehicle is on its last legs, any sensible Ork driver will aim its fiery remains into the nearest foe.',
          when: 'Any phase, just after an Orks Vehicle unit from your army with the Deadly Demise ability is destroyed.',
          target: 'That destroyed Orks Vehicle unit, if you rolled a 6 for its Deadly Demise ability. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Your unit can make a Normal or Fall Back move before its Deadly Demise ability is resolved, and before any embarked units perform an Emergency Disembarkation. When making this move, your unit can move over enemy units (excluding Monsters and Vehicles) as if they were not there.',
          restrictions: '',
        },
        {
          name: "'Ard as Nails",
          sublabel: 'War Horde – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Even the lowliest Ork Boy has a toughened hide and a dense skull. While there yet remains the prospect of a git to give a good kicking, it takes a blow of truly phenomenal strength to even give the Ork pause.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Orks unit from your army (excluding Grots, Monster and Vehicle units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Orks Is Never Beaten',
          sublabel: 'War Horde – Epic Deed Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'So resilient is Ork physiology – and so slow are Orks on the uptake – even death can take time to register.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Orks unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking unit has finished making attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Mob Rule',
          sublabel: 'War Horde – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The more Orks that gather in one place the more the Waaagh! energy flows, and the more fearless they all become.',
          when: 'End of your Command phase.',
          target: 'One Mob unit from your army that contains 10 or more models and is not Below Half-strength.',
          effect: "Select one friendly Battle-shocked Orks Infantry unit within 6\" of that Mob unit. That Orks Infantry unit is no longer Battle-shocked.",
          restrictions: '',
        },
        {
          name: 'Unbridled Carnage',
          sublabel: 'War Horde – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'When Orks get stuck into the foe, the carnage is wonderful to behold, at least for all their mates.',
          when: 'Fight phase.',
          target: 'One Orks unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: "'Ere We Go",
          sublabel: 'War Horde – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Even Orks can put on a surprising turn of speed when the promise of a good face-to-face fight is in the offing.',
          when: 'Start of your Movement phase.',
          target: 'One Orks Infantry unit from your army.',
          effect: 'Until the end of the turn, add 2 to Advance and Charge rolls made for your unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Follow Me Ladz',
          points: 25,
          flavor: 'Always found at the forefront of an assault, this Ork likes to be the first into the fray.',
          body: `Orks model only. While the bearer is leading a unit, add 2" to the Move characteristic of models in that unit.`,
        },
        {
          name: "Headwoppa's Killchoppa",
          points: 20,
          flavor: 'Grand Warboss Headwoppa and his tribe were last seen charging headlong into a horde of Khornate daemons, but legend speaks of a blood slick choppa that still turns up occasionally. Though this weapon looks normal, a dark voice is said to growl in the mind of its wielder, driving them on to ever greater excesses of violence.',
          body: `Orks model only. Melee weapons equipped by the bearer (excluding Extra Attacks weapons) have the [DEVASTATING WOUNDS] ability.`,
        },
        {
          name: "Kunnin' But Brutal",
          points: 15,
          flavor: "Feigning weakness, this Ork allows his foes to think he's legging it before suddenly piling back into the fight and delivering a brutal flurry of attacks.",
          body: `Orks model only. While the bearer is leading a unit, that unit is eligible to shoot and declare a charge in a turn in which it Fell Back.`,
        },
        {
          name: 'Supa-Cybork Body',
          points: 15,
          flavor: 'The original owner of this one-of-a-kind endoskeleton became the envy of every Warboss around, and was soon gutted and stripped for parts by a stronger rival. The Supa-Cybork Body has been retransplanted several times since then, filling its new owner with confidence, resilience and a belated hope that the Painboyz gave it a quick clean before shoving it back in place…',
          body: `Orks model only. The bearer has the Feel No Pain 4+ ability.`,
        },
      ],
    },

    {
      id: 'da-big-hunt',
      name: 'Da Big Hunt',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Da Hunt Is On',
        flavor:
          "Spying the largest or most dangerous threats on the battlefield – besides the Orks themselves – Beast Snaggas chase them down with gleeful enthusiasm, mobs racing each other to claim the kill and to snag a worthy trophy with which to proclaim their status as the warband's greatest hunters. Until, that is, the easily distracted ladz notice their next quarry.",
        // Faction-Pack Rules Update: first paragraph now selects Monster/Vehicle/Character
        // (codex said Warlord), and the first bullet is reworded around the 12" charge.
        body: `At the start of your Command phase, select one Monster, Vehicle or Character unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your Prey:
▪ When a friendly Beast Snagga unit declares a charge, if your Prey is within 12" of that unit, you can use this part of this ability. If you do:\n▪ That Beast Snagga unit can re-roll that charge roll.\n▪ That Beast Snagga unit __must__ end that charge move engaged with your Prey.
▪ Each time a Beast Snagga model from your army makes an attack that targets your Prey, improve the Armour Penetration characteristic of that attack by 1.`,
      },
      stratagems: [
        {
          name: 'Drag It Down',
          sublabel: 'Da Big Hunt – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Beast Snaggas have many tales of the times they took on the biggest prey, clobbering them with so many blows that what was left was a crumpled mass of broken hide and squished innards.',
          when: 'Fight phase.',
          target: 'One Beast Snagga unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability. In addition, each time a model in your unit makes a melee attack that targets your Prey, a Critical Hit is scored on an unmodified Hit roll of 5+, instead of only a 6.',
          restrictions: '',
        },
        {
          name: "Where D'ya Fink You're Going?",
          sublabel: 'Da Big Hunt – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Beast Snagga victims often make a break for it before the Orks have had their fill of fighting. With a roar, the Orks immediately give chase, or else lose interest and lunge after other potential trophies.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Fall Back move.",
          target: 'One Beast Snagga Infantry or Beast Snagga Mounted unit from your army that was within Engagement Range of that enemy unit at the start of the phase.',
          effect: 'If your unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Unstoppable Momentum',
          sublabel: 'Da Big Hunt – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Smasha squigs are essentially battering rams on legs. Driven on by the squighogs piling in behind them, they plunge headlong into the foe, trampling one after the next.',
          when: 'Your Charge phase, just after a Beast Snagga Mounted unit from your army ends a Charge move.',
          target: 'That Beast Snagga unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit and roll one D6 for each model in your unit: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds). If that enemy unit is your Prey, roll three additional D6.',
          restrictions: '',
        },
        {
          name: "Stalkin' Taktiks",
          sublabel: 'Da Big Hunt – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "There is no hiding a Beast Snagga stampede, but the more agile amongst the hunters know how to evade the worst of an unsporting prey's dakka.",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Beast Snagga Infantry or Beast Snagga Mounted unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a ranged attack targets your unit, models in your unit have the Benefit of Cover against that attack. In addition, if your unit has the Infantry keyword, until the end of the phase, models in your unit have the Stealth ability.',
          restrictions: '',
        },
        {
          name: "Dat One's Even Bigga!",
          sublabel: 'Da Big Hunt – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When bigger prey is sighted, nothing can keep a mob of Beast Snaggas from it. A great hunting chant erupts, and lesser gitz are swiftly forgotten in the enthusiastic impetus to pile into a bigger challenge.',
          when: 'Your Charge phase.',
          target: 'One Beast Snagga unit from your army.',
          // Faction-Pack Rules Update reworded this Effect (re-roll charge, must end engaged with Prey).
          effect: 'Until the end of the phase, your unit is eligible to charge in a turn in which it Advanced or Fell Back. In addition, you can re-roll charge rolls made for your unit. If you do, your unit must end that charge move engaged with your Prey.',
          restrictions: '',
        },
        {
          name: 'Instinctive Hunters',
          sublabel: 'Da Big Hunt – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "With a keen eye for tracking their prey, especially kunnin' Beast Snaggas will circle round the hunt site to ambush the luckless gitz from another angle.",
          when: "End of your opponent's Fight phase.",
          target: 'One Beast Snagga unit from your army that is not within Engagement Range of one or more enemy unit.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Glory Hog',
          points: 30,
          flavor: "Obsessed with being the first to make a kill, this hunter spurs his unruly mount ahead of the warband, coaxing his mob to follow him with the explicit threat of feeding them to his squigosaur if they don't keep up.",
          body: `Beastboss on Squigosaur model only. Models in the bearer's unit have the Scouts 9" ability.`,
        },
        {
          name: 'Skrag Every Stash!',
          points: 25,
          flavor: "Successful hunt leaders are never short of a kunnin' plan to flush out the prey. This sneaky git has mastered the art of ransacking whatever the prey values, luring the quarry in to retaliate or else ensuring they're cornered, with no bolthole or gear to fall back on.",
          body: `Beast Snagga model only. At the end of your Command phase, if the bearer is within range of an objective marker you control, that objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.`,
        },
        {
          name: 'Proper Killy',
          points: 15,
          flavor: 'This Beast Snagga is an unstoppable engine of destructive butchery who has left the brutalised corpses of his huge prey piled in his wake on world after world.',
          body: `Beast Snagga model only. Add 1 to the Damage characteristic of melee weapons equipped by the bearer.`,
        },
        {
          name: 'Surly as a Squiggoth',
          points: 20,
          flavor: 'With a lifetime of leading notoriously deadly Beast Snagga hunts behind them, and gnarled hides thicker than Battlewagon armour, this Ork and his favoured Boyz have survived blows that would fell a Gargant.',
          body: `Beastboss on Squigosaur model only. While the bearer is leading a unit, each time an attack targets that unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll.`,
        },
      ],
    },

    {
      id: 'kult-of-speed',
      name: 'Kult of Speed',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Adrenaline Junkies',
        flavor:
          'If there is one thing Speed Freeks love more than racing full tilt towards the enemy, smashing into them and pulling hair pin turns to do it all again, it is loosing incredible amounts of noisy, chugging dakka as they do so.',
        // Faction-Pack Rules Update added "and declare a charge" to the codex wording.
        body: `Speed Freeks units from your army are eligible to shoot and declare a charge in a turn in which they Advanced or Fell Back.`,
      },
      stratagems: [
        {
          name: 'Speediest Freeks',
          sublabel: 'Kult of Speed – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Speed Freeks are often just blurs of vehicular mayhem that prove difficult to land a blow on.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Speed Freeks or Trukk unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 5+ invulnerable save. If your unit is a Vehicle unit with an unmodified Toughness characteristic of 8 or less, until the end of the phase, models in your unit have a 4+ invulnerable save instead.',
          restrictions: '',
        },
        {
          name: 'Blitza Fire',
          sublabel: 'Kult of Speed – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Fiercely gripping the trigger, with a manic grin as they close on their foes, Speed Freeks fire so many rounds that some just have to find a weak spot.',
          when: 'Your Shooting phase.',
          target: 'One Speed Freeks unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] ability and, each time a model in your unit makes an attack that targets a unit within 9", a Critical Hit is scored on an unmodified Hit roll of 5+, instead of only a 6.',
          restrictions: 'A unit cannot be targeted by this and the Dakkastorm Stratagem in the same phase.',
        },
        {
          name: "Squig Flingin'",
          sublabel: 'Kult of Speed – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Speed Freeks live in their vehicles, so it's no surprise to find small squigs lurking in some compartments. A few are vicious, and entertaining, enough to be worth lobbing into nearby enemies to cause anarchy.",
          when: 'Your Movement phase, just after a Speed Freeks or Trukk unit from your army ends a Normal, Advance or Fall Back move.',
          target: 'That Speed Freeks or Trukk unit.',
          effect: 'Select one enemy unit within 9" of your unit. That enemy unit must take a Battle-shock test and, when doing so, subtract 1 from the result.',
          restrictions: '',
        },
        {
          name: 'Full Throttle',
          sublabel: 'Kult of Speed – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When racing buggies and warbikes charge at full pelt, the power behind their crews\' assault is so great that they can smash through the enemy.',
          when: 'Your Charge phase, just after a Speed Freeks unit from your army ends a Charge move.',
          target: 'That Speed Freeks unit.',
          effect: 'Until the end of the turn, each time a model in your unit makes a melee attack, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Dakkastorm',
          sublabel: 'Kult of Speed – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Often all an enemy will see of a Kult of Speed is a blur as they speed by, all guns blazing.',
          when: 'Your Shooting phase.',
          target: 'One Speed Freeks unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability. While targeting a unit within 9", they have the [SUSTAINED HITS 2] ability instead.',
          restrictions: 'A unit cannot be targeted by this and the Blitza Fire Stratagem in the same phase.',
        },
        {
          name: "More Gitz Over 'Ere!",
          sublabel: 'Kult of Speed – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Sometimes new targets that emerge are just too juicy to ignore.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update: 9" → 8".
          target: 'One Speed Freeks unit from your army that is within 8" of that enemy unit and is not within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Fasta Than Yooz',
          points: 35,
          flavor: 'The thrill-seeking Orks at the head of Speed Freeks warbands lead their Kult of Speed brethren right into enemy lines, leaping from speeding Trukks and Battlewagons if need be to plunge into the fight.',
          body: `Orks Infantry model only. Each time the bearer's unit disembarks from a Transport after that Transport has made a Normal move, the bearer's unit is still eligible to declare a charge this turn.`,
        },
        {
          name: 'Speed Makes Right',
          points: 25,
          flavor: "This Ork's adrenaline-addled mind lurches from one insight to the next, a bone-shaker whose engine only fires on all cylinders when he is in the thick of the fighting. Once there, however, it revs into overdrive.",
          body: `Orks model only. In your Command phase, if the bearer (or a Transport the bearer is embarked within) is within 9" of one or more enemy units, roll one D6: on a 3+, you gain 1CP.`,
        },
        {
          name: 'Squig-hide Tyres',
          points: 15,
          flavor: 'Scaly squig-hide is the perfect material for fast and grippy tyres, able to provide traction even in the mire of blood, guts and oil left over from most Speed Freek fights.',
          body: `Deffkilla Wartrike model only. Each time a model in the bearer's unit makes a Consolidation move, it can move up to 6" instead of up to 3".`,
        },
        {
          name: 'Wazblasta',
          points: 10,
          flavor: "This warlord's fanatical devotion to speed is such that he cannot stand being anywhere other than in the heart of the action and he pushes the ladz around him to crank their throttles in order to close the distance with the enemy as soon as possible.",
          body: `Deffkilla Wartrike model only. In your Shooting phase, after the bearer's unit has shot, if it is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6". If it does, until the end of the turn, it is not eligible to declare a charge.`,
        },
      ],
    },

    {
      id: 'dread-mob',
      name: 'Dread Mob',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Try Dat Button!',
        flavor:
          "Inventive Meks wire all manner of kustomised gubbinz, suspicious extras and inviting big red buttons to weapons or into the cockpits of their clanking kan creations. Eager Orks are always enthusiastic to try out such random innovations to see what sort of destruction they can cause. Sometimes this can be risky, but that's half the fun!",
        // Faction-Pack Rules Update changed the last paragraph (Hazardous fails on 1-3).
        body: `Each time a Mek, Orks Walker or Grots Vehicle unit from your army is selected to shoot or fight, roll one D6. Until the end of the phase, weapons equipped by models in that unit have the corresponding ability shown in the table below.
▪ **1-2:** [SUSTAINED HITS 1] ability.
▪ **3-4:** [LETHAL HITS] ability.
▪ **5-6:** Each time an attack is made with this weapon, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 2.

Alternatively, when such a unit is selected to shoot or fight, you can select one of the abilities above instead of rolling the D6. If you do, until the end of the phase, weapons equipped by models in that unit have the [HAZARDOUS] ability as well.

If a weapon equipped by a model from your army has the [HAZARDOUS] ability from multiple sources, each time you take a Hazardous test for that weapon, it is failed on a roll of a 1-3.

### Keywords
Gretchin units from your army gain the Battleline [gloss:keywords:keyword].`,
      },
      stratagems: [
        {
          name: "Klankin' Klaws",
          sublabel: 'Dread Mob – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "The krews of a Mek's stompiest contraptions revel in ripping apart anything they can get their klaws on, heedless of the damage done to their own gubbinz.",
          when: 'Fight phase.',
          target: 'One Orks Walker unit from your army that has not been selected to fight this phase.',
          effect: 'Each time you use this Stratagem, you can choose to push it. Until the end of the phase, add 2 to the Strength characteristic of melee weapons equipped by models in your unit and, if you chose to push it, until the end of the phase, add 1 to the Damage characteristic of those weapons and they have the [HAZARDOUS] ability as well.',
          restrictions: '',
        },
        {
          name: 'Dakka! Dakka! Dakka!',
          sublabel: 'Dread Mob – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Orks have a tendency to hold the trigger down until their weapon stops firing, falls apart or misfires.',
          when: 'Your Shooting phase.',
          target: 'One Orks Walker or Grots Vehicle unit from your army that has not been selected to shoot this phase.',
          effect: 'Each time you use this Stratagem, you can choose to push it. Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1. If you chose to push it, you can re-roll the Hit roll instead and, until the end of the phase, ranged weapons equipped by models in your unit have the [HAZARDOUS] ability as well.',
          restrictions: '',
        },
        {
          name: 'Superfuelled Boiler',
          sublabel: 'Dread Mob – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'By pushing their engines past any sane level, Ork combat walkers can build terrifying momentum.',
          when: 'Your Movement phase, just after an Orks Walker unit from your army has been selected to Advance.',
          target: 'That Orks Walker unit.',
          effect: 'Until the end of the turn, you can re-roll Advance rolls made for your unit and ranged weapons equipped by models in your unit have the [ASSAULT] ability.',
          restrictions: '',
        },
        {
          name: 'Conniving Runts',
          sublabel: 'Dread Mob – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "A Gretchin's lot is often a wretched one, and the spiteful zoggers will take any chance to cause pain and mischief using sneaky traps before legging it.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Gretchin unit from your army that is within 8" of that enemy unit and not within Engagement Range of any enemy units.',
          effect: 'Roll one D6: on a 4+, that enemy unit suffers D3+1 mortal wounds. Your unit can then make a Normal move.',
          restrictions: '',
        },
        {
          name: 'Bigger Shells for Bigger Gitz',
          sublabel: 'Dread Mob – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Stashes of extra speshul ammo provided by the Meks are often expended on rival monstrosities.',
          when: 'Your Shooting phase.',
          target: 'One Mek, Orks Walker or Grots Vehicle unit from your army that has not been selected to shoot this phase.',
          effect: 'Each time you use this Stratagem, you can choose to push it. Until the end of the phase, each time a model in your unit makes an attack that targets a Monster or Vehicle, add 1 to the Wound roll. If you chose to push it, add 1 to the Damage characteristic of that attack and, until the end of the phase, ranged weapons equipped by models in your unit have the [HAZARDOUS] ability as well.',
          restrictions: '',
        },
        {
          name: 'Extra Gubbinz',
          sublabel: 'Dread Mob – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The Meks' creations can afford to have all manner of useless junk blasted from them with little effect.",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Orks Walker or Grots Vehicle unit from your army (excluding Titanic units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Smoky Gubbinz',
          points: 15,
          flavor: "This loud, fume-belching device wreathes the bearer and his mates in a thick bank of smoke. This is hard for the enemy to see through, but has little detriment on the Orks' own accuracy.",
          body: `Mek model only. Models in the bearer's unit have the Stealth ability.`,
        },
        {
          name: 'Supa-glowy Fing',
          points: 20,
          flavor: "The Mek cobbled together this strange device in a flash of feverish inventin'. He isn't sure what it does – and it glows weirdly – but he proudly carries it to battle, eager to know what its big switch will do this time.",
          body: `Mek model only. In your Command phase, select one enemy unit within 18" of and visible to the bearer, then roll one D6: on a 1-2, that enemy unit must take a Battle-shock test; on a 3-4, that enemy unit suffers D3 mortal wounds; on a 5-6, until the start of your next Command phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll.`,
        },
        {
          name: 'Press It Fasta!',
          points: 35,
          flavor: 'Impatient for better results, this Mek is an avid advocate of the theory that smashing buttons and cranking dials faster makes kustom guns more shooty.',
          body: `Mek model only. Each time the bearer's unit is selected to shoot, when rolling to determine which ability that unit's weapons gain from the Try Dat Button! Detachment rule, roll one additional D6: until the end of the phase, ranged weapons equipped by models in that unit gain both Button Effects generated by those rolls. If a duplicate Button Effect is rolled, it has no additional effect.`,
        },
        {
          name: 'Gitfinder Gogglez',
          points: 10,
          flavor: 'By squinting hard through the mismatched lenses of these goggles, even the sneakiest git can be pinpointed.',
          body: `Mek model only. Ranged weapons equipped by models in the bearer's unit have the [IGNORES COVER] ability.`,
        },
      ],
    },

    {
      id: 'green-tide',
      name: 'Green Tide',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Mob Mentality',
        flavor:
          'Caught up in the infectious and nigh supernatural belligerence that suffuses such large hordes of Orks on the warpath, the Boyz tend to push through lethal wounds, being too immersed in the energetic riot to worry about such things as long as they have a load of mates to enjoy the fight with.',
        // Faction-Pack Rules Update rewrote this rule (6+/5+ invulnerable, size-gated).
        body: `Each time an attack targets a Boyz unit from your army, models in that unit have a 6+ invulnerable save against that attack. Each time an attack targets a Boyz unit from your army that contains 10 or more models, models in that unit have a 5+ invulnerable save against that attack.`,
      },
      stratagems: [
        {
          name: 'Competitive Streak',
          sublabel: 'Green Tide – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Galvanised by the rest of their mates fighting around them, Orks will redouble their efforts to outdo each other.',
          when: 'Fight phase.',
          target: 'One Boyz unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1. If your unit contains 10 or more models, re-roll the Wound roll instead.',
          restrictions: '',
        },
        {
          name: 'Come On Ladz!',
          sublabel: 'Green Tide – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Orks are drawn to conflict and constantly race into battle at the merest hint of violence.',
          when: 'Your Command phase.',
          target: 'One Boyz unit from your army.',
          effect: 'Return up to D3+2 destroyed models to your unit (excluding Character models).',
          restrictions: '',
        },
        {
          name: 'Bulldozer Brutality',
          sublabel: 'Green Tide – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'In the massive fights that Orks enjoy, the only way to ensure a slice of the action is to bludgeon a path through the press to get a hand on the enemy.',
          when: 'Fight phase.',
          target: 'One Boyz unit from your army that has not been selected to fight this phase and is within Engagement Range of one or more enemy units.',
          effect: 'Until the end of the phase, each time your unit is selected to fight, when determining which models in your unit are eligible to fight, any models in your unit that are within 3" of one or more enemy models are eligible to fight. When resolving those attacks, such models can target one of those enemy units that is within 3" of them and within Engagement Range of their unit.',
          restrictions: '',
        },
        {
          name: "Braggin' Rights",
          sublabel: 'Green Tide – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With volleys of wagers, threats, insults, dung and the occasional hurled rock, mobs of Orks bolster each other\'s spirits in the most Orky ways possible.',
          when: 'Your Command phase.',
          target: 'Two Boyz units from your army that are within 6" of each other.',
          effect: 'Until the start of your next Command phase, while those two units are within 6" of each other, they both count as containing 10 or more models for the purpose of your Detachment rule, any Enhancements models from your army have and any Stratagems you use.',
          restrictions: '',
        },
        {
          name: 'Tide of Muscle',
          sublabel: 'Green Tide – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Once a horde of Orks get a sight of the foe, nothing can stop them.',
          when: 'Your Charge phase.',
          target: 'One Boyz unit from your army that has not declared a charge this phase.',
          // Faction-Pack Rules Update reworded this Effect (add 1, plus re-roll for 10+ models).
          effect: 'Until the end of the phase, each time your unit declares a charge, add 1 to the Charge roll and, if your unit contains 10 or more models, you can re-roll the Charge roll.',
          restrictions: '',
        },
        {
          name: "Go Get 'Em!",
          sublabel: 'Green Tide – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Keeping Orks at arm\'s length and pummelling them with as much firepower as possible is often the safest tactic for their victims. Unfortunately, it can also draw their attention and give them the urge to re-educate the gitz in the joys of up-close savagery.',
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly unengaged BOYZ unit this phase has shot.",
          target: 'That BOYZ unit.',
          // Faction-Pack Rules Update reworded this Effect to a Surge move.
          effect: 'Your unit can make a surge move of up to D6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Ferocious Show Off',
          points: 10,
          flavor: 'This brutal fighter is even more dangerous with a raucous audience of chanting Orks as he displays his violent abilities as a warning to all.',
          body: `Orks Infantry model only. Each time the bearer fights, while resolving those attacks, add 1 to the Strength characteristic of the bearer's melee weapons. If the bearer's unit contains 10 or more models, while resolving those attacks, add 3 to the Strength characteristic instead.`,
        },
        {
          name: "Brutal But Kunnin'",
          points: 25,
          flavor: "What tactics occasionally pop into this Ork's head revolve purely around throwing as many Boyz into the enemy's face as possible.",
          body: `Orks Infantry model only. In your Command phase, if the bearer is on the battlefield (or is embarked within a Transport that is on the battlefield), roll one D6, adding 2 to the result if the bearer's unit contains 10 or more models: on a 5+, you gain 1CP.`,
        },
        {
          name: 'Bloodthirsty Belligerence',
          points: 15,
          flavor: 'Buoyed on by his chanting ladz and eager to smash into his enemies first, this boss leads the way, racing towards one fight after the next.',
          body: `Orks Infantry model only. While the bearer is leading a unit, you can re-roll Advance rolls made for that unit. While that unit contains 10 or more models, you can re-roll Charge rolls made for that unit as well.`,
        },
        {
          name: 'Raucous Warcaller',
          points: 20,
          flavor: 'This hulking boss is a focal point of violent enthusiasm. Orks flocking to his bosspole feel emboldened, the boss exuding an energetic dynamism that keeps his ladz at the height of rampaging excitement.',
          body: `Orks Infantry model only. While the bearer is leading a unit, that unit always counts as containing 10 or more models for the purposes of your Detachment rule and any Stratagems you use.`,
        },
      ],
    },

    {
      id: 'bully-boyz',
      name: 'Bully Boyz',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: "Da Boss Is Watchin'",
        flavor:
          'Gathered together into an all-conquering mass of hulking brutes, the biggest Nobz and their even larger bosses are – or so they claim – more Orky than anyone else. Their bellowed war cries are louder, their self-belief, impetus and sheer presence an affront to the senses. Theirs is a violent momentum that can roll through entire enemy armies in an unrelenting wave of aggression.',
        // Faction-Pack Rules Update moved the trigger to the Command phase.
        body: `At the start of your Command phase, in a turn in which you have not called a Waaagh!, if you have one or more Warboss models on the battlefield (or embarked within a Transport that is on the battlefield), you can call a Waaagh! for a second time this battle. When doing so, that second Waaagh! only counts as having been called for Warboss, Nobz and Meganobz units from your army.`,
      },
      stratagems: [
        {
          name: 'Armed to da Teef',
          sublabel: 'Bully Boyz – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Nobz load themselves with all manner of weapons in shows of wealth and influence, enabling them to smash the foe with a ceaseless barrage of attacks.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Nobz or Meganobz unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Hit roll of 1. If a Waaagh! is active for your unit, you can re-roll the Hit roll instead.',
          restrictions: '',
        },
        {
          name: 'Too Arrogant to Die',
          sublabel: 'Bully Boyz – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With bone-headed arrogance, Nobz will carry on killing before their deaths finally register.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Nobz or Meganobz unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not shot or fought this phase, roll one D6, adding 2 to the result if a Waaagh! is active for your unit. On a 5+, do not remove the destroyed model from play; it can shoot or fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: "Always Lookin' Fer a Fight",
          sublabel: 'Bully Boyz – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'As one enemy falls to the choppas of a battle-hungry mob of Nobz, they immediately seek out more.',
          when: 'Fight phase, just after an enemy unit is destroyed.',
          target: 'One Nobz or Meganobz unit from your army that destroyed that enemy unit.',
          effect: 'Until the end of the phase, each time your unit makes a Consolidation move, it can move up to D3+3" instead of up to 3". If a Waaagh! is active for your unit, it can move up to 6" instead.',
          restrictions: '',
        },
        {
          name: "Krushin' Impact",
          sublabel: 'Bully Boyz – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When a thundering mob of hulking Ork Nobz stampedes into the foe, their crushing momentum is a lethal weapon by itself.',
          when: 'Your Charge phase, just after a Nobz or Meganobz unit from your army ends a Charge move.',
          target: 'That Nobz or Meganobz unit.',
          effect: 'Select one enemy unit within Engagement Range of your unit, then roll one D6 for each model in your unit that is within Engagement Range of that enemy unit: for each 5+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds). If a Waaagh! is active for your unit, that enemy unit suffers 1 mortal wound for each 4+ instead.',
          restrictions: '',
        },
        {
          name: "Cut’ Em Down",
          sublabel: 'Bully Boyz – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Furious with any snivelling gitz who attempt to back away from a good fight, Nobz will ruthlessly hack them apart as they turn to flee.',
          when: "Your opponent's Movement phase, just after an enemy unit is selected to Fall Back.",
          target: 'One Nobz or Meganobz unit from your army within Engagement Range of that enemy unit.',
          effect: 'When that enemy unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if a Waaagh! is active for your unit, subtract 1 from each of those tests.',
          restrictions: '',
        },
        {
          name: 'Hulking Brutes',
          sublabel: 'Bully Boyz – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The sheer aggressive contempt advancing Nobz project, not to mention their thick skulls and 'eavy armour, make them a terrifying prospect for foes desperately trying to gun them down.",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Nobz or Meganobz unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          // Faction-Pack Rules Update reworded the Effect ("until the attacking unit has finished…").
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Big Gob',
          points: 20,
          flavor: "This warlord's bellowing war cry is so loud that it can be heard over the thickest of fighting, rolling outwards in a terrifying bestial roar.",
          body: `Infantry Warboss model only. At the start of the Fight phase, select one enemy unit within Engagement range of the bearer. That unit must take a Battle-shock test, and when doing so, subtract 1 from the result.`,
        },
        {
          name: 'Da Biggest Boss',
          points: 15,
          flavor: 'The bigger the Waaagh!, the bigger the boss must be to exert control. This Ork has countless huge battles under his belt and has grown in stature and aggression to match.',
          body: `Infantry Warboss model only. Add 2 to the bearer's Wounds characteristic.`,
        },
        {
          name: "'Eadstompa",
          points: 10,
          flavor: "A solid slab of muscle and aggression, this Ork is living embodiment of the undeniable truth of his enemies' inferiority.",
          body: `Infantry Warboss model only. Each time the bearer makes an attack that targets a unit that is below its Starting Strength, re-roll a Wound roll of 1. If that unit is Below Half-strength, you can re-roll the Wound roll instead.`,
        },
        {
          name: 'Tellyporta',
          points: 25,
          flavor: 'Nothing shocks the enemy like an angry mob of the biggest and surliest Orks imaginable suddenly appearing in a blast of green lightning!',
          body: `Warboss in Mega Armour model only. Models in the bearer's unit have the Deep Strike ability.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'rollin-deff',
      name: "Rollin' Deff",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      unique: 'WAGONS',
      rule: {
        name: 'Thundering Wagons',
        flavor:
          "Like mobile armoured fortresses, little can stop the crushing impetus of the Orks' hurtling wagons.",
        body: `▪ Friendly Battlewagon / Hunta Rig / Kill Rig units have Wagon.
▪ Friendly Wagon units can re-roll charge rolls.
▪ When a friendly Wagon unit is selected to make an advance move, that unit can change advance rolls to a 6.

This detachment has the WAGONS tag and cannot be taken with another WAGONS detachment.`,
      },
      stratagems: [
        {
          name: 'Brutal Broadside',
          sublabel: "Rollin' Deff – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Rolling into the midst of the foe, this wagon unleashes a rippling fusillade of rapid-fire death and destruction.',
          when: 'Your Shooting phase, when a friendly Battlewagon unit is selected to shoot.',
          target: 'That Battlewagon unit.',
          effect: "Your unit's ranged attacks (excluding attacks made by weapons selected with Firing Deck) have [RAPID FIRE X], where X is that attack's A.",
          restrictions: '',
        },
        {
          name: 'Impending Crunch',
          sublabel: "Rollin' Deff – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Having several tons of metal covered in blood, rust and spikes bearing down on them can shake the resolve of the most stoic warriors.',
          when: 'Your Charge phase, when a friendly Wagon unit ends a charge move.',
          target: 'That Wagon unit.',
          effect: 'Each enemy unit engaged with your unit makes a Battle-shock roll, with -1 to that Battle-shock roll.',
          restrictions: '',
        },
        {
          name: 'Devastating Drift',
          sublabel: "Rollin' Deff – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Hitting the enemy lines at full speed results in a crushing impact and a good deal of indiscriminate spraying gore.',
          when: 'Your Fight phase, when a friendly Wagon unit that made a charge move this turn is selected to fight.',
          target: 'That Wagon unit.',
          effect: "Your unit's melee attacks have [CLEAVE 1].",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Boarding Ramps',
          points: 10,
          upgrade: true,
          flavor: 'Nothing eases the passage of an embarked mob of Orks into the enemy lines than a big plank of rusty metal to stampede down and straight into the fight.',
          body: `Wagon unit only. When a unit embarked within this unit is selected to make a disembark move, that unit has +1 to charge rolls until the end of the turn.`,
        },
        {
          name: "Targetin' Gizmos",
          points: 15,
          upgrade: true,
          flavor: "These sparkly optics and other elaborate gitfindas help focus a wagon's dakka, but it takes a really clever Mek to know how to work them.",
          body: `Wagon unit only. While a Big Mek model is embarked within this unit:
▪ This unit's ranged attacks have [IGNORES COVER].
▪ If the Waaagh! is active for this unit, this unit's ranged attacks have [SUSTAINED HITS 1].`,
        },
      ],
    },

    {
      id: 'more-dakka',
      name: 'More Dakka!',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Dakka! Dakka! Dakka!',
        flavor:
          'Orks have no real concept of ammunition preservation, instead tending to hold the trigger down until their ammunition runs dry or their weapon falls apart in their hands.',
        body: `▪ Friendly Orks Infantry units' ranged attacks have [ASSAULT].
▪ In your Shooting phase, if the Waaagh! is active for your army, friendly Orks Infantry units' ranged attacks have [SUSTAINED HITS 1].`,
      },
      stratagems: [
        {
          name: 'Long, Uncontrolled Bursts',
          sublabel: 'More Dakka! – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When facing off against sneaky gitz who like to lurk in cover, most Orks believe the most effective strategy is to fire off so many bullets and munitions that something is bound to hit the target.',
          when: 'Your Shooting phase, when a friendly Orks Infantry unit is selected to shoot.',
          target: 'That Orks Infantry unit.',
          effect: "Your unit's ranged attacks have [IGNORES COVER].",
          restrictions: '',
        },
        {
          name: 'Speshul Shells',
          sublabel: 'More Dakka! – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Nothing helps a round punch through armour better than stuffing it full of extra propellant.',
          when: 'Your Shooting phase, when a friendly Orks Infantry unit is selected to shoot.',
          target: 'That Orks Infantry unit.',
          effect: "Your unit's ranged attacks that target a unit within 9\" have +1 AP.",
          restrictions: '',
        },
        {
          name: 'Call Dat Dakka?',
          sublabel: 'More Dakka! – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Guncrazed mobs of Orks take incoming fire as a primal challenge, one that must be answered with an even bigger show of dakka.',
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly Orks Infantry unit has shot.",
          target: 'That Orks Infantry unit.',
          effect: 'Your unit shoots using snap shooting, but while doing so your unit can only target that enemy unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Da Gobshot Thunderbuss',
          points: 15,
          flavor: "Requiring an entire chest of teef to be loaded into its breach before each shot, the Gobshot Thunderbuss' worky gubbinz plates its unconventional ammunition in gold before firing it in an inescapable cone of fanged death. Not only can this madcap weapon sweep away swathes of enemies with every shot, it also fires a literal fortune in teef every time, proclaiming its owner's obscene wealth in the process.",
          body: `Orks Infantry model only. This model's ranged attacks have:
▪ [DEVASTATING WOUNDS].
▪ [HAZARDOUS].`,
        },
        {
          name: 'Dead Shiny Shootas',
          points: 15,
          upgrade: true,
          flavor: 'Rumoured to have been made by Big Mek Buzzgob, da Dead Shiny Shootas are a set of multibarrelled brutes packed full of dakka. The guns kick out a deafening storm of hot lead, much to the enjoyment of the Orks pulling the triggers, their volume of fire so great that even the most inaccurate shooter can land a respectable number of hits.',
          body: `Orks Infantry unit only. This unit's ranged attacks have:
▪ [RAPID FIRE 1].
▪ Or: If that attack already has [RAPID FIRE], +1 to the value of that [RAPID FIRE] (e.g. [RAPID FIRE 1] becomes [RAPID FIRE 2]).`,
        },
      ],
    },

    {
      id: 'taktikal-brigade',
      name: 'Taktikal Brigade',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Disruption',
      rule: {
        name: "Lissen 'Ere",
        flavor:
          'Blood Axe leaders bellow actual orders to the ladz under their command, coordinating assaults and even fighting retreats in a most un-Orky and alarmingly organised fashion.',
        body: `▪ Friendly Stormboyz units have Battleline.
▪ When a friendly Boyz / Kommandos / Stormboyz unit is selected to make an advance / fall-back move, that move does not prevent that unit from being eligible to start an action.`,
      },
      stratagems: [
        {
          name: 'Taktikal Retreat',
          sublabel: 'Taktikal Brigade – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Blood Axes feel no shame in retreating from a fight, particularly if the boss wants someone else duffed up.',
          when: 'Your Movement phase, when a friendly Kommandos / Stormboyz unit is selected to make a fall-back move.',
          target: 'That Kommandos / Stormboyz unit.',
          effect: 'That move does not prevent your unit from being eligible to declare a charge.',
          restrictions: '',
        },
        {
          name: 'On to da Next',
          sublabel: 'Taktikal Brigade – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Seeing little value in pursuing fleeing foes, Blood Axe mobs turn their attention towards the next fight or press towards whatever cache of shiny gubbinz the boss desires.',
          when: "End of your opponent's Movement phase.",
          target: 'One friendly unengaged Boyz / Kommandos / Stormboyz unit that was engaged at the start of the phase.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Ded Sneaky',
          sublabel: 'Taktikal Brigade – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Utilising camouflage, cover or misdirection, these Orks slip away to prepare their next ambush, leaving their foes staring at thin air.',
          when: "End of your opponent's Fight phase.",
          target: 'One friendly unengaged Kommandos / Stormboyz unit.',
          effect: 'Place your unit in Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: "Mork's Kunnin'",
          points: 20,
          flavor: 'Possessed of an exceptionally keen mind – for an Ork at least – this boss matches wits with his opponents, holding his ladz back until an opportune moment arrives.',
          body: `Orks model only. When both players have deployed their armies, you can redeploy up to three friendly Orks Infantry units. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Slippery Git',
          points: 15,
          flavor: 'So steeped in the devious ways of the Blood Axe Clan is this Warboss that he can even sneak into battle at the head of a mob of Kommandos.',
          body: `Infantry Warboss model only (excluding Mega Armour models). This model has Infiltrators and Stealth.

In the Declare Battle Formations step, the bearer can be attached to a Kommandos unit.`,
        },
      ],
    },

    {
      id: 'speedwaaagh',
      name: 'Speedwaaagh!',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Turbo Boostas',
        flavor:
          'No self-respecting Speed Freek goes to war without highly tuned, Mek-approved turbo boostas to power them to battle. These devices come in all shapes and sizes, but all give their operators a violent burst of speed, allowing them to close with the enemy at breakneck speed and get stuck in.',
        body: `Each time a Speed Freeks or Trukk unit (excluding Aircraft) from your army Advances, it can use its turbo. If it does, do not make an Advance roll for it; instead, until the end of the phase, models in that unit have a Move characteristic of 24" but can only move in one straight line, and until the end of the turn, ranged weapons equipped by those models have the [ASSAULT] ability and that unit cannot declare a charge.

Designer's Note: When a unit uses its turbo, the models in that unit cannot pivot, and they cannot make a move of two or more straight lines (e.g. to navigate around obstacles). That unit also cannot declare a charge, even if another rule would let it declare a charge in a turn in which it Advanced.`,
      },
      stratagems: [
        {
          name: 'On da Move',
          sublabel: 'Speedwaaagh! – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Speed Freeks live for the thrill of high-octane warfare, rarely letting their feet off the accelerator, even in the most furious fighting.',
          when: 'Your Movement phase.',
          target: 'One Orks unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back or Advanced (unless it used its turbo this turn).',
          restrictions: '',
        },
        {
          name: 'Ded Killy Construction',
          sublabel: 'Speedwaaagh! – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Fitted with jagged ploughs, spiked tyres and steel bars, Ork vehicles are potent weapons in their own right.',
          when: 'Your Fight phase.',
          target: 'One Speed Freeks or Trukk unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability and, if your unit made a Charge move this turn, until the end of the phase, add 1 to the Damage characteristic of those weapons.',
          restrictions: '',
        },
        {
          name: 'Mobile Dakkastorm',
          sublabel: 'Speedwaaagh! – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'No self-respecting Speed Freek stops to aim. Instead, they fire on the move, concentrating hails of dakka on their chosen targets.',
          when: 'Your Shooting phase, just after a Speed Freeks or Trukk unit from your army has shot.',
          target: 'That Speed Freeks or Trukk unit.',
          effect: 'Select one enemy unit hit by one or more of those attacks (excluding attacks made with Indirect Fire weapons). Until the end of the phase, each time a model in a Speed Freeks or Trukk unit from your army makes an attack that targets that unit, improve the Strength characteristic of that attack by 2.',
          restrictions: '',
        },
        {
          name: 'Dust Trails',
          sublabel: 'Speedwaaagh! – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Large formations of Ork vehicles throw up columns of dust and clouds of smoke. These combine to shroud and obscure them as they thunder across the battlefield.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Orks unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit has the Benefit of Cover.',
          restrictions: '',
        },
        {
          name: 'Speshul Ammo',
          sublabel: 'Speedwaaagh! – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Though the cost in teef is high, Mek-crafted speshul ammunition always comes in handy when taking on big targets.',
          when: 'Your Shooting phase.',
          target: 'One Orks unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit (excluding Torrent weapons) have the [ANTI-MONSTER 4+] and [ANTI-VEHICLE 4+] abilities.',
          restrictions: '',
        },
        {
          name: 'Evasive Manoova',
          sublabel: 'Speedwaaagh! – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The wiliest Speed Freeks see no shame in running away, especially when they can always come back and have 'annuva go.",
          when: "End of your opponent's Fight phase.",
          target: 'One Speed Freeks or Trukk unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Kustom Shokk Box',
          points: 10,
          flavor: 'Obtained from a Big Mek for a veritable fortune of teef, this device incorporates a shokk-boosta that enables a Warboss and their steed to take potentially deadly shortcuts through the Warp.',
          body: `Deffkilla Wartrike model only. Each time the bearer uses its turbo, its unit can move horizontally through terrain features.`,
        },
        {
          name: 'Dakkamek',
          points: 25,
          flavor: "Mekboyz with a penchant for overwhelming firepower can always get some more dakka out of a vehicle's guns.",
          body: `Mek model only. Each time the bearer uses its Mekaniak ability, until the start of your next Command phase, ranged weapons equipped by the selected Vehicle model have the [RAPID FIRE 1] ability.`,
        },
        {
          name: 'Supa-Burny Fuel',
          points: 15,
          flavor: 'The highly volatile, Mek-brewed fuel that powers this Wartrike emits particularly large and exceptionally deadly gouts of flame.',
          body: `Deffkilla Wartrike model only. Change the Attacks characteristic of the bearer's killa jet – burna weapon to 3D6, and change the Attacks characteristic of the bearer's killa jet – cutta weapon to 3.`,
        },
        {
          name: 'Master Meknologist',
          points: 20,
          flavor: 'A talented gunsmith, even by the standards of his Big Mek rivals, this Ork reserves the finest of his creations for personal use.',
          body: `Big Mek model only. Improve the Ballistic Skill characteristic of the bearer's ranged weapons by 1.`,
        },
      ],
    },

    {
      id: 'blitz-brigade',
      name: 'Blitz Brigade',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      unique: 'WAGONS',
      rule: {
        name: 'Eager for the Fight',
        flavor:
          'Blitz Brigades thunder into battle laden with eager, belligerent Orks, all desperate to get stuck into the enemy. Clambering from transport compartments or leaping from armoured hulls, these wild-eyed killers descend on the enemy in roaring savagery.',
        body: `Each time an Orks unit from your army disembarks from a Transport, until the end of the turn, you can re-roll Advance and Charge rolls made for that Orks unit.`,
      },
      stratagems: [
        {
          name: 'Mount Up, Ladz',
          sublabel: 'Blitz Brigade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With nothing left to blast or krump, these Orks scramble aboard their transport and thunder towards the next engagement.',
          when: 'End of the Fight phase.',
          target: 'One Orks Infantry unit from your army that is not within Engagement Range of one or more enemy units, and one friendly Transport it is able to embark within.',
          effect: 'If your Orks Infantry unit is wholly within 6" of that Transport, it can embark within it.',
          restrictions: '',
        },
        {
          name: 'Armoured Duellists',
          sublabel: 'Blitz Brigade – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Ork crews delight in engaging enemy vehicles and monsters in mobile battles.',
          when: 'Your Shooting phase.',
          target: 'One Orks Vehicle unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time your unit makes an attack that targets a Monster or Vehicle unit, add 1 to the Hit roll and add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Mekanised Brutality',
          sublabel: 'Blitz Brigade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'As Orkoid vehicles thunder into battle at high speed, hatches and ramps swing open, unleashing eager mobs into the thick of the fight.',
          when: 'Your Movement phase.',
          target: 'One Battlewagon, Kill Rig or Hunta Rig unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the turn, each time a unit disembarks from your unit after your unit makes a Normal move, that disembarked unit is still eligible to declare a charge this turn.',
          restrictions: '',
        },
        {
          name: 'Impervious',
          sublabel: 'Blitz Brigade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Ramshackle though they may appear, Ork vehicles are frighteningly resilient in their construction.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Battlewagon, Kill Rig or Hunta Rig unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: "Run 'Em Down",
          sublabel: 'Blitz Brigade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Driving forward in loose formation, Ork vehicles smash into the foe, crushing fleeing enemies beneath tyres, steel tracks and Squig trotters.',
          when: 'Your Movement phase.',
          target: 'One Battlewagon, Kill Rig or Hunta Rig unit from your army that has not been selected to move this phase.',
          effect: 'Select up to two other friendly Orks Vehicle or Orks Monster units within 6" of your unit. Until the end of the turn, your unit and each unit you selected are eligible to declare a charge in a turn in which they Advanced.',
          restrictions: '',
        },
        {
          name: 'Yooz in Trouble Now',
          sublabel: 'Blitz Brigade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Spilling from their damaged transport, enraged Orkoid infantry mobs surge towards their attackers.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: 'One Battlewagon, Hunta Rig or Kill Rig model from your army that was hit by one or more of the attacking unit\'s attacks.',
          effect: 'One Orks Infantry unit embarked within your model makes a disembark move, then makes a surge move of up to D6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: "Runnin' Boots",
          points: 10,
          flavor: 'These squighide boots were looted from the corpse of a particularly nippy Speed Freek. The wearer is utterly convinced that they make him faster.',
          body: `Orks Infantry Character model only. Each time you make a Charge roll for the bearer's unit, if that unit disembarked from a Transport this turn, add 1 to the result.`,
        },
        {
          name: 'Blitzkaptin',
          points: 25,
          flavor: 'Keeping a Blitz Brigade going in one direction is hard enough for most Orks. This particular commander, however, is a master of armoured taktiks.',
          body: `Orks Character model only. After both players have deployed their armies, if the bearer's unit (or any Transport it is embarked within) is on the battlefield, select up to three Orks Vehicle units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Supercharged Squig Oil',
          points: 10,
          flavor: 'A few drops of this volatile admixture of Squig oil, rokkit fuel and various other noxious chemicals is enough to provide any engine with increased performance.',
          body: `Mek model only. Each time the bearer uses its Mekaniak ability, until the end of the turn, you can re-roll Charge rolls for the selected Vehicle model's unit.`,
        },
        {
          name: 'Tuff Git',
          points: 5,
          flavor: "Big, brash and belligerent, this Ork is resilient in both mind and body. Even the explosion of his transport isn't enough to shake him.",
          body: `Orks Infantry Character model only. At the end of a phase in which the bearer's unit disembarked from a Transport, if that unit is Battle-shocked, it is no longer Battle-shocked.`,
        },
      ],
    },

    {
      id: 'freebooter-krew',
      name: 'Freebooter Krew',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Here Be Loot',
        flavor:
          "Grabbing loot is a Freebooter's favourite pastime, followed closely by bludgeoning senseless anyone stupid enough to try to stop him doing so – or, even worse, seeking to take the loot for themselves.",
        body: `At the start of your Command phase, select one objective marker. Until the start of your next Command phase, that objective marker is your loot objective.

Each time a model in an Orks Infantry, Orks Mounted or Orks Walker unit from your army makes an attack, that attack has the [SUSTAINED HITS 1] ability if either or both of the following are true:
▪ That model's unit is within range of your loot objective.
▪ That attack targets a unit within range of your loot objective.`,
      },
      stratagems: [
        {
          name: 'Bash and Grab',
          sublabel: 'Freebooter Krew – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Freebooterz waste no time getting violently stuck into anyone unwise enough to try to keep prized loot out of their grasping claws.',
          when: 'The Fight phase.',
          target: 'One Orks unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit within range of the loot objective, you can re-roll the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Grab and Bash',
          sublabel: 'Freebooter Krew – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Few warriors in the galaxy fight with greater brutality than a Freebooter determined to hang onto his loot.',
          when: 'Your Command phase.',
          target: 'One Orks unit from your army (excluding Gretchin units) that is within range of the loot objective.',
          effect: 'Until the start of your next Command phase, the Waaagh! is active for your unit, even if you have already called a Waaagh! this battle.\n\n**Designer’s Note:** This means that any abilities that are in effect while the Waaagh! is active for your army will be in effect for your unit.',
          restrictions: '',
        },
        {
          name: "Boardin' Rush",
          sublabel: 'Freebooter Krew – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Having cut their gold-plated fangs storming aboard hostile warships, these Freebooterz are good at getting stuck straight into the enemy.',
          when: 'Your Movement phase.',
          target: 'One Orks unit from your army that has not been selected to move this phase.',
          effect: 'Until the end of the phase, each time your unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit.',
          restrictions: '',
        },
        {
          name: 'Deck Fraggers',
          sublabel: 'Freebooter Krew – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Invented by some sadistic Bad Mek, these shrapnel-packed rounds of kustom ammunition are excellent for scything down tight-packed enemy infantry.',
          when: 'Your Shooting phase.',
          target: 'One Orks unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit targets an Infantry unit with a ranged weapon, that weapon has the [BLAST] ability.',
          restrictions: '',
        },
        {
          name: 'Rolling Loot-Heap',
          sublabel: 'Freebooter Krew – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Just because an enemy vehicle is still mobile and fighting doesn't stop any suitably arrogant Flash Gitz from claiming it as their loot, especially when their snazzguns are more than capable of explosively backing up that claim.",
          when: 'Your Shooting phase.',
          target: 'One Flash Gitz unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [ANTI-VEHICLE 4+] ability.',
          restrictions: '',
        },
        {
          name: 'Krump and Run',
          sublabel: 'Freebooter Krew – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Freebooterz are unscrupulous pirates through and through, always on the look out for new looting opportunities and sometimes even willing to forgo a good punch up in favour of hauling away their riches.',
          when: "Your opponent's Movement phase, just after an enemy unit falls back.",
          target: 'One Orks unit from your army that was within engagement range of that enemy unit at the start of the phase and is not within range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Da Kaptin',
          points: 10,
          flavor: 'Kaptins are experts in violently motivating their lads in the pursuit of even more loot.',
          body: `Warboss model only. Once per battle round, at the start of any phase, you can select one friendly Orks unit that is Battle-shocked and within 12" of the bearer. That unit suffers D3 mortal wounds and it is no longer Battle-shocked.`,
        },
        {
          name: 'Git-Spotter Squig',
          points: 20,
          flavor: 'Wealthy Freebooterz can afford augmetically enhanced Gitspotter Squigs to sit on their shoulders and spot gits.',
          body: `Orks model only. Ranged weapons equipped by models in the bearer's unit have the [IGNORES COVER] ability.`,
        },
        {
          name: 'Bionik Workshop',
          points: 15,
          flavor: 'Bad Meks and Doks are sought after by Freebooterz to provide cybork bioniks for those with the teef to pay.',
          body: `Big Mek or Painboy model only. At the start of the battle, roll one D3 and compare the result to the list below. Until the end of the battle, models in the bearer's unit have that bioniks ability.
▪ **1. Bionik Legs:** Add 2" to the Move characteristic of this model.
▪ **2. Bionik Arms:** Add 1 to the Strength characteristic of melee weapons equipped by this model.
▪ **3. Bionik Bonce:** Improve the Weapon Skill characteristic of melee weapons equipped by this model by 1.`,
        },
        {
          name: "Razgit's Magik Map",
          points: 25,
          flavor: 'Stolen from a humie cogboy, this remarkable digital map helps Freebooterz outwit their enemies.',
          body: `Orks model only. After both players have deployed their armies, select up to three Orks Infantry units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
      ],
    },

    // Added in the App v2.2.0 (data_version 909) dataslate. appdata's own `category` field for
    // all 3 of its stratagems is null (a gap in that dataslate's data, not specific to this
    // detachment) — sublabel categories below are inferred from the effect/timing pattern
    // against existing stratagems of the same shape, not read directly from source; re-verify
    // against the physical card/PDF if one becomes available.
    {
      id: 'equatorial-hordes',
      name: 'Equatorial Hordes',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Jungle Know-wotz',
        flavor: 'The Ork tribes of the Equatorial Jungle know their territories all too well, and can always find a kunnin’ trail by which they can sneak up on their quarry.',
        body: `In the Declare Battle Formations step, select up to three friendly Mob/Kommandos units. Those units have Scouts 6" until the end of the battle.`,
      },
      stratagems: [
        {
          name: "Dey're Over 'Ere",
          sublabel: 'Equatorial Hordes – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Pointing and shouting can prove a surprisingly effective way of rooting out hidden enemies.',
          when: 'Start of your Shooting phase.',
          target: 'One friendly Mob/Kommandos unit.',
          effect: 'While a visible enemy unit is within 6" of your unit, that unit has +3" detection range.',
          restrictions: '',
        },
        {
          name: 'Stragglerz',
          sublabel: 'Equatorial Hordes – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Extricating themselves from dense jungle terrain takes some Orks longer than others, but the latecomers arrive just in time to bolster their warband’s ranks.',
          when: 'Your Command phase.',
          target: 'One friendly Mob/Kommandos unit.',
          effect: 'Your unit heals 2D3 wounds.',
          restrictions: '',
        },
        {
          name: 'Concealed Krumpin’',
          sublabel: 'Equatorial Hordes – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Orks erupting as though from nowhere amidst hails of dakka and flurries of ferocious choppa blows can cause spectacular devastation.',
          when: 'Your Shooting phase or the Fight phase, when a friendly hidden Mob unit is selected to attack.',
          target: 'That Mob unit.',
          effect: 'Your unit’s attacks have [LETHAL HITS].',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Kunnin’ Hunta',
          points: 25,
          flavor: 'It takes both brutality and kunnin’ to stalk the monstrous carnivores of Armageddon’s deep jungles. The same talents can be applied to hunting battlefield foes.',
          body: `BEASTBOSS/INFANTRY WARBOSS model only. (Once per turn, per unit) In your opponent's Movement phase, when an enemy unit ends a move within 8" of this unit, if this unit is unengaged, this unit can make a normal move of up to D3+3".`,
        },
        {
          name: 'Unkillable Scourge',
          points: 25,
          flavor: 'Having survived the perilous jungles long enough to claim rule over Armageddon’s equatorial tribes, this Ork leader has built up an impressive immunity to staying dead.',
          body: `BEASTBOSS/INFANTRY WARBOSS model only. When this model is destroyed, if this unit has not been selected to fight this phase, roll one D6, with +1 to that roll if the Waaagh! is active for this unit:
▪ On a 3+, do not remove this model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const orks = { en, ru: en }
