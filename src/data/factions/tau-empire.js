// T'au Empire — faction rules. Resolved from the same source priority as the other factions
// (highest wins): MFM (points, DP / Force Disposition) > Faction Pack > Codex.
//
//   Codex layer: originally imported from the Wahapedia CSV exports (importer since retired)
//     (Wahapedia carries the 10ed codex text with most pack updates already applied) →
//     4 codex detachments (Kauyon, Kroot Hunting Pack, Mont'ka, Retaliation Cadre).
//   Faction Pack v1.0 (sources/Faction pack 11 ed/xenos/Tau.pdf) → army rule rewrite
//     (For the Greater Good), 3 pack detachments (Advanced Acquisition Cadre + rewritten
//     Auxiliary Cadre and Experimental Prototype Cadre) and the remaining Rules Updates
//     (folded in below — see inline notes).
//   MFM (src/data/mfm/tau-empire.js) → per-enhancement points, per-detachment dp /
//     forceDisposition, and the AUXILIARY / BATTLESUIT `unique` tags.
//
// 7 detachments total, matching the MFM list. EN-first: `ru` reuses the same object for now.
// Markup follows useRenderInline / RuleBlock / StratCard conventions: **bold**, [BRACKET]
// weapon abilities → KeywordPopover, `▪ ` bullets, `### ` subheadings. Datasheets later.
const en = {
  slug: "tau-empire",
  name: "T’au Empire",

  // Faction-Pack Rules Update rewrote For the Greater Good (Observer / Spotted / Guided).
  armyRule: {
    id: 'for-the-greater-good',
    name: 'For the Greater Good',
    flavor:
      'The Hunter Cadres battle for the betterment of the T’au Empire, not for personal gain or egotistic accomplishments. This burning commitment allows for prodigiously effective covering fire. Enemies are pinned in place by deadly bursts of pulse blasts, or the infamous T’au markerlight is used to expose even well-fortified enemy positions, allowing other T’au warriors to fall on the vulnerable enemies with murderous force.',
    body: `If your [gloss:army-faction:Army Faction] is T’AU EMPIRE, at the start of your Shooting phase you can select units from your army with this ability to become **[gloss:tau-observer:Observer]** units.

During your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is [gloss:eligible-to-shoot:eligible to shoot] (excluding FORTIFICATION and [gloss:battle-shocked:Battle-shocked] units) select one enemy unit that is [gloss:visible:visible] to be marked as their **[gloss:tau-spotted:Spotted]** unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.

Units from your army with the For the Greater Good ability (excluding Observer units) are **[gloss:tau-guided:Guided]** units while targeting one or more Spotted units.

Until the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the [gloss:ballistic-skill:Ballistic Skill] characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.

### Drones
If you have upgraded a model to have a drone, place a Drone token next to your model as a reminder. These do not count as models for any rules purposes.
▪ **Guardian Drone:** Each time a model makes a ranged attack that targets the bearer’s unit, subtract 1 from the Wound roll.
▪ **Marker Drone:** The bearer’s unit has the Markerlight keyword and can act as an Observer unit for another unit even if it Advanced this turn.
▪ **Shield Drone:** Add 1 to the bearer’s Wounds characteristic.
▪ **Gun Drone / Missile Drone:** The bearer is equipped with the drone’s ranged weapon (see that model’s own wargear).`,
  },

  detachments: [
    // ───────────────────────── CODEX DETACHMENTS (via Wahapedia import) ─────────────────────────
    {
      id: "kauyon",
      name: "Kauyon",
      source: 'codex',
      dp: 2,
      forceDisposition: "Priority Assets",
      rule: {
        name: "Patient Hunter",
        flavor: "The tactical philosophy known as the Kauyon allows for T’au commanders to draw the enemy into a deadly trap, springing it at the perfect moment to deliver a storm of fatal strikes against which none can escape.",
        body: "During the third, fourth and fifth [gloss:battle-round:battle rounds], [gloss:ranged-weapons:ranged weapons] equipped by T’au Empire models from your army have the [SUSTAINED HITS 1] ability. During the third, fourth and fifth battle rounds, while a unit is a [gloss:tau-guided:Guided] unit (see For the Greater Good), each time a [gloss:ranged-attacks:ranged attack] is made by a model in that unit that targets a [gloss:tau-spotted:Spotted] unit, you can ignore any or all [gloss:modifier:modifiers] to that attack’s [gloss:ballistic-skill:Ballistic skill] characteristics and/or all modifiers to the [gloss:hit-roll:Hit roll].",
      },
      stratagems: [
        {
          name: "Wall of Mirrors",
          sublabel: "Kauyon – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "T’au Stealth Cadres utilise obfuscation fields and wide-band refraction beams to mask their advance.",
          when: "End of your opponent’s Fight phase.",
          target: "One Stealth, Ghostkeel or Commander Shadowsun unit from your army.",
          effect: "Remove your unit from the battlefield and place it into [gloss:strategic-reserves:Strategic Reserves].",
          restrictions: "You cannot target a unit that is within [gloss:engagement-range:Engagement Range] of one or more enemy units.",
        },
        {
          name: "A Tempting Trap",
          sublabel: "Kauyon – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Kauyon teaches that many things can be used to bait a trap, luring the foe into position.",
          when: "Your Shooting phase.",
          target: "One T’AU EMPIRE unit from your army that has not been selected to shoot this phase. The first time you use this Stratagem, you must also select one [gloss:objective-marker:objective marker] that is not in your opponent’s [gloss:deployment-zone:deployment zone]; until the end of the battle, this becomes your Trap objective marker.",
          effect: "Until the end of the phase, each time a model in your unit makes a [gloss:ranged-attacks:ranged attack] that targets an enemy unit within range of your Trap objective marker, add 1 to the [gloss:wound-roll:Wound roll].",
          restrictions: "You cannot use this Stratagem during the first or second battle rounds.",
        },
        {
          name: "Coordinate to Engage",
          sublabel: "Kauyon – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "T’au Hunter Cadres work in close coordination to destroy the most dangerous enemy targets.",
          when: "Your Shooting phase.",
          target: "One T’AU EMPIRE unit from your army that has just been selected as an [gloss:tau-observer:Observer] unit (see For the Greater Good).",
          effect: "Until the end of the phase, each time a model in your unit makes an attack that targets their [gloss:tau-spotted:Spotted] unit, improve the [gloss:ballistic-skill:Ballistic Skill] characteristic of that attack by 1 and, if your unit has the Markerlight keyword, that attack has the [IGNORES COVER] ability.",
          restrictions: "",
        },
        {
          name: "Point-Blank Ambush",
          sublabel: "Kauyon – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Devastating firepower need not be applied from afar, especially when striking an unsuspecting foe.",
          when: "Your Shooting phase.",
          target: "One T’AU EMPIRE unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes a [gloss:ranged-attacks:ranged attack] that targets an enemy unit [gloss:within:within] 9\", improve the [gloss:armour-penetration:Armour Penetration] characteristic of that attack by 1.",
          restrictions: "You cannot use this Stratagem during the first or second battle rounds.",
        },
        {
          name: "Photon Grenades",
          sublabel: "Kauyon – Wargear Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Hurling a volley of photon grenades, the T’au leave their enemies dazzled and disorientated, unable to close the distance into combat at a crucial moment.",
          // Faction-Pack Rules Update reworded the When section.
          when: "Your opponent’s Charge phase, just after an enemy unit has selected its [gloss:charge-target:charge target].",
          target: "One T’au Empire Grenades unit from your army that was selected as one of the targets of that charge.",
          effect: "That enemy unit must immediately take a [gloss:battle-shock-test:Battle-shock test], and until the end of the phase, subtract 2 from [gloss:charge-roll:Charge rolls] made for that enemy unit.",
          restrictions: "You cannot target a unit that is within Engagement Range of one or more enemy units.",
        },
        {
          name: "Combat Embarkation",
          sublabel: "Kauyon – Wargear Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "Those who act as the lure in the Kauyon must be ready to make a hasty withdrawal once the enemy closes into killing range, lest they be trapped.",
          when: "Your opponent’s Charge phase, just after an enemy unit has [gloss:declare-charge:declared a charge].",
          target: "One T’au Empire Infantry unit from your army that was selected as one of the targets of that charge, and one [gloss:friendly:friendly] Transport.",
          effect: "Your unit [gloss:embark:embarks] within that TRANSPORT.",
          restrictions: "Every model in your INFANTRY unit must be within 3\" of that TRANSPORT and there must be sufficient [gloss:transport-capacity:transport capacity] to embark the entire unit.",
        },
      ],
      enhancements: [
        {
          name: "Exemplar of the Kauyon",
          points: 20,
          flavor: "Long meditation upon the tenets of the Patient Hunter has seen this warrior master the application of this cunning ambush strategy. When they take to the battlefield, they embody the teachings of the Kauyon, much to the dismay of their luckless prey.",
          body: "T’AU EMPIRE model only (excluding Kroot Shaper models). While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, the Patient Hunter [gloss:detachment-rule:Detachment rule] applies to that unit from the second [gloss:battle-round:battle round] onwards instead of from the third.",
        },
        {
          name: "Precision of the Patient Hunter",
          points: 15,
          flavor: "This warrior prowls the battlefield like a high-tech predator, stalking and assessing their quarry before they strike. When they do launch their assault, their every shot and blow is informed by careful observations, perfectly aimed where they will do the greatest harm.",
          body: "T’AU EMPIRE model only. Each time the [gloss:bearer:bearer] makes a [gloss:ranged-attacks:ranged attack], add 1 to the [gloss:hit-roll:Hit roll]. From the third [gloss:battle-round:battle round] onwards, add 1 to the [gloss:wound-roll:Wound roll] as well.",
        },
        {
          name: "Solid-image Projection Unit",
          points: 20,
          flavor: "This holowave-emitter drone projects beams of so-called heavy light, forming convincing illusory images while simultaneously masking the true locations of its allies with advanced refraction fields.",
          body: "T’AU EMPIRE model only. After both players have deployed their armies, select up to three T’AU EMPIRE units from your army and redeploy them. When doing so, you can set those units up in [gloss:strategic-reserves:Strategic Reserves] if you wish, regardless of how many units are already in Strategic Reserves.",
        },
        {
          name: "Through Unity, Devastation",
          points: 30,
          flavor: "Under their calm tutelage of this leader, warriors of the Fire caste maximise every shot they fire, creating a blizzard of deadly energy.",
          body: "T’AU EMPIRE model only (excluding Kroot Shaper models). While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, each time that unit is an [gloss:tau-observer:Observer] unit, until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in a [gloss:tau-guided:Guided] unit have the [LETHAL HITS] ability while targeting their [gloss:tau-spotted:Spotted] unit.",
        },
      ],
    },

    {
      id: "kroot-hunting-pack",
      name: "Kroot Hunting Pack",
      source: 'codex',
      dp: 2,
      forceDisposition: "Take and Hold",
      unique: "AUXILIARY",
      rule: {
        name: "Hunter’s Instincts & Skirmish Fighters",
        flavor: "The Kroot naturally predate upon weakened foes, drawn by the scent of spilled blood and viscera.",
        body: "### Hunter’s Instincts\nEach time a Kroot model from your army makes an attack, add 1 to the [gloss:hit-roll:Hit roll] if the target of that attack is [gloss:below-starting-strength:below its Starting Strength], and add 1 to the [gloss:wound-roll:Wound roll] as well if the target of that attack is [gloss:half-strength:Below Half-strength].\n\n### Skirmish Fighters\nKroot models from your army have a 6+ [gloss:invulnerable-save:invulnerable save] against [gloss:melee-attacks:melee attacks] and a 5+ invulnerable save against [gloss:ranged-attacks:ranged attacks].\n\n### Keywords\nIf you select this Detachment, Kroot Carnivore units from your army have the Battleline [gloss:keywords:keyword].",
      },
      stratagems: [
        {
          name: "Join the Hunt",
          sublabel: "Kroot Hunting Pack – Battle Tactic Stratagem",
          cp: "2CP",
          turn: "either",
          flavor: "When a Kroot Hunting Pack closes in on its prey, there are often other hunters waiting to join in the fray and take their share of any spoils.",
          when: "Any phase.",
          target: "One Kroot Infantry or Kroot Hounds unit from your army that was just [gloss:destroyed:destroyed]. You can use this Stratagem on that unit even though it was just destroyed.",
          effect: "Add a new unit to your army identical to your destroyed unit, in [gloss:strategic-reserves:Strategic Reserves], at its [gloss:starting-strength:Starting Strength].",
          restrictions: "This Stratagem cannot be used to return destroyed Character units to [gloss:attached-unit:Attached units]. You can only use this Stratagem once per battle.",
        },
        {
          name: "A Trap Well Laid",
          sublabel: "Kroot Hunting Pack – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The Kroot have long perfected the art of ambush hunting, their packs working in deadly concert.",
          when: "Your Shooting phase or the Fight phase.",
          target: "One Kroot unit from your army that has not been selected to shoot or fight this phase.",
          effect: "After your unit has [gloss:resolve-attacks:resolved its attacks] this phase, select one enemy unit that was hit by one or more of those attacks. Until the end of the phase, each time a KROOT model from your army makes an attack that targets that enemy unit, unless the attacking unit is [gloss:battle-shocked:Battle-shocked], improve the [gloss:armour-penetration:Armour Penetration] characteristic of that attack by 1.",
          restrictions: "",
        },
        {
          name: "The Grisly Feast",
          sublabel: "Kroot Hunting Pack – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "The psychological impact of witnessing one's comrades being dismembered and devoured by gore-splattered Kroot cannot be overstated.",
          when: "Fight phase.",
          target: "One Kroot unit from your army that destroyed one or more enemy units this phase.",
          effect: "In your opponent’s next Command phase, each enemy unit [gloss:within:within] 6\" of your unit must take a [gloss:battle-shock-test:Battle-shock test]. If the unit taking that test is [gloss:half-strength:Below Half-strength], subtract 1 from that test. Enemy units affected by this Stratagem do not need to take any other Battle-shock tests in the same phase.",
          restrictions: "",
        },
        {
          name: "Guerrilla Warriors",
          sublabel: "Kroot Hunting Pack – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Kroot see no value in stand-up fights, caring little for honour or glory. They hit and fade, frustrating their foes and bleeding them by degrees until - weakened and out of position - they are rendered vulnerable.",
          when: "Your Movement phase, just after a Kroot unit from your army [gloss:fall-back-move:Falls Back].",
          target: "That KROOT unit.",
          effect: "Until the end of the turn, your unit is [gloss:eligible-to-shoot:eligible to shoot] and [gloss:declare-charge:declare a charge].",
          restrictions: "",
        },
        {
          name: "Hidden Hunters",
          sublabel: "Kroot Hunting Pack – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "The Kroot are experts in camouflage and concealment, able to utilise cover in ways most foes would never consider and - to their great misfortune - do not anticipate.",
          when: "Your opponent’s Shooting phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
          target: "One Kroot unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, your unit can only be selected as the target of a [gloss:ranged-attacks:ranged attack] if the attacking model is [gloss:within:within] 18\".",
          restrictions: "",
        },
        {
          name: "EMP Grenades",
          sublabel: "Kroot Hunting Pack – Wargear Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Furnished by T’au allies or returning Farstalkers, these electromagnetic grenades wreak havoc with the animuses of armoured fighting vehicles.",
          when: "Your opponent’s Shooting phase or the Fight phase, just after an enemy VEHICLE unit is [gloss:selected-to-shoot:selected to shoot] or fight.",
          target: "One Kroot Grenades unit from your army [gloss:within:within] 8\" of that enemy VEHICLE unit.",
          effect: "Until the end of the phase, worsen the [gloss:weapon-skill:Weapon Skill] and [gloss:ballistic-skill:Ballistic Skill] characteristics of that enemy VEHICLE unit’s weapons by 1.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Borthrod Gland",
          points: 15,
          flavor: "The Kroot found the flesh of the Borthrod so irresistible they hunted them to extinction. This preserved gland still exudes pheromones that drive nearby Kroot into a ravenous frenzy.",
          body: "Kroot Flesh Shaper only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, each time a model in that unit makes a [gloss:melee-attacks:melee attack], an unmodified [gloss:hit-roll:Hit roll] of 5+ scores a [gloss:critical-hit:Critical Hit].",
        },
        {
          name: "Kroothawk Flock",
          points: 10,
          flavor: "This leader has painstakingly established a deep-seated bond with a small flock of Kroothawks. The avian creatures circle on high, spying out and revealing the hiding places of the prey or warning of ambushing enemies with wing-dips, diving stoops and harsh shrieks.",
          body: "Kroot model only. [gloss:ranged-weapons:Ranged weapons] equipped by models in the [gloss:bearer:bearer]’s unit have the [IGNORES COVER] ability, and enemy units that are set up on the battlefield as [gloss:reinforcements:Reinforcements] cannot be set up [gloss:within:within] 12\" horizontally of the bearer.",
        },
        {
          name: "Nomadic Hunter",
          points: 20,
          flavor: "This Shaper’s followers have become adept at the loping pursuit, snapping off harassing fire as they tirelessly and mercilessly run their victims to ground.",
          body: "Kroot Trail Shaper model only. While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, add 3\" to the [gloss:move-characteristic:Move characteristic] of models in that unit and [gloss:ranged-weapons:ranged weapons] equipped by models in that unit have the [ASSAULT] ability.",
        },
        {
          name: "Root-carved Weapons",
          points: 10,
          flavor: "Just as the Kroot venerate the so-called Roots from which their culture derives, so they prize the traditional forms of Root-carved weapons and must perform exceptional deeds to be permitted to wield them in war.",
          body: "Kroot War Shaper model only. All weapons equipped by the [gloss:bearer:bearer] have the [PRECISION] and [DEVASTATING WOUNDS] abilities.",
        },
      ],
    },

    {
      id: "montka",
      name: "Mont’ka",
      source: 'codex',
      dp: 3,
      forceDisposition: "Purge the Foe",
      rule: {
        name: "Killing Blow",
        flavor: "Mont’ka is the most aggressive style of T’au warfare. Its singular focus is the art of identifying a target of opportunity and attacking it swiftly with an overwhelming application of force.",
        body: "During the first, second and third [gloss:battle-round:battle rounds], [gloss:ranged-weapons:ranged weapons] equipped by T’AU EMPIRE models from your army have the [ASSAULT] ability. During the first, second and third battle rounds, while a unit is a [gloss:tau-guided:Guided] unit (see For the Greater Good), its ranged weapons have the [LETHAL HITS] ability.",
      },
      stratagems: [
        {
          name: "Aggressive Mobility",
          sublabel: "Mont’ka – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "By advancing swiftly into commanding positions, Mont’ka forces maximise the benefits of their enemies' shock and disorientation.",
          when: "Your Movement phase.",
          target: "One T’AU EMPIRE unit from your army that has not been selected to move this phase.",
          effect: "Until the end of the phase, if your unit [gloss:advance:Advances], do not make an [gloss:advance-roll:Advance roll] for it. Instead, until the end of the phase, add 6\" to the [gloss:move-characteristic:Move characteristic] of models in your unit.",
          restrictions: "",
        },
        {
          name: "Pinpoint Counter-Offensive",
          sublabel: "Mont’ka – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "Mont’ka emphasises rapid evolving threat-analysis and the application of overwhelming firepower to eliminate emergent high-priority targets.",
          when: "Any phase.",
          target: "One T’AU EMPIRE unit (excluding Kroot units) from your army that was just [gloss:destroyed:destroyed]. You can use this Stratagem on that unit even though it was just destroyed.",
          effect: "Until the end of the battle, each time a T’AU EMPIRE unit (excluding KROOT units) from your army makes an attack that targets the enemy unit that just destroyed your unit, you can [gloss:re-roll:re-roll] the [gloss:hit-roll:Hit roll].",
          restrictions: "",
        },
        {
          name: "Focused Fire",
          sublabel: "Mont’ka – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Mont’ka doctrine heavily emphasises the massed concentration of fire upon a single target at a time, obliterating each component of the enemy force in succession with a series of unrelenting barrages.",
          when: "Start of your Shooting phase.",
          target: "Two T’AU EMPIRE units from your army that have not been selected to shoot this phase, and one enemy unit.",
          effect: "Until the end of the phase, each time a model in either of your units makes an attack, it can only target that enemy unit (and only if it is an eligible target for that attack), and when resolving that attack, improve the [gloss:armour-penetration:Armour Penetration] characteristic by 1.",
          restrictions: "You cannot use this Stratagem during the fourth or fifth battle rounds.",
        },
        {
          name: "Combat Debarkation",
          sublabel: "Mont’ka – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "The most aggressive Fire caste warriors sometimes spring from moving transports, roll with the impact of landing, and come up with weapons already blazing.",
          when: "Your Shooting phase.",
          target: "One T’au Empire Infantry unit from your army that [gloss:disembark:disembarked] from a TRANSPORT this turn.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack that targets the closest enemy unit, you can [gloss:re-roll:re-roll] the [gloss:wound-roll:Wound roll].",
          restrictions: "",
        },
        {
          name: "Pulse Onslaught",
          sublabel: "Mont’ka – Strategic Ploy Stratagem",
          cp: "2CP",
          turn: "your",
          flavor: "Rather than charge into hand-to-hand combat, T’au soldiery instead intensify their fire patterns, pinning their advancing foes and staving off their onslaught.",
          when: "Your Shooting phase.",
          target: "One T’au Empire Infantry unit (excluding Kroot units) from your army that has just shot, and one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks.",
          effect: "Until the end of your opponent’s next turn, that enemy unit is shaken. While a unit is shaken, subtract 2 from its [gloss:move-characteristic:Move characteristic] and subtract 2 from [gloss:advance-roll:Advance] and [gloss:charge-roll:Charge rolls] made for it.",
          restrictions: "",
        },
        {
          name: "Counterfire Defence Systems",
          sublabel: "Mont’ka – Wargear Stratagem",
          cp: "2CP",
          turn: "opponent",
          flavor: "Point-defence systems trigger as incoming fire is detected, blasting projectiles from the air and lessening the power of the enemy fusillade.",
          when: "Your opponent’s Shooting phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
          target: "One T’AU EMPIRE unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, each time an attack is allocated to your unit, subtract 1 from the Damage characteristic of that attack.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Coordinated Exploitation",
          points: 30,
          flavor: "This leader eschews their own martial glory in favour of seeking out an advanced vantage point then exploiting it to guide in the firepower of their fellows.",
          body: "T’AU EMPIRE model only (excluding Kroot Shaper models). While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, each time that unit is an [gloss:tau-observer:Observer] unit, until the end of the phase, [gloss:ranged-weapons:ranged weapons] equipped by models in a [gloss:tau-guided:Guided] unit have the [SUSTAINED HITS 1] ability while targeting their [gloss:tau-spotted:Spotted] unit.",
        },
        {
          name: "Exemplar of the Mont’ka",
          points: 10,
          flavor: "This warrior has perfected the art of the Killing Blow, formulating swift and decisive battle plans and leading their cadres from the front in aggressive strikes.",
          body: "T’AU EMPIRE model only (excluding Kroot Shaper models). While the [gloss:bearer:bearer] is [gloss:lead:leading] a unit, the Killing Blow [gloss:detachment-rule:Detachment rule] applies to that unit during the fourth [gloss:battle-round:battle round] as well.",
        },
        {
          name: "Strategic Conqueror",
          points: 15,
          flavor: "A wise commander appreciates the strategic value of seizing a vital battlefield asset swiftly to establish a foothold, employing it as a jumping off point for further assaults or a rallying post for a swift retreat.",
          body: "T’AU EMPIRE model only. At the start of the first [gloss:battle-round:battle round], before the first turn begins, select one [gloss:objective-marker:objective marker] on the battlefield. While a [gloss:friendly:friendly] T’AU EMPIRE model is within range of that objective marker and the [gloss:bearer:bearer] is on the battlefield, add 1 to that friendly model’s [gloss:objective-control:Objective Control] characteristic.",
        },
        {
          name: "Strike Swiftly",
          points: 35,
          flavor: "This commander knows victory is best assured by taking the fight to the enemy as soon as battle is joined.",
          body: "T’AU EMPIRE model only. In the Resolve Pre-battle Abilities step, you can select up to two [gloss:friendly:friendly] T’AU EMPIRE units [gloss:within:within] 6\" of this model that do not have the [gloss:scouts:Scouts] ability. Until the end of the battle, all models in the selected units have the Scouts 6\" ability.",
        },
      ],
    },

    {
      id: "retaliation-cadre",
      name: "Retaliation Cadre",
      source: 'codex',
      dp: 2,
      forceDisposition: "Purge the Foe",
      unique: "BATTLESUIT",
      rule: {
        // Faction-Pack Rules Update: the Armour Penetration threshold became 8" (was 9").
        name: "Bonded Heroes",
        flavor: "Cadres of T’au Battlesuit pilots fight in a manner inspired by the dynamism and determination of famous and beloved war leaders. Indeed, some of the specialist piloting manoeuvres they employ are named after such icons, in a few rare - and sometimes unofficial - cases even after those who have since fallen far from favour with the Ethereal Council. Either way, these bonded veterans are experts in the deadly art of engaging the enemy in close confines. They plunge into the heart of the enemy army where the fighting is fiercest, and prevail in the name of the Greater Good.",
        body: "Each time a T’au Empire Battlesuit model from your army makes a [gloss:ranged-attacks:ranged attack] that targets a unit [gloss:within:within] 12\", improve the [gloss:strength:Strength] characteristic of that attack by 1. If that attack targets a unit within 8\", improve the [gloss:armour-penetration:Armour Penetration] characteristic of that attack by 1 as well.",
      },
      stratagems: [
        {
          name: "The Arro’kon Protocol",
          sublabel: "Retaliation Cadre – Battle Tactic Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Commander Arro’kon’s teachings are considered pre-eminent in the art of engaging and eliminating numerically overwhelming enemy formations.",
          when: "Your Shooting phase.",
          target: "One T’au Empire Battlesuit unit from your army that has not been selected to shoot this phase.",
          effect: "Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit that contains 6 or more models, that attack has the [SUSTAINED HITS 1] ability. If that attack targets an enemy unit that contains 11 or more models, it has the [SUSTAINED HITS 2] ability instead.",
          restrictions: "",
        },
        {
          name: "Fail-Safe Detonator",
          sublabel: "Retaliation Cadre – Epic Deed Stratagem",
          cp: "2CP",
          turn: "either",
          flavor: "Devices are incorporated into some battlesuits either to prevent high-ranking pilots being taken alive for interrogation or to prevent just such fatal explosions.",
          when: "Any phase, just after a T’au Empire Battlesuit model from your army is [gloss:destroyed:destroyed].",
          target: "That destroyed model’s unit. You can use this Stratagem on that unit even if that unit was just destroyed.",
          effect: "Before removing your model from play, if it has the Deadly Demise ability, do not roll for that ability; instead, you can choose whether the result of that roll is a 1 or a 6. If your model does not have the Deadly Demise ability, roll one D6 for each unit [gloss:within:within] 6\" of it: on a 4+, that unit suffers D3 [gloss:mortal-wound:mortal wounds].",
          restrictions: "",
        },
        {
          name: "The Shortened Blade",
          sublabel: "Retaliation Cadre – Strategic Ploy Stratagem",
          cp: "2CP",
          turn: "your",
          flavor: "Made famous by Commander Farsight and his protege Brightsword, this philosophy encourages pilots to drop into the very teeth of the enemy army and apply their firepower at point-blank range.",
          when: "Your Movement phase.",
          target: "One T’au Empire Battlesuit unit from your army that is arriving using the Deep Strike ability this phase.",
          effect: "Your unit can be set up anywhere on the battlefield that is more than 6\" horizontally away from all enemy models.",
          restrictions: "A unit targeted with this Stratagem is not [gloss:eligible-to-charge:eligible to declare a charge] in the same turn.",
        },
        {
          name: "The Torchstar Gambit",
          sublabel: "Retaliation Cadre – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Though now disgraced by association with O'Shovah, Sub-Commander Torchstar’s strike-and-fade tactics are still taught - albeit officially under other names - in many Fire caste academies.",
          when: "Your Shooting phase.",
          target: "One T’au Empire Battlesuit unit from your army that can FLY whose attacks have been resolved this phase.",
          effect: "If your unit is not within [gloss:engagement-range:Engagement Range] of one or more enemy units, it can make a [gloss:normal-move:Normal move]. If it does, your unit cannot [gloss:declare-charge:declare a charge] this turn.",
          restrictions: "",
        },
        {
          name: "Grav-Inhibitor Field",
          sublabel: "Retaliation Cadre – Strategic Ploy Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "First used by O’Jir during the battle for Laguna Shard, these battlesuit-mounted emitters batter advancing foes backwards with gravitic pulse waves.",
          when: "Your opponent’s Charge phase, just after an enemy unit has [gloss:declare-charge:declared a charge].",
          target: "One T’au Empire Battlesuit unit from your army that was selected as a target of that charge.",
          effect: "That enemy unit must immediately take a [gloss:battle-shock-test:Battle-shock test] and you must roll one D6 for each model in that enemy unit: for each 6, that enemy unit suffers 1 [gloss:mortal-wound:mortal wound].",
          restrictions: "",
        },
        {
          name: "Stimm Injectors",
          sublabel: "Retaliation Cadre – Wargear Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "On-board hypodermics shunt pain-blockers and chemical stimulants into the pilot's system.",
          when: "Your opponent’s Shooting phase or the Fight phase, just after an enemy unit has [gloss:select-targets:selected its targets].",
          target: "One T’au Empire Battlesuit unit from your army that was selected as the target of one or more of the attacking unit’s attacks.",
          effect: "Until the end of the phase, models in your unit have the Feel No Pain 6+ ability.",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Internal Grenade Racks",
          points: 20,
          flavor: "These thigh plates house deployment rails of high-explosive bomblets. As the pilot jets over the foe, the racks can be triggered to dispense a rain of death.",
          body: "T’au Empire Battlesuit model only. The [gloss:bearer:bearer] has the Grenades [gloss:keywords:keyword], and each time the bearer ends a [gloss:normal-move:Normal move], you can select one enemy unit that it moved over during that move. If you do, roll six D6: for each 4+, that enemy unit suffers 1 [gloss:mortal-wound:mortal wound].",
        },
        {
          name: "Prototype Weapon System",
          points: 15,
          flavor: "Famed battlesuit pilots are often more than willing to assist Earth caste scientists infield-testing the latest in experimental weapons technology.",
          body: "T’au Empire Battlesuit model only. Each time the [gloss:bearer:bearer] is [gloss:selected-to-shoot:selected to shoot], select either the [LETHAL HITS] or [SUSTAINED HITS 1] ability. Until those attacks are resolved, [gloss:ranged-weapons:ranged weapons] equipped by the bearer have the selected ability.",
        },
        {
          name: "Puretide Engram Neurochip",
          points: 15,
          flavor: "Commander Puretide was the most gifted T’au war leader of all time. Upon his death, his memories were stored in a neurochip. When implanted into the brain, the bearer can access much of this wisdom.",
          body: "T’au Empire Battlesuit model only. Each time you target the [gloss:bearer:bearer]’s unit with a [gloss:stratagem:Stratagem], roll one D6: on a 4+, you gain 1CP.",
        },
        {
          name: "Starflare Ignition System",
          points: 20,
          flavor: "The ignition thrusters on selected battlesuits are augmented with optional feed-selectors, allowing the pilot to release a jet of enriched accelerant upon take-off and sending the pilots streaking skywards.",
          body: "T’au Empire Battlesuit model only. At the end of your opponent’s turn, if the [gloss:bearer:bearer]’s unit is not within [gloss:engagement-range:Engagement Range] of one or more enemy units, you can remove that unit from the battlefield and place it into [gloss:strategic-reserves:Strategic Reserves].",
        },
      ],
    },

    // ───────────────────────── FACTION-PACK DETACHMENTS ─────────────────────────
    {
      id: "advanced-acquisition-cadre",
      name: "Advanced Acquisition Cadre",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Reconnaissance",
      rule: {
        name: "Expert Fieldcraft",
        flavor: "Extensive additional training – including tuition by Trail Shapers – enables these warriors to fire and relocate seamlessly while remaining concealed.",
        body: "In your Shooting phase, when a [gloss:friendly:friendly] PATHFINDER TEAM/STEALTH BATTLESUITS unit is [gloss:selected-to-shoot:selected to shoot], those [gloss:ranged-attacks:ranged attacks] do not prevent your unit from being [gloss:hidden:hidden].",
      },
      stratagems: [
        {
          name: "Marker Beacon",
          sublabel: "Advanced Acquisition Cadre – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "These small devices emit tight-beam triangulation signals for follow-up waves of incoming T’au forces, silently marking out strategically vital sites to be secured.",
          when: "End of your Movement phase.",
          target: "One [gloss:friendly:friendly] PATHFINDER TEAM/STEALTH BATTLESUITS unit.",
          effect: "Select one [gloss:objective:objective] your unit is controlling. That objective is [gloss:secured-objective:secured].",
          restrictions: "",
        },
        {
          name: "Microdrone Support",
          sublabel: "Advanced Acquisition Cadre – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Deployed from overflights of heavier stealth-capable carrier drones, these tiny machines provide versatile battlefield support for T’au stealth specialists, even in the midst of vicious firefights.",
          when: "Your Shooting phase, when a [gloss:friendly:friendly] PATHFINDER TEAM/STEALTH BATTLESUITS unit starts an [gloss:action:Action].",
          target: "That PATHFINDER TEAM/STEALTH BATTLESUITS unit.",
          effect: "That Action does not prevent your unit from being [gloss:eligible-to-shoot:eligible to shoot].",
          restrictions: "",
        },
        {
          name: "Autoreactive Camouflage",
          sublabel: "Advanced Acquisition Cadre – Stratagem",
          cp: "1CP",
          turn: "opponent",
          flavor: "An experimental new form of portable electro-camouflage generators, these small devices interweave active energy shielding with passive sensor damping to further protect T’au soldiery in hiding.",
          when: "Your opponent’s Shooting phase, when an enemy unit targets a [gloss:friendly:friendly] PATHFINDER TEAM/STEALTH BATTLESUITS unit, if that friendly unit is [gloss:hidden:hidden].",
          target: "That PATHFINDER TEAM/STEALTH BATTLESUITS unit.",
          effect: "Your unit has +1 [gloss:save:Sv].",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Negation Emitters",
          points: 15,
          upgrade: true,
          flavor: "Modules of microcircuitry woven through battlesuit armour plating, these devices mask energy emissions, displace comms signals, and blind enemy sensors with particle scatter.",
          body: "STEALTH BATTLESUITS unit only. This unit has -3\" [gloss:detection-range:detection range].",
        },
        {
          name: "Unmasking Suite",
          points: 15,
          upgrade: true,
          flavor: "This advanced AI targeting assistant features incredibly powerful active scanners that can locate and pinpoint even the most well-hidden foes as though they stood revealed in broad daylight.",
          body: "GHOSTKEEL BATTLESUIT/PATHFINDER TEAM/STEALTH BATTLESUITS unit only. When this unit is [gloss:selected-to-shoot:selected to shoot], you can select one enemy unit [gloss:within:within] 24\" of this unit. That enemy unit has +9\" [gloss:detection-range:detection range] until this unit has shot.",
        },
      ],
    },

    // Faction Pack rewrote this detachment (the 10ed codex version had 6 stratagems and
    // 4 enhancements; the pack version below replaces it entirely).
    {
      id: "auxiliary-cadre",
      name: "Auxiliary Cadre",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Disruption",
      unique: "AUXILIARY",
      rule: {
        name: "Integrated Command Structure",
        flavor: "T’au officers given charge of auxiliary cadres receive additional training in optimised doctrinal and strategic alien amalgamation; this – coupled with specialised translation drones and endless integrated combat drills – allows them to get the best out of their alien subordinates.",
        body: "[gloss:friendly:Friendly] KROOT/VESPID STINGWINGS units have the following ability:\n▪ **Harnessed Alien Instincts:** In your Shooting phase, this unit can select one [gloss:visible:visible] enemy unit [gloss:within:within] 12\". That enemy unit is prey-marked: while a unit is prey-marked, that unit has +3\" [gloss:detection-range:detection range].\n\nFriendly GHOSTKEEL BATTLESUIT/STEALTH BATTLESUITS units have the following ability:\n▪ **Localised Stealth Projectors ([gloss:aura:Aura]):** When a friendly KROOT/VESPID STINGWINGS unit within 6\" of this unit has shot, those attacks do not prevent that unit from being [gloss:hidden:hidden].\n\nThis detachment has the **AUXILIARIES** tag and cannot be taken with another **AUXILIARIES** detachment.",
      },
      stratagems: [
        {
          name: "Experimental Modifications",
          sublabel: "Auxiliary Cadre – Stratagem",
          cp: "1CP",
          turn: "either",
          flavor: "These experimental Earth caste weapon upgrades can only activate for short bursts at a time, but the extra stopping power they provide is formidable.",
          when: "Your Shooting phase or the Fight phase, when a [gloss:friendly:friendly] KROOT/VESPID STINGWINGS unit is selected to attack.",
          target: "That KROOT/VESPID STINGWINGS unit.",
          effect: "Your unit’s attacks have +1 [gloss:armour-penetration:AP].",
          restrictions: "",
        },
        {
          name: "Alien Expertise",
          sublabel: "Auxiliary Cadre – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "There is much that the alien auxiliaries of the T’au empire can teach the Fire caste, not least through practical and deadly battlefield demonstrations.",
          when: "Your Movement phase, when a [gloss:friendly:friendly] KROOT/VESPID STINGWINGS unit is selected to make an [gloss:advance-move:Advance move].",
          target: "That KROOT/VESPID STINGWINGS unit.",
          effect: "That move does not prevent your unit from being [gloss:eligible-to-charge:eligible to declare a charge].",
          restrictions: "",
        },
        {
          name: "Guided by Unity",
          sublabel: "Auxiliary Cadre – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "Firing on coordinates provided by selfless alien auxiliaries, the T’au are able to scythe down their targets with pinpoint precision.",
          when: "Your Shooting phase, when a [gloss:friendly:friendly] T’AU EMPIRE unit (excluding KROOT/VESPID STINGWINGS units) is [gloss:selected-to-shoot:selected to shoot].",
          target: "That T’AU EMPIRE unit.",
          effect: "Your unit’s [gloss:ranged-attacks:ranged attacks] that target a unit [gloss:within:within] 9\" of a friendly KROOT/VESPID STINGWINGS unit have [LETHAL HITS].",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Student of Kauyon",
          points: 20,
          flavor: "This Shaper has not only studied the Code of Fire but has also adapted it to best suit their people’s skills.",
          body: "KROOT SHAPER model only. In the [gloss:declare-battle-formations:Declare Battle Formations] step, you can select up to three [gloss:friendly:friendly] KROOT CARNIVORES/FARSTALKERS units. Those units have Deep Strike.",
        },
        {
          name: "Admired Leader",
          points: 20,
          flavor: "Having proven themselves to their alien charges, this T’au has won their fierce loyalty and become an iconic folk hero to them.",
          body: "T’AU EMPIRE model only (excluding KROOT models). In your Command phase, you can select one KROOT/VESPID STINGWINGS unit [gloss:within:within] 12\" of this model. If you do, that unit has +1 [gloss:leadership:Ld] and [gloss:objective-control:OC] until the start of your next Command phase.",
        },
      ],
    },

    // Faction Pack rewrote this detachment (the 10ed codex version had 6 stratagems and
    // 4 enhancements; the pack version below replaces it entirely).
    {
      id: "experimental-prototype-cadre",
      name: "Experimental Prototype Cadre",
      source: 'faction-pack',
      dp: 1,
      forceDisposition: "Priority Assets",
      unique: "BATTLESUIT",
      rule: {
        name: "Superior Craftsmanship",
        flavor: "The applied science divisions of the Earth caste labour endlessly to provide frontline units with superior weapons systems with which to destroy the foe from afar.",
        body: "[gloss:friendly:Friendly] BATTLESUIT CHARACTER units’ [gloss:ranged-attacks:ranged attacks] have +6\" [gloss:range:R].\n\nThis detachment has the **RETALIATION** tag and cannot be taken with another **RETALIATION** detachment.",
      },
      stratagems: [
        {
          name: "Experimental Ammunition",
          sublabel: "Experimental Prototype Cadre – Stratagem",
          cp: "1CP",
          turn: "your",
          flavor: "From hardened warheads and amplified ion capacitors, to hyper-accelerated pulse fields and refined fusion cores, the T’au are forever innovating improvements to improve the lethality of their ammunition.",
          when: "Your Shooting phase, when a [gloss:friendly:friendly] BATTLESUIT CHARACTER unit is [gloss:selected-to-shoot:selected to shoot].",
          target: "That BATTLESUIT CHARACTER unit.",
          effect: "Your unit’s [gloss:ranged-attacks:ranged attacks] have:\n▪ +1 [gloss:strength:S].\n▪ __Or:__ +1 S, AP and [HAZARDOUS].",
          restrictions: "",
        },
      ],
      enhancements: [
        {
          name: "Thermoneutronic Projector",
          points: 15,
          flavor: "The thermoneutronic projector uses volatile gases siphoned from the coronas of neutron stars to expel a flame capable of searing through the armour plating of a battle tank.",
          body: "BATTLESUIT model only. In the [gloss:declare-battle-formations:Declare Battle Formations] step, select one of this model’s T’au Flamer weapons. That weapon’s attacks have:\n▪ +2 [gloss:strength:S].\n▪ +1 [gloss:armour-penetration:AP] and D.",
        },
        {
          name: "Plasma Accelerator Rifle",
          points: 20,
          flavor: "The plasma accelerator rifle blends pulse-induction technology with a high-yield plasma generator, rendering it highly effective against both infantry and light vehicles.",
          body: "BATTLESUIT model only. In the [gloss:declare-battle-formations:Declare Battle Formations] step, select one of this model’s Plasma Rifle weapons. That weapon’s attacks have:\n▪ +2 [gloss:strength:S].\n▪ +1 A, [gloss:armour-penetration:AP] and D.",
        },
        {
          name: "Supernova Launcher",
          points: 15,
          flavor: "Adapted from standard-issue fragmentation projectors, this weapon enables the bearer to fire explosive plasma charges on parabolic trajectories. These projectiles drop amongst the enemy and explode in a coruscating fireball that evaporates metal and flesh alike.",
          body: "BATTLESUIT model only. In the [gloss:declare-battle-formations:Declare Battle Formations] step, select one of this model’s Airbursting Fragmentation Projector weapons. That weapon’s attacks have:\n▪ +3 [gloss:strength:S].\n▪ +1 [gloss:armour-penetration:AP] and D.",
        },
      ],
    },
  ],

  datasheets: [],
}

export const tauEmpire = { en, ru: en }

