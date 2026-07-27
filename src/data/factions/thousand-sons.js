// Thousand Sons — faction rules. Resolved from the same source priority as the other
// factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex >
// Index.
//
//   Codex: Thousand Sons (sources/codex/chaos/10ed_Codex-TS_2025.pdf — image-only PDF,
//     transcribed from page renders p67–77) → army rule (Cabal of Sorcerers + Rituals) +
//     5 base detachments (Grand Coven, Changehost of Deceit, Warpmeld Pact, Rubricae
//     Phalanx, Warpforged Cabal).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/chaos/TS.pdf) → 4 extra detachments
//     (Ritual of Regeneration, Sekhetar Cohort, Servants of Change, Hexwarp Thrallband) +
//     Rules Updates.
//   MFM (src/data/mfm/thousand-sons.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the MUTANT `unique` tag.
//
// 9 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been folded
// into the army rule / codex detachment rules / stratagems (they are the authoritative
// newer wording) — see inline notes. Warpmeld Pact + Servants of Change carry the MUTANT
// tag (mutually exclusive; `unique` field).
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions);
// swap in a translated object later. Markup follows useRenderInline / RuleBlock /
// StratCard conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ `
// bullet lines, `### ` subheadings. Datasheets are a later pass (`datasheets`).

const en = {
  slug: 'thousand-sons',
  name: 'Thousand Sons',

  // Cabal of Sorcerers — the army rule plus the four Rituals (with Warp Charge values).
  // Faction-Pack Rules Update reworded the opening ("attempted to manifest") and the
  // Destiny's Ruin / Temporal Surge / Twist of Fate Rituals (now also affect Scintillating
  // Legions models). Doombolt is unchanged.
  armyRule: {
    id: 'cabal-of-sorcerers',
    name: 'Cabal of Sorcerers',
    flavor:
      'The Thousand Sons are wreathed in the energies of the Warp. It is the gift of their sorcerous leaders to channel this power through battlefield ritual, to divine forbidden knowledge, to weave illusory magicks or to ravage their foes with empyric fire and mutation.',
    body: `If your Army Faction is Thousand Sons, at the start of your Shooting phase, one or more models from your army with this ability can attempt Rituals from those listed below. To do so, select one model from your army with this ability that has not yet attempted a Ritual this turn and select one Ritual no model from your army has attempted to manifest this turn, then take a Psychic test for that model by following the sequence below.

**Psychic Test Sequence:** Roll 2D6. (Optional — Channel the Warp: add one D6; then, if one or more doubles or triples were rolled during this test, that model's unit suffers D3 mortal wounds.) If that model is not destroyed, the combined total of all the dice rolled during this test is the Psychic test result. If this equals or exceeds the Warp Charge value of the Ritual being attempted, that model manifests that Ritual and you resolve its effects.

### Destiny's Ruin (Psychic) — Warp Charge 5
Select one enemy unit within 24" of and visible to the manifesting model. Until the end of the phase, each time a Thousand Sons or Scintillating Legions model from your army makes an attack that targets that unit, re-roll a Hit roll of 1. If the Psychic test result for this Ritual was 10+, you can re-roll the Hit roll instead.

### Temporal Surge (Psychic) — Warp Charge 6
Select one friendly Thousand Sons or Scintillating Legions unit that is not within Engagement Range of one or more enemy units and is within 24" of and visible to the manifesting model. That unit can make a Normal move of up to D6". If the Psychic test result for this Ritual was 10+, that unit can make a Normal move of up to 6" instead. In either case, until the end of the turn, that unit is not eligible to declare a charge.

### Doombolt (Psychic) — Warp Charge 7
Select one enemy unit within 24" of and visible to the manifesting model (excluding units with the Lone Operative ability that are not part of an Attached unit and are not within 12" of the manifesting model); that unit suffers D3 mortal wounds. If the Psychic test result for this Ritual was 11+, that unit suffers D3+3 mortal wounds instead.

### Twist of Fate (Psychic) — Warp Charge 9
Select one enemy unit within 24" of and visible to the manifesting model. Until the end of the phase, each time a Thousand Sons or Scintillating Legions model from your army makes an attack that targets that unit, improve the Armour Penetration characteristic of that attack by 1. If the Psychic test result for this Ritual was 12+, improve the Armour Penetration characteristic of that attack by 2 instead.

**Pact of Sorcery:** When mustering your army, unless specifically stated otherwise, you cannot select Scintillating Legions as your Army Faction.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'grand-coven',
      name: 'Grand Coven',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Kindred Sorcery',
        flavor:
          'For an instant, the chanting voices of the Thousand Sons achieve eerie synchronisation. Their words of malign incantation roll out like the peal of some cursed bell amidst the Empyrean to signal the onset of the next fateful tide of ritual power.',
        body: `In your Command phase, you can select one of the abilities listed below to take effect until the start of your next Command phase. You can only select each of these abilities once per battle.
▪ **Imbued Manifestation:** Add 6" to the Range characteristic of ranged Psychic weapons equipped by Thousand Sons models from your army.
▪ **Psychic Maelstrom:** Each time a Thousand Sons model from your army makes an attack with a Psychic weapon, add 1 to the Wound roll.
▪ **Wrath of the Immaterium:** Psychic weapons equipped by Thousand Sons models from your army have the [DEVASTATING WOUNDS] ability.`,
      },
      stratagems: [
        {
          name: 'Psychic Dominion',
          sublabel: 'Grand Coven – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "To pit one's psychic prowess against the sorcerous might of the Thousand Sons is to be trapped, helpless and screaming, within one's mind.",
          when: 'Any phase, just after an enemy unit has selected its targets.',
          target: "One Thousand Sons unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, all attacks made against your unit with Psychic weapons have the [HAZARDOUS] ability and all models in your unit have the Feel No Pain 4+ ability against Psychic Attacks.',
          restrictions: '',
        },
        {
          name: 'Desecration of Worlds',
          sublabel: 'Grand Coven – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Sorcerers of the Thousand Sons pour their corrupting spite and contempt into the bedrock of the battlefield, tainting it with their warpcraft.',
          when: 'Your Command phase.',
          target: 'One Thousand Sons Psyker unit from your army within range of an objective marker you control.',
          effect: "That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Destined by Fate',
          sublabel: 'Grand Coven – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The Architect of Fate has great designs for his pawns, which do not yet include their untimely demise.',
          when: 'Any phase, just after a saving throw is failed for a Thousand Sons Psyker model from your army. If you are using fast dice rolling, this Stratagem can still be used after rolling multiple saving throws at once.',
          target: 'That Psyker model.',
          effect: 'Change the Damage characteristic of that attack to 0. If you are using fast dice rolling, select one of those attacks you failed a saving throw for.',
          restrictions: '',
        },
        {
          name: 'Arcane Focus',
          sublabel: 'Grand Coven – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Using a locus formed from the ritually broken matter of sorcerous artefacts, a Sorcerer can infuse themselves with its power. So invigorated, their empyrically fuelled manipulations are made all the more potent.',
          when: 'Your Shooting phase, just after you take a Psychic test for a Thousand Sons model from your army that Channelled the Warp (before resolving that Ritual).',
          target: 'That Thousand Sons model.',
          effect: 'Re-roll all of the D6 rolled for that Psychic test (including the additional D6 for Channelling the Warp).',
          restrictions: '',
        },
        {
          name: 'Egotistical Power',
          sublabel: 'Grand Coven – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Drawing on the accumulating empyric energies, one devoted to Tzeentch will willingly syphon the swelling power to fuel their selfish ploys.',
          when: 'Your Command phase.',
          target: 'One Thousand Sons Psyker unit from your army.',
          effect: 'Select the Imbued Manifestation, Psychic Maelstrom or Wrath of the Immaterium ability (see Kindred Sorcery). Until the start of your next Command phase, that ability applies to your unit instead of any other Kindred Sorcery ability, even if you have already selected that ability this battle.',
          restrictions: '',
        },
        {
          name: 'Devastating Sorcery',
          sublabel: 'Grand Coven – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: "The Thousand Sons' flesh seethes with raw sorcery. The sheer unstoppable might of their conjurations is such that little can prevent them from manifesting devastation when unleashed with destructive intent.",
          when: 'Your Shooting phase.',
          target: 'One Thousand Sons Psyker unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, add 9" to the Range characteristic of Psychic weapons equipped by models in your unit, and each time a model in your unit makes an attack with a Psychic weapon, you can re-roll the Hit roll and you can re-roll the Wound roll.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Lord of Forbidden Lore',
          points: 20,
          flavor: 'This Sorcerer has committed many a grimoire and unholy tome to memory, giving them unparalleled knowledge of hexes, curses and destructive rites.',
          body: `Thousand Sons model only. Each time the bearer manifests a Ritual, while resolving that Ritual, add 6" to its range.`,
        },
        {
          name: 'Incandaeum',
          points: 15,
          flavor: "This staff was fashioned from the sorcerously crystallized fires of a Tzeentchian Firelord. Roiling tides of apocalyptic flame surge constantly within Incandaeum's iron-hard prison, but only through twisted incantation can they be unleashed.",
          // Faction-Pack Rules Update reworded this enhancement ("already attempted to
          // manifest that Ritual this phase").
          body: `Exalted Sorcerer model only. Once per battle, when selecting a Ritual for the bearer to attempt, you can select Doombolt, even if a model from your army has already attempted to manifest that Ritual this phase.`,
        },
        {
          name: 'Umbralefic Crystal',
          points: 20,
          flavor: 'One in command of this powerful relic – coalesced from the cursed gloom of Mangel III – can use its energies to temporarily fold space, creating a gate of sorcerous translocation through which they can step.',
          body: `Thousand Sons model only. (Once per battle, per army) In your Command phase, if this unit is unengaged, you can use this ability. If you do:
▪ Place this unit in strategic reserves.
▪ This unit has Deep Strike until the start of your next Shooting phase.
▪ This unit must make an ingress move in your next Movement phase (including in your first turn).`,
        },
        {
          name: "Eldritch Vortex of E'Taph",
          points: 35,
          flavor: "When the insane Magister E'taph was consumed by his own ritual, his death created a semi-sentient vortex. Many have attempted to channel its power into their spells, risking E'taph's insane gaze turning on them.",
          body: `Thousand Sons model only. Add 1 to the Strength and Damage characteristics of Psychic weapons equipped by the bearer.`,
        },
      ],
    },

    {
      id: 'changehost-of-deceit',
      name: 'Changehost of Deceit',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Infernal Pacts',
        flavor:
          "The otherworldly auras of Tzeentch's daemons and the empowering arcane sigils carried by his mortal servants wear away at the fragile skein of reality.",
        body: `Scintillating Legions units from your army have the following ability:
▪ **Daemonic Illusions (Aura):** While a friendly Thousand Sons Psyker unit is within 6" of and visible to this unit, models in that unit have a 4+ invulnerable save against ranged attacks.

Thousand Sons units from your army have the following ability:
▪ **Mortal Sorcery (Aura):** While a friendly Scintillating Legions Psyker unit is within 6" of and visible to this unit, that Scintillating Legions unit has the Cabal of Sorcerers ability.

**Restrictions:** You can include Scintillating Legions units in your army, even though they do not have the Thousand Sons Faction keyword. The combined points cost of such units you can include is: Incursion — up to 500 pts; Strike Force — up to 1000 pts; Onslaught — up to 1500 pts. No Scintillating Legions models from your army can be your Warlord.`,
      },
      stratagems: [
        {
          name: 'Sulphurous Veil',
          sublabel: 'Changehost of Deceit – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Gouts of choking brimstone or arcane smog seeping from the Warp are exploited to confound the foe.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Thousand Sons or Scintillating Legions unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Fractal Disjunction',
          sublabel: 'Changehost of Deceit – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Tzeentchian daemons can twist perceptions until they seem no longer there, bending light and dissipating technological targeting scans in a dizzying, fractal puzzle.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Scintillating Legions unit from your army (excluding Monsters) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
          restrictions: '',
        },
        {
          name: 'Deceptive Glamour',
          sublabel: 'Changehost of Deceit – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: "Tendrils of phantasmal sorcery are sent to invade the minds of the Thousand Sons' foes, magnifying the infernal threat until it eclipses all others in a kaleidoscope of insanity.",
          when: 'Start of the Fight phase.',
          target: 'One Thousand Sons unit from your army.',
          effect: 'Until the end of the phase, each time an enemy model within Engagement Range of your unit selects targets for its attacks, it can only target your unit if there are no eligible Scintillating Legions targets for those attacks.',
          restrictions: '',
        },
        {
          name: 'Chronosorcerous Bleed',
          sublabel: 'Changehost of Deceit – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "By sacrificing minute slivers of the oncoming foes' lives, time can be bled into the Warp, stretching perceptions and causing sudden exhaustion.",
          // Faction-Pack Rules Update rewrote this Stratagem.
          when: "Start of your opponent's Charge phase.",
          target: 'One friendly unengaged Thousand Sons Psyker / Scintillating Legions unit.',
          effect: 'Select one visible enemy unit within 12" of your unit. When that enemy unit declares a charge, that enemy unit has -1 to charge rolls.',
          restrictions: '',
        },
        {
          name: 'Ethereal Phantasm',
          sublabel: 'Changehost of Deceit – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Semi-sentient doppelgangers stalk the battlefield, bewildering attempts to target the daemonic spawn.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update: 9" → 8".
          target: 'One Scintillating Legions unit from your army that is within 8" of that enemy unit and not within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to D6", or a Normal move of up to 6" instead if it is wholly within 6" of one or more friendly Thousand Sons units.',
          restrictions: '',
        },
        {
          name: 'Glimmershift Portal',
          sublabel: 'Changehost of Deceit – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Weaving a spell of splintering translocation, Tzeentch's daemons can prise open an unnatural pathway through the Warp.",
          when: "End of your opponent's Fight phase.",
          target: 'Up to two Scintillating Legions units from your army (excluding Monsters), or one Scintillating Legions Monster unit from your army, if all of those units are more than 3" horizontally away from all enemy units.',
          effect: 'Remove those units from the battlefield and place them into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Nethershriek Mind-Eater',
          points: 10,
          flavor: 'This occultist draws upon an eldritch contract with a daemonic gheist. The entity gleefully tears into weak wills, feasts on doubts and screams its burning laughter into the recesses of its prey\'s meagre souls.',
          body: `Thousand Sons or Lord of Change model only. At the start of your Shooting phase, select one enemy unit within 12" of and visible to the bearer. That unit must take a Battle-shock test; if that test is failed, that unit suffers 3 mortal wounds.`,
        },
        {
          name: 'Diabolic Savant',
          points: 20,
          flavor: 'By making a promise of blood and souls, this Sorcerer draws an infernal sentience near. It presses against the straining veil of reality, and from its fanged maw spill gibbered secrets of sanity-straining sorcery.',
          body: `Thousand Sons Infantry model only. While the bearer is within 6" of one or more friendly Scintillating Legions units, each time the bearer Channels the Warp, add 1 to the Psychic test result.`,
        },
        {
          name: 'Duplicitous Malediction',
          points: 15,
          flavor: 'This magisterial deceiver is capable of weaving bewitching illusions across entire battlefronts, hiding their true strength behind twisted falsehoods.',
          body: `Thousand Sons or Lord of Change model only. After both players have deployed their armies, select up to three Thousand Sons units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Tome of True Names',
          points: 20,
          flavor: 'Stolen from Imperial daemonhunters and added to over millennia, this dangerous tome can compel a host of empyric entities to shield the bearer in extremis. Once uttered, however, the names vanish.',
          body: `Thousand Sons Infantry model only. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, the bearer has a 2+ invulnerable save.`,
        },
      ],
    },

    {
      id: 'warpmeld-pact',
      name: 'Warpmeld Pact',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      unique: 'MUTANT',
      rule: {
        name: 'Warpmeld Sacrifice',
        flavor:
          "The flesh and bone of Tzeentch's malleable servants flow like molten wax when his mutative power is invoked in ritual pleas. Some, such as the devoted Tzaangors, willingly make such requests, while more mindless abominations have their pact made for them by their callous masters. No boon is without its price, however.",
        // Faction-Pack Rules Update rewrote this rule (restricted to Infantry/Mounted; mortal
        // wounds moved to the end of the phase).
        body: `Each time an enemy unit is selected to shoot or fight and one or more Tzeentch Mutant Infantry or Tzeentch Mutant Mounted units from your army are selected as a target of one or more of those attacks, each of those Tzeentch Mutant units can make a Warpmeld Sacrifice. If it does, until the end of the phase, each time an attack targets that unit, subtract 1 from the Wound roll. At the end of the phase, that Tzeentch Mutant unit suffers D3 mortal wounds.

Each time a Tzeentch Mutant Infantry or Tzeentch Mutant Mounted unit from your army is selected to shoot or fight, before selecting its targets, that unit can make a Warpmeld Sacrifice. If it does, until the end of the phase, each time a model in that unit makes an attack, add 1 to the Wound roll. At the end of the phase, that Tzeentch Mutant unit suffers D3 mortal wounds.

While a Tzaangors unit from your army is not Battle-shocked, add 1 to the Objective Control characteristic of Tzaangor models in that unit.

This detachment has the MUTANT tag and cannot be taken with another MUTANT detachment.`,
      },
      stratagems: [
        {
          name: 'Gift of Change',
          sublabel: 'Warpmeld Pact – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'For those already saturated by the coursing power of the Warp, even death is no barrier to change.',
          when: 'Any phase.',
          target: 'One Thousand Sons Character model from your army (excluding Monsters) that was just destroyed. You can use this Stratagem on that model even though it was just destroyed.',
          effect: 'At the end of the phase, add one Tzeentch Chaos Spawn unit containing one model to your army, and set it up as close as possible to where your model was destroyed and not within Engagement Range of one or more enemy units.',
          restrictions: 'You can only use this Stratagem once per battle round.',
        },
        {
          name: 'Blessed Transmutations',
          sublabel: 'Warpmeld Pact – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When Tzeentchian magicks wax strong, spirit and flesh are yoked again and again in service to the Great Sorcerer.',
          when: 'Your Command phase.',
          target: 'One Thousand Sons Psyker model from your army, and one friendly Tzaangors unit that is below its Starting Strength and within 12" of that Psyker model.',
          effect: 'Return up to D3+1 destroyed models (excluding Characters) to your Tzaangors unit.',
          restrictions: '',
        },
        {
          name: 'Warped Vicissitude',
          sublabel: 'Warpmeld Pact – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With a shrieked plea to Tzeentch, mutant flesh can flicker between insubstantial states as if not there.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Tzaangors unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, models in your unit have a 4+ invulnerable save.',
          restrictions: '',
        },
        {
          name: 'Touched by Tzeentch',
          sublabel: 'Warpmeld Pact – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The mutagenic vitality flowing through the Thousand Sons' twisted thralls can manifest in flickering bursts of supernatural speed.",
          when: 'Start of your Movement phase.',
          target: 'One Tzeentch Mutant unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot or declare a charge in a turn in which it Advanced.',
          restrictions: '',
        },
        {
          name: 'Deranged Ferocity',
          sublabel: 'Warpmeld Pact – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With insane, bestial ferocity is true change wrought.',
          when: 'Fight phase, just after a Tzeentch Mutant unit from your army is selected to fight.',
          target: 'That Tzeentch Mutant unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3", and when determining which models in it are eligible to fight, any models in it that are within 3" of one or more enemy models are eligible to fight. When resolving those attacks, such models can target one of those enemy units that is within 3" of them and within Engagement Range of their unit.',
          restrictions: '',
        },
        {
          name: 'Twisted Mirage',
          sublabel: 'Warpmeld Pact – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The very flesh of a Warpmeld Pact's mutant abominations radiates a reality-twisting aura. They may appear in one place to their foes, but things are not always as they seem.",
          when: 'Reinforcements step of your Movement phase.',
          target: 'One Tzeentch Mutant unit from your army that is arriving from Strategic Reserves this phase.',
          // Faction-Pack Rules Update: 3" → 6".
          effect: 'Your unit can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy units, or anywhere on the battlefield that is more than 8" horizontally away from all enemy units if it is a Monster unit. In either case, until the end of the turn, it is not eligible to declare a charge.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Warpmeld Dagger',
          points: 10,
          flavor: 'Sacrifice is ever at the route of infernal power, even better when bought with the grossest of betrayal.',
          body: `Tzaangor Shaman model only. Each time the bearer attempts a Ritual, just before determining the Psychic test result, the bearer can use this Enhancement. If it does, the bearer suffers D3 mortal wounds; if it is not destroyed as a result, add 1 to that Psychic test result for each of those mortal wounds suffered.`,
        },
        {
          name: 'Diamond of Distortion',
          points: 20,
          flavor: 'This precious gem is infused with a strange energy that distorts reality around the bearer, making them all but impossible to strike.',
          body: `Tzaangor Shaman model only. While the bearer is leading a unit, each time an attack targets that unit, subtract 1 from the Hit roll.`,
        },
        {
          name: 'Bray Lord',
          points: 15,
          flavor: "There are those amongst Magnus' gene-sons that revel in dominating the twisted mutants of Sortiarius, setting themselves up as demigods over their shrieking flocks.",
          body: `Sorcerer or Infernal Master model only. The bearer has the Scouts 6" ability.

In the Declare Battle Formations step, the bearer can be attached to a Tzaangors unit.`,
        },
        {
          name: 'Flowing Flesh',
          points: 10,
          flavor: "This prophet is favoured by the transmutative boon of Tzeentch's fell mutations, their body a rippling vessel of constantly reforming flesh and sinew, feather and bone.",
          body: `Tzaangor Shaman model only. The bearer has the Feel No Pain 4+ ability and a Wounds characteristic of 5.`,
        },
      ],
    },

    {
      id: 'rubricae-phalanx',
      name: 'Rubricae Phalanx',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'All Is Dust',
        flavor:
          "When gathered in significant numbers, empyric eddies gust around the eerily silent Rubricae, reinforcing the sorcerous shackles that bind their spirits to their armour. So empowered, the Thousand Sons' battle-brothers become nigh invulnerable. The rune-etched sarcophagus of their battle plate must be hacked apart piece by piece before the unquiet spirit within submits.",
        body: `Each time an attack with an unmodified Damage characteristic of 1 is allocated to a Rubricae model from your army, add 1 to any armour saving throw made against that attack.`,
      },
      stratagems: [
        {
          name: 'Ardent Automata',
          sublabel: 'Rubricae Phalanx – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The martial discipline once known amongst the Legion's fellowships has been pared back and twisted until it is another means of control, one which the Rubricae's masters use to wrong-foot their foes with sudden changes of tactics.",
          when: 'Your Movement phase, just after a Rubricae unit from your army Falls Back.',
          target: 'That Rubricae unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Revenge of the Rubricae',
          sublabel: 'Rubricae Phalanx – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Magnus' psychic scions are as vindictive as their Daemon Primarch. Many weave arcane curses and runes of spite into the eldritch armour of their guardians. Should they fall, their Rubricae unleash a vengeful doom upon the executioners.",
          when: "Your opponent's Shooting phase, just after a Thousand Sons Psyker model from your army is destroyed.",
          target: 'One Rubricae unit from your army that was within 6" of that Psyker model when it was destroyed.',
          effect: 'After the attacking unit has shot, your Rubricae unit can shoot as if it were your Shooting phase, but when resolving those attacks it can only target the enemy unit that just destroyed your Psyker model (and only if it is an eligible target).',
          restrictions: '',
        },
        {
          name: 'Inexorable Advance',
          sublabel: 'Rubricae Phalanx – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The warriors of the Thousand Sons can be driven on relentlessly while laying down a hail of weapons fire. They know no fatigue nor weakness, unable to falter even if they wished to.',
          when: 'Your Movement phase.',
          target: 'One Rubricae unit from your army.',
          effect: 'Until the end of the turn, your unit can ignore any or all modifiers to its Move characteristic and to Advance rolls made for it, and ranged weapons equipped by models in your unit have the [ASSAULT] ability.',
          restrictions: '',
        },
        {
          name: 'Implacable Guardians',
          sublabel: 'Rubricae Phalanx – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'The Rubricae are superlative, enduring guardians who can absorb great storms of fire if it means shielding their masters.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Rubric Marines Psyker unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit (excluding Psyker models), subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: 'Infernal Fusillade',
          sublabel: 'Rubricae Phalanx – Wargear Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: "Arcane invocations imbue the Thousand Sons' weapons with sorcerous power, rendering them still more lethal to the foe.",
          when: 'Your Shooting phase.',
          target: 'One Thousand Sons Psyker unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, all inferno bolt pistols, inferno boltguns, inferno combi-bolters and inferno combi-weapons equipped by models in your unit have the [PSYCHIC] ability and a Strength characteristic of 5.',
          restrictions: '',
        },
        {
          name: 'Unwavering Phalanx',
          sublabel: 'Rubricae Phalanx – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Massed in an unyielding wall of sorcerous ceramite, the sheer unnatural resilience of the Thousand Sons can withstand the most vicious assault.',
          when: "Your opponent's Charge phase, just after an enemy unit ends a Charge move.",
          target: 'One Rubric Marines unit from your army within Engagement Range of that enemy unit.',
          effect: 'Until the end of the turn, each time an attack targets your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Risen Rubricae',
          points: 30,
          flavor: 'A plan decades in the making comes to fruition as hidden, silent Rubricae emerge at a fateful hour to deliver the killing blow.',
          body: `Thousand Sons model only. At the start of the Declare Battle Formations step, select either two Rubricae Battleline units from your army or one other Rubricae unit from your army; models in the selected units have the Infiltrators ability.`,
        },
        {
          name: 'Arcane Thralls',
          points: 5,
          aura: true,
          flavor: "This Warp mage has unearthed eldritch lore by which they have mastered the means to tether the Legion's former warriors to their will with an unbreakable leash of raw sorcery.",
          body: `Thousand Sons model only. While a friendly Rubricae unit is within 9" of the bearer, you can re-roll Battle-shock tests taken for that unit.`,
        },
        {
          name: 'Lord of the Rubricae',
          points: 15,
          flavor: 'This champion draws power from the Immaterium and channels it into his Rubricae to enhance their might.',
          body: `Thousand Sons model only. While the bearer is leading a unit, each time a Rubricae model in that unit makes an attack, add 1 to the Hit roll.`,
        },
        {
          name: 'Stave Abominus',
          points: 20,
          flavor: 'This stave is a compressed and runically imprisoned Warp rift given physical form. Every blow struck with it allows clamouring tentacular horrors to lash out from beyond the veil, their ethereal fangs and lashing pseudopods wreaking bloody havoc.',
          body: `Thousand Sons Infantry model only. The bearer's melee weapons have the [SUSTAINED HITS D3] and [DEVASTATING WOUNDS] abilities.`,
        },
      ],
    },

    {
      id: 'warpforged-cabal',
      name: 'Warpforged Cabal',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Warpfire Infusion',
        flavor:
          'To the Sorcerers of Warpforged Cabals, logic cores and data-wafers, plasma cells and advanced augurs are merely matter, as subservient to their will as flesh and spirit is to others. They infuse dangerous eldritch protocols into the war engines under their command, pouring raw Warp magic into shell casings or capturing malevolent sprites within targeting cogitators, magnifying their vehicles\' power.',
        body: `Each time a Thousand Sons Vehicle unit from your army is selected to shoot or fight, apply one of the following when resolving those attacks:
▪ If that Vehicle unit is within 6" of one or more friendly Thousand Sons Psyker models, you can re-roll one Hit roll, one Wound roll and one Damage roll.
▪ Otherwise, you can re-roll one Hit roll, one Wound roll or one Damage roll.

Each time a Thousand Sons Vehicle model from your army with the Deadly Demise ability is destroyed while it is within 6" of one or more friendly Thousand Sons Psyker models, that model's Deadly Demise ability inflicts mortal wounds on a D6 roll of 5+ instead of only a 6.`,
      },
      stratagems: [
        {
          name: 'Hex-marked Armour',
          sublabel: 'Warpforged Cabal – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Amorphous runes and sigils carved into the armoured flanks of the Cabal's war engines flare with unholy power, leaching the foe's attacks of strength.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Thousand Sons Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          // Faction-Pack Rules Update reworded the Effect ("until the attacking unit has finished…").
          effect: 'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
          restrictions: '',
        },
        {
          name: 'Malevolent Animus',
          sublabel: 'Warpforged Cabal – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Whether a corrupted machine spirit or a cackling possessor daemon, the core animus of many Thousand Sons war engines seethe with a malignity that sees them unerringly strike out at prey even when critical systems are compromised.',
          when: 'Your Command phase.',
          target: 'One Thousand Sons Vehicle unit from your army within 6" of one or more friendly Thousand Sons Psyker units.',
          effect: 'Until the start of your next Command phase, your Vehicle unit is malevolent. While a unit is malevolent, it can ignore any or all modifiers to the following: the profile characteristics of its models; the Weapon Skill and Ballistic Skill characteristics of weapons equipped by its models; any roll or test made for it (excluding modifiers to saving throws).',
          restrictions: '',
        },
        {
          name: 'Mutate Landscape',
          sublabel: 'Warpforged Cabal – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Where the Warpforged Cabals spread their malignant change, the terrain erupts in uncontrolled mutation or transmogrifies into hazardous forms.',
          when: 'Your Command phase.',
          target: 'One Thousand Sons Psyker unit from your army within range of an objective marker you control.',
          effect: "That objective marker is mutated, and remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase. While an objective marker is mutated and under your control, each time an enemy unit ends a Normal, Advance, Fall Back or Charge move within range of that objective marker, roll one D6: on a 4+, that enemy unit suffers D3 mortal wounds.",
          restrictions: '',
        },
        {
          name: 'Ensorcelled Infusion',
          sublabel: 'Warpforged Cabal – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'Utilising the fell powers of the Warp, Thousand Sons Sorcerers infuse vehicles with empyric energies to render them even deadlier.',
          when: 'Your Shooting phase.',
          // Faction-Pack Rules Update reworded the Target (added "has not been selected to
          // shoot this phase") and changed the CP cost to 2CP.
          target: 'One Thousand Sons Vehicle unit from your army that has not been selected to shoot this phase, that is within 6" of one or more friendly Thousand Sons Psyker units.',
          effect: 'Until the end of the phase, ranged weapons equipped by Vehicle models in your unit have the [PSYCHIC] ability and each time an attack is made with such a weapon, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Cyberspirit Machinations',
          sublabel: 'Warpforged Cabal – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Technoshamanic rites can briefly possess a vehicle's logic-cores, shackling its mechanisms to a new lore.",
          when: 'Your Movement phase, just after a Thousand Sons Vehicle unit from your army Falls Back.',
          target: 'That Vehicle unit, and one friendly Thousand Sons Psyker unit within 6" of that Vehicle unit.',
          effect: 'Until the end of the turn, your Vehicle unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Warpflame Gargoyles',
          sublabel: 'Warpforged Cabal – Wargear Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'On the hulls of vehicles swollen with the power of Tzeentch, gnashing maws open to spew warpfire over those nearby.',
          when: "Your opponent's Charge phase, just after an enemy unit ends a Charge move.",
          target: 'One Thousand Sons Vehicle unit from your army within Engagement Range of that enemy unit.',
          effect: 'Roll six D6: for each 5+, that enemy unit suffers 1 mortal wound. That enemy unit must then take a Battle-shock test.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Warp Syphon',
          points: 5,
          flavor: "This Sorcerer greedily digs into the occult ley lines that thread a cabal's war engines, redirecting unwelcome surges of empyric overflow into the vehicles' structure.",
          body: `Thousand Sons model only. While the bearer is within 6" of one or more friendly Thousand Sons Vehicle units, each time the bearer Channels the Warp, after you roll that additional D6 but before checking for doubles or triples, the bearer can use this Enhancement. If it does, select one of those Vehicle units; that Vehicle unit suffers 1 mortal wound and you can re-roll that additional D6.`,
        },
        {
          name: 'Perplexing Cloak',
          points: 20,
          flavor: 'Woven from fibres pulled from mind impulse units while their owners are still alive, this cloak is a ritual interface between the biological and the mechanical, masking the wearer in the shadow of their iron wards.',
          body: `Thousand Sons Infantry model only. While the bearer is within 3" of one or more friendly Thousand Sons Vehicle units, the bearer has the Lone Operative ability.`,
        },
        {
          name: 'Biomechanical Mutation',
          points: 15,
          flavor: 'The war engines of the Thousand Sons seethe with Warp energies, power that this adept of eldritch metallurgy can manipulate to cause their sundered hulls to flow and reseal like wax.',
          body: `Thousand Sons model only. In your Command phase, you can select one friendly Thousand Sons Vehicle model within 6" of this model. That model regains up to D3 lost wounds.`,
        },
        {
          name: 'Warp-Cursed Runemaster',
          points: 10,
          flavor: "This malefic ritualist draws upon the power coiled within baleful runes applied to the thrallband's armoured assets, bleeding them for empyric energy.",
          body: `Thousand Sons model only. While the bearer is within 6" of one or more friendly Thousand Sons Vehicle units, each time the bearer manifests a Ritual, while resolving that Ritual, add 6" to its range.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'ritual-of-regeneration',
      name: 'Ritual of Regeneration',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Sorcerous Invigoration',
        flavor:
          'The sorcerous workings unleashed by this coven draw upon the energies of the Warp to effect relentless change, reknitting damaged flesh, sealing shattered armour and infusing even the most gruesomely mangled bodies with relentless life.',
        body: `(Once per turn, per unit) When a friendly Thousand Sons Psyker unit (excluding Monster units) successfully manifests a Ritual, that unit heals D3 wounds.`,
      },
      stratagems: [
        {
          name: 'Relentless Rebirth',
          sublabel: 'Ritual of Regeneration – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'As quickly as these warriors are wounded, so their corporeal forms regenerate with supernatural swiftness.',
          when: 'Any phase, when a friendly Infantry / Mounted Thousand Sons Psyker unit suffers a mortal wound.',
          target: 'That Infantry / Mounted Thousand Sons Psyker unit.',
          effect: 'Your unit has Feel No Pain 5+ against mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Mutagenic Magicks',
          sublabel: 'Ritual of Regeneration – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Focusing the unholy energies of their ritual into the bodies of the foe, the champions of Tzeentch cause them to erupt into a riot of gruesome and unstoppable mutation.',
          when: 'Start of the Fight phase.',
          target: 'One friendly engaged Thousand Sons Psyker unit.',
          effect: 'Select one enemy unit engaged with your unit. Roll six D6: for each 4+, that enemy unit suffers 1 mortal wound.',
          restrictions: '',
        },
        {
          name: 'Multitudinous Limbs',
          sublabel: 'Ritual of Regeneration – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'So unstoppable is the torrent of life rushing through these warriors that their bodies and even their wargear sprout nests of twitching limbs that move and act with a mind of their own.',
          when: 'Your Movement phase, when a friendly Infantry / Mounted Thousand Sons Psyker unit is selected to make an advance / fall back move.',
          target: 'That Infantry / Mounted Thousand Sons Psyker unit.',
          effect: 'That move does not prevent your unit from being eligible to start an action.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Eruption of Vitality',
          points: 35,
          flavor: 'Their carcass consumed in a sudden pyre of warpflame, this champion of Tzeentch steps from the blaze as a mutant parody of their former self.',
          body: `Infantry / Mounted Thousand Sons Psyker model only. (Once per battle, per army) When this model is destroyed, at the end of the phase, roll one D6:
▪ On a 2+, set up this model on the battlefield, unengaged and as close as possible to where it was destroyed. This model is not part of an attached unit and its unit has a starting strength of 1. This model has 3 wounds remaining.`,
        },
        {
          name: 'Curse of Life',
          points: 20,
          flavor: 'A ghastly torrent of unnatural life force pours through this warrior mystic, which will curse them with animus long after they wish themselves safely dead.',
          body: `Infantry / Mounted Thousand Sons Psyker model only. When this model heals as a result of the Sorcerous Invigoration detachment rule, you can add 3 to the number of wounds healed.`,
        },
      ],
    },

    {
      id: 'sekhetar-cohort',
      name: 'Sekhetar Cohort',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Ensorcelled Animus',
        flavor:
          'Some amongst the sorcerers of the Thousand Sons have learned to channel their wills through the mechanical bodies of Sekhetar Robots, rendering the constructs extensions of their own subtle bodies.',
        body: `▪ Friendly Sekhetar Robots unit’s attacks have [PSYCHIC].
▪ Friendly Thousand Sons Psyker units have the following ability:
▪ **Infusion (Aura):** While a friendly Sekhetar Robots unit is within 12" of this unit, that unit's melee attacks have +1 WS.`,
      },
      stratagems: [
        {
          name: 'Arcane Venting',
          sublabel: 'Sekhetar Cohort – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Even as they cross the battlefield, so these Sekhetar Robots vent glittering sorcerous residue that contaminates sites of power and importance.',
          when: 'End of your Movement phase.',
          target: 'One friendly Sekhetar Robots unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Ectoplasmic Extrusion',
          sublabel: 'Sekhetar Cohort – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Employing a form of limited astral projection, the Sorcerer possesses these robots and then extrudes ectoplasmic limbs from within their bodies to work his will even as they continue to fight.',
          when: 'Your Shooting phase, when a friendly Sekhetar Robots unit within 12" of a friendly Thousand Sons Psyker unit starts an action.',
          target: 'That Sekhetar Robots unit.',
          effect: 'That action does not prevent your unit from being eligible to shoot.',
          restrictions: '',
        },
        {
          name: 'Warp Fields',
          sublabel: 'Sekhetar Cohort – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Weaving sorcery into a shimmering shield, the sorcerer protects his enslaved automata from harm.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Sekhetar Robots unit within 12\" of a friendly Thousand Sons Psyker unit.",
          target: 'That Sekhetar Robots unit.',
          effect: "Ranged attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Walking Rampart',
          points: 30,
          flavor: 'This Sorcerer callously employs the Sekhetar Robots as a mobile fortification, pouring sorcery into them to repair their battered forms and maintain his ambulatory shield.',
          body: `Sorcerer / Exalted Sorcerer model only. This model has the following abilities:
▪ **Soul Bound:** In your Movement phase, at the start or end of this unit's move, you can select one friendly Sekhetar Robots unit within 3" of this model. That Sekhetar Robots unit heals D3+1 wounds.
▪ **Kine-shielded Guardians:** While this model is within 3" of a friendly Sekhetar Robots unit, this model has Lone Operative.`,
        },
        {
          name: 'Occulus Infernum',
          points: 20,
          flavor: 'It may be the Sekhetar Robots that fire upon the foe, but it is their sorcerous master that aims through their stolen senses.',
          body: `Sorcerer / Exalted Sorcerer model only. In your Movement phase, at the start or end of this unit's move, you can select one friendly Sekhetar Robots unit within 6" of this unit. That unit's ranged attacks have +1 BS until the start of your next turn.`,
        },
      ],
    },

    {
      id: 'servants-of-change',
      name: 'Servants of Change',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      unique: 'MUTANT',
      rule: {
        name: 'All-Seeing Mutant Hordes',
        flavor:
          'Beneath the multitudinous eyes of so many servants of Tzeentch, reality itself shifts and mutates, leaving the foe exposed to the onrushing mutant masses.',
        body: `▪ Friendly Tzaangors units have Battleline.
▪ In your Shooting phase, while a friendly Mutant unit is shooting, enemy units have +6" detection range.

This detachment has the MUTANT tag and cannot be taken with another MUTANT detachment.`,
      },
      stratagems: [
        {
          name: 'Prismatic Displacement',
          sublabel: 'Servants of Change – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Flickering light like cast through a many-faceted gem, the skyborne warriors of Tzeentch seem to manifest and fade, then leap back into sharp relief elsewhere with sudden violence.',
          when: 'Your Movement phase, when a friendly Infantry / Mounted Mutant unit is selected to make an advance / fall back move.',
          target: 'That Infantry / Mounted Mutant unit.',
          effect: "▪ Your unit's ranged attacks have [ASSAULT] until the end of the turn.\n▪ That move does not prevent your unit from being eligible to shoot / declare a charge.",
          restrictions: '',
        },
        {
          name: 'Temporal Instability',
          sublabel: 'Servants of Change – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Time runs differently around these warriors, allowing them ample space to act while their foes appear to lurch sluggishly on around them.',
          when: 'Your Movement phase, when a friendly Infantry / Mounted Mutant unit is selected to make an advance / fall back move.',
          target: 'That Infantry / Mounted Mutant unit.',
          effect: 'In a turn your unit made an advance / fall-back move, that move does not prevent your unit from being eligible to start an action.',
          restrictions: '',
        },
        {
          name: 'The Land Writhes',
          sublabel: 'Servants of Change – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The very fabric of reality runs like melting wax before this monstrous abomination, oozing aside to clear its path.',
          when: 'Your Movement phase, when a friendly Monster Mutant unit is selected to move.',
          target: 'That Monster Mutant unit.',
          effect: 'Your unit has Mobile.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Unravelled Fates',
          points: 15,
          flavor: 'How can the foe hope to suppress or drive back the hordes when, with a twist of sorcery, panic turns to courage, and certain doom mutates into burgeoning triumph?',
          body: `Tzaangor Shaman model only. In your Movement phase, at the start or end of this unit's move, you can select one friendly battle-shocked Mutant unit within 6" of this model. That unit is no longer battle-shocked.`,
        },
        {
          name: 'Thicket of Bladed Bone',
          points: 10,
          upgrade: true,
          flavor: 'Horrific mutations have rendered this degenerate Spawn especially dangerous at close quarters.',
          body: `Spawn unit only. This unit's melee attacks have:
▪ +1 AP.
▪ [CLEAVE 1].`,
        },
      ],
    },

    {
      id: 'hexwarp-thrallband',
      name: 'Hexwarp Thrallband',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Flow of Magic',
        flavor:
          "With each site seized by the thrallband's warriors, the flow of arcane energies increases, and the veil between reality and the Warp erodes. The resultant influxes of Warp energy are potent enough to invoke the flesh-change and must be channelled carefully by the thrallband's Sorcerers.",
        body: `Certain areas of the battlefield are within your army's Flow of Magic, as follows:
▪ Your deployment zone is always within your army's Flow of Magic.
▪ At the start of any phase, if you control at least half of the objective markers within No Man's Land, until the end of that phase, No Man's Land is within your army's Flow of Magic.
▪ At the start of any phase, if you control at least half of the objective markers within your opponent's deployment zone, until the end of that phase, your opponent's deployment zone is within your army's Flow of Magic.

Each time a Thousand Sons model from your army makes a Psychic Attack, re-roll a Wound roll of 1. If such a model is wholly within your army's Flow of Magic, each time it makes a Psychic Attack, add 1 to the Wound roll instead.`,
      },
      stratagems: [
        {
          name: 'Warding Hex',
          sublabel: 'Hexwarp Thrallband – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Thousand Sons Sorcerers draw upon tide swells of Warp energy to weave spells of binding and warding, thereby shackling sites of arcane power to their own arrogant will.',
          when: 'Command phase.',
          target: "One Thousand Sons Psyker unit from your army within range of an objective marker you control, if that objective marker is wholly within your army's Flow of Magic.",
          effect: "That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Wrath of the Doomed',
          sublabel: 'Hexwarp Thrallband – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Forewarned of the moment of their demise, the followers of Tzeentch allow the flood of magic to run rampant through their forms, providing them with a final burst of killing energy before unbound arcane force rips their bodies asunder.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Thousand Sons unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if your unit is wholly within your army's Flow of Magic: on a 4+, do not remove it from play. That destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: 'Strands of Time',
          sublabel: 'Hexwarp Thrallband – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "By drawing upon their expanding nexus of magic, this disciple of Tzeentch can tear strands of temporal energy from the Warp and wind them around themselves and their thralls. Lent speed by this garland of stolen time, they melt away from their foes' desperate strikes before lashing out again.",
          when: 'Your Movement phase, just after a Thousand Sons Psyker unit from your army Falls Back.',
          target: 'That Thousand Sons Psyker unit.',
          effect: "Until the end of the turn, your unit is eligible to shoot or declare a charge in a turn in which it Fell Back. If your unit is wholly within your army's Flow of Magic when it is targeted with this Stratagem, then until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.",
          restrictions: '',
        },
        {
          name: 'Through the Veil',
          sublabel: 'Hexwarp Thrallband – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "With arcane energy flooding the battlefield, the veil between Warp and reality rapidly collapses. From yawning rifts emerge Rubricae reinforcements to ensure their thrallband's victory.",
          when: 'Start of the Reinforcements step of your Movement phase.',
          target: 'One Rubric Marines or Scarab Occult Terminators unit from your army that is in Strategic Reserves.',
          effect: "If it is a Rubric Marines unit, until the end of the phase, it has the Deep Strike ability. When your unit is set up on the battlefield using the Deep Strike ability, if it is a Scarab Occult Terminator unit it can be set up anywhere on the battlefield that is wholly within your army's Flow of Magic and more than 6\" horizontally away from all enemy models.",
          restrictions: 'If a Scarab Occult Terminators unit is targeted with this Stratagem, it is not eligible to declare a charge in the same turn.',
        },
        {
          name: 'Scouring Warpflame',
          sublabel: 'Hexwarp Thrallband – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'At a spat curse, Warp-infused ammunition can be made to glow with sulphurous flame, enabling it to burn through solid cover to strike enemies beyond. Those hit by the fusillade find their forms wreathed in illuminating azure fire.',
          when: 'Your Shooting phase.',
          target: "One Thousand Sons Psyker unit from your army that has not been selected to shoot this phase and is wholly within your army's Flow of Magic.",
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability. After your unit has shot this phase, select one enemy unit hit by one or more of those attacks. Until the end of the phase, models in that unit cannot have the Benefit of Cover.',
          restrictions: '',
        },
        {
          name: 'Kaleidoscopic Tempest',
          sublabel: 'Hexwarp Thrallband – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'As the Thousand Sons solidify their control over sites of magical power, the Immaterium spills into reality in searing torrents, blossoming into a multispectral storm of arcane energy that obscures mortal senses and mechanical augury.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Thousand Sons Psyker unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "▪ Your unit has Stealth.\n▪ If your unit is wholly within your army's Flow of Magic, your unit has -3 detection range.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Arcane Might',
          points: 20,
          flavor: 'Drawing upon the rampant Warp energies coursing across the battlefield, this sorcerous champion imbues their weapons and those of their talented underlings with soulshattering force.',
          body: `Thousand Sons model only. Add 1 to the Strength characteristic of Psychic weapons equipped by models in the bearer's unit. While the bearer's unit is wholly within your army's Flow of Magic, add 2 to the Strength characteristic of Psychic weapons equipped by models in that unit instead.`,
        },
        {
          name: 'Empowered Manifestation',
          points: 20,
          flavor: 'The many eyes of this witch lord blaze with barely contained arcane might. Whilst the spells they unleash are rendered far more lethal, such destructive power comes at significant risk.',
          body: `Thousand Sons model only. While the bearer's unit is wholly within your army's Flow of Magic, you can add 6" to the range of Psychic abilities the bearer has that specify a range (including Rituals) and each time a model in the bearer's unit takes a Hazardous test for a Psychic weapon, you can re-roll the result.`,
        },
        {
          name: 'Empyric Onslaught',
          points: 25,
          flavor: 'Suffused with boundless empyric force, this ritualist unleashes overwhelming torrents of destructive magic upon their enemies.',
          body: `Thousand Sons model only. While the bearer's unit is wholly within your army's Flow of Magic, add 3 to the Attacks characteristic of ranged Psychic weapons equipped by the bearer.`,
        },
        {
          name: 'Noctilith Mantle',
          points: 15,
          flavor: 'With this crest, wrought from empyrically charged blackstone, this warrior becomes a mobile locus of unchecked Warp power.',
          body: `Thousand Sons model only. While the bearer's unit is on the battlefield, it is wholly within your army's Flow of Magic. Models in that unit cannot be selected to use any Rituals.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const thousandSons = { en, ru: en }
