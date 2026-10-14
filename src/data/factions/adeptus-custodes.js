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
//     forceDispositions, and the LIONS / ARMOURY `unique` tags.
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
  slug: "adeptus-custodes",
  name: "Adeptus Custodes",
  armyRule: {
    "id": "martial-katah",
    "name": "Martial Ka’tah",
    "flavor": "The Adeptus Custodes have developed many thousands of martial ka’tahs. Custodians are proficient in many of these arts, shifting stances according to the battlefield situation.",
    "body": "At the start of your Command phase, friendly ADEPTUS CUSTODES units with this ability are **readied**. While a friendly unit is **readied**, you can select one of the **ka’tah abilities** presented below for that unit to use. If you do, that unit is no longer **readied**.\n\nEach **ka’tah ability** will tell you when that **ka’tah ability** can be used, and the effects that **ka’tah ability** has on the unit using it.\n\nWe recommend placing a token next to each **readied** unit, removing it when that unit is no longer **readied**.\n\n**Conversai**\n\nWHEN: Your Command phase.\n\nTARGET: One friendly **readied** unit.\n\nEFFECT: Until the end of the turn:\n\nBeing **[gloss:engaged:engaged]/[gloss:battle-shocked:battle‑shocked]** does not prevent your unit from being **[gloss:eligible-to-act:eligible to start an action]**.\n\nStarting an **[gloss:action:action]** does not prevent your unit from being **[gloss:eligible-to-shoot:eligible to shoot]**.\n\n**Calistus**\n\nWHEN: Your Movement phase, when a friendly **readied** unit is **[gloss:selected-to-move:selected to move]**.\n\nTARGET: That **readied** unit.\n\nEFFECT: When your unit makes a **[gloss:normal-move:normal]/[gloss:advance:advance]/[gloss:fall-back-move:fall‑back move]**, your unit can move through all types of model.\n\n**Salvus**\n\nWHEN: Your Shooting phase, when a friendly **readied** unit is **[gloss:selected-to-shoot:selected to shoot]**.\n\nTARGET: That **readied** unit.\n\nEFFECT: Your unit can ignore modifiers to your unit’s:\n\n**[gloss:ballistic-skill:BS].**\n\n**[gloss:hit-roll:Hit rolls]** and **[gloss:wound-roll:wound rolls]**.\n\n**Dacatarai**\n\nWHEN: Start of the Fight phase.\n\nTARGET: One friendly **readied** unit.\n\nEFFECT: Your unit’s melee attacks that target an enemy unit (excluding MONSTER/VEHICLE units) can **[gloss:re-roll:re‑roll]** hit rolls of 1.\n\n**Kaptaris**\n\nWHEN: Start of the Fight phase.\n\nTARGET: One friendly **readied** unit.\n\nEFFECT: Melee attacks that target your unit have -1 to **hit rolls**.\n\n**Rendax**\n\nWHEN: Fight phase, when a friendly **readied** unit is** [gloss:selected-to-fight:selected to fight]**.\n\nTARGET: One friendly **readied** unit.\n\nEFFECT: Your unit’s melee attacks have [LETHAL HITS: MONSTER/VEHICLE].\n\n**Favoured Ka'tah**\n\nMany of the most prominent shield hosts favour a specific martial ka’tah above all others.\n\nAll **[gloss:detachments:detachments]** tagged ‘Unique: Shield Host’ state a Favoured Ka’tah. If you selected one of these **detachments**, the **ka’tah ability** that is the Favoured Ka’tah of that **detachment** grants the additional effect listed in that **detachment**.\n\nExample: If you selected the Solar Watch **detachment**, when you select the Calistus **ka’tah ability** for a **readied** unit, that unit has +2\" **[gloss:move-characteristic:M]** in addition to the normal effect of Calistus.\n\n### Aegis of the Emperor\nFriendly ADEPTUS CUSTODES units with this ability have [core:Feel No Pain 5+] against **[gloss:mortal-wound:mortal wounds]**.\n\n### Aquila Commander\nAt the start of the battle round, if a model with this ability is your WARLORD, gain 1CP.\n\n### Daughters of the Abyss\n▪ Friendly ANATHEMA PSYKANA units with this ability have [core:Feel No Pain 3+] against **[gloss:psychic-attack:psychic attacks]**.\n▪ Friendly ANATHEMA PSYKANA units with this ability have the following ability:\n\nPsychic Null (Aura): Friendly ADEPTUS CUSTODES units within 6\" of this unit have [core:Feel No Pain 5+] against **psychic attacks**.\n\n**ANATHEMA PSYKANA**\n\nThough the Adeptus Custodes often fight alongside the Silent Sisterhood, they take orders only from their own commanders, or from the Emperor Himself.\n\nYou can include ANATHEMA PSYKANA units in your army, even though they do not have the ADEPTUS CUSTODES faction keyword.\n\nWhen mustering your army, unless otherwise stated:\n▪ You cannot select ANATHEMA PSYKANA as your **[gloss:army-faction:army faction]**.\n▪ You cannot select an ANATHEMA PSYKANA model to be your WARLORD.\n\n### Special Move Types\nThe following are special **[gloss:move-type:move types]** that certain or all of your units are eligible to make."
  },
  detachments: [
    {
      "id": "dread-host",
      "name": "Dread Host",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Purge the Foe"
      ],
      "unique": "SHIELD HOST",
      "rule": {
        "name": "Instruments of the Emperor’s Wrath",
        "flavor": "Favouring the aggressive Dacatarai fighting style, the Custodians of the Dread Host seek to outmatch their enemies in bloody melee combat.",
        "body": "Friendly ADEPTUS CUSTODES units can re‑roll **[gloss:charge-roll:charge rolls]**.\n\n**Favoured ka’tah**\n\n**Dacatarai**\n\n**Additional Effect:** When an enemy unit **[gloss:engaged:engaged]** with your unit makes a **[gloss:pile-in:pile‑in]/[gloss:consolidation:consolidation move]**, -2\" from that **pile‑in/consolidation move**."
      },
      "stratagems": [
        {
          "name": "Golden Light of the Moiraides",
          "sublabel": "Dread Host – Stratagem",
          "cp": "2CP",
          "turn": "your",
          "flavor": "The Dread Host goes to battle aboard the trio of terrifying pre‑Heresy warships known as the Moiraides. These potent vessels teleport their passengers straight into battle amidst an eruption of dazzling golden light.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to make an **[gloss:ingress-move:ingress move]**.",
          "target": "That ADEPTUS CUSTODES Unit.",
          "effect": "Until the start of your next turn:\n▪ Attacks that target your unit have -1 to **[gloss:hit-roll:hit rolls]**.\n▪ Enemy units cannot target your unit with **[gloss:snap-shooting:snap shooting]** attacks.",
          "restrictions": ""
        },
        {
          "name": "Preternatural Rapidity",
          "sublabel": "Dread Host – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The warriors of the Adeptus Custodes are relentless in their pursuit of the Throneworld’s foes.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES unit ends an **[gloss:advance-move:advance move]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "That **[gloss:advance-move:advance move]** does not prevent your unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.",
          "restrictions": ""
        },
        {
          "name": "Lightning Wrath",
          "sublabel": "Dread Host – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Rushing forward with terrifying speed, Custodian sodalities leave their foes no opportunity to escape.",
          "when": "Fight phase, when a friendly ADEPTUS CUSTODES unit is selected to make a **[gloss:pile-in:pile‑in move]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "When making that **[gloss:pile-in:pile‑in move]**, your unit can move up to D3+3\".",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Flawless Bladework",
          "points": 15,
          "flavor": "This Custodian’s skills in close‑quarters combat are awe‑inspiring to behold.",
          "body": "ADEPTUS CUSTODES model only. This model’s melee attacks have [SUSTAINED HITS 1]."
        },
        {
          "name": "Auric Exemplar",
          "points": 15,
          "flavor": "This champion’s physical might is exceptional, even for a Custodian. Each swing of their blade carves a bloody swathe through the foe.",
          "body": "ADEPTUS CUSTODES model only. This model’s melee attacks have [CLEAVE 1]."
        }
      ]
    },
    {
      "id": "auric-champions",
      "name": "Auric Champions",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Purge the Foe"
      ],
      "rule": {
        "name": "Assemblage of Might",
        "flavor": "The Emperor’s Custodians will gladly test their mettle against the worst the galaxy has to offer.",
        "body": "In your Command phase, you can select one enemy unit to be a **dreadful foe** unit until the start of your next Command phase. Friendly ADEPTUS CUSTODES CHARACTER models’ attacks that target a **dreadful foe** unit have +1 to **[gloss:wound-roll:wound rolls]**."
      },
      "stratagems": [
        {
          "name": "Gilded Champion",
          "sublabel": "Auric Champions – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The shining champions of the Adeptus Custodes are looked upon in awe by all who witness their grim arts. Their judgement is without flaw, and their tactical acumen utterly impeccable.",
          "when": "Any phase, when a friendly ADEPTUS CUSTODES CHARACTER model has used a (Once per battle, per unit) datasheet ability.",
          "target": "That ADEPTUS CUSTODES CHARACTER model.",
          "effect": "Your model can use that (Once per battle, per unit) datasheet ability one additional time, but not in the same phase.",
          "restrictions": "You cannot use this **[gloss:stratagem:stratagem]** on the same ADEPTUS CUSTODES CHARACTER model more than once per battle."
        },
        {
          "name": "Duty Unto Death",
          "sublabel": "Auric Champions – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Even as death is certain, the Emperor’s Ten Thousand will not relent, fighting to their last breath in defence of the Golden Throne.",
          "when": "Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES unit.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "When a model in your unit is **[gloss:destroyed:destroyed]**, if your unit has not been **[gloss:selected-to-fight:selected to fight]** this phase, roll one D6, with +1 to that roll if that model is a CHARACTER model:\n▪ On a 3+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Shroud of the Hidden Blade",
          "points": 20,
          "flavor": "Long‑forgotten technologies shroud this cloak’s bearer.",
          "body": "ADEPTUS CUSTODES model only. This model has:\n▪ [core:Stealth]\n▪ [core:Lone Operative]."
        },
        {
          "name": "Superior Creation",
          "points": 30,
          "flavor": "The cellular alchemy by which this heroic warrior was forged has rendered them breathtakingly resilient.",
          "body": "ADEPTUS CUSTODES INFANTRY model only. (Once per battle, per army) At the end of a phase in which this model is **[gloss:destroyed:destroyed]**, roll one D6:\n▪ On a 2+, set this model back up on the battlefield as close as possible to where it was **destroyed**, **[gloss:unengaged:unengaged]**, with 3 wounds remaining."
        },
        {
          "name": "Inspirational Exemplar",
          "points": 10,
          "flavor": "A master orator, this Custodian’s battle cries light fires of defiance in the hearts of their allies.",
          "body": "ADEPTUS CUSTODES INFANTRY model only. (Once per battle round, per army) At the start of any phase, you can select one friendly **[gloss:battle-shocked:battle‑shocked]** ADEPTUS CUSTODES unit within 9\" of this model. That unit is no longer **battle‑shocked**."
        }
      ]
    },
    {
      "id": "aquilan-shield",
      "name": "Aquilan Shield",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Take and Hold"
      ],
      "unique": "SHIELD HOST",
      "rule": {
        "name": "Gilded Guardians",
        "flavor": "Resilient experts of ranged warfare, the Aquilan Shield give no ground and punish advancing enemies with their mastery of the Salvus Ka’tah.",
        "body": "While a friendly ADEPTUS CUSTODES unit (excluding MONSTER/VEHICLE units) is within range of an **[gloss:objective:objective]**, ranged attacks that target that unit with a **[gloss:strength:S]** greater than that unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**.\n\n**Favoured ka’tah**\n\n**Salvus**\n\n**Additional Effect:** Your unit’s ranged attacks have +6\" **[gloss:range:R]**."
      },
      "stratagems": [
        {
          "name": "Rapid Reactions",
          "sublabel": "Aquilan Shield – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Forcing their outmatched enemies to fall back, Custodians level their guardian spears and cut down fleeing opponents with volleys of bolter fire.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a **[gloss:fall-back-move:fall‑back move]**.",
          "target": "One friendly ADEPTUS CUSTODES INFANTRY unit that was **[gloss:engaged:engaged]** with that enemy unit at the start of the phase.",
          "effect": "Your unit shoots using **[gloss:normal-shooting:normal shooting]**, but while doing so your unit can only target that enemy unit.",
          "restrictions": ""
        },
        {
          "name": "Manoeuvre and Fire",
          "sublabel": "Aquilan Shield – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The Adeptus Custodes never take the pressure off their foes, maintaining punishing fire even as they manoeuvre to new positions.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to make a **[gloss:fall-back-move:fall‑back move]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "That move does not prevent your unit from being **[gloss:eligible-to-shoot:eligible to shoot]/[gloss:declare-charge:declare a charge]**.",
          "restrictions": ""
        },
        {
          "name": "Tip of the Talon",
          "sublabel": "Aquilan Shield – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Fighting at the forefront of the battle, these Custodians hit their victims with perfectly timed volleys the instant before they tear into their ranks.",
          "when": "Your Shooting phase, when a friendly ADEPTUS CUSTODES unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Your unit’s ranged attacks that target an enemy unit within 9\" of your unit have +1 **[gloss:strength:S]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Not a Shell Wasted",
          "points": 10,
          "flavor": "Every volley these warriors fire is calculated to inflict the maximum amount of damage upon the foe.",
          "body": "ADEPTUS CUSTODES INFANTRY model only. This unit’s ranged attacks have +1 **[gloss:attack-dice:A]**."
        },
        {
          "name": "Pareldor’s Caducatrix",
          "points": 30,
          "flavor": "This immeasurably ancient auto‑medicae device meshes seamlessly with any suit of armour, dispensing panacaeic elixirs in response to mental or physical trauma.",
          "body": "ADEPTUS CUSTODES model only. (Once per battle, per army) At the start of any phase, this model **[gloss:heal:heals]** D3+3 wounds."
        }
      ]
    },
    {
      "id": "emissaries-imperatus",
      "name": "Emissaries Imperatus",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Priority Assets"
      ],
      "unique": "SHIELD HOST",
      "rule": {
        "name": "Heralds of the Throne",
        "flavor": "The Emissaries Imperatus prioritise the mission over individual actions. Their favoured ka’tah, Conservai, similarly emphasises strategy.",
        "body": "Friendly ADEPTUS CUSTODES units have [core:Fights First].\n\n**Favoured Ka’tah**\n\n**Conservai**\n\n**Additional Effect:** Until the end of the turn, being selected to make an **[gloss:advance:advance]/[gloss:fall-back-move:fall‑back move]** does not prevent your unit from being **[gloss:eligible-to-act:eligible to start an action]**."
      },
      "stratagems": [
        {
          "name": "Bearers of His Light",
          "sublabel": "Emissaries Imperatus – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "No matter how far they stray from the Golden Throne, all Custodians carry with them the Emperor’s light, drawing upon His guidance in the midst of battle.",
          "when": "Fight phase, when a friendly ADEPTUS CUSTODES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Your unit’s melee attacks can ignore modifiers to **[gloss:hit-roll:hit rolls]** and **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Slayers of Nightmares",
          "sublabel": "Emissaries Imperatus – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "In an age plagued by monstrous foes, primordial horrors from the darkest void circle Humanity’s dying light. These hideous aberrations the Adeptus Custodes engage without hesitation.",
          "when": "Fight phase, when a friendly ADEPTUS CUSTODES unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Your unit’s melee attacks that target a unit with a **[gloss:toughness:T]** greater than this unit’s **T** have +1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Selfless Service",
          "sublabel": "Emissaries Imperatus – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Any of the Ten Thousand would place themselves in peril to protect a fellow Custodian without a moment’s hesitation.",
          "when": "End of your opponent’s Charge phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS CUSTODES unit within 6\" of an enemy unit. You can only select a VEHICLE unit if it is a CHARACTER/WALKER unit.",
          "effect": "**[gloss:declare-charge:Declare a charge]** with your unit:\n▪ When making the **[gloss:charge-roll:charge roll]**, if the result is greater than 6 (after modifiers), change it to 6.\n▪ When selecting **[gloss:charge-target:charge targets]**, you can select __any__ enemy units that are within 6\" of your unit and within the **[gloss:maximum-distance:maximum distance]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Edge of the Blade",
          "points": 15,
          "flavor": "This auric champion always strives to be first into the fray.",
          "body": "ADEPTUS CUSTODES model only. If this unit made a **[gloss:charge-move:charge move]** this turn, this model’s attacks can:\n▪ Re‑roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ Re‑roll **[gloss:wound-roll:wound rolls]** of 1."
        },
        {
          "name": "Auriferous Orb",
          "points": 20,
          "flavor": "When this sphere of solid gold detonates, it unleashes beams of radiating light that blind those they do not kill.",
          "body": "ADEPTUS CUSTODES model only. This model has the following weapon:"
        }
      ]
    },
    {
      "id": "emperors-chosen",
      "name": "Emperor’s Chosen",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Priority Assets"
      ],
      "unique": "SHIELD HOST",
      "rule": {
        "name": "Magna Imperator",
        "flavor": "The Adeptus Custodes are blessed with gifts the Emperor has given them – physical might, mental robustness and the most powerful arms and armour available.",
        "body": "When a friendly ADEPTUS CUSTODES unit is selected to attack, that unit’s attacks can:\n▪ Re‑roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re‑roll __one__ **[gloss:wound-roll:wound roll]**.\n\n**Favoured ka’tah**\n\n**Rendax**\n\n**Additional Effect:** You can select one enemy MONSTER/VEHICLE unit **[gloss:engaged:engaged]** with your unit and roll one D6:\n▪ On a 1‑2, that enemy unit suffers 1 **[gloss:mortal-wound:mortal wound]**.\n▪ On a 3‑5, that enemy unit suffers D3 **mortal wounds**.\n▪ On a 6, that enemy unit suffers 3 **mortal wounds**."
      },
      "stratagems": [
        {
          "name": "In Auramite clad",
          "sublabel": "Emperor’s Chosen – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Even the most potent of attacks struggle to penetrate the auramite plate of these warriors.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES unit (excluding CUSTODIAN WARDENS units).",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Impenetrable Bastion",
          "sublabel": "Emperor’s Chosen – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "When holding ground, a sodality of Custodians becomes a living fortress whose gilded walls are nigh impossible to breach.",
          "when": "End of your Movement phase.",
          "target": "One friendly ADEPTUS CUSTODES unit (excluding MONSTER/VEHICLE units).",
          "effect": "Select one **[gloss:objective:objective]** your unit is controlling. That **objective** is **[gloss:secured-objective:secured]**.",
          "restrictions": ""
        },
        {
          "name": "Superhuman Focus",
          "sublabel": "Emperor’s Chosen – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Ever watchful and alert, these warriors switch seamlessly between martial ka’tah.",
          "when": "End of any phase.",
          "target": "One friendly ADEPTUS CUSTODES unit that is not **readied**.",
          "effect": "Your unit is **readied**.",
          "restrictions": "You cannot select the same unit as the target of this **[gloss:stratagem:stratagem]** more than once per battle round."
        }
      ],
      "enhancements": [
        {
          "name": "From the Hall of Armouries",
          "points": 15,
          "flavor": "The armouries of the Adeptus Custodes contain some of the most finely crafted and deadly close‑quarters weaponry wielded by any warrior of the Imperium.",
          "body": "ADEPTUS CUSTODES model only. This model’s melee attacks have [DEVASTATING WOUNDS]."
        },
        {
          "name": "Radiant Mantle",
          "points": 40,
          "flavor": "The golden glory of the Emperor Himself glows around this magnificent warrior like Sol’s own fire. Enemies are blinded by its light, forced to recoil in pain and terror.",
          "body": "ADEPTUS CUSTODES INFANTRY model only. Attacks that target this unit have -1 to **[gloss:hit-roll:hit rolls]**."
        }
      ]
    },
    {
      "id": "solar-watch",
      "name": "Solar Watch",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Reconnaissance"
      ],
      "unique": "SHIELD HOST",
      "rule": {
        "name": "Talon Sortie",
        "flavor": "The Solar Watch utilise speed, mobility and the adaptable Calistus Ka’tah to confound and eviscerate opposing armies.",
        "body": "When a friendly ADEPTUS CUSTODES unit makes a **[gloss:fall-back-move:fall‑back move]**, that **fall‑back move** does not prevent that unit from being **eligible to charge**.\n\n**Favoured ka’tah**\n\n**Calistus**\n\n**Additional Effect:** Your unit has +2\" **[gloss:move-characteristic:M]**."
      },
      "stratagems": [
        {
          "name": "Inexorable",
          "sublabel": "Solar Watch – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "No obstacle, physical or otherwise, can halt the advance of the Solar Watch, nor stay their wrath.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES unit is **[gloss:selected-to-move:selected to move]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Until the end of the turn, your unit can ignore modifiers to your unit’s:\n▪ **[gloss:move-characteristic:M]**.\n▪ **[gloss:advance-roll:Advance rolls]** and **[gloss:charge-roll:charge rolls]**.",
          "restrictions": ""
        },
        {
          "name": "At Spear’s Length",
          "sublabel": "Solar Watch – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Duty to the Golden Throne overrides all else. When called to strike a new target, Custodian sodalities withdraw from the fight in close order, keeping their spears leveled towards their foes and holding them at bay with close‑range volleys of bolter fire.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES unit is selected to make a **[gloss:fall-back-move:fall‑back move]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "That **[gloss:fall-back-move:fall‑back move]** does not prevent your unit from being **[gloss:eligible-to-shoot:eligible to shoot]**.",
          "restrictions": ""
        },
        {
          "name": "Gravimetric Grenade",
          "sublabel": "Solar Watch – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Carried by many Custodians, these explosive devices detonate on impact, creating a field of gravitic energy that immobilises those caught in the blast radius.",
          "when": "Start of your opponent’s Charge phase.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS CUSTODES unit.",
          "effect": "Select one **[gloss:visible:visible]** enemy unit within 12\" of your unit. When that enemy unit **[gloss:declare-charge:declares a charge]**, that enemy unit has -1 to **[gloss:charge-roll:charge rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Sally Forth",
          "points": 30,
          "flavor": "This warlord excels in directing fast and deadly offensives designed to close rapidly with the enemy, overwhelming the foe with a devastating concentration of force.",
          "body": "ADEPTUS CUSTODES SHIELD‑CAPTAIN model only. At the start of your Charge phase, select one friendly ADEPTUS CUSTODES INFANTRY unit within 6\" of this model. If that unit made an **[gloss:advance-move:advance move]** this turn, that **advance move** does not prevent that unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**."
        },
        {
          "name": "Auric Eagle (Upgrade)",
          "points": 15,
          "flavor": "Embodying the raptors of ancient Terra, this champion of the Golden Throne descends upon their prey swiftly, with talons unsheathed.",
          "body": "ADEPTUS CUSTODES INFANTRY/MOUNTED unit only (excluding TERMINATOR units). This unit has +1 to **[gloss:advance-roll:advance rolls]** and **[gloss:charge-roll:charge rolls]**."
        }
      ]
    },
    {
      "id": "might-of-the-moritoi",
      "name": "Might of the Moritoi",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Take and Hold"
      ],
      "rule": {
        "name": "Moritoi Ancients",
        "flavor": "The auramite giants of the Moritoi are terrifying to behold, moving with the grace of mortal warriors. Wounds serve only to increase the ferocity with which they slaughter their foes.",
        "body": "▪ While a friendly ADEPTUS CUSTODES DREADNOUGHT unit is at **[gloss:starting-strength:starting strength]**, that unit has +2 **[gloss:objective-control:OC]**.\n▪ While a friendly ADEPTUS CUSTODES DREADNOUGHT unit is below **starting strength**, that unit’s attacks can re‑roll **[gloss:hit-roll:hit rolls]** of 1.\n▪ While a friendly ADEPTUS CUSTODES DREADNOUGHT unit is **[gloss:half-strength:below half‑strength]**, that unit’s attacks can:\n▪ Re‑roll **hit rolls** of 1.\n▪ Re‑roll **[gloss:wound-roll:wound rolls]** of 1."
      },
      "stratagems": [
        {
          "name": "Unceasing Onslaught",
          "sublabel": "Might of the Moritoi – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Drawing upon the full extent of their organic and mechanical might, this Dreadnought advances with unrelenting aggression, dispensing death with archeotech weaponry and crushing fist alike.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES DREADNOUGHT unit ends an **[gloss:advance-move:advance move]**.",
          "target": "That ADEPTUS CUSTODES DREADNOUGHT unit.",
          "effect": "▪ Your unit’s ranged attacks have [ASSAULT] until the end of the turn.\n▪ That move does not prevent your unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.",
          "restrictions": ""
        },
        {
          "name": "Honoured Interred",
          "sublabel": "Might of the Moritoi – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "To fight in the shadow of the Moritoi is inspirational for any Custodian.",
          "when": "Your Shooting phase or the Fight phase.",
          "target": "One friendly ADEPTUS CUSTODES DREADNOUGHT unit.",
          "effect": "Your unit has the following ability:\n\n**Honoured Interred (Aura):** Friendly ADEPTUS CUSTODES units within 6\" of this unit can re‑roll **[gloss:hit-roll:hit rolls]** of 1.",
          "restrictions": ""
        },
        {
          "name": "Unstoppable momentum",
          "sublabel": "Might of the Moritoi – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Few obstacles can impede a Custodian Dreadnought in full flow. Those that do are smashed down to clear a path.",
          "when": "Your Movement/Charge phase, when a friendly ADEPTUS CUSTODES DREADNOUGHT unit is **[gloss:selected-to-move:selected to move]** or **[gloss:declare-charge:declares a charge]**.",
          "target": "That ADEPTUS CUSTODES DREADNOUGHT unit.",
          "effect": "Your unit has MOBILE.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Memento Moritoi (one per army) (Upgrade)",
          "points": 30,
          "flavor": "This reliquary contains drops of blood, promethium and amniotic fluid harvested from the fractured form of a fallen Dreadnought. Said to be infused with the remaining fury of fallen warrior and war machine, this device inspires wrathful fury in those who bear it to war.",
          "body": "ADEPTUS CUSTODES DREADNOUGHT model only. This model’s melee attacks have +1 **[gloss:attack-dice:A]**, **[gloss:strength:S]** and **[gloss:damage-roll:D]**."
        },
        {
          "name": "Augury Uplink (one per army) (Upgrade)",
          "points": 30,
          "flavor": "The war engines of the Adeptus Custodes possess an array of augury equipment that combines to build an intricate picture of the unfolding conflict, enabling the bearer to detect incoming threats, then angle their armour to repel the worst of enemy attacks.",
          "body": "ADEPTUS CUSTODES DREADNOUGHT model only. This model has [core:Feel No Pain 5+]."
        }
      ]
    },
    {
      "id": "grav-assault-force",
      "name": "Grav‑Assault Force",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Reconnaissance"
      ],
      "rule": {
        "name": "Flare Shields",
        "flavor": "Many Adeptus Custodes vehicles are fitted with flare shields: relics of the Dark Age of Technology that can deflect incoming fire.",
        "body": "Friendly GRAV‑ASSAULT units have 4+ **[gloss:invulnerable-save:InSv]** against ranged attacks."
      },
      "stratagems": [
        {
          "name": "Victory Before Death",
          "sublabel": "Grav‑Assault Force – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Scrambling from the burning wreckage of their vehicles, Custodian crews use the last of their strength to claim their assigned objectives before succumbing to their wounds.",
          "when": "Any phase, when a friendly GRAV‑ASSAULT unit within range of an **[gloss:objective:objective]** is **[gloss:destroyed:destroyed]**.",
          "target": "That GRAV‑ASSAULT unit. You can target that unit with this **[gloss:stratagem:stratagem]** even though it is **[gloss:destroyed:destroyed]**.",
          "effect": "Select one **[gloss:objective:objective]** that:\n▪ Your unit was controlling when it was **[gloss:destroyed:destroyed]**.\n▪ Has no enemy units (excluding AIRCRAFT units) within range of it.\n\nThat **objective** is **[gloss:secured-objective:secured]**.",
          "restrictions": ""
        },
        {
          "name": "Advanced Stabilisers",
          "sublabel": "Grav‑Assault Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Adeptus Custodes grav‑vehicles possess highly efficient weapon stabilisation systems, enabling them to fire accurately even when travelling at maximum speed.",
          "when": "Your Shooting phase, when a friendly GRAV‑ASSAULT unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That GRAV‑ASSAULT unit.",
          "effect": "Your unit’s ranged attacks have [ASSAULT].",
          "restrictions": ""
        },
        {
          "name": "Inevitable Annihilation",
          "sublabel": "Grav‑Assault Force – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The preternatural dexterity and reaction times of Custodian pilots and gunners, paired with the superlative targeting augury and terrifying speed of Adeptus Custodes grav‑tanks, conspire to ensure that prey have little hope of escaping their fiery doom.",
          "when": "Your Shooting phase, when a friendly GRAV‑ASSAULT unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That GRAV‑ASSAULT unit.",
          "effect": "Your unit can ignore modifiers to your unit’s:\n▪ **[gloss:ballistic-skill:BS]**.\n▪ **[gloss:hit-roll:Hit rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Anti-gravitic Mobility (Upgrade)",
          "points": 15,
          "flavor": "The grav‑tanks of the Adeptus Custodes are exceptionally mobile, enabling their skilled crews to fade in and out of contact with the foe whilst keeping up a constant stream of killing fire.",
          "body": "GRAV‑ASSAULT unit only. When this unit makes a **[gloss:fall-back-move:fall‑back move]**, that **fall‑back move** does not prevent this unit from being **[gloss:eligible-to-shoot:eligible to shoot]**."
        },
        {
          "name": "Combat Deployment (Upgrade)",
          "points": 20,
          "flavor": "Custodian vehicle crews are as consummately skilled as their infantry counterparts, delivering sodalities into the thick of the fight and suppressing foes with turret‑mounted weapons to prevent incoming fire.",
          "body": "GRAV‑ASSAULT TRANSPORT model only. When a friendly ADEPTUS CUSTODES unit is selected to make a **[gloss:disembark:disembark move]** from this unit, until the end of the turn:\n▪ That unit can re‑roll **[gloss:charge-roll:charge rolls]**.\n▪ Enemy units cannot target that unit with **[gloss:snap-shooting:snap shooting]** attacks."
        }
      ]
    },
    {
      "id": "honoured-companions",
      "name": "Honoured Companions",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Take and Hold"
      ],
      "rule": {
        "name": "Companion’s Watch",
        "flavor": "Among the Companions and the Sentinel Guard, vigilance is the most crucial of attributes.",
        "body": "While a friendly TRUSTED SENTINEL unit is within range of an **[gloss:objective:objective]**, that unit’s attacks can re‑roll **[gloss:wound-roll:wound rolls]** of 1."
      },
      "stratagems": [
        {
          "name": "Emperor’s Domain",
          "sublabel": "Honoured Companions – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "There are those territories that must remain in the hands of the Imperium and be free of foes, regardless of the cost.",
          "when": "Fight phase, when a friendly TRUSTED SENTINEL unit is selected to make a **[gloss:consolidation:consolidation move]**.",
          "target": "That TRUSTED SENTINEL unit.",
          "effect": "You can select the **[gloss:objective-consolidation:objective consolidation mode]** for that **[gloss:consolidation:consolidation move]**, regardless of that **consolidation move**’s Before Moving restrictions.\n\nThis means your unit can move out of engagement range with enemy units, provided it meets the conditions of the objective consolidation mode.",
          "restrictions": ""
        },
        {
          "name": "Avenge the Fallen",
          "sublabel": "Honoured Companions – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The loss of a single Custodian is commemorated by the tolling of the Bell of Lost Souls on Terra, and by their comrades’ bloody vengeance on the battlefield.",
          "when": "Fight phase, when a friendly TRUSTED SENTINEL unit that is below **[gloss:starting-strength:starting strength]** is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That TRUSTED SENTINEL unit.",
          "effect": "Your unit’s melee attacks (excluding those made by CHARACTER models) have +2 **[gloss:attack-dice:A]**.",
          "restrictions": ""
        },
        {
          "name": "Swift as the Eagle",
          "sublabel": "Honoured Companions – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Every Custodian is devastatingly fast on the battlefield, with preternatural reactions to match. The greatest among them are outstanding, even by these lofty standards.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly **[gloss:unengaged:unengaged]** TRUSTED SENTINEL unit.",
          "target": "That TRUSTED SENTINEL unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3\".",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Arae-Shrike",
          "points": 20,
          "flavor": "Built into this Custodian’s armour, this aviform artefact is a relic of the Dark Age of Technology. It projects electromagnetic distortion to corrupt and confound homing beacons, teleportation technology and other methods of translocation.",
          "body": "ADEPTUS CUSTODES INFANTRY model only. Enemy units that are selected to make an **[gloss:ingress-move:ingress move]** cannot be set up within 12\" of this unit."
        },
        {
          "name": "Celeritous Sentries (Upgrade)",
          "points": 15,
          "flavor": "Even while standing statue‑still upon their endless watch, these Custodians are ready to spring instantly into violent action.",
          "body": "TRUSTED SENTINEL unit only. (Once per phase, per unit) You can target this unit with the **[gloss:heroic-intervention:Heroic Intervention stratagem]**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does __not__ prevent any uses of that **stratagem** on other units this phase."
        }
      ]
    },
    {
      "id": "lions-of-the-emperor",
      "name": "Lions of the Emperor",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Disruption"
      ],
      "rule": {
        "name": "On Gilded Wings",
        "flavor": "Terminator sodalities are swept up by golden drop craft, ready to be deployed once more as battle demands.",
        "body": "At the end of your opponent’s Fight phase, if a friendly ADEPTUS CUSTODES TERMINATOR unit is **[gloss:unengaged:unengaged]**, you can place that unit in **[gloss:strategic-reserves:strategic reserves]**."
      },
      "stratagems": [
        {
          "name": "Vigil Unending",
          "sublabel": "Lions of the Emperor – Stratagem",
          "cp": "2CP",
          "turn": "either",
          "flavor": "So long as their duty remains unfulfilled, the Adeptus Custodes remain defiant in the face of their opponents.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES TERMINATOR unit.",
          "target": "That ADEPTUS CUSTODES TERMINATOR unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:damage-roll:D]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Unleash the Lions",
          "sublabel": "Lions of the Emperor – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Terminator‑armoured Custodian champions fight alone and unaided, engaging entire formations in unrelenting battle.",
          "when": "Your Command phase.",
          "target": "One friendly ADEPTUS CUSTODES TERMINATOR unit that has 2+ models.",
          "effect": "Your unit is split into separate units, each containing __one__ model. These new units each have a **[gloss:starting-strength:starting strength]** of 1.",
          "restrictions": ""
        },
        {
          "name": "Fury of the Emperor",
          "sublabel": "Lions of the Emperor – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "For all their physical might, it is the wrathful fury of the Adeptus Custodes that renders them truly terrifying. This is a gift they owe to the Emperor, who vested them with but a sliver of His terrible fury.",
          "when": "Your Charge phase, when a friendly ADEPTUS CUSTODES TERMINATOR unit that made an **[gloss:ingress-move:ingress move]** this turn is selected to **[gloss:declare-charge:declare a charge]**.",
          "target": "That ADEPTUS CUSTODES TERMINATOR unit.",
          "effect": "Your unit has +2 to **[gloss:charge-roll:charge rolls]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Lightning Descent",
          "points": 20,
          "flavor": "This Shield‑Captain knows well the value of intelligence, utilising data harvested by agents of the Golden Throne to strike like a bolt of golden lightning before the foe can bring their strength to bear.",
          "body": "SHIELD‑CAPTAIN IN ALLARUS TERMINATOR ARMOUR model only. In your first Movement phase, this unit can make an **[gloss:ingress-move:ingress move]**."
        },
        {
          "name": "Leonine Ferocity",
          "points": 20,
          "flavor": "This Shield‑Captain demands boundless aggression from the warriors at their command. Each movement by the foe is seized upon and punished with furious countercharges.",
          "body": "SHIELD‑CAPTAIN IN ALLARUS TERMINATOR ARMOUR model only. (Once per phase, per army) You can target this unit with the **Rapid Ingress stratagem**, regardless of any other uses of that **[gloss:stratagem:stratagem]** this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does __not__ prevent any uses of that **stratagem** on other units this phase."
        }
      ]
    },
    {
      "id": "guardians-of-the-throne",
      "name": "Guardians of the Throne",
      "source": "codex",
      "dp": 3,
      "forceDispositions": [
        "Priority Assets",
        "Purge the Foe"
      ],
      "rule": {
        "name": "Martial Mastery",
        "flavor": "The Custodians are masters of all forms of war. There is no foe, no matter how numerous or powerful, that they cannot lay low.",
        "body": "In the Fight phase, when a friendly ADEPTUS CUSTODES unit is **[gloss:selected-to-fight:selected to fight]**, that unit’s melee attacks have:\n▪ [SUSTAINED HITS 1].\n▪ __Or:__ [LETHAL HITS]."
      },
      "stratagems": [
        {
          "name": "Prime Target",
          "sublabel": "Guardians of the Throne – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "When a threat to the Golden Throne is identified, the Adeptus Custodes will bend every fibre of their being to ensure its destruction.",
          "when": "Your Shooting phase, when a friendly ADEPTUS CUSTODES unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Your unit’s ranged attacks can:\n▪ Re‑roll __one__ **[gloss:hit-roll:hit roll]**.\n▪ Re‑roll __one__ **[gloss:wound-roll:wound roll]**.\n▪ Re‑roll __one__ **[gloss:damage-roll:damage roll]**.",
          "restrictions": ""
        },
        {
          "name": "Shield of Honour",
          "sublabel": "Guardians of the Throne – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Coming to the aid of beleaguered allies, these Custodians issue challenges to their foes. Few possess the resolve to ignore these bellicose cries, and even those who refuse to respond are left shaken.",
          "when": "Start of the Fight phase.",
          "target": "One friendly ADEPTUS CUSTODES INFANTRY/MOUNTED unit.",
          "effect": "When an enemy model **[gloss:engaged:engaged]** with your unit selects targets, if that enemy model does __not__ select your unit as the target of __all__ of its attacks, that enemy model’s attacks have:\n▪ -1 to **[gloss:hit-roll:hit rolls].**\n▪ -1 to **[gloss:wound-roll:wound rolls]**.",
          "restrictions": ""
        },
        {
          "name": "Superhuman Focus",
          "sublabel": "Guardians of the Throne – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Ever watchful and alert, these warriors switch seamlessly between martial ka’tah.",
          "when": "End of any phase.",
          "target": "One friendly ADEPTUS CUSTODES unit that is not **readied**.",
          "effect": "Your unit is **readied**.",
          "restrictions": "You cannot select the same unit as the target of this Stratagem more than once per battle round."
        },
        {
          "name": "Swift as the Eagle",
          "sublabel": "Guardians of the Throne – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "Every Custodian is devastatingly fast on the battlefield, with preternatural reactions to match. The greatest among them are outstanding, even by these lofty standards.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly **[gloss:unengaged:unengaged]** TRUSTED SENTINEL unit.",
          "target": "That TRUSTED SENTINEL unit.",
          "effect": "Your unit can make a **[gloss:normal-move:normal move]** of up to D3+3\".",
          "restrictions": ""
        },
        {
          "name": "In Auramite clad",
          "sublabel": "Guardians of the Throne – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Even the most potent of attacks struggle to penetrate the auramite plate of these warriors.",
          "when": "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly ADEPTUS CUSTODES unit (excluding CUSTODIAN WARDENS units).",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Attacks that target your unit have -1 **[gloss:armour-penetration:AP]** until that enemy unit has attacked.",
          "restrictions": ""
        },
        {
          "name": "Unlimited Endurance",
          "sublabel": "Guardians of the Throne – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Possessed of great endurance, Custodian sodalities willl pursue their targets to the ends of the galaxy. No matter how hard they might try, none can flee from their wrath.",
          "when": "Your Movement phase, when a friendly ADEPTUS CUSTODES unit ends an **[gloss:advance-move:advance move]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Until the end of the turn:\n▪ Your unit’s ranged attacks have [ASSAULT].\n▪ That **[gloss:advance-move:advance move]** does not prevent your unit from being **[gloss:eligible-to-charge:eligible to declare a charge]**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Bane of Abominations",
          "points": 20,
          "flavor": "This Captain‑Commander has earned many names destroying mighty champions and powerful war machines.",
          "body": "ADEPTUS CUSTODES model only. This model’s attacks that target an enemy CHARACTER/MONSTER/VEHICLE unit have +1 to **[gloss:wound-roll:wound rolls]**."
        },
        {
          "name": "Emperor’s Light",
          "points": 15,
          "flavor": "This masterwork misericordia is believed to flood the hearts of its victims with searing holy radiance.",
          "body": "ADEPTUS CUSTODES model only. This model has the following weapon:"
        },
        {
          "name": "Castellan’s Mark",
          "points": 25,
          "flavor": "Awarded to the Custodian with the greatest tally of victories in the Blood Games, this finely worked pauldron denotes its bearer as a superlative strategic genius.",
          "body": "ADEPTUS CUSTODES model only. When both players have deployed their armies, you can redeploy up to three friendly ADEPTUS CUSTODES units. When doing so, you can set those units up in **[gloss:strategic-reserves:strategic reserves]**, regardless of how many units are already in **strategic reserves**."
        },
        {
          "name": "Eagle’s Eye",
          "points": 30,
          "flavor": "The sensorium gheists within this helm shriek technomantic warnings to the wearer whenever danger threatens.",
          "body": "ADEPTUS CUSTODES model only.\n▪ This model has +1 **[gloss:wounds:W]**.\n▪ (Once per battle, per army) When attacks are allocated to this model, you can use this ability. If you do, this model has 3+ **[gloss:invulnerable-save:InSv]**."
        }
      ]
    },
    {
      "id": "shadowkeepers",
      "name": "Shadowkeepers",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Purge the Foe"
      ],
      "unique": "SHIELD HOST",
      "rule": {
        "name": "Wardens of the Dark Cells",
        "flavor": "Inured to the most nightmarish and esoteric threats, the Shadowkeepers will not be swayed from their duty.",
        "body": "While a friendly ADEPTUS CUSTODES unit (excluding MONSTER/VEHICLE units) is within range of an **[gloss:objective:objective]**, melee attacks that target that unit with a **[gloss:strength:S]** greater than that unit’s **[gloss:toughness:T]** have -1 to **[gloss:wound-roll:wound rolls]**.\n\n**Favoured ka’tah**\n\n**Kaptaris**\n\n**Additional Effect:** You can select one enemy unit **[gloss:engaged:engaged]** with your unit. That enemy unit must make a **[gloss:battle-shock-test:battle‑shock roll]**, with -1 to that **battle‑shock roll**. You cannot select the same enemy unit for this effect more than once per phase."
      },
      "stratagems": [
        {
          "name": "Grim Responsibility",
          "sublabel": "Shadowkeepers – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "The Shadowkeepers strive to bring the most monstrous and malevolent of the Emperor’s foes to justice, striking them down with ruthless efficiency.",
          "when": "Fight phase, when a friendly ADEPTUS CUSTODES INFANTRY unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That ADEPTUS CUSTODES unit.",
          "effect": "Your unit’s melee attacks have [LETHAL HITS: CHARACTER/MONSTER].",
          "restrictions": ""
        },
        {
          "name": "No Escape",
          "sublabel": "Shadowkeepers – Stratagem",
          "cp": "2CP",
          "turn": "opponent",
          "flavor": "Those Custodians who have served among the Shadowkeepers pursue their prey with dogged determination and will see them captured or slain.",
          "when": "Your opponent’s Movement phase, when an enemy unit ends a **[gloss:fall-back-move:fall‑back move]**.",
          "target": "One friendly **[gloss:unengaged:unengaged]** ADEPTUS CUSTODES INFANTRY unit that is within 6\" of that enemy unit.",
          "effect": "**[gloss:declare-charge:Declare a charge]** with your unit. When selecting **[gloss:charge-target:charge targets]**, you can only select enemy units that made a **[gloss:fall-back-move:fall‑back move]** this phase and are within the **[gloss:maximum-distance:maximum distance]**.",
          "restrictions": ""
        },
        {
          "name": "Indomitable Guardians",
          "sublabel": "Shadowkeepers – Stratagem",
          "cp": "1CP",
          "turn": "opponent",
          "flavor": "No volume of fire or aggression will pry the Custodians from their objectives. Those who attempt to do so are subjected to the fullest extent of their violent fury.",
          "when": "Your opponent’s Fight phase, when an enemy unit has fought.",
          "target": "One friendly ADEPTUS CUSTODES unit that is within range of an **[gloss:objective:objective]** and is **[gloss:eligible-to-fight:eligible to fight]**.",
          "effect": "Your unit has [core:Fights First] and __must__ be the next unit you **select to fight**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Unstoppable Destroyer",
          "points": 25,
          "flavor": "This Custodian unleashes upon their opponents the Emperor’s own fury, pursuing enemy warriors with relentless determination and allowing none to flee the field.",
          "body": "ADEPTUS CUSTODES INFANTRY model only. When this unit is selected to make a **[gloss:pile-in:pile‑in]/[gloss:consolidation:consolidation move]**:\n▪ This unit can move up to 4\".\n▪ You can select any **[gloss:consolidation-mode:consolidation mode]** for that **consolidation move**, regardless of that **consolidation move**’s Before Moving restrictions."
        },
        {
          "name": "Genalchemic Warding",
          "points": 30,
          "flavor": "The genetic alchemy that saturates this warrior’s physiology has been tempered in wars beyond count. There are few hardships or hurts such a warrior cannot endure.",
          "body": "ADEPTUS CUSTODES model only. This model has [core:Feel No Pain 5+]."
        }
      ]
    },
    {
      "id": "null-maiden-vigil",
      "name": "Null Maiden Vigil",
      "source": "codex",
      "dp": 1,
      "forceDispositions": [
        "Disruption"
      ],
      "rule": {
        "name": "Silent Sisterhood",
        "flavor": "The Null Maidens of the Silent Sisterhood bring with them the nightmare pall of their collective null aura, afflicting their opponents with a creeping sense of dread.",
        "body": "▪ When mustering your army, you can select a friendly ANATHEMA PSYKANA CHARACTER model to be your WARLORD.\n▪ Friendly PROSECUTOR SQUAD units have BATTLELINE.\n▪ Friendly ANATHEMA PSYKANA units have the following ability:\n\n**Creeping Dread (Aura):** In the Battle‑shock step of your opponent’s Command phase, each enemy unit within 12\" of this unit that is a PSYKER unit/below **[gloss:starting-strength:starting strength]** makes a **[gloss:battle-shock-test:battle‑shock roll]**, with -1 to that **battle‑shock roll**."
      },
      "stratagems": [
        {
          "name": "Anathema Blademastery",
          "sublabel": "Null Maiden Vigil – Stratagem",
          "cp": "1CP",
          "turn": "either",
          "flavor": "Vigilators train tirelessly in the art of the blade, demonstrating a skill‑at‑arms as terrifying as their soulless aura.",
          "when": "Fight phase, when a friendly VIGILATOR SQUAD unit is **[gloss:selected-to-fight:selected to fight]**.",
          "target": "That VIGILATOR SQUAD unit.",
          "effect": "Your unit’s attacks have:\n▪ [SUSTAINED HITS 1]\n▪ __Or:__ [LETHAL HITS].",
          "restrictions": ""
        },
        {
          "name": "Psy‑chaff Volley",
          "sublabel": "Null Maiden Vigil – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "Prosecutors can fire psy‑chaff bolts whose esoteric emissions weaken those targets not slain outright.",
          "when": "Your Shooting phase, when a friendly PROSECUTOR SQUAD unit has shot.",
          "target": "That PROSECUTOR SQUAD unit.",
          "effect": "Select one enemy unit hit by those attacks. That unit is **prosecuted** until the end of the turn:\n▪ Attacks that target a **prosecuted** unit have +1 **[gloss:armour-penetration:AP]**.",
          "restrictions": ""
        },
        {
          "name": "Purgation Sweep",
          "sublabel": "Null Maiden Vigil – Stratagem",
          "cp": "1CP",
          "turn": "your",
          "flavor": "The role of the Witchseeker on the battlefield is simple: to reduce their intended targets to ash.",
          "when": "Your Shooting phase, when a friendly WITCHSEEKER SQUAD unit is **[gloss:selected-to-shoot:selected to shoot]**.",
          "target": "That WITCHSEEKER SQUAD unit.",
          "effect": "Your unit’s [TORRENT] attacks have:\n▪ +1 **[gloss:attack-dice:A]**.\n▪ __Or:__ If those attacks target a PSYKER/**battle shocked** unit, +2 **A**.",
          "restrictions": ""
        }
      ],
      "enhancements": [
        {
          "name": "Oblivion Knight",
          "points": 15,
          "flavor": "Knights‑Centura of the Chamber of Oblivion demonstrate exceptional prowess with whichever weapons they opt to wield. Woe betide any witch who crosses their path.",
          "body": "ANATHEMA PSYKANA model only. This unit’s attacks have:\n▪ +1 to **[gloss:hit-roll:hit rolls]**.\n▪ __Or:__ If this unit targets a PSYKER/**[gloss:battle-shocked:battle‑shocked]** unit, +1 to **hit rolls** and **[gloss:wound-roll:wound rolls]**."
        },
        {
          "name": "Huntress’ Eye",
          "points": 10,
          "flavor": "This ancient bionic focuses the bearer’s null aura into a horrifying stare that can terrify foes to death.",
          "body": "ANATHEMA PSYKANA model only. In your Movement phase, you can select one **[gloss:visible:visible]** enemy unit within 12\" of this unit. That unit makes a **[gloss:battle-shock-test:battle‑shock roll]**, with -1 to that **battle‑shock roll**."
        }
      ]
    }
  ],
  datasheets: [],
}

export const adeptusCustodes = { en, ru: en }
