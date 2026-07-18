// Dark Angels — faction rules. Resolved from the same source priority as Necrons /
// Space Marines / Tyranids (highest wins): MFM (points, DP / Force Disposition) >
// Faction Pack > Codex > Index.
//
//   Codex Supplement: Dark Angels (sources/codex/cm/Dark_Angels.pdf) → army rules
//     (Oath of Moment + The Unforgiven) + 3 base detachments (Unforgiven Task Force,
//     Inner Circle Task Force, Company of Hunters).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/cm/DarkAngels.pdf) → 5 extra
//     detachments (Dark Age Arsenal, Darkflight Pursuit, Interrogation Conclave,
//     Lion's Blade Task Force, Wrath of the Rock) + Rules Updates.
//   MFM (src/data/mfm/dark-angels.js) → per-enhancement points, per-detachment dp /
//     forceDisposition.
//
// 8 Dark-Angels-specific detachments. Dark Angels armies can ALSO field every Codex:
// Space Marines detachment (Gladius, Anvil Siege, Ironstorm, etc.) — those live in
// space-marines.js and are not duplicated here.
//
// Faction-Pack "Rules Updates" have been folded into the codex detachment rules /
// stratagems (they are the authoritative newer wording) — see inline notes. Oath of
// Moment for a Dark Angels army is the base version (re-roll Hit only) — the
// Codex-SM "+1 Wound" clause explicitly excludes armies containing Dark Angels units.
//
// EN-first: `ru` reuses the same object for now (same pattern as the other factions);
// swap in a translated object later. Markup follows useRenderInline / RuleBlock /
// StratCard conventions: **bold**, [BRACKET] weapon abilities → KeywordPopover, `▪ `
// bullet lines, `### ` subheadings. Datasheets are a later pass (`datasheets`).

// Shared "Armour of Contempt" stratagem — printed in most detachments with the same
// text. The Faction-Pack Rules Update reworded the Effect to "until the attacking unit
// has finished making its attacks…" for every Dark Angels detachment that carries it.
const armourOfContempt = (det) => ({
  name: 'Armour of Contempt',
  sublabel: `${det} – Battle Tactic Stratagem`,
  cp: '1CP',
  turn: 'opponent',
  flavor:
    'The belligerence of the Adeptus Astartes, combined with their transhuman physiology, makes them unyielding foes to face.',
  when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
  target:
    "One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
  effect:
    'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
  restrictions: '',
})

// Restriction paragraph shared by every Faction-Pack detachment (mono-Chapter armies).
const daOnly =
  'Your army can include Dark Angels units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.'

const en = {
  slug: 'dark-angels',
  name: 'Dark Angels',

  // Two army rules combined into one RuleBlock body with `### ` subheadings (FactionView
  // renders a single armyRule). Oath of Moment is the base Codex-SM ability (re-roll Hit
  // only); The Unforgiven governs Chapter keywords and the Deathwing / Ravenwing grants.
  armyRule: {
    id: 'oath-of-moment-the-unforgiven',
    name: 'Oath of Moment & The Unforgiven',
    flavor:
      'None fight with more grim determination than the sons of the Lion, and their specialised companies — known as the Deathwing and the Ravenwing in the case of the Dark Angels — are the bane of their terrified foes.',
    body: `### Oath of Moment
If your Army Faction is Adeptus Astartes, at the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your Oath of Moment target. Each time a model with this ability makes an attack that targets your Oath of Moment target, you can re-roll the Hit roll.

### The Unforgiven
▪ If an Adeptus Astartes unit has a second Faction keyword on its datasheet, that Faction keyword is the name of that unit's Chapter. For example, Asmodai has both the Adeptus Astartes and Dark Angels Faction keywords, and is therefore from the Dark Angels Chapter.
▪ You cannot include units from more than one Chapter in your army.

**The Ravenwing** — The following Adeptus Astartes units gain the Ravenwing keyword if they are drawn from the Dark Angels Chapter:
▪ Mounted units
▪ Vehicle units that can Fly

**The Deathwing** — The following Adeptus Astartes units gain the Deathwing keyword if they are drawn from the Dark Angels Chapter:
▪ Terminator units
▪ Bladeguard Ancient, Bladeguard Veteran Squad, Sternguard Veteran Squad and Vanguard Veteran Squad with Jump Packs units
▪ Land Raider, Land Raider Crusader, Land Raider Redeemer, Repulsor and Repulsor Executioner units
▪ Dreadnought units`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'unforgiven-task-force',
      name: 'Unforgiven Task Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Grim Resolve',
        flavor:
          'The Dark Angels are renowned for their unshakeable resolve, enduring tenacity and strict discipline in battle. They are tactically astute, able to prosecute their wars on any front. On the offence, they strike with all the martial pride of the Lion, while in defence they are stalwart, determined to accomplish their mission no matter the cost.',
        // Faction-Pack Rules Update rewrote this rule — added the "1 instead of '-'" wording
        // and the Command-phase +1 OC clause.
        body: `While an Adeptus Astartes unit from your army is Battle-shocked, change the Objective Control characteristic of models in that unit to 1, instead of '-'.

In your Command phase, you can select one Adeptus Astartes unit from your army. Until the start of your next Command phase, add 1 to the Objective Control characteristic of models in that unit.`,
      },
      stratagems: [
        armourOfContempt('Unforgiven Task Force'),
        {
          name: 'Fire Discipline',
          sublabel: 'Unforgiven Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'There is no escaping the wrath of the Unforgiven when they bring their disciplined firepower to bear.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [ASSAULT], [HEAVY] and [IGNORES COVER] abilities.',
          restrictions: '',
        },
        {
          name: 'Unforgiven Fury',
          sublabel: 'Unforgiven Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With focused aggression, the Dark Angels relentlessly punish the foe.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, weapons equipped by models in your unit have the [LETHAL HITS] ability. In addition, if one or more Adeptus Astartes units from your army are currently Battle-shocked, until the end of the phase, each time a model in your unit makes an attack, a successful unmodified Hit roll of 5+ scores a Critical Hit.',
          restrictions: '',
        },
        {
          name: 'Grim Retribution',
          sublabel: 'Unforgiven Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Stern and vengeful as they are, the warriors of the Unforgiven Chapters deliver swift retribution to any foe foolish enough to try to lay them low.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: 'One Adeptus Astartes unit from your army that had one or more models destroyed as a result of the attacking unit\'s attacks.',
          effect: 'Your unit can shoot as if it were your Shooting phase, but it must target only the enemy unit that just attacked it, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
        {
          name: 'Intractable',
          sublabel: 'Unforgiven Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Even the Dark Angels must give ground occasionally, but their stubborn determination ensures they never do so for long, or without a fight.',
          when: 'Your Movement phase, just after an Adeptus Astartes unit from your army Falls Back.',
          target: 'That Adeptus Astartes unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Unbreakable Lines',
          sublabel: 'Unforgiven Task Force – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'Countless assaults have faltered against the unbreakable ceramite wall that is the Unforgiven standing their ground.',
          when: "Your opponent's Charge phase, just after an enemy unit ends a Charge move.",
          target: 'One Adeptus Astartes unit from your army within Engagement Range of that enemy unit.',
          effect: 'Until the end of the turn, each time an attack targets your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Shroud of Heroes',
          points: 25,
          flavor: "Formed from the death shrouds of some of the Chapter's greatest warriors, this robe inspires its wearer with the might and selflessness of those who came before.",
          body: `Adeptus Astartes model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 3 wounds remaining (if the bearer was Battle-shocked when it was destroyed, it is instead returned with its full wounds remaining).`,
        },
        {
          name: 'Stubborn Tenacity',
          points: 15,
          flavor: 'Even for a Chapter as famously stubborn as the Dark Angels, this warrior is known for their intractable nature.',
          body: `Adeptus Astartes model only. While the bearer is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll if that unit is below its Starting Strength, and add 1 to the Wound roll as well if that unit is Battle-shocked and below its Starting Strength.`,
        },
        {
          name: 'Weapons of the First Legion',
          points: 15,
          flavor: 'Beneath the surface of the Rock lie vaults within which weapons of antiquity and terrible power are stored.',
          body: `Adeptus Astartes model only. Add 1 to the Attacks, Strength and Damage characteristics of the bearer's melee weapons. While the bearer is Battle-shocked, add 2 to the Attacks, Strength and Damage characteristics of the bearer's melee weapons instead.`,
        },
        {
          name: 'Pennant of Remembrance',
          points: 10,
          flavor: 'This hallowed banner records the names and deeds of legendary members of the Deathwing, stoking still firmer resolve in those who fight beneath it.',
          body: `Ancient model only. While the bearer is leading a unit, models in that unit have the Feel No Pain 6+ ability. While that unit is Battle-shocked, models in that unit have the Feel No Pain 4+ ability instead.`,
        },
      ],
    },

    {
      id: 'inner-circle-task-force',
      name: 'Inner Circle Task Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Vowed Target',
        flavor:
          'Whether its true significance is kept a secret or not, there is a singular prize here that the Inner Circle have come to either secure or destroy. They will pursue this strategic objective with cold ferocity.',
        // Faction-Pack Rules Update rewrote this rule around Defensive Footing / Aggressive Push.
        body: `At the start of your Movement phase, select one of the following:
▪ **Defensive Footing:** Select one objective marker you control. Until the start of your next Movement phase, that objective marker is your Vowed objective.
▪ **Aggressive Push:** Select one or more objective markers you do not control. Until the start of your next Movement phase, each of those objective markers is one of your Vowed objectives.

If a rule refers to a unit or model being within range of your Vowed objective, that rule takes effect if that unit or model is within range of one or more of your Vowed objectives. Each time a Deathwing Infantry unit from your army makes an attack that targets a unit within range of one or more of your Vowed objectives, add 1 to the Wound roll.`,
      },
      stratagems: [
        armourOfContempt('Inner Circle Task Force'),
        {
          name: 'Relic Teleportarium',
          sublabel: 'Inner Circle Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Deathwing employ ancient and incredibly powerful teleportariums, some older than the Great Crusade, to strike at their foes with unparalleled safety and accuracy.',
          when: 'Your Movement phase.',
          target: 'One Deathwing unit from your army that is arriving using the Deep Strike ability this phase.',
          // Faction-Pack Rules Update: 3" → 6".
          effect: 'Your unit can be set up anywhere on the battlefield that is more than 6" horizontally away from all enemy models.',
          restrictions: 'Until the end of the turn, your unit is not eligible to declare a charge.',
        },
        {
          name: 'Martial Mastery',
          sublabel: 'Inner Circle Task Force – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The warriors of the Deathwing fight with the honed skill and lethality of knightly champions.',
          when: 'Fight phase.',
          target: 'One Deathwing Infantry unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, re-roll a Wound roll of 1. If your unit is within range of your Vowed objective marker, you can re-roll the Wound roll instead.',
          restrictions: '',
        },
        {
          name: 'Wrath of the Lion',
          sublabel: 'Inner Circle Task Force – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Channelling the strategic puissance and measured ferocity of their gene-sire, the veterans of the Unforgiven unleash a perfectly timed and utterly lethal storm of tightly controlled violence.',
          when: 'Your Charge phase.',
          target: 'One Deathwing Infantry unit from your army that just ended a Charge move.',
          effect: 'Select one enemy unit within Engagement Range of your unit and roll one D6 for each model in your unit, adding 1 to the result if that enemy unit is within range of your Vowed objective marker: for each 4+, that enemy unit suffers 1 mortal wound (to a maximum of 3 mortal wounds).',
          restrictions: '',
        },
        {
          name: 'Duty unto Death',
          sublabel: 'Inner Circle Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'So driven by duty are the veterans of the Unforgiven that even death cannot keep them from it.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One Deathwing unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 if your unit is within range of your Vowed objective marker. On a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Unmatched Fortitude',
          sublabel: 'Inner Circle Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'In the name of their oaths to Chapter, Primarch and Emperor, the Deathwing march into the fiercest firestorms and refuse to falter.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: 'One Deathwing Infantry unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: "Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than your unit's Toughness characteristic, subtract 1 from the Wound roll.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Champion of the Deathwing',
          points: 15,
          flavor: 'Even amongst the elite of the Unforgiven, this warrior is a paragon of duty and martial might.',
          body: `Deathwing model only. Melee weapons equipped by the bearer have the [LETHAL HITS] ability, and each time the bearer makes a melee attack, if it is within range of your Vowed objective marker, a Critical Hit is scored on an unmodified Hit roll of 5+.`,
        },
        {
          name: 'Eye of the Unseen',
          points: 10,
          flavor: 'It is said that no secret can escape the gaze of this ocular augmetic, which belonged first to the feared Interrogator-Chaplain Enoch.',
          body: `Deathwing model only. Each time you target the bearer's unit with a Stratagem, roll one D6, adding 1 if the bearer is within range of your Vowed objective marker: on a 5+, you gain 1CP.`,
        },
        {
          name: 'Singular Will',
          points: 20,
          flavor: 'This warrior lets nothing stand in their way or slow their advance, closing swiftly and relentlessly with their quarry.',
          body: `Deathwing model only. Each time the bearer's unit Piles In or Consolidates, models in that unit can move an additional 3".`,
        },
        {
          name: 'Deathwing Assault',
          points: 30,
          flavor: 'Employing shock assault doctrines requiring ancient technology and immense tactical skill, the Deathwing are masters of catching their foes wholly unawares.',
          body: `Deathwing model with the Deep Strike ability only. The bearer's unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.`,
        },
      ],
    },

    {
      id: 'company-of-hunters',
      name: 'Company of Hunters',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Masters of Manoeuvre',
        flavor:
          'The Ravenwing are fearsome and daring hunters, relentless in pursuit and furious on the assault. When they lead the Dark Angels to war they inspire their battle-brothers with their strategic and tactical mastery of high-speed warfare, knightly bike-mounted venators leading every charge and rapidly outmanoeuvring the foe.',
        // Faction-Pack Rules Update rewrote both the rule and the Keywords section.
        body: `Adeptus Astartes units from your army are eligible to shoot in a turn in which they Advanced or Fell Back. Adeptus Astartes Mounted units from your army are eligible to shoot and declare a charge in a turn in which they Advanced or Fell Back.

### Keywords
Outrider Squad units from your army gain the Battleline keyword.`,
      },
      stratagems: [
        {
          name: "Hunter’s Trail",
          sublabel: 'Company of Hunters – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Using augur beacons, servo-skulls and the like, the Ravenwing mark locations they have passed through and cleansed of foes, laying a trail their fellows can follow on the hunt.',
          when: 'Command phase.',
          target: 'One Ravenwing Mounted unit from your army that is within range of an objective marker you control.',
          effect: 'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the start or end of any turn.',
          restrictions: '',
        },
        {
          name: 'Death on the Wind',
          sublabel: 'Company of Hunters – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Ravenwing employ shock tactics and focussed firepower to tear bloody paths through the enemy ranks, shattering resistance and clearing the way to their true quarry.',
          when: 'Your Shooting phase.',
          target: 'One Ravenwing unit from your army that has just shot.',
          effect: 'Select one enemy unit that was hit by one or more of those attacks. That unit must take a Battle-shock test. When doing so, if one or more Ravenwing units from your army are within 6" of that enemy unit, subtract 1 from the test.',
          restrictions: '',
        },
        armourOfContempt('Company of Hunters'),
        {
          name: 'High-Speed Focus',
          sublabel: 'Company of Hunters – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Even when travelling at breakneck pace, the Ravenwing control their vehicles with consummate skill and are able to jink and dodge around incoming enemy fire.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: 'One Ravenwing unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Talon Strike',
          sublabel: 'Company of Hunters – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Be it their true quarry or simply one who possesses knowledge that will lead them to their apprehension, when the Ravenwing strike at a priority target they do so with unmerciful surety.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Ravenwing Mounted unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an Infantry Character or Mounted Character unit, add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Rapid Reappraisal',
          sublabel: 'Company of Hunters – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The Ravenwing scan and analyse their foes' strategic dispositions constantly, augury and aerial surveillance helping to watch that no quarry slips their closing net. They are quick to redirect combat assets should such a risk present itself.",
          when: "End of your opponent's Fight phase.",
          target: 'One Ravenwing unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Master-crafted Weapon',
          points: 10,
          flavor: "Those who command the Ravenwing on their hunts are often honoured with a masterwork blade, mace or other deadly close-quarters weapon. Such implements are fashioned by the Chapter's artificers and weighted perfectly to be wielded from the saddle of a speeding armoured steed.",
          body: `Ravenwing model only. Melee weapons equipped by the bearer have the [PRECISION] ability.`,
        },
        {
          name: 'Mounted Strategist',
          points: 30,
          flavor: 'This warrior has mastered the art of such advanced ploys as feigning flight only to turn swiftly upon overextended foes and launch a devastating counter-offensive to shatter their lines.',
          // Faction-Pack Rules Update rewrote this enhancement.
          body: `Ravenwing model only. You can re-roll Advance and Charge rolls made for the bearer's unit.`,
        },
        {
          name: 'Master of Manoeuvre',
          points: 15,
          flavor: "Daring and audacious, this commander favours breakneck outflanking manoeuvres that allow them to plunge into the enemy's midst from unexpected quarters.",
          body: `Ravenwing model only. If the bearer's unit starts the battle in Strategic Reserves, its points value does not count towards the combined points limit for units from your army that are in Strategic Reserve, and for the purposes of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.`,
        },
        {
          name: 'Recon Hunter',
          points: 20,
          flavor: 'This commander is an expert scout as well as hunter, and takes advantage of these skills to seize the most advantageous position before battle begins.',
          body: `Ravenwing model only. Models in the bearer's unit have the Scouts 9" ability.`,
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: 'dark-age-arsenal',
      name: 'Dark Age Arsenal',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Invocations of Ancient Fury',
        flavor:
          'Amongst the ancient mysteries that the Dark Angels keep is knowledge of potent invocations to the most esoteric and mercurial of weapon spirits. With these, their battle-brothers are able to rouse their plasma weaponry to a destructive power that burns like the fiery hearts of stars.',
        body: `▪ Friendly Adeptus Astartes units' weapon profiles with 'Plasma' in their names are plasma weapon profiles.
▪ Plasma weapon profiles have +1 Strength.

**Restrictions:** ${daOnly}`,
      },
      stratagems: [
        {
          name: 'Searing Bursts',
          sublabel: 'Dark Age Arsenal – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When correctly calibrated and respectfully invoked, a plasma incinerator can fire blinding bolts that burst with searing energy. Those not killed are scorched and blistered by near misses.',
          when: 'Your Shooting phase, when a friendly Hellblaster Squad unit has shot.',
          target: 'That Hellblaster Squad unit.',
          effect: "Select one enemy unit hit by your unit's plasma ranged attacks. That enemy unit is seared until the start of your next turn:\n▪ While a unit is seared, that unit has 2\" Move.",
          restrictions: '',
        },
        {
          name: 'No Sacrifice Too Great',
          sublabel: 'Dark Age Arsenal – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "In extremis, the invoking of plasma coils' output may be pushed past even the tolerances proscribed by Mars. The price is one the Chapter is prepared to make.",
          when: 'Your Shooting phase, when a friendly Adeptus Astartes unit is selected to shoot.',
          target: 'That Adeptus Astartes unit.',
          effect: "Your unit's [HAZARDOUS] plasma ranged attacks have +1 Strength.",
          restrictions: '',
        },
        {
          name: 'Revelation of Guilt',
          sublabel: 'Dark Age Arsenal – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The weapon spirits of the Dark Angels are known to despise guilt, and gunners who chant the foe\'s unrepentant acts may be rewarded with merciless precision.',
          when: 'Your Shooting phase, when a friendly Adeptus Astartes unit is selected to shoot.',
          target: 'That Adeptus Astartes unit.',
          effect: "Your unit's plasma ranged attacks have +1 to Hit rolls.",
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Petition of Stability',
          points: 15,
          upgrade: true,
          flavor: "With the correct runic activation sequence — and whispered appeals to the plasma coils' stability matrix — the effective reach of a weapon's killing power can be extended.",
          body: `Adeptus Astartes unit only. This unit's plasma attacks have +6" Range.`,
        },
        {
          name: 'Entreaty of Perpetual Ardour',
          points: 15,
          upgrade: true,
          flavor: "By stoking the spirits of their weapons, these Hellblasters keep their blazing ire in seething readiness to intercept the enemy's every treacherous act.",
          body: `Hellblaster Squad only. This unit's snap shooting attacks hit on unmodified Hit rolls of 5+.`,
        },
      ],
    },

    {
      id: 'darkflight-pursuit',
      name: 'Darkflight Pursuit',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Black-Winged Vigilance',
        flavor:
          'The antigrav skimmers and combat aircraft of the Ravenwing bristle not only with potent weapons but also with powerful augurs and trackers, whose sleepless machine spirits are as vigilant as the blackarmoured battle-brothers.',
        body: `▪ Friendly Ravenwing Fly units' ranged attacks have [IGNORES COVER].

**Restrictions:** ${daOnly}`,
      },
      stratagems: [
        {
          name: 'Skyborne Surveillance',
          sublabel: 'Darkflight Pursuit – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The auspicators of the Ravenwing are sleepless, and from ideal hunting vantages, there is nowhere the foe can hide for long.',
          when: 'Your Shooting phase, when a friendly Ravenwing Fly unit has shot.',
          target: 'That Ravenwing Fly unit.',
          effect: 'Visible enemy units within 6" of your unit have +3" detection range.',
          restrictions: '',
        },
        {
          name: 'Wings of Shadow',
          sublabel: 'Darkflight Pursuit – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Through subtle manoeuvring and empowered cameleoline armour, the swiftest of the Ravenwing evade attempts to bring their hunt to an end.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Ravenwing Fly unit.",
          target: 'That Ravenwing Fly unit.',
          effect: 'Your unit has Stealth.',
          restrictions: '',
        },
        {
          name: 'We Are Vengeance',
          sublabel: 'Darkflight Pursuit – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The Ravenwing's aerial assets are capable of swift and reactive manoeuvring to new firing positions, ensuring opportunities for rapid vengeance.",
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly unengaged Ravenwing Fly unit has shot.",
          target: 'That Ravenwing Fly unit.',
          effect: 'Your unit can make a Normal move of up to D3+3".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Thundercowl Turbines',
          points: 15,
          upgrade: true,
          flavor: "These masterwrought engines from the Dark Age of Technology churn the gloom emanated by the Ravenwing's reliquaries into a billowing cawl that shrouds their advance, allowing them to strike when the foe least expects.",
          body: `Ravenwing Fly unit only. In your first Movement phase, this unit can make an ingress move.`,
        },
        {
          name: 'Nightforged Battery',
          points: 15,
          upgrade: true,
          flavor: 'Use of these relic plasma storm batteries is granted only by dispensation of the Master of the Rock. They unleash devastating toroids of searing plasma, while their venting subsystems are known to be especially vigilant.',
          body: `Land Speeder Vengeance unit only. This unit can re-roll:
▪ Rolls to determine the Attacks of a weapon.
▪ Hazard rolls.`,
        },
      ],
    },

    {
      id: 'interrogation-conclave',
      name: 'Interrogation Conclave',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Dread Catechism',
        flavor:
          "When the Chapter's pitiless and dedicated Interrogator-Chaplains mark a foe, they are the target for a torturous and precise excruciation. Matters of truth are kept to the hidden cells of the Rock; these instead are matters of painful battlefield castigation to sow dread and fear in the enemies of the Dark Angels.",
        body: `▪ In the Fight phase, when a friendly Chaplain unit destroys an enemy unit, enemy units within 6" of that Chaplain unit make a Battle-shock roll.
▪ Friendly Chaplain units have the following ability:
▪ **Sower of Dread (Aura):** While an enemy unit is within 6" of this unit, that enemy unit has -1 Leadership.

**Restrictions:** ${daOnly}`,
      },
      stratagems: [
        {
          name: 'Exacting Punishment',
          sublabel: 'Interrogation Conclave – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "With a denunciatory roar, Chaplains lead their battle-brothers in focused assaults to root out the foe's reviled leaders.",
          when: 'Your Shooting phase or the Fight phase, when a friendly Chaplain unit is selected to attack.',
          target: 'That Chaplain unit.',
          effect: "Your unit's attacks have [PRECISION].",
          restrictions: '',
        },
        {
          name: 'Terrifying Zeal',
          sublabel: 'Interrogation Conclave – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The intensity with which the skull-masked Interrogator-Chaplains plunge into the fray can shake the hardiest warriors. All who face them feel the tiniest of guilts eating away at their soul.',
          when: 'Your Charge phase, when a friendly Chaplain unit ends a charge move.',
          target: 'That Chaplain unit.',
          effect: 'Select one enemy unit (excluding Monster/Vehicle units) engaged with your unit. That enemy unit makes a Leadership roll:\n▪ If that Leadership roll fails, that enemy unit\'s attacks have -1 to Hit rolls until the end of the turn.',
          restrictions: '',
        },
        {
          name: 'Wages of Cowardice',
          sublabel: 'Interrogation Conclave – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The spiritual leaders of the Dark Angels are ever watchful for lapses of conviction, and when displayed by the foe, they are the first to fervently capitalise on them.',
          when: "Your opponent's Movement phase, when an enemy unit that was engaged with a friendly Chaplain unit ends a Fall Back move, if that Chaplain unit is unengaged.",
          target: 'That Chaplain unit.',
          effect: 'Your unit can make a Normal move of up to D3+3".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Limitless Zeal',
          points: 10,
          flavor: 'This Interrogator-Chaplain is restless and dynamic, not only in his pursuit of enemies but also when eliciting their screamed confessions.',
          body: `Chaplain model only. This unit has +1 to Charge rolls.`,
        },
        {
          name: 'Inescapable Interrogation',
          points: 20,
          flavor: 'Whatever physical obfuscation the enemy hides behind mirrors only the lies shrouding their souls. This experienced Chaplain is deceived by neither.',
          body: `Chaplain model only. This unit's ranged attacks have [IGNORES COVER].`,
        },
      ],
    },

    {
      id: 'lions-blade-task-force',
      name: "Lion's Blade Task Force",
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: "In the Lion's Claws",
        flavor:
          "There is no more significant duty to the Dark Angels' Inner Circle than the pursuit and capture of the Fallen. A Lion's Blade Task Force combines the speed, manoeuvrability and firepower of the Ravenwing with the obdurate might of the Deathwing. Those unfortunate enough to be caught between the devastating speed of the Ravenwing and the adamantine might of the Deathwing are pinned in place and torn to shreds by their combined fury.",
        body: `▪ Each time an enemy unit (excluding Monsters and Vehicles) within Engagement Range of one or more Ravenwing units from your army Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.
▪ Each time a Deathwing unit from your army declares a charge, if one or more targets of that charge are within Engagement Range of one or more Ravenwing units from your army, add 2 to the Charge roll.

**Restrictions:** ${daOnly}`,
      },
      stratagems: [
        {
          name: 'Overpowering Exaction',
          sublabel: "Lion's Blade Task Force – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: "Engines roar, and teleportation flares erupt across the battlefield. Such is the din and ferocity of the Dark Angels' assault that even the most veteran foes are given cause to cower before it.",
          when: 'Command phase or the start of the Fight phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Select one enemy unit within Engagement Range of your unit. That enemy unit must take a Battle-shock test. When doing so, if your unit has the Deathwing or Ravenwing keyword, subtract 1 from the result.',
          restrictions: 'You can only use this Stratagem once per battle round.',
        },
        {
          name: 'Knights of Iron',
          sublabel: "Lion's Blade Task Force – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Atop their snarling mechanical steeds, the warriors of the Ravenwing surge through seemingly impassable terrain, smashing through rubble and ruin to unleash the wrath of the Unforgiven upon unsuspecting targets.',
          when: 'Your Movement phase or your Charge phase.',
          target: 'One Ravenwing unit from your army.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Normal, Advance or Charge move, it can move horizontally through terrain features.',
          restrictions: '',
        },
        armourOfContempt("Lion's Blade Task Force"),
        {
          name: 'Strength in Unity',
          sublabel: "Lion's Blade Task Force – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'Combining their specialised methods of warfare, the Ravenwing and Deathwing confound their enemies with high-speed manoeuvrability and stalwart fortitude.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: 'One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit\'s attacks.',
          effect: 'If that enemy unit is within Engagement Range of one or more Ravenwing units from your army, until the end of the phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll. If that enemy unit is within Engagement Range of one or more Deathwing units from your army, until the end of the phase, each time a model in that enemy unit makes an attack, if the Strength characteristic of that attack is greater than the Toughness characteristic of the target, subtract 1 from the Wound roll.',
          restrictions: 'A unit cannot be targeted by this and the Armour of Contempt Stratagem in the same phase.',
        },
        {
          name: 'Illuminating Fire',
          sublabel: "Lion's Blade Task Force – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Ravenwing vehicles tear across the battlefield, identifying priority threats and targeting them with volleys of killing fire. The storm of blazing fury serves as a beacon for the wrathful battle-brothers of the Inner Circle, who strive to bring final judgement to the foe.',
          when: 'Your Shooting phase, just after a Ravenwing unit from your army has selected its targets.',
          target: 'That Ravenwing unit.',
          effect: "Select one enemy unit within 12\" of your unit that was selected as the target of one or more of the attacking unit's attacks. Until the end of the phase, each time a friendly Deathwing unit makes an attack that targets that enemy unit, add 1 to the Wound roll.",
          restrictions: '',
        },
        {
          name: 'Inescapable Wrath',
          sublabel: "Lion's Blade Task Force – Strategic Ploy Stratagem",
          cp: '2CP',
          turn: 'opponent',
          flavor: "The Dark Angels' Inner Circle warriors pursue the Chapter's sworn foes and any who shield them with relentless endurance and a determination borne of indoctrinated hatred.",
          when: "End of your opponent's Charge phase.",
          target: 'One Deathwing Infantry or Deathwing Walker unit from your army that is within 6" of one or more enemy units and would be eligible to declare a charge against one or more of those enemy units if it were your Charge phase.',
          effect: 'Your unit now declares a charge that only targets one or more of those enemy units, and you resolve that charge.',
          restrictions: 'Note that even if this charge is successful, your unit does not receive any Charge bonus this turn.',
        },
      ],
      enhancements: [
        {
          name: 'Calibanite Armaments',
          points: 15,
          flavor: 'The eldest relic weapons of the Dark Angels trace their lineage to ancient Caliban and are wielded only by the greatest champions of the Unforgiven.',
          body: `Adeptus Astartes model only. Add 1 to the Damage characteristic of the bearer's melee weapons.`,
        },
        {
          name: 'Lord of the Hunt',
          points: 15,
          flavor: 'This veteran of the Ravenwing has spent mortal lifetimes in the saddle, leading mechanised cavalry to battle on countless worlds.',
          body: `Ravenwing model only. The bearer's unit is eligible to shoot and declare a charge in a turn in which it Fell Back, and you can re-roll Desperate Escape tests taken for models in the bearer's unit.`,
        },
        {
          name: 'Stalwart Champion',
          points: 25,
          flavor: 'Possessed of obdurate will, this warrior champion instils an indomitable resolve and absolute refusal to cede ground within his brothers.',
          body: `Captain, Chaplain or Lieutenant model only. While the bearer's unit is not Battle-shocked, add 1 to the Objective Control characteristic of models in the bearer's unit.`,
        },
        {
          name: 'Fulgus Magna',
          points: 20,
          flavor: 'This ancient teleport homer projects a powerful narrowband signal, enabling the teleportarium chambers of orbiting vessels to lock on to the bearer even amid severe atmospheric or empyric disturbances.',
          body: `Deathwing model only. Once per battle, at the end of your opponent's turn, if the bearer's unit is not within Engagement Range of one or more enemy units, the bearer can use this Enhancement. If it does, remove the bearer's unit from the battlefield and place it into Strategic Reserves.`,
        },
      ],
    },

    {
      id: 'wrath-of-the-rock',
      name: 'Wrath of the Rock',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Dutiful Tenacity',
        flavor:
          'Even amongst the Adeptus Astartes, the battle-brothers of the Dark Angels are renowned for their tenacity and resilience on the battlefield. When ordered to war, they are utterly relentless in pursuing their objectives, wading into fields of withering fire and shrugging off blows that would slay mortal warriors outright.',
        body: `Each time an attack targets an Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army, if the Strength characteristic of that attack is greater than the Toughness characteristic of that unit, subtract 1 from the Wound roll.`,
      },
      stratagems: [
        {
          name: 'Inescapable Justice',
          sublabel: 'Wrath of the Rock – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'The Dark Angels pursue their enemies relentlessly, eliminating one with ruthless precision before turning to the next.',
          when: 'Any phase, just after your Oath of Moment target is destroyed.',
          target: 'One Adeptus Astartes Character unit that is on the battlefield.',
          effect: 'Select one enemy unit within 12" and visible to your unit. That enemy unit becomes your Oath of Moment target until the start of your next Command phase.',
          restrictions: '',
        },
        {
          name: 'Tactical Mastery',
          sublabel: 'Wrath of the Rock – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When the constituent elements of the Dark Angels fight as one, the enemy is often overwhelmed and torn apart by the fluidity of the Chapter\'s rapid advances, tactical withdrawals and unexpected counter-offensives.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Advanced. If your unit has the Ravenwing keyword, it is also eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: "Lion's Will",
          sublabel: 'Wrath of the Rock – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Unflinching in their loyalty to Chapter and Primarch, Dark Angels battle-brothers seize and hold their objectives with unrelenting determination and zealous fury.',
          when: 'Command phase.',
          target: 'One Adeptus Astartes unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Until the start of your next Command phase, add 1 to the Objective Control characteristic of models in your unit. In addition, until the end of the turn, if your unit does not have the Deathwing, Ravenwing or Vehicle keyword, each time a model in your unit makes an attack, add 1 to the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Relics of the Dark Age',
          sublabel: 'Wrath of the Rock – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Amongst the many secrets hoarded by the Dark Angels are those technological in nature. The armouries of the Rock contain potent weapons unseen in the armouries of other Chapters.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, add 2 to the Strength characteristic of ranged weapons equipped by models in your unit.',
          restrictions: '',
        },
        armourOfContempt('Wrath of the Rock'),
        {
          name: 'Leonine Aggression',
          sublabel: 'Wrath of the Rock – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The Dark Angels are always aggressive in their waging of war, seizing any opportunity to pounce upon and annihilate their prey.',
          when: "End of your opponent's Charge phase.",
          target: 'One Adeptus Astartes unit from your army within 3" of one or more enemy units, or one Deathwing unit from your army within 6" of one or more enemy units.',
          effect: 'Your unit now declares a charge that only targets one or more of those enemy units, and you resolve that charge.',
          restrictions: 'Note that even if this charge is successful, your unit does not receive any Charge bonus this turn.',
        },
      ],
      enhancements: [
        {
          name: 'Tempered in Battle',
          points: 10,
          aura: true,
          flavor: 'A veteran of the Inner Circle, this warrior inspires those around them to hold the line amidst the heat and chaos of battle.',
          body: `Adeptus Astartes model only. While a friendly Adeptus Astartes unit is within 6" of this model, you can re-roll Battle-shock and Leadership tests taken for that unit.`,
        },
        {
          name: 'Ancient Weapons',
          points: 25,
          flavor: "The vaults of the Dark Angels contain many relics from Humanity's distant past. This soldier has been granted the honour of bearing such a weapon to battle.",
          body: `Adeptus Astartes model only. Improve the Strength characteristic of melee weapons equipped by the bearer by 2, and improve the Armour Penetration and Damage characteristics of those weapons by 1.`,
        },
        {
          name: 'Deathwing Assault',
          points: 15,
          flavor: 'A veteran inductee of the Inner Circle, this champion has served amongst the Deathwing for centuries and become an unmatched master of teleportarium insertions.',
          body: `Deathwing model with the Deep Strike ability only. The bearer's unit can be set up using the Deep Strike ability in the Reinforcements step of your first, second or third Movement phase, regardless of any mission rules.`,
        },
        {
          name: 'Lord of the Ravenwing',
          points: 10,
          flavor: 'This commander has mastered the art of cavalry combat, instinctively noticing the opportune position to strike and navigating the chaos of battle with preternatural precision.',
          body: `Ravenwing model only. You can re-roll Advance and Charge rolls made for the bearer's unit.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const darkAngels = { en, ru: en }
