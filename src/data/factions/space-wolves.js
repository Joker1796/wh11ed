// Space Wolves — faction rules. Rewritten end to end for Codex Supplement: Space Wolves (11th edition), which landed in
// app data 963 together with the new Codex: Space Marines and replaced every army rule and
// detachment the faction had. Transcribed by scripts/gen-faction-rules.mjs (re-run it rather
// than hand-porting); sources, highest wins: MFM > appdata.
//
//   wh40k-appdata (Codex Supplement: Space Wolves) → army rules + 3 detachments, prose through
//     scripts/lib/sync-common.mjs's markup converter.
//   MFM v1.5 (src/data/mfm/space-wolves.js) → enhancement points, detachment dp /
//     forceDispositions / unique tag.
//
// Oath of Moment is gone from every Space Marines army: the army rule is now Combat Doctrines
// (tracked per battle round by armyTrackers/space-marines.js), with the rest of the army rules
// folded in as `### ` subheadings — a faction page renders exactly one `armyRule`.
// GW ships no stratagem categories for these codices (every row is null), so sublabels read
// "<Detachment> – Stratagem". EN-first: `ru` reuses the same object; the RU overlay in
// ./ru/space-wolves.js merges by array index and was rebuilt for this codex in its own pass.

const en = {
  slug: "space-wolves",
  name: "Space Wolves",
  armyRule: {
    "id": "combat-doctrines",
    "name": "Combat Doctrines",
    "flavor": "",
    "body": "At the start of your Command phase, you can select one **[gloss:sm-combat-doctrine:combat doctrine]** listed below. If you do, that **combat doctrine** is active for friendly ADEPTUS ASTARTES units with this ability until the start of your next Command phase.\n\n### Assault Doctrine\nWhen this unit is selected to make an **[gloss:advance-move:advance move]**, that **advance move** does not prevent this unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\n### Devastator Doctrine\nThis unit’s ranged attacks have [ASSAULT].\n\n### Tactical Doctrine\nWhen this unit is selected to make a **[gloss:fall-back-move:fall-back move]**, that **fall-back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]** and **[gloss:eligible-to-charge:eligible to declare a charge]**.\n\nUnless otherwise stated:\n▪ You can only select each **[gloss:sm-combat-doctrine:combat doctrine]** once per battle.\n▪ Only one **combat doctrine** can be active for each unit. If a rule makes a **combat doctrine** active for a unit, any **combat doctrine** previously active for that unit is no longer active for that unit.\n\n### Transhuman Strategist\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.\n\n### Curse of the Wulfen\nWhile this unit is within 6” of a friendly SPACE WOLVES CHARACTER model (excluding WULFEN models) or within 12” of a friendly WOLF PRIEST model, if this unit is not **[gloss:battle-shocked:battle-shocked]**:\n▪ If this unit has INFANTRY, this unit has +1 **[gloss:objective-control:OC]**.\n▪ If this unit has VEHICLE, this unit has +3 **OC**.\n\nBestial Forms: For the purposes of **[gloss:transport-capacity:transport capacity]**, each WULFEN model takes up the space of 2 models.\n\n### Sons of Russ\nYour army cannot include APOTHECARY units."
  },
  detachments: [
    {
      "id": "saga-of-the-great-wolf",
      "name": "Saga of the Great Wolf",
      "source": "codex",
      "dp": 2,
      "forceDispositions": ["Take and Hold"],
      "rule": {
        "name": "Master of Wolves",
        "flavor": "When the Great Wolf Logan Grimnar leads his packs to war, it is certain that mighty deeds will be done and epic verses added to the sagas of many a Space Wolf. There is none amongst the sons of Russ who can command such instinctive authority throughout his Chapter, none who so deftly wields warrior and war engine like a single great pack. In the sight of their lord, every Space Wolf aspires to be a champion of Fenris and strives with ever-greater determination to prove themselves worthy of his regard. Grimnar masterfully directs the hunt from its very heart, orchestrating every element like an apex predator herding its prey to destruction. Where restraint is needed, he sees it exercised. Where focused fury must be unleashed, he is its master and embodiment both. So does the saga of Logan Grimnar grow ever greater for the telling.\n\nHOWLING ONSLAUGHT\n\nWhen the Great Wolf gives the command, his packs descend upon the foe in a coordinated and utterly devastating strike.",
        "body": "Friendly ADEPTUS ASTARTES units (excluding MONSTER/VEHICLES units) with this ability have the following abilities:\n\n**Encircling Jaws**: If the **[gloss:sm-combat-doctrine:assault doctrine]** is active for your unit, your unit has +1 to **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**.\n\n**Hunter’s Eye**: If the **devastator doctrine** is active for your unit, your unit’s ranged attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1.\n\n**Ferocious Strike**: If the **tactical doctrine** is active for your unit, your unit’s attacks that target an enemy unit with 9” have [SUSTAINED HITS 1].\n\nFriendly LOGAN GRIMNAR units have the following ability:\n\n**Howling Onslaught**: **(Once per battle, per army)** In your command phase, you can use this ability. If you do, friendly ADEPTUS ASTARTES MONSTER/VEHICLE units benefit from the **Master of Wolves** rule until the start of your next command phase.\n\n**Restrictions**: Your army can include SPACE WOLVES units, but it cannot include any ADEPTUS ASTARTES units drawn from any other Chapter."
      },
      "stratagems": [
        {
          "name": "Fangs of the Pack",
          "sublabel": "Saga of the Great Wolf – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Fighting as one, these champions of Fenris fall upon an enemy champion and drag them down with single‑minded savagery.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY/MOUNTED unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit’s melee attacks have [PRECISION].",
          "restrictions": ""
        },
        {
          "name": "Grimnar's Command",
          "sublabel": "Saga of the Great Wolf – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Pivotal as they are to the Great Wolf’s plans, this pack have their own orders to fulfil in this moment that come directly from Grimnar himself.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit (excluding MONSTER/VEHICLE units).",
          "effect": "Select one **[gloss:sm-combat-doctrine:combat doctrine]**. That **combat doctrine** is active for your unit until the start of your next Command phase.",
          "restrictions": ""
        },
        {
          "name": "Fenrisian Ferocity",
          "sublabel": "Saga of the Great Wolf – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Even the most challenging terrain or formidable fortifications cannot stop the Great Wolf’s chief hunters once they are in motion.",
          "when": "Your Movement/Charge phase, when a friendly ADEPTUS ASTARTES MOUNTED/WALKER unit is **[gloss:selected-to-move:selected to move]** or **[gloss:declare-charge:declares a charge]**.",
          "target": "That ADEPTUS ASTARTES MOUNTED/WALKER unit.",
          "effect": "Your unit has MOBILE.",
          "restrictions": ""
        },
        {
          "name": "Eye of the Pack",
          "sublabel": "Saga of the Great Wolf – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Once a pack of Fenrisian warriors has perceived some slight weakness in the defences of a foe, they all strike at once, like encircling predators dragging down their prey.",
          "when": "Your Shooting phase, or the Fight phase, when a friendly ADEPTUS ASTARTES INFANTRY unit is **[gloss:selected-to-attack:selected to attack]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY unit.",
          "effect": "Your unit’s attacks can re-roll **[gloss:wound-roll:wound rolls]** of 1 and 2.",
          "restrictions": ""
        },
        {
          "name": "Wolf Totems",
          "sublabel": "Saga of the Great Wolf – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Be it the power of belief or something a little more eldritch, the Space Wolves’ trust in their various protective amulets and totems is often borne out.",
          "when": "Any phase, when a friendly ADEPTUS ASTARTES INFANTRY/MOUNTED unit suffers a **[gloss:mortal-wound:mortal wound]**.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit has [core:Feel No Pain 5+] against **[gloss:mortal-wound:mortal wounds]**.",
          "restrictions": ""
        },
        {
          "name": "Battle Instincts",
          "sublabel": "Saga of the Great Wolf – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "These champions of Fenris respond to enemy fire with instinctive swiftness, rarely giving their foes a second chance to shoot at them.",
          "when": "Your opponent’s Shooting phase, when an enemy unit that targeted a friendly **[gloss:unengaged:unengaged]** ADEPTUS ASTARTES INFANTRY/MOUNTED unit has shot.",
          "target": "That ADEPTUS ASTARTES INFANTRY/MOUNTED unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3”.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Grimnar’s Mark",
          "points": 15,
          "flavor": "This moonsilver wolf-talisman is bestowed by the Great Wolf himself before battle, a mark of favour that fills the bearer with an eagerness to slay the foe.",
          "body": "ADEPTUS ASTARTES TERMINATOR CAPTAIN model only. **(Once per battle round, per army)** You can target this unit with the **Rapid Ingress/Heroic Intervention stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1CP.\n▪ That use does not prevent any uses of that **stratagem** on other units this phase."
        },
        {
          "name": "Howlmaw",
          "points": 15,
          "flavor": "An ancient hunting horn with a built-in vox amplification unit, this relic’s stirring howl can be heard even through the wild clangour of battle.",
          "body": "WOLF PRIEST model only. (Once per turn, per unit) At the start of the fight phase, you can select one enemy unit within 6” of this model. That unit makes a **[gloss:battle-shock-test:battle-shock roll]** with -1 to that **battle-shock roll**."
        },
        {
          "name": "Skjald’s Foretelling",
          "points": 20,
          "flavor": "Great deeds have been prophesied for this champion, such that those who fight alongside him do so all the harder as they play out the self-fulfilling prophecy.",
          "body": "WOLF GUARD BATTLE LEADER model only. This unit’s melee attacks have [LANCE]."
        },
        {
          "name": "Chariots of the Storm",
          "points": 25,
          "flavor": "This dedicated flight of gunships attends the Great Wolf and his packs, and can be called in to rapidly reposition his forces in the moments before battle is joined.",
          "body": "ADEPTUS ASTARTES model only. When both players have deployed their armies, you can redeploy up to three friendly ADEPTUS ASTARTES units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**."
        }
      ]
    },
    {
      "id": "champions-of-fenris",
      "name": "Champions of Fenris",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Priority Assets"],
      "unique": "TERMINATOR",
      "rule": {
        "name": "The Great Wolf Watches",
        "flavor": "The battle‑brothers of this Great Company know what their lord expects of them and stand ready to pounce the moment the foe are fool enough to stray within range.",
        "body": "Friendly ADEPTUS ASTARTES CHARACTER units have the following ability:\n\n**Countercharge**: **(Once per battle round, per unit)** When you target this unit with the **[gloss:heroic-intervention:Heroic Intervention stratagem]**, that use is -1CP."
      },
      "stratagems": [
        {
          "name": "Heroic Resolve",
          "sublabel": "Champions of Fenris – Stratagem",
          "cp": "2CP",
          "turn": "either",
          "flavor": "This warrior’s indomitable fortitude is the stuff of legend, galvanizing his pack to remain standing before an avalanche of incoming attacks.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS ASTARTES CHARACTER unit.",
          "target": "That ADEPTUS ASTARTES CHARACTER unit.",
          "effect": "Attacks that target your unit have ‑1 **[gloss:damage-roll:D]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Birth of a Saga",
          "sublabel": "Champions of Fenris – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Heroes are forged in the heat of battle, rising from obscurity to become the warriors of epic sagas.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS ASTARTES unit (excluding MONSTER/VEHICLE units).",
          "effect": "Until the start of your next Command phase, your unit has CHARACTER.",
          "restrictions": ""
        },
        {
          "name": "Champion's Guidance",
          "sublabel": "Champions of Fenris – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "A paragon of Fenrisian savagery, this champion guides his warriors with confidence and precision.",
          "when": "Fight phase, when a friendly ADEPTUS ASTARTES CHARACTER unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS ASTARTES CHARACTER unit.",
          "effect": "Your unit’s melee attacks can re-roll **[gloss:hit-roll:hit rolls]** of 1 and **[gloss:wound-roll:wound rolls]** of 1.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "A Giant Amongst Giants",
          "points": 15,
          "flavor": "Likened to a walking pinnacle of Fenrisian granite come to life, this hulking champion is an echo of Russ himself.",
          "body": "ADEPTUS ASTARTES INFANTRY model only.\n▪ This model has +2**[gloss:wounds:W]**.\n▪ This model’s melee attacks have +1 **[gloss:strength:S]**."
        },
        {
          "name": "Preyslayer",
          "points": 15,
          "flavor": "Possessed of a ferocious predatory instinct, this warrior leads swift and deadly encirclements and ambushes with peerless skill.",
          "body": "ADEPTUS ASTARTES INFANTRY model only. This unit can re-roll **[gloss:charge-roll:charge rolls]**."
        }
      ]
    },
    {
      "id": "saga-of-the-beastslayer",
      "name": "Saga of the Beastslayer",
      "source": "codex",
      "dp": 1,
      "forceDispositions": ["Purge the Foe"],
      "rule": {
        "name": "Legendary Slayers",
        "flavor": "Some Space Wolves seek only to bring down the most monstrous and deadly foes. With hunting packs of Fenrisian wolves, Thunderwolf Cavalry and rampaging bands of Wulfen, they seek to hunt down and slay mighty champions, towering monstrosities and rumbling war machines, demoralising the foe and earning glorious victories.",
        "body": "Attacks made by friendly BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN units have [LETHAL HITS: CHARACTER/MONSTER/VEHICLE]."
      },
      "stratagems": [
        {
          "name": "Impetuosity",
          "sublabel": "Saga of the Beastslayer – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Severe losses only drive Blood Claws and Wulfen forward into the midst of the foe.",
          "when": "Your opponent’s Shooting phase, when an enemy unit that targeted a friendly **[gloss:unengaged:unengaged]** BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN unit has shot.",
          "target": "That BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN unit.",
          "effect": "Your unit can make a **[gloss:surge-move:surge move]** of up to D6”.",
          "restrictions": ""
        },
        {
          "name": "Co-ordinated Strike",
          "sublabel": "Saga of the Beastslayer – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Space Wolves officers rein in their warriors’ impulsive fury, repositioning them to strike exposed flanks.",
          "when": "End of your opponent’s Fight phase.",
          "target": "One **[gloss:unengaged:unengaged]** BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN unit that is within 9\" of one or more battlefield edges.",
          "effect": "Place your unit in **[gloss:strategic-reserves:strategic reserves]**.",
          "restrictions": ""
        },
        {
          "name": "Unbridled Ferocity",
          "sublabel": "Saga of the Beastslayer – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The Space Wolves fight with a savage fury that enables them to overcome even the most resilient targets.",
          "when": "Fight phase, when a friendly BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN unit.",
          "effect": "Your unit’s melee attacks have [LANCE].",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Wolf-Touched",
          "points": 15,
          "flavor": "Whilst the Canis Helix has yet to overcome this champion fully, it is stirred to life by the thrill of battle and the scent of blood.",
          "body": "ADEPTUS ASTARTES model only. This unit has:\n▪ WULFEN.\n▪ +2” **[gloss:move-characteristic:M]**.\n\nIn the Declare Battle Formations step, the bearer can be attached to a Wulfen or Wulfen with Storm Shields unit."
        },
        {
          "name": "Hunter’s Guile",
          "points": 20,
          "flavor": "ADEPTUS ASTARTES model only. When both players have deployed their armies, you can redeploy up to three friendly BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**.",
          "body": "ADEPTUS ASTARTES model only. When both players have deployed their armies, you can redeploy up to three friendly BLOOD CLAWS/THUNDERWOLF CAVALRY/WULFEN units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**."
        }
      ]
    }
  ],
  datasheets: [],
}

export const spaceWolves = { en, ru: en }
