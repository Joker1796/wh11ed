// Adeptus Custodes — faction rules. Resolved from the same source priority as the other
// factions (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex >
// Index.
//
//   Codex: Adeptus Custodes (sources/codex/imperium/Adeptus_custodes.pdf — image-only PDF,
//     transcribed from page renders p71–79) → army rule (Martial Ka'tah) + 4 base
//     detachments (Talons of the Emperor, Shield Host, Null Maiden Vigil, Auric Champions).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/imperium/AdeptusCustodes.pdf) → 5 extra
//     detachments (Might of the Moritoi, Silent Hunters, Tharanatoi Hammerblow, Lions of
//     the Emperor, Solar Spearhead) + Rules Updates.
//   MFM (src/data/mfm/adeptus-custodes.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the LIONS / ARMOURY `unique` tags.
//
// 9 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been folded
// into the codex detachment rules / stratagems / enhancements (they are the authoritative
// newer wording) — see inline notes. Lions of the Emperor + Tharanatoi Hammerblow carry the
// LIONS tag; Might of the Moritoi + Solar Spearhead carry the ARMOURY tag (mutually
// exclusive; `unique` field).
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions);
// swap in a translated object later. Markup follows useRenderInline / RuleBlock /
// StratCard conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ `
// bullet lines, `### ` subheadings. Datasheets are a later pass (`datasheets`).

const en = {
  slug: 'adeptus-custodes',
  name: 'Adeptus Custodes',

  armyRule: {
    id: 'martial-katah',
    name: "Martial Ka'tah",
    flavor:
      'Specialised disciplines mastered by Custodians over decades if not centuries, each ka\'tah equips its practitioner to overmaster any foe in a particular discipline or philosophy. Martial ka\'tahs allow the warriors of the Adeptus Custodes to deploy stances, movements, war philosophies and lethal skills that enhance their already terrifying martial prowess and focus it against particular threats.',
    body: `Each time a unit from your army with this ability is selected to fight, select one of the Ka'tah Stances below. Until that unit has finished making its attacks, the selected Stance is active for it and it gains the relevant ability:

### Dacatarai Stance
Melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.

### Rendax Stance
Melee weapons equipped by models in this unit have the [LETHAL HITS] ability.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'talons-of-the-emperor',
      name: 'Talons of the Emperor',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Revered Companions',
        flavor:
          'The Custodians and the Silent Sisters often fought as one during the earliest days of the Imperium. Ten thousand years on, they have lost none of the unity of doctrine and purpose that makes them such a deadly combination.',
        body: `Anathema Psykana units from your army gain the following ability:
▪ **Null Aegis (Aura):** While an Adeptus Custodes unit is within 6" of this unit, models in that unit have the Feel No Pain 5+ ability against Psychic Attacks and mortal wounds.

All other Adeptus Custodes units from your army gain the following ability:
▪ **Deadly Unity (Aura):** While an Anathema Psykana unit is within 6" of this unit, each time a model in that Anathema Psykana unit makes an attack, add 1 to the Hit roll.`,
      },
      stratagems: [
        {
          name: 'Hunt as One',
          sublabel: 'Talons of the Emperor – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Custodians and Null Maidens cover one another seamlessly as they manoeuvre to corner their prey.',
          when: 'Start of your Movement phase.',
          target: 'Up to two Adeptus Custodes units from your army.',
          effect: 'Until the end of the turn, your units are eligible to shoot and/or declare a charge in a turn in which they Fell Back.',
          restrictions: 'You can only select two units if one (and only one) of them is an Anathema Psykana unit and both are within 6" of each other.',
        },
        {
          name: "Emperor's Executioners",
          sublabel: 'Talons of the Emperor – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'The Talons of the Emperor tear apart their prey.',
          when: 'Start of the Fight phase.',
          target: 'Up to two Adeptus Custodes units from your army.',
          effect: 'Until the end of the phase, each time a model in one of your units targets an enemy unit that is below its Starting Strength, add 1 to the Wound roll.',
          restrictions: 'You can only select two units if one (and only one) of them is an Anathema Psykana unit and both are within 6" of each other.',
        },
        {
          name: 'Talons Interlocked',
          sublabel: 'Talons of the Emperor – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With practiced ease, the Talons of the Emperor establish vicious crossfires to cut the foe apart.',
          when: 'Your Shooting phase.',
          target: 'Up to two Adeptus Custodes Infantry units from your army, and one enemy unit that is an eligible target for all of those units.',
          effect: 'Until the end of the phase, your units can only target that enemy unit, but each time a model in one of your units makes a ranged attack, improve the Strength and Armour Penetration characteristics of that attack by 1.',
          restrictions: 'You can only select two units if one (and only one) of them is an Anathema Psykana unit and both are within 6" of each other.',
        },
        {
          name: 'Taloned Pincer',
          sublabel: 'Talons of the Emperor – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Every move the enemy makes only sees them fall.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          // Faction-Pack Rules Update: 9" → 8".
          target: 'Up to two Adeptus Custodes units from your army that are within 8" of that enemy unit.',
          effect: 'Your units can make a Normal move of up to 6".',
          restrictions: 'You cannot select units that are within Engagement Range of one or more enemy units. You can only select two units if one (and only one) of them is an Anathema Psykana unit and both are within 6" of each other.',
        },
        {
          name: 'Empyric Severance',
          sublabel: 'Talons of the Emperor – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Null Maidens quash the manifestations of witches.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Custodes unit from your army that was selected as the target of one or more of the attacking unit's attacks, and one friendly Anathema Psykana unit within 6\" of that Adeptus Custodes unit.",
          effect: 'Until the end of the phase, your unit has the Feel No Pain 4+ ability against Psychic attacks and mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Shield of Honour',
          sublabel: 'Talons of the Emperor – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'It is second nature for Custodes to place themselves between their comrades and potential peril.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Anathema Psykana Infantry unit from your army that was selected as the target of one or more of the attacking unit's attacks, and one other friendly Adeptus Custodes Infantry unit (excluding Anathema Psykana units) within 6\" of that Anathema Psykana Infantry unit.",
          effect: 'Until the end of the phase, any attack that targets your Anathema Psykana unit must instead target your other Adeptus Custodes unit (unless it is not an eligible target).',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Radiant Mantle',
          points: 30,
          flavor: "The golden glory of the Emperor himself glows around this magnificent warrior like Sol's own fire. Enemies are blinded by its light, forced to recoil in pain and terror.",
          body: `Adeptus Custodes model only. Each time an attack targets the bearer's unit, if the attacking model is within 12", subtract 1 from the Hit roll.`,
        },
        {
          name: 'Gift of Terran Artifice',
          points: 15,
          flavor: 'This warrior wields a close-quarters weapon crafted by the finest noble artisans of Terra, the workmanship of which is magnificent in its lethality.',
          body: `Adeptus Custodes model only. Each time the bearer makes a melee attack, add 1 to the Wound roll.`,
        },
        {
          name: 'Champion of the Imperium',
          points: 25,
          flavor: 'This leader is amongst the finest martial champions in all the Emperor\'s realm, and their mere presence inspires their followers to remarkable efforts.',
          // Faction-Pack Rules Update reworded this enhancement (range increased to 9").
          body: `Adeptus Custodes model only. The range of the bearer's Null Aegis or Deadly Unity ability (see the Revered Companions Detachment rule) is increased to 9".`,
        },
        {
          name: 'Aegis Projector',
          points: 20,
          flavor: 'This archeotech field projector triggers in response to autopremonitory danger input. It pulse-casts a temporary force field that can stave off even the most powerful attacks, before charging ready for another use.',
          body: `Adeptus Custodes model only. Once per turn, the first time a saving throw is failed for the bearer's unit, change the Damage characteristic of that attack to 0.`,
        },
      ],
    },

    {
      id: 'shield-host',
      name: 'Shield Host',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Martial Mastery',
        flavor:
          'The Custodians have perfected countless ways of making war, be it on a personal, tactical or strategic scale.',
        // Faction-Pack Rules Update rewrote the first paragraph — you now select ONE bullet
        // point (the once-per-battle limit is removed).
        body: `At the start of the battle round, you can select one of the bullet points below. If you do, until the start of the next battle round, that bullet point's effects apply:
▪ Each time an Adeptus Custodes model from your army with the Martial Ka'tah ability makes a melee attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.
▪ Improve the Armour Penetration characteristic of melee weapons equipped by Adeptus Custodes models from your army with the Martial Ka'tah ability by 1.`,
      },
      stratagems: [
        {
          name: 'Arcane Genetic Alchemy',
          sublabel: 'Shield Host – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The Adeptus Custodes are individually engineered on a molecular level using secrets of genetic alchemy that render them almost supernaturally resilient.',
          when: 'Any phase, just after a mortal wound has been allocated to an Adeptus Custodes model from your army (excluding Anathema Psykana models).',
          target: "That Adeptus Custodes model's unit.",
          effect: 'Until the end of the phase, models in your unit have the Feel No Pain 4+ ability against mortal wounds.',
          restrictions: '',
        },
        {
          name: 'Multipotentiality',
          sublabel: 'Shield Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'So widely skilled and studied are the Custodians that, whatever situation they find themselves in, they have the martial wisdom to prevail.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Custodes unit from your army that Fell Back this phase.',
          effect: 'Until the end of your turn, that unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Avenge the Fallen',
          sublabel: 'Shield Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The loss of a single Custodian is commemorated by the tolling of the Bell of Lost Souls on Terra, and by their comrades\' bloody vengeance on the battlefield.',
          when: 'Start of the Fight phase.',
          target: 'One Adeptus Custodes unit from your army (excluding Anathema Psykana units) that is below its Starting Strength.',
          effect: 'Until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in your unit. If your unit is Below Half-strength, until the end of the phase, add 2 to the Attacks characteristic of those melee weapons instead.',
          restrictions: '',
        },
        {
          name: 'Vigilance Eternal',
          sublabel: 'Shield Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Simply because the Adeptus Custodes do not stand sentinel over a strategic location or asset, does not mean that it – or any who would threaten it – escapes their gaze.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Custodes Battleline unit from your army (excluding Anathema Psykana units) within range of an objective marker you control.',
          effect: 'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',
          restrictions: '',
        },
        {
          name: 'Unwavering Sentinels',
          sublabel: 'Shield Host – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Once the Custodians have laid claim to a location, they defend it with incredible tenacity and skill.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Custodes Infantry unit from your army (excluding Anathema Psykana units) that is within range of an objective marker you control and that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a melee attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Archeotech Munitions',
          sublabel: 'Shield Host – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Shield Hosts have access to stockpiles of ancient and incredibly rare weaponry and ammunition.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Custodes unit from your army (excluding Anathema Psykana units) that has not been selected to shoot this phase.',
          effect: 'Select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, ranged weapons equipped by models in your unit have the selected ability.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'From the Hall of Armouries',
          points: 25,
          flavor: "The racks of the Adeptus Custodes' armouries yield up some of the most finely crafted close-quarters weaponry borne by any soldiers of the Imperium.",
          body: `Shield-Captain model only. Add 1 to the Strength and Damage characteristics of the bearer's melee weapons.`,
        },
        {
          name: "Castellan's Mark",
          points: 20,
          flavor: 'This finely worked pauldron is awarded to whichever living Custodian currently holds the greatest tally of victories in the Blood Games. The one who bears the Castellan\'s Mark is guaranteed to be a superlative strategic genius.',
          // Faction-Pack Rules Update reworded this enhancement (dropped the "determined who
          // has the first turn" clause).
          body: `Shield-Captain model only. After both players have deployed their armies, you can select up to two Adeptus Custodes units from your army (excluding Anathema Psykana units) and redeploy all of those units. When doing so, any of those units can be placed into Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Auric Mantle',
          points: 15,
          flavor: 'This auramite weave garment is draped about its wearer\'s shoulders before they don their battle armour. It forms a final, incredibly resilient layer of protection for them should all their other defences fail.',
          body: `Shield-Captain or Blade Champion model only. Add 2 to the bearer's Wounds characteristic.`,
        },
        {
          name: 'Panoptispex',
          points: 5,
          flavor: 'This incredibly advanced precursor to Imperial auspicators is able to see through solid objects and into esoteric spectra, meaning no malcontent against the Throne can ever hide from its bearer\'s gaze.',
          body: `Shield-Captain or Blade Champion model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [IGNORES COVER] ability.`,
        },
      ],
    },

    {
      id: 'null-maiden-vigil',
      name: 'Null Maiden Vigil',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Creeping Dread',
        flavor:
          'The instinctive fear caused by the Pariah gene spreads like a terrible pall before the cadres of the Silent Sisterhood.',
        body: `**Creeping Dread (Aura):** In the Battle-shock step of your opponent's Command phase, if an enemy unit that is either a Psyker unit or below its Starting Strength is within 12" of one or more Anathema Psykana models from your army, that enemy unit must take a Battle-shock test. If that unit is Below Half-strength, it must subtract 1 from its Battle-shock test this phase instead.

### Keywords
If you select this Detachment, Prosecutors units from your army have the Battleline keyword.`,
      },
      stratagems: [
        {
          name: "Desperation's Price",
          sublabel: 'Null Maiden Vigil – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "To overcome the Null Maidens' aura, enemy psykers overstretch themselves with horrible consequences.",
          when: 'Any phase, just after an enemy Psyker unit has either finished using a Psychic ability that targets a unit, or finished making Psychic Attacks.',
          target: 'One Anathema Psykana unit from your army within 18" of that enemy Psyker unit.',
          effect: 'That enemy Psyker unit must take a Leadership test. If the test is passed, that Psyker unit is Battle-shocked; if the test is failed, that Psyker unit suffers 3 mortal wounds and is Battle-shocked.',
          restrictions: '',
        },
        {
          name: 'Psy-chaff Volley',
          sublabel: 'Null Maiden Vigil – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Prosecutors can fire psy-chaff bolts whose esoteric emissions weaken those targets not slain outright.',
          when: 'Your Shooting phase.',
          target: 'One Prosecutors unit from your army that has just shot.',
          effect: 'Select one enemy unit hit by one or more of those attacks. Until the start of your next turn, while your unit is on the battlefield, that enemy unit is prosecuted. While a unit is prosecuted, each time an Anathema Psykana model makes an attack against that unit, improve the Armour Penetration characteristic of that attack by 1. While a Psyker or Battle-shocked unit is prosecuted, each time a model in that unit makes an attack, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Witch Hunters',
          sublabel: 'Null Maiden Vigil – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Null Maidens train to slay psykers with swift martial efficiency, for they know their prey have many weapons beyond just their powers and must not be allowed time or opportunity to employ them.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Anathema Psykana unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have the selected ability, but models in your unit can only target Psyker units with their attacks.',
          restrictions: '',
        },
        {
          name: 'Purgation Sweep',
          sublabel: 'Null Maiden Vigil – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Witchseekers know their role in combat is to spread indiscriminate carnage through the foe's ranks.",
          when: 'Your Shooting phase.',
          target: 'One Witchseekers unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, add 1 to the Attacks characteristic of Torrent weapons equipped by models in your unit. If such a weapon targets a Psyker or Battle-shocked unit this phase, add 2 to its Attacks characteristic instead.',
          restrictions: '',
        },
        {
          name: 'Anathema Blademastery',
          sublabel: 'Null Maiden Vigil – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Vigilators train tirelessly in the art of the swift, beheading strike, with a particular emphasis on the swift elimination of enemy witches.',
          when: 'Fight phase.',
          target: 'One Vigilators unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a melee attack, you can re-roll the Hit roll. If the target of that attack is Battle-shocked or a Psyker, you can re-roll the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Psychic Abominations',
          sublabel: 'Null Maiden Vigil – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Enemies must overcome disorienting waves of revulsion in order to even focus upon Null Maidens.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Anathema Psykana Infantry unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, your unit has the Stealth ability, and Battle-shocked and Psyker models can only select your unit as a target of a ranged attack if they are within 12".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Raptor Blade',
          points: 5,
          flavor: 'The Raptor Blade is an ancient relic of the Null Maidens, as razor sharp now as it was on the day of its forging and ever the bane of witches.',
          body: `Anathema Psykana model only. Add 1 to the Attacks, Strength and Damage characteristics of the bearer's melee weapons. While the bearer is within Engagement Range of one or more enemy Psyker units that are Battle-shocked, add 2 to the Attacks, Strength and Damage characteristics of the bearer's melee weapons instead.`,
        },
        {
          name: 'Enhanced Voidsheen Cloak',
          points: 10,
          flavor: 'Now rare, enhanced voidsheen cloaks were worn by commanders of the Sisters of Silence during the Great Crusade. They are made from micro-vitrious mesh designed to diffract and absorb attacks, and include inbuilt refractor fields.',
          body: `Anathema Psykana model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack. If that attack was made by a Psyker or Battle-shocked model, change the Damage characteristic of that attack to 1 instead.`,
        },
        {
          name: "Huntress' Eye",
          points: 15,
          flavor: 'This ancient bionic acts like a miniature animus speculum, focusing the bearer\'s null abilities into a stare that can literally terrify foes to death.',
          body: `Anathema Psykana model only. In your Command phase, select one enemy unit within 12" of the bearer. That unit must take a Battle-shock test.`,
        },
        {
          name: 'Oblivion Knight',
          points: 25,
          flavor: 'Oblivion Knights are among the most powerful and experienced of the Sisters of Silence. When one leads their sisters in the field, witches must truly beware.',
          body: `Anathema Psykana model only. While the bearer is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll. If that attack targeted an enemy Psyker unit, add 1 to the Wound roll as well.`,
        },
      ],
    },

    {
      id: 'auric-champions',
      name: 'Auric Champions',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Assemblage of Might',
        flavor:
          "When such exceptional warriors as these gather to quest in the Emperor's name, even the most dreadful foes of Humanity are right to fear for their lives.",
        // Faction-Pack Rules Update reworded this rule (now "a model in an Adeptus Custodes
        // Character unit", covering bodyguards, not just the Character model).
        body: `At the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, each time a model in an Adeptus Custodes Character unit from your army makes an attack that targets that enemy unit, add 1 to the Wound roll.`,
      },
      stratagems: [
        {
          name: 'Slayer of Champions',
          sublabel: 'Auric Champions – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'What foe can withstand a warrior who has so tested the defences of the Throneworld itself?',
          when: 'Any phase.',
          target: 'One Adeptus Custodes Character unit from your army that has just destroyed the unit you selected at the start of your Command phase as the target of your Assemblage of Might ability.',
          effect: 'Select one enemy unit on the battlefield. Until the start of your next Command phase, each time an Adeptus Custodes Character model from your army makes an attack that targets that enemy unit, add 1 to the Wound roll. In addition, if the destroyed unit was a Character unit, gain 1CP.',
          restrictions: '',
        },
        {
          name: 'Earning of a Name',
          sublabel: 'Auric Champions – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "To lay low the greatest and most terrible monsters and heretics is to earn new names for a Custodian's mighty tally.",
          when: 'Fight phase.',
          target: 'Up to two Adeptus Custodes Character units from your army that have not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a Character model in either of your units makes an attack that targets a Monster or Vehicle unit, you can re-roll the Hit roll and you can re-roll the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Superhuman Reserves',
          sublabel: 'Auric Champions – Epic Deed Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'The greatest of the Custodians bring incredible reserves of stamina and ability to bear.',
          when: "Any phase, just after an Adeptus Custodes Warlord model from your army has used an ability on its datasheet or from an Enhancement that says it can only be used 'Once per battle'.",
          target: 'That Adeptus Custodes Warlord model.',
          effect: "Your model can use its 'Once per battle' ability one additional time during this battle (but not in the same phase).",
          restrictions: 'You cannot use this Stratagem more than once per battle.',
        },
        {
          name: 'Vigil Unending',
          sublabel: 'Auric Champions – Epic Deed Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'The Custodes do not yield while their duty remains unfulfilled.',
          when: 'Fight phase.',
          target: 'One Adeptus Custodes Character model from your army that was just destroyed and has not fought this phase. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Do not remove your destroyed model from play. The destroyed model can fight after the attacking unit has finished making attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: "The Emperor's Auspice",
          sublabel: 'Auric Champions – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "In an age plagued by monsters, when primordial horrors from the darkest void circle Humanity's dying light, still the Adeptus Custodes stand strong.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Custodes Character unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, Character models in your unit have the Feel No Pain 4+ ability.',
          restrictions: '',
        },
        {
          name: 'Shoulder the Mantle',
          sublabel: 'Auric Champions – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The greatest Custodians know when it is both their duty and their right to command their comrades.',
          // Faction-Pack Rules Update rewrote this Stratagem.
          when: 'Your Movement phase, before the Reinforcements step.',
          target: 'One Adeptus Custodes Character model from your army that is not leading a unit.',
          effect: "Select one friendly unit (excluding Battle-shocked and Attached units) within 2\" horizontally and 5\" vertically of your model that it could lead (as described in the Leader section of its datasheet). Your model attaches to that unit as a Leader. Change that unit's Starting Strength accordingly.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Blade Imperator',
          points: 25,
          flavor: "This warrior is the Emperor's own wrath made manifest, the living weapon of the Master of Mankind.",
          body: `Adeptus Custodes model only. Each time the bearer's unit ends a Charge move, select one enemy unit within Engagement Range of the bearer and roll one D6: on a 4+, that enemy unit suffers D3 mortal wounds. Once per battle, after the bearer's unit ends a Charge move, all enemy units within 6" of the bearer must take a Battle-shock test.`,
        },
        {
          name: 'Inspirational Exemplar',
          points: 10,
          flavor: 'Here is a singular being even the mighty Custodians can look up to and be inspired by.',
          body: `Adeptus Custodes model only. The bearer has a Leadership characteristic of 5+. Once per battle, at the start of any phase, you can select one friendly Adeptus Custodes unit that is Battle-shocked and within 12" of the bearer; that unit is no longer Battle-shocked.`,
        },
        {
          name: 'Veiled Blade',
          points: 25,
          flavor: 'Said to have been fashioned for dark deeds during the Horus Heresy, this blade is an icon of vengeance.',
          body: `Adeptus Custodes model only. Add 2 to the Attacks characteristic of the bearer's melee weapons. Once per battle, at the start of any Command phase, triple the bearer's Objective Control characteristic until the end of the turn.`,
        },
        {
          name: 'Martial Philosopher',
          points: 30,
          flavor: 'Few in the history of the Imperium have been so skilled in reading – and directing – the ebb and flow of battle.',
          // Faction-Pack Rules Update reworded the third sentence (opponent's Movement phase,
          // within 8").
          body: `Adeptus Custodes model only. The bearer's unit is eligible to shoot and/or declare a charge in a turn in which it Fell Back. Once per battle, in your opponent's Movement phase, when an enemy unit ends a Normal, Advance or Fall Back move within 8" of the bearer, if the bearer's unit is not within Engagement Range of one or more enemy units, it can make a Normal move of up to 6".`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'might-of-the-moritoi',
      name: 'Might of the Moritoi',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      unique: 'ARMOURY',
      rule: {
        name: 'March of the Honoured Dead',
        flavor:
          'The fallen warriors interred in ancient Dreadnought sarcophagi are ever eager for battle, and their hulking forms propel them towards the foe at a deadly pace.',
        body: `Friendly Adeptus Custodes Walker units:
▪ Have +2" Move.
▪ Have +1 to advance rolls and charge rolls.

This detachment has the ARMOURY tag and cannot be taken with another ARMOURY detachment.`,
      },
      stratagems: [
        {
          name: 'Flawless Construction',
          sublabel: 'Might of the Moritoi – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Adeptus Custodes Dreadnoughts possess expertly wrought armoured forms that contain ancient and esoteric technology, including autorepair subroutines and reactive field generators.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes Walker unit.",
          target: 'That Adeptus Custodes Walker unit.',
          effect: "Attacks that target your unit with a Strength greater than your unit's Toughness have -1 to Wound rolls.",
          restrictions: '',
        },
        {
          name: 'Unstoppable Advance',
          sublabel: 'Might of the Moritoi – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Even the most formidable obstacles give way to the ancient warriors of the Moritoi, ruptured and trampled underfoot or barged aside with howl of empowered servos.',
          when: 'Your Movement phase, when a friendly Adeptus Custodes Walker unit is selected to move.',
          target: 'That Adeptus Custodes Walker unit.',
          effect: 'Your unit has Mobile.',
          restrictions: '',
        },
        {
          name: 'Prioritised Eradication',
          sublabel: 'Might of the Moritoi – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When lauded Telemon pilots turn their pitiless optics upon a proximal threat, the storm of accelerated firepower that ensues leaves naught but smoking ruin.',
          when: 'Your Shooting phase, when a friendly Telemon Heavy Dreadnought unit is selected to shoot.',
          target: 'That Telemon Heavy Dreadnought unit.',
          effect: "Your unit's:\n▪ Arachnus Storm Cannon weapons have [RAPID FIRE 6].\n▪ Iliastus Accelerator Culverin weapons have [RAPID FIRE 2].",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Interred Expertise',
          points: 25,
          upgrade: true,
          flavor: "The eldest warriors of the Moritoi are revered champions with centuries of battle experience, whose strikes efficiently exploit their foes' every weakness.",
          body: `Adeptus Custodes Walker unit only. This unit's attacks can:
▪ Re-roll hit rolls of 1.
▪ Re-roll wound rolls of 1.`,
        },
        {
          name: 'Auramite Sarcophagus',
          points: 15,
          upgrade: true,
          flavor: 'These ancient sarcophagi are hardened with age and threaded with Dark Age mechanisms. When the warrior within slams their metallic form into the foe, they can crack armour, pulverise bone and wreck enemy war machines.',
          body: `Adeptus Custodes Walker unit only. When you target this unit with the Crushing Impact stratagem, that use is -1 CP.`,
        },
      ],
    },

    {
      id: 'silent-hunters',
      name: 'Silent Hunters',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Skin-Crawling Disorientation',
        flavor:
          "The mere presence of the Silent Sisterhood's Blanks triggers a sense of agitated revulsion in their enemies. The foe's discipline breaks down, and watchful focus becomes elusive, allowing positions to be given away and granting the Sisters opportunities to conduct vital strategic operations.",
        body: `▪ When a friendly Anathema Psykana unit is selected to make an advance move, that advance move does not prevent that unit from being eligible to start an action.
▪ Friendly Anathema Psykana units have the following ability:
▪ **Ceaseless Vigilance:** In your Shooting phase, this unit can select one visible enemy unit within 12". That enemy unit is nulled. While a unit is nulled, that unit has +3" detection range.`,
      },
      stratagems: [
        {
          name: 'Deathsong Scythes',
          sublabel: 'Silent Hunters – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'After stalking their sorcerous prey in silence, the charge of the Vigilators is accompanied by a keening song of death emitted by their scything greatblades as they are swept in eviscerating arcs.',
          when: 'Fight phase, when a friendly Vigilators unit is selected to fight.',
          target: 'That Vigilators unit.',
          effect: "Your unit's melee attacks have [LANCE]. Your unit's melee attacks that target a Psyker unit have +1 Attack.",
          restrictions: '',
        },
        {
          name: 'Umbral Prosecution',
          sublabel: 'Silent Hunters – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When they have cornered their quarry at close range, Prosecutors fire their Umbra-pattern bolters in rapid bursts that sow strings of armour-shredding shots amongst the enemy.',
          when: 'Your Shooting phase, when a friendly Prosecutors unit is selected to shoot.',
          target: 'That Prosecutors unit.',
          effect: "Your unit's Boltgun weapons have [RAPID FIRE 2] and +1 AP.",
          restrictions: '',
        },
        {
          name: 'Synchronised Inferno',
          sublabel: 'Silent Hunters – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Coordinating through a rapid exchange of Thoughtmark, Witchseekers unleash a flesh-melting inferno of all-consuming promethium from their flamers.',
          when: 'Your Shooting phase, when a friendly Witchseekers unit is selected to shoot.',
          target: 'That Witchseekers unit.',
          effect: "Your unit's [TORRENT] ranged attacks have [BLAST 1].",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Encircling Hunter',
          points: 15,
          flavor: "Possessed of years' experience hunting duplicitous and evasive witches, this Knight-Centura is skilled in ensuring every escape route is covered and their unknowing target reeling in horror and confusion.",
          body: `Anathema Psykana model only. When both players have deployed their armies, you can redeploy up to three friendly Anathema Psykana Infantry units. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Psyk-out Grenades',
          points: 10,
          upgrade: true,
          flavor: "These small, artificer-wrought explosives are deadly enough to lesser foes. Yet the favoured prey of the Sisters of Silence are excruciated or stunned by the grenades' psi-refractive particles, convulsing in a vortex of despair.",
          body: `Anathema Psykana unit only.
▪ This unit has Explosives.
▪ When you target this unit with the Explosives stratagem, if you select an enemy Psyker unit, you can re-roll rolls to determine whether that enemy unit suffers a mortal wound.`,
        },
      ],
    },

    {
      id: 'tharanatoi-hammerblow',
      name: 'Tharanatoi Hammerblow',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      unique: 'LIONS',
      rule: {
        name: 'The Hammer Falls',
        flavor:
          'Whether striking from amidst roiling teleport flares or advancing from outflanking positions, the most heavily armoured of the Adeptus Custodes hit their foes in terrifyingly sudden incursions.',
        body: `If a friendly Adeptus Custodes Terminator unit made an ingress move this turn, that unit can re-roll charge rolls.

This detachment has the LIONS tag and cannot be taken with another LIONS detachment.`,
      },
      stratagems: [
        {
          name: 'Hardened Resolve',
          sublabel: 'Tharanatoi Hammerblow – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Steeling their souls and bracing their indomitable armour, heavily girded Custodians will cleave to their duty and reject attempts to cut them down.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes Terminator unit.",
          target: 'That Adeptus Custodes Terminator unit.',
          effect: 'Your unit has +1 Toughness.',
          restrictions: '',
        },
        {
          name: 'Unleash the Lions',
          sublabel: 'Tharanatoi Hammerblow – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Heroic bands of Terminator-armoured Custodians engage entire armies in unrelenting battle.',
          when: 'Your Command phase.',
          target: 'One friendly Allarus Custodians / Aquilon Custodians unit that is on the battlefield.',
          effect: 'Your unit is split into separate units, each containing one model. These new units each have a starting strength of 1.',
          restrictions: '',
        },
        {
          name: 'Electroexorcist Saturation',
          sublabel: 'Tharanatoi Hammerblow – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'A concussive barrage of specialist grenades enables Allarus Custodians to maximise the destructive potential of their arm-mounted launchers against their massed enemies.',
          when: 'Your Shooting phase, when a friendly Adeptus Custodes Terminator unit is selected to shoot.',
          target: 'That Adeptus Custodes Terminator unit.',
          effect: "Your unit's Ballistus Grenade Launcher weapons have D3+3 Attacks.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Mnemo-locked Shrine Cipher',
          points: 25,
          flavor: "This encrypted activation code dates back to before the Emperor's compact with Mars. Committed to the enhanced memory of the bearer, it can be uttered to cut through a teleportarium shrine's layers of ageing protocols to deliver armoured death in the blink of an eye.",
          body: `Adeptus Custodes Terminator model only. In your first Movement phase, this unit can make an ingress move.`,
        },
        {
          name: 'Efficient Aggression',
          points: 25,
          flavor: "This heavily armoured commander constantly seeks opportunities to exploit the foe's show of force, leading advances into the teeth of the enemy where lesser warriors would quail.",
          body: `Adeptus Custodes Terminator model only. (Once per turn, per army) In your opponent's Shooting phase, when an enemy unit has shot, if this unit lost a wound as a result of those attacks, this unit can make a surge move of up to D6+1".`,
        },
      ],
    },

    {
      id: 'lions-of-the-emperor',
      name: 'Lions of the Emperor',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Disruption',
      unique: 'LIONS',
      rule: {
        name: 'Against All Odds',
        flavor:
          'The Adeptus Custodes are outnumbered on every battlefield upon which they fight, yet no matter the foe, and no matter their number, the Lions of the Emperor will prevail.',
        body: `Each time a model in an Adeptus Custodes unit from your army (excluding Vehicles) makes an attack, if there are no other friendly units within 6" of that unit, add 1 to the Hit roll and add 1 to the Wound roll.`,
      },
      stratagems: [
        {
          name: 'Gilded Champion',
          sublabel: 'Lions of the Emperor – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The shining champions of the Adeptus Custodes are looked upon in awe by all who witness their grim arts. Their judgement is without flaw, and their tactical acumen utterly impeccable.',
          when: "Any phase, just after an Adeptus Custodes Character model from your army has used an ability on its datasheet that states it can only be used 'once per battle'.",
          target: 'That Adeptus Custodes Character model.',
          effect: "Your model can use that 'once per battle' ability one additional time during the battle (but not in the same phase).",
          restrictions: 'You cannot use this Stratagem on the same Adeptus Custodes Character model more than once per battle.',
        },
        {
          name: 'Unleash the Lions',
          sublabel: 'Lions of the Emperor – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Heroic bands of Terminator-armoured Custodians engage entire armies in unrelenting battle.',
          when: 'Your Command phase.',
          target: 'One Allarus Custodians or Aquilon Custodians unit from your army that is on the battlefield.',
          effect: 'That unit is split into separate units, each containing one model. These new units each have a Starting Strength of 1.',
          restrictions: '',
        },
        {
          name: 'Defiant to the Last',
          sublabel: 'Lions of the Emperor – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The harder the battle, and the heavier their losses, the more resolute the Lions of the Emperor become.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Custodes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 2 to the result if that model has the Character keyword. On a 4+, do not remove it from play; the destroyed model can fight after the attacking unit has finished making its attacks (when doing so, it is treated as having 1 wound remaining), and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Manoeuvre and Fire',
          sublabel: 'Lions of the Emperor – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Adeptus Custodes are unrelenting in their advance, laying down punishing fire even as they manoeuvre to new positions.',
          when: 'Your Movement phase, just after an Adeptus Custodes unit from your army Falls Back.',
          target: 'That Adeptus Custodes unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Swift as the Eagle',
          sublabel: 'Lions of the Emperor – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Although every Custodian is devastatingly fast on the battlefield, with preternatural reactions to match, the Lions of the Emperor are outstanding even among their peers.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Adeptus Custodes unit from your army (excluding Vehicle units) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Your unit can make a Normal move of up to D6".',
          restrictions: '',
        },
        {
          name: 'Peerless Warrior',
          sublabel: 'Lions of the Emperor – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With every strike, the Lions of the Emperor prove themselves the masters of single combat, even when engaging the mightiest foes.',
          when: 'Fight phase.',
          target: 'One Adeptus Custodes unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Superior Creation',
          points: 25,
          flavor: 'The cellular alchemy by which this heroic warrior was forged has rendered them breathtakingly resilient.',
          body: `Adeptus Custodes Infantry model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of one or more enemy units, with its full wounds remaining.`,
        },
        {
          name: 'Praesidius',
          points: 25,
          flavor: 'Fashioned by the Terran armourer Annah Tsvochakin in the latter years of the 32nd millennium, the stunningly worked Praesidius is a singular artefact. Nestled within its golden form are a series of microshield generators and stealth emitters. Employing a modification of displacer technology, the shield generates small localised displacement bubbles at the point of impact, literally beaming bolts, bullets and the tips of blades harmlessly away from its bearer.',
          body: `Adeptus Custodes model only. The bearer has the Lone Operative and Stealth abilities.`,
        },
        {
          name: 'Fierce Conqueror',
          points: 15,
          flavor: 'This Captain-Commander has trained extensively to face multiple foes at once, knowing that the Custodes will always be outnumbered.',
          body: `Shield-Captain model only. At the start of the Fight phase, until the end of the phase, add 2 to the Attacks characteristic of melee weapons equipped by the bearer for every 5 enemy models within 6" of the bearer (rounding down).`,
        },
        {
          name: 'Admonimortis',
          points: 20,
          flavor: 'A relic of the Dread Host, this towering blade was wrought to make a bloody example of those who dare to set themselves against the might of Terra.',
          body: `Shield-Captain model only. Improve the Strength characteristic of melee weapons equipped by the bearer by 3, and improve the Armour Penetration and Damage characteristics of those weapons by 1.`,
        },
      ],
    },

    {
      id: 'solar-spearhead',
      name: 'Solar Spearhead',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Take and Hold',
      unique: 'ARMOURY',
      rule: {
        name: 'Auric Armour',
        flavor:
          'The venerable war engines of the Adeptus Custodes possess aggressive machine spirits.',
        body: `### Auric Armour
▪ While an Adeptus Custodes Vehicle unit from your army is at Starting Strength, unless that unit is an Aircraft or it is Battle-shocked, add 2 to the Objective Control characteristic of models in that unit.
▪ While an Adeptus Custodes Vehicle unit from your army is below Starting Strength, each time a model in that unit makes an attack, re-roll a Hit roll of 1.
▪ While an Adeptus Custodes Vehicle unit from your army is Below Half-strength, each time a model in that unit makes an attack, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.

### Moritoi Ancients
Add 2" to the Move characteristic of models in Adeptus Custodes Walker units from your army and add 1 to Advance and Charge rolls made for such units.

### Keywords
In the Muster Armies step, you can select up to 2 Adeptus Custodes Walker models from your army. The selected units gain the Character keyword. (This means the selected models can be given Enhancements and one of them can be selected as your Warlord.)

This detachment has the ARMOURY tag and cannot be taken with another ARMOURY detachment.`,
      },
      stratagems: [
        {
          name: 'Flawless Construction',
          sublabel: 'Solar Spearhead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The vehicles of the Adeptus Custodes are the finest examples of their kind. Their expertly wrought armoured forms contain ancient and esoteric technology, including autorepair subroutines and reactive field generators.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Custodes Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets a model in your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: "Emperor's Vengeance",
          sublabel: 'Solar Spearhead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Even as death's cold embrace falls upon them, Custodians vent the last of their wrath upon the foe.",
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Custodes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if your unit has the Walker keyword. On a 4+, do not remove it from play; the destroyed model can fight after the attacking unit has finished making its attacks (when doing so, it is assumed to have 1 wound remaining), and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Wrathful Advance',
          sublabel: 'Solar Spearhead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The golden-armoured onslaught smashes through the enemy line, trapping the foe and preventing their escape.',
          when: 'Fight phase, just before an Adeptus Custodes unit from your army Piles In.',
          target: 'That Adeptus Custodes unit.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Pile-in move, it can move up to D3+3" instead of up to 3".',
          restrictions: '',
        },
        {
          name: 'Unstoppable',
          sublabel: 'Solar Spearhead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Armoured in adamantine and possessed of furious machine spirits, the vehicles of the Adeptus Custodes are almost impossible to stop in their tracks.',
          when: 'Your Movement phase or your Charge phase.',
          target: 'One Adeptus Custodes Vehicle or Adeptus Custodes Mounted unit from your army.',
          effect: 'Until the end of the phase, each time a model in your unit makes a move, it can move through terrain features.',
          restrictions: '',
        },
        {
          name: 'Relentless Persecution',
          sublabel: 'Solar Spearhead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Custodians coax wrathful fury from their war engines' machine spirits to hunt down and eliminate their foes at speed.",
          when: 'Your Movement phase, just after an Adeptus Custodes Vehicle unit from your army Advances.',
          target: 'That Adeptus Custodes Vehicle unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Advanced. If your unit has the Walker keyword, until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced instead.',
          restrictions: '',
        },
        {
          name: 'Punishment Inescapable',
          sublabel: 'Solar Spearhead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The Ten Thousand are relentless in pursuing the Emperor's foes and thorough in their annihilation. No armour, sorcery or hiding place can shield an enemy from their wrath.",
          when: 'Your Shooting phase.',
          target: 'One Adeptus Custodes unit from your army that has not been selected to shoot this phase.',
          effect: "Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability, and until the end of the phase, each time a model in your unit makes an attack, you can ignore any or all modifiers to that attack's Ballistic Skill characteristic and/or any or all modifiers to the Hit roll.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Adamantine Talisman',
          points: 25,
          flavor: "This amulet contains a reservoir of promethium harvested from the wreckage of one of the Adeptus Custodes' most ancient Land Raiders. The fluid is said to possess the last lingering traces of that ancient vehicle's bellicose machine spirit, inspiring greater might and ferocity within its bearer.",
          body: `Adeptus Custodes model only. Improve the Attacks, Strength and Damage characteristics of melee weapons equipped by the bearer by 1.`,
        },
        {
          name: 'Augury Uplink',
          points: 35,
          flavor: 'The war engines of the Adeptus Custodes possess an array of augury equipment that combines to build an intricate picture of the unfolding conflict, enabling the bearer to tap into this accumulated data stream, detect incoming threats and angle their armour to repel the worst of enemy attacks.',
          body: `Adeptus Custodes model only. The bearer has the Feel No Pain 5+ ability.`,
        },
        {
          name: 'Honoured Fallen',
          points: 15,
          aura: true,
          flavor: 'The eldest warriors of the Moritoi are revered champions with centuries of battle experience, and their presence on the battlefield is inspirational.',
          body: `Adeptus Custodes Vehicle model only. While a friendly Adeptus Custodes Infantry or Adeptus Custodes Mounted unit is within 6" of the bearer, each time a model in that unit makes an attack, re-roll a Hit roll of 1.`,
        },
        {
          name: 'Veteran of the Kataphraktoi',
          points: 10,
          flavor: 'This champion has served amongst the Kataphraktoi and is a master at coordinating swift armoured assaults.',
          body: `Adeptus Custodes Infantry or Adeptus Custodes Mounted model only. In your Command phase, select one Adeptus Custodes Vehicle or Adeptus Custodes Mounted unit within 6" of the bearer. Until the start of your next Command phase, that unit is eligible to shoot in a turn in which it Fell Back.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const adeptusCustodes = { en, ru: en }
