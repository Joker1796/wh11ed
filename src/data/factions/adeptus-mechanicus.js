// Adeptus Mechanicus — faction rules. Resolved from the same source priority as the
// other factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack >
// Codex > Index.
//
//   Codex: Adeptus Mechanicus (sources/codex/imperium/Adeptus_Mechanicus.pdf) → army
//     rule (Doctrina Imperatives) + 5 base detachments (Rad-Zone Corps, Skitarii Hunter
//     Cohort, Data-Psalm Conclave, Explorator Maniple, Cohort Cybernetica).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/imperium/AdM.pdf) → 5 extra detachments
//     (Cohort Acquisitus, Lords of the Forge, Luminen Auto-choir, Eradication Cohort,
//     Haloscreed Battle Clade) + Rules Updates.
//   MFM (src/data/mfm/adeptus-mechanicus.js) → per-enhancement points, per-detachment
//     dp / forceDisposition, and the DATA-PSALM `unique` tag.
//
// 10 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been
// folded into the codex army rule / detachment rules / enhancements (they are the
// authoritative newer wording) — see inline notes. Data-Psalm Conclave and Luminen
// Auto-choir both carry the DATA-PSALM tag (mutually exclusive; `unique` field).
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions);
// swap in a translated object later. Markup follows useRenderInline / RuleBlock /
// StratCard conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ `
// bullet lines, `### ` subheadings. Datasheets are a later pass (`datasheets`).

const en = {
  slug: 'adeptus-mechanicus',
  name: 'Adeptus Mechanicus',

  // Doctrina Imperatives — the two Imperatives folded in as `### ` subheadings. Both carry
  // the Faction-Pack Rules Update wording (added the BS/WS improvement and the BATTLELINE
  // clauses; the codex versions only had the deployment-zone AP tweak).
  armyRule: {
    id: 'doctrina-imperatives',
    name: 'Doctrina Imperatives',
    flavor:
      "An Adeptus Mechanicus army marching to war is a sight both terrifying and glorious, each holy warrior a disturbing fusion of Human and machine. The ruling Tech-Priests and their fanatical followers raise modified voices in praise of the Machine God, controlling their cyborg soldiery and mechanical creations through doctrina imperatives encoded to augment and adapt the warriors' abilities.",
    body: `At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.

### Protector Imperative
▪ Ranged weapons equipped by models in this unit have the [HEAVY] ability.
▪ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.
▪ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.

### Conqueror Imperative
▪ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.
▪ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.
▪ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'rad-zone-corps',
      name: 'Rad-Zone Corps',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Rad-bombardment',
        flavor:
          'Whether as a result of natural phenomena, apocalyptic internecine strife or calamitous accidents, many forge worlds are heavily irradiated. When holy wars of requisition are unleashed, the Tech-Priests think nothing of turning this invisible curse upon their foes, bombarding the battlefield with deadly radiation prior to an assault.',
        body: `### Bombardment
At the start of the first battle round, for each enemy unit within your opponent's deployment zone, your opponent must decide whether that unit will take cover or stand firm. You then roll one D6 for each of those enemy units and apply the relevant result below:
▪ **Unit Standing Firm:** On a 3+, that unit suffers D3 mortal wounds.
▪ **Unit Taking Cover:** That unit is Battle-shocked. On a 5+, that unit suffers D3 mortal wounds.

### Fallout
At the start of your Command phase during the second, third, fourth and fifth battle rounds, roll one D6 for each enemy unit within your opponent's deployment zone. On a 3+, that unit suffers 1 mortal wound and must take a Battle-shock test.`,
      },
      stratagems: [
        {
          name: 'Baleful Halo',
          sublabel: 'Rad-Zone Corps – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'By briefly unshielding the most corrosive or irradiated components of their being, the warriors of a Rad-Zone Corps can exhale an isotopic fog, sapping the strength of those not inured to its effects.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Mechanicus unit from your army (excluding Vehicle units) that was selected as the target of one or more of the attacking unit's attacks. If that unit is Battleline, you can also target one friendly Skitarii unit (excluding Battleline units) within 6\" of it.",
          effect: 'Until the end of the phase, each time an attack targets one of those units from your army, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Pre-calibrated Purge Solution',
          sublabel: 'Rad-Zone Corps – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Employing targeting data collated by a swarm of servo-skulls released over the enemy's battle lines, the Machine God's faithful purge the foe stumbling amidst rad-scourged positions.",
          when: 'Your Shooting phase.',
          target: 'One Adeptus Mechanicus unit from your army that has not been selected to shoot this phase. If that unit is Battleline, you can also target one friendly Skitarii unit (excluding Battleline units) within 6" of it.',
          effect: "Until the end of the phase, each time a model in one of those units makes a ranged attack, if the target of that attack is within your opponent's deployment zone, you can re-roll the Hit roll.",
          restrictions: '',
        },
        {
          name: 'Extinction Order',
          sublabel: 'Rad-Zone Corps – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'As Tech-Priests order the purge of an area of the battlefield, hazardous bombardments are redoubled in the hopes of turning it into a wasteland.',
          when: 'Your Command phase.',
          target: 'One Tech-Priest model from your army and one objective marker within 24" of that model.',
          effect: 'Roll one D6 for each enemy unit within range of that objective marker. On a 4+, that unit suffers 1 mortal wound and must take a Battle-shock test.',
          restrictions: '',
        },
        {
          name: 'Lethal Dosage',
          sublabel: 'Rad-Zone Corps – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Tri-fold sanctified power cells, fuel canisters and solid slugs have spent a decade in the most irradiated forge temple to certify their lethality.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Mechanicus unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [LETHAL HITS] ability.',
          restrictions: '',
        },
        {
          name: 'Aggressor Imperative',
          sublabel: 'Rad-Zone Corps – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Skitarii feel the press of an invisible hand upon their minds as the Machine God drives them forward. Servos are pushed to their structural limits, propelling the faithful on an unstoppable crusade.',
          when: 'Your Movement phase.',
          target: 'One Skitarii unit from your army that has not been selected to move this phase. If that unit is Battleline, you can also target one friendly Skitarii unit (excluding Battleline units) within 6" of it.',
          effect: 'Until the end of the phase, each time one of those units Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6" to the Move characteristic of models in that unit.',
          restrictions: '',
        },
        {
          name: 'Bulwark Imperative',
          sublabel: 'Rad-Zone Corps – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: "With a pulse of force-loaded wisdom, microactuators lock into bracing positions, reserve power cells are brought online and the Omnissiah's holy crusaders are bestowed with a sensation of sacred invulnerability.",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Skitarii unit from your army that was selected as the target of one or more of the attacking unit's attacks. If that unit is Battleline, you can also target one friendly Skitarii unit (excluding Battleline units) within 6\" of it.",
          effect: 'Until the end of the phase, models in those units from your army have a 4+ invulnerable save.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Radial Suffusion',
          points: 25,
          flavor: 'By transmitting their precision battlefield observations, this servant of the Omnissiah ensures the saturation of the enemy position is a creeping curse, spreading a hazardous suffusion towards those foes seeking to outrun the vengeance of the Machine God.',
          body: `Adeptus Mechanicus model only. From the second battle round onwards, when resolving the Fallout effect of the Rad-bombardment Detachment rule, if the bearer is on the battlefield, roll one D6 for each enemy unit within 6" of your opponent's deployment zone, in addition to those that are within your opponent's deployment zone.`,
        },
        {
          name: 'Malphonic Susurrus',
          points: 20,
          flavor: 'This master of splintered choruses leads their followers in a projection of clashing frequencies. Scanners and sensoriums trained in their direction are befouled by the disruptive input.',
          body: `Adeptus Mechanicus model only. While the bearer is leading a unit, models in that unit have the Stealth ability.`,
        },
        {
          name: 'Peerless Eradicator',
          points: 20,
          flavor: 'This perfectionist zealot directs their minions in the rapid and single-minded termination of all enemies of the Omnissiah.',
          body: `Adeptus Mechanicus model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.`,
        },
        {
          name: 'Autoclavic Denunciation',
          points: 15,
          flavor: 'This devotee harbours a fanatical hatred of the biological. They have learned the secret weaknesses inherent in all flesh and do not hesitate to exploit them.',
          body: `Adeptus Mechanicus model only. Ranged weapons equipped by the bearer have the [ANTI-INFANTRY 2+] and [ANTI-MONSTER 4+] abilities.`,
        },
      ],
    },

    {
      id: 'skitarii-hunter-cohort',
      name: 'Skitarii Hunter Cohort',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Stealth Optimisation',
        flavor:
          'Hunter Cohorts combine a mastery of stealth warfare and cogitational analysis with stealth screen projectors and target-fouling apparatuses. They are elusive foes to face, and especially sinister to those they have designated as prey.',
        body: `Friendly SKITARII INFANTRY, SKITARII MOUNTED and IRONSTRIDER BALLISTARII units have Stealth.`,
      },
      stratagems: [
        {
          name: 'Bionic Endurance',
          sublabel: 'Skitarii Hunter Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Between their multi-layered bionics and their fanatical faith in the indomitability of these machine-blessings, the most augmented of Skitarii are nigh-impossible to lay low.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Sicarian, Pteraxii or Sydonian unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability.',
          restrictions: '',
        },
        {
          name: 'Isolate and Destroy',
          sublabel: 'Skitarii Hunter Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The swiftest hunters seek to engage foes with the equations of war in their favour, isolating their quarry and dispatching it with ruthless efficiency.',
          when: 'Your Shooting phase.',
          target: 'One Sicarian, Pteraxii, Sydonian, Ironstrider Ballistarii or Skitarii Mounted unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, if there are no other enemy units within 6" of the unit targeted by that attack, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Binharic Offence',
          sublabel: 'Skitarii Hunter Cohort – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'Employing directed binharic entanglement to coordinate their motions, paired squads of Skitarii attack with eerie and lethal synchronicity.',
          when: 'The start of your Shooting phase or the start of the Fight phase.',
          target: 'Two Skitarii units from your army that have not been selected to shoot or fight this phase, and one enemy unit.',
          effect: 'Until the end of the phase, improve the Armour Penetration characteristic of weapons equipped by models in both of your units by 1.',
          restrictions: 'Until the end of the phase, each time a model in either of your units makes an attack, it can only target that enemy unit (and only if it is an eligible target).',
        },
        {
          name: 'Shroud Protocols',
          sublabel: 'Skitarii Hunter Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'When Skitarii Hunter Cohorts march to war, they do so beneath a shrouding squall of cyber-static and filament-heavy banks of sacred incense.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Skitarii Infantry unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          restrictions: '',
        },
        {
          name: 'Expedited Purge Protocol',
          sublabel: 'Skitarii Hunter Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Binharic imperatives flash through neural architecture, driving augmetic muscle-bundles and auto-actuators into overdrive to propel the Skitarii more swiftly into the fray.',
          when: 'Your Charge phase.',
          target: 'One Skitarii unit from your army.',
          effect: 'Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
          restrictions: '',
        },
        {
          name: 'Programmed Withdrawal',
          sublabel: 'Skitarii Hunter Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Taking direct control of their cybernetic soldiers' manoeuvres, the cohort's commander sees their withdrawal carried out with such precision that they can be pressed back into service from the most efficacious of attack vectors.",
          when: "End of your opponent's Fight phase.",
          target: 'Up to two Sicarian units from your army, or one Skitarii Infantry or Skitarii Mounted unit from your army.',
          effect: 'Remove those units from the battlefield and place them into Strategic Reserves.',
          restrictions: 'Each unit targeted with this Stratagem must be more than 3" away from all enemy units.',
        },
      ],
      enhancements: [
        {
          name: 'Cantic Thrallnet',
          points: 25,
          flavor: 'Proclaimed to be a direct data-link to the will of the Omnissiah himself, this neuro-entanglement matrix allows for hyper-optimised combat cogitation.',
          body: `Skitarii Marshal model only. At the start of the battle round, you can select one friendly Skitarii unit within 12" of the bearer. Until the start of the next battle round, the Protector Imperative and the Conqueror Imperative are both active for that unit.`,
        },
        {
          name: 'Clandestine Infiltrator',
          points: 15,
          flavor: 'Under cover of auspex scramblers, this holy soldier leads their fellows in a stealthy advance.',
          body: `Skitarii model only. The bearer, and models in any unit they are leading, have the Infiltrators and Scouts 6" abilities.`,
        },
        {
          name: 'Veiled Hunter',
          points: 10,
          flavor: "In silent supplication, a concentrated burst of noospheric negation manifests as a heavy band of shadow. Under this shroud, this commander's warriors obfuscate the foes' sensors and confuse their strategy.",
          // Faction-Pack Rules Update reworded this enhancement (dropped the "and determined
          // who has the first turn" clause — now triggers after deployment).
          body: `Skitarii Marshal model only. After both players have deployed their armies, you can select up to three Skitarii Infantry units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Battle-sphere Uplink',
          points: 25,
          flavor: 'Tapping into infostacks of data emanating from across the wider battle-sphere, this experienced Skitarius synchronises with the flow of wisdom, drawing upon data that enables near-prophetic reactions.',
          body: `Skitarii model only. In your Shooting phase, after the bearer's unit has shot, if it is not within Engagement Range of one or more enemy units, that unit can make a Normal move of up to 6". If it does, until the end of the turn, that unit is not eligible to declare a charge.`,
        },
      ],
    },

    {
      id: 'data-psalm-conclave',
      name: 'Data-Psalm Conclave',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      unique: 'DATA-PSALM',
      rule: {
        name: 'Benedictions of the Omnissiah',
        flavor:
          'The Tech-Priests of the Omnissiah lead their disciples in a cortege of war. The buzz of static psalms chanted in synchronicity unites all in the stately eradication of the heretic and blasphemer.',
        body: `At the start of the first battle round, select one of the following Benedictions of the Omnissiah to be active for Cult Mechanicus units from your army until the end of the battle:
▪ **Panegyric Procession:** Each time a Cult Mechanicus model from your army makes a ranged attack that targets a unit within half range, improve the Armour Penetration characteristic of that attack by 1.
▪ **Citation in Savagery:** Each time a Cult Mechanicus unit from your army is selected to fight, if that unit made a Charge move this turn, until the end of the phase, add 1 to the Strength and Attacks characteristics of melee weapons equipped by models in that unit.

This detachment has the DATA-PSALM tag and cannot be taken with another DATA-PSALM detachment.`,
      },
      stratagems: [
        {
          name: 'Incantation of the Iron Soul',
          sublabel: 'Data-Psalm Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Raising their voices in binharic praise, the Machine God's disciples bolster their spirits — as well as those that inhabit their augmentations — with iron surety.",
          when: 'Any phase, just after you allocate a mortal wound to a Cult Mechanicus model from your army.',
          target: "That Cult Mechanicus model's unit.",
          effect: 'Until the end of the phase, Cult Mechanicus models in your unit have the Feel No Pain 4+ ability against mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Tribute of Emphatic Veneration',
          sublabel: 'Data-Psalm Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "A cacophonous chorale pours from the emitters and augmented throats of the Cult Mechanicus' faithful, venerating the Omnissiah in deafening and disconcerting frequencies of praise.",
          when: 'Start of your Movement phase.',
          target: 'One Cult Mechanicus unit from your army and one enemy unit within 18" of it.',
          effect: 'That enemy unit must take a Battle-shock test. If that test is failed, until the start of your next Command phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Chant of the Remorseless Fist',
          sublabel: 'Data-Psalm Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'In spitting out a staccato chant to the Motive Force, the faithful warriors of the Cult Mechanicus are filled with merciless surety as well as intent.',
          when: 'Fight phase.',
          target: 'One Cult Mechanicus unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a Cult Mechanicus model in your unit makes a melee attack, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Litany of the Electromancer',
          sublabel: 'Data-Psalm Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Summoning the spark of the Machine God's divinity that burns within them, the Omnissiah's faithful manifest blazing auras of energy that lay low the unbeliever.",
          when: 'Your Shooting phase.',
          target: 'One Cult Mechanicus unit from your army.',
          effect: 'Roll one D6 for each enemy unit within 6" of one or more Cult Mechanicus models in your unit, adding 1 to the result if that model is an Electro-Priest. On a 5+, that enemy unit suffers D3 mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Verse of Vengeance',
          sublabel: 'Data-Psalm Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Rousing code in binharic duometer incites fury for the lost fragments of technological lore. In the grip of vengeance, the devoted extend their remaining functions for one last act of retribution.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Cult Mechanicus unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a Cult Mechanicus model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: 'Luminescent Blessing',
          sublabel: 'Data-Psalm Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'As the cohorts of the Omnissiah recite their dazzling consecration, energy is redirected to infuse masterwork bionics and even the lambent glow of protective fields ignites in a halo of divine defence.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Cult Mechanicus unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, Cult Mechanicus models in your unit have a 4+ invulnerable save.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Mechanicus Locum',
          points: 5,
          flavor: 'Amongst every congregation of Tech-Priests are masters of arcane knowledge — inspirational leaders of the cybernetic and the mechanical.',
          body: `Tech-Priest model only. The bearer has a Leadership characteristic of 6+ and, once per battle, at the start of any phase, you can select one friendly Cult Mechanicus unit that is Battle-shocked and within 12" of the bearer. That unit is no longer Battle-shocked.`,
        },
        {
          name: 'Mantle of the Gnosticarch',
          points: 10,
          flavor: 'The toughened weave of this hooded robe includes hypo-ceramic threads, thermoplastics and terranic polymers that create a holy shroud capable of resisting the infernos of plasma reactors.',
          body: `Tech-Priest model only. Each time an attack is allocated to the bearer, change the Damage characteristic of that attack to 1.`,
        },
        {
          name: 'Data-blessed Autosermon',
          points: 15,
          flavor: "Struck with an infoload of revelation, truly blessed Tech-Priests will override the sacred canticles to deliver the Machine God's adaptive wisdom.",
          body: `Tech-Priest model only. Once per battle, at the start of your Command phase, you can select the Benediction of the Omnissiah you did not select at the start of the first battle round. Until the start of your next Command phase, that Benediction of the Omnissiah is active for the bearer's unit in addition to the one that is currently active for your army.`,
        },
        {
          name: 'Temporcopia',
          points: 20,
          flavor: "The Temporcopia is a relic from the Dark Age of Technology that releases a swarm of nano-engineered machines. These invisible devices seek out nearby prey, briefly draining electro-chemical potential before their power expires. Enemy warriors slow and stumble, at the mercy of the Tech-Priest's bodyguard.",
          body: `Tech-Priest model only. The bearer's unit has the Fights First ability.`,
        },
      ],
    },

    {
      id: 'explorator-maniple',
      name: 'Explorator Maniple',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Acquisition at Any Cost',
        flavor:
          'In their eternal quest for the acquisition of knowledge and technology, Tech-Priests require superhuman efforts from the troops under their command.',
        body: `At the start of your Command phase, select one objective marker. Until the start of your next Command phase, that objective marker is your Acquisition objective marker. Each time an Adeptus Mechanicus model from your army makes an attack, if that model's unit is within range of your Acquisition objective marker, or if the target of that attack is within range of your Acquisition objective marker, re-roll a Wound roll of 1.`,
      },
      stratagems: [
        {
          name: 'Cached Acquisition',
          sublabel: 'Explorator Maniple – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Death is irrelevant compared to the hallowed duty of securing the Omnissiah's knowledge for future retrieval.",
          when: 'Any phase.',
          target: 'One Adeptus Mechanicus unit from your army that was just destroyed while it was within range of an objective marker you controlled. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: "That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Auto-oracular Retrieval',
          sublabel: 'Explorator Maniple – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'With a surge of targeting data from the war engine as its hatches slam open, the warriors inside pour out with weapons already trained unerringly on the foe.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Mechanicus unit from your army that disembarked from a Transport this turn.',
          effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack that targets an enemy unit within range of your Acquisition objective marker, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Priority Reclamation',
          sublabel: 'Explorator Maniple – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Retrieval of the most sacred and ancient fragments of technology is embedded in loops of alpha-logic.',
          when: 'Fight phase, just before an Adeptus Mechanicus unit from your army Consolidates.',
          target: 'That Adeptus Mechanicus unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Consolidation move, it can move up to 6" instead of up to 3", provided your unit ends that Consolidation move within range of your Acquisition objective marker.',
          restrictions: 'You cannot target a unit with this Stratagem if it is within 3" of one or more enemy units.',
        },
        {
          name: 'Incense Exhausts',
          sublabel: 'Explorator Maniple – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The machine spirits of sanctified war engines can be entreated to release clouds of incense laced with radioactive particles, veiling the faithful from the foe.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Mechanicus Infantry unit from your army that was selected as the target of one or more of the attacking unit's attacks, and one friendly Adeptus Mechanicus Smoke unit within 6\" of it.",
          effect: 'Until the end of the phase, both of those units have the Stealth ability and the Benefit of Cover.',
          restrictions: '',
        },
        {
          name: 'Infoslave Skull',
          sublabel: 'Explorator Maniple – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Mono-task infoslave skulls range ahead to assess potential sites that must be investigated.',
          when: 'Your Command phase.',
          target: 'One Tech-Priest model from your army and one objective marker within 24" of that model (excluding your Acquisition objective marker).',
          effect: 'Until the start of your next Command phase, that objective marker is also considered to be one of your Acquisition objective markers for all rules purposes.',
          restrictions: '',
        },
        {
          name: 'Reactive Safeguard',
          sublabel: 'Explorator Maniple – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Holy data must be hoarded at all costs, and thickly armoured war engines offer swift and secure vaults.',
          when: "Your opponent's Charge phase, just after an enemy unit has declared a charge.",
          target: 'One Adeptus Mechanicus Infantry unit from your army within range of your Acquisition objective marker that was selected as a target of that charge, and one friendly Adeptus Mechanicus Transport.',
          effect: 'Your unit can embark within that Transport.',
          restrictions: 'Every model in your unit must be within 3" of that Transport and there must be sufficient transport capacity to embark the entire unit.',
        },
      ],
      enhancements: [
        {
          name: 'Magos',
          points: 10,
          flavor: 'Magi are masters of fiercely guarded knowledge, pursuing esoteric agendas at all costs. No risk is too great and no gambit too unwise in their ceaseless and predatory acquisition of ancient lore.',
          body: `Tech-Priest model only. At the end of your Command phase, if the bearer is within range of your Acquisition objective marker, roll one D6: on a 4+, you gain 1CP.`,
        },
        {
          name: 'Genetor',
          points: 20,
          flavor: "Cyborg interfaces, genetic manipulation and alchemical behavioural modification are all avenues of interest to Genetors, and their enhanced creations are formidable in protecting their masters' divine work.",
          body: `Tech-Priest model only. While the bearer is leading a unit that is within range of your Acquisition objective marker, models in that unit have a 4+ invulnerable save.`,
        },
        {
          name: 'Logis',
          points: 15,
          flavor: 'Data-vores and biocogitators, logi amass huge stores of information. They analyse data from thousands of sources, rationalising every weak point the foe has. It is a fool indeed that stands before a logi and their prize.',
          body: `Tech-Priest model only. While the bearer is leading a unit, each time a model in that unit makes an attack that targets a unit within range of your Acquisition objective marker, add 1 to the Hit roll.`,
        },
        {
          name: 'Artisan',
          points: 10,
          flavor: 'Artisans create wondrous artefacts of war. They install circuits of such beauty, and capacitor-nodes of such fine calibration, that their machine spirits respond with divine gratitude.',
          body: `Tech-Priest model only. While the bearer is leading a unit that is within range of your Acquisition objective marker, once per phase, you can change the result of one Hit roll, one Wound roll or one saving throw made for that unit to an unmodified 6.`,
        },
      ],
    },

    {
      id: 'cohort-cybernetica',
      name: 'Cohort Cybernetica',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Cyber-psalm Programming',
        flavor:
          "In advance of a Cohort Cybernetica's battles, the Legio's most talented Datasmiths will feed dogmatic auto-scripture into the programming cores of their robotic charges, as well as oracular schematics and tactical hymnals that delineate the strategy to come. So blessed, the Cohort's robots add their own grinding chants of static to a systematic chorus of praise in the Omnissiah's name.",
        // Faction-Pack Rules Update rewrote this rule (was "gain the Doctrina Imperatives army
        // rule"; now the Move +2" / OC +1 wording below).
        body: `Add 2" to the Move characteristic of models in Legio Cybernetica units from your army. In addition, unless that unit is Battle-shocked, add 1 to the Objective Control characteristic of models in that unit.`,
      },
      stratagems: [
        {
          name: 'Motive Imperative',
          sublabel: 'Cohort Cybernetica – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Intensifying the locomotive protocols of a war engine — while not dishonouring its machine spirit — is a millennia-proven method to hasten the foe\'s demise.',
          when: 'Your Command phase.',
          target: 'One Adeptus Mechanicus Vehicle unit from your army.',
          effect: 'Until the start of your next Command phase, add 3" to the Move characteristic of models in your unit and add 1 to Advance and Charge rolls made for it.',
          restrictions: '',
        },
        {
          name: 'Auto-divinatory Targeting',
          sublabel: 'Cohort Cybernetica – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Encoded with the schemata of the enemy's fortified battle lines and auto-codified vectors of attack, the Cohort's war engines are perfectly aligned to deliver the Machine God's wrath.",
          when: 'Your Command phase.',
          target: 'One Legio Cybernetica or Adeptus Mechanicus Vehicle unit from your army, and one objective marker.',
          effect: 'Until the start of your next Command phase, ranged weapons equipped by models in your unit have a Ballistic Skill characteristic of 3+ and the [IGNORES COVER] ability, but they can only target units within range of the selected objective marker.',
          restrictions: '',
        },
        {
          name: 'Machine Spirit Resurgent',
          sublabel: 'Cohort Cybernetica – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'To invigorate the failing machine spirit of a damaged vehicle is a sacred task, greatly aided by certain data-hymns transmitted in the correct sequence.',
          when: 'Your Command phase.',
          target: 'One Legio Cybernetica or Adeptus Mechanicus Vehicle unit from your army that is below its Starting Strength.',
          effect: 'Until the start of your next Command phase, each time a model in your unit makes an attack, you can re-roll the Hit roll. If your unit is Below Half-strength, you can re-roll the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Machine Superiority',
          sublabel: 'Cohort Cybernetica – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Let the unenlightened be cast down! Let all feel the fire of the Motive Force, and may the sacred engines crunch over their weak bones without impediment!',
          when: 'Your Command phase.',
          target: 'One Legio Cybernetica or Adeptus Mechanicus Vehicle unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back and you can ignore any or all modifiers to its characteristics and/or to any roll or test made for it (excluding modifiers to saving throws).',
          restrictions: '',
        },
        {
          name: 'Transcendent Cogitation',
          sublabel: 'Cohort Cybernetica – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Enhanced static chants can briefly raise a war engine's machine spirits to exultant heights of cogitation and multi-tactical capacity.",
          when: 'Your Command phase.',
          target: 'One Legio Cybernetica or Adeptus Mechanicus Vehicle unit from your army.',
          effect: 'Until the start of your next Command phase, the Conqueror Imperative and Protector Imperative are both active for your unit.',
          restrictions: '',
        },
        {
          name: 'Benevolence of the Omnissiah',
          sublabel: 'Cohort Cybernetica – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'A protective blessing chanted in pentakairic Novabyte moves machine spirits to defy the most esoteric of assaults.',
          when: 'Your Command phase.',
          target: 'One Legio Cybernetica or Adeptus Mechanicus Vehicle unit from your army.',
          effect: 'Until the start of your next Command phase, models in your unit have the Feel No Pain 6+ ability, which is improved to Feel No Pain 5+ against mortal wounds.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Necromechanic',
          points: 20,
          flavor: "The blessed healing of machinery is the sign of a true shepherd of the Omnissiah's flock.",
          body: `Tech-Priest model only. Once per battle round, when a saving throw made for a friendly Legio Cybernetica or Adeptus Mechanicus Vehicle model within 12" of the bearer is failed, the bearer can use this Enhancement. If they do, change the Damage characteristic of that attack to 0.`,
        },
        {
          name: 'Lord of Machines',
          points: 15,
          flavor: 'An intense burst of viral static can overload those machine spirits yoked to the service of the enemy.',
          body: `Tech-Priest model only. Once per turn, at the start of your opponent's Shooting phase, select one enemy Vehicle unit within 12" of and visible to the bearer. That unit must take a Leadership test: if that test is passed, until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll; if that test is failed, that unit is not eligible to shoot this phase.`,
        },
        {
          name: 'Emotionless Clarity',
          points: 10,
          flavor: 'With a mind unsullied by the passions common to the flesh, a Tech-Priest can entreat the machine spirit of a dying war engine to enact one final triumph.',
          body: `Tech-Priest model only. Once per turn, when a friendly Legio Cybernetica or Adeptus Mechanicus Vehicle model with the Deadly Demise ability that is within 12" of the bearer is destroyed, the bearer can use this Enhancement. If it does, do not roll to determine whether any mortal wounds are inflicted as a result of that model's Deadly Demise ability. Instead, mortal wounds are automatically inflicted.`,
        },
        {
          name: 'Arch-negator',
          points: 5,
          flavor: 'Feeding magneto-voltaic arcs and deadly frequencies into their weapons, the Tech-Priest is death incarnate to blasphemies against the Machine God.',
          body: `Tech-Priest model only. Ranged weapons equipped by the bearer have the [ANTI-VEHICLE 4+] ability.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'cohort-acquisitus',
      name: 'Cohort Acquisitus',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Noospheric Recon',
        flavor:
          'Force-loaded with enhanced divinatory augurs, far-ranging Skitarii are the unblinking eyes of their masters and cast their sensors in overlapping noospheric nets to root out the enemies of the Machine God.',
        body: `▪ Friendly Pteraxii / Infiltrators / Rangers / Serberys Raiders / Serberys Sulphurhounds units have Recon Augury.
▪ Friendly Recon Augury units have the following ability:
▪ **Enhanced Augurs:** In your Shooting phase, this unit can select one visible enemy unit within 12". That enemy unit is analysed. While a unit is analysed, that unit has +3" detection range.`,
      },
      stratagems: [
        {
          name: 'Defect Scrutiny',
          sublabel: 'Cohort Acquisitus – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "By focusing implanted augurs with split-second analysis, the foe's flaws can be exposed and broadcast in a clarion call to the rest of the Omnissiah's faithful.",
          when: 'Your Shooting phase, when a friendly Adeptus Mechanicus unit is selected to shoot.',
          target: 'That Adeptus Mechanicus unit.',
          effect: "Select one visible enemy unit within 12\" of a friendly Recon Augury unit. Your unit's ranged attacks that target that enemy unit have [IGNORES COVER].",
          restrictions: '',
        },
        {
          name: 'Repolarised Augurs',
          sublabel: 'Cohort Acquisitus – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "With a recalibration of divinatory implants, their information absorption can be redirected as a scrambled emission which the enemy's senses cannot easily penetrate.",
          when: "Start of your opponent's Movement phase.",
          target: 'One friendly unengaged Recon Augury unit.',
          effect: 'Your unit has -3" detection range until the end of the turn.',
          restrictions: '',
        },
        {
          name: 'Clandestine Reposition',
          sublabel: 'Cohort Acquisitus – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Under the cover of a multispectral burst of binharic feedback, vectors of redeployment can be opened up that are unanticipated and unseen by the enemy.',
          when: "End of your opponent's Fight phase.",
          target: 'One friendly unengaged Infiltrators / Pteraxii unit.',
          effect: 'Place your unit in Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Explorator Dispensation',
          points: 20,
          flavor: "Mantled in a susurrus of shrouding code and implanted sensor baffles, this commander has been granted a holy commission to extend their forge world's influence at the forefront of the Quest for Knowledge.",
          body: `Skitarii Marshal model only. This unit has Infiltrators.`,
        },
        {
          name: 'Stealth-screened Cybercanids',
          points: 15,
          upgrade: true,
          flavor: 'These veteran raiders have been bestowed with rarefied cybernetic mounts that incorporate stealth-screen projectors, silenced servos, and photo-adaptive hides, rendering them all but invisible until they near their prey.',
          body: `Serberys Raiders unit only. This unit has Lone Operative 15".`,
        },
      ],
    },

    {
      id: 'lords-of-the-forge',
      name: 'Lords of the Forge',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'War-form Mantles',
        flavor:
          'When battle looms, many Tech-Priests don their war forms, replacing more delicate mechanical appendages with steel-shod bionics that incorporate auto-repair subroutines. Some also outfit themselves with narrow-band screed casters. These project streams of incomprehensible code that overwhelm the cogitator cores of enemy vehicles and baffle augury.',
        body: `Friendly TECH-PRIEST models have:
▪ 4+ InSv.
▪ Feel No Pain 5+.

Friendly TECH-PRIEST models have the following ability:
▪ **Baffling Data Screed:** In your Shooting phase, when this unit is selected to shoot, if this unit is not Battle-shocked, you can use this ability. If you do, roll one D6:
▪ On a 2+, select one enemy VEHICLE unit within 12" of this unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll. A unit cannot be selected for this ability more than once per turn.
▪ __Or:__ On 2+, those ranged attacks do not prevent this unit from being hidden.`,
      },
      stratagems: [
        {
          name: 'Scriptural Prognosis',
          sublabel: 'Lords of the Forge – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Analysing data from thousands of sources at once, a disciple of the Omnissiah is able to rationalise the enemy's capabilities and dispense protocols of endurance to their servants.",
          when: "In your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Tech-Priest unit that is within range of an objective.",
          target: 'That Tech-Priest unit.',
          effect: 'Attacks that target your unit have -1 AP until that enemy unit has attacked.',
          restrictions: '',
        },
        {
          name: 'Overloaded Safeguards',
          sublabel: 'Lords of the Forge – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With a cascade of holy screed, implanted aggression protocols and biochemical triggers can be activated by a Tech-Priest to transmute a seeming rout into a predatory counterstrike.',
          when: 'Your Movement phase, when a friendly Tech-Priest unit is selected to make a fall-back move.',
          target: 'That Tech-Priest unit.',
          effect: 'That move does not prevent your unit from being eligible to shoot/declare a charge.',
          restrictions: '',
        },
        {
          name: 'Holy Avarice',
          sublabel: 'Lords of the Forge – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When a miracle of technology is identified, a Tech-Priest will go to bloody lengths to retrieve it, simultaneously directing the acquisition of their prize and the dismantling of anyone who threatens it.',
          when: 'Your Shooting phase, when a friendly Tech-Priest unit starts an action.',
          target: 'That Tech-Priest unit.',
          effect: 'That action does not prevent your unit from being eligible to shoot.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: "Vingh's Wafers of Dynamism",
          points: 25,
          flavor: "The inimitable holy programming within these doctrina wafers elicits a bullish agility in a Datasmith's cybernetic wards. So commanded, such robots have scaled rusting piles of shifting scree, bulldozed their way through heretek defences and smashed breaches in space hulk passages.",
          body: `Cybernetica Datasmith model only. At the start of the first battle round, if this unit is an attached unit, this unit has Mobile until the end of the battle.`,
        },
        {
          name: 'TL-4ø9',
          points: 30,
          flavor: 'This modest-seeming casket is named for the almost indecipherable sigils on its ancient casing. The prevailing theocratic dogma is that this artefact is a weapon, for when its iris shutter is opened, a night-black beam of incredible power is released.',
          body: `Tech-Priest model only. This model has the following weapon:
▪ **TL-4ø9** [DEVASTATING WOUNDS, HAZARDOUS] — Range 24", A 3, BS 2+, S 11, AP -2, D D3+2.`,
        },
      ],
    },

    {
      id: 'luminen-auto-choir',
      name: 'Luminen Auto-choir',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Disruption',
      unique: 'DATA-PSALM',
      rule: {
        name: 'Cyber-static Canticles',
        flavor:
          'With voices or binharic emissions raised in holy verse, the disciples of the Motive Force roar their worship. Thunderheads of potentiality roil above them, and rival sects vie to prove the supremacy of their visionary dogma with coruscating intensity.',
        body: `▪ Friendly Corpuscarii units' ranged attacks have [LETHAL HITS].
▪ When a friendly Fulgurite unit has fought, that unit heals D3 wounds.

This detachment has the DATA-PSALM tag and cannot be taken with another DATA-PSALM detachment.`,
      },
      stratagems: [
        {
          name: 'Echoes of the Conduit Wars',
          sublabel: 'Luminen Auto-choir – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Punishing transgressors has a long and ritualised tradition amongst the unforgiving Electro-Priests, and they will eagerly prove their faith in coruscating violence.',
          when: 'Your Shooting phase or the Fight phase, when a friendly Electro-Priests unit is selected to attack.',
          target: 'That Electro-Priests unit.',
          effect: "Your unit's attacks that target a unit within range of an objective can:\n▪ Re-roll Hit rolls of 1.\n▪ Re-roll Wound rolls of 1.",
          restrictions: '',
        },
        {
          name: 'Chant of Electrotraction',
          sublabel: 'Luminen Auto-choir – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With every binharic chant in praise of the Divine Current, Electro-Priests feel the surge of sacred power. The pulsing nimbus demands a holy circuit which can only be closed by making destructive contact with the foe.',
          when: 'Your Movement phase, when a friendly Electro-Priests Battleclade unit is selected to make an Advance move.',
          target: 'That Electro-Priests unit.',
          effect: 'That move does not prevent your unit from being eligible to declare a charge.',
          restrictions: '',
        },
        {
          name: 'Momentum Feedback',
          sublabel: 'Luminen Auto-choir – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Harnessing the force of the blasphemous enemy's attacks into energy to fuel a holy retaliatory surge is an act of righteous transmutation.",
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly unengaged Electro-Priests unit has shot.",
          target: 'That Electro-Priests unit.',
          effect: 'Your unit can make a Surge move of up to D6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Voltagheist Reliquary',
          points: 15,
          flavor: "The wild voltagheists said to inhabit this holy casket are more aggressive and intrusive than those that guard the Electro-Priests, and surge in interfering pulses that scramble the foe's sensors.",
          body: `Tech-Priest model only. Enemy units cannot target this unit with snap shooting attacks.`,
        },
        {
          name: 'Electromiasmic Brazier',
          points: 10,
          flavor: "This ornate brazier emits incense-laced particulate chaff that swirls in glittering veils. The silvered mist is alive with sacred energies that foul attempts to pinpoint the Omnissiah's faithful.",
          body: `Tech-Priest model only. This unit has Stealth.`,
        },
      ],
    },

    {
      id: 'eradication-cohort',
      name: 'Eradication Cohort',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Murderous Imperative',
        flavor:
          'The Skitarii fighting in a focused clade all but vibrate with the inloaded need to kill. This manifests not as wild rage, however, but rather as a coldly efficient drive to acquire the next target, bring it down with pinpoint fire or neatly placed thrusts, then find a new victim and repeat in an infinite loop.',
        body: `Each time a model in a Skitarii unit from your army makes an attack:
▪ If the Protector Imperative is active for that unit, re-roll a Hit roll of 1.
▪ If the Conqueror Imperative is active for that unit, re-roll a Wound roll of 1.`,
      },
      stratagems: [
        {
          name: 'Servo-driven Charge',
          sublabel: 'Eradication Cohort – Wargear Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Sending reckless surges of motive force through their units, these warriors charge headlong into combat with punishing impact.',
          when: 'Fight phase.',
          target: 'One Adeptus Mechanicus unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability.',
          restrictions: '',
        },
        {
          name: 'Threat-cogitation Targeters',
          sublabel: 'Eradication Cohort – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Supplementary analytic cogitation routines identify targets of primary importance and assist in their rapid elimination.',
          when: 'Your Shooting phase.',
          target: 'One Skitarii Vehicle unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time a ranged attack made by a model in your unit is allocated to a Monster or Vehicle model, you can re-roll the Damage roll.',
          restrictions: '',
        },
        {
          name: 'Unrelenting Aggression',
          sublabel: 'Eradication Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Even when retreating temporarily in the face of staunch resistance, the warriors of the Omnissiah keep up their storm of fire and violent blows.',
          when: 'Your Movement phase, just after an Adeptus Mechanicus unit from your army Falls Back.',
          target: 'That Adeptus Mechanicus unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back. If your unit has the Skitarii keyword, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back instead.',
          restrictions: '',
        },
        {
          name: 'Precision Onslaught',
          sublabel: 'Eradication Cohort – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Leading the charge like a keen bayonet locked to a rifle's barrel, maniples of Sicarians scythe into the enemy amidst a welter of blood and severed limbs.",
          when: 'Your Charge phase, just after a Sicarian unit from your army declares a charge.',
          target: 'That Sicarian unit.',
          effect: 'Until the end of the phase, when your unit ends a Charge move, select one enemy unit within Engagement Range of it, then roll one D6 for each model in your unit that is within Engagement Range of that enemy unit: for each 4+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
        {
          name: 'Unshackled Wrath',
          sublabel: 'Eradication Cohort – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "With Binharic prayers of disengagement, these warriors release the saviour protocols of their weapon spirits to release the guns' full wrath.",
          when: 'Your Shooting phase.',
          target: 'One Skitarii unit from your army that has not been selected to shoot this phase.',
          effect: 'Select the [SUSTAINED HITS 1] or [LETHAL HITS] ability. Until the end of the phase, ranged weapons equipped by models in your unit have the selected ability. You can instead select the [SUSTAINED HITS 1], [LETHAL HITS] and [HAZARDOUS] abilities to apply to those weapons until the end of the phase.',
          restrictions: '',
        },
        {
          name: 'Analytic Reprisals',
          sublabel: 'Eradication Cohort – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Rapid threat analysis triggers the Skitarii to return fire against foes deemed immediate threats, surprising the enemy and thinning their lines.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Skitarii Infantry unit from your army that lost one or more models as a result of the attacking unit's attacks.",
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Omnicogitator',
          points: 25,
          flavor: 'This unique tactical-cogitation augmetic provides its bearer with a wealth of situation-appropriate responses in even the most intense battle.',
          body: `Skitarii Marshal model only. The Conqueror Imperative and Protector Imperative are both active for the bearer's unit.`,
        },
        {
          name: 'Martial Signatum Amplificator',
          points: 15,
          flavor: 'This strange device taps into the data-tethers that carry Skitarii command imperatives and disseminates them to other, less soldierly servants of the Omnissiah.',
          body: `Tech-Priest model only. Models in the bearer's unit have the Skitarii keyword.`,
        },
        {
          name: 'Belicosa-class Capacitor Vanes',
          points: 25,
          flavor: 'These slender conductor vanes channel esoteric energies into nearby weapon systems, rendering their machine spirits rapacious and bellicose.',
          body: `Adeptus Mechanicus model only. Add 6" to the Range characteristic of ranged weapons equipped by models in the bearer's unit, and add 1 to the Strength characteristic of those weapons.`,
        },
        {
          name: "Omnissiah's Fury",
          points: 10,
          flavor: "A Skitarii Marshal implanted with this thoracic augmetic feels the Machine God's molten fury flowing through their veins and out into the weapons they wield in battle.",
          body: `Skitarii Marshal model only. Add 2 to the Attacks characteristic of melee weapons equipped by the bearer, and improve the Armour Penetration and Damage characteristics of those weapons by 1.`,
        },
      ],
    },

    {
      id: 'haloscreed-battle-clade',
      name: 'Haloscreed Battle Clade',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Noospheric Transference',
        flavor:
          'Tech-Priests can override the will of their thralls and project martial data inloads into the minds of their warriors, blessing the soldiery with endless streams of precisely tailored binharic code.',
        body: `In your Command phase, select one or more Adeptus Mechanicus units from your army (including units that are embarked within Transports). The maximum number of units you can select depends on the battle size, as follows:
▪ **Incursion:** 1 unit
▪ **Strike Force:** 2 units
▪ **Onslaught:** 3 units

Until the start of your next Command phase, those units gain the Halo Override keyword. Then, select one of the Override abilities below. Until the start of your next Command phase, units from your army with the Halo Override keyword have the selected Override ability:
▪ **Electromotive Energisation:** Add 2" to the Move characteristic of models in this unit.
▪ **Microactuator Bracing:** Add 1 to the Toughness characteristic of models in this unit.
▪ **Predation Protocols:** This unit is eligible to declare a charge in a turn in which it Advanced.
▪ **Muted Servomotors:** Models in this unit have the Stealth ability.`,
      },
      stratagems: [
        {
          name: 'Eradication Protocols',
          sublabel: 'Haloscreed Battle Clade – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Fresh imperatives flow down from on high. The orders are simple: eliminate the foe.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Mechanicus unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1, and, if it is a Halo Override unit, re-roll a Hit roll of 1.',
          restrictions: '',
        },
        {
          name: 'Targeting Override',
          sublabel: 'Haloscreed Battle Clade – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Experienced Tech-Priests rapidly analyse the foe's weaknesses and feed the resultant data to their soldiers, who exploit these flaws to destroy their targets.",
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Mechanicus unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Neural Overload',
          sublabel: 'Haloscreed Battle Clade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "By projecting their consciousness into the minds of tech thralls, a Tech-Priest may significantly enhance their warriors' lethality. However, doing so risks overloading their combat units' more limited neural networks. Such hazards are seen as an opportunity to give one's life in the name of the Omnissiah.",
          when: 'Your Movement phase.',
          target: 'One Adeptus Mechanicus unit from your army.',
          effect: "If your unit is a Halo Override unit, it suffers D3 mortal wounds. Select one Override ability. Until the start of your next Command phase, that ability is active for your unit.\n\n**Designer's Note:** This means that if the targeted unit already has the Halo Override keyword, it can be affected by multiple Override abilities at the same time, but suffers mortal wounds to do so. Alternatively, if your unit does not have the Halo Override keyword, it instead has the chosen Override ability until the start of your next Command phase, but does not benefit from any other Override abilities that are active.",
          restrictions: '',
        },
        {
          name: 'Aggressive Impulse',
          sublabel: 'Haloscreed Battle Clade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Urgent imperatives flood into the crew thralls of Skitarii transport units, urging them to deploy their cargo of cybernetic soldiers into the heart of the fight.',
          when: 'Your Movement phase.',
          target: 'One Skorpius Dunerider model from your army that has not been selected to move this phase.',
          effect: 'Until the end of the turn, each time an Adeptus Mechanicus unit disembarks from that model after it has made a Normal move, that unit is still eligible to declare a charge this turn.',
          restrictions: '',
        },
        {
          name: 'Guided Retreat',
          sublabel: 'Haloscreed Battle Clade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "From their distant strategium pulpit, the Tech-Priest commander's guiding hand descends, seizing control of allied minds, steering their troops carefully away from harm whilst maintaining a hail of killing fire.",
          when: 'Your Movement phase, just after an Adeptus Mechanicus unit from your army makes a Fall Back move.',
          target: 'That Adeptus Mechanicus unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back, and, if it is a Halo Override unit, you can re-roll Desperate Escape tests taken for it.',
          restrictions: '',
        },
        {
          name: 'Analytical Divination',
          sublabel: 'Haloscreed Battle Clade – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Tech-Priest commanders process an overwhelming influx of data screeds, analysing this information to read the flow of battle and coordinate the movements of their thralls.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Adeptus Mechanicus Infantry unit (excluding Kataphron units) from your army that is within 8" of that enemy unit and not within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to D6", or up to 6" instead if it is a Halo Override unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Transoracular Dyad Wafers',
          points: 15,
          flavor: 'Inloaded with advanced combat protocols, tactical hymnals and holy autoscripture, these doctrina wafers grant greater autonomy and destructive might to the constructs of the Legio Cybernetica.',
          body: `Cybernetica Datasmith model only. When the bearer is attached to a Kastelan Robots unit, until the end of the battle, models in that unit gain the Halo Override keyword. That unit cannot be selected when selecting units as part of the Noospheric Transference Detachment rule.`,
        },
        {
          name: 'Cognitive Reinforcement',
          points: 30,
          flavor: 'From afar, the guiding hand of the Omnissian priesthood allows this warrior to process streams of sensory input and encoded imperatives simultaneously.',
          body: `Adeptus Mechanicus model only (excluding Cybernetica Datasmith models). The Conqueror Imperative and Protector Imperative are both active for the bearer's unit.`,
        },
        {
          name: 'Sanctified Ordnance',
          points: 10,
          flavor: 'The ammunition borne to battle by this disciple of the Machine God and those at their command has been subjected to ritual anointings and autosermonic blessings, lending it far greater stability.',
          body: `Adeptus Mechanicus model only. Add 6" to the Range characteristic of ranged weapons equipped by models in the bearer's unit and, each time a Hazardous test is taken for that unit, you can re-roll the result.`,
        },
        {
          name: 'Inloaded Lethality',
          points: 15,
          flavor: 'The ancient noospheric receptors implanted into this field commander enable them to receive constant streams of binharic kill code and static prayer chants, lending them greater strength and martial prowess.',
          body: `Tech-Priest Dominus or Tech-Priest Manipulus model only. Add 3 to the Attacks characteristic of the bearer's melee weapons and add 1 to the Damage characteristic of the bearer's melee weapons.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const adeptusMechanicus = { en, ru: en }
