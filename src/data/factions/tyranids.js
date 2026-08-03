// Tyranids — faction rules. Resolved from the same source priority as Necrons / Space
// Marines (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex > Index.
//
//   Codex: Tyranids (sources/codex/xenos/Tyranids.pdf) → army rules (Synapse + Shadow in
//     the Warp) + 6 base detachments.
//   Faction Pack v1.0 (sources/Faction pack 11 ed/xenos/Tyranids (2).pdf) → 4 extra
//     detachments (Ambush Predators, Talons of the Norn Queen, Warrior Bioform Onslaught,
//     Subterranean Assault) + Rules Updates.
//   MFM → per-enhancement points, per-detachment dp / forceDisposition.
//
// 10 detachments total, matching the Munitorum Field Manual list. Faction-Pack "Rules
// Updates" have been folded into the codex army rules / detachment text (they are the
// authoritative newer wording) — see inline notes. No Tyranids detachment carries a
// `unique` tag in the MFM.
//
// EN-first: `ru` reuses the same object for now (same pattern as Necrons / mfmFactions.js);
// swap in a translated object later. Text markup follows useRenderInline / RuleBlock /
// StratCard conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet
// lines, `### ` subheadings. Datasheets (unit stat profiles) are a later pass (`datasheets`).

const en = {
  slug: 'tyranids',
  name: 'Tyranids',

  // Two army rules — combined into one RuleBlock body with `### ` subheadings (FactionView
  // renders a single armyRule). Both carry the Faction-Pack Rules Update wording:
  //   Shadow in the Warp → adds the "-1 to the test within 6" of a Synapse unit" clause.
  //   Synapse → adds the "+1 Strength to melee attacks" clause.
  armyRule: {
    id: 'synapse-shadow-in-the-warp',
    name: 'Synapse & Shadow in the Warp',
    flavor:
      'The teeming broods of a hive fleet do not think for themselves. They are directed by the gestalt consciousness of the Hive Mind, its iron will channelled through synapse-beasts and cast over the battlefield as an icy, alien dread that gnaws at the minds of the prey.',
    body: `### Synapse
Some Tyranids serve as synaptic conduits or nodal relays through which a portion of the Hive Mind's iron will flows, overriding the natural instincts of the swarm to direct the teeming warrior-beasts to function as a single, gestalt organism on the battlefield.

If your Army Faction is Tyranids, while a Tyranids unit from your army is within 6" of one or more friendly Synapse models, that Tyranids unit is said to be within Synapse Range of that model and of your army. While a Tyranids unit from your army is within Synapse Range of your army:
▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.
▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.

### Shadow in the Warp
Tyranids flood the battlefield with the psychic signature of the hive fleet — an icy, alien dread that gnaws at the minds of their prey and smothers even the most stalwart courage. When faced with such unfathomable horror, many are driven insane or suffer catastrophic neural damage.

If your Army Faction is Tyranids, once per battle, in either player's Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6" of one or more Synapse units from your army, subtract 1 from that test.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'invasion-fleet',
      name: 'Invasion Fleet',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Hyper-adaptations',
        flavor:
          'Every warrior organism is fashioned by the ineffable alien will of the Hive Mind. Their flesh and chitin is endlessly mutable, honed into whatever form will prove most lethal to their prey.',
        body: `At the start of the first battle round, select one of the following Hyper-adaptations to be active for Tyranids units from your army until the end of the battle.
▪ **Swarming Instincts:** Each time a Tyranids model with this Hyper-adaptation makes an attack that targets an Infantry or Swarm unit, that attack has the [SUSTAINED HITS 1] ability.
▪ **Hyper-aggression:** Each time a Tyranids model with this Hyper-adaptation makes an attack that targets a Monster or Vehicle unit, that attack has the [LETHAL HITS] ability.
▪ **Hive Predators:** Each time a Tyranids model with this Hyper-adaptation makes an attack that targets a Character unit, on a Critical Hit, that attack has the [PRECISION] ability.`,
      },
      stratagems: [
        {
          name: 'Rapid Regeneration',
          sublabel: 'Invasion Fleet – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Prey stare in horror as chitinous armour regrows and flesh, muscle and sinew knots back together.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Tyranids unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            'Until the end of the phase, models in your unit have the Feel No Pain 6+ ability. If your unit is within Synapse Range of your army, models in your unit have the Feel No Pain 5+ ability instead.',
          restrictions: '',
        },
        {
          name: 'Adrenal Surge',
          sublabel: 'Invasion Fleet – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'These warrior organisms destroy all as their adrenaline surges.',
          when: 'Fight phase.',
          target:
            'Up to two Tyranids units from your army that are within Synapse Range of your army and are eligible to fight, or one other Tyranids unit from your army that is eligible to fight.',
          effect:
            'Until the end of the phase, each time a model in any of those selected units makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Death Frenzy',
          sublabel: 'Invasion Fleet – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Tyranids care nothing for self-preservation, lashing out even in death.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Tyranids unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: 'Overrun',
          sublabel: 'Invasion Fleet – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Tyranids in battle form an unstoppable avalanche of flesh and chitin that buries the foe alive.',
          when: 'Fight phase, just before a Tyranids unit from your army Consolidates.',
          target: 'That Tyranids unit.',
          effect:
            'Until the end of the phase, each time your unit Consolidates, models in it can move an additional 3" as long as your unit can end that move within Engagement Range of one or more enemy units. If your unit is within Synapse Range of your army and not within Engagement Range of any enemy units, instead of making that Consolidation move, it can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Predatory Imperative',
          sublabel: 'Invasion Fleet – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Guided by the instincts of leader-beasts, the swarm can be tasked with focusing its hunting instincts.',
          when: 'Your Command phase.',
          target: 'Up to two Tyranids units from your army that are within Synapse Range of your army, or one other Tyranids unit from your army.',
          effect:
            'Select one Hyper-adaptation. Until the start of your next Command phase, that Hyper-adaptation is active for those selected units in addition to any other that may be active for your army.',
          restrictions: 'You cannot select the same Hyper-adaptation you selected at the start of the first battle round.',
        },
        {
          name: 'Endless Swarm',
          sublabel: 'Invasion Fleet – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'As the battle rages, more organisms pour in to bolster the swarms.',
          when: 'Your Command phase.',
          target:
            'Up to two Endless Multitude units from your army that are within Synapse Range of your army, or one other Endless Multitude unit from your army.',
          effect: 'You can return up to D3+3 destroyed models to each of those selected units.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Alien Cunning',
          points: 30,
          flavor:
            'This leader-beast possesses highly sophisticated neural pathways, allowing it to identify priority strategic assets and adapt the disposition of its warriors to seize them before the foe even recognise their value.',
          body: `Tyranids model only. After both players have deployed their armies, select up to three Tyranids units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Perfectly Adapted',
          points: 15,
          flavor: 'This creature was created for one purpose: to completely eradicate the defenders of the target prey world.',
          body: `Tyranids model only. Once per turn, you can re-roll one Hit roll, one Wound roll, one Damage roll, one Advance roll, one Charge roll or one saving throw made for the bearer.`,
        },
        {
          name: 'Synaptic Linchpin',
          points: 20,
          flavor:
            'With a neuro-cortex that pulsates with the irresistible power of the Hive Mind, this leader acts as a blazing synaptic beacon to the lesser creatures of the swarm, the better to direct their actions and react to the ever-changing state of battle.',
          body: `Tyranids model only. While a friendly Tyranids unit is within 9" of the bearer, that unit is within Synapse Range of your army.`,
        },
        {
          name: 'Adaptive Biology',
          points: 25,
          flavor:
            'The same weapon rarely works against this leader-beast twice, as its alien physiology adapts at an astonishing rate to counter the attacks of the foe.',
          body: `Tyranids model only. The bearer has the Feel No Pain 5+ ability. At the start of any turn, if the bearer has fewer than its starting number of wounds remaining, until the end of the battle, it has the Feel No Pain 4+ ability instead.`,
        },
      ],
    },

    {
      id: 'crusher-stampede',
      name: 'Crusher Stampede',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Enraged Behemoths',
        flavor:
          'In their efforts to lay the monstrous beasts of a Crusher Stampede low, the prey only succeed in further enraging the rampaging monsters. The surviving beasts are driven to fight with greater fury the more of their number that fall.',
        // Faction-Pack Rules Update adds the Objective Control clause below.
        body: `Each time a Tyranids Monster model from your army makes an attack, add 1 to the Hit roll if that model's unit is below its Starting Strength, and add 1 to the Wound roll as well if that model's unit is Below Half-strength.

In addition, while a Tyranids Monster unit from your army (excluding Battle-shocked units) is at its Starting Strength, add 2 to the Objective Control characteristic of models in that unit.`,
      },
      stratagems: [
        {
          name: 'Corrosive Viscera',
          sublabel: 'Crusher Stampede – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Highly acidic fluids spray from the creature's wounds, lethal to those nearby.",
          when: "Your opponent's Shooting phase or the Fight phase, just after a Tyranids Monster model from your army with the Deadly Demise ability that cannot Fly is destroyed.",
          target: 'That Tyranids Monster model. You can use this Stratagem on that model even though it was just destroyed.',
          effect:
            "Do not roll one D6 to determine whether mortal wounds are inflicted by your model's Deadly Demise ability. Instead, mortal wounds are automatically inflicted.",
          restrictions: '',
        },
        {
          name: 'Rampaging Monstrosities',
          sublabel: 'Crusher Stampede – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Tyranid monsters have reserves of energy that they unleash in waves of devastating fury.',
          when: 'Fight phase.',
          target: 'One Tyranids Monster unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, you can re-roll the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Savage Roar',
          sublabel: 'Crusher Stampede – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'This monster is even more terrifying to behold than other bioforms of its kind.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Tyranids Monster unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            'That enemy unit must take a Battle-shock test and, until the end of the phase, each time a model in that enemy unit makes an attack that targets your unit, subtract 1 from the Hit roll. If that Battle-shock test was failed, subtract 1 from the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Untrammelled Ferocity',
          sublabel: 'Crusher Stampede – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Encircling and entrapping such physically powerful and fearless beasts is nigh on impossible.',
          when: 'Your Movement phase.',
          target: 'One Tyranids Monster unit from your army that has not been selected to move this phase.',
          // Faction-Pack Rules Update rewrote this Effect wholesale.
          effect: `Until the end of the phase, each time a model in your unit makes a Normal, Advance or Fall Back move, it can move through models (excluding Titanic models) and sections of terrain features that are 4" or less in height. When doing so:
▪ It can move within Engagement Range of enemy models, but cannot end that move within Engagement Range of them.
▪ It can also move through sections of terrain features that are more than 4" in height, but if it does, after its unit has moved, roll one D6: on a 1, your unit is Battle-shocked.`,
          restrictions: '',
        },
        {
          name: 'Swarm-Guided Salvoes',
          sublabel: 'Crusher Stampede – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'One cannot hide from a gestalt entity with a million eyes, even in the densest cover.',
          when: 'Your Shooting phase.',
          target: 'One Tyranids Monster unit from your army that has not been selected to shoot this phase.',
          effect:
            "Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability, and until the end of the phase each time a model in your unit makes an attack, you can ignore any or all modifiers to that model's Ballistic Skill characteristic and any or all modifiers to the Hit roll.",
          restrictions: '',
        },
        {
          name: 'Massive Impact',
          sublabel: 'Crusher Stampede – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'Employing their sheer bulk and vicious chitinous horns and spikes, the largest Tyranids crash headlong through the foe, often with devastating results.',
          when: 'Your Charge phase, just after a Tyranids Monster model from your army ends a Charge move.',
          target: 'That Tyranids Monster model.',
          effect: 'Select one enemy unit within Engagement Range of your model and roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Ominous Presence',
          points: 15,
          flavor:
            'The crushing menace of the Hive Mind rolls off this monstrous creature in waves, causing it to loom even larger in the minds of its quailing prey and lending it absolute dominance of the battlefield.',
          body: `Tyranids Monster model only. Add 3 to the bearer's Objective Control characteristic.`,
        },
        {
          name: 'Enraged Reserves',
          points: 20,
          flavor:
            "Contained deep within this organism's body is a pulsating sac filled with a cocktail of adrenostimulant fluids linked to a ring of vascular-pneumatic sphincters, allowing them one last-ditch strike.",
          body: `Tyranids Monster model only. If the bearer is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 3+, do not remove it from play. It can fight after the attacking model's unit has finished making its attacks, and is then removed from play.`,
        },
        {
          name: 'Null Nodules',
          points: 10,
          flavor:
            "A contraganglion knot in this creature's cranium channels and amplifies the smothering power of the Shadow in the Warp to nullify its prey's psychic abilities.",
          body: `Tyranids Monster model only. Once per battle, when a Psychic Attack is allocated to the bearer, it can use this ability. If it does, until the end of the phase, the bearer has the Feel No Pain 5+ ability against Psychic Attacks.`,
        },
        {
          name: 'Monstrous Nemesis',
          points: 25,
          flavor:
            'With its basic logic centres and instinctive drivers augmented, this warrior organism is capable of singling out and hunting down valuable prey without direct synaptic oversight.',
          body: `Tyranids Monster model only. Each time the bearer makes a melee attack that targets a Monster or Vehicle unit, add 1 to the Wound roll.`,
        },
      ],
    },

    {
      id: 'unending-swarm',
      name: 'Unending Swarm',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Insurmountable Odds',
        flavor:
          'When Hormagaunts, Termagants and other such expendable warrior organisms attack en masse they make up for their comparative fragility with sheer numbers. Coupled with the speed and ferocity of their onslaught — which only seems to increase as the prey try to gun the creatures down or drive them back — the gathered broods soon overrun even the most determined defenders.',
        // Faction-Pack Rules Update replaced the codex Surge-move wording with this shorter version.
        body: `In your opponent's Shooting phase, when an enemy unit has shot, if a model from a friendly Endless Multitude unit was destroyed as a result of those attacks, that friendly unit can make a surge move of up to D6".`,
      },
      stratagems: [
        {
          name: 'Synaptic Goading',
          sublabel: 'Unending Swarm – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor:
            "For a moment, a minuscule sliver of the Hive Mind's ineffable will is focussed through these warrior organisms, driving them to pounce upon either valuable prey or else some vital strategic target.",
          when: 'Any phase, just before an Endless Multitude unit from your army that is within Synapse Range of your army makes a Surge move.',
          target: 'That Endless Multitude unit.',
          effect:
            'When making that Surge move, you can re-roll the D6 to determine how far your unit moves, and your unit can end that move as close as possible to the closest objective marker (instead of as close as possible to the closest enemy unit). All other rules for making Surge moves still apply.',
          restrictions: '',
        },
        {
          name: 'Unending Waves',
          sublabel: 'Unending Swarm – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'No matter how many warrior organisms are slain, more are already surging forward over their corpses.',
          when: 'Any phase.',
          target: 'One Endless Multitude unit from your army that was just destroyed. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Add a new unit to your army identical to your destroyed unit, in Strategic Reserves, at its Starting Strength.',
          restrictions: 'Any destroyed Character units that were attached to your unit are not returned. You can only use this Stratagem once per battle.',
        },
        {
          name: 'Teeming Masses',
          sublabel: 'Unending Swarm – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Skittering, darting and pouring over one another, the Tyranids make for hard and confusing targets.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Endless Multitude unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Swarming Masses',
          sublabel: 'Unending Swarm – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The sheer weight of Tyranid numbers begins to tell as they bury their victims in lashing, biting horror.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Endless Multitude unit from your army that has not been selected to shoot or fight this phase.',
          effect:
            'Until the end of the phase, weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability, and if your unit contains 15 or more models, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Bounding Advance',
          sublabel: 'Unending Swarm – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Synaptic impulses from the Hive Mind urge greater speed from the swarm's warrior organisms.",
          when: 'Your Movement phase.',
          target: 'One Endless Multitude unit from your army.',
          effect:
            'Until the end of the phase, each time your unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit.',
          restrictions: '',
        },
        {
          name: 'Preservation Imperative',
          sublabel: 'Unending Swarm – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor:
            'Triggered by incoming projectile fire, a synaptic pulse spurs the danger-senses of lesser warrior organisms and causes them to scatter like a shoal evading predators. Only once the explosions have stopped and the dust cleared do the bioforms bunch up once again.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Endless Multitude unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit is treated as containing fewer than five models for the purpose of the [BLAST] ability.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Relentless Hunger',
          points: 20,
          flavor: 'An overriding need to sink their fangs into the flesh of their prey drives these creatures toward the foe.',
          body: `Tyranids model only. Add 2" to the Move characteristic of models in the bearer's unit.`,
        },
        {
          name: 'Naturalised Camouflage',
          points: 30,
          flavor:
            'These warrior organisms possess limited chameleonic properties that conceal their advance. The benefits of such deceptions decrease as they approach their prey, but can be enough to bring them safely into range to strike.',
          body: `Tyranids model only. At the start of the first battle round, select up to three friendly Endless Multitude units within 9" of the bearer. Until the end of the battle round, each time a ranged attack targets one of those units, models in that unit have the Benefit of Cover against that attack.`,
        },
        {
          name: 'Piercing Talons',
          points: 25,
          flavor:
            'A simple but potent biomorphic enhancement of these warrior organisms sees some amongst their number boast diamond-sharp talon tips. Lashing suddenly from amidst the mass of thrashing weapon limbs these plunge through armour to pierce organs and rupture delicate systems.',
          body: `Tyranids model only. Each time a model in the bearer's unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.`,
        },
        {
          name: 'Adrenalised Onslaught',
          points: 15,
          flavor:
            'Biostimulants course through the bodies of these warrior organisms, combining with goading synaptic impulses to lend them an unholy turn of speed.',
          body: `Tyranids model only. Each time the bearer's unit Piles In or Consolidates, models in this unit can move an additional 3".`,
        },
      ],
    },

    {
      id: 'assimilation-swarm',
      name: 'Assimilation Swarm',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Feed the Swarm',
        flavor:
          'Even as the beasts of the Assimilation Swarm stalk across the battlefield they make use of the abundant biomass yielded up by the prey world’s slow demise. Warrior organisms heal even the most grievous wounds in moments, or stagger upright and return to the fight after they seemed slain. A strain of revolting vitality flows through the Tyranid broods as though leeched direct from their dismayed victims.',
        // Faction-Pack Rules Update: dropped the "within range of an objective marker" gate and
        // changed the wound regain from D3 to D3+1.
        body: `In your Command phase, each Harvester unit from your army can Regenerate one friendly Tyranids unit that is within 6" of it. A unit can only be regenerated once per phase. Each time a unit regenerates, do one of the following:
▪ One model in that unit regains up to D3+1 lost wounds.
▪ One destroyed Infantry model (excluding Characters) is returned to that unit with its full wounds remaining. If that unit is an Endless Multitude unit, up to 3 destroyed models are returned instead.`,
      },
      stratagems: [
        {
          name: 'Broodguard Impulse',
          sublabel: 'Assimilation Swarm – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor:
            "Should a foe successfully slay one of the swarm's assimilation organisms, they only mark themselves as a priority for predation and consumption in turn.",
          when: 'Any phase.',
          target: 'One Harvester unit from your army that was just destroyed. You can use this Stratagem on that unit even though it was just destroyed.',
          effect:
            'Until the end of the battle, each time a friendly Tyranids model makes an attack that targets the enemy unit that just destroyed your Harvester unit, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Reclaim Biomass',
          sublabel: 'Assimilation Swarm – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Dead Tyranids are consumed and reconstituted by the swarm just as readily as the lifeless carcasses of their prey.',
          when: 'Any phase, when a Tyranids unit from your army is destroyed, before the last model in it is removed from play.',
          target: 'One Harvester unit from your army that is within 6" of that destroyed unit.',
          effect: 'Regenerate one friendly Tyranids unit within 6" of your Harvester unit (see Feed the Swarm).',
          restrictions: '',
        },
        {
          name: 'Tyrannoformed',
          sublabel: 'Assimilation Swarm – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'Swarms of diminutive Tyranid phage organisms carpet even the most vital strategic assets, steadily breaking them down for assimilation.',
          when: 'Command phase.',
          target: 'One Harvester unit from your army that is within range of an objective marker you control.',
          effect:
            "That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Ablative Carapace',
          sublabel: 'Assimilation Swarm – Epic Deed Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'These organisms have employed consumed minerals to exude an additional hardened protective layer over their chitinous armour.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Harvester unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            'Until the end of the phase, models in your unit have the Feel No Pain 5+ ability. If your unit is within range of an objective marker you control, until the end of the phase models in your unit have the Feel No Pain 4+ ability instead.',
          restrictions: '',
        },
        {
          name: 'Secure Biomass',
          sublabel: 'Assimilation Swarm – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'When rich sources of biomass are identified the warrior organisms of this swarm will stop at nothing to destroy resistance and claim them.',
          when: 'Fight phase.',
          target: 'One Tyranids unit from your army that has not been selected to fight this phase.',
          effect:
            'Until the end of the phase, melee weapons equipped by models in your unit have the [LETHAL HITS] ability. If your unit is a Harvester unit, each time a model in that unit makes a melee attack, a successful unmodified Hit roll of 5+ scores a Critical Hit as well.',
          restrictions: '',
        },
        {
          name: 'Rapacious Hunger',
          sublabel: 'Assimilation Swarm – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The hunger of the Tyranids can never be satiated.',
          when: 'Your Fight phase.',
          target: 'One Tyranids unit from your army that just destroyed an enemy unit.',
          effect:
            'Your unit immediately Regenerates (see Feed the Swarm). When doing so, if your unit is a Harvester unit and you choose for one model to regain up to D3 lost wounds, that model regains up to 3 lost wounds instead.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Regenerating Monstrosity',
          points: 20,
          flavor:
            'This nightmarish creature seems virtually unkillable, its every hurt healing in moments as it guzzles down the hunks of bubbling biomatter that were once foes.',
          body: `Tyranids model only (excluding Monsters models). The bearer's unit can be regenerated up to twice per phase, instead of once.`,
        },
        {
          name: 'Instinctive Defence',
          points: 15,
          flavor: "The swarm's warrior organisms fight with instinctive and single-minded ferocity to protect the all-devouring organisms in their midst.",
          // Faction-Pack Rules Update: "for 0CP" → "-1 CP" and refined wording.
          body: `Tyranids model only. While the bearer is within 6" of one or more friendly Harvester units, when you target this unit with the Heroic Intervention Stratagem, that use is -1 CP. In addition, while the bearer is within 6" of one or more friendly Harvester units, models in the bearer's unit have the Fights First ability.`,
        },
        {
          name: 'Biophagic Flow',
          points: 10,
          aura: true,
          flavor: 'Parasitised biomass and revivifying fluids flow through the Assimilation Swarm like lifeblood.',
          body: `Tyranids model only. While a friendly Harvester model is within 12" of the bearer, when using the Feed the Swarm ability, that Harvester model can Regenerate one friendly Tyranids unit that is within 9" of it, instead of one within 6".`,
        },
        {
          name: 'Parasitic Biomorphology',
          points: 25,
          flavor: 'These warrior organisms boast additional fanged maws, jabbing probosci and haemophagic membranes that consume the fluids of their prey.',
          body: `Tyranids model only. Add 1 to the Strength characteristic of melee weapons equipped by models in the bearer's unit. The first time the bearer's unit destroys an enemy unit in the Fight phase while the bearer is within 6" of one or more friendly Harvester units, until the end of the battle, add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer's unit.`,
        },
      ],
    },

    {
      id: 'vanguard-onslaught',
      name: 'Vanguard Onslaught',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Questing Tendrils',
        flavor:
          'In the early stages of an invasion, the Hive Mind harries and unbalances its foes with lightning-fast flanking attacks, before encircling them for the final, bloody slaughter.',
        body: `Tyranids units with this ability are eligible to charge in a turn in which they Fell Back. Vanguard Invader units with this ability are eligible to charge in a turn in which they Advanced.

### Vanguard Prime
During the earliest stages of a Tyranid invasion, the rare bioform Imperial observers have named Deathleaper has been seen fulfilling a leadership and coordination role amongst the swarms. Employing pheromone trails and goading imperatives, the creature provides guidance to other warrior organisms that is the localised equivalent of synaptic control.

Deathleaper loses the Hunter Organism rule and can be your Warlord.`,
      },
      stratagems: [
        {
          name: 'Surprise Assault',
          sublabel: 'Vanguard Onslaught – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Vanguard organisms strike from unexpected quarters with calculated and emotionless alien savagery that is appalling to behold.',
          when: 'Your Shooting phase or the Fight phase, just after a Vanguard Invader unit from your army has selected its targets.',
          target: 'That Vanguard Invader unit.',
          effect:
            "Select one enemy unit that was selected as the target of one or more of your unit's attacks. That enemy unit must take a Battle-shock test. Until the end of the phase, each time a model in your unit makes an attack that targets that enemy unit, add 1 to the Hit roll. If the Battle-shock test was failed, add 1 to the Wound roll as well.",
          restrictions: '',
        },
        {
          name: 'Assassin Beasts',
          sublabel: 'Vanguard Onslaught – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'These bioforms have been adapted to strike with pinpoint precision at the pre-assessed weak points of selected prey that require elimination.',
          when: 'Fight phase.',
          target: 'One Vanguard Invader Infantry unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.',
          restrictions: '',
        },
        {
          name: 'Seeded Broods',
          sublabel: 'Vanguard Onslaught – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Warrior organisms erupt from concealment straight into advanced positions.',
          when: 'Your Movement phase.',
          target: 'One Tyranids unit from your army that is in Reserves, or up to two Vanguard Invader units from your army that are in Reserves.',
          effect:
            'Until the end of the phase, for the purposes of setting up those selected units on the battlefield, treat the current battle round number as being one higher than it actually is.',
          restrictions: '',
        },
        {
          name: 'Hypersensory Scillia',
          sublabel: 'Vanguard Onslaught – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'Hissing clusters of scillia warn of the slightest prey movements, allowing the Tyranids to react.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update: 9" → 8" (both occurrences in the Target).
          target: 'Up to two Vanguard Invader units from your army that are within 8" of that enemy unit, or one other Tyranids Infantry unit from your army that is within 8" of that enemy unit.',
          effect: 'Those selected units can each make a Normal move of up to 6".',
          restrictions: 'You cannot target units that are within Engagement Range of one or more enemy units.',
        },
        {
          name: 'Unseen Lurkers',
          sublabel: 'Vanguard Onslaught – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Hyper-attuned senses warn vanguard organisms when they are being targeted by the prey.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Vanguard Invader unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            "Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18\" or, if your unit has the Lone Operative ability, if the attacking model is within 6\". Your opponent can select new targets for the attacking unit's attacks.",
          restrictions: '',
        },
        {
          name: 'Invisible Hunter',
          sublabel: 'Vanguard Onslaught – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Hunter-slayer organisms can melt away before the eyes of their foes, only to strike from a new direction.',
          when: "End of your opponent's Fight phase.",
          target: 'Up to two Vanguard Invader units from your army, or one Tyranids Infantry unit from your army.',
          effect: 'Remove the targeted units from the battlefield and place them into Strategic Reserves.',
          restrictions: 'The targeted units must be more than 3" away from all enemy units.',
        },
      ],
      enhancements: [
        {
          name: 'Hunting Grounds',
          points: 30,
          flavor:
            'This warrior organism has identified installations and routes of communication and supply vital to the prey. As the Tyranid invasion commences so the beast orchestrates ambushes and terror raids against these priority targets, ensuring that those enemy reinforcements who do reach the battlefield do so in bloodied disarray.',
          body: `Tyranids model only. While the bearer is on the battlefield, each time your opponent sets up a Reserves unit on the battlefield, roll one D6: on a 2+, that unit must take a Battle-shock test.`,
        },
        {
          name: 'Chameleonic',
          points: 15,
          flavor: "Subdermal crystals in this organism's carapace capture and redirect light, helping to conceal it.",
          body: `Vanguard Invader model only. This unit has Stealth.`,
        },
        {
          name: 'Stalker',
          points: 10,
          flavor: 'This hunter seeks vital priority prey that has been pheromonally marked for swift slaughter.',
          body: `Vanguard Invader model only. At the start of the battle, select one enemy unit. Each time the bearer makes an attack that targets that enemy unit, add 1 to the Hit roll and add 1 to the Wound roll.`,
        },
        {
          name: 'Neuronode',
          points: 20,
          flavor:
            "While no true synapse beast, this bioform has been grafted with a limited synaptic symbiote, the influence of which increases its host's ability to formulate and enforce large-scale predatory strategies.",
          // Faction-Pack Rules Update rewrote this enhancement.
          body: `Tyranids model only. After both players have deployed their armies, you can select up to three Vanguard Invader units from your army and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
      ],
    },

    {
      id: 'synaptic-nexus',
      name: 'Synaptic Nexus',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Synaptic Imperatives',
        flavor:
          'The leader-beasts of these swarms act as conduits to the will of the Hive Mind. Irresistible imperatives lash out from them like whips that drive lesser bioforms to hurl themselves at the prey, to fight on through fatal wounds or to attack with redoubled savagery.',
        body: `At the start of the battle round, you can select one of the Synaptic Imperatives shown below. Until the end of the battle round, that Synaptic Imperative is active for your army and while a Tyranids unit from your army is within Synapse Range of your army, it will benefit from it. Each Synaptic Imperative can only be selected once per battle.
▪ **Synaptic Augmentation:** While this unit is within Synapse Range of your army, models in this unit have a 5+ invulnerable save.
▪ **Surging Vitality:** While this unit is within Synapse Range of your army, add 1 to Advance and Charge rolls made for this unit.
▪ **Goaded to Slaughter:** While this unit is within Synapse Range of your army, each time a model in this unit makes a melee attack, add 1 to the Hit roll.`,
      },
      stratagems: [
        {
          name: 'The Smothering Shadow',
          sublabel: 'Synaptic Nexus – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'In the heart of the swarms, the Shadow in the Warp can literally kill with its smothering power.',
          when: 'Any phase, just after an enemy unit fails a Battle-shock test.',
          target: 'One Synapse unit from your army within 12" of that enemy unit.',
          effect: 'Roll six D6: for each 3+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
        {
          name: 'Synaptic Channelling',
          sublabel: 'Synaptic Nexus – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Tyranids are one with the Hive Mind; individuality is a disadvantage that they surpass.',
          when: 'Command phase.',
          target: 'One Synapse unit from your army.',
          effect:
            'Until the end of the turn, while a friendly Tyranids unit is within 9" of the selected unit, that unit is within Synapse Range of your army.',
          restrictions: '',
        },
        {
          name: 'Irresistible Will',
          sublabel: 'Synaptic Nexus – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'Whether paralysing its prey or forcing them to stumble out of cover with its force of will, or else puppeteering nearby warrior organisms, the leader-beast ensures the prey targets are struck down.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Synapse unit from your army that has not been selected to shoot or fight this phase, and one enemy unit within 24" of and visible to the Synapse unit.',
          effect:
            "Until the end of the phase, each time a friendly Tyranids model makes an attack that targets that enemy unit, if the attacking model's unit is within 6\" of your Synapse unit, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.",
          restrictions: '',
        },
        {
          name: 'Reinforced Hive Node',
          sublabel: 'Synaptic Nexus – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Psionic shielding crackles around these leader-beasts, helping to ensure their survival.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Synapse unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          // Faction-Pack Rules Update: "Until the end of the phase" → "Until the attacking unit has finished making its attacks".
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          restrictions: '',
        },
        {
          name: 'Imperative Dominance',
          sublabel: 'Synaptic Nexus – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'At need, the focused will of the Tyranid leader-beasts can goad warrior organisms to exhibit strategically beneficial behaviours at the instant they are needed most.',
          when: 'Your Command phase.',
          target: 'One Tyranids unit from your army that is within Synapse Range of your army.',
          effect:
            'Select one Synaptic Imperative, even if you have already selected that imperative this battle. Until the start of your next Command phase, that Synaptic Imperative is active for your unit instead of any other Synaptic Imperative that is active for your army.',
          restrictions: '',
        },
        {
          name: 'Override Instincts',
          sublabel: 'Synaptic Nexus – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The seemingly omniscient Hive Mind processes the sensory input of its swarms at an impossible rate, and compels its broods to react accordingly.',
          when: 'Your Movement phase.',
          target: 'One Tyranids unit from your army that is within Synapse Range of your army and made a Fall Back move this phase.',
          effect: 'Your unit is eligible to shoot and declare a charge this turn.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Power of the Hive Mind',
          points: 10,
          flavor: 'The Hive Mind channels lethal energy through its synaptic bioforms.',
          body: `Tyranids Psyker model only. Improve the Strength and Armour Penetration characteristics of psychic weapons equipped by the bearer by 1.`,
        },
        {
          name: 'Psychostatic Disruption',
          points: 30,
          flavor:
            'A maelstrom of psychostatic disruption boils about this bioform. It degrades artificial and biological cognition alike, causing teleport signals to fluctuate, geopositioning cogitators to spew contradictory data, and onrushing enemy warriors to reel in confusion.',
          body: `Tyranids Synapse model only. Enemy units that arrive on the battlefield from Reserves cannot be set up within 12" of the bearer. In addition, once per battle, during the first or second battle round, when your opponent declares that a unit will arrive on the battlefield from Strategic Reserves, the bearer can use this Enhancement. If it does, roll one D6: on a 4+, that enemy unit cannot arrive on the battlefield this turn.`,
        },
        {
          name: 'Synaptic Control',
          points: 20,
          flavor: "The Hive Mind's synaptic network is so strong that even the mangled remains of mortally wounded beasts can be compelled to fight on.",
          body: `Tyranids Synapse model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack.`,
        },
        {
          name: 'The Dirgeheart of Kharis',
          points: 15,
          aura: true,
          flavor:
            "This grotesque biomorphic symbiote buries itself in its host's thorax and emits a droning psychic note. The longer prey are exposed to the sound, the worse their atavistic terror response becomes…",
          body: `Tyranids Synapse model only. While an enemy unit is within 9" of the bearer, worsen that unit's Leadership characteristic by 1.`,
        },
      ],
    },

    // ───────────────────────── FACTION PACK DETACHMENTS ─────────────────────────
    {
      id: 'ambush-predators',
      name: 'Ambush Predators',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Mindhunger',
        flavor:
          'Ravenous instinct drives these vanguard organisms to predate leaders amongst the prey, and to crack open their crania and devour the quivering mindmeat within.',
        body: `▪ Friendly Deathleaper/Lictor/Neurolictor units have Deep Strike.
▪ Friendly Lictor/Neurolictor units' attacks that target a Character unit can re-roll Hit rolls of 1.`,
      },
      stratagems: [
        {
          name: 'Counterpredation',
          sublabel: 'Ambush Predators – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'One should never attempt to lay a trap for perfectly adapted ambush hunters, lest one become the prey in turn.',
          when: "Fight phase, when a friendly Deathleaper/Lictor/Neurolictor/Von Ryan's Leapers unit is selected to fight.",
          target: "That Deathleaper/Lictor/Neurolictor/Von Ryan's Leapers unit.",
          effect: "Your unit's attacks that target a hidden unit have +1 S and AP.",
          restrictions: '',
        },
        {
          name: 'Hypersensory Adaptations',
          sublabel: 'Ambush Predators – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'The organisms that comprise the Tyranid vanguard possess exceptionally keen senses, detecting prey no matter how well hidden it may be and relaying its location to the wider Hive Mind.',
          when: 'Start of your Shooting phase.',
          target: "One friendly Deathleaper/Lictor/Neurolictor/Von Ryan's Leapers unit.",
          effect: 'Select one visible enemy unit within 12" of your unit. That enemy unit has +6" detection range.',
          restrictions: '',
        },
        {
          name: 'Scanner Gheist',
          sublabel: 'Ambush Predators – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'What seemed a certain and identified Tyranid contact vanishes suddenly from sight and sensors both, seemingly nothing but a ghost all along.',
          when: "End of your opponent's Fight phase.",
          target: 'One friendly unengaged Deathleaper/Lictor/Neurolictor unit.',
          effect: 'Place your unit in strategic reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Encircling Horrors',
          points: 20,
          upgrade: true,
          flavor:
            "By the time the prey realise that they are being hunted, the Hive Mind's vanguard organisms have already enfolded them in a murderous embrace. There is no hiding from what comes next.",
          body: `Neurolictor/Lictor/Von Ryan's Leapers unit only. In your opponent's Movement phase, when an enemy unit ends a move within 8" of this unit, this unit can make a normal move of up to D3+3".`,
        },
        {
          name: 'Cryptophotaic Camouflage',
          points: 15,
          upgrade: true,
          flavor:
            'The dermis of these biohunters has been adapted to subtly alter hue according to what the ocular receptors of the prey expect to see, thus hiding the creatures even in plain sight.',
          body: `Von Ryan's Leapers unit only. This unit has -3" detection range.`,
        },
      ],
    },

    {
      id: 'talons-of-the-norn-queen',
      name: 'Talons of the Norn Queen',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Higher Imperatives',
        flavor:
          'Capable of incredibly complex reasoning and a frightening level of self-direction, Norn Emissaries and Assimilators display great agency and alien cunning in the completion of their tasks.',
        body: `Friendly Norn Emissary/Norn Assimilator units have the following ability:

**Protean Purpose:** (Once per battle, per unit) In your Command phase, you can use this ability. If you do, this unit can make a selection for its Singular Purpose ability (this replaces the previous selection).`,
      },
      stratagems: [
        {
          name: 'Catalytic Biofortification',
          sublabel: 'Talons of the Norn Queen – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor:
            "Impacts and surface damage trigger explosive inflammation within this organism's exoskeleton, spawning hardened outer layers that stave off even the most grievous hurts.",
          when: 'Any phase, when a friendly Norn Assimilator unit suffers a mortal wound.',
          target: 'That Norn Assimilator unit.',
          effect: 'Your unit has Feel No Pain 4+ against mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Lesser Prey',
          sublabel: 'Talons of the Norn Queen – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Focused on achieving its assigned imperative, this towering bioform smashes prey from its path with glad-driven surges of additional might.',
          when: 'Fight phase, when a friendly Norn Assimilator/Norn Emissary unit is selected to fight.',
          target: 'That Norn Assimilator/Norn Emissary unit.',
          effect: "Your unit's melee attacks have +2 S.",
          restrictions: '',
        },
        {
          name: 'Tanglestrike Rounds',
          sublabel: 'Talons of the Norn Queen – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'These revolting living shells burst on impact to ensnare nearby prey organisms in a mess of dripping, incredibly sticky strands that take time to tear free of.',
          when: 'Your Shooting phase, when a friendly Norn Assimilator unit has shot.',
          target: 'That Norn Assimilator unit.',
          effect:
            'Select one enemy unit hit by those attacks. That enemy unit is tethered until the start of your next Command phase: while a unit is tethered, that unit has -2" M.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Destabilising Predation',
          points: 20,
          upgrade: true,
          flavor:
            "Reaching out like the will of the Hive Mind made manifest, this organism's pinpoint fire is perfectly tailored to strike down leaders amongst the prey.",
          body: `Norn Emissary unit only. This unit's ranged attacks have [ANTI-CHARACTER 2+].`,
        },
        {
          name: 'Synaptoprescience',
          points: 25,
          upgrade: true,
          flavor: "As though privy to glimpses of the Hive Mind's own near-omniscient view of events, this towering beast weaves unerringly aside from incoming threats.",
          body: `Norn Assimilator unit only. This unit has 4+ InSv.`,
        },
      ],
    },

    {
      id: 'warrior-bioform-onslaught',
      name: 'Warrior Bioform Onslaught',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Leader-beasts',
        flavor:
          'The Hive Mind has spawned entire swarms of Tyranid Warriors upon this battlefield, adapting them to be tougher as well as more numerous, and thus to serve as better conduits for its will.',
        body: `▪ Friendly Tyranid Warriors with Ranged Bio-weapons/Tyranid Warriors with Melee Bio-weapons units have:
   ▪ Tyranid Warriors.
   ▪ Battleline.
▪ Tyranid Warriors/Tyranid Prime with Lash Whip/Winged Tyranid Prime models from your army have 5+ InSv.`,
      },
      stratagems: [
        {
          name: 'Alien Physiology',
          sublabel: 'Warrior Bioform Onslaught – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The sheer resilience of these warrior organisms appears nigh-supernatural to their horrified prey.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Tyranid Warriors unit.",
          target: 'That Tyranid Warriors unit.',
          effect: "Attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
        {
          name: 'Synaptic Micronodes',
          sublabel: 'Warrior Bioform Onslaught – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Shed like spores from chitinous exoskeletons, these micronodes infest the very battlefield with minute motes of the Hive Mind's consciousness.",
          when: 'End of your Movement phase.',
          target: 'One friendly Tyranid Warriors unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Parasitic Payload',
          sublabel: 'Warrior Bioform Onslaught – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'The projectiles fired by this weapon are infected with parasites that burrow into the central nervous systems of their targets, causing them to shriek and convulse, giving away their position to the oncoming swarms.',
          when: 'Your Shooting phase, when a friendly Tyranid Warriors unit is selected to shoot.',
          target: 'That Tyranid Warriors unit.',
          effect: "Your unit's ranged attacks have [IGNORES COVER].",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Elevated Might',
          points: 30,
          flavor: 'This bioform and its symbiotic weapon-beasts have been adapted for maximum lethality.',
          body: `Winged Tyranid Prime/Tyranid Prime with Lash Whip model only. This model's melee attacks:
▪ Can re-roll wound rolls.
▪ Have +1 AP.`,
        },
        {
          name: 'Ocular Adaptation',
          points: 20,
          flavor:
            "This node-beast's bio-adaptations allow it to perceive the minutest electrical impulse or heat signature. Few prey organisms escape its clutches.",
          body: `Winged Tyranid Prime/Tyranid Prime with Lash Whip model only. This unit's melee attacks have +1 to hit rolls.`,
        },
      ],
    },

    {
      id: 'subterranean-assault',
      name: 'Subterranean Assault',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Surprise Assault',
        flavor:
          'When the hive fleet’s organisms descend, no place is truly safe from their wrath. Mawlocs, Raveners and Trygons burst from the ground to emerge in the midst of clustered defenders, scything apart and devouring screaming victims before they can raise their weapons in defence.',
        body: `Each time a Tyranids model from your army makes an attack, re-roll a Hit roll of 1.

Each time a Burrower unit from your army is set up on the battlefield from Reserves, place a 40mm circular Tunnel Marker anywhere on the battlefield within 1" of that unit and more than 3" horizontally away from all enemy units.

In the Reinforcements step of your Movement phase, when you set up a unit on the battlefield from Reserves, you can set that unit up wholly within 9" of one of your Tunnel Markers and more than 6" horizontally away from any enemy units.

If an enemy model (excluding Aircraft) ends any kind of move within 3" of one of your Tunnel Markers, that Tunnel Marker is removed from the battlefield.

### Keywords
Mawloc and Trygon units from your army have the Burrower keyword.

In the Muster Armies step, you can select up to 2 Trygon models from your army. The selected units gain the Character keyword.

**Designer's Note:** This means that the selected models can be given Enhancements and one of them can be selected as your Warlord.`,
      },
      stratagems: [
        {
          name: 'Adaptive Optimisation',
          sublabel: 'Subterranean Assault – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'On occasions where subterranean assaults are deemed tactically useful, the hive mind may spontaneously alter its burrowing organisms, enabling them to act as beacons for its will.',
          when: 'Command phase.',
          target: 'One Mawloc or Trygon unit from your army.',
          effect: 'Until the start of your next Command phase, your unit has the Synapse keyword.',
          restrictions: '',
        },
        {
          name: 'Replenishing Swarms',
          sublabel: 'Subterranean Assault – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Scrambling through the tunnels come endless multitudes of warrior-beasts and harvester bioforms, spilling out of the depths to reinforce the teeming masses.',
          when: 'Your Movement phase.',
          target: 'One Tyranids unit from your army, wholly within 9" of one or more Tunnel Markers you placed.',
          effect:
            'One model in your unit regains up to D3+1 lost wounds, or you can return up to D3+1 destroyed models with a Wounds characteristic of 1 to your unit, with their full wounds remaining, instead.',
          restrictions: '',
        },
        {
          name: 'Enfilading Emergence',
          sublabel: 'Subterranean Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Emerging from the depths, Tyranid bioforms level their weapon morphs and spit hissing volleys of living ammunition into the exposed backs of outflanked prey.',
          when: 'End of your Movement phase.',
          target: 'One Tyranids unit from your army that was set up as Reinforcements this turn.',
          effect: 'Until the end of your next Fight phase, weapons equipped by models in your unit have the [SUSTAINED HITS 1] and [IGNORES COVER] abilities.',
          restrictions: '',
        },
        {
          name: 'Tunnel Network',
          sublabel: 'Subterranean Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Taking advantage of freshly burrowed tunnels, Tyranid bioforms move swiftly across the landscape, emerging in unexpected locations.',
          when: 'End of your Movement phase.',
          target:
            'One Tyranids unit from your army that is wholly within 9" of one or more of your Tunnel Markers and not within Engagement Range of one or more enemy units.',
          effect:
            'Remove your unit from the battlefield and set it up again, wholly within 9" of another Tunnel Marker you placed, and more than 6" horizontally away from all enemy units.',
          restrictions: '',
        },
        {
          name: 'Swarming Assault',
          sublabel: 'Subterranean Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "A hive fleet's vanguard organisms favour mobility and aggression, keeping the foe on the back foot with repeated coordinated assaults.",
          when: 'Your Charge phase.',
          target: 'One Tyranids Monster unit from your army that was set up as Reinforcements this turn.',
          effect: 'Until the end of the phase, friendly Tyranids units within 6" of your unit can re-roll Charge rolls.',
          restrictions: '',
        },
        {
          name: 'Retreat Below',
          sublabel: 'Subterranean Assault – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The network of tunnels beneath the battlefield enables Tyranid organisms to retreat from the foe and prepare further ambushes.',
          when: "End of your opponent's Fight phase.",
          target: 'One Tyranids unit or up to two Burrower units from your army that are not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Synaptic Strategy',
          points: 15,
          flavor:
            'Possessing an exceptionally acute connection to the hive mind, this creature benefits from a constant influx of sensory data, enabling it to traverse the battlefield and emerge at the place and time of maximum impact.',
          body: `Tyranids model only. Once per battle, you can target the bearer's unit with the Rapid Ingress stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.`,
        },
        {
          name: 'Tremor Senses',
          points: 20,
          flavor:
            'From its concealed position beneath the battlefield, this bioform picks up on subtle traces of movement from the enemy force, impelling its fellow organisms to reposition themselves in preparation for a coordinated assault.',
          body: `Tyranids model only. After both players have deployed their armies, select up to three friendly Tyranids units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Vanguard Intellect',
          points: 15,
          flavor: 'This bioform uses its own keen senses and predatory intellect to burrow into position and strike before the enemy can react.',
          body: `Tyranids model with the Deep Strike ability only. The bearer's unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.`,
        },
        {
          name: 'Trygon Prime',
          points: 20,
          flavor:
            'Only rarely manifested by the hive fleets, the Trygon Prime possesses a greatly enhanced synaptic network within its neural cortex, enabling it to more precisely coordinate the assaults of burrowing Tyranid creatures.',
          body: `Trygon model only. The bearer gains the Synapse keyword. Improve the Strength and Weapon Skill characteristics of melee weapons equipped by the bearer by 1.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const tyranids = { en, ru: en }
