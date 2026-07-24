// Space Marines (Adeptus Astartes) — faction rules. Resolved from the same source priority
// as Necrons (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex > Index.
//
//   Codex: Space Marines  → army rule (Oath of Moment) + 7 base detachments.
//   Faction Pack (v1.0)   → 15 extra detachments + Rules Updates (folded in below).
//   MFM                   → per-enhancement points, per-detachment dp / forceDisposition.
//
// 22 detachments total, matching the MFM list. Faction-Pack "Rules Updates" have been applied
// to the codex detachments (they are the authoritative newer wording) — see inline notes.
// Chapter-locked faction-pack detachments carry their restriction as a paragraph in the rule body.
//
// EN-first: `ru` reuses the same object for now. Markup follows RuleBlock / StratCard conventions:
// [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet lines. Datasheets are a later pass.

// Shared "Armour of Contempt" stratagem — printed in most detachments with the same text
// (Faction-Pack Rules Update reworded the Effect to "until the attacking unit has finished…").
const armourOfContempt = (det) => ({
  name: 'Armour of Contempt',
  sublabel: `${det} – Battle Tactic Stratagem`,
  cp: '1CP',
  turn: 'opponent',
  flavor:
    'The belligerence of the Adeptus Astartes, combined with their post-human physiology, makes them unyielding foes to face.',
  when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
  target:
    "One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
  effect:
    'Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the [gloss:armour-penetration:Armour Penetration] characteristic of that attack by 1.',
  restrictions: '',
})

const en = {
  slug: 'space-marines',
  name: 'Space Marines',

  // Chapters of this codex (the second Faction keyword on datasheets — see the
  // "Space Marine Chapters" army-rule block). Language-agnostic: keywords stay
  // English in both locales. Drives the chapter picker on the faction pages;
  // chapter-locked faction-pack detachments carry a matching `chapter` field.
  chapters: ['Imperial Fists', 'Iron Hands', 'Raven Guard', 'Salamanders', 'Ultramarines', 'White Scars'],

  armyRule: {
    id: 'oath-of-moment',
    name: 'Oath of Moment',
    flavor:
      'In battle, Space Marines swear mighty oaths to destroy the enemies of the Emperor and uphold the honour of their Chapter, and such vows are sacrosanct. When the Angels of Death strike, they do so with the precision of a surgeon and the force of a thunderbolt. Experience and strategic expertise help them to read the shifting shape of the battle with post-human speed and clarity, directing their wrath towards one priority target after another.',
    // Faction-Pack Rules Update adds the "add 1 to the Wound roll" clause for Codex SM detachments.
    body: `If your [gloss:army-faction:Army Faction] is Adeptus Astartes, at the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your [gloss:sm-oath-of-moment:Oath of Moment target]. Each time a model with this ability makes an attack that targets your Oath of Moment target:
▪ You can [gloss:re-roll:re-roll] the [gloss:hit-roll:Hit roll].
▪ If you are using a Codex: Space Marines [gloss:detachments:Detachment] and your army does not include one or more units with the Black Templars, Blood Angels, Dark Angels, Deathwatch or Space Wolves [gloss:keywords:keywords], or one or more units from those factions' Munitorum Field Manual sections, add 1 to the [gloss:wound-roll:Wound roll] as well.

**Space Marine Chapters:**
▪ If an Adeptus Astartes unit has a second [gloss:faction-keyword:Faction keyword] on its [gloss:datasheet:datasheet], that Faction keyword is the name of that unit's Chapter. For example, Marneus Calgar has both the Adeptus Astartes and Ultramarines Faction keywords, and is therefore from the Ultramarines Chapter.
▪ You cannot include units from more than one Chapter in your army.`,
  },

  detachments: [
    // ───────────────────────── CODEX BASE DETACHMENTS ─────────────────────────
    {
      id: 'gladius-task-force',
      name: 'Gladius Task Force',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Combat Doctrines',
        flavor:
          'The Codex Astartes has proven its worth as a treatise on warfare over countless battlefields across ten thousand years. Many Space Marines hold its wisdom in awe, and exemplify its teachings, employing a flexible set of combat doctrines to eliminate their enemy.',
        body: `At the start of your Command phase, you can select one of the [gloss:sm-combat-doctrine:Combat Doctrines] listed below. Until the start of your next Command phase, that Combat Doctrine is active and its effects apply to all Adeptus Astartes units from your army. You can only select each Combat Doctrine once per battle.

### Devastator Doctrine
This unit is [gloss:eligible-to-shoot:eligible to shoot] in a turn in which it [gloss:advance:Advanced].

### Tactical Doctrine
This unit is eligible to shoot and [gloss:declare-charge:declare a charge] in a turn in which it [gloss:fall-back-move:Fell Back].

### Assault Doctrine
This unit is [gloss:eligible-to-charge:eligible to declare a charge] in a turn in which it Advanced.`,
      },
      stratagems: [
        armourOfContempt('Gladius Task Force'),
        {
          name: 'Only in Death Does Duty End',
          sublabel: 'Gladius Task Force – Epic Deed Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'Imminent death does not prevent a Space Marine from enacting their final justice upon the enemies of the Imperium.',
          when: 'Fight phase, just after an enemy unit has [gloss:select-targets:selected its targets].',
          target: "One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a model in your unit is [gloss:destroyed:destroyed], if that model has not fought this phase, do not remove it from play. The destroyed model can fight after the attacking model's unit has finished making its attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: 'Honour the Chapter',
          sublabel: 'Gladius Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Every Chapter has forged its own tales of heroism, and none of its battle-brothers would see that noble record besmirched.',
          when: 'Fight phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Until the end of the phase, [gloss:melee-weapons:melee weapons] equipped by models in your unit have the [LANCE] ability. If your unit is under the effects of the Assault [gloss:sm-combat-doctrine:Doctrine], until the end of the phase, improve the [gloss:armour-penetration:Armour Penetration] characteristic of such weapons by 1 as well.',
          restrictions: '',
        },
        {
          name: 'Adaptive Strategy',
          sublabel: 'Gladius Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The tenets of the Codex Astartes allow for unorthodox use of combat tactics and the employment of divergent doctrines if doing so will lead to victory.',
          when: 'Your Command phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Select the Devastator Doctrine, Tactical Doctrine or Assault Doctrine. Until the start of your next Command phase, that [gloss:sm-combat-doctrine:Combat Doctrine] is active for that unit instead of any other Combat Doctrine that is active for your army, even if you have already selected that Combat Doctrine this battle.',
          restrictions: '',
        },
        {
          name: 'Storm of Fire',
          sublabel: 'Gladius Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'There is no escaping the wrath of the Space Marines, and they use their weapons to bring swift death to their foes wherever they may hide.',
          when: 'Your Shooting phase.',
          // Faction-Pack Rules Update: target now "has not been selected to shoot this phase".
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in your unit have the [IGNORES COVER] ability. If your unit is under the effects of the Devastator [gloss:sm-combat-doctrine:Doctrine], until the end of the phase, improve the [gloss:armour-penetration:Armour Penetration] characteristic of such weapons by 1 as well.',
          restrictions: '',
        },
        {
          name: 'Squad Tactics',
          sublabel: 'Gladius Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Space Marines know precisely when to give ground in order to leave their enemies floundering, before surging back into the fight and driving them from the field in disarray.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, [gloss:advance-move:Advance] or [gloss:fall-back-move:Fall Back] move.",
          // Faction-Pack Rules Update: 9" changed to 8".
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that is [gloss:within:within] 8" of the enemy unit that just ended that move.',
          effect: 'Your unit can make a [gloss:normal-move:Normal move] of up to D6", or a Normal move of up to 6" instead if it is under the effects of the Tactical [gloss:sm-combat-doctrine:Doctrine].',
          restrictions: 'You cannot select a unit that is within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
        },
      ],
      enhancements: [
        {
          name: 'Adept of the Codex',
          points: 20,
          flavor: 'An ardent student of the Codex Astartes, this commander epitomises its tactical genius, and the wisdom gleaned from its teachings guides their measured strategic responses amidst the fiercest battle.',
          body: `Captain model only. At the start of your Command phase, if the [gloss:bearer:bearer] is on the battlefield, instead of selecting a [gloss:sm-combat-doctrine:Combat Doctrine] to be active for your army, you can select the Tactical Doctrine. If you do, until the start of your next Command phase, that Combat Doctrine is active for the bearer's unit only, even if you have already selected that Combat Doctrine to be active for your army this battle.`,
        },
        {
          name: 'Artificer Armour',
          points: 20,
          flavor: "Crafted by the Chapter's finest artificers, this suit of armour provides superior protection.",
          body: `Adeptus Astartes model only. The [gloss:bearer:bearer] has a [gloss:save:Save] characteristic of 2+ and the Feel No Pain 5+ ability.`,
        },
        {
          name: 'Fire Discipline',
          points: 25,
          flavor: "This commander drills his warriors relentlessly; combined with the Adeptus Astartes' incredible reflexes, they produce a devastating rate of fire.",
          // Faction-Pack Rules Update reworded this enhancement.
          body: `Adeptus Astartes model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, [gloss:ranged-weapons:ranged weapons] equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, while the bearer's unit is under the effects of the Devastator [gloss:sm-combat-doctrine:Doctrine], you can [gloss:re-roll:re-roll] [gloss:advance-roll:Advance rolls] made for that unit.`,
        },
        {
          name: 'The Honour Vehement',
          points: 15,
          flavor: "This stanza is inscribed on thrice-blessed parchment and affixed to its bearer's wargear with a purity seal, there to inspire them to heroic acts of martial prowess.",
          body: `Adeptus Astartes model only. Add 1 to the Attacks and [gloss:strength:Strength] characteristics of the [gloss:bearer:bearer]'s [gloss:melee-weapons:melee weapons]. While the bearer is under the effects of the Assault [gloss:sm-combat-doctrine:Doctrine], add 2 to the Attacks and Strength characteristics of the bearer's melee weapons instead.`,
        },
      ],
    },

    {
      id: 'anvil-siege-force',
      name: 'Anvil Siege Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Shield of the Imperium',
        flavor:
          'Across blood-drenched battlefields, within towering citadels and isolated orbital stations, the Angels of Death throw back tides of traitors, mutants, xenos and heretics, and purge enemy holdings of foes thanks to their disciplined strategies and fighting skills.',
        body: `[gloss:ranged-weapons:Ranged weapons] equipped by Adeptus Astartes models from your army have the [HEAVY] ability. If such a weapon already has this ability, each time an attack is made with that weapon, if the attacking model's unit [gloss:remain-stationary:Remained Stationary] this turn, add 1 to the [gloss:wound-roll:Wound roll].`,
      },
      stratagems: [
        armourOfContempt('Anvil Siege Force'),
        {
          name: 'No Threat Too Great',
          sublabel: 'Anvil Siege Force – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'To combat an entrenched force of Space Marines, foes resort to armoured vehicles or packs of murderous monstrosities. Even the greatest of behemoths has a chink in its armour and the Adeptus Astartes are well versed in exploiting such weaknesses.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a [gloss:ranged-attacks:ranged attack] that targets a Monster or Vehicle unit, you can [gloss:re-roll:re-roll] the [gloss:wound-roll:Wound roll].',
          restrictions: '',
        },
        {
          name: 'Rigid Discipline',
          sublabel: 'Anvil Siege Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Cleaving to duty, the Adeptus Astartes refuse to be drawn out of position. Instead they secure ground to establish new fire lines to the enemy.',
          when: 'End of the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that is within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
          effect: 'Your unit can immediately make a [gloss:fall-back-move:Fall Back] move of up to 6".',
          restrictions: 'When making that move, your unit must end that move either [gloss:wholly-within:wholly within] your [gloss:deployment-zone:deployment zone] or within range of an [gloss:objective-marker:objective marker].',
        },
        {
          name: 'Battle Drill Recall',
          sublabel: 'Anvil Siege Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Space Marines train for countless hours to master their weapons and in the heat of battle can trigger mnemonic patterning to recall their ritual drills and ensure the foe's destruction.",
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in your unit have the [SUSTAINED HITS 1] ability. If your unit [gloss:remain-stationary:Remained Stationary] this turn, then until the end of the phase, each time a model in your unit makes a ranged attack, a successful unmodified [gloss:hit-roll:Hit roll] of 5+ scores a [gloss:critical-hit:Critical Hit].',
          restrictions: '',
        },
        {
          name: 'Not One Backwards Step',
          sublabel: 'Anvil Siege Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Siege warfare is incomparably brutal. Space Marines battle with the fiercest determination to achieve victory, and will fight unto death to hold every defensive line or to secure gains they have wrested from the enemy.',
          when: 'Your Command phase.',
          target: 'One Adeptus Astartes Infantry unit from your army within range of an [gloss:objective-marker:objective marker].',
          effect: 'Until the end of the turn, double the [gloss:objective-control:Objective Control] characteristic of models in your unit, but it must [gloss:remain-stationary:Remain Stationary] this turn.',
          restrictions: '',
        },
        {
          name: 'Hail of Vengeance',
          sublabel: 'Anvil Siege Force – Strategic Ploy Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: "Space Marines' incredible battlefield awareness enables them to instinctively identify the origin of any enemy fire and punish their attackers.",
          when: "Your opponent's Shooting phase, just after an enemy unit has [gloss:resolve-attacks:resolved its attacks].",
          target: "One Adeptus Astartes unit from your army that had one or more of its models [gloss:destroyed:destroyed] as a result of the attacking unit's attacks.",
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Architect of War',
          points: 25,
          flavor: 'There are few who have a deeper understanding of the tenets of siege warfare than this warrior.',
          body: `Adeptus Astartes model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, [gloss:ranged-weapons:ranged weapons] equipped by models in that unit have the [IGNORES COVER] ability.`,
        },
        {
          name: 'Fleet Commander',
          points: 15,
          flavor: "The Chapter's orbiting warships stand ready to unleash devastation at this leader's command.",
          body: `Captain model only. Once per battle, at the start of your Shooting phase, you can select one point on the battlefield and place a marker on that point. At the start of your next Shooting phase, place another marker on the battlefield [gloss:within:within] 12" of the centre of the first marker, then draw a straight line between the centre of each of these markers. Roll one D6 for each unit that line passes over or through: on a 3+, that unit suffers D3 [gloss:mortal-wound:mortal wounds]. Both markers are then removed.`,
        },
        {
          name: 'Indomitable Fury',
          points: 20,
          flavor: 'This hero refuses to yield whilst foes remain, fighting back from the brink of death like a vengeful demigod.',
          body: `Gravis model only. The first time the [gloss:bearer:bearer] is [gloss:destroyed:destroyed], roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within [gloss:engagement-range:Engagement Range] of any enemy units, with its full [gloss:wounds:wounds] remaining.`,
        },
        {
          name: 'Stoic Defender',
          points: 15,
          flavor: 'This commander and their warriors hold their ground tenaciously against even overwhelming numbers.',
          body: `Adeptus Astartes model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, models in that unit have the Feel No Pain 6+ ability while they are within range of an [gloss:objective-marker:objective marker] you control and, while that unit is [gloss:battle-shocked:Battle-shocked], halve the [gloss:objective-control:Objective Control] characteristic of models in that unit instead of changing it to 0.`,
        },
      ],
    },

    {
      id: 'ironstorm-spearhead',
      name: 'Ironstorm Spearhead',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Armoured Wrath',
        flavor:
          "An Ironstorm Spearhead's commanders guide their assault with pre-cogitated fire solutions, cycling data-gheist inloads and whispered binharic auguries. These ensure their warriors, and the belligerent machine spirits inhabiting their war engines, deliver their fire with inescapable accuracy.",
        body: `Once per phase for each Adeptus Astartes unit in your army, you can [gloss:re-roll:re-roll] one [gloss:hit-roll:Hit roll], one [gloss:wound-roll:Wound roll] or one [gloss:damage-roll:Damage roll] made for a model in that unit.`,
      },
      stratagems: [
        {
          name: 'Unbowed Conviction',
          sublabel: 'Ironstorm Spearhead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Space Marines exemplify obdurate tenacity. Even injured, they will never abandon their oaths.',
          when: 'Command phase.',
          target: 'One Adeptus Astartes unit from your army that is [gloss:below-starting-strength:below its Starting Strength].',
          effect: 'Until the end of the turn, your unit can ignore any or all [gloss:modifier:modifiers] to its characteristics and/or to any roll or test made for it (excluding modifiers to [gloss:save-roll:saving throws]).',
          restrictions: '',
        },
        armourOfContempt('Ironstorm Spearhead'),
        {
          name: 'Mercy Is Weakness',
          sublabel: 'Ironstorm Spearhead – Battle Tactic Stratagem',
          // Faction-Pack Rules Update: CP cost changed to 2CP.
          cp: '2CP',
          turn: 'your',
          flavor: 'Once a foe is marked for destruction, the Angels of Death must not relent until the target is annihilated.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a unit that is [gloss:below-starting-strength:below its Starting Strength], that attack has the [SUSTAINED HITS 1] ability, and when making such an attack, if the attacking model is a Vehicle, a successful unmodified [gloss:hit-roll:Hit roll] of 5+ scores a [gloss:critical-hit:Critical Hit].',
          restrictions: '',
        },
        {
          name: 'Vengeful Animus',
          sublabel: 'Ironstorm Spearhead – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "Carefully cogitated binharic prayers can focus a machine spirit's ire into near-obsessive hatred of its slayers, ensuring that vengeance is meted out even in death.",
          when: 'Any phase, just after an Adeptus Astartes Vehicle model from your army with the Deadly Demise ability is [gloss:destroyed:destroyed].',
          target: 'That Adeptus Astartes Vehicle model. You can use this Stratagem on that model even though it was just destroyed.',
          effect: "Do not roll one D6 to determine whether [gloss:mortal-wound:mortal wounds] are inflicted by your model's Deadly Demise ability. Instead, mortal wounds are automatically inflicted.",
          restrictions: '',
        },
        {
          name: 'Ancient Fury',
          sublabel: 'Ironstorm Spearhead – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The heroes entombed within Dreadnoughts have fought across countless war zones throughout their extended existences, perfecting their martial prowess beyond mortal limits.',
          when: 'Your Command phase.',
          target: 'One Adeptus Astartes Walker model from your army.',
          // Faction-Pack Rules Update: removed "Save" from the improved characteristics.
          effect: "Until the start of your next Command phase, improve your model's [gloss:move-characteristic:Move], [gloss:toughness:Toughness], [gloss:leadership:Leadership] and [gloss:objective-control:Objective Control] characteristics by 1 and each time your model makes an attack, add 1 to the [gloss:hit-roll:Hit roll].",
          restrictions: '',
        },
        {
          name: 'Power of the Machine Spirit',
          sublabel: 'Ironstorm Spearhead – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'There are many tales of machine spirits wreaking havoc on the foe, even after the crew of their vehicle are slain and critical systems are failing.',
          when: "Your opponent's Shooting phase, just after an enemy unit has [gloss:resolve-attacks:resolved its attacks].",
          target: "One Adeptus Astartes Vehicle unit from your army that was reduced to [gloss:half-strength:Below Half-strength] as a result of the attacking unit's attacks.",
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Adept of the Omnissiah',
          points: 35,
          flavor: 'This battle-brother is steeped in hidden technological rites. Should their armoured charges be threatened, a burst of arcane binharic screed can rouse their machine spirits to vigilance.',
          body: `Techmarine model only. Once per [gloss:battle-round:battle round], when a [gloss:save-roll:saving throw] is failed for a [gloss:friendly:friendly] Adeptus Astartes Vehicle model [gloss:within:within] 6" of the [gloss:bearer:bearer], you can change the Damage characteristic of that attack to 0.`,
        },
        {
          name: 'Master of Machine War',
          points: 20,
          flavor: "This commander is supremely gifted in the strategies of armoured warfare, understanding the capabilities of every war engine in the Chapter's arsenal.",
          // Faction-Pack Rules Update: no longer an Aura; reworded to a Command-phase selection.
          body: `Adeptus Astartes model only. In your Command phase, select one Adeptus Astartes Vehicle model [gloss:within:within] 6" of the [gloss:bearer:bearer]. Until the start of your next Command phase, that Vehicle is [gloss:eligible-to-shoot:eligible to shoot] even if it [gloss:fall-back-move:Fell Back] or [gloss:advance:Advanced] this turn.`,
        },
        {
          name: 'Target Augury Web',
          points: 30,
          flavor: 'This spearhead commander uses advanced augmetics to distribute targeting data, directing the fire of their war engine crews and rousing their machine spirits to operative superiority.',
          // Faction-Pack Rules Update: no longer an Aura; reworded to a Command-phase selection.
          body: `Techmarine model only. In your Command phase, select one Adeptus Astartes Vehicle model [gloss:within:within] 6" of the [gloss:bearer:bearer]. Until the start of your next Command phase, weapons equipped by that Vehicle model have the [LETHAL HITS] ability.`,
        },
        {
          name: 'The Flesh Is Weak',
          points: 20,
          flavor: 'The injuries of past battles have seen this warrior heavily rebuilt with ultra-durable cybernetic limbs and organs that render them extremely difficult to kill.',
          body: `Adeptus Astartes model only. The [gloss:bearer:bearer] has the Feel No Pain 4+ ability.`,
        },
      ],
    },

    {
      id: 'firestorm-assault-force',
      name: 'Firestorm Assault Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Close-range Eradication',
        flavor:
          'The Space Marines are the Emperor\'s finest shock troops, striking at the foe before they can react. In their rapid, mechanised assaults, Space Marines smash aside the enemy, destroying them at close quarters without mercy.',
        body: `[gloss:ranged-weapons:Ranged weapons] equipped by Adeptus Astartes models from your army have the [ASSAULT] ability, and each time an attack made with such a weapon targets a unit [gloss:within:within] 12", add 1 to the [gloss:strength:Strength] characteristic of that attack.`,
      },
      stratagems: [
        armourOfContempt('Firestorm Assault Force'),
        {
          name: 'Immolation Protocols',
          sublabel: 'Firestorm Assault Force – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: 'Salvo after salvo of burning promethium unleashed in synchronised waves will leave almost any foe as smouldering ash.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, Torrent weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.',
          restrictions: '',
        },
        {
          name: 'Crucible of Battle',
          sublabel: 'Firestorm Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Only where the enemy can be faced eye to eye can a Space Marine be truly tested.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets the closest eligible target [gloss:within:within] 6", add 1 to the [gloss:wound-roll:Wound roll].',
          restrictions: '',
        },
        {
          name: 'Onslaught of Fire',
          sublabel: 'Firestorm Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Armed with targeting data supplied by their transport's augury gheists, warriors erupt from the assault ramps with weapons blazing in ruthless eradication patterns.",
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that [gloss:disembark:disembarked] from a [gloss:transport:Transport] this turn and has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes a [gloss:ranged-attacks:ranged attack] that targets the closest eligible target [gloss:within:within] 12\", add 1 to the [gloss:hit-roll:Hit roll]. If one or more enemy models are [gloss:destroyed:destroyed] as the result of any of those attacks, select one of those destroyed models; that destroyed model's unit must take a [gloss:battle-shock-test:Battle-shock test].",
          restrictions: '',
        },
        {
          name: 'Rapid Embarkation',
          sublabel: 'Firestorm Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: "No time can be wasted in punishing the Emperor's foes. Many are those that deserve death and once one enemy is vanquished, soon must another follow.",
          when: 'End of the Fight phase.',
          target: 'One Adeptus Astartes Transport unit from your army that has no models [gloss:embarked:embarked] within it, and one Adeptus Astartes Infantry unit from your army [gloss:wholly-within:wholly within] 6" of that Transport.',
          effect: 'Your Infantry unit can [gloss:embark:embark] within that Transport.',
          restrictions: 'You cannot target an Infantry unit that is within [gloss:engagement-range:Engagement Range] of one or more enemy units, that cannot normally embark within that Transport, or that [gloss:disembark:disembarked] from a Transport this turn.',
        },
        {
          name: 'Burning Vengeance',
          sublabel: 'Firestorm Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "To open fire on warriors of a Firestorm Assault Force is merely to invite one's own swift destruction.",
          when: "Your opponent's Shooting phase, just after an enemy unit has [gloss:resolve-attacks:resolved its attacks].",
          target: "One Adeptus Astartes Transport unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'One unit [gloss:embarked:embarked] within that Transport can [gloss:disembark:disembark] as if it were your Movement phase, and can then shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Adamantine Mantle',
          points: 20,
          flavor: 'This flowing cloak or finely wrought tabard is laced through with threads of braided adamantine.',
          body: `Adeptus Astartes model only. Each time an attack is allocated to the [gloss:bearer:bearer], subtract 1 from the Damage characteristic of that attack. If that attack was made with a Melta or Torrent weapon, change the Damage characteristic of that attack to 1 instead.`,
        },
        {
          name: 'Champion of Humanity',
          points: 10,
          flavor: 'This commander and their warriors have vowed to secure victory and defend the Imperium from the horrors of the galaxy.',
          body: `Tacticus model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, models in that unit can ignore any or all [gloss:modifier:modifiers] to their characteristics and/or to any roll or test made for them (excluding modifiers to [gloss:save-roll:saving throws]).`,
        },
        {
          name: 'Forged in Battle',
          points: 15,
          flavor: 'To this Angel of Death, war is the anvil upon which their strength is wrought.',
          // Faction-Pack Rules Update: change the result to an unmodified 6.
          body: `Adeptus Astartes model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, once per turn, after making a [gloss:hit-roll:Hit roll] or a [gloss:save-roll:saving throw] for a model in that unit, you can change the result of that roll to an unmodified 6.`,
        },
        {
          name: 'War-tempered Artifice',
          points: 25,
          flavor: "Having laboured long in the Chapter's forges, this warrior-smith has crafted his personal armaments.",
          body: `Adeptus Astartes Infantry model only. Add 3 to the [gloss:strength:Strength] characteristic of the [gloss:bearer:bearer]'s [gloss:melee-weapons:melee weapons].`,
        },
      ],
    },

    {
      id: 'stormlance-task-force',
      name: 'Stormlance Task Force',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Lightning Assault',
        flavor:
          'The warriors of a Stormlance Task Force employ high-speed tactics and hit-and-run warfare. They do battle on the move, wrong-footing their enemies with breakneck manoeuvres and melting away one moment only to crash home like a thunderbolt the next.',
        body: `Adeptus Astartes units from your army are [gloss:eligible-to-charge:eligible to declare a charge] in a turn in which they [gloss:advance:Advanced] or [gloss:fall-back-move:Fell Back].`,
      },
      stratagems: [
        armourOfContempt('Stormlance Task Force'),
        {
          name: 'Shock Assault',
          sublabel: 'Stormlance Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Adeptus Astartes are elite troops who strike with all the speed and fury of a searing thunderbolt.',
          when: 'Fight phase, when a friendly ADEPTUS ASTARTES unit is [gloss:selected-to-fight:selected to fight].',
          target: 'That ADEPTUS ASTARTES unit.',
          effect: 'Your unit’s [gloss:melee-attacks:melee attacks] have [LANCE].',
          restrictions: '',
        },
        {
          name: 'Blitzing Fusillade',
          sublabel: 'Stormlance Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Warriors of Stormlance Task Forces can suddenly pour heavy and accurate fire into the enemy even as they race to finish off any survivors.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in your unit have the [ASSAULT] ability. If such a weapon already has this ability, until the end of the phase, that weapon has the [SUSTAINED HITS 1] ability as well.',
          restrictions: '',
        },
        {
          name: 'Full Throttle',
          sublabel: 'Stormlance Task Force – Wargear Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: "On the eve of riding down the most elusive prey, the task force's expert Techmarines will entreat the engine spirits of their vehicles, honing the iron steeds' performance to elicit even more speed from them.",
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Mounted or Adeptus Astartes Vehicle unit (excluding Walkers) from your army.',
          effect: 'Until the end of the phase, if your unit [gloss:advance:Advances], do not make an [gloss:advance-roll:Advance roll] for it. Instead, until the end of the phase, add 6" to the [gloss:move-characteristic:Move characteristic] of models in your unit, or 9" instead if your unit is Mounted.',
          restrictions: '',
        },
        {
          name: 'Ride Hard, Ride Fast',
          sublabel: 'Stormlance Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Like zephyrs dancing across wide horizons, Space Marine riders and pilots can weave lithely around incoming fire with incredible skill.',
          when: "Your opponent's Shooting phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
          target: "One Adeptus Astartes Mounted or Adeptus Astartes Fly Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the [gloss:wound-roll:Wound roll].',
          restrictions: '',
        },
        {
          name: 'Wind-swift Evasion',
          sublabel: 'Stormlance Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Space Marines are loathe to be brought into combat on any others' terms, especially the warriors of Stormlance Task Forces, whose battlefield tactics revolve around speed and precise, ferocious assaults.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, [gloss:advance-move:Advance] or [gloss:fall-back-move:Fall Back] move.",
          // Faction-Pack Rules Update: target now Infantry/Mounted within 8".
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that is [gloss:within:within] 8" of that enemy unit.',
          effect: 'Your unit can make a [gloss:normal-move:Normal move] of up to 6".',
          restrictions: 'You cannot select a unit that is within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
        },
      ],
      enhancements: [
        {
          name: 'Feinting Withdrawal',
          points: 10,
          flavor: 'This living legend of the Chapter is known for their calm in the heat of battle, ever-observant of the ebbs and flows of the engagement.',
          body: `Adeptus Astartes model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, that unit is [gloss:eligible-to-shoot:eligible to shoot] in a turn in which it [gloss:fall-back-move:Fell Back].`,
        },
        {
          name: 'Fury of the Storm',
          points: 25,
          flavor: "This aggressive warrior channels their eagerness to kill into each and every strike. They hit the enemy's lines with all the ferocity of a raging tempest.",
          body: `Adeptus Astartes Mounted model only. Improve the [gloss:strength:Strength] and [gloss:armour-penetration:Armour Penetration] characteristics of the [gloss:bearer:bearer]'s [gloss:melee-weapons:melee weapons] by 1. Each time the bearer ends a [gloss:charge-move:Charge move], until the end of the turn, improve the Strength and Armour Penetration characteristics of the bearer's melee weapons by 2 instead.`,
        },
        {
          name: "Hunter's Instincts",
          points: 25,
          flavor: 'This mounted huntsman espouses the value of circling the enemy and striking suddenly from an unexpected quarter upon their speeding steed.',
          body: `Adeptus Astartes Mounted model only. If the [gloss:bearer:bearer]'s unit is in [gloss:strategic-reserves:Strategic Reserves], for the purposes of setting up that unit on the battlefield, treat the current [gloss:battle-round:battle round] number as being one higher than it actually is.`,
        },
        {
          name: 'Portents of Wisdom',
          points: 15,
          flavor: 'This warrior has been made privy to omens of great threats in the wars to come, entering battle with a boldness that some mistake for recklessness.',
          body: `Adeptus Astartes model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, you can [gloss:re-roll:re-roll] [gloss:advance-roll:Advance rolls] made for that unit.`,
        },
      ],
    },

    {
      id: 'vanguard-spearhead',
      name: 'Vanguard Spearhead',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Shadow Masters',
        flavor:
          'The warriors of a Vanguard Spearhead slip through the shadows, half-seen spectres barely visible to the foe. Enemies blaze away into the gloom with increasing panic, their shots flying wide as covert specialists encircle their victims and prepare to level the killing blow.',
        // Faction-Pack Rules Update reworded this rule (removed the -1 to Hit clause).
        body: `Each time a [gloss:ranged-attacks:ranged attack] targets an Adeptus Astartes unit from your army, unless the attacking model is [gloss:within:within] 12", the target has the [gloss:benefit-of-cover:Benefit of Cover] against that attack.`,
      },
      stratagems: [
        {
          name: 'A Deadly Prize',
          sublabel: 'Vanguard Spearhead – Wargear Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Warriors of a Vanguard Spearhead will rig critical objectives with explosives to deny them to the enemy.',
          when: 'Start of the Command phase.',
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army within range of an [gloss:objective-marker:objective marker] you control.',
          effect: 'That objective marker is said to be Sabotaged, and remains under your control even if you have no models within range of it, until your opponent controls it at the start or end of any turn. While an objective marker is Sabotaged and under your control, each time an enemy unit ends a Normal, Advance, Fall Back or [gloss:charge-move:Charge move] within range of that objective marker, roll one D6: on a 2+, that enemy unit suffers D3 [gloss:mortal-wound:mortal wounds].',
          restrictions: '',
        },
        armourOfContempt('Vanguard Spearhead'),
        {
          name: 'Surgical Strikes',
          sublabel: 'Vanguard Spearhead – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: "Every tyrant must fear the assassin's blade, and the vanguard spring ambushes with precision coordination.",
          when: 'Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been [gloss:selected-to-fight:selected to fight] this phase.',
          effect: 'Until the end of the phase, [gloss:melee-weapons:melee weapons] equipped by models in your unit have the [PRECISION] ability.',
          restrictions: '',
        },
        {
          name: 'Strike from the Shadows',
          sublabel: 'Vanguard Spearhead – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'To evade one\'s enemies and sow confusion can be a deadly weapon in itself.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes a [gloss:ranged-attacks:ranged attack] that targets an enemy unit that is more than 12\" away, improve the [gloss:ballistic-skill:Ballistic Skill] and [gloss:armour-penetration:Armour Penetration] characteristics of that attack by 1. If one or more enemy models are [gloss:destroyed:destroyed] as a result of those attacks, select one of those destroyed models; that destroyed model's unit must take a [gloss:battle-shock-test:Battle-shock test].",
          restrictions: '',
        },
        {
          name: 'Calculated Feint',
          sublabel: 'Vanguard Spearhead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'A feigned retreat can be used to overextend eager foes or draw them into deadly arcs of fire.',
          when: "Your opponent's Charge phase, just after an enemy unit [gloss:declare-charge:declares a charge].",
          // Faction-Pack Rules Update: target reworded.
          target: 'One [gloss:friendly:friendly] Adeptus Astartes Infantry unit [gloss:within:within] 12" of that enemy unit.',
          effect: 'Your unit can make a [gloss:normal-move:Normal move] of up to D6", or up to 6" instead if it is a Phobos or Scout Squad unit.',
          restrictions: 'You cannot select a unit that is within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
        },
        {
          name: 'Guerrilla Tactics',
          sublabel: 'Vanguard Spearhead – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'At the opportune moment, Space Marine infiltration units slip away from battle, only to relocate ready to strike the foe again.',
          when: "End of your opponent's Fight phase.",
          target: 'Up to two Phobos and/or Scout Squad units from your army, or one other Adeptus Astartes Infantry unit from your army.',
          effect: 'Remove those units from the battlefield and place them into [gloss:strategic-reserves:Strategic Reserves].',
          restrictions: 'Each unit selected for this Stratagem must be more than 3" away from all enemy models.',
        },
      ],
      enhancements: [
        {
          name: 'Execute and Redeploy',
          points: 20,
          flavor: "The battle-brothers under this warrior's command seize every opportunity to strike while the initiative is theirs, harrying the foe with gunfire before returning to the shadows.",
          body: `Phobos model only. In your Shooting phase, after the [gloss:bearer:bearer]'s unit has shot, if that unit is not within [gloss:engagement-range:Engagement Range] of one or more enemy units, it can make a [gloss:normal-move:Normal move] of up to 6". If it does, until the end of the turn, that unit is not [gloss:eligible-to-charge:eligible to declare a charge]. This cannot allow the bearer's unit to move more than once in your Shooting phase.`,
        },
        {
          name: 'Ghostweave Cloak',
          points: 15,
          flavor: 'Hand-stitched by blinded servitors and anointed with distilled blood, this cloak throws up a field of techno-spiritual dissonance that veils its wearer from sight and sensors.',
          body: `Adeptus Astartes model only. The [gloss:bearer:bearer] has the Stealth and [gloss:lone-operative:Lone Operative] abilities.`,
        },
        {
          name: 'Shadow War Veteran',
          points: 30,
          flavor: 'By the time the enemy believes battle has begun, their rear lines have already been attacked at this warrior\'s command.',
          // Faction-Pack Rules Update: reworded to "once per turn" / stratagem-cost increase.
          body: `Phobos model only. Once per turn, when your opponent targets a unit from their army [gloss:within:within] 12" of this model with a [gloss:stratagem:Stratagem], you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP.`,
        },
        {
          name: 'The Blade Driven Deep',
          points: 25,
          flavor: 'This battlefield stalker slips through enemy territory like a spectre, leading their warriors in daring behind-enemy-lines operations.',
          body: `Adeptus Astartes Infantry model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, models in that unit have the [gloss:infiltrators:Infiltrators] ability.`,
        },
      ],
    },

    {
      id: '1st-company-task-force',
      name: '1st Company Task Force',
      source: 'codex',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Extremis-level Threat',
        flavor:
          "The 1st Company's veterans have fought at the forefront of their Chapter's wars for many mortal lifespans. Experience has taught them to identify the foe's lethal threats and to lead their battle-brothers to purge them from existence.",
        body: `Once per battle, in your Command phase, you can use this ability. If you do, until the start of your next Command phase, each time a model from your army with the Oath of Moment ability makes an attack that targets your [gloss:sm-oath-of-moment:Oath of Moment target], you can [gloss:re-roll:re-roll] the [gloss:wound-roll:Wound roll] as well.`,
      },
      stratagems: [
        armourOfContempt('1st Company Task Force'),
        {
          name: 'Heroes of the Chapter',
          sublabel: '1st Company Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When the fighting is at its fiercest, the veteran warriors of the Chapter truly show their quality.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the [gloss:hit-roll:Hit roll]. If your unit is [gloss:half-strength:Below Half-strength], add 1 to the [gloss:wound-roll:Wound roll] as well.',
          restrictions: '',
        },
        {
          name: 'Terrifying Proficiency',
          sublabel: '1st Company Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "The 1st Company's veterans unleash their skills with an efficiency that is harrowing to witness.",
          when: 'Your Fight phase.',
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that made a [gloss:charge-move:Charge move] this turn and [gloss:destroyed:destroyed] one or more enemy units this phase.',
          effect: "In your opponent's next Command phase, each enemy unit [gloss:within:within] 6\" of your unit must take a [gloss:battle-shock-test:Battle-shock test]. If the unit taking that test is [gloss:half-strength:Below Half-strength], subtract 1 from that test. Enemy units affected by this Stratagem do not need to take any other Battle-shock tests in the same phase.",
          restrictions: '',
        },
        {
          name: 'Duty and Honour',
          sublabel: '1st Company Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Adeptus Astartes veterans claim critical objectives in daring strikes, annihilating resistance in their Chapter's name before sweeping onto their next target.",
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army within range of an [gloss:objective-marker:objective marker] you control.',
          effect: 'That objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.',
          restrictions: '',
        },
        {
          name: 'Orbital Teleportarium',
          sublabel: '1st Company Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Teleportarium chambers within orbiting strike cruisers are able to perform site-to-strike teleportations for Terminator-armoured battle-brothers in extremis.',
          when: "End of your opponent's Fight phase.",
          target: 'One Adeptus Astartes Terminator unit from your army.',
          effect: 'Remove your unit from the battlefield and place it into [gloss:strategic-reserves:Strategic Reserves]. It will arrive back on the battlefield in the [gloss:reinforcements:Reinforcements] step of your next Movement phase using the Deep Strike ability.',
          restrictions: 'You cannot select a unit that is within [gloss:engagement-range:Engagement Range] of one or more enemy units.',
        },
        {
          name: 'Legendary Fortitude',
          sublabel: '1st Company Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Many are the legendary tales of the 1st Company holding their ground against the odds, weathering assaults that would have swept away lesser warriors.',
          when: "Your opponent's Charge phase, just after an enemy unit ends a [gloss:charge-move:Charge move].",
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army within [gloss:engagement-range:Engagement Range] of that enemy unit.',
          effect: 'Until the end of the turn, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: "The Imperium's Sword",
          points: 25,
          flavor: 'This hero and the veterans they lead cut down their foes like a reaping whirlwind.',
          body: `Adeptus Astartes model only. Add 1 to the Attacks characteristic of the [gloss:bearer:bearer]'s [gloss:melee-weapons:melee weapons]. Once per battle, at the start of any phase, the bearer can use this [gloss:enhancement:Enhancement]. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by all other models in the bearer's unit as well.`,
        },
        {
          name: 'Fear Made Manifest',
          points: 30,
          aura: true,
          flavor: "This warrior personifies the Emperor's wrath.",
          body: `Adeptus Astartes model only. While an enemy unit (excluding Monsters and Vehicles) is [gloss:within:within] 6" of the [gloss:bearer:bearer], each time that unit fails a [gloss:battle-shock-test:Battle-shock test], one model in that unit is [gloss:destroyed:destroyed] (chosen by its [gloss:controlling-player:controlling player]). Once per battle, when such an enemy unit fails a Battle-shock test, you can choose for D3 models in that unit to be destroyed in this way instead.`,
        },
        {
          name: 'Rites of War',
          points: 10,
          flavor: 'The commanders of the 1st Company vow before the Chapter and the Emperor to secure victory.',
          body: `Adeptus Astartes Terminator model only. Improve the [gloss:objective-control:Objective Control] characteristic of the [gloss:bearer:bearer] by 1. Once per battle, at the start of any phase, the bearer can use this [gloss:enhancement:Enhancement]. If it does, until the end of the phase, add 1 to the Objective Control characteristic of all other models in the bearer's unit as well.`,
        },
        {
          name: 'Iron Resolve',
          points: 15,
          flavor: 'This hero shrugs off even horrendous wounds.',
          body: `Adeptus Astartes Terminator model only. The [gloss:bearer:bearer] has the Feel No Pain 5+ ability. Once per battle, after the bearer's unit is selected as the target of one or more attacks, the bearer can use this [gloss:enhancement:Enhancement]. If it does, until the end of the phase, models in the bearer's unit have the Feel No Pain 5+ ability.`,
        },
      ],
    },

    // ───────────────────────── FACTION PACK DETACHMENTS ─────────────────────────
    {
      id: 'fulguris-task-force',
      name: 'Fulguris Task Force',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Skystrike',
        flavor:
          "With howling engines and a buffeting of anti-gravitic forces, a Chapter's massed combat skimmers plunge into the midst of battle with guns blazing.",
        body: `▪ [gloss:friendly:Friendly] Land Speeder/Storm Speeder Hailstrike/Storm Speeder Hammerstrike/Storm Speeder Thunderstrike units have Speeder.
▪ In your first Movement phase, friendly Speeder units can make an [gloss:ingress-move:ingress move].`,
      },
      stratagems: [
        {
          name: 'Data-link Augury',
          sublabel: 'Fulguris Task Force – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Speeder crews are trained to exploit their craft's reconnaissance augurs in a data-link with its weapons to target suddenly revealed foes.",
          when: 'Your Shooting phase, when a [gloss:friendly:friendly] Speeder unit is [gloss:selected-to-shoot:selected to shoot].',
          target: 'That Speeder unit.',
          effect: 'Select one enemy unit [gloss:within:within] 24" of your unit. That enemy unit has +6" [gloss:detection-range:detection range] until your unit has shot.',
          restrictions: '',
        },
        {
          name: 'Reactive Evasion',
          sublabel: 'Fulguris Task Force – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Triggering sudden flows of power to engines and manoeuvring planes, aggressive advances by the foe can be left foundering in a skimmer's wake.",
          when: "Your opponent's Movement phase, when an enemy unit ends a move [gloss:within:within] 8\" of a [gloss:friendly:friendly] [gloss:unengaged:unengaged] Speeder unit.",
          target: 'That Speeder unit.',
          effect: 'Your unit can make a [gloss:normal-move:normal move] of up to D3+3".',
          restrictions: '',
        },
        {
          name: 'Anti-grav Surge',
          sublabel: 'Fulguris Task Force – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The anti-grav plates of this combat skimmer thrum with extra power, powering the craft into the atmosphere from where it can redeploy.',
          when: "End of your opponent's Fight phase.",
          target: 'One [gloss:friendly:friendly] [gloss:unengaged:unengaged] Speeder unit.',
          effect: 'Place your unit in [gloss:strategic-reserves:strategic reserves].',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Bellicose Weapon Spirits',
          points: 15,
          upgrade: true,
          flavor: "Entreated by veteran gunners, this skimmer's potent weapons unleash their spirits' wrath in bursts of excoriating destruction.",
          body: `Speeder unit only. This unit can re-roll:\n▪ [gloss:damage-roll:Damage rolls].\n▪ Rolls to determine the A of a weapon.`,
        },
        {
          name: 'Raptorial Cogitator Core',
          points: 15,
          upgrade: true,
          flavor: "The pinpoint firing solutions woven in runic screed by this vehicle's logic engine speak to its predatory instincts.",
          body: `Speeder unit only. This unit's [gloss:ranged-attacks:ranged attacks] have [IGNORES COVER].`,
        },
      ],
    },

    {
      id: 'librarius-conclave',
      name: 'Librarius Conclave',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Psychic Disciplines',
        flavor:
          'Librarians spend their lives mastering psychic disciplines, learning how to manipulate the energies of the Immaterium to confound their foes and embolden their battle-brothers.',
        body: `At the start of the [gloss:battle-round:battle round], select one of the following [gloss:sm-psychic-discipline:Psychic Disciplines] abilities. [gloss:friendly:Friendly] Adeptus Astartes [gloss:psyker:Psyker] units have that ability until the end of the battle round.
▪ Biomancy Discipline: This unit has +2" M.
▪ Divination Discipline: This unit's attacks can:\n▪ Re-roll [gloss:hit-roll:Hit rolls] of 1.\n▪ Re-roll [gloss:wound-roll:Wound rolls] of 1.
▪ Pyromancy Discipline: This unit's [gloss:ranged-attacks:ranged attacks] that target an enemy unit [gloss:within:within] 12" of this unit have +1 AP.
▪ Telekinesis Discipline: Ranged attacks that target this unit have -1 [gloss:strength:S].
▪ Telepathy Discipline: This unit's attacks can ignore modifiers to BS, WS and hit rolls.`,
      },
      stratagems: [],
      enhancements: [
        {
          name: 'Celerity',
          points: 35,
          flavor: 'The powers of the Immaterium flow through the psyker, heightening his speed and that of his battle-brothers.',
          body: `Adeptus Astartes [gloss:psyker:Psyker] model only.\n▪ When this unit is selected to make an [gloss:advance-move:advance move], that move does not prevent this unit from being [gloss:eligible-to-charge:eligible to declare a charge].\n▪ When this unit is selected to make a [gloss:fall-back-move:fall-back move], if this unit has the Biomancy [gloss:sm-psychic-discipline:Discipline] ability, that move does not prevent this unit from being eligible to declare a charge.`,
        },
        {
          name: 'Prescience',
          points: 20,
          flavor: 'Those who specialise in prognostication may foresee the flow of battle and position their allies accordingly.',
          body: `Adeptus Astartes [gloss:psyker:Psyker] model only (excluding Terminator models). Once per turn per unit, in your opponent's Movement phase, when an enemy unit ends a move [gloss:within:within] 8" of this unit, if this unit is [gloss:unengaged:unengaged], this unit can make a [gloss:normal-move:normal move] of up to D6", or, if this unit has the Divination [gloss:sm-psychic-discipline:Discipline] ability, up to 6".`,
        },
        {
          name: 'Obfuscation',
          points: 25,
          flavor: 'By manipulating the minds of the foe, practitioners of telepathy may obfuscate their presence.',
          body: `Adeptus Astartes [gloss:psyker:Psyker] model only. Enemy units cannot target this unit with [gloss:snap-shooting:snap shooting] attacks. If this unit has the Telepathy [gloss:sm-psychic-discipline:Discipline] ability, this unit has -3" [gloss:detection-range:detection range].`,
        },
        {
          name: 'Temporal Corridor',
          points: 25,
          flavor: 'Folding existence around an invisible path along which time is altered, the Librarian propels his allies across the battlefield with supernatural swiftness.',
          body: `Adeptus Astartes [gloss:psyker:Psyker] model only.\n▪ If this unit has the Telekinesis [gloss:sm-psychic-discipline:Discipline] ability, this unit has Deep Strike.\n▪ At the end of your opponent's Fight phase, if this unit is [gloss:unengaged:unengaged], you can use this ability. If you do:\n▪ Place this unit in [gloss:strategic-reserves:strategic reserves].\n▪ This unit can make an [gloss:ingress-move:ingress move] in your next Movement phase (including in your first turn).`,
        },
        {
          name: 'Fusillade',
          points: 25,
          flavor: 'The Librarian wreathes the ammunition of his allies in armour-eroding halos of azure fire.',
          body: `Adeptus Astartes [gloss:psyker:Psyker] model only. This unit's [gloss:ranged-attacks:ranged attacks] have:\n▪ [LETHAL HITS].\n▪ If this unit has the Pyromancy [gloss:sm-psychic-discipline:Discipline] ability, [SUSTAINED HITS 1].`,
        },
      ],
    },

    {
      id: 'subversion-assets',
      name: 'Subversion Assets',
      source: 'faction-pack',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Nowhere to Hide',
        flavor:
          "With transhuman instincts, auto-senses, and more specialised equipment, a Chapter's masters of clandestine warfare are able to unmask the foe, leaving them ripe for swift eradication.",
        body: `[gloss:friendly:Friendly] Phobos/Scout Squad units have the following ability:
▪ Transhuman Perception: In your Shooting phase, this unit can select one [gloss:visible:visible] enemy unit [gloss:within:within] 12". That enemy unit is detected. While a unit is detected, that unit has +3" [gloss:detection-range:detection range].`,
      },
      stratagems: [
        {
          name: 'Adaptive Operations',
          sublabel: 'Subversion Assets – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Those warriors who operate far from Chapter reinforcement maintain their lethal fire even while conducting vital strategic operations.',
          when: 'Your Shooting phase, when a [gloss:friendly:friendly] Phobos/Scout Squad unit starts an [gloss:action:action].',
          target: 'That Phobos/Scout Squad unit.',
          effect: 'That action does not prevent your unit from being [gloss:eligible-to-shoot:eligible to shoot].',
          restrictions: '',
        },
        {
          name: 'Strike from the Shadows',
          sublabel: 'Subversion Assets – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Holding to the shadows and choosing victims with care, stealthy warriors winnow the enemy ranks without ever revealing their positions.',
          when: 'Your Shooting phase, when a [gloss:friendly:friendly] Phobos/Scout Squad unit has shot.',
          target: 'That Phobos/Scout Squad unit.',
          effect: 'Those [gloss:ranged-attacks:ranged attacks] do not prevent your unit from being [gloss:hidden:hidden].',
          restrictions: '',
        },
        {
          name: 'Cloaked Position',
          sublabel: 'Subversion Assets – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "When still, silent and further masked by cameleoline materials or drifting smoke, a Chapter's forward operatives are almost impossible to spot until it is too late.",
          when: "Start of your opponent's Movement phase.",
          target: 'One [gloss:friendly:friendly] [gloss:unengaged:unengaged] Phobos/Scout Squad unit.',
          effect: 'Your unit has -3" [gloss:detection-range:detection range] until the end of the turn.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Shroud Field',
          points: 20,
          flavor: 'This camouflaging field projector employs a chameleonic twisting of emissions whose secrets the Techmarines cannot reproduce.',
          body: `Phobos model only. This model has:\n▪ [gloss:lone-operative:Lone Operative].\n▪ Stealth.`,
        },
        {
          name: 'Death in the Dark',
          points: 15,
          upgrade: true,
          flavor: 'To slay the hidden foe where they lurk, where their deaths go unmarked and unremembered, is to deny their hateful lives meaning.',
          body: `Infantry Phobos unit only. This unit's attacks that target a [gloss:hidden:hidden] unit have +1 to [gloss:hit-roll:hit rolls].`,
        },
      ],
    },

    {
      id: 'armoured-speartip',
      name: 'Armoured Speartip',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Rapid Deployment',
        flavor:
          'Land Raiders, Repulsors and other armoured transports plunge headlong into the heart of enemy formations, weathering heavy firepower to deploy their cargo of elite Space Marines into battle.',
        body: `Each time an Adeptus Astartes unit from your army [gloss:disembark:disembarks] from a [gloss:transport:Transport] (excluding Fly) that made a [gloss:normal-move:Normal] or [gloss:advance-move:Advance move] this phase (excluding those that arrived from [gloss:strategic-reserves:Strategic Reserves]), that disembarked unit can make a Normal move of up to D6", or a Normal move of up to D3+3" instead if that Transport is a Heavy Transport (see below).

### Keywords
Adeptus Astartes Transport units from your army (excluding Fly) that have a [gloss:wounds:Wounds] characteristic of 14+ have the Heavy Transport [gloss:keywords:keyword].`,
      },
      stratagems: [
        armourOfContempt('Armoured Speartip'),
        {
          name: 'Machine Wrath',
          sublabel: 'Armoured Speartip – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'In a last act of vengeance, the doomed crew of this burning transport drive into the midst of the enemy.',
          when: 'Any phase, just after a Heavy Transport unit from your army with the Deadly Demise ability is [gloss:destroyed:destroyed].',
          target: 'That Heavy Transport unit, if you rolled a 6 for its Deadly Demise ability. You can use this Stratagem on that unit even though it was just destroyed.',
          effect: 'Your unit can make a [gloss:normal-move:Normal] or [gloss:fall-back-move:Fall Back] move before its Deadly Demise ability is resolved, and before any [gloss:embarked:embarked] units perform an [gloss:emergency-disembark-move:Emergency Disembarkation]. When making this move, your unit can move through enemy models (excluding Monsters and Vehicles) and can move within [gloss:engagement-range:Engagement Range] of such models, but cannot end that move within Engagement Range of them, and any [gloss:desperate-escape:Desperate Escape] test is automatically passed.',
          restrictions: '',
        },
        {
          name: 'Rapid Embarkation',
          sublabel: 'Armoured Speartip – Wargear Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With steely discipline, Space Marine battle-brothers mount up swiftly, even as the enemy closes in.',
          when: 'End of the Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that is not within [gloss:engagement-range:Engagement Range] of one or more enemy units, and one [gloss:friendly:friendly] Heavy Transport it is able to embark within.',
          effect: 'If your Adeptus Astartes Infantry unit is [gloss:wholly-within:wholly within] 6" of that Heavy Transport, it can [gloss:embark:embark] within it.',
          restrictions: '',
        },
        {
          name: 'Ceramite Sledgehammer',
          sublabel: 'Armoured Speartip – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The mightiest Space Marine transports are unstoppable on the advance.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Transport unit from your army that has not been [gloss:selected-to-move:selected to move] this phase.',
          effect: 'Until the end of the phase, each time your unit makes a [gloss:normal-move:Normal] or [gloss:advance-move:Advance move], it can move horizontally through [gloss:terrain-feature:terrain features]. In addition, if your unit is a Heavy Transport, when making this move, your unit can move through enemy models (excluding Monsters and Vehicles) and can move within [gloss:engagement-range:Engagement Range] of such models, but cannot end that move within Engagement Range of them, and any [gloss:desperate-escape:Desperate Escape] test is automatically passed.',
          restrictions: '',
        },
        {
          name: 'Advanced Deployment',
          sublabel: 'Armoured Speartip – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Coaxing the utmost from roaring engines, transport crews strive to deploy their passengers as close as possible to their assigned objectives.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Transport unit from your army that has not been [gloss:selected-to-move:selected to move] this phase.',
          effect: 'Until the end of the phase, units can [gloss:disembark:disembark] from your Transport after it has [gloss:advance:Advanced]. Units that do so count as having made a [gloss:normal-move:Normal move] this phase, and cannot [gloss:declare-charge:declare a charge] in the same turn (unless your Transport has the Assault Ramp ability), but can otherwise act normally.',
          restrictions: '',
        },
        {
          name: 'Purgation Doctrine',
          sublabel: 'Armoured Speartip – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Emerging from their transports, Space Marine infantry ruthlessly clear enemy positions.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the [gloss:hit-roll:Hit roll] (if your unit [gloss:disembark:disembarked] from a Heavy Transport this turn, add 1 to the [gloss:wound-roll:Wound roll] as well).',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Armoured Commander',
          points: 25,
          flavor: 'This veteran commander of mechanised infantry utilises its manoeuvrability to ensnare the foe.',
          body: `Adeptus Astartes model only. Once per turn, in your Movement phase, the [gloss:bearer:bearer] can use this [gloss:enhancement:Enhancement]. If it does, select one [gloss:friendly:friendly] Adeptus Astartes Transport that is in [gloss:strategic-reserves:Strategic Reserves]. Until the end of the phase, for the purposes of setting up that Transport on the battlefield, treat the current [gloss:battle-round:battle round] number as being one higher than it actually is.`,
        },
        {
          name: 'Liberator',
          points: 15,
          flavor: 'A dauntless conqueror and liberator of worlds, this intimidating champion inspires confidence in their battle-brothers and abject fear in the enemy.',
          body: `Adeptus Astartes model only. If you control an [gloss:objective-marker:objective marker] at the end of your Command phase, and the [gloss:bearer:bearer]'s unit (or any Heavy Transport it is [gloss:embarked:embarked] within) is within range of that objective marker, that objective marker remains under your control until your opponent's [gloss:level-of-control:Level of Control] over that objective marker is greater than yours at the end of a phase.`,
        },
        {
          name: 'Shock Deployment',
          points: 20,
          flavor: 'From the ramps of armoured transports, elite infantry deploy swiftly, unleashing fire on overawed enemies.',
          body: `Adeptus Astartes Terminator or Gravis model only. In your Shooting phase, each time the [gloss:bearer:bearer]'s unit is [gloss:selected-to-shoot:selected to shoot], if it [gloss:disembark:disembarked] from a [gloss:transport:Transport] this turn, until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in that unit have the [SUSTAINED HITS 1] ability.`,
        },
        {
          name: 'Tip of the Spear',
          points: 40,
          flavor: 'This aggressive frontline commander knows the value of speed and decisive manoeuvre.',
          body: `Adeptus Astartes model only. If the [gloss:bearer:bearer] starts the battle [gloss:embarked:embarked] within a Transport, that Transport has the [gloss:scouts:Scouts] 6" ability.`,
        },
      ],
    },

    {
      id: 'headhunter-task-force',
      name: 'Headhunter Task Force',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Target Sighted',
        flavor:
          'Space Marine crews are relentless in their pursuit of assigned targets, coaxing every last trace of power from their war machines and demonstrating exemplary gunnery even under heavy fire.',
        body: `Each time a Tank Ace unit from your army (see below) [gloss:advance:Advances], do not make an [gloss:advance-roll:Advance roll] for it. Instead, until the end of the phase, add 6" to the [gloss:move-characteristic:Move characteristic] of models in that unit.

Each time a Tank Ace unit from your army shoots in your Shooting phase, if that unit did not Advance this turn, you can [gloss:re-roll:re-roll] the [gloss:damage-roll:Damage roll].

### Keywords
Adeptus Astartes Vehicle units from your army (excluding Fortifications, Drop Pods, Walkers and units that can Fly) have the Tank Ace [gloss:keywords:keyword]. In the [gloss:muster-armies:Muster Armies] step, you can select up to three Tank Ace units from your army to gain the Character keyword.`,
      },
      stratagems: [
        armourOfContempt('Headhunter Task Force'),
        {
          name: 'Target Weak Point',
          sublabel: 'Headhunter Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Targeting vulnerable joints or seams between armoured plates, Space Marine gunners increase the effectiveness of their weapons.',
          when: 'Your Shooting phase.',
          target: 'One Tank Ace unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a [gloss:ranged-attacks:ranged attack] that targets a Monster or Vehicle unit, improve the [gloss:armour-penetration:Armour Penetration] characteristic of that attack by 1.',
          restrictions: 'A unit cannot be targeted with this and the Kill Shot [gloss:stratagem:Stratagem] in the same phase.',
        },
        {
          name: 'Kill Shot',
          sublabel: 'Headhunter Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Space Marines are ruthless in culling weakened foes.',
          when: 'Your Shooting phase.',
          target: 'One Tank Ace unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a Monster or Vehicle unit, [gloss:re-roll:re-roll] a [gloss:wound-roll:Wound roll] of 1. If the target unit is [gloss:below-starting-strength:below its Starting Strength], you can re-roll the Wound roll instead.',
          restrictions: 'A unit cannot be targeted with this and the Target Weak Point [gloss:stratagem:Stratagem] in the same phase.',
        },
        {
          name: 'Rapid Gunnery',
          sublabel: 'Headhunter Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Advanced targeting systems and the skill of transhuman gunners ensure that Space Marine tanks keep up a punishing rate of fire, even when extracting themselves from a press of enemies.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been [gloss:selected-to-shoot:selected to shoot] this phase.',
          effect: 'Until the end of the phase, your unit is [gloss:eligible-to-shoot:eligible to shoot] in a turn in which it [gloss:fall-back-move:Fell Back].',
          restrictions: '',
        },
        {
          name: 'Reactive Repositioning',
          sublabel: 'Headhunter Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Reacting swiftly to enemy movements, this tank's crew reposition their vehicle, angling armour or taking up an advantageous firing position.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, [gloss:advance-move:Advance] or [gloss:fall-back-move:Fall Back] move.",
          target: 'One Tank Ace unit from your army (excluding units containing one or more models with a [gloss:wounds:Wounds] characteristic of 16+) that is [gloss:within:within] 8" of that enemy unit.',
          effect: 'Your unit can make a [gloss:normal-move:Normal move] of up to D6".',
          restrictions: '',
        },
        {
          name: 'Machine Vengeance',
          sublabel: 'Headhunter Task Force – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Bellicose in the extreme, this vehicle's machine spirit demands immediate vengeance for the hurts it has incurred.",
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Tank Ace unit from your army (excluding units containing one or more models with a [gloss:wounds:Wounds] characteristic of 16+) that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Your unit can shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is [gloss:visible:visible] and an eligible target.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Astartes Tank Ace',
          points: 40,
          aura: true,
          flavor: 'The commander of this battle tank is a storied tank ace whose exploits are the stuff of Chapter legend.',
          body: `Adeptus Astartes Vehicle model only. In your Shooting phase, while a [gloss:friendly:friendly] Adeptus Astartes Vehicle unit is [gloss:within:within] 6" of the [gloss:bearer:bearer], [gloss:ranged-weapons:ranged weapons] equipped by models in that unit have the [ASSAULT] ability.`,
        },
        {
          name: 'Firestorm Coordinators',
          points: 20,
          flavor: "This vehicle's fire control systems incorporate ancient yet highly advanced logic engines, which assist the crew in keeping up an exceptionally rapid rate of fire.",
          body: `Adeptus Astartes Vehicle model only. [gloss:ranged-weapons:Ranged weapons] equipped by the [gloss:bearer:bearer] have the [SUSTAINED HITS 1] ability.`,
        },
        {
          name: 'Gunnery Honours',
          points: 20,
          flavor: 'The crew of this war machine demonstrate exemplary gunnery and have earned the highest honours for their craft.',
          body: `Adeptus Astartes Vehicle model only. Once per phase, you can [gloss:re-roll:re-roll] one [gloss:hit-roll:Hit roll], one [gloss:wound-roll:Wound roll] and one [gloss:damage-roll:Damage roll] for the [gloss:bearer:bearer].`,
        },
        {
          name: 'Redoubtable Machine Spirit',
          points: 25,
          flavor: 'This ancient war machine has endured millennia of battle, and its belligerent machine spirit has only become more obdurate.',
          body: `Adeptus Astartes Vehicle model only. The [gloss:bearer:bearer] has a 5+ [gloss:invulnerable-save:invulnerable save] and, at the end of your Command phase, the bearer regains 1 lost [gloss:wounds:wound].`,
        },
      ],
    },

    {
      id: 'ceramite-sentinels',
      name: 'Ceramite Sentinels',
      source: 'faction-pack',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Adaptive Defence',
        flavor:
          'These Space Marines are experts in fighting from rapidly prepared defensive positions. They are able to maximise the potential of almost any terrain to serve as an ad-hoc strongpoint, punishing the foe\'s every attempt to advance and dislodge them.',
        body: `Each time an Adeptus Astartes model from your army makes an attack, if that model's unit is within a terrain feature, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.

Adeptus Astartes units from your army gain the Entrenched keyword while all of the following are true:
▪ That unit is within a terrain feature.
▪ That unit was not set up on the battlefield this turn.
▪ No model in that unit has moved more than 3" this turn.`,
      },
      stratagems: [
        armourOfContempt('Ceramite Sentinels'),
        {
          name: 'Unyielding Might',
          sublabel: 'Ceramite Sentinels – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Knowing that this strategically vital site must be secure for the defence lines to hold, Space Marines stand indomitable in the face of the foe.',
          when: 'Command phase.',
          target: 'One Adeptus Astartes unit from your army that is within Engagement Range of one or more enemy units.',
          effect: 'Until the start of your next Command phase, add 1 to the Objective Control characteristics of models in your unit.',
          restrictions: '',
        },
        {
          name: 'Priority Strike',
          sublabel: 'Ceramite Sentinels – Battle Tactic Stratagem',
          cp: '2CP',
          turn: 'your',
          flavor: "Eliminating key enemy assets is crucial to stalling then reversing the foe's momentum.",
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets a Character, Monster or Vehicle unit, you can re-roll the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Stand to the End',
          sublabel: 'Ceramite Sentinels – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Aware of how vital it is that the defence line holds, these warriors fight even to their last breath.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6, adding 1 to the result if it is an Entrenched unit: on a 4+, do not remove it from play. That destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Augmented Targeting',
          sublabel: 'Ceramite Sentinels – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Autosense targeting subroutines specially adapted for defensive fire patterns aid these warriors' aim.",
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot this phase.',
          effect: 'Select either the [SUSTAINED HITS 1] or [LETHAL HITS] abilities. Until the end of the phase, ranged weapons equipped by models in your unit have the selected ability. If your unit is Entrenched, until the end of the phase, ranged weapons equipped by models in your unit have the [SUSTAINED HITS 1] and [LETHAL HITS] abilities instead.',
          restrictions: '',
        },
        {
          name: 'Evasive Repositioning',
          sublabel: 'Ceramite Sentinels – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Codex doctrine when conducting an aggressive defence is to swiftly take up new positions whenever the foe finds your range.',
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Your unit can make a Normal move of up to D6". If your unit is Entrenched, you can re-roll the D6 to determine how far your unit can move.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Castellum Omnivox',
          points: 20,
          flavor: 'This unique vox-and-augur augmetic provides the bearer with unparalleled tactical data vital to coordinating an aggressive defence in battle.',
          body: `Adeptus Astartes model only. Each time the bearer's unit makes a Fall Back move, select one of the following to apply to that unit until the end of the turn:\n▪ That unit is eligible to perform an Action in a turn in which it Fell Back.\n▪ That unit is eligible to shoot and declare a charge in a turn in which it Fell Back.`,
        },
        {
          name: 'Defensive Mastery',
          points: 25,
          flavor: "Few officers of the Chapter can match this commander's talent for cunning defensive troop dispositions.",
          body: `Adeptus Astartes model only. After both players have deployed their armies, select up to three Adeptus Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Honour Indefatigable',
          points: 25,
          flavor: 'This rare honour badge celebrates a warrior who refuses to give up, even in the face of apparently certain death.',
          body: `Gravis model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with its full wounds remaining.`,
        },
        {
          name: 'Spy-skull Data Link',
          points: 15,
          flavor: 'Several artificer-crafted and heavily shrouded servo-skulls are tethered to this device, their linked visual feeds making the bearer nigh impossible to evade.',
          body: `Adeptus Astartes model only. Ranged weapons equipped by models in the bearer's unit have the [IGNORES COVER] ability.`,
        },
      ],
    },

    {
      id: 'blade-of-ultramar',
      name: 'Blade of Ultramar',
      source: 'faction-pack',
      chapter: 'Ultramarines',
      dp: 3,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Mastered Doctrines',
        flavor:
          'Marneus Calgar deploys the complete and nuanced wisdom of the Codex Astartes as easily and instinctively as drawing breath.',
        body: `At the start of up to three of your Command phases, you can select one of the Combat Doctrines listed below. Until the start of your next Command phase, that Combat Doctrine is active and its effects apply to all Adeptus Astartes units from your army. You cannot select a Combat Doctrine you have already selected this battle, unless a friendly Marneus Calgar model is on the battlefield.

### Devastator Doctrine
This unit is eligible to shoot in a turn in which it Advanced.

### Tactical Doctrine
This unit is eligible to shoot and declare a charge in a turn in which it Fell Back.

### Assault Doctrine
This unit is eligible to declare a charge in a turn in which it Advanced.

Restrictions: Your army can include Ultramarines units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        armourOfContempt('Blade of Ultramar'),
        {
          name: 'Tactical Foresight',
          sublabel: 'Blade of Ultramar – Epic Deed Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "With the enemy's countermeasures and responses predicted and allowed for in advance, the Ultramarines can weather their most ferocious attacks.",
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than or equal to the Toughness characteristic of that unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Courage and Honour!',
          sublabel: 'Blade of Ultramar – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Roaring their famed battle cry, the Ultramarines hurl themselves into the fight, striving all the harder to prevail beneath the unwavering eye of their Chapter Master.',
          when: 'Fight phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] ability. If your unit is under the effects of the Assault Doctrine, until the end of the phase, improve the Armour Penetration characteristic of such weapons by 1 as well.',
          restrictions: '',
        },
        {
          name: 'Ultramarian Adaptivity',
          sublabel: 'Blade of Ultramar – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "No Chapter's warriors know better the breadth — theoretical and practical — of the Codex Astartes' teachings, and how these can and should be adapted to ensure victory.",
          when: 'Your Command phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Select the Devastator Doctrine, Tactical Doctrine or Assault Doctrine. Until the start of your next Command phase, that Combat Doctrine is active for your unit instead of any other Combat Doctrine that is active for your army, even if you have already selected that Combat Doctrine this battle.',
          restrictions: '',
        },
        {
          name: 'Exemplary Vigilance',
          sublabel: 'Blade of Ultramar – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Long have the Ultramarines guarded both Ultramar and the wider Imperium. No foe can hide from their vengeful gaze or evade the reach of their wrath.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability. If your unit is under the effects of the Devastator Doctrine, until the end of the phase, improve the Armour Penetration characteristic of such weapons by 1 as well.',
          restrictions: '',
        },
        {
          name: 'Practical Tactics',
          sublabel: 'Blade of Ultramar – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "After rapidly making a theoretical assessment of the foes' probable next moves, the Ultramarines apply practical repositioning to counter them.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that is not within Engagement Range of one or more enemy units and is within 8" of the enemy unit that just ended that move.',
          effect: 'Your unit can make a Normal move of up to D6", or a Normal move of up to 6" instead if it is under the effects of the Tactical Doctrine.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Armour of Antoninus',
          points: 20,
          flavor: "Originally worn by a storied Captain of the Ultramarines' First Company, this artificer armour is bestowed by the Chapter Master himself upon a worthy wearer.",
          body: `Adeptus Astartes model only. The bearer has a Save characteristic of 2+ and the Feel No Pain 5+ ability.`,
        },
        {
          name: 'Oath of Macragge',
          points: 15,
          flavor: 'Amongst the most solemn and binding oaths an Ultramarine can swear, it is a rare honour to enter battle with these words affixed to their armour.',
          body: `Adeptus Astartes model only. Add 1 to the Attacks and Strength characteristics of the bearer's melee weapons. While the bearer is under the effects of the Assault Doctrine, add 2 to the Attacks and Strength characteristics of the bearer's melee weapons instead.`,
        },
        {
          name: 'Student of the Codex',
          points: 20,
          flavor: 'This prodigal officer has focused upon one aspect of the Codex Astartes and means to master its every aspect before moving on to the next.',
          body: `Adeptus Astartes model only. At the start of your Command phase, if the bearer is on the battlefield, it can use this Enhancement. If it does, until the start of your next Command phase, the Tactical Doctrine is active for this unit (instead of any other Combat Doctrine you select to be active for your army, and even if there is no Combat Doctrine active for your army).`,
        },
        {
          name: 'Veteran of Behemoth',
          points: 25,
          flavor: 'Having battled the Tyranid swarms since their first galactic invasion, this veteran officer knows well the benefit of efficient and overwhelming firepower.',
          body: `Adeptus Astartes model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, while the bearer's unit is under the effects of the Devastator Doctrine, you can re-roll Advance rolls made for that unit.`,
        },
      ],
    },

    {
      id: 'hammer-of-avernii',
      name: 'Hammer of Avernii',
      source: 'faction-pack',
      chapter: 'Iron Hands',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Calculated Annihilation',
        flavor:
          'Heavily enhanced with augmetics and the weight of many years of combat experience to aid them, the veteran warriors of Clan Company Avernii ruthlessly select and destroy their targets.',
        body: `Each time a model from your army with the Oath of Moment ability makes an attack that targets your Oath of Moment target, you can re-roll a Wound roll of 1.

### Recalculating
Caanok Var ensures every bolt shell is directed where it serves the greatest purpose. Once per battle round, after your Oath of Moment target is destroyed, if a Caanok Var model from your army is on the battlefield, select one enemy unit visible to that model. That enemy unit becomes your Oath of Moment target until you select a new one.

Restrictions: Your army can include Iron Hands units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        armourOfContempt('Hammer of Avernii'),
        {
          name: 'Ruthless Butchery',
          sublabel: 'Hammer of Avernii – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Iron Hands elite kill with machine-like relentlessness, and the tempo of slaughter only increases if they have losses of their own to avenge.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes Dreadnought, Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll. If your unit is below Starting Strength, add 1 to the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Cogitated Ferocity',
          sublabel: 'Hammer of Avernii – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Running endless up-to-the-second cogitations of their foes' weak spots and vulnerabilities, Avernii veterans place every blow with punishing precision.",
          when: 'Your Fight phase.',
          target: 'One Adeptus Astartes Dreadnought, Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that has not been selected to fight this phase.',
          effect: 'Select either the [SUSTAINED HITS 1] or [LETHAL HITS] abilities. Until the end of the phase, melee weapons equipped by models in your unit have the selected ability.',
          restrictions: '',
        },
        {
          name: 'Augmetic Fortitude',
          sublabel: 'Hammer of Avernii – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Gene-wrought flesh reinforced by hardened augmetics and adamantine armour, the warriors of Clan Company Avernii exhibit nigh-supernatural resilience.',
          when: "Your opponent's Charge phase, just after an enemy unit ends a Charge move.",
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army within Engagement Range of that enemy unit.',
          effect: 'Until the end of the turn, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
          restrictions: '',
        },
        {
          name: 'Dominator Beacon',
          sublabel: 'Hammer of Avernii – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'These custom-built servo-skulls detach from augmetic tethers as the Iron Hands pass, settling into sentry patterns around vital strategic sites.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Dreadnought, Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army within range of an objective marker you control.',
          effect: 'That objective marker remains under your control, even if you have no models within range of it, until your opponent controls it at the end of a phase.',
          restrictions: '',
        },
        {
          name: 'Dropship Extraction',
          sublabel: 'Hammer of Avernii – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Terminators withdraw from the fight during a lull, board airborne transports and prepare their next assault.',
          when: "End of your opponent's Fight phase.",
          target: 'One Adeptus Astartes Terminator unit from your army. You cannot target a unit that is within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Iron Laurel',
          points: 10,
          flavor: 'A subcutaneous cranial honour relic, this device contains a strategic orbital upload relay.',
          body: `Adeptus Astartes model only. Improve the Objective Control characteristic of the bearer by 1. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Objective Control characteristic of all other models in the bearer's unit as well.`,
        },
        {
          name: 'Medusan Roar',
          points: 30,
          aura: true,
          flavor: "Mounted in the warrior's gorget, this device amplifies their battle cries into terrifying sonic shock waves.",
          body: `Adeptus Astartes model only. While an enemy unit (excluding Monsters and Vehicles) is within 6" of the bearer, each time that unit fails a Battle-shock test, one model in that unit is destroyed (chosen by its controlling player). Once per battle, when such an enemy unit fails a Battle-shock test, you can choose for D3 models in that unit to be destroyed in this way instead.`,
        },
        {
          name: 'Spiritus Ferrum',
          points: 25,
          flavor: 'This ancient augmetic empowers its bearer — and in extremis even their comrades — with the fury of the motive force.',
          body: `Adeptus Astartes model only. Add 1 to the Attacks characteristic of the bearer's melee weapons. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by all other models in the bearer's unit as well.`,
        },
        {
          name: 'Steel Font',
          points: 15,
          flavor: "An advanced autochirurgeon claimed by legend to be the product of Ferrus Manus' own labours, this device rapidly reknits sundered flesh and armour alike.",
          body: `Adeptus Astartes Terminator model only. While the bearer is leading a unit, in your Command phase, you can return 1 destroyed Bodyguard model to that unit.`,
        },
      ],
    },

    {
      id: 'spearpoint-task-force',
      name: 'Spearpoint Task Force',
      source: 'faction-pack',
      chapter: 'White Scars',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Stormswift Onslaught',
        flavor:
          'The White Scars are masters of high-speed tactics and hit-and-run warfare. They do battle on the move and from the saddle, outwitting their enemies with breakneck manoeuvres and melting away one moment only to crash home with bone-crushing force the next.',
        body: `Adeptus Astartes units from your army are eligible to declare a charge in a turn in which they Advanced or Fell Back.

### Wrath of the First Khan
As swift and violent as a raging tempest, Suboden Khan drives into and through the heart of the enemy like a thrust lance. At the end of the Fight phase, if a Suboden Khan unit from your army destroyed one or more enemy units this phase and is not within Engagement Range of one or more enemy units, that unit can make a Normal move of up to 6".

Restrictions: Your army can include White Scars units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        armourOfContempt('Spearpoint Task Force'),
        {
          name: 'Spear Thrust and Sabre Swing',
          sublabel: 'Spearpoint Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Some foes can be ended with a single charge. Others require sustained savagery to fell. The White Scars are adept at both methods of fighting.',
          when: 'Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to fight this phase.',
          effect: 'Select either the [LANCE] or [LETHAL HITS] ability. Until the end of the phase, melee weapons equipped by models in your unit have the selected ability. If it is a Mounted unit, until the end of the phase, melee weapons equipped by models in your unit have the [LANCE] and [LETHAL HITS] abilities instead.',
          restrictions: '',
        },
        {
          name: 'Mobile Lethality',
          sublabel: 'Spearpoint Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The White Scars fight their wars at a furious tempo, and their warriors are adept at fire-and-manoeuvre strategies.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Advanced or Fell Back.',
          restrictions: '',
        },
        {
          name: "Hunter's Instincts",
          sublabel: 'Spearpoint Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "The White Scars read the ebb and flow of battle with the hungry cunning of raptorial predators, reacting to the enemy's movements with exceptional rapidity.",
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that is within 8" of that enemy unit. You cannot target a unit that is within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to 6".',
          restrictions: '',
        },
        {
          name: 'Evasive Manoeuvres',
          sublabel: 'Spearpoint Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Battle-brothers of the White Scars Chapter are born and raised in the saddle. Expert pilots and riders all, they weave through incoming fire with instinctive skill.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Astartes Mounted or Adeptus Astartes Fly Vehicle unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Withdraw and Regroup',
          sublabel: 'Spearpoint Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The riders and pilots sweep away as swiftly as they arrive, regrouping in preparation for their next assault.',
          when: "End of your opponent's Fight phase.",
          target: 'One Adeptus Astartes Mounted or Adeptus Astartes Fly Vehicle unit from your army that is not within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Chogorian Huntmaster',
          points: 25,
          flavor: 'This mounted huntsman knows well the importance of manoeuvre, outflanking the enemy and ambushing unsuspecting foes from the flanks and rear.',
          body: `Adeptus Astartes Mounted model only. If the bearer's unit is in Strategic Reserves, for the purposes of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.`,
        },
        {
          name: "Hunter's Eye",
          points: 20,
          flavor: "This augmetic eye enhances the user's visual spectrum, enabling them to pinpoint heat signatures and cogitate appropriate firing solutions.",
          body: `Adeptus Astartes model only. Ranged weapons equipped by models in the bearer's unit have the [SUSTAINED HITS 1] and [IGNORES COVER] abilities.`,
        },
        {
          name: 'Spearpoint Paragon',
          points: 25,
          flavor: 'Decades of service within the White Scars First Company have helped this superlative warrior master the violent arts of high-speed combat.',
          body: `Adeptus Astartes model only. Improve the Strength and Armour Penetration characteristics of the bearer's melee weapons by 1. Each time the bearer ends a Charge move, until the end of the turn, improve the Strength and Armour Penetration characteristics of the bearer's melee weapons by 2 instead.`,
        },
        {
          name: "Stormseers' Wisdom",
          points: 15,
          flavor: "The Chapter's Librarians have made this champion privy to omens of great threats in future wars, leading their warriors to war with a boldness that some mistake for recklessness.",
          body: `Adeptus Astartes model only. While the bearer is leading a unit, you can re-roll Advance rolls made for that unit.`,
        },
      ],
    },

    {
      id: 'forgefathers-seekers',
      name: "Forgefather's Seekers",
      source: 'faction-pack',
      chapter: 'Salamanders',
      dp: 2,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: "Vulkan's Quest",
        flavor:
          "Tireless in his pursuit of the Primarch's legacy, Forgefather Vulkan He'stan annihilates any who impede his quest. Favouring swift, aggressive assaults, he and his warriors close rapidly with the enemy, destroying them at close range with ruthless efficiency.",
        body: `Ranged weapons equipped by Adeptus Astartes models from your army have the [ASSAULT] ability, and each time an attack made with such a weapon targets a unit within 12", add 1 to the Strength characteristic of that attack.

### Seeker's Companions
If your army includes Vulkan He'stan, during your turn, each Infernus Squad unit from your army is eligible to do one of the following:
▪ Start to perform an Action in a turn in which it Advanced.
▪ Shoot in a turn in which it started to perform an Action.

Restrictions: Your army can include Salamanders units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        armourOfContempt("Forgefather's Seekers"),
        {
          name: 'Crucible of Battle',
          sublabel: "Forgefather's Seekers – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Only where the enemy can be faced eye to eye can a Space Marine be truly tested.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets the closest eligible target within 6", add 1 to the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Immolation Protocols',
          sublabel: "Forgefather's Seekers – Battle Tactic Stratagem",
          cp: '2CP',
          turn: 'your',
          flavor: 'Salvo after salvo of burning promethium unleashed in synchronised waves will leave almost any foe as smouldering ash.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, Torrent weapons equipped by models in your unit have the [DEVASTATING WOUNDS] ability.',
          restrictions: '',
        },
        {
          name: 'Wrathful Inferno',
          sublabel: "Forgefather's Seekers – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'The enemy has closed with your warriors. Now you have them precisely where you want them. Unleash upon them the fires of damnation.',
          when: 'Your Movement phase, just after an Adeptus Astartes Infantry unit from your army Falls Back.',
          target: 'That unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Burning Vengeance',
          sublabel: "Forgefather's Seekers – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: "To open fire on warriors of the Salamanders is merely to invite one's own swift destruction.",
          when: "Your opponent's Shooting phase, just after an enemy unit has shot.",
          target: "One Adeptus Astartes Transport unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'One unit embarked within that Transport can disembark as if it were your Movement phase, and can then shoot as if it were your Shooting phase, but must target only that enemy unit when doing so, and can only do so if that enemy unit is an eligible target.',
          restrictions: '',
        },
        {
          name: 'Blazing Earth',
          sublabel: "Forgefather's Seekers – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: "When faced with an onrushing horde, the Forgefather's warriors set fire to the earth beneath their feet, impeding their advance and throwing them into confusion.",
          when: "Start of your opponent's Charge phase.",
          target: 'One Adeptus Astartes unit from your army equipped with one or more Torrent weapons.',
          effect: 'Select one enemy unit (excluding Monsters and Vehicles and units with the Fly keyword) within 12" of and visible to your unit. Until the end of the phase, each time that enemy unit declares a charge, subtract 2 from the Charge roll (this is not cumulative with any other negative modifiers to that Charge roll).',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Adamantine Mantle',
          points: 20,
          flavor: 'This flowing cloak or finely wrought tabard is laced through with threads of braided adamantine.',
          body: `Adeptus Astartes model only. Each time an attack is allocated to the bearer, subtract 1 from the Damage characteristic of that attack. If that attack was made with a Melta or Torrent weapon, change the Damage characteristic of that attack to 1 instead.`,
        },
        {
          name: 'Forged in Battle',
          points: 15,
          flavor: 'To this Angel of Death, war is the anvil upon which their strength is wrought.',
          body: `Adeptus Astartes model only. While the bearer is leading a unit, once per turn, after making a Hit roll or a saving throw for a model in that unit, you can change the result of that roll to an unmodified 6.`,
        },
        {
          name: 'Immolator',
          points: 10,
          flavor: 'Steeped in the Promethean Cult, this battle-brother wields the flamer with unparalleled mastery, turning the battlefield into a burning pyre for the corpses of his foes.',
          body: `Adeptus Astartes model only. Add 1 to the Attacks characteristic of Torrent weapons equipped by models in the bearer's unit.`,
        },
        {
          name: 'War-tempered Artifice',
          points: 25,
          flavor: "Having laboured long in the Chapter's forges, this warrior-smith has crafted his personal armaments.",
          body: `Adeptus Astartes Infantry model only. Add 3 to the Strength characteristic of the bearer's melee weapons.`,
        },
      ],
    },

    {
      id: 'emperors-shield',
      name: "Emperor's Shield",
      source: 'faction-pack',
      chapter: 'Imperial Fists',
      dp: 2,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Wrath of Dorn',
        flavor:
          'Lysander leads the elite of the Imperial Fists to where the fighting is thickest, there to bring ruin to those who would see the walls of the Imperium torn down.',
        body: `Each time a model from your army with the Oath of Moment ability makes an attack that targets your Oath of Moment target, you can re-roll a Wound roll of 1.

Each time a model in a Darnath Lysander unit from your army makes an attack that targets your Oath of Moment target, you can re-roll the Wound roll.

Restrictions: Your army can include Imperial Fists units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        armourOfContempt("Emperor's Shield"),
        {
          name: 'Wrathful Conquerors',
          sublabel: "Emperor's Shield – Strategic Ploy Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'The battle-brothers of the Imperial Fists 1st Company advance with merciless efficiency, eliminating all resistance and staking the Emperor\'s claim.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army within range of an objective marker you control.',
          effect: 'That objective marker remains under your control until your opponent’s Level of Control over that objective marker is greater than yours at the end of a phase.',
          restrictions: '',
        },
        {
          name: 'Fury of the First',
          sublabel: "Emperor's Shield – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Losses only serve to stoke the fiery wrath of the Imperial Fists and increase their resolve.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll. If your unit is below its Starting Strength, add 1 to the Wound roll as well.',
          restrictions: '',
        },
        {
          name: 'Disciplined Extermination',
          sublabel: "Emperor's Shield – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Masters of bolter drill, the Imperial Fists utilise precise fire patterns to scour their enemies from hiding places and fell them in droves.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that has not been selected to shoot this phase.',
          effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability and improve the Armour Penetration characteristic of such weapons by 1.',
          restrictions: '',
        },
        {
          name: 'Obdurate Vengeance',
          sublabel: "Emperor's Shield – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'Even when established wisdom favours retreat, the Imperial Fists remain defiant. Stubborn to the last, they would give their lives in the name of honour and the destruction of their foes.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Astartes Terminator, Bladeguard Veteran Squad, Sternguard Veteran Squad or Vanguard Veteran Squad unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: "Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 3+, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.",
          restrictions: '',
        },
        {
          name: 'Dropship Extraction',
          sublabel: "Emperor's Shield – Battle Tactic Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Making use of a lull in fighting, Terminator squads pull back from the front line, boarding airborne transports and withdrawing to prepare their next assault.',
          when: "End of your opponent's Fight phase.",
          target: 'One Adeptus Astartes Terminator unit from your army. You cannot target a unit that is within Engagement Range of one or more enemy units.',
          effect: 'Remove your unit from the battlefield and place it into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Champion of the Feast',
          points: 25,
          flavor: 'A victor in the Feast of Blades, this battle-brother is a master of close-quarters fighting.',
          body: `Adeptus Astartes model only. Add 1 to the Attacks characteristic of the bearer's melee weapons. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by other models in the bearer's unit as well.`,
        },
        {
          name: 'Disciple of Rhetoricus',
          points: 10,
          flavor: 'This battle-brother is well versed in the Book of the Five Spheres, drawing upon the teachings of that ancient treatise to command with clarity and purpose.',
          body: `Adeptus Astartes Terminator model only. Improve the Objective Control characteristic of the bearer by 1. Once per battle, at the start of any phase, the bearer can use this Enhancement. If it does, until the end of the phase, add 1 to the Objective Control characteristic of other models in the bearer's unit as well.`,
        },
        {
          name: 'Indomitable Champion',
          points: 20,
          flavor: 'Even seemingly mortal wounds will not turn a son of Dorn from his duty.',
          body: `Adeptus Astartes Terminator model only. The first time the bearer is destroyed, roll one D6 at the end of the phase. On a 2+, set the bearer back up on the battlefield, as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 3 wounds remaining.`,
        },
        {
          name: 'Malodraxian Standard',
          points: 20,
          flavor: "Crafted in the aftermath of Lysander's great victory over the Iron Warriors on Malodrax, this gilded banner inspires the Imperial Fists to shatter their foes.",
          body: `Adeptus Astartes Ancient model only. Each time an attack targets the bearer's unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of the bearer's unit, subtract 1 from the Wound roll.`,
        },
      ],
    },

    {
      id: 'shadowmark-talon',
      name: 'Shadowmark Talon',
      source: 'faction-pack',
      chapter: 'Raven Guard',
      dp: 2,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Masters of Shadow',
        flavor:
          'The Raven Guard are renowned for their uncanny ability to move unseen, cloaking themselves in darkness as they close in upon their prey.',
        body: `Each time a ranged attack targets an Adeptus Astartes unit from your army, unless the attacking model is within 12", the target has the Benefit of Cover.

### Unparalleled Tactician
A master of manoeuvre warfare, Aethon Shaan orchestrates battles with absolute precision. Once per battle round, if an Aethon Shaan model from your army is on the battlefield, you can use the Into Darkness Stratagem for 0CP.

Restrictions: Your army can include Raven Guard units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        armourOfContempt('Shadowmark Talon'),
        {
          name: 'Stunning Fusillade',
          sublabel: 'Shadowmark Talon – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'From darkness and obscuring cover, Raven Guard battle-brothers open fire as one, striking their unaware targets with precision fire.',
          when: 'Your Shooting phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been selected to shoot this phase.',
          effect: "Until the end of the phase, each time a model in your unit makes a ranged attack that targets an enemy unit that is more than 12\" away, improve the Ballistic Skill and Armour Penetration characteristics of that attack by 1. If one or more enemy models are destroyed as a result of those attacks, select one of those destroyed models; that destroyed model's unit must take a Battle-shock test.",
          restrictions: '',
        },
        {
          name: 'Lay Low the Tyrants',
          sublabel: 'Shadowmark Talon – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'In a storm of blade thrusts and bludgeoning strikes, enemy champions and commanders are laid low, leaving their troops in leaderless disarray.',
          when: 'Fight phase.',
          target: 'One Adeptus Astartes Infantry unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [PRECISION] ability.',
          restrictions: '',
        },
        {
          name: 'Raptorial Vigilance',
          sublabel: 'Shadowmark Talon – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The Raven Guard are swift to exploit the movements of their foes, whether to pursue their prey and complete the kill or to make use of an opportunity to fade once more from sight.',
          when: "Your opponent's Movement phase, just after an enemy unit ends a Normal, Advance or Fall Back move.",
          target: 'One Adeptus Astartes Infantry or Adeptus Astartes Mounted unit from your army that is within 8" of the enemy unit that just ended that move. You cannot target a unit that is within Engagement Range of one or more enemy units.',
          effect: 'Your unit can make a Normal move of up to D6", or up to 6" instead if it is a Phobos or Scout Squad unit.',
          restrictions: '',
        },
        {
          name: 'Feint and Thrust',
          sublabel: 'Shadowmark Talon – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Retreating from the fight, these warriors lure their enemies on before swiftly turning the tables and hurling themselves into their now overextended foe.',
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back. If it is a Phobos or Scout Squad unit, it is also eligible to shoot and declare a charge in a turn in which it Advanced.',
          restrictions: '',
        },
        {
          name: 'Into Darkness',
          sublabel: 'Shadowmark Talon – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'At the opportune moment, Raven Guard infiltration units slip away from battle, only to relocate ready to strike the foe again.',
          when: "End of your opponent's Fight phase.",
          target: 'Up to two Phobos and/or Scout Squad units from your army, or one other Adeptus Astartes Infantry unit from your army. You cannot target a unit that is within Engagement Range of one or more enemy units.',
          effect: 'Remove those units from the battlefield and place them into Strategic Reserves.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Blackwing Shroud',
          points: 25,
          flavor: 'This mechanical device contains miniaturised refraction fields and electromagnetic interference projectors, enabling the bearer and their unit to evade detection and infiltrate key positions.',
          body: `Adeptus Astartes Infantry model only. While the bearer is leading a unit, models in that unit have the Infiltrators ability.`,
        },
        {
          name: 'Coronal Susurrant',
          points: 30,
          flavor: 'This wreath of circuitry from the Dark Age of Technology forces a whispering white noise into enemy minds and broadcasts.',
          body: `Phobos model only. The bearer has the following ability — Lord of Deceit (Aura): Once per turn, when your opponent targets a unit from their army within 12" of this model with a Stratagem, you can use this ability. If you do, increase the CP cost of that use of that Stratagem by 1CP.`,
        },
        {
          name: "Hunter's Instincts",
          points: 25,
          flavor: 'Those who master the Path of Ambush guide their forces to launch surprise assaults on the enemy with the precise timing of true hunters.',
          body: `Adeptus Astartes model only. In your Movement phase, if the bearer's unit is in Strategic Reserves, for the purposes of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.`,
        },
        {
          name: 'Umbral Raptor',
          points: 15,
          flavor: 'This warrior is a solitary predator whose footsteps are all but silent and whose form is one with the shadows.',
          body: `Adeptus Astartes model only. The bearer has the Stealth and Lone Operative abilities.`,
        },
      ],
    },

    {
      id: 'bastion-task-force',
      name: 'Bastion Task Force',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Interlocking Tactics',
        flavor:
          'Employing the full breadth of combined arms tactics taught by the Codex Astartes, mainstay squads hit and fade, blunting enemy attacks while acquiring auspex data to guide the targeting of their more heavily armed comrades.',
        body: `Adeptus Astartes Battleline units from your army:
▪ Are eligible to shoot and declare a charge in a turn in which they Advanced or Fell Back.
▪ Are eligible to start to perform an Action in a turn in which they Advanced or Fell Back.

Each time an Adeptus Astartes Battleline unit from your army is selected to attack, after resolving those attacks, select one enemy unit hit by one or more of those attacks. Until the end of the turn, that enemy unit is auspex scanned. Each time an Adeptus Astartes model from your army makes an attack that targets an auspex scanned unit, re-roll a Hit roll of 1.`,
      },
      stratagems: [
        {
          name: 'Codex Discipline',
          sublabel: 'Bastion Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Holding to the teachings of the Codex Astartes, these warriors unleash disciplined volleys of firepower.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit, re-roll a Hit roll of 1. If that target is auspex scanned, re-roll a Wound roll of 1 as well.',
          restrictions: '',
        },
        {
          name: 'Shock Bombardment',
          sublabel: 'Bastion Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "An auspex-guided hail of shock charges blinds the foe's targeting systems and skews their aim.",
          when: 'Your Shooting phase or the Fight phase, just after an Adeptus Astartes Battleline unit from your army finished making its attacks.',
          target: 'That Adeptus Astartes Battleline unit.',
          effect: 'When an enemy unit is auspex scanned as a result of those attacks this turn, until the start of your next turn, it is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Guided Disruption',
          sublabel: 'Bastion Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Employing auspex data to reveal weak points in the foe\'s formation, the Space Marines exploit these to sow confusion and suppress their targets.',
          when: 'Your Shooting phase or the Fight phase, just after an Adeptus Astartes Battleline unit from your army has finished making its attacks.',
          target: 'That Adeptus Astartes Battleline unit.',
          effect: "When an enemy unit is auspex scanned as a result of those attacks this turn, if that enemy unit does not have the Monster or Vehicle keywords, until the start of your next turn, it is pinned. While a unit is pinned, subtract 2 from that unit's Move characteristic and subtract 2 from Charge rolls made for that unit.",
          restrictions: '',
        },
        {
          name: 'Angels Defiant',
          sublabel: 'Bastion Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'All too aware of their vital role in holding the foe at bay, these battle-brothers refuse to yield to even the most grievous of wounds.',
          when: "Your opponent's Shooting phase or the Fight phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Astartes Battleline unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit, subtract 1 from the Wound roll.',
          restrictions: '',
        },
        {
          name: 'Light of Vengeance',
          sublabel: 'Bastion Task Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With their frailties exposed by the harsh glare of auspex analysis, the foe are easy prey for the Space Marines\' vengeful onslaught.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have that ability while targeting an auspex scanned unit or if the bearer has the Battleline keyword.',
          restrictions: '',
        },
        {
          name: 'Heresy Undone',
          sublabel: 'Bastion Task Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Tactical scans and cogitator analysis have revealed the enemy's debased schemes, rendering their movements easier to anticipate and counter.",
          when: 'Your Shooting phase or your Charge phase.',
          target: 'One Adeptus Astartes unit (excluding Battleline units) from your army.',
          effect: 'Until the end of the phase, your unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back. If it does, every target of that charge and every target of those attacks must be an auspex scanned unit.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Blades of Valour',
          points: 15,
          flavor: 'This officer and their honour guard of dedicated battle-brothers have been presented with masterwork combat blades in recognition of the selfless battle they are about to fight.',
          body: `Adeptus Astartes model only. Improve the Armour Penetration characteristic of melee weapons equipped by the bearer and Battleline models in the bearer's unit by 1.`,
        },
        {
          name: 'Bombast Omnivox',
          points: 15,
          flavor: "This remarkable technological relic is mounted within the bearer's armour gorget and facilitates code-hardened, rapid-exchange intelligence dissemination while in battle.",
          body: `Adeptus Astartes model only. Each time you select the bearer's unit as the target of a Stratagem, roll one D6, adding 1 if the bearer's unit has the Battleline keyword: on a 4+, you gain 1CP.`,
        },
        {
          name: 'Eye of the Primarch',
          points: 10,
          flavor: "This master-crafted micro-auspex integrates with the bearer's autosenses and feeds superior targeting data to them and their squad.",
          body: `Adeptus Astartes model only. Ranged weapons equipped by the bearer and Battleline models in the bearer's unit have the [PRECISION] ability.`,
        },
        {
          name: 'Hero of the Chapter',
          points: 20,
          flavor: "A storied and inspirational exemplar of their Chapter's virtues, this war leader is an inspirational presence amongst the ranks of their battle-brothers.",
          body: `Adeptus Astartes model only. While the bearer is leading a unit, the bearer has the Battleline keyword.`,
        },
      ],
    },

    {
      id: 'orbital-assault-force',
      name: 'Orbital Assault Force',
      source: 'faction-pack',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Rapid-drop Deployment',
        flavor:
          'Through the use of teleportation, Drop Pods and gunship insertion, entire strike forces of Space Marines and even their armoured support can deploy from orbit in a matter of moments, a capability that in and of itself has won entire wars.',
        body: `At the start of the Declare Battle Formations step, select a number of Adeptus Astartes units (excluding Titanic units) from your army based on the battle size, as shown below. Models in those units have the Deep Strike ability.
▪ Incursion: 2 units
▪ Strike Force: 3 units
▪ Onslaught: 4 units

Each time an Adeptus Astartes model from your army makes an attack, if it was set up on the battlefield this turn, re-roll a Wound roll of 1. If it disembarked from a Drop Pod this turn, re-roll a Hit roll of 1 as well.`,
      },
      stratagems: [
        {
          name: 'Suppression Strafing',
          sublabel: 'Orbital Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'As the Space Marines storm forward, their gunships and fighter craft streak overhead, hammering enemy positions with hails of fire to keep the foe pinned.',
          when: 'Command phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Select one enemy unit visible to and within 18" of your unit. That enemy unit takes a Battle-shock test. When doing so, subtract 1 from that test and, if that test is failed, until the start of your next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.',
          restrictions: 'You cannot use this Stratagem more than once per battle round.',
        },
        {
          name: 'Tactical Decapitation',
          sublabel: 'Orbital Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'By rapidly eliminating localised enemy leaders, the Space Marines keep the foe off balance and hamper organised resistance to their onslaught.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Until the end of the phase, weapons equipped by models in your unit have the [PRECISION] ability and each time a model in your unit makes an attack that targets a Character unit, add 1 to the Hit roll.',
          restrictions: '',
        },
        {
          name: 'Shock Onslaught',
          sublabel: 'Orbital Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The sheer devastating momentum of a Space Marine drop assault shatters one enemy battle line after another.',
          when: 'Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to fight this phase.',
          effect: 'Until the end of the phase, each time a model in your unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".',
          restrictions: '',
        },
        {
          name: 'Auto-sense Coordination',
          sublabel: 'Orbital Assault Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'By binding the datafeeds from their autosenses, these battle-brothers generate triangulated targeting solutions for close-quarters fire spreads.',
          when: 'Your Shooting phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not been selected to shoot or fight this phase.',
          effect: 'Select the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until the end of the phase, weapons equipped by models in your unit have this ability in a turn in which they disembarked from a Drop Pod or while targeting an enemy unit within 12".',
          restrictions: '',
        },
        {
          name: 'Blind Screen',
          sublabel: 'Orbital Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Autolaunchers spit a precogitated spread of blind grenades to baffle organic and mechanical targeting.',
          when: "Your opponent's Shooting phase, just after an enemy unit has selected its targets.",
          target: "One Adeptus Astartes unit (excluding Titanic units) from your army that was selected as the target of one or more of the attacking unit's attacks and one friendly Adeptus Astartes Smoke Vehicle or Drop Pod unit within 9\" of it.",
          effect: 'Until the end of the phase, models in your units have the Stealth ability and each time a ranged attack targets one of your units, models in that unit have the Benefit of Cover against that attack.',
          restrictions: '',
        },
        {
          name: 'Onward for the Emperor',
          sublabel: 'Orbital Assault Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'There is always another battle to be fought, and the Space Marines waste no time in fighting it.',
          when: "End of your opponent's Fight phase.",
          target: 'One Adeptus Astartes Infantry unit from your army that was not set up on the battlefield this turn and one friendly Transport it is able to embark within.',
          effect: 'If your Adeptus Astartes unit is wholly within 6" of that Transport, it can embark within it.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Dedicated Gunship',
          points: 15,
          flavor: 'Bulky and somewhat lumbering as they are, Terminator squads — or even particularly vital officers wearing Terminator plate — may be assigned a gunship for swift combat extraction and relocation mid-battle.',
          body: `Adeptus Astartes Terminator model only. Once per battle, at the end of your opponent's Fight phase, if the bearer's unit is not within Engagement Range of one or more enemy units, the bearer can use this Enhancement. If it does, remove the bearer's unit from the battlefield and place it into Strategic Reserves.`,
        },
        {
          name: 'Laurels of Thunder',
          points: 15,
          flavor: 'This honour is awarded to those Space Marine officers who display greatest vigour during orbital drops.',
          body: `Adeptus Astartes model only. You can re-roll Charge rolls made for the bearer's unit in a turn in which it was set up on the battlefield.`,
        },
        {
          name: 'Orbital Uplink Reliquary',
          points: 25,
          flavor: 'Though it appears a morbid trinket of faith, in truth this device contains a powerful micro-cogitator linked to the strategium of the orbiting strike cruiser.',
          body: `Adeptus Astartes model only. After both players have deployed their armies, select up to three Adeptus Astartes units from your army and redeploy them. When doing so, you can set those units up in Strategic Reserves if you wish, regardless of how many units are already in Strategic Reserves.`,
        },
        {
          name: 'Veteran of the Vanguard',
          points: 20,
          flavor: 'Long experience leading Phobos-armoured vanguard strikes has taught this warrior many lessons about swift and stealthy attacks.',
          body: `Adeptus Astartes model only. Models in the bearer's unit have the Scouts 6" ability.`,
        },
      ],
    },

    {
      id: 'reclamation-force',
      name: 'Reclamation Force',
      source: 'faction-pack',
      chapter: 'Ultramarines',
      dp: 2,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Oath of Reclamation',
        flavor:
          'The driving principle behind all that these battle-brothers do is the honouring of their oaths to drive back the darkness and reconquer the Five Hundred Worlds, one battlefield at a time.',
        body: `▪ Each time an Adeptus Astartes model from your army makes a melee attack that targets a unit within range of an objective marker, improve the Armour Penetration characteristic of that attack by 1.
▪ Each time an attack targets an Adeptus Astartes unit from your army, if your unit is within range of an objective marker that you controlled at the start of the phase and if the Strength characteristic of that attack is greater than the Toughness characteristic of your unit or your unit has the Titus keyword, subtract 1 from the Wound roll.

Restrictions: Your army can include Ultramarines units, but it cannot include any Adeptus Astartes units drawn from any other Chapter.`,
      },
      stratagems: [
        {
          name: 'Crusading Conquerors',
          sublabel: 'Reclamation Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The sheer will of these battle-brothers to reclaim the sacred Five Hundred Worlds is overwhelming.',
          when: 'End of the Command phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: 'Until the start of the next Command phase, add 1 to the Objective Control characteristic of models in your unit.',
          restrictions: '',
        },
        {
          name: 'Furious Dedication',
          sublabel: 'Reclamation Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Cold fury of purpose drives the charge of the Space Marines, their absolute dedication to their cause lending them ferocious speed and strength.',
          when: 'Your Charge phase or the Fight phase.',
          target: 'One Adeptus Astartes unit from your army that has not declared a charge or been selected to fight this phase.',
          effect: 'Until the end of the turn, add 2 to Charge rolls made for your unit and add 1 to the Attacks characteristic of melee weapons equipped by models in your unit.',
          restrictions: 'You cannot use this Stratagem more than once per turn.',
        },
        {
          name: 'Fight to the End',
          sublabel: 'Reclamation Force – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Those who have sworn an oath to see Ultramar reclaimed will not yield a single yard of its territories once they have seized and secured them.',
          when: 'Fight phase, just after an enemy unit has selected its targets.',
          target: "One Adeptus Astartes unit from your army that was selected as the target of one or more of the attacking unit's attacks.",
          effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
          restrictions: '',
        },
        {
          name: 'Scions of Guilliman',
          sublabel: 'Reclamation Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The genesons of Roboute Guilliman are masters of his tenets, regardless of which Chapter they hail from.',
          when: 'Your Movement phase, just after an Adeptus Astartes unit from your army ends a Fall Back move.',
          target: 'That Adeptus Astartes unit.',
          effect: 'Until the end of the turn, your unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
          restrictions: '',
        },
        {
          name: 'Ultramarian Destiny',
          sublabel: 'Reclamation Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "All those Space Marines fighting to defend or to expand the Ultramarines' stellar realm trust that their conquest is nothing short of ordained by the Primarch's will.",
          when: 'Your Movement phase.',
          target: 'One Adeptus Astartes unit from your army.',
          effect: "Select one objective marker you control that your unit is within range of. That objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.",
          restrictions: '',
        },
        {
          name: 'Marching Ever On',
          sublabel: 'Reclamation Force – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The road to the complete rebuilding of the Five Hundred Worlds will be a long and gruelling one, and those who fight their way along it cannot pause in their advance for even a moment.',
          when: "Your opponent's Movement phase, just after an enemy unit Falls Back.",
          target: 'One Adeptus Astartes unit from your army that was within Engagement Range of that enemy unit at the start of the phase.',
          effect: 'Your unit can make a Normal move of up to D6"+1.',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Avenging Avatar',
          points: 10,
          aura: true,
          flavor: 'Eyes alight with determination and vengeful fury, this champion of the Chapter seems almost to cast the dread shadow of the Primarch himself across his quailing foes.',
          body: `Adeptus Astartes model only. In the Battle-shock step of your opponent's Command phase, if an enemy unit that is below its Starting Strength is within 9" of the bearer, that enemy unit must take a Battle-shock test.`,
        },
        {
          name: 'Liberatum',
          points: 25,
          flavor: "Forged on Macragge by the finest artisans, this weapon's machine spirit is said to burn with a desire to see the Five Hundred Worlds ripped from the grasp of heretics and despots.",
          body: `Adeptus Astartes model only. Each time the bearer makes an attack that targets an enemy unit, if the target is within range of an objective marker, you can re-roll the Hit roll and you can re-roll the Wound roll.`,
        },
        {
          name: 'Scroll of Proclamation',
          points: 15,
          flavor: "Finely scribed on vellum and tightly bound in an armoured scroll case, the words of Roboute Guilliman's Consilias Imperitus Ultimar prove a constant source of inspiration.",
          body: `Adeptus Astartes model only. When this unit declares a charge, if an enemy unit within range of an objective is within 12" of this unit, you can use this Enhancement. If you do:\n▪ This unit can re-roll that charge roll.\n▪ This unit __must__ end that charge move engaged with one or more of those enemy units.`,
        },
        {
          name: 'Seals of Reconquest',
          points: 20,
          flavor: 'These precious seals are manufactured on Konor, and contain micro shield generators that help to safeguard battle-brothers while they fulfil their oaths of duty.',
          body: `Adeptus Astartes model only. Models in the bearer's unit have a 5+ invulnerable save.`,
        },
      ],
    },

    // Added in the App v2.2.0 (data_version 909) dataslate. appdata's own `category` field for
    // all 3 of its stratagems is null (a gap in that dataslate's data, not specific to this
    // detachment) — sublabel categories below are inferred from the effect/timing pattern
    // against existing stratagems of the same shape, not read directly from source; re-verify
    // against the physical card/PDF if one becomes available.
    {
      id: 'vengeful-hosts',
      name: 'Vengeful Hosts',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Imperator Unleashed',
        flavor: 'The warrior hosts deployed in Operation Imperator know they must strike with decisive fury if they are to break their foes.',
        body: `In a turn a friendly Adeptus Astartes Fly Infantry unit made an ingress/charge move, that unit's attacks can re-roll Hit rolls of 1.`,
      },
      stratagems: [
        {
          name: 'Meteoric Onslaught',
          sublabel: 'Vengeful Hosts – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Jump jets blazing, these Space Marine shock troops slam into their foes with bone-breaking force.',
          when: 'Fight phase, when a friendly Adeptus Astartes Fly Infantry unit that made a charge move this turn is selected to attack.',
          target: 'That friendly Adeptus Astartes Fly Infantry unit.',
          effect: "Your unit's melee attacks have +1 S.",
          restrictions: '',
        },
        {
          name: 'Know No Fear',
          sublabel: 'Vengeful Hosts – Battle Tactic Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Inspired by duty, these warriors reject dismay and fight on with renewed fury.',
          when: 'Your Command phase.',
          target: "One friendly Battle-shocked Adeptus Astartes unit. You can target that unit with this Stratagem even though it is Battle-shocked.",
          effect: 'Your unit is no longer Battle-shocked.',
          restrictions: '',
        },
        {
          name: 'Purge by Sectors',
          sublabel: 'Vengeful Hosts – Strategic Ploy Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Focused on sweeping the Ork threat from Armageddon, if these warriors find themselves unengaged, they press swiftly onward.',
          when: 'End of the Fight phase.',
          target: 'One friendly unengaged Adeptus Astartes Fly Infantry unit that was eligible to fight this phase.',
          effect: 'Your unit can make a Normal move of up to D3+3".',
          restrictions: '',
        },
      ],
      enhancements: [
        {
          name: 'Avenging Angel',
          points: 20,
          flavor: 'Descending on wings of fire, this warrior spreads terror of Imperial vengeance through the ranks of the foe.',
          body: `Adeptus Astartes Fly Infantry model only. When this unit ends an ingress move, select up to one enemy unit within 9" of this unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.`,
        },
        {
          name: 'Orksbane',
          points: 20,
          flavor: 'The machine spirit of this ancient relic weapon is said to hate Orks with a vehemence that kills them on contact.',
          body: `Adeptus Astartes Fly Infantry model only. This model has the following weapon:
▪ **Orksbane** [CLEAVE 2] — Melee, A 4, WS 2+, S 8, AP -2, D 3.`,
        },
      ],
    },
  ],

  // Datasheets — added in a later pass (rendered by DatasheetCard).
  datasheets: [],
}

export const spaceMarines = { en, ru: en }
