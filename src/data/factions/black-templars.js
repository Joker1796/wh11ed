// Black Templars — faction rules. Rewritten end to end for Codex Supplement: Black Templars (11th edition), which landed in
// app data 963 together with the new Codex: Space Marines and replaced every army rule and
// detachment the faction had. Transcribed by scripts/gen-faction-rules.mjs (re-run it rather
// than hand-porting); sources, highest wins: MFM > appdata.
//
//   wh40k-appdata (Codex Supplement: Black Templars) → army rules + 3 detachments, prose through
//     scripts/lib/sync-common.mjs's markup converter.
//   MFM v1.5 (src/data/mfm/black-templars.js) → enhancement points, detachment dp /
//     forceDispositions / unique tag.
//
// Oath of Moment is gone from every Space Marines army: the army rule is now Combat Doctrines
// (tracked per battle round by armyTrackers/space-marines.js), with the rest of the army rules
// folded in as `### ` subheadings — a faction page renders exactly one `armyRule`.
// GW ships no stratagem categories for these codices (every row is null), so sublabels read
// "<Detachment> – Stratagem". EN-first: `ru` reuses the same object; the RU overlay in
// ./ru/black-templars.js merges by array index and was rebuilt for this codex in its own pass.

const en = {
  slug: "black-templars",
  name: "Black Templars",
  armyRule: {
    "id": "combat-doctrines",
    "name": "Combat Doctrines",
    "flavor": "",
    "body": "At the start of your Command phase, you can select one **[gloss:sm-combat-doctrine:combat doctrine]** listed below. If you do, that **combat doctrine** is active for friendly ADEPTUS ASTARTES units with this ability until the start of your next Command phase.\n\n### Assault Doctrine\nWhen this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\n### Devastator Doctrine\nThis unit’s ranged attacks have [ASSAULT].\n\n### Tactical Doctrine\nWhen this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\nUnless otherwise stated:\n▪ You can only select each **[gloss:sm-combat-doctrine:combat doctrine]** once per battle.\n▪ Only one **combat doctrine** can be active for each unit. If a rule makes a **combat doctrine** active for a unit, any **combat doctrine** previously active for that unit is no longer active for that unit.\n\n### Transhuman Strategist\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.\n\n### Heirs of Sigismund\n▫ Your army cannot include any ADEPTUS ASTARTES PSYKER models.\n▫ Your army cannot include the following datasheets from Codex: Space Marines: GLADIATOR LANCER; GLADIATOR REAPER; GLADIATOR VALIANT; IMPULSOR; REPULSOR; REPULSOR EXECUTIONER."
  },
  detachments: [
    {
      "id": "vow-sworn-crusaders",
      "name": "Vow-sworn Crusaders",
      "source": "codex",
      "dp": 2,
      "forceDispositions": ["Purge the Foe"],
      "rule": {
        "name": "Templar Vows",
        "flavor": "On the eve of battle, the Black Templars gather to be led in prayer and contemplation by their champions. United in their hatred of the foe, they swear a mighty vow to uphold in the battle ahead.",
        "body": "At the start of the first battle round, you can select one **Vow** listed below. That **Vow** is active for friendly ADEPTUS ASTARTES units until the end of the battle.\n\n### Abhor the Witch, Destroy the Witch\nThis unit’s melee attacks that target a **[gloss:psyker:PSYKER]** unit:\n▪ Have [PRECISION].\n▪ Have [LANCE].\n\n### Accept Any Challenge, No Matter the Odds\nFriendly melee attacks that target a unit with a **[gloss:toughness:T]** greater than this unit’s **[gloss:strength:S]** have +1 to **[gloss:wound-roll:wound rolls]**.\n\n### Uphold the Honour of the Emperor\nFriendly INFANTRY units have:\n▪ At the end of your Movement phase, if this unit is controlling an **[gloss:objective:objective]**, that **objective** is **[gloss:secured-objective:secured]**.\n▪ When this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-act:eligible to start an action]**.\n\n**Restrictions:** Your army can include BLACK TEMPLARS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Pious Enmity",
          "sublabel": "Vow-sworn Crusaders – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The warrior priests of a crusade drive Sigismund’s heirs into the heart of battle, daring the greatest abominations to face their spiritual strength.",
          "when": "Fight phase, when a friendly CHAPLAIN/JUDICIAR unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That CHAPLAIN/JUDICIAR unit.",
          "effect": "▪ Your unit’s melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ __Or:__ Your unit’s melee attacks that target a MONSTER/VEHICLE unit can re-roll **hit rolls** of 1 and **[gloss:wound-roll:wound rolls]** of 1.",
          "restrictions": ""
        },
        {
          "name": "Heresy Begets Retribution",
          "sublabel": "Vow-sworn Crusaders – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Where enemies dare threaten the warriors of the God‑Emperor or seek to escape their deserved death, there must be swift retribution.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8” of a friendly ADEPTUS ASTARTES INFANTRY unit.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit can make a **[gloss:surge-move:surge move]** of up to D6”.",
          "restrictions": ""
        },
        {
          "name": "For the Emperor's Honour!",
          "sublabel": "Vow-sworn Crusaders – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Filled with the spirit of Sigismund, his heirs seek out the foe’s dark and unclean champions so that they may be crushed in the sight of their thralls.",
          "when": "The Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit’s melee attacks have [PRECISION].",
          "restrictions": ""
        },
        {
          "name": "Dread Crusaders",
          "sublabel": "Vow-sworn Crusaders – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "To face the Emperor’s transhuman crusaders as they chant their litanies of detestation can chill the soul.",
          "when": "Your opponent’s Charge phase, when an enemy unit selects **[gloss:charge-target:charge targets]**.",
          "target": "One ADEPTUS ASTARTES INFANTRY unit that was selected as a **[gloss:charge-target:charge target]** by that enemy unit this phase.",
          "effect": "That enemy unit must make a **[gloss:battle-shock-test:battle-shock roll]**, with -1 to that **battle-shock roll**.",
          "restrictions": ""
        },
        {
          "name": "Devout Push",
          "sublabel": "Vow-sworn Crusaders – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "With a zealous cry, the Black Templars press forward, using their ceramite‑armoured bulk to smash into the foe and overwhelm the enemy’s lines.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY unit is selected to make a **[gloss:pile-in:pile-in]/[gloss:consolidation:consolidation move]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "When making that **[gloss:pile-in:pile-in]/[gloss:consolidation:consolidation move]**, your unit can move up to D3+3”.",
          "restrictions": ""
        },
        {
          "name": "Spoor of the Unholy",
          "sublabel": "Vow-sworn Crusaders – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Perhaps guided by visions from the Emperor, Black Templars can pick out heresy wherever it lurks.",
          "when": "Your Shooting phase or the Fight phase, when a friendly ADEPTUS ASTARTES unit is selected to attack.",
          "target": "That ADEPTUS ASTARTES unit.",
          "effect": "Your unit can ignore modifiers to your unit’s:\n▪ **[gloss:ballistic-skill:BS]** and **[gloss:weapon-skill:WS]**.\n▪ **[gloss:hit-roll:Hit rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Incendiary Animus",
          "points": 25,
          "flavor": "This inspirational warrior exudes fierce contempt and loathing for the Emperor’s foes, inciting such apoplectic revulsion in their battle‑brothers as to drive their blows with vicious strength.",
          "body": "CHAPLAIN/JUDICIAR model only. This unit’s melee attacks have +1 **[gloss:strength:S]**."
        },
        {
          "name": "Consecrating Aura",
          "points": 20,
          "flavor": "The piety and honour of this warrior can be felt wherever he fights. His presence rouses the ardent souls of the Black Templars, warding Sigismund’s heirs from the blasphemy of the unbeliever.",
          "body": "ADEPTUS ASTARTES model only. This unit has 5+ **[gloss:invulnerable-save:InSv]**."
        },
        {
          "name": "Zealous Vanguard",
          "points": 25,
          "flavor": "This warrior is an unstoppable crusader whose hearts burn like twin pyres of eager zeal. Ever at the forefront of combat, he leads his warriors as the tip of the crusade’s blade.",
          "body": "ADEPTUS ASTARTES model only. This unit has [core:Scouts 6\"]."
        },
        {
          "name": "Augury Servo-host",
          "points": 20,
          "flavor": "This warrior’s auto‑senses are linked to a circling host of servo‑skulls crafted from the remains of favoured serfs and failed neophytes. Fitted with ocular probes and sensor vanes, they provide the Black Templar with advanced targeting information to pick out the unbelievers who cower in concealment.",
          "body": "ADEPTUS ASTARTES model only. In your Shooting phase, you can select one **[gloss:visible:visible]** enemy unit within 18” of this unit. That enemy unit cannot have the **[gloss:benefit-of-cover:benefit of cover]**."
        }
      ]
    },
    {
      "id": "marshals-household",
      "name": "Marshal's Household",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "rule": {
        "name": "Faith-fuelled Resolve",
        "flavor": "Uncompromising in their faith, a crusade's Sword Brethren are blazing beacons of intolerant resolve capable of holding back hordes of blasphemous foes from sites sacred to the Black Templars.",
        "body": "In the Fight phase, if a friendly SWORD BRETHREN SQUAD unit is within range of an **[gloss:objective:objective]**, that unit’s melee attacks have +1 **[gloss:attack-dice:A]**.\n\n**Restrictions:** Your army can include BLACK TEMPLARS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Blade of Detestation",
          "sublabel": "Marshal's Household – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "With roared litanies and incendiary hatred, the Sword Brethren plunge into their foe like a white-hot blade, their armoured momentum cracking armour, crushing bones, and trampling the foe underfoot.",
          "when": "Your Charge phase, when a friendly SWORD BRETHREN SQUAD unit ends a **[gloss:charge-move:charge move]**.",
          "target": "That SWORD BRETHREN SQUAD.",
          "effect": "Select one enemy unit **[gloss:engaged:engaged]** with your unit. Roll one D6 for each model in your unit **engaged** with that enemy unit:\n▪ For each 4+, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]** (to a maximum of 6 **mortal wounds**).",
          "restrictions": ""
        },
        {
          "name": "Slayers of Abominations",
          "sublabel": "Marshal's Household – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The largest manifestations of the foe's sin are branded unholy abominations, challenges which a crusade's champions gladly meet to drive their sanctified weapons deeply beneath their hides.",
          "when": "Fight phase, when a friendly SWORD BRETHREN SQUAD unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That SWORD BRETHREN SQUAD unit.",
          "effect": "Your unit's melee attacks that target a MONSTER/VEHICLE unit have +2 **[gloss:strength:S]**.",
          "restrictions": ""
        },
        {
          "name": "Unsparing Execution",
          "sublabel": "Marshal's Household – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Those who attempt to flee their rightful death only stroke their executioners' hatred all the hotter. None can be spared the God-Emperor's wrath.",
          "when": "Your opponent's Movement phase, when a unit is selected to make a **[gloss:fall-back-move:fall-back move]**, if that unit is **[gloss:engaged:engaged]** with a friendly SWORD BRETHREN SQUAD unit.",
          "target": "That SWORD BRETHREN SQUAD unit.",
          "effect": "When an enemy unit **[gloss:engaged:engaged]** with your unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that enemy unit must use the **[gloss:desperate-escape:desperate escape]** mode, with -1 to those **[gloss:hazard-roll:hazard rolls]** if that enemy unit is **[gloss:battle-shocked:battle-shocked]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Fervent Exemplars (Upgrade)",
          "points": 10,
          "flavor": "Paragons of their crusade's inexorable wrath, these Sword Brethren have earned a reputation for carving a path to victory through their foes, unable to rest while one enemy yet lives.",
          "body": "SWORD BRETHREN SQUAD unit only. This unit has +1 to **[gloss:charge-roll:charge rolls]**."
        },
        {
          "name": "Inheritors of Sigismund (Upgrade)",
          "points": 15,
          "flavor": "These warrior elites have achieved feats of bloody slaughter against the most deadly of the God-Emperor's foes, executing them in displays of such blisteringly swift attacks that it is clear they share a sliver of Sigismund's own skill.",
          "body": "SWORD BRETHREN SQUAD unit only. This unit has [core:Fights First]."
        }
      ]
    },
    {
      "id": "fist-of-the-god-emperor",
      "name": "Fist of the God-Emperor",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Take and Hold"],
      "rule": {
        "name": "Purge and Sanctify",
        "flavor": "As the battle‑brothers of a Vindication Task Force purge the Emperor’s domain in fire and blood, they see their holy quest as recovering Humanity’s rightful dominion. They scour the stain of the unclean, topple false idols, breach strongholds of unholy faith and plant the crusade’s standards in their place, branding such sites with the sacred icons of their brotherhood.",
        "body": "Each time a friendly CRUSADER SQUAD unit makes a **[gloss:surge-move:surge move]**, instead of selecting a **[gloss:surge-target:surge target]**, you can select the closest **[gloss:objective:objective]** to that unit. When that unit makes that **surge move**, each model in that unit must end that **surge move** as close as possible to that **objective** instead.\n\n**Restrictions:** Your army can include BLACK TEMPLARS units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Angels Defiant",
          "sublabel": "Fist of the God-Emperor – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "All too aware of their vital role in holding the foe at bay, these battle‑brothers refuse to yield to even the most grievous of wounds.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly CRUSADER SQUAD unit.",
          "target": "That CRUSADER SQUAD unit.",
          "effect": "Attacks that target your unit with a **[gloss:strength:S]** greater than your unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Avowed Destruction",
          "sublabel": "Fist of the God-Emperor – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The Black Templars will see their oaths upheld at any cost. Any foe with the temerity to impede them in this goal must be put mercilessly to the sword.",
          "when": "The Fight phase, when a friendly CRUSADER SQUAD unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That CRUSADER SQUAD unit.",
          "effect": "Your unit’s melee attacks:\n▪ Have [LETHAL HITS].\n▪ __Or:__ Have [SUSTAINED HITS 1].",
          "restrictions": ""
        },
        {
          "name": "Doctrinal Flexibility",
          "sublabel": "Fist of the God-Emperor – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "For all their zealous fury, the Black Templars are Space Marines still, capable of adapting their strategies in the midst of battle to ensure the foe’s destruction.",
          "when": "Your Command phase.",
          "target": "One friendly CRUSADER SQUAD unit.",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Oathbound Exemplar",
          "points": 10,
          "flavor": "With a ceaseless and booming oratory, this commander exhorts his warriors in their duty to the Emperor. Honour, he declaims, must be pursued relentlessly.",
          "body": "ADEPTUS ASTARTES INFANTRY unit only. When this unit is selected to make an **[gloss:advance:advance]/[gloss:fall-back-move:fall-back move]**, that **advance/fall-back move** does not prevent this unit from being **[gloss:eligible-to-act:eligible to start an action]**."
        },
        {
          "name": "Righteous Fervour (Upgrade)",
          "points": 15,
          "flavor": "With their zealous hatred stoked red‑hot by furious sermons and inflammatory prayers, Companions of Vehemence are filled with a wrathful vigour. Only the deaths of the God‑Emperor’s enemies can assuage their fury, and they will let nothing delay them from unleashing it.",
          "body": "CRUSADER SQUAD unit only. This unit can re-roll **[gloss:advance-roll:Advance rolls]**."
        }
      ]
    }
  ],
  datasheets: [],
}

export const blackTemplars = { en, ru: en }
