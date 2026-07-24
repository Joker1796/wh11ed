// Necrons — faction rules. Resolved from four sources by priority (highest wins):
//   MFM (points, detachment DP / Force Disposition / unique keywords)
//     > Faction Pack (sources/Faction pack 11 ed/xenos/necrons.pdf — 7 new detachments + Rules Updates)
//       > Codex (sources/codex/xenos/Necrons.pdf — army rule + 5 base detachments)
//         > Index (launch rules; superseded, kept only where nothing above covers it).
//
// The 12 detachments below match the Munitorum Field Manual list. Each carries `dp`
// (Detachment/Deployment cost), `forceDisposition` and (where relevant) `unique` from the MFM,
// and per-enhancement `points`. Faction-Pack "Rules Updates" have been folded into the codex
// detachments' text (they are the authoritative newer wording) — see inline notes.
//
// EN-first: `ru` reuses the same object for now (same pattern as mfmFactions.js); swap in a
// translated object later. Text markup follows useRenderInline / RuleBlock / StratCard
// conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet lines.
//
// Datasheets (unit stat profiles) are a later pass (`datasheets`), rendered by DatasheetCard.

const en = {
  slug: 'necrons',
  name: 'Necrons',

  armyRule: {
    id: 'reanimation-protocols',
    name: 'Reanimation Protocols',
    flavor:
      'The Necron dynasties benefit from the nigh-on supernatural technologies that once saw them dominate the galaxy, perhaps the most unsettling of which are their reanimation protocols. Should a Necron be slain, its body becomes wreathed in an eerie glow. Crawling limbs reattach. Sundered torsos and smashed skulls reform amidst emerald sparks. Witchlights flare back to life within dead eye-lenses and the Necron rises again, shambling back into their battle line. Those Necrons too catastrophically damaged to reform vanish instead, teleported away to their tombs for repair.',
    body: `If your Army Faction is Necrons, at the end of your Command phase, each unit from your army with this ability that is on the battlefield activates its Reanimation Protocols and reanimates D3 wounds. Each time such a unit reanimates a wound:
▪ If that unit contains one or more models with fewer than their starting number of wounds remaining, select one of those models; that model regains one lost wound.
▪ If all models in that unit have their starting number of wounds, but that unit is not at its Starting Strength, one destroyed model is returned to that unit with one wound remaining.

Once such a unit is at its Starting Strength and all of its models have their starting number of wounds, nothing further happens.`,
    example: `A unit of Lokhust Destroyers (which have a Wounds characteristic of 3) activates its Reanimation Protocols. The unit had a Starting Strength of 3, but currently contains 2 models, and one of those models has lost 1 wound. A 3 is rolled to see how many wounds are reanimated. The first of these reanimated wounds restores the wounded Lokhust Destroyer back to 3 wounds. The second of these reanimated wounds returns the destroyed Lokhust Destroyer to the battlefield with 1 wound remaining. The third of these reanimated wounds restores one of the remaining lost wounds to the same Lokhust Destroyer that was just returned. The unit now contains 3 models, two of which have 3 wounds remaining and one of which has 2 wounds remaining.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'awakened-dynasty',
      name: 'Awakened Dynasty',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      unique: 'DYNASTY',
      rule: {
        name: 'Command Protocols',
        flavor:
          'The Necron nobility and their high-ranking courtiers make war in a codified and relentless fashion. Their command protocols crackle out across multi-dimensional spectra from carrier-wave projectors, compelling their semi-sentient soldiery into battle one overriding directive at a time.',
        body: `While a Necrons Character model is leading this unit, each time a model in this unit makes an attack, add 1 to the Hit roll.`,
      },
      stratagems: [
        {
          name: 'Protocol of the Eternal Revenant',
          sublabel: 'Awakened Dynasty – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Necron rulers possess enhanced self-repair systems.',
          when: 'Any phase.',
          target:
            'One Necrons Infantry Character model from your army that was just destroyed. You can use this Stratagem on that model even though it was just destroyed.',
          effect:
            'At the end of the phase, set up the destroyed model on the battlefield, unengaged and as close as possible to where it was destroyed. That model is not part of an attached unit and its unit has a starting strength of 1. That model has half of its starting number of wounds remaining.',
          restrictions: 'Each model can only be targeted with this Stratagem once per battle.',
        },
        {
          name: 'Protocol of the Undying Legions',
          sublabel: 'Awakened Dynasty – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor:
            'Nanoscarabs are released in boiling black clouds that whirl about the legions and effect rapid repairs.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has resolved its attacks.",
          target:
            "One Necrons unit from your army that had one or more of its models destroyed as a result of the attacking unit's attacks.",
          effect:
            'Your unit activates its Reanimation Protocols and reanimates D3 wounds (or D3+1 wounds if a Necrons Character is leading your unit).',
          restrictions: '',
        },
        {
          name: 'Protocol of the Hungry Void',
          sublabel: 'Awakened Dynasty – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Necrons strike with data-augmented accuracy.',
          when: 'Fight phase.',
          target: 'One Necrons unit from your army that has not been selected to fight this phase.',
          effect:
            'Until the end of the phase, add 1 to the Strength characteristic of melee weapons equipped by models in your unit. In addition, if a Necrons Character is leading your unit, until the end of the phase, improve the Armour Penetration characteristic of melee weapons equipped by models in your unit by 1 (this is not cumulative with any other modifiers that improve Armour Penetration).',
          restrictions: '',
        },
        {
          name: 'Protocol of the Sudden Storm',
          sublabel: 'Awakened Dynasty – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Arcing energies leap from one Necron to the next, lending them unnatural speed and surety.',
          when: 'Your Movement phase.',
          target: 'One Necrons unit from your army.',
          effect:
            'Until the end of the turn, ranged weapons equipped by models in your unit have the [ASSAULT] ability. In addition, if a Necrons Character is leading your unit, until the end of the phase, you can re-roll Advance rolls made for your unit.',
          restrictions: '',
        },
        {
          name: 'Protocol of the Conquering Tyrant',
          sublabel: 'Awakened Dynasty – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'The legions employ the strategies of their masters in perfect synchronicity, laying down hails of mechanically coordinated fire.',
          when: 'Your Shooting phase.',
          target: 'One Necrons unit from your army that has not been selected to shoot this phase.',
          effect:
            'Until the end of the phase, each time a model in your unit makes an attack that targets a unit within half range, re-roll a Hit roll of 1. If a Necrons Character is leading your unit, until the end of the phase, you can re-roll the Hit roll for that attack instead.',
          restrictions: '',
        },
        {
          name: 'Protocol of the Vengeful Stars',
          sublabel: 'Awakened Dynasty – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor:
            "Criss-cross fire leaps from the Necron ranks, forming a blazing corona of deadly energy to punish those who dare threaten the indignant nobility's legions.",
          when: "Your opponent's Shooting phase, just after an enemy unit destroys a Necrons unit from your army.",
          target:
            'One Necrons Character unit from your army that was within 6" of that Necrons unit when it was destroyed.',
          effect:
            'After the attacking unit has resolved its attacks, your unit can shoot as if it were your Shooting phase, but it must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Veil of Darkness',
          points: 20,
          flavor:
            'With this device the bearer can twist space and time about them, enfolding them in a swirling darkness. When it fades, they have vanished, rematerialising elsewhere through a miracle of arcane science.',
          body: `Necrons model only. (Once per battle, per army) At the end of your opponent's turn, if this unit is unengaged, you can use this ability. If you do:\n▪ Place this unit in strategic reserves.\n▪ This unit has Deep Strike until the start of your next Shooting phase.\n▪ This unit must make an ingress move in your next Movement phase (including in your first turn).`,
        },
        {
          name: 'Nether-realm Casket',
          points: 20,
          flavor:
            'Clouds of hyper-dense particles billow from this small artefact, to obscure and shield the bearer from the foe.',
          body: `Necrons model only. While the bearer is leading a unit, models in that unit have the Stealth ability.`,
        },
        {
          name: 'Phasal Subjugator',
          points: 35,
          aura: true,
          flavor:
            'This engraved sigil-circuitry transforms the fierce will of the bearer into a surging lash across every phasal state.',
          body: `Necrons model only. While a friendly Necrons unit (excluding Character units) is within 6" of the bearer, each time a model in that unit makes an attack, add 1 to the Hit roll.`,
        },
        {
          name: 'Enaegic Dermal Bond',
          points: 30,
          flavor:
            'The bearer’s living metal mantle is bonded to mirror versions of itself across many dimensional thresholds.',
          body: `Necrons model only. The bearer has the Feel No Pain 4+ ability.`,
        },
      ],
    },

    {
      id: 'annihilation-legion',
      name: 'Annihilation Legion',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Annihilation Protocol',
        flavor:
          'The most murderous Necrons of an Annihilation Legion retain no thought processes beyond destroying anything in reach. They are mechanised death, echoes of the industrialised and brutal processes of biotransference made manifest. Whether soullessly efficient or frenziedly deluded, these killing machines follow protocols that have atrophied into a singular and all-consuming insanity.',
        // Faction-Pack Rules Update adds the second paragraph below.
        body: `Each time a Destroyer Cult or Flayed Ones unit from your army declares a charge, you can re-roll the Charge roll. If one or more targets of that charge are Below Half-strength, add 1 to the Charge roll as well.

Each time a Destroyer Cult unit from your army makes a ranged attack that targets the closest eligible target, add 1 to the Armour Penetration characteristic of that attack.`,
      },
      stratagems: [
        {
          name: 'Masks of Death',
          sublabel: 'Annihilation Legion – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor:
            'Wreathed in tendrils of transdimensional shadow that intensify their deathly visages, these killing machines evoke such terror that steady aims tremble and blade arms are sapped of strength.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target:
            "One Destroyer Cult or Flayed Ones unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'The Spoor of Frailty',
          sublabel: 'Annihilation Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Where one foe falls, logic dictates all others must follow. Where blood is shed, ever must more flow.',
          when: 'Your Shooting phase or the Fight phase.',
          target:
            'One Destroyer Cult or Flayed Ones unit from your army that has not been selected to shoot or fight this phase.',
          effect:
            'Until the end of the phase, each time a model from your unit makes an attack that targets a unit below Starting Strength, add 1 to the Hit roll. If the target is Below Half-strength, add 1 to the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Murderous Reanimation',
          sublabel: 'Annihilation Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'Through some quirk of their kind’s shared insanity, a spark of gruesome satisfaction surges through them with every enemy life snuffed out, triggering quiescent power reserves that drive them onwards.',
          when: 'Fight phase.',
          target:
            'One Destroyer Cult or Flayed Ones unit from your army that has just destroyed an enemy unit, or just caused an enemy unit that was not Below Half-strength to become Below Half-strength.',
          effect: "Your unit's Reanimation Protocols activate.",
          restrictions: '',
        },
        {
          name: 'Pitiless Hunters',
          sublabel: 'Annihilation Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            "Driven into a state of hyperaggression, an Annihilation Legion's most eager hunters plunge into their prey's midst to maximise their butchery.",
          when: 'Fight phase.',
          target: 'One Destroyer Cult or Flayed Ones unit from your army that has not been selected to fight this phase.',
          effect:
            'Until the end of the phase, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".',
          restrictions: '',
        },
        {
          name: 'Blood-Fuelled Cruelty',
          sublabel: 'Annihilation Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Whatever strange afflictions eat away at the sanity of Destroyers and Flayed Ones, mercy is not one of them.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Fall Back move.",
          target:
            'One Destroyer Cult or Flayed Ones unit from your army that started the phase within Engagement Range of that enemy unit.',
          effect:
            'Roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers 3 mortal wounds. Your unit can then make a Normal move, but must end that move as close as possible to that enemy unit.',
          restrictions: '',
        },
        {
          name: "Insanity's Ire",
          sublabel: 'Annihilation Legion – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "To strike down one horror is merely to draw the rest of the pack's insane and murderous focus.",
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly unengaged DESTROYER CULT/FLAYED ONES unit this phase has shot.",
          target: 'That DESTROYER CULT/FLAYED ONES unit.',
          effect: 'Your unit can make a surge move of up to D6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Eternal Madness',
          points: 20,
          flavor:
            'This Necron’s sanity suffered during the Great Sleep. Now they are driven by a wrathful zeal, one which has seeped through the carrier waves of their commandments and into their followers.',
          body: `Necrons model only. In the Fight phase, each time a model in the bearer's unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking model's unit has finished making its attacks, and is then removed from play.`,
        },
        {
          name: 'Ingrained Superiority',
          points: 5,
          flavor:
            'An immortal destroyer, this war leader’s every victim is etched irrevocably into their cognitive engrams. Every weakness they ever overcame is recalled, frailties they can exploit on each new battlefield.',
          body: `Necrons model only. Each time a model in the bearer's unit makes an attack, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1.`,
        },
        {
          name: 'Soulless Reaper',
          points: 15,
          flavor:
            'This deathly killer exudes a soul-sapping presence, the promise of life’s end so explicit in their chilling gaze that few can muster the strength of will to evade it.',
          body: `Destroyer Cult model only. Each time an enemy unit within Engagement Range of the bearer's unit is selected to Fall Back, roll one D6: on a 3+, that unit cannot Fall Back this phase and must Remain Stationary.`,
        },
        {
          name: 'Eldritch Nightmare',
          points: 10,
          flavor:
            'Atavistic fears are summoned from the pits of nightmare and thrust into the minds of all foes near this metal-skinned horror.',
          body: `Destroyer Cult model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer must take a Battle-shock test.`,
        },
      ],
    },

    {
      id: 'canoptek-court',
      name: 'Canoptek Court',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Power Matrix',
        flavor:
          "Countless worlds across the galaxy harbour quiescent Necron technology, buried beneath the surface or mistaken for mere xenoarchaeological ruins. Whether part of an awakening tomb world's defences, phased beneath the crust of a planet to empower the Cryptek's conquest or perhaps the very objects they seek, these strange engines can be roused to wakefulness. Linked in an interdimensional matrix, their ancient energy cores can be vampirically bled to empower the Crypteks' arcane technologies as well as their artificial and servile constructs.",
        body: `Certain areas of the battlefield are considered to be within your army's Power Matrix, as follows:
▪ Your deployment zone is always within your army's Power Matrix.
▪ At the start of any phase, if you control at least half of the objective markers within No Man's Land, until the end of that phase, No Man's Land is within your army's Power Matrix.
▪ At the start of any phase, if you control at least half of the objective markers within your opponent's deployment zone, until the end of that phase, your opponent's deployment zone is within your army's Power Matrix.

Each time a model in a Cryptek or Canoptek unit from your army makes an attack, re-roll a Hit roll of 1. If such a unit is wholly within your army's Power Matrix, you can re-roll the Hit roll instead.`,
      },
      stratagems: [
        {
          name: 'Curse of the Cryptek',
          sublabel: 'Canoptek Court – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Vindictive Crypteks often hardwire vengeance subprotocols into the ancient cores of their unliving servants, by which a last act of reprisal is assured.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has shot or fought.",
          target:
            "One Cryptek model from your army that was destroyed by one of the attacking unit's attacks. You can use this Stratagem on that model even though it was just destroyed.",
          effect:
            'Until the end of the battle, each time a friendly Canoptek model makes an attack that targets the attacking unit, add 1 to the Hit roll and add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Cynosure of Eradication',
          sublabel: 'Canoptek Court – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'Only the foolish tread where a Cryptek has set their sights, for these arcane scientists will suffer no threat to their works.',
          when: 'The start of your Shooting phase or the start of the Fight phase.',
          target: "One Cryptek or Canoptek unit from your army that is wholly within your army's Power Matrix.",
          // Faction-Pack Rules Update: effect now restricts to Cryptek/Canoptek models in the unit.
          effect:
            'Until the end of the phase, weapons equipped by Cryptek or Canoptek models in your unit have the [DEVASTATING WOUNDS] ability.',
          restrictions: '',
        },
        {
          name: 'Solar Pulse',
          sublabel: 'Canoptek Court – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'By remotely accessing a hidden engine’s most illuminating protocols, a Cryptek can release the awesome power of a caged solar flare.',
          when: 'Start of your Shooting phase.',
          target: 'One Cryptek model from your army.',
          effect:
            'Select one objective marker within 18" of your Cryptek model. Until the end of the phase, weapons equipped by friendly Necrons models have the [IGNORES COVER] ability while targeting units within range of that objective marker.',
          restrictions: '',
        },
        {
          name: 'Reactive Subroutines',
          sublabel: 'Canoptek Court – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Canoptek constructs spent the long Great Sleep in watchful vigilance. Triggering a surge of power, they are capable of responsive manoeuvres to outwit the swiftest of attackers.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update: 9" changed to 8".
          target: 'One Canoptek unit from your army that is within 8" of that enemy unit.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Countertemporal Shift',
          sublabel: 'Canoptek Court – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "With a twist to the fabric of time, a bubble of another moment enshrouds these constructs. Strange emissions from long-dead elder stars or utter darkness from a nighttime far in the future occludes them from their master's foes.",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target:
            "One Canoptek unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          restrictions: '',
        },
        {
          name: 'Suboptimal Facade',
          sublabel: 'Canoptek Court – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Canoptek constructs use sophisticated metalogic to craft sinister ambushes. Luring the foe in by appearing at suboptimal operation, a surge of reanimation protocols suddenly swells their numbers.',
          when: "Your opponent's Charge phase, just after an enemy unit has declared a charge.",
          target:
            "One Canoptek unit from your army that was selected as a target of that charge and is wholly within your army's Power Matrix.",
          effect: "Your unit's Reanimation Protocols activate.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Dimensional Sanctum',
          points: 20,
          flavor: 'This Cryptek has had a personal dimensional pocket reality crafted for them, from which they can emerge into battle at will.',
          body: `Cryptek model only. Models in the bearer's unit have the Infiltrators ability.`,
        },
        {
          name: 'Hyperphasic Fulcrum',
          points: 15,
          flavor:
            "With this small orb, its surface shimmering in fractal hues and shifting in multidimensional facets, a Cryptek can bypass the ancient security protocols placed upon the area's dormant machineries. Esoteric data and unusual strands of energy can be accessed, the orb acting as a skeleton key to greater power.",
          body: `Cryptek model only. While the bearer is leading a unit, if that unit is wholly within your army's Power Matrix, each time a model in that unit makes an attack, re-roll a Wound roll of 1.`,
        },
        {
          name: 'Autodivinator',
          points: 15,
          flavor:
            "This cryptogeometric puzzle box harbours a chronoscarab. The tiny construct creeps forward in time along temporal webs before hauling back a captured net of future moments. Its master can scry these wriggling futures to predict their foe's strategies, using the knowledge to develop new counter-tactics to ambush the attackers.",
          body: `Cryptek model only. Each time your opponent gains a CP as the result of an ability, roll one D6: on a 2+, you also gain 1CP.`,
        },
        {
          name: 'Metalodermal Tesla Weave',
          points: 10,
          flavor:
            'This microsilicate weave generates a cyclical electrostatic overload that, providing its user triggers it in time, sends arcing lightning leaping out to roast onrushing attackers.',
          body: `Cryptek model only. Once per phase, when an enemy unit selects the bearer's unit as a target of a charge, roll one D6: on a 2-5, that enemy unit suffers D3 mortal wounds; on a 6, that enemy unit suffers 3 mortal wounds.`,
        },
      ],
    },

    {
      id: 'hypercrypt-legion',
      name: 'Hypercrypt Legion',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      unique: 'HYPERCRYPT',
      rule: {
        name: 'Hyperphasing',
        flavor:
          'Employing fractal corridors, dolmen gates and ancient translocation science, the Necrons are able to phase in and out of existence. Nowhere is safe for the terrified foe as mechanoid hunters appear from unfolding planar lattices to slaughter or escape retribution into gulfs of darkness, only to materialise elsewhere to kill anew.',
        // Faction-Pack Rules Update revises the battle-size table (was 2 / 3 / 4).
        body: `At the end of your opponent's turn, you can select a number of Necrons units from your army (excluding units that are within Engagement Range of one or more enemy units). The maximum number of units you can select depends on the battle size, as follows:
▪ Incursion: Up to 1 unit
▪ Strike Force: Up to 2 units
▪ Onslaught: Up to 3 units

Once you have made your selections, remove those units from the battlefield and place them into Strategic Reserves.`,
      },
      stratagems: [
        {
          name: 'Hyperphasic Recall',
          sublabel: 'Hypercrypt Legion – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: "Obeying recall protocols, threatened tomb defenders will phase out of existence, only to be relocated to a more advantageous position by the tomb's hulking Monoliths.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has shot or fought.",
          target:
            "One Necrons Infantry unit from your army that had one or more of its models destroyed as a result of the attacking unit's attacks and one friendly Monolith model.",
          effect:
            'Remove your Infantry unit from the battlefield and then set it back up anywhere on the battlefield that is wholly within 6" of your Monolith model and not within Engagement Range of one or more enemy units.',
          restrictions: '',
        },
        {
          name: 'Quantum Deflection',
          sublabel: 'Hypercrypt Legion – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Necron quantum shielding is a true marvel of techno-arcana. Channelled with energy reserves from the rising tomb structures, the shielding is capable of adaptive remodulation to diffuse and deflect the most powerful enemy attacks.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target:
            "One Necrons Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          restrictions: '',
        },
        {
          name: 'Reanimation Crypts',
          sublabel: 'Hypercrypt Legion – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'There is no rest for Necrons who fall in the service of their master. In dark crypts, their bodies are repaired and they are dispatched once more to war.',
          when: 'Your Command phase.',
          target: 'Your Necrons Warlord.',
          effect: "For each of your Necrons units in Reserves, that Reserves unit's Reanimation Protocols activate.",
          restrictions: '',
        },
        {
          name: 'Cosmic Precision',
          sublabel: 'Hypercrypt Legion – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With a sanity-defying mechanism at the heart of the tomb, dynastic astromancers divine the pre-aligned point in space and time where a crucial role can be played in the wider battle plan.',
          when: 'Your Movement phase.',
          // Faction-Pack Rules Update: target now excludes MONSTER units.
          target:
            'One Necrons unit from your army (excluding Monster units) that is arriving using the Deep Strike or Hyperphasing abilities this phase.',
          effect:
            'Your unit can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy models.',
          restrictions: 'A unit targeted with this Stratagem is not eligible to declare a charge in the same turn.',
        },
        {
          name: 'Dimensional Corridor',
          sublabel: 'Hypercrypt Legion – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: "As the tomb's warriors pass through a dimensional displacement corridor, the passage's surface is lit with data-glyphs providing hyperlogical tactical information. When they step from an eternity gate, they are already prepared for the hunt.",
          when: 'Your Charge phase.',
          target:
            'One Necrons unit from your army that was set up on the battlefield this turn using the Eternity Gate ability of a Monolith model that started the turn on the battlefield.',
          effect: 'Your unit is eligible to charge this phase.',
          restrictions: '',
        },
        {
          name: 'Entropic Damping',
          sublabel: 'Hypercrypt Legion – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Towering war engines rise from an erupting tomb in its defence, directing entropic energies to weaken and fracture the enemies' own weapons and turning them into dangerous tools only the desperate would use.",
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target:
            "One Titanic model from your army that was selected as the target of one or more of the attacking unit's attacks and is within 18\" of the attacking unit.",
          effect: 'Until the end of the phase, weapons equipped by models in the attacking unit have the [HAZARDOUS] ability.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Dimensional Overseer',
          points: 25,
          flavor: "With a mind as labyrinthine as the multi-dimensional tomb itself, this commander directs their servants in complex forays through the tomb's hyperspatial architecture, catching the witless enemy off guard.",
          body: `Necrons model only. While the bearer is on the battlefield or in Strategic Reserves, add one to the number of units from your army that you can select for the Hyperphasing rule.`,
        },
        {
          name: 'Arisen Tyrant',
          points: 25,
          flavor: 'This ancient being will suffer no threats to their rule, stepping imperiously from twisting nightmare dimensions to annihilate any who dare to oppose them.',
          body: `Necrons model only. Each time a model in the bearer's unit makes an attack, re-roll a Hit roll of 1. If the bearer's unit was set up on the battlefield this turn, you can re-roll the Hit roll instead.`,
        },
        {
          name: 'Hyperspatial Transfer Node',
          points: 15,
          flavor: 'Wound with filaments of temporal circuitry, this amulet enables the bearer to accelerate themselves and their closest guardians in stuttering bursts of compressed time.',
          body: `Necrons model only. Each time the bearer's unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6" to the Move characteristic of models in the bearer's unit.`,
        },
        {
          name: 'Osteoclave Fulcrum',
          points: 20,
          flavor: "This hypermaterial key unlocks portals between transpatial dimensions embedded into a tomb's architecture. Through such limitless doorways, the Necrons can pursue their quarry wherever they hide.",
          body: `Necrons model only. Models in the bearer's unit have the Deep Strike ability.`,
        },
      ],
    },

    {
      id: 'obeisance-phalanx',
      name: 'Obeisance Phalanx',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Worthy Foes',
        flavor:
          "With a command transmitted by regal carrier wave, signalled by a glowing glyph or via a haughty gesture with their blade, the ruling nobles mark their chosen enemy. With this declaration are the Triarchal Codes observed, and the ignorant foe doomed. The nobles' powerful servants and the Triarch's guardians of tradition march to war obediently, driven to best the mightiest of foes on the battlefield as a demonstration of the dynasty's honour and a warning to the rest of their enemies' foolish kind.",
        // Faction-Pack Rules Update: OVERLORD changed to NOBLE.
        body: `In your Command phase, select one enemy unit. Until the start of your next Command phase, each time a Noble, Lychguard or Triarch unit from your army makes an attack that targets that unit, add 1 to the Wound roll.`,
      },
      stratagems: [
        {
          name: 'Your Time Is Nigh',
          sublabel: 'Obeisance Phalanx – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With a pulse of necroneural energy that erodes the foe’s will, the Necron commander declares the fall of the enemy general, promising their remaining forces that it is only a matter of time until they join their master in ignoble death.',
          when: "Any phase, just after your opponent's Warlord is destroyed.",
          target: 'Your Necrons Warlord.',
          effect: 'Until the end of the battle, each time an enemy unit takes a Battle-shock or Leadership test, subtract 1 from the result.',
          restrictions: '',
        },
        {
          name: 'Enslaved Artifice',
          sublabel: 'Obeisance Phalanx – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'It is not only android soldiery that be compelled to serve. With a command, prized war engines and ornate weapons are empowered to hyperlethality.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Necrons unit from your army (excluding Titanic units) that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Nanoassembly Protocols',
          sublabel: 'Obeisance Phalanx – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'A tomb world’s war engines are the pride of its nobility and they will suffer no affront to them, demanding the reassembly of slablike armour atom by atom even as the foe seek to sunder the vehicles.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target:
            "One Necrons Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: 'Sentinels of Eternity',
          sublabel: 'Obeisance Phalanx – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Lychguard never tire, nor give a thought to their own safety over that of their master. With parrying blows and blocking shots they protect their liege even as they continue to strike down their opponents.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target:
            "One Lychguard or Triarch Praetorians unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect:
            "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking model's unit has finished making attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: 'Suffer No Rival',
          sublabel: 'Obeisance Phalanx – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Few enemy are worthy of a duel. What dangerous vermin are encountered are prioritised for execution to safeguard the nobles' honour.",
          when: 'Fight phase.',
          target: 'One Lychguard or Triarch unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.',
          restrictions: '',
        },
        {
          name: 'Territorial Obsession',
          sublabel: 'Obeisance Phalanx – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The ancient and arrogant will of the nobility drives their powerful servants to stand their ground defiantly as they claim the dynasty's rightful lands.",
          when: 'Your Command phase.',
          // Faction-Pack Rules Update: target now "One Lychguard or Triarch unit".
          target: 'One Lychguard or Triarch unit from your army.',
          effect:
            'Until the start of your next Command phase, add 1 to the Objective Control characteristic of models in your unit. If your unit has the Vehicle keyword, add 3 to the Objective Control characteristic instead.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Honourable Combatant',
          points: 10,
          flavor: "A strict adherent to the ancient codes, this noble reserves their greatest displays of power to execute the enemy's leaders. Such champions are brought low in ostentatious manner, the inspiration or strategy they once provided severed at a stroke.",
          body: `Overlord model only. Each time the bearer's unit destroys an enemy Character unit, your opponent loses 1CP if they have any.`,
        },
        {
          name: 'Unflinching Will',
          points: 20,
          flavor: 'With sheer will this noble drives their warriors into battle against the most malevolent foes. Not from pretenders to nobility, nor marauding beasts, nor titanic machineries will this noble turn; they have faced greater horrors during their long existence.',
          body: `Overlord model only. The bearer's melee weapons have the [PRECISION] and [ANTI-INFANTRY 5+] abilities.`,
        },
        {
          name: 'Warrior Noble',
          points: 15,
          flavor: 'This dynastic scion is an expert in the arts of martial excellence, and their living metal form has been enhanced by their Crypteks. With effortless arrogance, they and their guardians parry or contemptuously swat aside the strikes of those they see as their lessers.',
          body: `Overlord model only. Each time a melee attack targets the bearer's unit, subtract 1 from the Hit roll.`,
        },
        {
          name: 'Eternal Conqueror',
          points: 25,
          flavor: 'This insatiable subjugator sees all before them as theirs for the taking by ancient right of conquest. They wield their legion like an iron gauntlet, using it to seize the battlefield in a demonstration of their power and strength, daring others to try taking it from them.',
          body: `Overlord model only. Each time a model in the bearer's unit makes an attack that targets an enemy unit within range of an objective marker, you can re-roll the Hit roll.`,
        },
      ],
    },

    // ───────────────────────── FACTION PACK DETACHMENTS ─────────────────────────
    {
      id: 'hand-of-the-dynasty',
      name: 'Hand of the Dynasty',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Take and Hold',
      unique: 'DYNASTY',
      rule: {
        name: 'Hypermotility Protocols',
        flavor:
          'Command protocols and neural impulses flood the mechanical bodies of these android warriors, lending them greater speed of thought and movement.',
        body: `▪ Friendly Immortals/Necron Warriors units' ranged attacks have [ASSAULT].
▪ When a friendly Immortals/Necron Warriors unit is selected to make an advance move, that move does not prevent that unit from being eligible to start an action.

This detachment has the Dynasty tag and cannot be taken with another Dynasty detachment.`,
      },
      stratagems: [
        {
          name: 'Dominance Protocols',
          sublabel: 'Hand of the Dynasty – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Simple and inescapable directives compel these Immortals to seize strategically vital battlefield sites and fight with redoubled fury to defend them from the foe.',
          when: 'Command phase.',
          target: 'One friendly Immortals unit.',
          effect: 'Your unit has +1 OC until the end of the turn.',
          restrictions: '',
        },
        {
          name: 'Will of the Conqueror',
          sublabel: 'Hand of the Dynasty – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Moved like playing pieces by the irresistible will of their noble masters, the Necron soldiery rapidly secured ever more dynastic territory.',
          when: 'End of your Movement phase.',
          target: 'One friendly Immortals/Necron Warriors unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Nanosaturation',
          sublabel: 'Hand of the Dynasty – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'In response to enemy threats, these Necron footsoldiers unseal canoptek urns and unleash a localised nanoscarab plague to saturate the site they are holding.',
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly Immortals/Necron Warriors unit has shot.",
          target: 'That Immortals/Necron Warriors unit.',
          effect: 'Your unit shoots using snap shooting, but while doing so your unit can only target that enemy unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Enlivened Sentinels',
          points: 20,
          upgrade: true,
          flavor: 'Goaded into battle by overriding imperatives, these Warriors march relentlessly out to enact the will of their masters.',
          body: `Necron Warriors unit only. This unit has Scouts 5".`,
        },
        {
          name: 'Tools of Dominion',
          points: 15,
          upgrade: true,
          flavor: 'Nobles are not above expending additional resources to improve the armaments of their more valuable soldiery.',
          body: `Immortals unit only. This unit's ranged attacks have [RAPID FIRE 1].`,
        },
      ],
    },

    {
      id: 'skyshroud-spearhead',
      name: 'Skyshroud Spearhead',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Transdimensional Deployment',
        flavor:
          'Transported to the battlefield via dimension-shifting technologies, Tomb Blades materialise in crackling fields of energy and strafe unprepared targets, often to devastating effect.',
        body: `▪ Friendly Tomb Blades units have Deep Strike.
▪ When a friendly Tomb Blades unit is selected to shoot, if that unit made an ingress move this turn, that unit's ranged attacks have +1 to hit rolls.`,
      },
      stratagems: [
        {
          name: 'Omnilocked Strafing',
          sublabel: 'Skyshroud Spearhead – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Once their targeting imperatives are locked in place, these hurtling Necron killers keep hammering their targets with fire even as they spiral and swoop back and forth across the enemy lines.',
          when: 'Your Movement phase, when a friendly Necrons Mounted unit is selected to make a fall-back move.',
          target: 'That Necrons Mounted unit.',
          effect: 'That move does not prevent your unit from being eligible to shoot.',
          restrictions: '',
        },
        {
          name: 'Swift as Death',
          sublabel: 'Skyshroud Spearhead – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Reacting with android hyperresponsiveness, these skimmer Necrons fire thrusters and surge across the battlefield.',
          when: "Your opponent's Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Necrons Mounted unit.",
          target: 'That Necrons Mounted unit.',
          effect: 'Your unit can make a normal move of up to D3+3".',
          restrictions: '',
        },
        {
          name: 'Evasive Protocols',
          sublabel: 'Skyshroud Spearhead – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'So rapidly and seemingly randomly does this skyborne unit jink through incoming fire that it is almost impossible for foes to land a solid direct hit.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Necrons Mounted unit.",
          target: 'That Necrons Mounted unit.',
          effect: "Ranged attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Recursive Reanimation',
          points: 5,
          upgrade: true,
          flavor: 'Ancillary reclamators capture the molecular matter of these Tomb Blades even as it is blasted apart, drawing it in a swirling comet trail behind them and working it back into their physical forms.',
          body: `Tomb Blades unit only. When this unit activates its Reanimation Protocols, +1 to the roll.`,
        },
        {
          name: 'Deepening Madness',
          points: 20,
          upgrade: true,
          flavor: "Like some echo of the Nekrosor's own murder-madness, a coldly efficient killfrenzy grips these Lokhust Destroyers so that — even as they streak into battle — they lay down one ferocious volley of fire after another.",
          body: `Destroyer Cult Mounted unit only. This unit's ranged attacks have [ASSAULT].`,
        },
      ],
    },

    {
      id: 'the-phaerons-armoury',
      name: "The Phaeron's Armoury",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      unique: 'HYPERCRYPT',
      rule: {
        name: 'Empowered Engines',
        flavor:
          'When a Necron ruler unleashes the mightiest war engines from amongst their armoury, they may charge their finest Crypteks to enhance them first.',
        body: `Friendly Necrons Titanic Fly units have +6" M.

This detachment has the Hypercrypt tag and cannot be taken with another Hypercrypt detachment.`,
      },
      stratagems: [
        {
          name: 'Subsurface Quantumweave',
          sublabel: "The Phaeron's Armoury – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: "The layers of this war machine's armour are interspersed with molecule-thin webs of additional quantum shielding to absorb and localise impacts.",
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Necrons Titanic Fly unit.",
          target: 'That Necrons Titanic Fly unit.',
          effect: 'Attacks that target your unit have -1 AP until that enemy unit has attacked.',
          restrictions: '',
        },
        {
          name: 'Particle Pulse',
          sublabel: "The Phaeron's Armoury – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: "From the war machine's pinnacle rolls an expanding wave of invisible particles that paints the foe in sharp relief upon Necron targeting systems.",
          when: 'Start of your Shooting phase.',
          target: 'One friendly Necrons Titanic Fly unit.',
          effect: 'Select one visible enemy unit within 12" of your unit. That enemy unit has +3" detection range.',
          restrictions: '',
        },
        {
          name: 'Cosmic Storm',
          sublabel: "The Phaeron's Armoury – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Transdimensional conduits harvest esoteric energy from coronal stellar scoops, beaming its coruscating fury into capacitor channels within this war engine, thence into the enemy lines in vivid arcs.',
          when: 'Your Shooting phase, when a friendly Obelisk/Tesseract Vault unit is selected to shoot.',
          target: 'That Obelisk/Tesseract Vault unit.',
          effect: "Your unit's Tesla Sphere weapons have +1 AP.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Prelocational Optimiser',
          points: 25,
          flavor: "Subtle transplanar optics allow this war leader to peer through the energy veil of a Monolith's eternity gate and dissect the defences and weaknesses of the enemies beyond it. This ensures their emergence from the portal is as grandly bloody and spectacular as possible.",
          body: `Necrons model only. When this unit is selected to shoot, if this unit was set up using a Monolith's Eternity Gate ability this turn, this unit's ranged attacks have [LETHAL HITS], or [SUSTAINED HITS 1].`,
        },
        {
          name: 'Mortality Shroud',
          points: 10,
          aura: true,
          upgrade: true,
          flavor: 'Projecting a subtly tailored weave of spiritual entropy fields, antiphotons and infrasonic oppression waves, this war engine projects a sense of ominous dread and impending death like a shadow before it.',
          body: `Obelisk unit only. In your opponent's Battle-shock step, if an enemy unit within 8" of this unit is below starting strength, that enemy unit makes a battle-shock roll.`,
        },
      ],
    },

    {
      id: 'starshatter-arsenal',
      name: 'Starshatter Arsenal',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Relentless Onslaught',
        flavor:
          'The Necrons possess countless terrifying engines of war. When mustered in great number, these instruments of annihilation sweep across the battlefield, seeking to reclaim lost realms and obliterate any foolish enough to trespass upon the territories of their ancient dynasty.',
        body: `Each time a Necrons model (excluding Monster models) from your army makes an attack that targets a unit within range of one or more objective markers, add 1 to the Hit roll. In addition, ranged weapons equipped by Necrons Vehicle and Necrons Mounted models (excluding Titanic models) from your army have the [ASSAULT] ability.`,
      },
      stratagems: [
        {
          name: 'Merciless Reclamation',
          sublabel: 'Starshatter Arsenal – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'The Necrons are driven to reclaim what is theirs, exterminating all who would impede such efforts without mercy.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Necrons unit (excluding Monster and Titanic units) from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, if the target of that attack is within range of one or more objective markers, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Unyielding Forms',
          sublabel: 'Starshatter Arsenal – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'Wrought from living metal and further protected by the arcane technologies of Crypteks, the forms of Necron vehicles and steeds are almost impervious to conventional weapons.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Necrons Vehicle or Necrons Mounted unit (excluding Titanic units) from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets a model in your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Chronoshift',
          sublabel: 'Starshatter Arsenal – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The time-bending technologies in the nobility's powerful vehicles allow them to traverse the battlefield in stuttering bursts of hypervelocity.",
          when: 'Your Movement phase.',
          target: 'One Necrons Vehicle or Necrons Mounted unit (excluding Titanic units) from your army that has not been selected to move this phase.',
          effect: 'Until the end of the phase, if your unit Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 6" to the Move characteristic of models in your unit.',
          restrictions: '',
        },
        {
          name: 'Dimensional Tunnel',
          sublabel: 'Starshatter Arsenal – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Using phase-shifting technology, Necron war engines can slip into alternate dimensions, leaving only ghostly traces as they move through solid matter.',
          when: 'Your Movement phase.',
          target: 'One Necrons Vehicle or Necrons Mounted unit (excluding Titanic units) from your army.',
          effect: 'Until the end of the phase, models in your unit can move horizontally through models and terrain features.',
          restrictions: '',
        },
        {
          name: 'Endless Servitude',
          sublabel: 'Starshatter Arsenal – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Should the unclean thralls of lesser species threaten dynastic territories, the fallen Necron soldiery will rise to repel the interlopers.',
          when: 'End of your Fight phase.',
          target: 'One Necrons unit (excluding Monster and Titanic units) from your army that is within range of one or more objective markers you control.',
          effect: "Your unit's Reanimation Protocols activate.",
          restrictions: '',
        },
        {
          name: 'Reactive Reposition',
          sublabel: 'Starshatter Arsenal – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Subroutines buried deep within the neural networks of Necron soldiers and crews enable them to react instantaneously to targeting locks, repositioning themselves to evade incoming fire or close in upon the foe.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Necrons unit from your army (excluding Monster and Titanic units) that was the target of one or more of the attacking unit's attacks.",
          effect: 'Your unit can make a Normal move of up to D6".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Dread Majesty',
          points: 30,
          aura: true,
          flavor: "When this noble unleashes the might of their cosmic armoury, their followers are left in no doubt as to the importance of the battle at hand. If they do not strive to live up to the lethal effectiveness of the dynasty's war engines, their Overlord's wrath will be terrible.",
          body: `Overlord or Catacomb Command Barge model only. While a friendly Necrons unit (excluding Monster and Titanic units) is within 6" of the bearer, each time a model in that unit makes an attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.`,
        },
        {
          name: 'Miniaturised Nebuloscope',
          points: 15,
          flavor: "Feeding vampirically on datastreams from the dynasty's war engines, this device enables its owner to track enemies through multiple dimensions, leaving them no hiding place.",
          body: `Necrons model only. Ranged weapons equipped by models in the bearer's unit have the [IGNORES COVER] ability.`,
        },
        {
          name: 'Demanding Leader',
          points: 10,
          flavor: 'This Necron noble is a master of rapid warfare, commanding armoured columns with great precision.',
          body: `Necrons model only. In your Command phase, select one friendly Necrons Vehicle or Necrons Mounted unit (excluding Titanic units) within 6" of the bearer. Until the start of your next Command phase, that unit is eligible to shoot in a turn in which it Fell Back.`,
        },
        {
          name: 'Chrono-impedance Fields',
          points: 25,
          flavor: 'When activated, this device wreathes dynastic craft in a time-dilation field that reduces the force of incoming blows and shots.',
          body: `Necrons model only. In your Command phase, select one friendly Necrons Vehicle or Necrons Mounted unit (excluding Titanic units) within 6" of the bearer. Until the start of your next Command phase, each time an attack is allocated to a model in that unit, subtract 1 from the Damage characteristic of that attack.`,
        },
      ],
    },

    {
      id: 'cryptek-conclave',
      name: 'Cryptek Conclave',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Techno-sorcerous Augmentations',
        flavor:
          "Whether building on one anothers' shared results or vying to produce the most ingenious adaptations, the Crypteks treat the battlefield as an opportunity to test their latest scientific and technological breakthroughs.",
        body: `▪ Ranged weapons equipped by Cryptek models from your army have the [ASSAULT] ability.
▪ In your Shooting phase, each time a Cryptek unit from your army is selected to shoot, select one of the following abilities: [ANTI-INFANTRY 3+], [ANTI-MOUNTED 4+], [ASSAULT], [HEAVY], [IGNORES COVER]. Until the end of the phase, ranged weapons equipped by models in that unit have that ability.`,
      },
      stratagems: [
        {
          name: 'Molecular Targeting',
          sublabel: 'Cryptek Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Targeting analysis of the targets' molecular makeup allows all attempts at shielding or obfuscation to be bypassed with contemptuous ease.",
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Necrons unit from your army that has not been selected to shoot or fight this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes an attack, you can ignore any or all modifiers to the following: that attack's Ballistic Skill or Weapon Skill characteristic; the Hit roll. If your unit has the Cryptek keyword, you can also ignore any or all modifiers to the Wound roll.",
          restrictions: '',
        },
        {
          name: 'Microscarab Swarm',
          sublabel: 'Cryptek Conclave – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'This thrumming cloud of minute nanoscarabs whirls around the Necrons, affecting instantaneous repairs.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Cryptek Infantry unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'If your unit has the Necron Warriors keyword, until the end of the phase, models in your unit have a 5+ invulnerable save. If your unit has the Immortals keyword, until the end of the phase, models in your unit have a 4+ invulnerable save.',
          restrictions: '',
        },
        {
          name: 'Animus Curse',
          sublabel: 'Cryptek Conclave – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "A portion of the Cryptek's animus clings to the battlefield just long enough to possess their servants and use them to exact revenge.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has shot or fought.",
          target: "One Cryptek model from your army that was destroyed by one of the attacking unit's attacks. You can use this Stratagem on that model even though it was just destroyed.",
          effect: 'Until the end of the battle, each time a friendly Necrons model makes an attack that targets the attacking unit, you can re-roll the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Synergistic Empowerment',
          sublabel: 'Cryptek Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Quantum reservoirs of potent energies held within this Cryptek's warrior jewellery release a fragment of their charge to augment nearby Necron forces.",
          when: 'Start of your Shooting phase.',
          target: 'One Cryptek unit from your army.',
          effect: 'Select one friendly Necrons model (excluding Monsters and Vehicles) within 12" of a Cryptek model in your unit. Until the end of the phase, that friendly Necrons model has the Cryptek keyword.',
          restrictions: '',
        },
        {
          name: 'Untapped Power',
          sublabel: 'Cryptek Conclave – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Accessing previously undreamed of skeins of cosmic power, the Cryptek unleashes terrible destructive energies onto the battlefield.',
          when: 'Your Shooting phase.',
          target: 'One Cryptek unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, each time your unit is selected to shoot, when selecting an ability for the Techno-sorcerous Augmentations Detachment rule, you can select one additional ability from those available.',
          restrictions: '',
        },
        {
          name: 'Potentiality Syphon',
          sublabel: 'Cryptek Conclave – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Drawing upon the accumulated precausal potential energies that coalesce around significant locations, the conclave are able to steal that power and use it to trigger the unrealized probable remanifestation matrices of their own forces.',
          when: "Your opponent's Command phase.",
          target: 'One Necrons unit from your army within range of one or more objective markers.',
          effect: "Your unit's Reanimation Protocols activate. If it is a Cryptek unit, it reanimates an additional 1 wound.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Quantum Abacus',
          points: 15,
          flavor: 'This cloud-like familiar of fractal computational electrons possesses a cogitational intellect that, when fed raw data, produces inspired strategic guidance.',
          body: `Necrons model only. Each time you select the bearer's unit as the target of a Stratagem, roll one D6, adding 1 if it is within range of one or more objectives: on a 4+, you gain 1CP.`,
        },
        {
          name: 'Atomic Disintegrators',
          points: 10,
          flavor: 'Energy lenses project in a web from a central node borne by the Cryptek, coalescing about Necron weapon systems and focusing their power still further.',
          body: `Cryptek model only. In your Shooting phase, each time the bearer's unit is selected to shoot, when selecting an ability for the Technosorcerous Augmentations Detachment rule, you can also select from the following abilities: [ANTI-MONSTER 5+], [ANTI-VEHICLE 5+].`,
        },
        {
          name: 'Gauntlet of Compression',
          points: 20,
          flavor: "Clinging to the bearer's hand like a glove woven from shadow, this strange device folds space-time with a single gesture, momentarily compressing the relative distance between Necron weapons and their targets.",
          body: `Necrons model only. Add 6" to the Range characteristic of ranged weapons equipped by models in the bearer's unit.`,
        },
        {
          name: 'Gravitic Bolas',
          points: 15,
          flavor: "Projected from the bearer's staff as a secondary energistic emission, these solid-state electro-shackles bind and trammel their victims in crackling fetters.",
          body: `Cryptek model only. In your Shooting phase, after the bearer has shot, select one enemy unit hit by one or more of those attacks (excluding Titanic units); until the start of your next turn, that enemy unit is pinned. While a unit is pinned, subtract 2 from that unit's Move characteristic and subtract 2 from Charge rolls made for that unit.`,
        },
      ],
    },

    {
      id: 'cursed-legion',
      name: 'Cursed Legion',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Cold Fervour',
        flavor:
          'The fury of the Destroyers and — by extension — of the cursed legion is not a wild or reckless thing. It is rather a ruthlessly methodical annihilation of the enemy, in which the Destroyers take the lead while ripples of their strange madness roll out to infect nearby Necrons and goad them, too, to greater efforts of tireless murder.',
        body: `▪ Add 2 to the Strength characteristic of weapons equipped by Destroyer Cult models from your army.
▪ The first time each turn that a Destroyer Cult unit from your army makes attacks that destroy a unit or cause it to become Below Half-strength, after that unit has finished resolving its attacks, until the end of the turn, add 2 to the Strength characteristic of weapons equipped by friendly Necrons models (excluding Destroyer Cult, Monster and Titanic models).`,
      },
      stratagems: [
        {
          name: 'Methodical Murder',
          sublabel: 'Cursed Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'In the grip of the Destroyer madness, these Necrons strike and slay with inhuman speed and efficiency.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Necrons unit (excluding Monsters and Vehicles) from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability.',
          restrictions: '',
        },
        {
          name: 'Image of Death',
          sublabel: 'Cursed Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Confronted with these android spectres of terminal mortality, even the most courageous enemies find their aim wavering and their limbs shaking.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Destroyer Cult unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Mortis Protocols',
          sublabel: 'Cursed Legion – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'In the absolute destruction of their enemies, the corrupted Necrons find fresh purpose and a macabre simulacrum of new life.',
          when: 'Your Shooting phase or the Fight phase, just after the first time a Destroyer Cult unit from your army destroys an enemy unit this turn.',
          target: 'One friendly Necrons unit (excluding Monsters and Vehicles) within 9" of that Destroyer Cult unit.',
          effect: "The friendly unit's Reanimation Protocols activate.",
          restrictions: '',
        },
        {
          name: 'Driven to Butchery',
          sublabel: 'Cursed Legion – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The murderous goad of the Destroyer madness pushes these android killers to seemingly impossible efforts to get to grips with the foe.',
          when: 'Your Shooting phase or your Charge phase.',
          target: 'One Destroyer Cult unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced.',
          restrictions: 'You can only use this Stratagem once per turn.',
        },
        {
          name: 'Spreading Madness',
          sublabel: 'Cursed Legion – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'It is as though witnessing other Necrons engaged in acts of merciless butchery stokes the Destroyer madness in their fellows.',
          when: 'Your Charge phase.',
          target: 'One Necrons unit (excluding Monsters and Vehicles) from your army that has not declared a charge this phase.',
          effect: 'Until the end of the phase, each time your unit declares a charge, if one or more targets of that charge are within Engagement Range of one or more friendly units, add 2 to the Charge roll.',
          restrictions: '',
        },
        {
          name: 'Unnatural Aggression',
          sublabel: 'Cursed Legion – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'The android soldiery of the cursed legion are maddened with the desire to engage and slay their victims at close quarters.',
          when: "End of your opponent's Charge phase.",
          target: 'One Necrons unit (excluding Monsters and Vehicles) from your army that is within 6" of one or more enemy units and would be eligible to declare a charge against one or more of those enemy units if it were your Charge phase.',
          effect: 'Your unit now declares a charge that only targets one or more of those enemy units, and you resolve that charge. Note that even if this charge is successful, your unit does not receive any Charge bonus this turn.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Destroyer Ankh',
          points: 20,
          flavor: 'Though it resembles a typical ankh, this chest piece fills its host with an insatiable need to exterminate the foe.',
          body: `Catacomb Command Barge or Overlord model only. The bearer has the Destroyer Cult keyword. Add 2" to the Move characteristic of models in the bearer's unit and add 2 to the Attacks characteristic of melee weapons equipped by the bearer.`,
        },
        {
          name: 'Murdermind',
          points: 15,
          flavor: "Consumed by the Destroyer madness, this Cryptek's powerful intellect is turned entirely toward killing.",
          body: `Cryptek model only. The bearer has the DESTROYER CULT keyword. Add 3" to the Move characteristic of the bearer.`,
        },
        {
          name: 'Mark of the Nekrosor',
          points: 20,
          flavor: 'The malevolent madness of Ammentar itself burns in the minds of this warrior and their comrades.',
          body: `Destroyer Cult model only. Each time a model in the bearer's unit makes an attack, add 1 to the Hit roll.`,
        },
        {
          name: 'Cursed Circlet',
          points: 25,
          flavor: "This band of living metal sinks into the bearer's brow and floods their neural cortex with a murderous urge.",
          body: `Destroyer Cult model only. In your opponent's Shooting phase, when an enemy unit has shot, if a model in this unit was destroyed by those attacks, this unit can make a surge move of up to D6".`,
        },
      ],
    },

    {
      id: 'pantheon-of-woe',
      name: 'Pantheon of Woe',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Cosmic Distortion',
        flavor:
          "To unleash such a power is a strategy of last resort for most Necrons, for it sees multiple C'tan shards released from tesseract oubliettes and hurled into the heart of the foe. The quantum dissonance and molecular erosion caused by multiple C'tan shards in close proximity is enough to fray the very physical being of the foe at an atomic level.",
        body: `Necrons Monster units from your army have the following ability:

Distortion Fields (Aura): While an enemy unit is within 6" of this unit, it is unravelling. While an enemy unit is unravelling, each time an attack targets that unit, improve the Armour Penetration characteristic of that attack by 1.

At the start of each phase, for each Necrons Monster unit from your army, that unit can suffer 3 mortal wounds. If it does, until the end of the phase, the range of that unit's Distortion Fields Aura ability is increased to 9".

Designer's Note: If your army contains more than one Transcendent C'tan unit, each of those units must take the Reletavistic Tether ability.

When mustering your army, each Necrons Monster unit from your army has the relevant Necrodermal Binding ability shown below, and you must increase the points cost of each of those units by the amount shown in the Munitorum Field Manual. If this causes your army to exceed the points limit for the battle you are playing, you cannot include that unit in your army.`,
      },
      stratagems: [
        {
          name: 'Disharmonisation Cascade',
          sublabel: 'Pantheon of Woe – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Tear one shard suddenly from the complex web of atomic resonances and its severing triggers a violent energistic dissonance blast.',
          when: 'Any phase, just after a Necrons Monster model from your army is destroyed, before making its Deadly Demise roll.',
          target: 'That Necrons Monster model. You can use this Stratagem on that model even though it was just destroyed.',
          effect: "Until the end of the phase, your model's Deadly Demise ability inflicts mortal wounds on a D6 roll of 3+ instead of on a 6.",
          restrictions: '',
        },
        {
          name: 'Molecular Erosion',
          sublabel: 'Pantheon of Woe – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Those without the will to hold themselves together start to physically tatter apart in a molecular haze in the presence of so many god shards.',
          when: 'Command phase.',
          target: 'One Necrons Monster unit from your army.',
          effect: 'Select one unravelling enemy unit visible to your unit. That enemy unit must take a Battle-shock test. When doing so, subtract 1 from the result. If that test is failed, that enemy unit suffers D3+1 mortal wounds.',
          restrictions: 'You can only use this Stratagem once per battle round.',
        },
        {
          name: 'Mass Transmogrification',
          sublabel: 'Pantheon of Woe – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The power of the C'tan rips the foe's greatest assets apart and forcibly reknits nearby Necron soldiery using the stolen corporeal matter.",
          when: 'Your Shooting phase or the Fight phase, just after a Necrons Monster unit from your army destroys an enemy unit.',
          target: 'One friendly Necrons unit (excluding Monsters) within 6" of that Monster unit.',
          effect: "If that enemy unit was unravelling at the start of the phase, your friendly unit's Reanimation Protocols activate.",
          restrictions: 'You can only use this Stratagem once per turn.',
        },
        {
          name: 'Entrophasic Aura Targeting',
          sublabel: 'Pantheon of Woe – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Necrons' android senses can target the foe by reading the exotic radiation signatures wreathed about them by the C'tan shards' onslaught.",
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Necrons unit (excluding Monsters) from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit, re-roll a Hit roll of 1. If the target of that attack is unravelling, re-roll a Wound roll of 1 as well.',
          restrictions: '',
        },
        {
          name: 'Chronodistortion',
          sublabel: 'Pantheon of Woe – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With the battlefield shuddering in and out of sync with time and space, slain Necrons still strike at their enemies through cracks in temporal causality.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Necrons unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 if the attacking unit is unravelling: on a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Phase Melding',
          sublabel: 'Pantheon of Woe – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The very stuff of reality flows together at an atomic level, and the foe find to their horror that they are literally — and gruesomely — rooted to the spot.',
          when: "Your opponent's Movement phase, when an unravelling enemy unit is selected to Fall Back.",
          target: 'One Necrons unit from your army that is within Engagement Range of that enemy unit.',
          effect: 'When that enemy unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Singularity Matrix',
          points: 45,
          binding: true,
          flavor: "This eldritch device fetters and directs the Deceiver's powers within a vortex that devours lesser wits entirely.",
          body: `C'tan Shard of the Deceiver model only. This model has the following ability: Lord of Deceit (Aura): Once per turn, when your opponent targets a unit from their army within 12" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP.`,
        },
        {
          name: 'Quantum Goad',
          points: 45,
          binding: true,
          flavor: 'The energies of this binding latch onto enemy targets and shunt the shard into alignment with them.',
          body: `C'tan Shard of the Nightbringer model only. This model is eligible to declare a charge in a turn in which it Advanced.`,
        },
        {
          name: 'Animus Damper',
          points: 35,
          binding: true,
          flavor: "This device bleeds off the Void Dragon shard's energies and earths them violently through nearby machines.",
          body: `C'tan Shard of the Void Dragon model only. Once per turn, at the start of your opponent's Shooting phase, select one enemy Vehicle unit visible to the bearer. That unit must take a Leadership test. Until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll and, if that Leadership test was failed, subtract 1 from the Wound roll as well.`,
        },
        {
          name: 'Reletavistic Tether',
          points: 40,
          binding: true,
          flavor: 'This binding uses atomic resonance magnetism to compel the shard into the midst of the foe.',
          body: `TRANSCENDENT C'TAN model only. In your turn, when this unit makes an ingress/advance move using its Transdimensional Displacement ability, this unit can end that move more than 6" horizontally from all enemy units (instead of more than 8"). When this unit ends that move within 8" of an enemy unit, this unit is not eligible to declare a charge until the end of the turn.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const necrons = { en, ru: en }
