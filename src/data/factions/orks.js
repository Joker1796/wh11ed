// Orks — faction rules. Rewritten end to end for Codex: Orks (11th edition), which
// landed in app data version 946 and replaced every detachment, army rule and datasheet
// the faction had. Resolved from the same source priority as the other factions
// (highest wins): MFM > Faction Pack > Codex > Index.
//
//   wh40k-appdata `factions/orks.json` (Codex: Orks) → army rules + 15 detachments,
//     with rule/stratagem/enhancement prose converted by scripts/lib/sync-common.mjs.
//   MFM v1.4 (src/data/mfm/orks.js) → per-enhancement points, per-detachment dp /
//     forceDisposition. The WAGONS `unique` tag the old Rollin' Deff and Blitz Brigade
//     carried is gone — MFM v1.4 prints no unique tag for any Orks detachment.
//
// The ’Ardmob detachment is Combat Patrol only and lives in src/data/combatPatrol.js,
// so 15 detachments here against appdata's 16.
//
// Two things the source does NOT give us, both deliberate gaps rather than omissions:
//   • Stratagem categories. Every one of the 43 new stratagems carries `category: null`
//     in the dump, where all 29 other factions are classified. So the sublabel reads
//     "<Detachment> – Stratagem" instead of "… – Battle Tactic Stratagem"; inventing a
//     taxonomy GW did not ship would be a guess.
//   • The four army rules are separate entries in appdata (Waaagh!, Da Boss, Unstable
//     energies, Special Move Types), but a faction page renders exactly one `armyRule`.
//     They are folded into one block with `### ` subheadings, which extractSubheadings
//     indexes individually, so each is still linkable and searchable by name.
//
// New vocabulary this codex introduces, none of which existed in the data before:
// **riled up** (the state the Waaagh! now grants), the WAGON keyword, an Orks psychic
// system (**psyker level** / **psychic level**), and the **pulse jet move** move type.
//
// EN-first: `ru` reuses the same object. The Russian overlay is a separate pass —
// src/data/factions/ru/orks.js merges by array index, so it cannot survive a rewrite
// of this size and was emptied rather than left pointing at the wrong rules.
// Markup follows useRenderInline / RuleBlock / StratCard conventions: **bold**,
// [BRACKET] weapon abilities → KeywordPopover, `▪ ` bullet lines, `### ` subheadings.

const en = {
  slug: 'orks',
  name: 'Orks',

  armyRule: {
    id: 'waaagh',
    name: 'Waaagh!',
    flavor:
      'The infamous war cry of the Orks is known and feared throughout the galaxy. When it echoes across the battlefield, bellowed from countless toothy maws, it galvanises the Orks and riles them into a raucous state of excited aggression.',
    body: `Friendly ORKS units with this ability can:
▪ Re-roll **advance rolls**.
▪ Become **riled up**, as stated in other rules.

While a unit is **riled up**:
▪ That unit has 5+ **InSv**.
▪ That unit's ranged attacks have [ASSAULT].
▪ When that unit is selected to make an **advance move**, that **advance move** does not prevent that unit from being **eligible to declare a charge**.

**War Cry (Once per battle, per army):** At the start of the Command phase, you can use this ability. If you do, friendly ORKS units with the **Waaagh!** ability are **riled up** until the end of the next turn.

### Da Boss
At the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.

### Unstable energies
ORKS PSYKER units with this ability have a **psyker level** of 1 or higher, specified in that unit's abilities. Each **psychic ability** has a **psychic level** of 1 or higher, specified in that ability's name.

In a battle round, a friendly ORKS PSYKER unit can use a number of **psychic abilities** whose total **psychic level** does not exceed that PSYKER unit's **psyker level**.

**Example:** In a battle round, a **psyker level 3** PSYKER unit could use three **psychic level 1** abilities, or one **psychic level 1** ability and one **psychic level 2** ability, or one **psychic level 3** ability.

### Special Move Types
Some Orks rules allow a unit to make a **pulse jet move**, as described below. (The **assault disembark move** the codex also lists is a core move type — see Core Rules, 18.06.)

**Pulse Jet Move**
◈ MAXIMUM DISTANCE | **Pulse roll** + 18"
◈ ELIGIBLE IF | As stated in the rule allowing this **move type**.
◈ EFFECT | Your unit moves as described in Moving (Core Rules, 03).
◈ BEFORE MOVING | Make a **pulse roll** by rolling one D6.
◈ WHILE MOVING
▪ Ignore all vertical distance for the purposes of how far your unit has moved.
▪ Your unit can move through all types of model.
▪ Your unit can move horizontally and vertically through all categories of **terrain feature**.
◈ AFTER MOVING
▪ Your unit must be **unengaged**.
▪ Until the end of the turn, your unit is __not__ **eligible to declare a charge** or **start an action**.
▪ Until the start of your next turn, attacks that target your unit have -1 to **hit rolls**.`,
  },

  detachments: [
    {
      id: 'blitz-brigade',
      name: 'Blitz Brigade',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Unstoppable Momentum',
        flavor: 'Like mobile armoured fortresses, little can stop the crushing impetus of the Orks’ hulking wagons.',
        body: `▪ Friendly WAGON units can re-roll **charge rolls**.
▪ When a friendly WAGON unit is selected to make an **advance move**, that unit can change **advance rolls** to a 6.`,
      },
      stratagems: [
        {
          name: 'Readied Brawlers',
          sublabel: 'Blitz Brigade – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Bursting from assault hatches, pounding down boarding ramps or leaping from handholds, this thuggish transport’s fighters are quick to pile out.',
          when: `Your Movement phase, when a friendly WAGON unit ends a **normal move**.`,
          target: `That WAGON unit.`,
          effect: `Units embarked within your unit can make an **assault disembark move** (pg 121).`,
          restrictions: ``,
        },
        {
          name: 'Impending Krunch',
          sublabel: 'Blitz Brigade – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Having several tons of metal covered in blood, rust and spikes bearing down on them can shake the resolve of the most stoic warriors.',
          when: `Your Charge phase, when a friendly WAGON unit ends a **charge move**.`,
          target: `That WAGON unit.`,
          effect: `Each enemy unit **engaged** with your unit makes a **battle-shock roll**, with -1 to that **battle-shock roll**.`,
          restrictions: ``,
        },
        {
          name: 'Keep It Runnin’',
          sublabel: 'Blitz Brigade – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The crews of the Orks’ hulking transports maintain a high level of readiness for when the ladz get bored and rapidly clamber back on board to look for a new fight.',
          when: `End of the Fight phase.`,
          target: `One friendly **unengaged** ORKS INFANTRY unit that was **eligible to fight** this phase and is wholly within 6" of a friendly TRANSPORT unit that INFANTRY unit is able to embark within.`,
          effect: `Your INFANTRY unit embarks within that TRANSPORT unit.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Boss Boomer (Upgrade)',
          points: 10,
          flavor: 'Fitted with speakin’ tubes linked to deafening projectors, this noisy ride allows an important Ork to boss his ladz around while on the move.',
          body: `WAGON unit only. While a WARBOSS model is embarked within this unit, this unit has that WARBOSS model’s **Intimidating Motivation/Keep Huntin’** ability.`,
        },
        {
          name: 'Targetin’ Gizmos (Upgrade)',
          points: 10,
          flavor: 'These sparkly optiks and other elaborate gitfindas help focus a wagon’s dakka, but it takes a really clever Mek to know how to work them.',
          body: `WAGON unit only. While a BIG MEK model is embarked within this unit:
▪ This unit’s ranged attacks have [IGNORES COVER].
▪ If this unit is **riled up**, this unit’s ranged attacks have [SUSTAINED HITS 1].`,
        },
      ],
    },
    {
      id: 'brute-bosses',
      name: 'Brute Bosses',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: '’Ard as Nails',
        flavor: 'The largest Orks have risen to their position through strength, savagery and being harder than anyone else.',
        body: `When a friendly WARBOSS model is **destroyed**, if this unit has not been **selected to fight** this phase, roll one D6, with +1 to the roll if your unit is **riled up**:
▪ On a 3+, do not remove this WARBOSS model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this WARBOSS model is removed from the battlefield.`,
      },
      stratagems: [

      ],
      enhancements: [
        {
          name: 'Blitzboss',
          points: 20,
          flavor: 'It is said this Ork bleeds Squig oil and his growl is that of a revving engine. Certainly any vehicle he rides to war seems to respond powerfully to his presence.',
          body: `WARBOSS model only. A TRANSPORT unit (excluding WALKER units) this unit is embarked within has:
▪ +2" **M**.
▪ 5+ **InSv**.`,
        },
        {
          name: 'Brutal But Kunnin’',
          points: 30,
          flavor: 'What tactics occasionally pop into this Ork’s head revolve purely around how hard he needs to wallop his enemies to send their skulls flying.',
          body: `WARBOSS model only. This model’s melee attacks have +1 **D**.`,
        },
        {
          name: 'Da Gobshot Thunderbuss',
          points: 20,
          flavor: 'Firing gold-plated teef as its unconventional ammunition, da Gobshot Thunderbuss proclaims its owner’s obscene wealth even as it sweeps away swathes of enemies.',
          body: `WARBOSS model only. This model has the following weapon:`,
        },
        {
          name: 'Morgog’s Finkin’ Cap',
          points: 50,
          flavor: 'Thanks to the tangle of stolen empyric electrodes wired into this helmet, a powerful Ork wearing it is capable of thinking a little further ahead than his next fight.',
          body: `WARBOSS model only. (Once per battle, per army) At the end of your opponent’s Movement phase, if this unit is **unengaged**, this unit can make a **normal move** of:
▪ Up to D6".
▪ If this unit is **riled up**, you can re-roll that D6.`,
        },
        {
          name: 'Proper Killy',
          points: 15,
          flavor: 'This unstoppable brute is an engine of destruction whose welts of scars have been won in countless victories.',
          body: `WARBOSS model only. This model can re-roll **hit rolls** of 1.`,
        },
        {
          name: 'Surly as a Squiggoth',
          points: 25,
          flavor: 'With a lifetime of picking fights with the galaxy’s most lethal fighters behind him, and a gnarled hide thicker than Battlewagon armour, this Ork has survived blows that would fell an Ambull.',
          body: `INFANTRY WARBOSS model only. (Once per battle, per army)At the end of a phase in which this model is **destroyed**, roll one D6:
▪ On a 2+, set this model back up on the battlefield as close as possible to where it was **destroyed**, **unengaged**, with 3 wounds remaining.`,
        },
      ],
    },
    {
      id: 'bully-boyz',
      name: 'Bully Boyz',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Displays of Savagery',
        flavor: 'Nobz have a position of dominance to maintain, and do so in vicious eruptions of violence.',
        body: `Friendly MEGANOBZ/NOBZ units’ melee attacks have [SUSTAINED HITS 1].`,
      },
      stratagems: [
        {
          name: 'Hulking Brutes',
          sublabel: 'Bully Boyz – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The thick armour and thicker skulls of Nobz make them a daunting prospect to gun down.',
          when: `Your opponent’s Shooting phase, when an enemy unit targets a friendly MEGANOBZ/NOBZ unit.`,
          target: `That MEGANOBZ/NOBZ unit.`,
          effect: `Ranged attacks that target your unit with a **S** greater than your unit’s **T** have -1 to **wound rolls**.`,
          restrictions: ``,
        },
        {
          name: 'Too Arrogant to Die',
          sublabel: 'Bully Boyz – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With bone‐headed arrogance, Nobz will carry on killing before their deaths finally dawn on them.',
          when: `Fight phase, when an enemy unit targets a friendly MEGANOBZ/NOBZ unit.`,
          target: `That MEGANOBZ/NOBZ unit.`,
          effect: `When a model in your unit is **destroyed**, if your unit has not been **selected to fight** this phase, roll one D6, with +1 to that roll if your unit is **riled up**:
▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.`,
          restrictions: ``,
        },
        {
          name: 'Armed To Da Teef',
          sublabel: 'Bully Boyz – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Nobz load themselves with all manner of weapons in shows of wealth and influence.',
          when: `Your Shooting phase or the Fight phase, when a friendly MEGANOBZ/NOBZ unit is **selected to attack**.`,
          target: `That MEGANOBZ/NOBZ unit.`,
          effect: `Your unit’s attacks can:
▪ Re-roll **hit rolls** of 1.
▪ If your unit is **riled up**, re-roll **hit rolls**.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Tellyporta Boss',
          points: 20,
          flavor: 'This Ork has bullied his way into possession of a mostly functional tellyporta pad, and has so far survived being thrown through the Warp towards the best fights.',
          body: `MEGA ARMOUR model only. This unit (excluding VEHICLE units) has **Deep Strike**.`,
        },
        {
          name: 'Wimp-kickaz (Upgrade)',
          points: 15,
          flavor: 'Any snivelling gitz attempting to back away from a good fight with these arrogant Nobz get a good kicking to see them on their way.',
          body: `NOBZ unit only. When an enemy unit **engaged** with this unit is selected to make a **fall-back move**:
▪ That enemy unit must select the **desperate escape** mode.
▪ If this unit is **riled up**, that enemy unit has -1 to the **hazard rolls** made for that **desperate escape**.`,
        },
      ],
    },
    {
      id: 'da-big-hunt',
      name: 'Da Big Hunt',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Da Hunt is On',
        flavor: 'Beast Snaggas fanatically hunt the biggest targets and are experts in finding their weak spots.',
        body: `Friendly BEAST SNAGGA units’ attacks that target a MONSTER/VEHICLE unit have +1 **AP**.`,
      },
      stratagems: [
        {
          name: 'Instinctive Hunters',
          sublabel: 'Da Big Hunt – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With a keen eye for tracking their prey, Beast Snaggas will circle around to ambush the luckless gitz from another angle.',
          when: `End of your opponent’s Fight phase.`,
          target: `One friendly **unengaged** BEAST SNAGGA unit within 6" of a battlefield edge.`,
          effect: `Place your unit in **strategic reserves**.`,
          restrictions: ``,
        },
        {
          name: 'Where D’ya Fink You’re Going?',
          sublabel: 'Da Big Hunt – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Beast Snagga victims often make a break for it before the Orks have tired of fighting. Hooked, impaled or ridden down, few survive such flight.',
          when: `Your opponent’s Movement phase, when an enemy unit is selected to make a **fall-back move**, if that enemy unit is **engaged** with a friendly BEAST SNAGGA unit.`,
          target: `That BEAST SNAGGA unit.`,
          effect: `When an enemy unit **engaged** with your unit is selected to make a **fall-back move**, that enemy unit must use the **desperate escape **mode. If that enemy unit is a MONSTER/VEHICLE unit, that enemy unit makes three additional **hazard rolls** for each BEAST SNAGGA unit it is **engaged** with, with -1 from those **hazard rolls** if that enemy unit is **battle-shocked**.`,
          restrictions: ``,
        },
        {
          name: 'Goaded Into Action',
          sublabel: 'Da Big Hunt – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Should attempts to obliterate the Beast Snaggas from afar fail, it is often the foe’s last mistake as the hunters turn their baleful attention on them.',
          when: `Your opponent’s Shooting phase, when an enemy unit has shot.`,
          target: `One friendly **unengaged** BEAST SNAGGA unit that lost a wound as a result of those attacks.`,
          effect: `Your unit can make a **surge move** of up to D6". If your unit is **riled up**, it can re-roll that D6.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Glory Hog',
          points: 25,
          flavor: 'When bigger prey is sighted, nothing can keep this hunter from it. With a roar of glee, lesser gitz are swiftly forgotten in his enthusiasm to pile into a greater challenge.',
          body: `BEAST SNAGGA model only. When this unit is selected to make a **fall-back move**, that **fall-back move** does not prevent this unit from being **eligible to declare a charge**.`,
        },
        {
          name: 'It Came from da Drops',
          points: 20,
          flavor: 'The monstrous resilience – and odour – of this Beastboss’ hulking mount has inspired many lurid tales of its origin.',
          body: `BEASTBOSS ON SQUIGOSAUR model only. This model has +1 **T**.`,
        },
      ],
    },
    {
      id: 'dread-mob',
      name: 'Dread Mob',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Try Dat Button!',
        flavor: 'Inviting Mek-wired buttons offer varied and erratic lethality.',
        body: `In your Shooting phase or the Fight phase, when a friendly ORKS WALKER unit (excluding TITANIC units) is **selected to attack**, you can use this ability. If you do, roll either one D6 or two D6 (keep re-rolling duplicate results). This unit’s attacks have the relevant rule(s): Try Dat Button! D6 Result 1‑2 +1** A** 3‑4 +2** S** 5‑6 +1** AP** If you rolled two D6, when this unit has attacked, this unit makes one **hazard roll**.`,
      },
      stratagems: [
        {
          name: 'Stomping Juggernaut',
          sublabel: 'Dread Mob – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'A pilot’s single-mindedness and his walker’s durable form mean few obstacles can impede its relentless stomping advance.',
          when: `Your Movement/Charge phase, when a friendly ORKS WALKER unit is **selected to move** or **declares a charge**.`,
          target: `That ORKS WALKER unit.`,
          effect: `Your unit has MOBILE.`,
          restrictions: ``,
        },
        {
          name: 'Crazed Rampage',
          sublabel: 'Dread Mob – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Even horrific damage will not prevent many Ork combat walkers from crunching and stomping their enemies in a final fugue of psychotic aggression.',
          when: `Fight phase, when an enemy unit targets a friendly ORKS WALKER unit (excluding TITANIC units).`,
          target: `That ORKS WALKER unit.`,
          effect: `When a model in your unit is **destroyed**, if your unit has not been **selected to fight** this phase, roll one D6, with +3 to the result if your unit has DEFF DREAD:
▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.`,
          restrictions: ``,
        },
        {
          name: 'Dread Power',
          sublabel: 'Dread Mob – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Fuelled by the pilot’s obsession or psychosis – and powered up by varied erratic gubbinz – it is little wonder that a Kan’s stomping rampages are constantly reignited.',
          when: `Your Movement phase.`,
          target: `One friendly ORKS WALKER unit.`,
          effect: `Your unit is **riled up** until the start of your next turn.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Cybork Boosta',
          points: 10,
          flavor: 'This Mek’s extra bioniks help him keep up with his Kans.',
          body: `BIG MEK/MEK model only. This model has +2" **M**.`,
        },
        {
          name: 'Dreadherder',
          points: 20,
          flavor: 'This Mek is deft at avoiding his creations’ feet and klaws.',
          body: `BIG MEK model only. While this model is within 3" of a friendly ORKS WALKER unit (excluding BIG MEK units):
▪ This model has **Lone Operative**.
▪ In your Shooting phase, you can select one friendly ORKS WALKER unit within 3" of this model. That unit’s attacks can re-roll **hit rolls** of 1 until the end of the turn.`,
        },
      ],
    },
    {
      id: 'flyboyz',
      name: 'Flyboyz',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Skyborne Loons',
        flavor: 'When attacking en masse, crazed and excitable Flyboyz unleash torrential quantities of dakka.',
        body: `▪ Friendly ORKS AIRCRAFT units do not count towards the combined points value of your **strategic reserves** units.
▪ While a friendly ORKS AIRCRAFT/DEFFKOPTAS unit is **riled up**, this unit’s ranged attacks have +1 to **hit rolls**.`,
      },
      stratagems: [
        {
          name: 'Long, Uncontrolled Bursts',
          sublabel: 'Flyboyz – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Ork Flyboyz will fill the skies with dakka in an attempt to down any enemy they think is muscling in on their aerial turf.',
          when: `Your Shooting phase, when a friendly ORKS AIRCRAFT/DEFFKOPTAS unit is **selected to shoot**.`,
          target: `That ORKS AIRCRAFT/DEFFKOPTAS unit.`,
          effect: `When your unit’s ranged attacks target a FLY unit, those attacks can re-roll **hit rolls**.`,
          restrictions: ``,
        },
        {
          name: 'Whirligig Evasion',
          sublabel: 'Flyboyz – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Enemy attempts to hunt Deffkoptas down can be stymied by nimble aerial evasion, usually accompanied by a crude hand gesture in the foe’s direction.',
          when: `Your opponent’s Movement phase, when an enemy unit ends a move.`,
          target: `One friendly **unengaged** DEFFKOPTAS unit within 8" of that enemy unit.`,
          effect: `Your unit can make a **normal move** of:
▪ Up to D6".
▪ __Or:__ If your unit is **riled up**, up to 6".`,
          restrictions: ``,
        },
        {
          name: 'Flyin’ Headbutt',
          sublabel: 'Flyboyz – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Some Ork pilots, out of bullets and out of luck, brighten up considerably when they realise their own aircraft is a deadly weapon in its own right.',
          when: `Any phase, when a friendly ORKS AIRCRAFT unit is **destroyed**, before rolling for any **Deadly Demise**.`,
          target: `That ORKS unit.`,
          effect: `Your unit does not have the **Deadly Demise** ability. Select one enemy unit within 12" of your unit and roll eight D6:
▪ For each 4+, that enemy unit suffers 1 **mortal wound**. Then remove your unit from the battlefield.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Flyboss (Upgrade)',
          points: 20,
          flavor: 'Brutish aces who have survived enough dogfights to rise to positions of superiority, Flybosses inspire other Ork aviators to heights of psychotic enthusiasm.',
          body: `ORKS AIRCRAFT unit only.
▪ This unit has CHARACTER.
▪ When this unit ends an **ingress move**, each friendly ORKS AIRCRAFT/DEFFKOPTAS unit within 6" of this unit is **riled up** until the start of your next turn.`,
        },
        {
          name: 'Impulsive Recon (Upgrade)',
          points: 15,
          flavor: 'Despite claims of scoutin’, this aircraft’s screaming dive ahead of its pilot’s mates is purely for the thrill of attacking first.',
          body: `ORKS AIRCRAFT unit only. In your first Movement phase, this unit can make an **ingress move**.`,
        },
      ],
    },
    {
      id: 'green-tide',
      name: 'Green Tide',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Mob-handed Brutality',
        flavor: 'In the massive fights that Orks enjoy, the only way to ensure a slice of the action is to fight harder.',
        body: `▪ Friendly BOYZ units’ melee attacks have [SUSTAINED HITS 1].
▪ If a friendly ORKS INFANTRY unit made a **charge move** this turn, that unit’s melee attacks have [LETHAL HITS: **non-**MONSTER/VEHICLE].`,
      },
      stratagems: [
        {
          name: 'Unbridled Carnage',
          sublabel: 'Green Tide – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'When da Boyz get stuck into the foe, the carnage is wonderful to behold, at least for all their mates.',
          when: `Fight phase, when a friendly BOYZ unit that made a **charge move** this turn is **selected to fight**.`,
          target: `That BOYZ unit.`,
          effect: `Your unit’s melee attacks have +1 **A**.`,
          restrictions: ``,
        },
        {
          name: 'Mob Mentality',
          sublabel: 'Green Tide – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'With volleys of wagers, threats, insults, dung and the occasional rock, large mobs bolster the spirits of others in the most Orky ways possible.',
          when: `Start of the Battle-shock step of your Command phase.`,
          target: `One friendly ORKS INFANTRY unit of 13+ models.`,
          effect: `Select one **visible** friendly ORKS unit within 12" of your unit. That unit’s **battle-shock rolls** are automatically successful.`,
          restrictions: ``,
        },
        {
          name: '’Ere We Go',
          sublabel: 'Green Tide – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Orks can put on a surprising turn of speed when the promise of a good face‐to‐face fight is in the offing.',
          when: `Your Movement phase, when a friendly BEAST SNAGGA BOYZ/BOYZ unit is **selected to move**.`,
          target: `That BEAST SNAGGA BOYZ/BOYZ unit.`,
          effect: `Your unit has +2 to **advance rolls**.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: '\'Ardboyz (Upgrade)',
          points: 25,
          flavor: 'Orks with enough teef – or muscle – can acquire extra scrap iron plates collectively referred to as ‘eavy armour, which is battered into shape so that it roughly fits the wearer.',
          body: `BOYZ unit only. This unit has 4+ **Sv**.`,
        },
        {
          name: 'Ferocious Show-off',
          points: 15,
          flavor: 'This brutal fighter is even more dangerous with a raucous audience of chanting Orks, as he displays his violent abilities as a warning to all.',
          body: `ORKS INFANTRY model only. This model’s melee attacks have:
▪ +1 **A**.
▪ __Or:__ If this unit has 11+ models, +2 **A**.`,
        },
      ],
    },
    {
      id: 'kult-of-speed',
      name: 'Kult of Speed',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Reconnaissance',
      rule: {
        name: 'Adrenaline Junkies',
        flavor: 'After smashing into the foe at full tilt, a Speed Freek will pull hairpin turns to do it all again.',
        body: `▪ Friendly WARBIKERS units have BATTLELINE.
▪ When a friendly SPEED FREEKS unit is selected to make an **advance/fall-back move**:
▪ That unit’s ranged attacks have [ASSAULT] until the end of the turn.
▪ That move does not prevent that unit from being **eligible to declare a charge**.`,
      },
      stratagems: [
        {
          name: 'Dakkastorm',
          sublabel: 'Kult of Speed – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Often all an enemy will see of a Kult of Speed is a dust cloud as they speed by, all guns blazing.',
          when: `Your Shooting phase, when a friendly SPEED FREEKS unit is **selected to shoot**.`,
          target: `That SPEED FREEKS unit.`,
          effect: `Your unit’s ranged attacks have [SUSTAINED HITS 1].`,
          restrictions: ``,
        },
        {
          name: 'Speediest Freeks',
          sublabel: 'Kult of Speed – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Speed Freeks are often just blurs of vehicular mayhem that prove difficult to land a blow on.',
          when: `Your opponent’s Shooting phase, when an enemy unit targets a friendly SPEED FREEKS unit.`,
          target: `That SPEED FREEKS unit.`,
          effect: `Ranged attacks that target your unit fail on an unmodified **hit roll** of 1‑3.`,
          restrictions: ``,
        },
        {
          name: 'Delicious Eating Squigs',
          sublabel: 'Kult of Speed – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Besides more dangerous fare, Squig-lobbing buggies fire edible Squigs for a price, guaranteed to enliven any Ork if he can eat it before it eats him.',
          when: `Your Movement phase.`,
          target: `One friendly RUKKATRUKK SQUIGBUGGIES unit.`,
          effect: `Select any number of friendly ORKS INFANTRY units within 3" of your unit. Each selected unit **heals** 3 wounds.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Competitive Streak',
          points: 15,
          flavor: 'This Speedboss despises the thought of coming anything less than first in a race to reach the biggest fights.',
          body: `DEFFKILLA WARTRIKE model only. This unit can re‑roll **charge rolls**.`,
        },
        {
          name: 'Smoky Gubbinz (Upgrade)',
          points: 10,
          flavor: 'These loud, fume-belching devices wreathe those in the Speed Freeks’ wake in a thick bank of obscuring smoke.',
          body: `SPEED FREEKS unit only (excluding AIRCRAFT units). When an attack targets a unit that is not **fully visible** to the attacking model because of a model in this unit, the target has the **benefit of cover** against that attack.`,
        },
      ],
    },
    {
      id: 'madcap-meks',
      name: 'Madcap Meks',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Unpredictable Genius',
        flavor: 'Meks haul all manner of weird bullets, unstable power cells and kustomised extras to battle.',
        body: `In your Shooting phase, when all of a friendly BIG MEK/MEK GUNZ/MORKANAUT/WAZBOM BLASTAJET unit's ranged attacks target a single enemy unit, roll one D6: Unpredictable Genius D6 Result 1 **Dat's Weird:** The target unit has 4+ **InSv** until your unit has shot. 2‑3 **Hop Splat:** Select one other enemy unit within 3" of the target. That unit suffers D3 **mortal wounds**. 4 **Seekerz:** Those attacks have +1 to **hit rolls**. 5 **Lifted:** The target unit has FLY, and cannot have the **benefit of cover**, until your unit has shot. 6 **Runtified:** The target unit has -1 **T** until your unit has shot.`,
      },
      stratagems: [
        {
          name: 'Vindictive Artillerists',
          sublabel: 'Madcap Meks – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Though cowardly, Grot artillery crews will dare to overcharge their weapons in acts of spectacular spite.',
          when: `Your Shooting phase, when a friendly MEK GUNZ unit is **selected to shoot**.`,
          target: `That MEK GUNZ unit.`,
          effect: `Your unit’s ranged attacks have:
▪ [LETHAL HITS].
▪ __Or:__ [SUSTAINED HITS 1].
▪ __Or:__ [HAZARDOUS], [LETHAL HITS], [SUSTAINED HITS 1].`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Enhanced Runt-maw (Upgrade)',
          points: 10,
          flavor: 'These kustom jobs incorporate an oversized suction device, drawing in nearby runts aplenty, as well as Squigs, loose scrap, and even poorly fastened pieces of the gun itself. The Mek’s targets – those that survive – end up infested with countless screeching Snotlings.',
          body: `BIG MEK WITH SHOKK ATTACK GUN model only. When this unit has shot, select one enemy unit hit by those attacks. That unit is **infested with Snotlings** until the start of your next turn.
▪ While an enemy unit is **infested with Snotlings**, that unit has -1 to **leadership rolls**.`,
        },
        {
          name: 'Mekwaaagh! Mastermind',
          points: 30,
          flavor: 'This Big Mek’s obsession with feverish inventing and his dreams of ludicrous technological destruction are infectious, inspiring other Orks to excitable aggression.',
          body: `BIG MEK model only. This unit is **riled up**.`,
        },
        {
          name: 'Temperamental Shokka (Upgrade)',
          points: 20,
          flavor: 'Shokk attack guns are notoriously unreliable, and even with a supposedly enhanced set of worky bits, this Big Mek is never certain what will happen when he sets the thing off.',
          body: `BIG MEK WITH SHOKK ATTACK GUN model only. In your Shooting phase, when this unit is **selected to shoot**, you can roll one D6:
▪ On a 1, this model’s Shokk Attack Gun weapon has [TORRENT], and when this unit has shot, this model is **destroyed**.
▪ On a 2-5, this model’s Shokk Attack Gun weapon has +1 **A**.
▪ On a 6, this model’s Shokk Attack Gun weapon has [SUSTAINED HITS 2].`,
        },
      ],
    },
    {
      id: 'runt-swarm',
      name: 'Runt Swarm',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Sneaky Little Gitz',
        flavor: 'Given no position of importance, Grots find their niche as sneaks, thieves and mischief-makers.',
        body: `▪ Friendly GRETCHIN units have BATTLELINE.
▪ When a friendly GRETCHIN unit is selected to make an **advance/fall-back move**, that move does not prevent this unit from being **eligible to start an action**.`,
      },
      stratagems: [
        {
          name: 'Scarper!',
          sublabel: 'Runt Swarm – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Through natural cowardice or a Runtherd’s threats, Grots’ agile reactions can leave foes flat-footed.',
          when: `Your opponent’s Movement phase, when an enemy unit ends a move within 8" of a friendly **unengaged** GRETCHIN unit.`,
          target: `That GRETCHIN unit.`,
          effect: `Your unit can make a **normal move** of:
▪ Up to D6".
▪ __Or:__ Up to 6" instead if your unit is an **attached** unit.`,
          restrictions: ``,
        },
        {
          name: 'Grot Shields',
          sublabel: 'Runt Swarm – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Despite their protestations, Gretchin make surprisingly effective bullet shields.',
          when: `Your opponent’s Shooting phase, when an enemy unit targets a friendly ORKS INFANTRY unit (excluding GRETCHIN units).`,
          target: `One friendly GRETCHIN unit within 3" of that ORKS INFANTRY unit.`,
          effect: `When a **hit roll** for that enemy unit’s ranged attacks that target that ORKS unit results in a hit, if a model in your GRETCHIN unit is on the battlefield, end the attack sequence for that attack and your GRETCHIN unit suffers 1 **mortal wound**.`,
          restrictions: ``,
        },
        {
          name: 'Infested War Zone',
          sublabel: 'Runt Swarm – Stratagem',
          cp: '2CP',
          turn: 'either',
          flavor: 'Short, scrawny and skilled at hiding, there are usually a lot more Gretchin about than meets the eye.',
          when: `Any phase, when an enemy unit has attacked.`,
          target: `One friendly GRETCHIN unit that was just **destroyed**. You can target that unit with this **stratagem** even though that unit was just **destroyed**.`,
          effect: `Add a new GRETCHIN unit to your army identical to your **destroyed** unit, in **strategic reserves**, at its **starting strength**, with its full wounds remaining.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Extra Sneaky (Upgrade)',
          points: 10,
          flavor: 'A lifetime of evading the attentions of Orks and even other runts has honed these Grots’ sneakiness to preternatural levels.',
          body: `GRETCHIN unit only. This unit has -3" **detection range**.`,
        },
        {
          name: 'Minefield Detail (Upgrade)',
          points: 10,
          flavor: 'Rebellious, lazy or just plain unlucky Gretchin are driven into dangerous vanguard duties. These runts scarper forward with the hope of making it through as quickly as possible.',
          body: `GRETCHIN unit only. While this unit is not embarked, this unit has **Scouts 6"**.`,
        },
      ],
    },
    {
      id: 'shoota-boyz',
      name: 'Shoota Boyz',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Purge the Foe',
      rule: {
        name: 'Dakka! Dakka! Dakka!',
        flavor: 'Always hunting for something to kill, when Orks spot a target they saturate it with dakka.',
        body: `Friendly ORKS INFANTRY units’ ranged attacks have:
▪ [ASSAULT].
▪ While this unit is **riled up**, +3" **R**.`,
      },
      stratagems: [
        {
          name: 'Kustom Dakka',
          sublabel: 'Shoota Boyz – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Extra speshul ammunition is hoarded by those Orks obsessed with dakka, ready for the ideal target when it is splurged in an impressively killy display.',
          when: `Your Shooting phase, when a friendly ORKS INFANTRY unit is **selected to shoot**.`,
          target: `That ORKS INFANTRY unit.`,
          effect: `Your unit’s ranged attacks that target a unit (excluding MONSTER/VEHICLE units) have +1 to **wound rolls**.`,
          restrictions: ``,
        },
        {
          name: 'Glowin’ Dakka',
          sublabel: 'Shoota Boyz – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Semi-molten or radioactive slugs; frazzle bullets; shokktastik shells; Orks will try anything they can afford to crack open enemy armour in style.',
          when: `Your Shooting phase, when a friendly ORKS INFANTRY unit is **selected to shoot**.`,
          target: `That ORKS INFANTRY unit.`,
          effect: `Your unit’s ranged attacks that target a unit within 9" have +1 **AP**.`,
          restrictions: ``,
        },
        {
          name: 'Never Enough Dakka',
          sublabel: 'Shoota Boyz – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Squeezing the trigger until their weapon stops firing or falls apart in their hands is a standard tactic for many Orks, and their horrifically wild bursts eventually find their mark.',
          when: `Your Shooting phase, when a friendly ORKS INFANTRY unit is **selected to shoot**.`,
          target: `That ORKS INFANTRY unit.`,
          effect: `Your unit’s ranged attacks have [SUSTAINED HITS 1].`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Supa-glowy Fing',
          points: 25,
          flavor: 'The Mek who cobbled together this strange dakka accelerator isn’t sure exactly what it does – and it glows weirdly – but its new owner proudly carries it to battle, eager to know what its big switch will do this time.',
          body: `ORKS INFANTRY model only (excluding WEIRDBOY models). This model’s ranged attacks have:
▪ [ANTI-INFANTRY 4+].
▪ [DEVASTATING WOUNDS].
▪ [SUPA-HAZARDOUS]. [SUPA-HAZARDOUS]**:** Each time a unit is selected to shoot, after that unit has resolved all of its attacks, make two **hazard rolls** for that unit for each [SUPA-HAZARDOUS] weapon you selected in the Select Weapons step.`,
        },
        {
          name: 'Targetin\' Squigs',
          points: 20,
          flavor: 'With a couple of these boggle-eyed varieties of Squigs on hand, even Ork shooting has a chance of hitting distant targets, helped by squinting really hard.',
          body: `BIG MEK/BIGBOSS/WARBOSS model only. This unit’s ranged attacks (excluding [TORRENT] attacks) have +3" **R**.`,
        },
      ],
    },
    {
      id: 'taktikal-brigade',
      name: 'Taktikal Brigade',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Suspiciously Well Organised',
        flavor: 'An un-Orky compulsion for discipline can wrongfoot enemies expecting anarchic disorder.',
        body: `▪ Friendly STORMBOYZ units have BATTLELINE.
▪ When a friendly BOYZ/KOMMANDOS/STORMBOYZ unit is selected to make a **fall-back move**, that **fall-back move** does not prevent that unit from being **eligible to declare a charge**.`,
      },
      stratagems: [
        {
          name: 'While Their Backs are Turned',
          sublabel: 'Taktikal Brigade – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With the gitz they were fighting having scarpered, mobs with a plan exploit the sudden lull to press towards whatever target has next caught their eye.',
          when: `End of your opponent’s Movement phase.`,
          target: `One friendly **unengaged** BOYZ/KOMMANDOS/STORMBOYZ unit that was **engaged** at the start of the phase.`,
          effect: `Your unit can make a **normal move** of up to 6".`,
          restrictions: ``,
        },
        {
          name: 'Mind Mostly on the Mission',
          sublabel: 'Taktikal Brigade – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'When there’s a dirty job needs doing, Orks with strange compulsions get a kick out of causing such trouble sneakily or swiftly.',
          when: `Your Movement phase, when a friendly BOYZ/KOMMANDOS/STORMBOYZ unit is selected to make an **advance/fall-back move**.`,
          target: `That BOYZ/KOMMANDOS/STORMBOYZ unit.`,
          effect: `That move does not prevent your unit from being **eligible to start an action**.`,
          restrictions: ``,
        },
        {
          name: 'Dubious Restraint',
          sublabel: 'Taktikal Brigade – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'A few Orks, particularly those of a rebelliously disciplined outlook, can resist their destructive urges just long enough to prioritise strategic gains.',
          when: `Start/end of your Movement phase.`,
          target: `One friendly BOYZ/KOMMANDOS/STORMBOYZ unit.`,
          effect: `Select one **objective** your unit is controlling. That **objective** is **secured**.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Kill Kommanda',
          points: 20,
          flavor: 'Possessed of exceptional kunnin’ and a weird obsession with sneakin’ about, this powerful Ork leader loves nothing more than creeping through enemy defences before carving a bloody path through their lines.',
          body: `BIG MEK/WARBOSS INFANTRY model only. While this model is part of an **attached** unit, this model has:
▪ **Infiltrators**.
▪ **Stealth**.`,
        },
        {
          name: 'Throat-slittas (Upgrade)',
          points: 15,
          flavor: 'Veterans of the relatively organised butchery of well-protected targets, these distrusted Orks make excellent forward assassins.',
          body: `KOMMANDOS/STORMBOYZ unit only. This unit’s melee attacks have [LETHAL HITS: **non**-MONSTER/VEHICLE].`,
        },
      ],
    },
    {
      id: 'war-horde',
      name: 'War Horde',
      source: 'codex',
      dp: 3,
      forceDisposition: 'Take and Hold',
      rule: {
        name: 'Get Stuck In',
        flavor: 'Joyously anarchic and recklessly destructive, all Orks eagerly get stuck in to every fight.',
        body: `Friendly ORKS units’ melee attacks have [SUSTAINED HITS 1].`,
      },
      stratagems: [
        {
          name: 'Breakin’ Heads',
          sublabel: 'War Horde – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Sometimes even the most enthusiastic Orks need a little ‘encouragement’ to stay in the fight.',
          when: `Any phase, when a friendly **attached** ORKS INFANTRY unit becomes **battle‑shocked**.`,
          target: `That ORKS INFANTRY unit. You can target that unit with this **stratagem** even though it is **battle-shocked**.`,
          effect: `Roll one D3:
▪ Your unit suffers a number of **mortal wounds** equal to the result.
▪ Your unit is no longer **battle‑shocked**.`,
          restrictions: ``,
        },
        {
          name: 'Close-range Dakka',
          sublabel: 'War Horde – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Many Orks think it’s a waste of time blazing away at long range, when it’s more fun to see the effects of potent dakka up close.',
          when: `Your Shooting phase, when a friendly ORKS unit is **selected to shoot**.`,
          target: `That ORKS unit.`,
          effect: `Your unit’s ranged attacks have:
▪ [RAPID FIRE 1].
▪ __Or:__ If that attack already has [RAPID FIRE], +1 to the value of that [RAPID FIRE] (e.g. [RAPID FIRE 1] becomes [RAPID FIRE 2]).`,
          restrictions: ``,
        },
        {
          name: 'Orks Is Never Beaten',
          sublabel: 'War Horde – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'So resilient is Ork physiology – and so slow are Orks on the uptake – even death can take time to register.',
          when: `Fight phase, when an enemy unit targets a friendly ORKS unit (excluding TITANIC units).`,
          target: `That ORKS unit.`,
          effect: `When a model in your unit is **destroyed**, if your unit has not been **selected to fight** this phase, roll one D6, with +1 to that roll if your unit is **riled up**:
▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.`,
          restrictions: ``,
        },
        {
          name: 'Mow ’Em Down',
          sublabel: 'War Horde – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Spiked rams, deff rollas and glyph-heavy dozer blades are more than just stylish statements for the crew of Ork vehicles.',
          when: `Fight phase, when a friendly ORKS VEHICLE unit (excluding WALKER units) that made a **charge move** this turn is **selected to fight**.`,
          target: `That ORKS VEHICLE unit.`,
          effect: `Your unit’s melee attacks have:
▪ [CLEAVE 1].
▪ __Or:__ If that attack already has [CLEAVE], +1 to the value of that [CLEAVE] (e.g. [CLEAVE 1] becomes [CLEAVE 2]).`,
          restrictions: ``,
        },
        {
          name: 'Fungus-fuel Injection',
          sublabel: 'War Horde – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Fermented through entirely unstable processes, just a drop of these potent additives can supercharge any Mek‐built engine.',
          when: `Your Movement phase, when a friendly ORKS MOUNTED/VEHICLE unit is **selected to move**.`,
          target: `That ORKS MOUNTED/VEHICLE unit.`,
          effect: `Your unit has +2" **M**.`,
          restrictions: ``,
        },
        {
          name: 'Hit ’Em Harder',
          sublabel: 'War Horde – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Even the weediest Orks possess great strength, and need little persuasion to bring it to bear.',
          when: `Fight phase, when a friendly ORKS unit is selected to fight.`,
          target: `That ORKS unit.`,
          effect: `Your unit’s melee attacks have [LETHAL HITS].`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Da Boss is Watchin\'',
          points: 25,
          flavor: 'This war leader is a glowering incarnation of violence, his brutality so contagious that when he bellows his blind fury and releases his pent-up aggression, Orks nearby are excitedly swept along with him.',
          body: `ORKS model only. (Once per battle, per army) In your Movement phase, you can use this ability. If you do, this unit is **riled up** until the start of your next turn.`,
        },
        {
          name: 'Follow Me Ladz',
          points: 20,
          flavor: 'Always found at the forefront of an assault, this Ork likes to be the first into the fray with his mob close on his heels to join in the violence.',
          body: `ORKS model only. This unit has +2" **M**.`,
        },
        {
          name: 'Headwoppa\'s Killchoppa',
          points: 15,
          flavor: 'Tribal legend speaks of a blood-slick choppa once owned by Grand Warboss Headwoppa – last seen charging headlong into a horde of daemons – that turns up occasionally across the galaxy in different forms. Though it looks normal, a dark voice is said to growl in the mind of the weapon’s wielder, driving them on to ever greater excesses of violence.',
          body: `ORKS model only. If this unit made a **charge move** this turn, this model’s melee attacks have +1 **AP**.`,
        },
        {
          name: 'Kunnin’ But Brutal',
          points: 20,
          flavor: 'Feigning weakness, this Ork allows his foes to think he’s legging it before suddenly piling back into the fight and delivering a brutal flurry of attacks.',
          body: `ORKS model only. When this unit is selected to make a **fall-back move**, that **fall-back move** does not prevent this unit from being **eligible to shoot/declare a charge**.`,
        },
      ],
    },
    {
      id: 'wreckas',
      name: 'Wreckas',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Priority Assets',
      rule: {
        name: 'Wreckin’ and Lootin’',
        flavor: 'Whether piratical or merely larcenous, Orks with an eye for loot react forcefully to rival claims.',
        body: `In your Shooting phase, when a friendly BREAKA BOYZ/FLASH GITZ/TANKBUSTAS unit is **selected to shoot**, if any of the following apply, that unit’s attacks can re-roll **hit rolls** of 1:
▪ That unit is within range of an **objective**.
▪ The target of that attack is within range of an **objective**.`,
      },
      stratagems: [
        {
          name: 'Gun-crazy Show-offs',
          sublabel: 'Wreckas – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'With a snort of contempt, these Orks decide to show the gitz who just shot at them what real guns are capable of.',
          when: `Your opponent’s Shooting phase, when an enemy unit has shot.`,
          target: `One friendly FLASH GITZ/TANKBUSTAS unit hit by those attacks.`,
          effect: `Your unit shoots using **normal shooting**, but while doing so your unit can only target that enemy unit.`,
          restrictions: ``,
        },
        {
          name: 'Drive-By Bustin’',
          sublabel: 'Wreckas – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Ork transports are not the smoothest of rides. However, the best loot-hunters have honed their drive-by volleys of armour-cracking firepower to the point of deadly accuracy.',
          when: `Your Shooting phase, when a friendly ORKS TRANSPORT unit is **selected to shoot**.`,
          target: `That ORKS TRANSPORT unit.`,
          effect: `Your unit’s ranged attacks with weapons selected for the **Firing Deck** ability have +1 to **hit rolls**.`,
          restrictions: ``,
        },
        {
          name: 'Grab It',
          sublabel: 'Wreckas – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Wreckin’ some gitz is all well and good, but getting the drop on them and then grabbing an opportunity for some loot is even better.',
          when: `Your Shooting phase, when a friendly **unengaged** BREAKA BOYZ/FLASH GITZ/TANKBUSTAS unit has shot.`,
          target: `That BREAKA BOYZ/FLASH GITZ/TANKBUSTAS unit.`,
          effect: `▪ Your unit can make a **normal move** of up to 6", and must end that move within range of an **objective**.
▪ Your unit is __not__ **eligible to declare a charge** until the end of the turn.`,
          restrictions: ``,
        },
      ],
      enhancements: [
        {
          name: 'Kaptin\'s Hat',
          points: 25,
          flavor: 'This impressively ostentatious piece of headgear signifies that whoever nicked it last controls a fleet of kroozers and invasion landers, ideal for the rapid redeployment of loot-hungry Orks.',
          body: `BIG MEK/WARBOSS INFANTRY model only. When both players have deployed their armies, you can redeploy up to three friendly ORKS INFANTRY units. When doing so, you can set those units up in **strategic reserves**, regardless of how many units are already in **strategic reserves**.`,
        },
        {
          name: 'Supa-snazz Dakka (Upgrade)',
          points: 20,
          flavor: 'Coils of sparking wires, unstable propellant and throbbing power cells are just some of the extras which Flash Gitz rivet onto their snazzguns to kill the enemy in more over-the-top ways.',
          body: `FLASH GITZ unit only. This unit’s Snazzgun weapons have [RAPID FIRE 1].`,
        },
      ],
    },
    {
      id: 'wurrband',
      name: 'Wurrband',
      source: 'codex',
      dp: 1,
      forceDisposition: 'Disruption',
      rule: {
        name: 'Powers of da Waaagh!',
        flavor: 'Surrounded by mobs of excitable Orks, Weirdboyz’ shamanic powers build to spectacular phenomena.',
        body: `Friendly ORKS PSYKER models’ [PSYCHIC] attacks have:
▪ +1 **S**.
▪ +1 **S** for every 5 models in this unit (or embarked within this model). Friendly ORKS PSYKER models have the following **psychic abilities**: **Roar of Mork (psychic level 1):** In your Movement phase, if this unit is not **battle-shocked**, you can make a **psychic roll** for this unit by rolling one D6. If you do:
▪ On a 1, this unit is **battle-shocked**.
▪ Select one enemy unit (excluding MONSTER/VEHICLE units) within 12" of this unit. That enemy unit makes a **battle-shock roll**, with -1 from that **battle-shock roll** for every 10 models in this unit. **Visions of Violence (psychic level 1):** At the start of the Fight phase, if this unit is not **battle-shocked**, you can make a **psychic roll** for this unit by rolling one D6. If you do:
▪ On a 1, this unit is **battle-shocked**.
▪ This unit has **Fights First**.`,
      },
      stratagems: [

      ],
      enhancements: [
        {
          name: 'Da Krunch',
          points: 10,
          flavor: 'Roiling energies frequently erupt from this Weirdboy’s eyes, solidifying above the enemy into the huge green foot of Gork (or Mork) himself, which repeatedly stamps on the foe.',
          body: `ORKS PSYKER model only. This model has the following weapon.`,
        },
        {
          name: '\'Eadbanger',
          points: 15,
          flavor: 'Known for yelling ‘Kop dis, ya zogger!’ at his chosen target beforehand, this Weirdboy is in the habit of projecting a bolt of raw power from his forehead which splatters the victim’s brains across a wide area.',
          body: `ORKS PSYKER model only. This model has the following weapon.`,
        },
        {
          name: 'Warphead',
          points: 25,
          flavor: 'Where most Weirdboyz would quite like to be left alone, so-called Warpheads become addicted to the danger, intentionally supercharging their tortured minds and revelling in venting dangerously unpredictable powers.',
          body: `ORKS PSYKER model only. This model:
▪ Has **psyker level 2**.
▪ Has **Deadly Demise D6**.
▪ Can re-roll **psychic rolls**.`,
        },
      ],
    },  ],

  // Datasheets live in src/data/datasheets/orks.js (rendered by DatasheetCard).
  datasheets: [],
}

export const orks = { en, ru: en }
