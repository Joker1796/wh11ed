// Combat Patrol — hand-authored content for each faction's fixed-roster Combat Patrol box
// (detachment rule, army rule as printed IN THE BOX — sometimes pre-errata relative to the
// Codex, e.g. Necrons' "reanimates D3" vs the Codex's errata'd "heals D3" — stratagems,
// enhancements, and the box's fixed-composition datasheets). Source is
// wh40k-appdata's per-faction bundle (factions/<slug>.json), filtered to the rows flagged
// isCombatPatrol: true (detachment/datasheets/enhancements/stratagems) and the armyRule whose
// publicationId matches the "Combat Patrol: <box name>" publication.
//
// Shape: one file for all ~24 CP factions (each box's content is small — 1 detachment rule, 1
// army rule copy, 2-3 stratagems, 1-2 enhancements, 4-5 datasheets — so no per-faction file
// split like src/data/factions/*.js). Datasheets reuse the exact field shape DatasheetCard.vue
// already renders (see src/data/datasheets/*.js): profiles/ranged/melee use lowercase stat keys
// (m/t/sv/w/ld/oc, a/bs/ws/s/ap/d), `faction` is the plain army-rule name shown on the card
// (not a lookup — CP text can legitimately differ from the Codex copy of the same-named rule),
// `damaged` is `{ note, text }`. CP datasheets have no `points`/`options` — fixed loadout, not
// scored — so both fields are omitted rather than set to null/empty.
//
// Verify against appdata with `node scripts/sync-combat-patrol.mjs` after editing.
//
// RU is a sparse translation overlay (combatPatrolRu.js) deep-merged over `en` — see that
// file's header for the mechanism and COMBAT-PATROL-RU-TRANSLATION-TASK.md (repo root) for the
// translation brief. Untranslated factions transparently fall back to the EN text.
import { deepOverlay } from './deepOverlay.js'
import { combatPatrolRu } from './combatPatrolRu.js'

const en = {
  factions: [
    {
      slug: 'necrons',
      name: 'Necrons',
      boxName: "Amonhotekh's Guard",
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Territorial Imperatives',
        flavor:
          'Amonhotekh’s Guard prioritise conquest above all else. When faced with his undying legions, most foes cower or flee. Those brave enough to stand and fight are subjected to the terrifying power of his guard’s most powerful weapon: a Canoptek Doomstalker.',
        body: `▪ At the end of your Command phase, you can select one friendly Amonhotekh's Guard unit. That unit has +1 OC until the start of your next Command phase.
▪ When playing a Combat Patrol battle, the following friendly units must start the battle in strategic reserves and cannot be set up on the battlefield before the battle round stated, and must be set up wholly within your deployment zone when they do: Canoptek Doomstalker (battle round 3).`,
      },

      armyRule: {
        name: 'Reanimation Protocols',
        body: `If your Army Faction is Necrons, at the end of your Command phase, each unit from your army with this ability that is on the battlefield activates its Reanimation Protocols and reanimates D3 wounds. Each time such a unit reanimates a wound:
▪ If that unit contains one or more models with fewer than their starting number of wounds remaining, select one of those models; that model regains one lost wound.
▪ If all models in that unit have their starting number of wounds, but that unit is not at its Starting Strength, one destroyed model is returned to that unit with one wound remaining.

Once such a unit is at its Starting Strength and all of its models have their starting number of wounds, nothing further happens.`,
        example:
          'A unit of Lokhust Destroyers (which have a Wounds characteristic of 3) activates its Reanimation Protocols. The unit had a Starting Strength of 3, but currently contains 2 models, and one of those models has lost 1 wound. A 3 is rolled to see how many wounds are reanimated. The first of these reanimated wounds restores the wounded Lokhust Destroyer back to 3 wounds. The second of these reanimated wounds returns the destroyed Lokhust Destroyer to the battlefield with 1 wound remaining. The third of these reanimated wounds restores one of the remaining lost wounds to the same Lokhust Destroyer that was just returned. The unit now contains 3 models, two of which have 3 wounds remaining and one of which has 2 wounds remaining.',
      },

      stratagems: [
        {
          name: 'Gauss Storm',
          sublabel: "Amonhotekh's Guard – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor:
            'Necron Warriors unleash rapid volleys of gauss fire, forming a crackling storm of killing emerald energy that is nigh impossible to evade.',
          when: "Your Shooting phase, when a friendly Amonhotekh's Guard Necron Warriors unit is selected to shoot.",
          target: "That Amonhotekh's Guard Necron Warriors unit.",
          effect: "Your unit's attacks have +1 to hit rolls.",
          restrictions: '',
        },
        {
          name: 'Aggression Protocols',
          sublabel: "Amonhotekh's Guard – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor:
            'Responding to their Overlord’s command protocols, these warriors disengage from the fight, only to begin the assault anew on more favourable grounds.',
          when: "Your Movement phase, when a friendly Amonhotekh's Guard unit (excluding Monster/Vehicle units) is selected to make a fall-back move.",
          target: "That Amonhotekh's Guard unit.",
          effect: 'That move does not prevent your unit from being eligible to shoot/declare a charge.',
          restrictions: '',
        },
        {
          name: 'Reinforced Resilience',
          sublabel: "Amonhotekh's Guard – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor:
            'Overlord Amonhotekh rarely spends his warriors freely, even going so far as to order them into cover, increasing their resilience.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Amonhotekh's Guard unit (excluding Monster/Vehicle units) with every model within a terrain area.",
          target: "That Amonhotekh's Guard unit.",
          effect: 'Your unit has +1 Sv.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Metalline Might',
          isDefault: false,
          flavor:
            'Enhanced and upgraded by the very finest Cryptek artisans, Amonhotekh’s living metal form grants him overwhelming strength.',
          body: "Amonhotekh's Guard Overlord model only. This model's melee attacks have +2 S.",
        },
        {
          name: 'Unblemished Legions',
          isDefault: true,
          upgrade: true,
          flavor:
            'Amonhotekh’s Necron Warriors are among the finest in the galaxy, unblemished and without degradation, despite the passage of countless millennia.',
          body: `Upgrade: Amonhotekh's Guard Necron Warriors unit only.
▪ This unit has +1 M.
▪ This unit's ranged attacks have [ASSAULT].`,
        },
      ],

      datasheets: [
        {
          id: 'amonhotekhs-guard-necron-warriors',
          name: "Amonhotekh's Guard Necron Warriors",
          profiles: [
            { name: "Amonhotekh's Guard Necron Warriors", m: '5"', t: '4', sv: '4+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Gauss Flayer', tags: ['LETHAL HITS', 'RAPID FIRE 1'], range: '24"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Gauss Reaper', tags: ['LETHAL HITS'], range: '12"', a: '2', bs: '4+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Combat Attachments', tags: [], a: '1', ws: '4+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Reanimation Protocols',
          abilities: [
            {
              name: 'Their Number is Legion',
              text: "When this unit's Reanimation Protocols activate, it can re-roll the dice to determine the number of wounds reanimated.",
            },
          ],
          composition: [
            '5 Necron Warrior with Gauss Flayer and Combat Attachments models',
            '5 Necron Warrior with Gauss Reaper and Combat Attachments models',
          ],
          loadout: `**Every Necron Warrior with Gauss Flayer and Combat Attachments is equipped with:** Combat Attachments; Gauss Flayer.
**Every Necron Warrior with Gauss Reaper and Combat Attachments is equipped with:** Combat Attachments; Gauss Reaper.`,
          keywords: ["Amonhotekh's Guard", 'Battleline', 'Infantry'],
          factionKeywords: ['Necrons'],
          baseSize: '32mm',
        },
        {
          id: 'amonhotekhs-guard-skorpekh-destroyers',
          name: "Amonhotekh's Guard Skorpekh Destroyers",
          profiles: [
            { name: "Amonhotekh's Guard Skorpekh Destroyers", m: '8"', t: '6', sv: '3+', w: '3', ld: '7+', oc: '2' },
          ],
          melee: [
            { name: 'Hyperphase Blades', tags: [], a: '4', ws: '3+', s: '7', ap: '-2', d: '2' },
          ],
          faction: 'Reanimation Protocols',
          abilities: [
            {
              name: 'Plasmacyte (Once per battle per unit)',
              text: "When this unit is selected to fight, you can use this ability. If you do, this unit's attacks have [DEVASTATING WOUNDS].",
            },
            {
              name: 'Whirling Onslaught',
              text: "This unit's melee attacks can re-roll hit rolls of 1. If this unit made a charge move this turn, this unit's melee attacks can re-roll hit rolls.",
            },
          ],
          composition: [
            '1 Skorpekh Destroyer with Plasmacyte model',
            '2 Skorpekh Destroyer models',
          ],
          loadout: `**The Skorpekh Destroyer with Plasmacyte is equipped with:** Hyperphase Blades; Plasmacyte.
**Every Skorpekh Destroyer is equipped with:** Hyperphase Blades.`,
          keywords: ["Amonhotekh's Guard", 'Destroyer Cult', 'Infantry'],
          factionKeywords: ['Necrons'],
          baseSize: '50mm',
        },
        {
          id: 'amonhotekhs-guard-canoptek-doomstalker',
          name: "Amonhotekh's Guard Canoptek Doomstalker",
          profiles: [
            { name: "Amonhotekh's Guard Canoptek Doomstalker", m: '8"', t: '8', sv: '3+', w: '12', ld: '8+', oc: '4', inv: '4+' },
          ],
          ranged: [
            { name: 'Doomsday Blaster', tags: ['BLAST 1', 'HEAVY'], range: '48"', a: 'D6+1', bs: '4+', s: '14', ap: '-3', d: '3' },
            { name: 'Twin Gauss Flayer', tags: ['LETHAL HITS', 'RAPID FIRE 1', 'TWIN-LINKED'], range: '24"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Doomstalker Limbs', tags: [], a: '3', ws: '4+', s: '6', ap: '0', d: '1' },
          ],
          damaged: {
            note: '1-4 wounds remaining',
            text: 'While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.',
          },
          composition: ['1 Canoptek Doomstalker model'],
          loadout: '**This model is equipped with:** Doomsday Blaster; Doomstalker Limbs; Twin Gauss Flayer.',
          keywords: ["Amonhotekh's Guard", 'Canoptek', 'Canoptek Doomstalker', 'Vehicle', 'Walker'],
          factionKeywords: ['Necrons'],
          baseSize: '90mm',
        },
        {
          id: 'overlord-amonhotekh',
          name: 'Overlord Amonhotekh',
          profiles: [
            { name: 'Overlord Amonhotekh', m: '5"', t: '5', sv: '2+', w: '6', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Tachyon Arrow', tags: ['ONE SHOT'], range: '72"', a: '1', bs: '2+', s: '16', ap: '-5', d: 'D6+2' },
          ],
          melee: [
            { name: "Overlord's Blade", tags: ['DEVASTATING WOUNDS'], a: '4', ws: '2+', s: '8', ap: '-3', d: '2' },
          ],
          faction: 'Reanimation Protocols',
          abilities: [
            {
              name: 'Iron Will',
              text: 'In the Fight phase, when this model is destroyed, if this unit has not been selected to fight this phase, roll one D6: on a 2+, do not remove this model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield.',
            },
          ],
          composition: ['1 Overlord Amonhotekh'],
          loadout: "**This model is equipped with:** Overlord's Blade; Tachyon Arrow.",
          keywords: ["Amonhotekh's Guard", 'Character', 'Infantry', 'Noble', 'Overlord'],
          factionKeywords: ['Necrons'],
          // appdata leaves this box's baseSize null; same physical model as the standard
          // Overlord datasheet (src/data/datasheets/necrons.js), which lists 40mm.
          baseSize: '40mm',
        },
        {
          id: 'amonhotekhs-guard-canoptek-scarab-swarms',
          name: "Amonhotekh's Guard Canoptek Scarab Swarms",
          profiles: [
            { name: "Amonhotekh's Guard Canoptek Scarab Swarms", m: '10"', t: '2', sv: '6+', w: '4', ld: '8+', oc: '0' },
          ],
          melee: [
            { name: 'Feeder Mandibles', tags: ['LETHAL HITS'], a: '6', ws: '5+', s: '2', ap: '0', d: '1' },
          ],
          faction: 'Reanimation Protocols',
          abilities: [
            {
              name: 'Scarab Interference',
              text: "While an enemy unit is engaged with this unit, that enemy unit's attacks have -1 to hit rolls.",
            },
          ],
          composition: ['3 Canoptek Scarab Swarm models'],
          loadout: '**Every model is equipped with:** Feeder Mandibles.',
          keywords: ["Amonhotekh's Guard", 'Canoptek', 'Fly', 'Swarm'],
          factionKeywords: ['Necrons'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'space-marines',
      name: 'Space Marines',
      boxName: 'Assault Force',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Indomitable Resolve',
        flavor:
          'Space Marines are utterly relentless in pursuit and defence of their objectives, demonstrating a fortitude beyond the capacity of mere mortals.',
        body: 'Friendly Assault Force units have +1 OC.',
      },

      // CP-exclusive: appdata links this to the box's own publication, distinct from the
      // normal Codex's "Oath of Moment" armyRule (space-marines.js) — the box simply prints
      // a different, simpler ability instead, not a reworded copy of the same one.
      armyRule: {
        name: 'Combat Doctrines',
        body: `In your Command phase, you can select one of the Combat Doctrine abilities below. Friendly Adeptus Astartes units have the selected Combat Doctrine ability until the start of your next Command phase.

**Assault Doctrine:** This unit can declare a charge in a turn in which it made an advance move.

**Devastator Doctrine:** This unit can shoot in a turn in which it made an advance move.

**Tactical Doctrine:** This unit can shoot and declare a charge in a turn in which it made a fall-back move.

Each Combat Doctrine cannot be selected more than once per battle.`,
      },

      stratagems: [
        {
          name: 'Relentless Aggression',
          sublabel: 'Assault Force – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Press forwards, maintain the initiative and keep the enemy firmly on the back foot.',
          when: 'Fight phase, when a friendly Assault Force unit is selected to make a consolidation move.',
          target: 'That Assault Force unit.',
          effect: 'When making that consolidation move, your unit can move up to 6".',
          restrictions: '',
        },
        {
          name: 'Terrifying Charge',
          sublabel: 'Assault Force – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor:
            'The bone-shattering impact of a Space Marine charge is a terrifying thing to experience. In the face of such an onslaught, all but the bravest foes may waver.',
          when: 'Your Charge phase, when a friendly Assault Force unit ends a charge move.',
          target: 'That Assault Force unit.',
          effect: 'Select one enemy unit engaged with your unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.',
          restrictions: '',
        },
        {
          name: 'Decapitating Strike',
          sublabel: 'Assault Force – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The surest method to break the foe is to cut down their leader. Remove the head of the snake, and the body will surely die.',
          when: 'Fight phase, when a friendly Assault Force unit is selected to fight.',
          target: 'That Assault Force unit.',
          effect: "Your unit's melee attacks have [PRECISION].",
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Battle-line Veterans',
          isDefault: false,
          upgrade: true,
          flavor: 'These warriors have served in their Chapter for decades and demonstrate a true mastery of bolter drill and marksmanship.',
          body: "Upgrade: Assault Force Intercessor Squad unit only. This unit's bolt rifle weapons have [RAPID FIRE 1].",
        },
        {
          name: 'Blade Masters',
          isDefault: true,
          upgrade: true,
          flavor:
            'Veterans of the First Company, these battle-brothers wield blade and shield with equal prowess, forming a wall of steel that few onrushing foes can penetrate.',
          body: "Upgrade: Assault Force Vanguard Veteran Squad With Jump Packs unit only. When an enemy unit ends a charge move, if that enemy unit is engaged with this unit, that unit's melee attacks have -1 to wound rolls until the end of the turn.",
        },
      ],

      datasheets: [
        {
          id: 'assault-force-intercessor-squad',
          name: 'Assault Force Intercessor Squad',
          profiles: [
            { name: 'Assault Force Intercessor Squad', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '3' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Bolt Rifle', tags: ['ASSAULT', 'HEAVY'], range: '24"', a: '2', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Grenade Launcher – Frag', tags: ['BLAST 1'], range: '24"', a: '2', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Grenade Launcher – Krak', tags: ['ANTI-MONSTER/VEHICLE 4+'], range: '24"', a: '2', bs: '3+', s: '5', ap: '-2', d: '3' },
          ],
          melee: [
            { name: 'Chainsword', tags: [], a: '5', ws: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Knives and Fists', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          abilities: [
            {
              name: 'Stalwart Defenders',
              text: 'When an enemy unit targets this unit, if every model in this unit is within range of an objective, attacks that target this unit have -1 AP.',
            },
          ],
          composition: [
            '1 Intercessor Sergeant model',
            '1 Intercessor with Grenade Launcher model',
            '3 Intercessor models',
          ],
          loadout: `**The Intercessor Sergeant is equipped with:** Bolt Pistol; Bolt Rifle; Chainsword; Knives and Fists.
**The Intercessor with Grenade Launcher is equipped with:** Bolt Pistol; Bolt Rifle; Grenade Launcher; Knives and Fists.
**Every Intercessor is equipped with:** Bolt Pistol; Bolt Rifle; Knives and Fists.`,
          keywords: ['Assault Force', 'Battleline', 'Explosives', 'Imperium', 'Infantry', 'Tacticus'],
          factionKeywords: ['Adeptus Astartes'],
          baseSize: '32mm',
        },
        {
          id: 'assault-force-captain',
          name: 'Assault Force Captain',
          profiles: [
            { name: 'Assault Force Captain', m: '6"', t: '4', sv: '3+', w: '6', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '2+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Master-crafted Power Weapon', tags: [], a: '6', ws: '2+', s: '5', ap: '-2', d: '2' },
          ],
          abilities: [
            { name: 'Relic Shield', text: 'This model has +1 W (included in profile).' },
            {
              name: 'Master of War',
              text: "At the end of your opponent's Charge phase, if this unit is unengaged and within 6\" of one or more enemy units, you can use this ability. If you do, resolve a charge with it. When making the charge roll, if the result is greater than 6 (after modifiers), change it to 6.",
            },
          ],
          composition: ['1 Captain model'],
          loadout: '**This model is equipped with:** Heavy Bolt Pistol; Master-crafted Power Weapon; Relic Shield.',
          keywords: ['Assault Force', 'Character', 'Explosives', 'Imperium', 'Infantry', 'Tacticus'],
          factionKeywords: ['Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'assault-force-vanguard-veteran-squad-with-jump-packs',
          name: 'Assault Force Vanguard Veteran Squad With Jump Packs',
          profiles: [
            { name: 'Assault Force Vanguard Veteran Squad With Jump Packs', m: '12"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Master-crafted Power Weapon', tags: [], a: '3', ws: '3+', s: '5', ap: '-2', d: '2' },
          ],
          abilities: [
            {
              name: 'Rapid Reactions (Once per turn per unit)',
              text: "In your opponent's Shooting phase, when an enemy unit has shot, if that unit targeted this unit, this unit can make a normal move of up to D6+1\".",
            },
          ],
          composition: [
            '1 Vanguard Veteran Sergeant model',
            '1 Vanguard Veteran with Plasma Pistol model',
            '3 Vanguard Veteran models',
          ],
          loadout: `**The Vanguard Veteran Sergeant is equipped with:** Heavy Bolt Pistol; Master-crafted Power Weapon.
**The Vanguard Veteran with Plasma Pistol is equipped with:** Master-crafted Power Weapon; Plasma Pistol.
**Every Vanguard Veteran is equipped with:** Heavy Bolt Pistol; Master-crafted Power Weapon.`,
          keywords: ['Assault Force', 'Explosives', 'Fly', 'Imperium', 'Infantry', 'Jump Pack', 'Vanguard Veteran Squad'],
          factionKeywords: ['Adeptus Astartes'],
          baseSize: '32mm',
        },
        {
          id: 'assault-force-librarian',
          name: 'Assault Force Librarian',
          profiles: [
            { name: 'Assault Force Librarian', m: '6"', t: '4', sv: '3+', w: '4', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Fulmination – Electropulse', tags: ['PSYCHIC'], range: '24"', a: '2', bs: '3+', s: '8', ap: '-2', d: '3' },
            { name: 'Fulmination – Electrosurge', tags: ['BLAST 2', 'PSYCHIC'], range: '24"', a: '3', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Force Weapon', tags: ['PSYCHIC'], a: '4', ws: '3+', s: '6', ap: '-1', d: '2' },
          ],
          abilities: [
            {
              name: 'Empyric Insight',
              text: "This unit's ranged attacks can ignore modifiers to:\n▪ BS.\n▪ Hit rolls and wound rolls.",
            },
          ],
          composition: ['1 Librarian model'],
          loadout: '**This model is equipped with:** Bolt Pistol; Force Weapon; Fulmination.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Assault Force Intercessor Squad'],
          },
          keywords: ['Assault Force', 'Character', 'Explosives', 'Imperium', 'Infantry', 'Psyker', 'Tacticus'],
          factionKeywords: ['Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'assault-force-land-speeder',
          name: 'Assault Force Land Speeder',
          profiles: [
            { name: 'Assault Force Land Speeder', m: '14"', t: '8', sv: '3+', w: '9', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Multi-melta', tags: ['MELTA 2'], range: '18"', a: '2', bs: '3+', s: '10', ap: '-4', d: 'D6' },
            { name: 'Onslaught Gatling Cannon', tags: ['SUSTAINED HITS 1'], range: '24"', a: '8', bs: '3+', s: '5', ap: '0', d: '1' },
            { name: 'Stormfury Missile Launcher', tags: [], range: '48"', a: '1', bs: '3+', s: '10', ap: '-3', d: '4' },
          ],
          melee: [
            { name: 'Armoured Impact', tags: [], a: '4', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          composition: ['1 Land Speeder model'],
          loadout: '**This model is equipped with:** Armoured Impact; Multi-melta; Onslaught Gatling Cannon; Stormfury Missile Launcher.',
          keywords: ['Assault Force', 'Fly', 'Imperium', 'Vehicle'],
          factionKeywords: ['Adeptus Astartes'],
          baseSize: '105x70mm Oval Base',
        },
      ],
    },

    {
      slug: 'orks',
      name: 'Orks',
      boxName: "'Ardmob",
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: "'Ard As Nails",
        flavor:
          'Orks are tough, battle-scarred beasts who cheerfully shrug off injuries that would kill most creatures. When suffused by the power of the Waaagh!, their resilience is magnified to unimaginable heights.',
        body: "Attacks that target a friendly 'Ardmob unit with the Waaagh! active with a S greater than that friendly unit's T have -1 to wound rolls.",
      },

      armyRule: {
        name: 'Waaagh!',
        body: `You can re-roll advance rolls made for friendly Orks units.

Once per battle, at the start of the Command phase, you can call a Waaagh!. If you do, until the end of the next turn, the Waaagh! is called for friendly Orks units. While a Waaagh! is called for a unit, it can shoot and declare a charge in a turn in which it made an advance move.`,
      },

      stratagems: [
        {
          name: "Krump 'Em",
          sublabel: "'Ardmob – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'The Orks hurl themselves into the fight, swinging massive, haymaker blows and delivering thunderous headbutts.',
          when: "Fight phase, when a friendly 'Ardmob unit is selected to fight.",
          target: "That 'Ardmob unit.",
          effect: "Your unit's melee attacks have +1 S.",
          restrictions: '',
        },
        {
          name: 'Medi-Squigs',
          sublabel: "'Ardmob – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The Orks have brought a sack of Medi-Squigs along and now pass out the weird little creatures to take full advantage of their bizarre healing properties.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly 'Ardmob unit.",
          target: "That 'Ardmob unit.",
          effect: 'Your unit has 5+ InSv.',
          restrictions: '',
        },
        {
          name: 'Get Stuck In',
          sublabel: "'Ardmob – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Far from being driven off by incoming enemy fire, the surviving Orks are instead driven to greater efforts in their desire to clobber the enemy close-up.',
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly unengaged 'Ardmob unit has shot.",
          target: "That 'Ardmob unit.",
          effect: 'Your unit can make a surge move of up to D6+1".',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Rallying War Cry',
          isDefault: true,
          flavor: 'Drawn to battle by their Warboss’ deafening roars, a fresh wave of lads joins the fight.',
          body: "'Ardmob Warboss model only. (Once per battle, per unit) In your Command phase, you can use this ability. If you do, return up to D3+2 destroyed bodyguard models to this unit.",
        },
        {
          name: 'Extra Platin’',
          isDefault: false,
          upgrade: true,
          flavor: 'The crew have nailed additional plates of scrap iron and looted tank armour to the hull of their Wartrakk to make it tougher.',
          body: `Upgrade: 'Ardmob Wartrakk unit only. This unit has:
▪ 3+ Sv.
▪ 4+ InSv.`,
        },
      ],

      datasheets: [
        {
          id: 'ardmob-warboss',
          name: "'Ardmob Warboss",
          profiles: [
            { name: "'Ardmob Warboss", m: '6"', t: '5', sv: '4+', w: '6', ld: '6+', oc: '1', inv: '5+' },
          ],
          ranged: [
            { name: 'Kustom Shoota', tags: ['RAPID FIRE 2'], range: '18"', a: '4', bs: '5+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Kustom Choppa', tags: ['CLEAVE 1'], a: '6', ws: '2+', s: '8', ap: '-2', d: '2' },
          ],
          faction: 'Waaagh!',
          abilities: [
            {
              name: "Smash 'Em Up",
              text: "In the Fight phase, when this unit is selected to fight, this unit's melee attacks have:\n▪ [LETHAL HITS].\n▪ Or: [SUSTAINED HITS 1].",
            },
          ],
          composition: ['1 Warboss model'],
          loadout: '**This model is equipped with:** Kustom Choppa; Kustom Shoota.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ["'Ardmob Boyz"],
          },
          keywords: ["'Ardmob", 'Character', 'Explosives', 'Infantry'],
          factionKeywords: ['Orks'],
          baseSize: '50mm',
        },
        {
          id: 'ardmob-weirdboy',
          name: "'Ardmob Weirdboy",
          profiles: [
            { name: "'Ardmob Weirdboy", m: '6"', t: '5', sv: '5+', w: '4', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Psychic Powers – Da Stomp', tags: ['BLAST 1', 'PSYCHIC'], range: '24"', a: 'D6+2', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: "Psychic Powers – 'Eadbanger", tags: ['PRECISION', 'PSYCHIC'], range: '24"', a: '1', bs: '4+', s: '8', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Waaagh! Staff – Bash', tags: ['PSYCHIC'], a: '3', ws: '3+', s: '8', ap: '-1', d: '2' },
            { name: 'Waaagh! Staff – Clobber', tags: ['DEVASTATING WOUNDS', 'HAZARDOUS', 'PSYCHIC'], a: '4', ws: '3+', s: '8', ap: '-2', d: '2' },
          ],
          faction: 'Waaagh!',
          abilities: [
            {
              name: 'Totem of Mork (Psychic)',
              text: 'At the end of your Command phase, if this unit is controlling an objective, that objective is secured.',
            },
          ],
          composition: ["1 'Ardmob Weirdboy model"],
          loadout: "**This model is equipped with:** Psychic Powers; Waaagh! Staff.",
          leader: {
            text: 'This model can be attached to the following units:',
            units: ["'Ardmob Boyz"],
          },
          keywords: ["'Ardmob", 'Character', 'Infantry', 'Psyker'],
          factionKeywords: ['Orks'],
          baseSize: '50mm',
        },
        {
          id: 'ardmob-wartrakk',
          name: "'Ardmob Wartrakk",
          profiles: [
            { name: "'Ardmob Wartrakk", m: '12"', t: '6', sv: '4+', w: '7', ld: '7+', oc: '3', inv: '6+' },
          ],
          ranged: [
            { name: 'Kustom Shoota', tags: ['RAPID FIRE 2'], range: '18"', a: '4', bs: '5+', s: '4', ap: '0', d: '1' },
            { name: 'Rokkit Launcha', tags: [], range: '24"', a: 'D3+3', bs: '5+', s: '10', ap: '-2', d: '3' },
          ],
          melee: [
            { name: 'Choppas', tags: [], a: '6', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: 'Waaagh!',
          abilities: [
            {
              name: 'Indiscriminate Detonations',
              text: 'In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. That unit is suppressed until the start of your next turn:\n▪ While a unit is suppressed, that unit’s attacks have -1 to hit rolls.',
            },
          ],
          composition: ['1 Wartrakk model'],
          loadout: '**This model is equipped with:** Choppas; Kustom Shoota; Rokkit Launcha.',
          keywords: ["'Ardmob", 'Mounted', 'Speed Freeks'],
          factionKeywords: ['Orks'],
          baseSize: '105x70mm Oval Base',
        },
        {
          id: 'ardmob-boyz',
          name: "'Ardmob Boyz",
          profiles: [
            { name: 'Boss Nob', m: '6"', t: '5', sv: '5+', w: '2', ld: '7+', oc: '2' },
            { name: 'Boyz', m: '6"', t: '5', sv: '5+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Kombi-rokkit', tags: [], range: '24"', a: '1', bs: '5+', s: '10', ap: '-2', d: '3' },
            { name: 'Kombi-shoota', tags: [], range: '24"', a: '2', bs: '5+', s: '4', ap: '0', d: '1' },
            { name: 'Kustom Shoota', tags: ['RAPID FIRE 2'], range: '18"', a: '4', bs: '5+', s: '4', ap: '0', d: '1' },
            { name: 'Shoota', tags: ['RAPID FIRE 1'], range: '18"', a: '2', bs: '5+', s: '4', ap: '0', d: '1' },
            { name: 'Slugga', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '5+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Big Choppa', tags: [], a: '3', ws: '3+', s: '5', ap: '-1', d: '2' },
            { name: 'Choppa', tags: [], a: '1', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: 'Waaagh!',
          abilities: [
            { name: 'Grab Dat Scrap', text: 'While this unit is engaged, this unit has +1 OC.' },
          ],
          composition: ['1 Boss Nob model', '9 Boyz models'],
          loadout: `**The Boss Nob is equipped with:** Big Choppa; Kombi-rokkit; Kombi-shoota; Slugga.
**Every Boyz is equipped with:** Choppa; Shoota; Slugga.`,
          options: ["The Boss Nob's kombi-rokkit and kombi-shoota can be replaced with 1 kustom shoota."],
          keywords: ["'Ardmob", 'Explosives', 'Infantry', 'Mob'],
          factionKeywords: ['Orks'],
          baseSize: '32mm, 40mm',
        },
        {
          id: 'ardmob-gretchin',
          name: "'Ardmob Gretchin",
          profiles: [
            { name: "'Ardmob Gretchin", m: '6"', t: '2', sv: '7+', w: '1', ld: '8+', oc: '1' },
          ],
          ranged: [
            { name: 'Blasta', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
            { name: "Lobbin' Bombs", tags: ['HAZARDOUS'], range: '6"', a: '1', bs: '4+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Scavenged Shivs', tags: [], a: '1', ws: '5+', s: '2', ap: '0', d: '1' },
          ],
          faction: 'Waaagh!',
          abilities: [
            {
              name: 'Grot Infestation (Once per battle per unit)',
              text: 'When this unit is destroyed, you can use this ability. If you do:\n▪ Place this unit in strategic reserves with all of this unit\'s destroyed models returned to it. This unit is no longer destroyed.\n▪ This unit has Deep Strike.',
            },
          ],
          composition: ['10 Gretchin models'],
          loadout: "**Every model is equipped with:** Blasta; Lobbin' Bombs; Scavenged Shivs.",
          keywords: ["'Ardmob", 'Grots', 'Infantry'],
          factionKeywords: ['Orks'],
          baseSize: '25mm',
        },
      ],
    },

    {
      slug: 'tau-empire',
      name: "T'au Empire",
      boxName: 'Sudden Dawn Cadre',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Co-ordinated Eradication',
        flavor: 'Combining their fire, the Sudden Dawn Cadre prioritise the elimination of a single target before moving on to the next.',
        body: "(Once per battle, per army) When a friendly Sudden Dawn Cadre unit is selected to shoot, you can use this ability. If you do, select one enemy unit. Friendly Sudden Dawn Cadre units' attacks that target that enemy unit have +1 AP until the end of the battle.",
      },

      // The box links TWO separate CP-only army-rule rows (Drones + For the Greater Good) —
      // combined into one armyRule with a `###` subheading, same convention titan-legions.js
      // uses for a faction whose appdata prints more Army Rule cards than wh11ed's one-armyRule
      // data shape allows.
      armyRule: {
        name: 'Drones',
        body: `If you have upgraded a model to have a drone, place a Drone token next to your model as a reminder. These do not count as models for any rules purposes.

### Shield Drone
Add 1 to the bearer's Wounds characteristic.

### For the Greater Good
If your Army Faction is T'au Empire, at the start of your Shooting phase you can select units from your army with this ability to become Observer units.

During your Shooting phase, for each Observer unit from your army that has not been selected to shoot this phase and is eligible to shoot (excluding Fortification and Battle-shocked units), select one enemy unit that is visible to be marked as their Spotted unit until the end of the phase. Each enemy unit can only be marked as a Spotted unit once per phase.

Units from your army with the For the Greater Good ability (excluding Observer units) are Guided units while targeting one or more Spotted units.

Until the end of the phase, each time a model from your army in a Guided unit makes an attack that targets a Spotted unit, improve the Ballistic Skill characteristic of that attack by 1 and, if the Spotted unit was marked by an Observer unit that has the Markerlight keyword, that attack has the [IGNORES COVER] ability.`,
      },

      stratagems: [
        {
          name: 'Suppressing Fire',
          sublabel: 'Sudden Dawn Cadre – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "Targeting enemy positions with rapid-fire volleys, T'au Fire Warriors hold the enemy back, buying themselves time to reposition.",
          when: 'Your Shooting phase, when a friendly Sudden Dawn Cadre Infantry unit has shot.',
          target: 'That Sudden Dawn Cadre Infantry unit.',
          effect: 'Select one enemy unit hit by those attacks. That enemy unit is pinned until the start of your next Command phase:\n▪ While a unit is pinned, that unit has -2" M.',
          restrictions: '',
        },
        {
          name: 'Rapid Acquisition',
          sublabel: 'Sudden Dawn Cadre – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Having staked their claim upon contested ground, the Sudden Dawn Cadre rarely stop to hold it, prioritising the destruction of the enemy.',
          when: 'End of your Movement phase.',
          target: 'One friendly Sudden Dawn Cadre unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Swift Embarkation',
          sublabel: 'Sudden Dawn Cadre – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: "Well-drilled in mechanised combat, T'au warriors mount their transports in swift and ordered fashion: long before the enemy can take advantage of their vulnerability.",
          when: "End of your opponent's Fight phase.",
          target: 'One friendly unengaged Sudden Dawn Cadre Infantry unit that was eligible to fight this phase, is wholly within 6" of a friendly Sudden Dawn Cadre Transport unit, and is eligible to embark within that Transport unit.',
          effect: 'Your unit embarks within that Transport unit.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Earth Caste Modifications',
          isDefault: false,
          flavor: 'Enhanced by the artifice of the Earth caste, this Enforcer Battlesuit features enhanced telemetry fire rates, allowing for the effective suppression of enemies and accurate insertion from low orbit.',
          body: `Sudden Dawn Cadre Commander in Enforcer Battlesuit model only.
▪ When this unit has shot, you can select one enemy unit hit by those attacks. That enemy unit is suppressed until the start of your next turn: while a unit is suppressed, that unit's attacks have -1 to hit rolls.
▪ When this unit makes an ingress move, it can be set up more than 6" horizontally from all enemy units (instead of more than 8"). If this unit does, is not eligible to declare a charge until the end of the turn.`,
        },
        {
          name: 'Proximity Scanners',
          isDefault: true,
          upgrade: true,
          flavor: 'Fitted with hypersensitive scanning devices, this vehicle feeds targeting data to its passengers, allowing them to rapidly bring their pulse weapons to bear and lay down withering fields of fire from the moment of debarkation.',
          body: "Upgrade: Sudden Dawn Cadre Devilfish unit only. When a friendly unit embarked within this unit disembarks, that friendly unit's pulse blaster and pulse carbine weapons have +1 A.",
        },
      ],

      datasheets: [
        {
          id: 'sudden-dawn-cadre-pathfinder-team',
          name: 'Sudden Dawn Cadre Pathfinder Team',
          profiles: [
            { name: 'Sudden Dawn Cadre Pathfinder Team', m: '7"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Pulse Carbine', tags: [], range: '20"', a: '2', bs: '4+', s: '5', ap: '0', d: '1' },
            { name: 'Pulse Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '5', ap: '0', d: '1' },
            { name: 'Rail Rifle', tags: ['DEVASTATING WOUNDS', 'HEAVY'], range: '30"', a: '1', bs: '5+', s: '10', ap: '-4', d: '3' },
          ],
          melee: [
            { name: 'Gun Stocks', tags: [], a: '1', ws: '5+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Drones',
          abilities: [
            { name: 'Grav-inhibitor Drone', text: 'When an enemy unit selects this unit as a charge target, that charge roll has -2.' },
            { name: 'Target Uploaded', text: "This unit's attacks that target its Spotted unit have:\n▪ +1 BS.\n▪ [IGNORES COVER]." },
          ],
          composition: [
            "1 Pathfinder Shas'ui model",
            '3 Pathfinder with Pulse Pistol, Rail Rifle and Close Combat Weapon models',
            '6 Pathfinder with Pulse Carbine, Pulse Pistol and Close Combat Weapon models',
          ],
          loadout: `**The Pathfinder Shas'ui is equipped with:** Gun Stocks; Pulse Carbine; Pulse Pistol.
**Every Pathfinder with Pulse Pistol, Rail Rifle and Close Combat Weapon is equipped with:** Gun Stocks; Pulse Pistol; Rail Rifle.
**Every Pathfinder with Pulse Carbine, Pulse Pistol and Close Combat Weapon is equipped with:** Gun Stocks; Pulse Carbine; Pulse Pistol.`,
          keywords: ['Explosives', 'Infantry', 'Markerlight', 'Sudden Dawn Cadre'],
          factionKeywords: ["T'au Empire"],
          baseSize: '25mm',
        },
        {
          id: 'sudden-dawn-cadre-breacher-team',
          name: 'Sudden Dawn Cadre Breacher Team',
          profiles: [
            { name: 'Sudden Dawn Cadre Breacher Team', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Pulse Blaster', tags: ['ASSAULT'], range: '10"', a: '2', bs: '3+', s: '6', ap: '-1', d: '1' },
            { name: 'Pulse Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Gun Stocks', tags: [], a: '1', ws: '5+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Drones',
          abilities: [
            { name: 'Breach and Clear', text: "This unit's ranged attacks that target a unit within range of an objective can re-roll wound rolls." },
          ],
          composition: ["1 Sha'sui model", '9 Breacher Team models'],
          loadout: '**Every model is equipped with:** Gun Stocks; Pulse Blaster; Pulse Pistol.',
          keywords: ['Battleline', 'Explosives', 'Fire Warrior', 'Infantry', 'Markerlight', 'Sudden Dawn Cadre'],
          factionKeywords: ["T'au Empire"],
          baseSize: '25mm',
        },
        {
          id: 'sudden-dawn-cadre-devilfish',
          name: 'Sudden Dawn Cadre Devilfish',
          profiles: [
            { name: 'Sudden Dawn Cadre Devilfish', m: '12"', t: '9', sv: '3+', w: '13', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Accelerator Burst Cannon', tags: [], range: '18"', a: '4', bs: '4+', s: '6', ap: '-1', d: '1' },
            { name: 'Twin Pulse Carbine', tags: ['ASSAULT', 'TWIN-LINKED'], range: '20"', a: '2', bs: '4+', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Armoured Hull', tags: [], a: '3', ws: '5+', s: '6', ap: '0', d: '1' },
          ],
          faction: 'Drones',
          abilities: [
            { name: 'Rapid Disembark', text: 'When a unit embarked within this model makes a disembark move using the rapid disembark/tactical disembark modes, the set-up distance is 6".' },
          ],
          transport: 'This model has a transport capacity of 12 Infantry models. It cannot transport Battlesuit, Kroot or Vespid Stingwings models.',
          composition: ['1 Devilfish model'],
          loadout: '**This model is equipped with:** Accelerator Burst Cannon; Armoured Hull; Twin Pulse Carbine.',
          keywords: ['Dedicated Transport', 'Fly', 'Sudden Dawn Cadre', 'Transport', 'Vehicle'],
          factionKeywords: ["T'au Empire"],
          baseSize: 'Large Flying Base',
        },
        {
          id: 'commander-cloudspear',
          name: 'Commander Cloudspear',
          profiles: [
            { name: 'Commander Cloudspear', m: '8"', t: '5', sv: '2+', w: '6', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Airbursting Fragmentation Projector', tags: ['BLAST 1', 'INDIRECT FIRE'], range: '24"', a: 'D6', bs: '3+', s: '3', ap: '0', d: '1' },
            { name: 'Plasma Rifle', tags: [], range: '18"', a: '1', bs: '3+', s: '8', ap: '-3', d: '3' },
          ],
          melee: [
            { name: 'Battlesuit Fists', tags: [], a: '3', ws: '4+', s: '5', ap: '0', d: '1' },
          ],
          faction: 'Drones',
          abilities: [
            { name: 'Shield Drone', text: 'This model has +1 W.' },
            { name: 'Superior Weapon Support System', text: 'This model\'s ranged attacks can ignore modifiers to:\n▪ BS.\n▪ Hit rolls.' },
          ],
          composition: ['1 Commander Cloudspear model'],
          loadout: '**This model is equipped with:** Airbursting Fragmentation Projector; Battlesuit Fists; Plasma Rifle.',
          keywords: ['Character', 'Commander in Enforcer Battlesuit', 'Fly', 'Sudden Dawn Cadre', 'Vehicle', 'Walker'],
          factionKeywords: ["T'au Empire"],
          baseSize: '60mm',
        },
      ],
    },

    {
      slug: 'astra-militarum',
      name: 'Astra Militarum',
      boxName: "Drayden's Lance",
      dp: 1,
      forceDisposition: 'Priority Assets',

      rule: {
        name: 'Experienced Veterans',
        flavor: 'Rigid and disciplined in the face of even the most numerous foes, Drayden’s Lance makes their every shot count.',
        body: `▪ Friendly Drayden's Lance units can re-roll rolls to determine the A of a weapon.
▪ Friendly Drayden's Lance units can re-roll rolls to determine the D of an attack.`,
      },

      armyRule: {
        name: 'Voice of Command',
        body: `If your Army Faction is Astra Militarum, Officer models with this ability can issue Orders. Each Officer's datasheet will specify how many Orders it can issue in a battle round and which units are eligible to receive those Orders. Each time an Officer model issues an Order, select one of the Orders below, then select one eligible friendly unit within 6" of that Officer model to issue it to.

Officer models can issue Orders in your Command phase and at the end of a phase in which they disembarked from a Transport or were set up on the battlefield.

Until the start of your next Command phase, the unit you selected is affected by that Order. Unless otherwise stated, a unit can only be affected by one Order at a time (any Order subsequently issued to that unit replaces the current one). Orders cannot be issued to Battle-shocked units, and if a unit being affected by an Order becomes Battle-shocked, that Order ceases to affect that unit. Only Astra Militarum models gain the benefit of an Order issued to their unit.

### The Orders
▪ **Move! Move! Move!** — Add 3" to the Move characteristic of models in this unit.
▪ **Fix Bayonets!** — Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.
▪ **Take Aim!** — Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.
▪ **First Rank, Fire! Second Rank, Fire!** — Improve the Attacks characteristic of Rapid Fire weapons equipped by models in this unit by 1.
▪ **Take Cover!** — Improve the Save characteristic of models in this unit by 1 (this cannot improve a model's Save to better than 3+).
▪ **Duty and Honour!** — Improve the Leadership and Objective Control characteristics of models in this unit by 1.`,
      },

      stratagems: [
        {
          name: 'Focus Attacks',
          sublabel: "Drayden's Lance – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Identifying a priority threat, Major Drayden directs his warriors to saturate the target’s position with scouring fire.',
          when: 'Your Command phase.',
          target: "One friendly Drayden's Lance Officer unit.",
          effect: `Select one enemy unit. Friendly Drayden's Lance units' attacks that target that enemy unit have the following until the start of your next turn:
▪ [LETHAL HITS].
▪ [IGNORES COVER], if they are ranged attacks.`,
          restrictions: '',
        },
        {
          name: 'First Wave',
          sublabel: "Drayden's Lance – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Operating as the vanguard of larger Astra Militarum forces, Drayden’s Lance secures footholds in enemy territory.',
          when: 'End of your Movement phase.',
          target: "One friendly Drayden's Lance unit.",
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Veteran Skirmishers',
          sublabel: "Drayden's Lance – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'A lightly-armed force of skirmishers, Drayden’s Lance are careful not to get bogged down in battles they cannot win.',
          when: "Your opponent's Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Drayden's Lance unit.",
          target: "That Drayden's Lance unit.",
          effect: 'Your unit can make a normal move of up to D3+1".',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Call Up the Reserves',
          isDefault: true,
          flavor: 'In the Astra Militarum, death and injury are constant companions. A steady stream of fresh-faced reserves stands ready to fill gaps in the line.',
          body: "Drayden's Lance Officer model only. (Once per battle, per unit) At the start of any phase, you can use this ability. If you do, select one friendly Drayden's Lance unit. That unit heals D3+2 wounds.",
        },
        {
          name: 'Drayden’s Drill',
          isDefault: false,
          upgrade: true,
          flavor: 'A stickler for marksmanship, Major Drayden demands that his soldiers spend long hours practising firing drills and demands perfection from all of them.',
          body: "Upgrade: Drayden's Lance Kasrkin unit only. This unit’s snap shooting attacks hit on unmodified hit rolls of 4+.",
        },
      ],

      datasheets: [
        {
          id: 'draydens-lance-attilan-rough-riders',
          name: "Drayden's Lance Attilan Rough Riders",
          profiles: [
            { name: 'Rough Rider Sergeant', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '1' },
            { name: 'Rough Rider with Hunting Lance', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '1' },
            { name: 'Rough Rider with Goad Lance', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Lasgun', tags: ['RAPID FIRE 1'], range: '24"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
            { name: 'Laspistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Hunting Lance – Frag Tip', tags: ['LANCE'], a: 'D6', ws: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Goad Lance', tags: ['LANCE'], a: '2', ws: '3+', s: '6', ap: '-2', d: '2' },
            { name: 'Power Sabre', tags: [], a: '4', ws: '3+', s: '4', ap: '-2', d: '1' },
            { name: "Steed's Hooves", tags: ['EXTRA ATTACKS'], a: '2', ws: '4+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Voice of Command',
          abilities: [
            { name: 'Horsemasters', text: 'When this unit makes a fall-back move, that move does not prevent this unit from being eligible to shoot/declare a charge.' },
          ],
          composition: [
            '1 Rough Rider Sergeant model',
            '1 Rough Rider with Goad Lance model',
            '3 Rough Rider with Hunting Lance models',
          ],
          loadout: `**The Rough Rider Sergeant is equipped with:** Hunting Lance – Frag Tip; Lasgun; Laspistol; Power Sabre; Steed's Hooves.
**The Rough Rider with Goad Lance is equipped with:** Goad Lance; Laspistol; Steed's Hooves.
**Every Rough Rider with Hunting Lance is equipped with:** Hunting Lance – Frag Tip; Lasgun; Laspistol; Steed's Hooves.`,
          keywords: ["Drayden's Lance", 'Explosives', 'Imperium', 'Mounted', 'Regiment'],
          factionKeywords: ['Astra Militarum'],
          baseSize: '60x35.5mm Oval Base',
        },
        {
          id: 'draydens-lance-command-squad',
          name: "Drayden's Lance Command Squad",
          profiles: [
            { name: 'Cadian Veteran Guardsmen with Medi-pack', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Cadian Veteran Guardsman', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Major Drayden', m: '6"', t: '3', sv: '5+', w: '3', ld: '7+', oc: '1' },
            { name: 'Cadian Veteran Guardsman with Powerfist', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Lasgun', tags: ['RAPID FIRE 1'], range: '24"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '4+', s: '8', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Gun Stocks', tags: [], a: '2', ws: '4+', s: '3', ap: '0', d: '1' },
            { name: 'Power Fist', tags: [], a: '3', ws: '4+', s: '6', ap: '-2', d: '2' },
            { name: 'Power Weapon', tags: [], a: '3', ws: '4+', s: '4', ap: '-2', d: '1' },
          ],
          faction: 'Voice of Command',
          abilities: [
            { name: 'Medi-pack', text: 'This unit has Feel No Pain 6+.' },
            { name: 'Orders', text: "This unit's Officer can issue up to 2 Orders to Drayden's Lance units." },
            { name: 'Over There', text: 'At the start of your Shooting phase, you can select one enemy unit within 24" of this unit. That enemy unit has +3" detection range.' },
            { name: 'Regimental Standard', text: 'This unit has +1 OC.' },
            { name: "Master Vox", text: "When this unit's Officer model issues an Order, it can be issued to any eligible unit within 24\"." },
          ],
          composition: [
            '1 Cadian Veteran Guardsman model',
            '1 Cadian Veteran Guardsman with Powerfist model',
            '1 Cadian Veteran Guardsmen with Medi-pack model',
            '1 Major Drayden model',
          ],
          loadout: `**The Cadian Veteran Guardsman is equipped with:** Gun Stocks; Lasgun.
**The Cadian Veteran Guardsman with Powerfist is equipped with:** Bolt Pistol; Power Fist.
**The Cadian Veteran Guardsmen with Medi-pack is equipped with:** Gun Stocks; Lasgun; Medi-pack.
**The Major Drayden is equipped with:** Plasma Pistol; Power Weapon.`,
          keywords: ['Cadian', 'Character', "Drayden's Lance", 'Explosives', 'Imperium', 'Infantry', 'Officer', 'Platoon'],
          factionKeywords: ['Astra Militarum'],
          baseSize: '28.5mm',
        },
        {
          id: 'draydens-lance-kasrkin',
          name: "Drayden's Lance Kasrkin",
          profiles: [
            { name: 'Kasrkin Sergeant', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper with Plasma Gun', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper with Melta Mine', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper with Hot-shot Marksman Rifle', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper with Grenade Launcher', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper with Hot-shot Volley Gun', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper with Flamer', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
            { name: 'Kasrkin Trooper', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Hot-shot Lasgun', tags: ['RAPID FIRE 1'], range: '24"', a: '1', bs: '3+', s: '3', ap: '-1', d: '1' },
            { name: 'Hot-shot laspistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '3', ap: '-1', d: '1' },
            { name: 'Hot-shot Marksman Rifle', tags: ['HEAVY', 'PRECISION'], range: '36"', a: '1', bs: '3+', s: '4', ap: '-2', d: '3' },
            { name: 'Hot-shot Volley Gun', tags: ['RAPID FIRE 2'], range: '30"', a: '2', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Grenade Launcher – Frag', tags: ['BLAST 1'], range: '24"', a: 'D3', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Grenade Launcher – Krak', tags: [], range: '24"', a: '1', bs: '3+', s: '9', ap: '-2', d: 'D3' },
            { name: 'Plasma Gun – Standard', tags: ['RAPID FIRE 1'], range: '24"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Gun – Supercharge', tags: ['HAZARDOUS', 'RAPID FIRE 1'], range: '24"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Flamer', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '4', ap: '0', d: '1' },
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Gun Stocks', tags: [], a: '2', ws: '4+', s: '3', ap: '0', d: '1' },
            { name: 'Chainsword', tags: [], a: '4', ws: '4+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Voice of Command',
          abilities: [
            { name: 'Warrior Elite (Once per battle round, per unit)', text: 'At the start of any phase, you can use this ability. If you do, select one Order. That Order affects this unit, in addition to any other Orders issued to this unit, until the start of your next Command phase.' },
            {
              name: 'Melta Mine (Once per battle, per unit)',
              text: 'At the start of any phase, you can use this ability. If you do, select one enemy unit within 3" of this model and roll one D6. On a 2+:\n▪ That enemy unit suffers D3 mortal wounds.\n▪ Or: If that enemy unit has Vehicle, that enemy unit suffers 2D3 mortal wounds.',
            },
            {
              name: 'Vox-caster',
              text: 'When you target this unit with a stratagem, roll one D6, with +1 to the result if a friendly Officer model is within 6" of this unit:\n▪ On a 5+, you gain 1 CP.',
            },
          ],
          composition: [
            '1 Kasrkin Sergeant model',
            '1 Kasrkin Trooper with Flamer model',
            '1 Kasrkin Trooper with Grenade Launcher model',
            '1 Kasrkin Trooper with Hot-shot Marksman Rifle model',
            '1 Kasrkin Trooper with Hot-shot Volley Gun model',
            '1 Kasrkin Trooper with Melta Mine model',
            '1 Kasrkin Trooper with Plasma Gun model',
            '3 Kasrkin Trooper models',
          ],
          loadout: `**The Kasrkin Sergeant is equipped with:** Chainsword; Plasma Pistol.
**The Kasrkin Trooper with Flamer is equipped with:** Flamer; Gun Stocks.
**The Kasrkin Trooper with Grenade Launcher is equipped with:** Grenade Launcher; Gun Stocks.
**The Kasrkin Trooper with Hot-shot Marksman Rifle is equipped with:** Gun Stocks; Hot-shot Marksman Rifle.
**The Kasrkin Trooper with Hot-shot Volley Gun is equipped with:** Gun Stocks; Hot-shot Volley Gun.
**The Kasrkin Trooper with Melta Mine is equipped with:** Gun Stocks; Hot-shot laspistol; Melta Mine (Once per battle, per unit).
**The Kasrkin Trooper with Plasma Gun is equipped with:** Gun Stocks; Plasma Gun.
**Every Kasrkin Trooper is equipped with:** Gun Stocks; Hot-shot Lasgun.`,
          keywords: ["Drayden's Lance", 'Explosives', 'Imperium', 'Infantry', 'Regiment'],
          factionKeywords: ['Astra Militarum'],
          baseSize: '28.5mm',
        },
      ],
    },

    {
      slug: 'adepta-sororitas',
      name: 'Adepta Sororitas',
      boxName: 'Sanctuary Guardians',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Blessed Believers',
        flavor: 'The faith of the Adepta Sororitas burns brightest in battle. The God-Emperor, they believe, protects the zealous and guides the hands of the righteous.',
        body: `▪ Melee attacks that target friendly Sanctuary Guardians units have -1 to hit rolls.
▪ When playing a Combat Patrol battle, in your Command phase, you can discard 1 Miracle dice. If you do, you gain 1 CP.`,
      },

      // Verbatim from the Codex armyRule (src/data/factions/adepta-sororitas.js) — unchanged
      // between the CP box and the Codex.
      armyRule: {
        name: 'Acts of Faith',
        body: `If your Army Faction is Adepta Sororitas, each unit from your army with this ability can perform one Act of Faith per phase. This is done using Miracle dice.

### Gaining Miracle Dice
If your Army Faction is Adepta Sororitas, you gain 1 Miracle dice:
▪ At the start of each battle round.
▪ Each time an Adepta Sororitas unit from your army is destroyed.

Each time you gain a Miracle dice, roll one D6. The number you roll is the value of that Miracle dice. This value cannot be changed or re-rolled, unless a rule specifically states otherwise. Keep your Miracle dice to one side — this is your Miracle dice pool.

### Performing an Act of Faith
Before making a dice roll for a model or unit from your army with the Acts of Faith ability, if you have one or more dice in your Miracle dice pool, that unit can perform an Act of Faith. If it does, select one of the dice from your Miracle dice pool to substitute that dice roll (if a roll involves more than one dice, e.g. a Charge roll or Battle-shock test, only a single dice can be substituted). The dice that is being substituted is not rolled; instead, the value of the selected Miracle dice is used as if it had been rolled (this counts as an unmodified dice roll of that value for all rules purposes). Each Miracle dice can only be selected for substitution once. Once all Miracle dice substitutions have been made, remove the chosen Miracle dice from your Miracle dice pool, and roll all remaining, unsubstituted dice that are a part of the dice roll. You can use Miracle dice when a unit performs an Act of Faith for any of the following types of dice roll:
▪ Advance roll
▪ Battle-shock test
▪ Charge roll
▪ Damage roll
▪ Hit roll
▪ Saving throw
▪ Wound roll`,
      },

      stratagems: [
        {
          name: 'Take Cover',
          sublabel: 'Sanctuary Guardians – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'When concealed within dense terrain, power-armoured Battle Sisters become astonishingly resilient and exceedingly difficult to flush from cover.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Sanctuary Guardians unit (excluding Arco-flagellants units) within a terrain area.",
          target: 'That Sanctuary Guardians unit.',
          effect: 'Your unit has +1 Sv.',
          restrictions: '',
        },
        {
          name: 'Fervent Devotion',
          sublabel: 'Sanctuary Guardians – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: "As battle rages and their hearts swell with fervour, the God-Emperor's faithful strive ever harder to destroy His foes.",
          when: 'Your Movement phase, when a friendly Sanctuary Guardians unit is selected to make an advance/fall-back move.',
          target: 'That Sanctuary Guardians unit.',
          effect: 'That move does not prevent your unit from being eligible to shoot/declare a charge.',
          restrictions: '',
        },
        {
          name: 'Fires of Damnation',
          sublabel: 'Sanctuary Guardians – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'What better cure for heresy than fire? Ministorum flamers, their fuel sanctified and blessed by the most pious of the clergy, burn as hot and bright as the God-Emperor’s own rage.',
          when: 'Your Shooting phase or the Fight phase, when a friendly Sanctuary Guardians unit is selected to attack.',
          target: 'That Sanctuary Guardians unit.',
          effect: `▪ Your unit's Torrent weapons have 6 A.
▪ Your unit's attacks have +1 AP.`,
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Righteous Fervour',
          isDefault: true,
          flavor: 'With gun stock, armoured fists and a strength born of hatred, Battle Sisters bludgeon and butcher the enemies of the faith.',
          body: `Sanctuary Guardians Canoness model only.
▪ This model's melee attacks have +1 D.
▪ This unit's melee attacks have +1 to wound rolls.`,
        },
        {
          name: 'Divine Miracle',
          isDefault: false,
          upgrade: true,
          flavor: 'Those who embody the righteous fury of the God-Emperor and dispense His justice to the heretic and the alien may benefit from His holy beneficence.',
          body: 'Upgrade: Sanctuary Guardians Battle Sisters Squad unit only. (Once per battle, per unit) At the start of any phase, you can use this ability. If you do, this unit heals D3+2 wounds.',
        },
      ],

      datasheets: [
        {
          id: 'sanctuary-canoness-adalya',
          name: 'Sanctuary Canoness Adalya',
          profiles: [
            { name: 'Sanctuary Canoness Adalya', m: '6"', t: '3', sv: '3+', w: '4', ld: '7+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Condemnor Boltgun', tags: ['ANTI-PSYKER 2+', 'DEVASTATING WOUNDS', 'PRECISION', 'RAPID FIRE 1'], range: '24"', a: '1', bs: '2+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Hallowed Chainsword', tags: [], a: '5', ws: '2+', s: '3', ap: '-1', d: '1' },
          ],
          faction: 'Acts of Faith',
          abilities: [
            { name: 'Null Rod', text: 'This unit has Feel No Pain 4+ against mortal wounds and Psychic attacks.' },
            { name: 'Divine Guidance (Once per turn per unit)', text: "When a friendly Sanctuary Guardians unit is selected to attack, you can use this ability. If you do, that unit's attacks can re-roll hit rolls." },
          ],
          composition: ['1 Canoness Adalya model'],
          loadout: '**This model is equipped with:** Condemnor Boltgun; Hallowed Chainsword; Null Rod.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Sanctuary Guardians Battle Sisters Squad', 'Sanctuary Guardians Celestian Sacresants'],
          },
          keywords: ['Canoness', 'Character', 'Explosives', 'Imperium', 'Infantry', 'Sanctuary Guardians'],
          factionKeywords: ['Adepta Sororitas'],
          baseSize: '32mm',
        },
        {
          id: 'sanctuary-guardians-celestian-sacresants',
          name: 'Sanctuary Guardians Celestian Sacresants',
          profiles: [
            { name: 'Sacresant Superior', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '1' },
            { name: 'Celestian Sacresants', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Hallowed Mace', tags: ['LETHAL HITS'], a: '3', ws: '3+', s: '4', ap: '-1', d: '2' },
          ],
          faction: 'Acts of Faith',
          abilities: [
            { name: 'Sworn Protectors', text: 'When an enemy unit targets this unit, if this unit has Adepta Sororitas Character, attacks that target this unit have -1 to wound rolls.' },
          ],
          composition: ['1 Sacresant Superior model', '4 Celestian Sacresants models'],
          loadout: '**Every model is equipped with:** Bolt Pistol; Hallowed Mace.',
          keywords: ['Explosives', 'Imperium', 'Infantry', 'Sanctuary Guardians'],
          factionKeywords: ['Adepta Sororitas'],
          baseSize: '32mm',
        },
        {
          id: 'sanctuary-guardians-arco-flagellants',
          name: 'Sanctuary Guardians Arco-Flagellants',
          profiles: [
            { name: 'Sanctuary Guardians Arco-Flagellants', m: '7"', t: '3', sv: '3+', w: '2', ld: '8+', oc: '1', inv: '6+' },
          ],
          melee: [
            { name: 'Arco-flails', tags: ['SUSTAINED HITS 1'], a: '4', ws: '4+', s: '5', ap: '0', d: '1' },
          ],
          faction: 'Acts of Faith',
          abilities: [
            { name: 'Extremis Trigger Word', text: "When this unit is selected to fight, you can use this ability. If you do:\n▪ This unit's arco-flails weapons have 6 A.\n▪ This unit's melee attacks have [HAZARDOUS]." },
          ],
          composition: ['10 Arco-Flagellents models'],
          loadout: '**Every model is equipped with:** Arco-flails.',
          keywords: ['Imperium', 'Infantry', 'Penitent', 'Sanctuary Guardians'],
          factionKeywords: ['Adepta Sororitas'],
          baseSize: '25mm',
        },
        {
          id: 'sanctuary-guardians-battle-sisters-squad',
          name: 'Sanctuary Guardians Battle Sisters Squad',
          profiles: [
            { name: 'Battle Sister with Simulacrum Imperialis', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '2' },
            { name: 'Battle Sister with Ministorum Flamer', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '2' },
            { name: 'Battle Sister', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '2' },
            { name: 'Battle Sister with Ministorum Heavy Flamer', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '2' },
            { name: 'Sister Superior', m: '6"', t: '3', sv: '3+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Boltgun', tags: ['RAPID FIRE 1'], range: '24"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Ministorum Flamer', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '5', ap: '0', d: '1' },
            { name: 'Ministorum Heavy Flamer', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '6', ap: '-1', d: '1' },
            { name: 'Combi-weapon', tags: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'], range: '24"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Stocks and Fists', tags: [], a: '1', ws: '4+', s: '3', ap: '0', d: '1' },
            { name: 'Power Weapon', tags: [], a: '2', ws: '4+', s: '4', ap: '-2', d: '1' },
          ],
          faction: 'Acts of Faith',
          abilities: [
            { name: 'Defenders of the Faith', text: 'At the end of your Command phase, if this unit is controlling an objective, that objective is secured.' },
            { name: 'Cherub (Once per battle per unit)', text: 'When this unit has performed an Act of Faith, you can use this ability. If you do, you gain 1 Miracle dice.' },
            { name: 'Simulacrum Imperialis', text: 'At the end of your Command phase, for each objective you control that has a friendly unit with this ability within range of it, roll one D6:\n▪ On a 4+, you gain 1 Miracle dice with a value equal to that result.' },
          ],
          composition: [
            '1 Battle Sister with Ministorum Flamer model',
            '1 Battle Sister with Ministorum Heavy Flamer model',
            '1 Battle Sister with Simulacrum Imperialis model',
            '1 Sister Superior model',
            '6 Battle Sister models',
          ],
          loadout: `**The Battle Sister with Ministorum Flamer is equipped with:** Bolt Pistol; Ministorum Flamer; Stocks and Fists.
**The Battle Sister with Ministorum Heavy Flamer is equipped with:** Bolt Pistol; Ministorum Heavy Flamer; Stocks and Fists.
**The Battle Sister with Simulacrum Imperialis is equipped with:** Boltgun; Bolt Pistol; Simulacrum Imperialis; Stocks and Fists.
**The Sister Superior is equipped with:** Bolt Pistol; Combi-weapon; Power Weapon; Stocks and Fists.
**Every Battle Sister is equipped with:** Boltgun; Bolt Pistol; Stocks and Fists.`,
          keywords: ['Battleline', 'Explosives', 'Imperium', 'Infantry', 'Sanctuary Guardians'],
          factionKeywords: ['Adepta Sororitas'],
          baseSize: '32mm',
        },
      ],
    },

    {
      slug: 'adeptus-custodes',
      name: 'Adeptus Custodes',
      boxName: "Tristraen's Gilded Blades",
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Fearless and Unrelenting',
        flavor: "Blade Champion Tristraen and his companions have earned renown for their fearless aggression. Always is Tristraen at the head of their assaults, his fellow Custodians following him in waves to ensure the destruction of the foe.",
        body: `▪ (Once per turn, per army) One friendly Tristraen's Gilded Blades unit can re-roll a battle-shock roll.
▪ When playing a Combat Patrol battle, the following friendly units must start the battle in strategic reserves and cannot be set up on the battlefield before the battle round stated, and must be set up wholly within your deployment zone when they do: Gilded Blades Custodian Wardens (battle round 2), Gilded Blades Allarus Custodians (battle round 3).`,
      },

      armyRule: {
        name: 'Martial Ka’tah',
        flavor: "Specialised disciplines mastered by Custodians over decades if not centuries, each ka'tah equips its practitioner to overmaster any foe in a particular discipline or philosophy. Martial ka'tahs allow the warriors of the Adeptus Custodes to deploy stances, movements, war philosophies and lethal skills that enhance their already terrifying martial prowess and focus it against particular threats.",
        body: `Each time a unit from your army with this ability is selected to fight, select one of the Ka'tah Stances below. Until that unit has finished making its attacks, the selected Stance is active for it and it gains the relevant ability:

### Dacatari Stance
Melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.

### Rendax Stance
Melee weapons equipped by models in this unit have the [LETHAL HITS] ability.`,
      },

      stratagems: [
        {
          name: 'Gilded Spear',
          sublabel: "Tristraen's Gilded Blades – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'Lunging with irresistible fury and speed, the Custodians pierce the enemy battle line and drive deep to deliver the killing thrust.',
          when: "Fight phase, when a friendly Tristraen's Gilded Blades unit is selected to make a consolidation move.",
          target: "That Tristraen's Gilded Blades unit.",
          effect: 'When making that consolidation move, your unit can move up to D3+3".',
          restrictions: '',
        },
        {
          name: 'Inevitable Wrath',
          sublabel: "Tristraen's Gilded Blades – Stratagem",
          cp: '1CP',
          turn: 'opponent',
          flavor: 'As incoming fire strikes his auramite plate, Tristraen of the Gilded Blades advances towards his assailants with vengeance in mind.',
          when: "Your opponent's Shooting phase, when an enemy unit has shot.",
          target: "One friendly unengaged Tristraen's Gilded Blades Blade Champion unit that lost a wound as a result of those attacks.",
          effect: 'Your unit can make a surge move of up to D6+1".',
          restrictions: '',
        },
        {
          name: 'Never Outmatched',
          sublabel: "Tristraen's Gilded Blades – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'When comrades fall around them, the Custodians’ fury reaches new heights, and they fight with all the savagery and violence of cornered lions.',
          when: "Fight phase when a friendly Tristraen's Gilded Blades unit that is below starting strength is selected to fight.",
          target: "That Tristraen's Gilded Blades unit.",
          effect: "Your unit's melee attacks have +1 A.",
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Shattering Charge',
          isDefault: true,
          flavor: 'Empowered by gene-alchemy and martial skill centuries in the making, Tristraen of the Gilded Blades is a terrifying opponent to face. Even the most monstrous and black-hearted of enemies quail before his thunderous charge.',
          body: "Tristraen's Gilded Blades Blade Champion model only. When this unit ends a charge move, you can select one enemy unit engaged with this unit. If you do, that enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.",
        },
        {
          name: 'Comrades in Wrath',
          isDefault: false,
          upgrade: true,
          flavor: 'Companions of Tristraen for long decades, these warriors share his burning hatred for the Emperor’s enemies. They hurl themselves eagerly into the jaws of danger in order to dispense His bloody wrath.',
          body: 'Upgrade: Gilded Blades Allarus Custodians unit only. This unit has +1 to charge rolls.',
        },
      ],

      datasheets: [
        {
          id: 'tristraen-of-the-gilded-blades',
          name: 'Tristraen of the Gilded Blades',
          profiles: [
            { name: 'Tristraen of the Gilded Blades', m: '6"', t: '6', sv: '2+', w: '6', ld: '6+', oc: '2', inv: '4+' },
          ],
          melee: [
            { name: 'Vaultswords – Behemor', tags: ['PRECISION'], a: '6', ws: '2+', s: '7', ap: '-2', d: '2' },
            { name: 'Vaultswords – Hurricanis', tags: ['SUSTAINED HITS 1'], a: '9', ws: '2+', s: '5', ap: '-1', d: '1' },
            { name: 'Vaultswords – Victus', tags: ['DEVASTATING WOUNDS'], a: '5', ws: '2+', s: '6', ap: '-3', d: '3' },
          ],
          faction: 'Martial Ka’tah',
          abilities: [
            { name: 'Rapid Strike', text: 'This unit can re-roll advance rolls.' },
          ],
          composition: ['1 Tristraen model'],
          loadout: '**This model is equipped with:** Vaultswords.',
          keywords: ['Blade Champion', 'Character', 'Imperium', 'Infantry', "Tristraen's Gilded Blades"],
          factionKeywords: ['Adeptus Custodes'],
          baseSize: '40mm',
        },
        {
          id: 'gilded-blades-custodian-guard',
          name: 'Gilded Blades Custodian Guard',
          profiles: [
            { name: 'Gilded Blades Custodian Guard', m: '6"', t: '6', sv: '2+', w: '3', ld: '6+', oc: '2', inv: '4+' },
          ],
          melee: [
            { name: 'Sentinel Blade', tags: [], a: '5', ws: '2+', s: '6', ap: '-2', d: '1' },
          ],
          ranged: [
            { name: 'Sentinel Blade', tags: ['ASSAULT', 'CLOSE-QUARTERS'], range: '12"', a: '2', bs: '2+', s: '4', ap: '-1', d: '2' },
          ],
          faction: 'Martial Ka’tah',
          abilities: [
            { name: 'Sentinel Storm', text: '(Once per battle, per unit) In your Shooting phase, when this unit has shot, you can use this ability. If you do, this unit can shoot again.' },
            { name: 'Stand Vigil', text: "This unit's melee attacks:\n▪ Can re-roll wound rolls of 1.\n▪ Or: That target a unit within range of an objective can re-roll wound rolls." },
            { name: 'Praesidium Shield', text: 'This model has +1 W.' },
          ],
          composition: ['3 Custodian Guard models'],
          loadout: '**Every model is equipped with:** Praesidium Shield; Sentinel Blade.',
          keywords: ['Battleline', 'Imperium', 'Infantry', "Tristraen's Gilded Blades"],
          factionKeywords: ['Adeptus Custodes'],
          baseSize: '40mm',
        },
        {
          id: 'gilded-blades-allarus-custodians',
          name: 'Gilded Blades Allarus Custodians',
          profiles: [
            { name: 'Allarus Custodian', m: '5"', t: '7', sv: '2+', w: '4', ld: '6+', oc: '2', inv: '4+' },
          ],
          ranged: [
            { name: 'Balistus Grenade Launcher', tags: ['BLAST 1'], range: '18"', a: 'D6', bs: '2+', s: '5', ap: '-1', d: '1' },
            { name: 'Guardian Spear', tags: ['ASSAULT'], range: '24"', a: '2', bs: '2+', s: '4', ap: '-1', d: '2' },
          ],
          melee: [
            { name: 'Guardian Spear', tags: [], a: '5', ws: '2+', s: '7', ap: '-2', d: '2' },
          ],
          faction: 'Martial Ka’tah',
          abilities: [
            { name: 'Slayers of Tyrants', text: "This unit's attacks that target a Character/Monster/Vehicle unit can re-roll wound rolls." },
            { name: 'From Golden Light (Once per battle, per unit)', text: "At the end of your opponent's turn, if this unit is unengaged, you can use this ability. If you do, place this unit in strategic reserves." },
          ],
          composition: ['2 Allarus Custodian models', '2 Allarus Custodians models'],
          loadout: '**Every model is equipped with:** Balistus Grenade Launcher; Guardian Spear.',
          keywords: ['Imperium', 'Infantry', 'Terminator', "Tristraen's Gilded Blades"],
          factionKeywords: ['Adeptus Custodes'],
          baseSize: '40mm',
        },
        {
          id: 'gilded-blades-custodian-wardens',
          name: 'Gilded Blades Custodian Wardens',
          profiles: [
            { name: 'Custodian Warden with Castellan Axe', m: '6"', t: '6', sv: '2+', w: '3', ld: '6+', oc: '2', inv: '4+' },
            { name: 'Custodian Warden with Guardian Spear', m: '6"', t: '6', sv: '2+', w: '3', ld: '6+', oc: '2', inv: '4+' },
          ],
          ranged: [
            { name: 'Castellan Axe', tags: ['ASSAULT'], range: '24"', a: '1', bs: '2+', s: '4', ap: '-1', d: '2' },
            { name: 'Guardian Spear', tags: ['ASSAULT'], range: '24"', a: '2', bs: '2+', s: '4', ap: '-1', d: '2' },
          ],
          melee: [
            { name: 'Castellan Axe', tags: [], a: '4', ws: '2+', s: '9', ap: '-1', d: '3' },
            { name: 'Guardian Spear', tags: [], a: '5', ws: '2+', s: '7', ap: '-2', d: '2' },
          ],
          faction: 'Martial Ka’tah',
          abilities: [
            { name: 'Divine Protection', text: 'This unit has Feel No Pain 4+ against mortal wounds.' },
          ],
          composition: ['1 Custodian Warden with Castellan Axe model', '2 Custodian Warden with Guardian Spear models'],
          loadout: `**The Custodian Warden with Castellan Axe is equipped with:** Castellan Axe.
**Every Custodian Warden with Guardian Spear is equipped with:** Guardian Spear.`,
          keywords: ['Imperium', 'Infantry', "Tristraen's Gilded Blades"],
          factionKeywords: ['Adeptus Custodes'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'adeptus-mechanicus',
      name: 'Adeptus Mechanicus',
      boxName: 'Purge Corps Deltic-9',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Imperative Overload',
        flavor: "The noosphere hums with activity as Skand floods the brains of his cybernetic thralls with additional imperatives, lending his augmetic warriors further resilience or lethality.",
        body: 'At the start of the battle round, you can select one friendly Purge Corps Deltic-9 unit. If you do, that unit has both Doctrina Imperative abilities until the end of the battle round.',
      },

      // Verbatim from the Codex armyRule (src/data/factions/adeptus-mechanicus.js) — unchanged
      // between the CP box and the Codex.
      armyRule: {
        name: 'Doctrina Imperatives',
        flavor: "An Adeptus Mechanicus army marching to war is a sight both terrifying and glorious, each holy warrior a disturbing fusion of Human and machine. The ruling Tech-Priests and their fanatical followers raise modified voices in praise of the Machine God, controlling their cyborg soldiery and mechanical creations through doctrina imperatives encoded to augment and adapt the warriors' abilities.",
        body: `At the start of the battle round, you can select one of the Doctrina Imperatives below. Until the end of the battle round, that Doctrina Imperative is active for your army, and all units from your army that have the Doctrina Imperatives ability gain the relevant abilities shown below.

### Protector Imperative
▪ Ranged weapons equipped by models in this unit have the [HEAVY] ability.
▪ Improve the Ballistic Skill characteristic of ranged weapons equipped by models in this unit by 1.
▪ Each time a melee attack targets this unit, if this unit has the Battleline keyword and/or it is within 6" of one or more friendly Adeptus Mechanicus Battleline units, subtract 1 from the Hit roll.

### Conqueror Imperative
▪ Ranged weapons equipped by models in this unit have the [ASSAULT] ability.
▪ Improve the Weapon Skill characteristic of melee weapons equipped by models in this unit by 1.
▪ Each time a model in this unit makes an attack, if this unit has the Battleline keyword and/or it is within 6" of one or more friendly Adeptus Mechanicus Battleline units, improve the Armour Penetration characteristic of that attack by 1.`,
      },

      stratagems: [
        {
          name: 'Lockdown Protocols',
          sublabel: 'Purge Corps Deltic-9 – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'At a Binharic command from their Tech-Priest, these warriors brace themselves and prepare to hold the ground they have seized.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Purge Corps Deltic-9 unit that is within range of an objective.",
          target: 'That Purge Corps Deltic-9 unit.',
          effect: 'Attacks that target your unit have -1 to wound rolls.',
          restrictions: '',
        },
        {
          name: 'Preservation Imperatives',
          sublabel: 'Purge Corps Deltic-9 – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Though the mechanical soldiery are expendable, Skand does not spend his tools freely. Where survival becomes a priority, inloaded imperatives can mandate fire-and-move strategies designed to keep the enemy at arm’s length and within optimum killing range.',
          when: 'Your Shooting phase, when a friendly unengaged Purge Corps Deltic-9 unit has shot.',
          target: 'That Purge Corps Deltic-9 unit.',
          effect: `▪ Your unit can make a normal move of up to D3+1".
▪ Your unit is not eligible to declare a charge until the end of the turn.`,
          restrictions: '',
        },
        {
          name: 'Optimised Targeting',
          sublabel: 'Purge Corps Deltic-9 – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Optimised impulse units can be activated to allow for seamless integration between cerebral cortexes and targeting cogitators, greatly enhancing accuracy.',
          when: 'Your Shooting phase, when a friendly Purge Corps Deltic-9 unit is selected to shoot.',
          target: 'That Purge Corps Deltic-9 unit.',
          effect: "Your unit's ranged attacks can re-roll hit rolls of 1.",
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Miniaturised Autosimulacra',
          isDefault: false,
          flavor: 'Skand’s warriors benefit from miniaturised autosimulacra. Once initiated, these remotely activated systems can repair damage to augmetic components, keeping the Tech-Priest’s thralls in the fight.',
          body: 'Purge Corps Deltic-9 Tech-Priest Manipulus model only. (Once per battle, per unit) At the start of any phase, you can use this ability. If you do, select one friendly Purge Corps Deltic-9 unit. That unit heals D3+2 wounds.',
        },
        {
          name: 'Empowered Mechanisms',
          isDefault: true,
          upgrade: true,
          flavor: 'A master of augmentation, Manipulus Skand fits his Serberys warriors with enhanced servos and empowers their weapon cells with potent charges of motive force.',
          body: `Upgrade: Purge Corps Serberys Sulphurhounds unit only.
▪ This unit's ranged attacks have [ANTI-INFANTRY 4+].
▪ This unit can re-roll rolls to determine the A of a weapon.`,
        },
      ],

      datasheets: [
        {
          id: 'purge-corps-serberys-sulphurhounds',
          name: 'Purge Corps Serberys Sulphurhounds',
          profiles: [
            { name: 'Serberys Sulphurhound', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '2' },
            { name: 'Serberys Sulphurhound Alpha', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '2' },
            { name: 'Serberys Sulphurhound with Phosphor Pistols', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Phosphor Blast Carbine', tags: ['BLAST 1', 'IGNORES COVER'], range: '18"', a: 'D6', bs: '4+', s: '6', ap: '0', d: '1' },
            { name: 'Sulphur breath', tags: ['CLOSE-QUARTERS', 'IGNORES COVER', 'TORRENT'], range: '9"', a: 'D6', bs: '-', s: '3', ap: '-1', d: '1' },
            { name: 'Phosphor Pistol', tags: ['CLOSE-QUARTERS', 'IGNORES COVER'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Mechanicus Pistol', tags: ['CLOSE-QUARTERS', 'DEVASTATING WOUNDS'], range: '12"', a: '1', bs: '4+', s: '6', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Clawed Limbs', tags: [], a: '4', ws: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Cavalry Arc Maul', tags: ['ANTI-VEHICLE 4+', 'DEVASTATING WOUNDS', 'EXTRA ATTACKS'], a: '1', ws: '4+', s: '5', ap: '-1', d: '1' },
          ],
          faction: 'Doctrina Imperatives',
          abilities: [
            { name: 'Pinning Fire', text: 'In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those attacks. If you do, that enemy unit is pinned until the start of your next turn:\n▪ While a unit is pinned, that unit:\n▪ Has -2" M.\n▪ Has -2 to charge rolls.' },
          ],
          composition: [
            '1 Serberys Sulphurhound model',
            '1 Serberys Sulphurhound Alpha model',
            '1 Serberys Sulphurhound with Phosphor Pistols model',
          ],
          loadout: `**The Serberys Sulphurhound is equipped with:** Clawed Limbs; Phosphor Blast Carbine; Phosphor Pistol; Sulphur breath.
**The Serberys Sulphurhound Alpha is equipped with:** Cavalry Arc Maul; Clawed Limbs; Mechanicus Pistol; Sulphur breath.
**The Serberys Sulphurhound with Phosphor Pistols is equipped with:** Clawed Limbs; 2 Phosphor Pistol; Sulphur breath.`,
          keywords: ['Imperium', 'Mounted', 'Purge Corps Deltic-9', 'Skitarii'],
          factionKeywords: ['Adeptus Mechanicus'],
          baseSize: '60x35.5mm Oval Base',
        },
        {
          id: 'purge-corps-pteraxii-sterylizors',
          name: 'Purge Corps Pteraxii Sterylizors',
          profiles: [
            { name: 'Pteraxii Sterylizor', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '1' },
            { name: 'Pteraxii Sterylizor Alpha', m: '12"', t: '4', sv: '4+', w: '2', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Phosphor Torch', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '4', ap: '0', d: '1' },
            { name: 'Flechette Blaster', tags: ['CLOSE-QUARTERS'], range: '12"', a: '5', bs: '4+', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Talons', tags: [], a: '2', ws: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Taser Goad', tags: ['SUSTAINED HITS 2'], a: '3', ws: '4+', s: '6', ap: '0', d: '1' },
          ],
          faction: 'Doctrina Imperatives',
          abilities: [
            { name: 'Searing Conflagration', text: "This unit's phosphor torch attacks that target a unit within range of an objective:\n▪ Can re-roll wound rolls of 1.\n▪ Or: If this unit is within 6\" of a friendly Adeptus Mechanicus Battleline unit, can re-roll wound rolls." },
          ],
          composition: ['1 Pteraxii Sterylizor Alpha model', '4 Pteraxii Sterylizor models'],
          loadout: `**The Pteraxii Sterylizor Alpha is equipped with:** Flechette Blaster; Taser Goad.
**Every Pteraxii Sterylizor is equipped with:** Phosphor Torch; Talons.`,
          keywords: ['Fly', 'Imperium', 'Infantry', 'Jump Pack', 'Purge Corps Deltic-9', 'Skitarii'],
          factionKeywords: ['Adeptus Mechanicus'],
          baseSize: '40mm',
        },
        {
          id: 'manipulus-skand',
          name: 'Manipulus Skand',
          profiles: [
            { name: 'Manipulus Skand', m: '6"', t: '4', sv: '2+', w: '4', ld: '7+', oc: '1', inv: '5+' },
          ],
          ranged: [
            { name: 'Transonic Cannon', tags: [], range: '12"', a: 'D6', bs: '-', s: '4', ap: '0', d: '2' },
          ],
          melee: [
            { name: 'Omnissian Staff', tags: [], a: '4', ws: '3+', s: '6', ap: '-1', d: '2' },
          ],
          faction: 'Doctrina Imperatives',
          abilities: [
            { name: 'Defend the Divine Work (Once per battle, per unit)', text: 'At the start of a phase, you can use this ability. If you do, this unit has 4+ InSv until the end of the phase.' },
            { name: 'Mechanical Guidance (Once per turn, per unit)', text: "When a friendly Purge Corps Deltic-9 unit visible to or within 12\" of this model is selected to attack, you can use this ability. If you do, that unit's attacks can re-roll wound rolls." },
          ],
          composition: ['1 Manipulus Skand model'],
          loadout: '**This model is equipped with:** Omnissian Staff; Transonic Cannon.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Purge Corps Skitarii Vanguard'],
          },
          keywords: ['Character', 'Cult Mechanicus', 'Imperium', 'Infantry', 'Purge Corps Deltic-9', 'Tech-Priest', 'Tech-Priest Manipulus'],
          factionKeywords: ['Adeptus Mechanicus'],
          baseSize: '50mm',
        },
        {
          id: 'purge-corps-skitarii-vanguard',
          name: 'Purge Corps Skitarii Vanguard',
          profiles: [
            { name: 'Skitarii Vanguard with Plasma Caliver', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Skitarii Vanguard with Arc Rifle', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Skitarii Vanguard', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Skitarii Vanguard Alpha', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Mechanicus Pistol', tags: ['CLOSE-QUARTERS', 'DEVASTATING WOUNDS'], range: '12"', a: '1', bs: '4+', s: '6', ap: '-1', d: '1' },
            { name: 'Arc Rifle', tags: ['ANTI-VEHICLE 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'], range: '30"', a: '1', bs: '4+', s: '8', ap: '-1', d: 'D3' },
            { name: 'Plasma Caliver – Standard', tags: [], range: '30"', a: '2', bs: '4+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Caliver – Supercharge', tags: ['HAZARDOUS'], range: '30"', a: '2', bs: '4+', s: '8', ap: '-3', d: '2' },
            { name: 'Radium Carbine', tags: ['ANTI-INFANTRY 4+'], range: '18"', a: '3', bs: '4+', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Alpha’s Combat Artefact', tags: [], a: '2', ws: '4+', s: '5', ap: '-1', d: '1' },
            { name: 'Gun Stocks', tags: [], a: '1', ws: '4+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Doctrina Imperatives',
          abilities: [
            { name: 'Omnispex', text: "This unit's ranged attacks have [IGNORES COVER]." },
            { name: 'Rad-saturation (Aura)', text: 'While an enemy unit (excluding Vehicle units) is within 3" of this unit, that enemy unit has -1 OC.' },
          ],
          composition: [
            '1 Skitarii Vanguard Alpha model',
            '1 Skitarii Vanguard with Arc Rifle model',
            '1 Skitarii Vanguard with Plasma Caliver model',
            '7 Skitarii Vanguard models',
          ],
          loadout: `**The Skitarii Vanguard Alpha is equipped with:** Alpha's Combat Artefact; Mechanicus Pistol.
**The Skitarii Vanguard with Arc Rifle is equipped with:** Arc Rifle; Gun Stocks.
**The Skitarii Vanguard with Plasma Caliver is equipped with:** Gun Stocks; Plasma Caliver.
**Every Skitarii Vanguard is equipped with:** Gun Stocks; Radium Carbine.`,
          keywords: ['Battleline', 'Imperium', 'Infantry', 'Purge Corps Deltic-9', 'Skitarii'],
          factionKeywords: ['Adeptus Mechanicus'],
          baseSize: '25mm',
        },
      ],
    },

    {
      slug: 'imperial-agents',
      name: 'Imperial Agents',
      boxName: "Inquisitor's Hand",
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Marked for Death',
        flavor: 'Priority targets pose a clear and present threat to Humanity’s continued existence. They must be hunted down and eliminated, no matter the cost.',
        body: `In your Command phase, you can select one enemy unit. Friendly Inquisitor's Hand units' attacks that target that enemy unit have:
▪ [IGNORES COVER].
▪ [LETHAL HITS].
▪ [PRECISION].`,
      },

      // The CP box's own (shorter) copy — the Codex version (src/data/factions/imperial-agents.js)
      // additionally spells out the Incursion/Strike Force/Onslaught unit-count table, which
      // doesn't apply the same way to a fixed-roster Combat Patrol army.
      armyRule: {
        name: 'Assigned Agents',
        flavor: 'Throughout the Imperium, there exist numerous martial organisations and shadowy institutions. Bodies of armed warriors or solitary agents from these groups possess specialist skills, unusual equipment and vested interests that lead them to be attached to larger Imperial armies. Some are requisitioned by the army’s commander for their particular abilities whilst others are assigned by their hidden masters to achieve singular agendas. The most powerful have the authority and reputation to enforce their presence on the battlefield.',
        body: `If your Army Faction is Agents of the Imperium, then in the Select Detachment Rules step, you can select one of the available Detachments from this publication as normal.

If your Army Faction is not Agents of the Imperium, but every model in your army has the Imperium keyword, you can include Agents of the Imperium units in your army even if they do not have the Faction keyword you selected in the Select Army Faction step. In this case, the maximum number of Agents of the Imperium units you can include in your army depends on the battle size, as shown below.

Note that you can include Agents of the Imperium Dedicated Transport units in such an army as normal, but each unit must start the battle with one or more units embarked within it, or it cannot be deployed for that battle and will count as having been destroyed during the first battle round.`,
      },

      stratagems: [
        {
          name: 'Urban Enforcers',
          sublabel: "Inquisitor's Hand – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'Many Inquisitorial agents are drawn from the depths of densely populated hives and other urban environments. Whether former hive gangers, enforcers, bounty hunters or agents of the law, these operatives are all experts in claustrophobic urban warfare.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Inquisitor's Hand unit with every model within a terrain area.",
          target: "That Inquisitor's Hand unit.",
          effect: 'Attacks that target your unit have -1 AP.',
          restrictions: '',
        },
        {
          name: 'Superior Weaponry',
          sublabel: "Inquisitor's Hand – Stratagem",
          cp: '1CP',
          turn: 'either',
          flavor: 'Inquisitors are known to amass huge armouries full of esoteric weapons and wargear that may be, when necessary, dispensed to their agents in the field.',
          when: "Your Shooting phase or the Fight phase, when a friendly Inquisitor's Hand unit (excluding Eversor Assassin units) is selected to attack.",
          target: "That Inquisitor's Hand unit.",
          effect: "Your unit's attacks have +1 AP.",
          restrictions: '',
        },
        {
          name: 'Inquisitorial Mandate',
          sublabel: "Inquisitor's Hand – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Agents of the Inquisition have the authority to commandeer and claim as they see fit. The flashing of an inquisitorial seal is all it takes to stake their claim.',
          when: 'End of your Movement phase.',
          target: "One friendly Inquisitor's Hand unit (excluding Eversor Assassin units).",
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Sanctic Slayers',
          isDefault: true,
          flavor: 'Benefiting from Preacher Teguen’s blessings and empowered by the Inquisition’s specialist training, the warriors of the Inquisitor’s Hand are able to engage seemingly far more powerful enemies on an even footing.',
          body: "Inquisitor's Hand Ministorum Priest model only. (Once per turn, per unit) When a friendly Inquisitor's Hand unit is selected to attack you can use this ability. If you do, that unit's attacks that target a unit with a T greater than or equal to your attack's S have +1 to wound rolls.",
        },
        {
          name: 'Killer Reflexes',
          isDefault: false,
          flavor: 'Assassins of the Eversor temples are living instruments of destruction who know no pain, no fear and no restraint. They are relentless in their drive to kill and will shrug off seemingly mortal wounds in the course of their rampages.',
          body: "Inquisitor's Hand Eversor Assassin model only. In the Fight phase, when this model is destroyed, if this unit has not been selected to fight this phase, roll one D6: on a 2+, do not remove this model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield.",
        },
      ],

      datasheets: [
        {
          id: 'preacher-teguen',
          name: 'Preacher Teguen',
          profiles: [
            { name: 'Preacher Teguen', m: '6"', t: '3', sv: '6+', w: '3', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: "Zealot's Vindictor", tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: "Zealot's Vindictor", tags: [], a: '3', ws: '4+', s: '5', ap: '-1', d: '2' },
          ],
          faction: 'Assigned Agents',
          abilities: [
            { name: 'Zealot (Once per battle per unit)', text: "When this unit is selected to fight, you can use this ability. If you do, this model's melee attacks have +3 A and S." },
            { name: 'Holy Hatred', text: "If this is an Attached unit, this unit's melee attacks have [SUSTAINED HITS 1]." },
          ],
          composition: ['1 Preacher Teguen model'],
          loadout: "**This model is equipped with:** Zealot's Vindictor.",
          leader: {
            text: 'This model can be attached to the following units:',
            units: ["Inquisitor's Hand Inquisitorial Agents"],
          },
          keywords: ['Character', 'Imperium', 'Infantry', "Inquisitor's Hand", 'Ministorum Priest', 'Ordo Hereticus'],
          factionKeywords: ['Agents of the Imperium'],
          baseSize: '32mm',
        },
        {
          id: 'inquisitors-hand-vigilant-squad',
          name: "Inquisitor's Hand Vigilant Squad",
          profiles: [
            { name: 'Cyber-Mastiff', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Vigilant with Combat Shotgun, Shotpistol and Gun Stocks', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Vigilant with Grenade Launcher, Shotpistol and Gun Stocks', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Vigilant with Shotpistol, Webber and Gun Stocks', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Proctor-Vigilant', m: '6"', t: '3', sv: '4+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Combat Shotgun', tags: ['ASSAULT'], range: '18"', a: '2', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Shotpistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Grenade Launcher – Frag', tags: ['BLAST 1'], range: '24"', a: 'D3', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Grenade Launcher – Krak', tags: [], range: '24"', a: '1', bs: '4+', s: '9', ap: '-2', d: 'D3' },
            { name: 'Webber', tags: ['ASSAULT', 'DEVASTATING WOUNDS', 'TORRENT'], range: '12"', a: 'D6', bs: '3+', s: '2', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Mechanical Bite', tags: [], a: '3', ws: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Gun Stocks', tags: [], a: '2', ws: '4+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Assigned Agents',
          abilities: [
            { name: 'Merciless Judgement', text: "This unit's ranged attacks that target a unit below half-strength have +1 to wound rolls." },
            { name: 'Nuncio-Aquila', text: 'At the start of the Command phase, you can use this ability. If you do, select one objective within 6" of this model that has not been selected for this ability this turn. Enemy units (excluding Monster/Vehicle units) within range of that objective must make a battle-shock roll.' },
          ],
          composition: [
            '1 Cyber-Mastiff model',
            '1 Proctor-Vigilant model',
            '1 Vigilant with Grenade Launcher, Shotpistol and Gun Stocks model',
            '1 Vigilant with Shotpistol, Webber and Gun Stocks model',
            '6 Vigilant with Combat Shotgun, Shotpistol and Gun Stocks models',
          ],
          loadout: `**The Cyber-Mastiff is equipped with:** Mechanical Bite.
**The Proctor-Vigilant is equipped with:** Combat Shotgun; Gun Stocks; Nuncio-Aquila; Shotpistol.
**The Vigilant with Grenade Launcher, Shotpistol and Gun Stocks is equipped with:** Grenade Launcher; Gun Stocks; Shotpistol.
**The Vigilant with Shotpistol, Webber and Gun Stocks is equipped with:** Gun Stocks; Shotpistol; Webber.
**Every Vigilant with Combat Shotgun, Shotpistol and Gun Stocks is equipped with:** Combat Shotgun; Gun Stocks; Shotpistol.`,
          keywords: ['Adeptus Arbites', 'Battleline', 'Explosives', 'Imperium', 'Infantry', "Inquisitor's Hand", 'Retinue'],
          factionKeywords: ['Agents of the Imperium'],
          baseSize: '25mm, 28.5mm',
        },
        {
          id: 'inquisitors-hand-eversor-assassin',
          name: "Inquisitor's Hand Eversor Assassin",
          profiles: [
            { name: 'Eversor Assassin', m: '9"', t: '4', sv: '6+', w: '4', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Executioner Pistol', tags: ['ANTI-INFANTRY 3+', 'CLOSE-QUARTERS', 'PRECISION', 'SUSTAINED HITS 3'], range: '12"', a: '4', bs: '2+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Power Sword and Neuro-Gauntlet', tags: ['ANTI-INFANTRY 3+', 'PRECISION', 'SUSTAINED HITS 3'], a: '6', ws: '2+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Assigned Agents',
          abilities: [
            { name: 'Overkill (Once per battle per unit)', text: "When this unit is selected to attack, you can use this ability. If you do, this unit's melee attacks have -4 AP." },
          ],
          composition: ['1 Eversor Assassin model'],
          loadout: '**This model is equipped with:** Executioner Pistol; Power Sword and Neuro-Gauntlet.',
          keywords: ['Character', 'Epic Hero', 'Eversor Assassin', 'Explosives', 'Imperium', 'Infantry', "Inquisitor's Hand", 'Officio Assassinorum'],
          factionKeywords: ['Agents of the Imperium'],
          baseSize: '32mm',
        },
        {
          id: 'inquisitors-hand-inquisitorial-agents',
          name: "Inquisitor's Hand Inquisitorial Agents",
          profiles: [
            { name: 'Inquisitorial Agent with Agent’s Firearm, Agent’s Implement and Mystic Stave', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Inquisitorial Agent with Agent’s Firearm and Agent’s Implement', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Gun Servitor', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Inquisitorial Agent with Agent’s Firearm, Plasma Pistol and Agent’s Implement', m: '6"', t: '3', sv: '5+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Heavy Bolter', tags: ['HEAVY', 'SUSTAINED HITS 1'], range: '36"', a: '3', bs: '4+', s: '5', ap: '-1', d: '2' },
            { name: 'Agent’s Firearm', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Agent’s Implement', tags: [], a: '3', ws: '3+', s: '3', ap: '0', d: '1' },
            { name: 'Mystic Stave', tags: ['ANTI-INFANTRY 4+', 'PSYCHIC'], a: '2', ws: '3+', s: '5', ap: '-1', d: 'D3' },
          ],
          faction: 'Assigned Agents',
          abilities: [
            { name: 'Tome Skull (Once per battle per unit)', text: "At the start of any phase, you can select one friendly battle-shocked Agents of the Imperium unit within 6\" of this unit or one enemy within 6\" of this unit. If you select a friendly unit, that unit is no longer battle-shocked. If you select an enemy unit, that unit must make a battle-shock roll." },
            { name: 'Loyal To The Cause', text: 'When an enemy unit targets this unit, if this unit is within range of an objective, attacks that target this unit have -1 to wound rolls.' },
          ],
          composition: [
            '1 Gun Servitor model',
            "1 Inquisitorial Agent with Agent's Firearm, Agent's Implement and Mystic Stave model",
            "1 Inquisitorial Agent with Agent's Firearm, Plasma Pistol and Agent's Implement model",
            "3 Inquisitorial Agent with Agent's Firearm and Agent's Implement models",
          ],
          loadout: `**The Gun Servitor is equipped with:** Agent's Implement; Heavy Bolter.
**The Inquisitorial Agent with Agent's Firearm, Agent's Implement and Mystic Stave is equipped with:** Agent's Firearm; Agent's Implement; Mystic Stave; Tome Skull.
**The Inquisitorial Agent with Agent's Firearm, Plasma Pistol and Agent's Implement is equipped with:** Agent's Firearm; Agent's Implement; Plasma Pistol.
**Every Inquisitorial Agent with Agent's Firearm and Agent's Implement is equipped with:** Agent's Firearm; Agent's Implement.`,
          keywords: ['Explosives', 'Imperium', 'Infantry', "Inquisitor's Hand", 'Retinue'],
          factionKeywords: ['Agents of the Imperium'],
          baseSize: '25mm, 32mm',
        },
      ],
    },

    {
      slug: 'aeldari',
      name: 'Aeldari',
      boxName: "Kygharil's Protectors",
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Graceful Warriors',
        flavor: "Monstrous though they are, the Kygharil's Ghost Warriors stride softly and are obscured by the psychic arts of their Spiritseer.",
        body: `▪ Friendly Kygharil's Protectors units (excluding Kygharil's Protectors Wraithblades units) have Stealth.
▪ Friendly Kygharil's Protectors units (excluding Kygharil's Protectors Wraithblades units) have -3" detection range.`,
      },

      // Verbatim from the Codex armyRule (src/data/factions/aeldari.js), minus its closing
      // "Disparate Paths" (Harlequins ally-inclusion) paragraph — absent from the CP box's own copy.
      armyRule: {
        name: 'Battle Focus',
        flavor: 'In war, as in all things, the Aeldari bring the full might of their intellect, skill and agility to bear upon the task. Coupled with their exceptional technology, this ensures they move with swiftness and grace that is impossible for the foe to match.',
        body: `If your Army Faction is Asuryani, at the start of the battle round, you receive a number of Battle Focus tokens based on the battle size, as shown below:
▪ **Incursion:** 2 Battle Focus tokens.
▪ **Strike Force:** 4 Battle Focus tokens.
▪ **Onslaught:** 6 Battle Focus tokens.

Each time one of the triggers shown in the Agile Manoeuvres section below occurs, you can spend one Battle Focus token to enable the relevant eligible unit to perform that Agile Manoeuvre. A unit is eligible to perform an Agile Manoeuvre if it has this ability and has not already performed an Agile Manoeuvre in the same phase. Unless otherwise stated, you cannot trigger the same Agile Manoeuvre more than once per phase. At the end of the battle round, all unspent Battle Focus tokens are lost.

### Swift as the Wind
**TRIGGER:** When an eligible unit from your army is selected to make a Normal, Advance or Fall Back move. You can trigger this Agile Manoeuvre more than once per phase (provided a different unit performs it each time).
**EFFECT:** Until the end of the phase, add 2" to the Move characteristic of models in that unit.

### Flitting Shadows
**TRIGGER:** When an eligible unit from your army is selected to make a Normal, Advance or Fall Back move, is set up on the battlefield, or declares a charge.
**EFFECT:** Until the end of the turn, enemy units cannot use the Fire Overwatch Stratagem to shoot at that unit.

### Star Engines
**TRIGGER:** When an eligible Vehicle unit from your army is selected to make an Advance move.
**EFFECT:** Until the end of the turn, ranged weapons equipped by this unit have the [ASSAULT] ability.

### Sudden Strike
**TRIGGER:** When an eligible unit from your army is selected to fight.
**EFFECT:** Until the end of the phase, each time a model in that unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".

### Opportunity Seized
**TRIGGER:** When an enemy unit ends a Fall Back move.
**EFFECT:** One eligible unit from your army (excluding Titanic units) that started the phase within Engagement Range of that enemy unit can make a Normal move of up to D6+1".

### Fade Back
**TRIGGER:** In your opponent's Shooting phase, just after an enemy unit has shot.
**EFFECT:** One eligible unit from your army (excluding Titanic units) that was hit by one or more of those attacks can make a Normal move of up to D6+1".`,
      },

      stratagems: [
        {
          name: 'Fading Fusillade',
          sublabel: "Kygharil's Protectors – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Drawing back from the enemy in feigned retreat, Aeldari warriors open fire from close range, scything down their targets.',
          when: "Your Movement phase, when a friendly Kygharil's Protectors unit is selected make a fall-back move.",
          target: "That Kygharil's Protectors unit.",
          effect: 'That move does not prevent your unit from being eligible to shoot.',
          restrictions: '',
        },
        {
          name: 'Suppressing Storm',
          sublabel: "Kygharil's Protectors – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Unleashing a blizzard of shuriken fire or torrents of cutting monofilament, these warriors suppress their targets, impeding the ability to return fire.',
          when: "Your Shooting phase, when a friendly Kygharil's Protectors unit (excluding Character units) has shot.",
          target: 'Select one enemy unit hit by those attacks.',
          effect: 'That enemy unit is suppressed until the start of your next turn:\n▪ While a unit is suppressed, that unit’s attacks have -1 to hit rolls.',
          restrictions: '',
        },
        {
          name: 'Focused Strikes',
          sublabel: "Kygharil's Protectors – Stratagem",
          cp: '1CP',
          turn: 'your',
          flavor: 'Combining their specialised weaponry and skills to the best effect, the Aeldari unleash a converging storm of lethal firepower that reduces their chosen targets to bloodied ruin in a matter of heartbeats.',
          when: "Start of your Shooting phase.",
          target: "One or more friendly Kygharil's Protectors units.",
          effect: "Select one enemy unit. Your units' ranged attacks that target that unit can re-roll wound rolls of 1.",
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Seer’s Hand',
          isDefault: true,
          flavor: 'As a Spiritseer, it is Kygharil provides guidance to Ghost Warriors in the heat of battle, directing their strikes against the most dangerous opponents.',
          body: `Kygharil's Protectors Spiritseer model only. At the end of your Movement phase, you can select one friendly Kygharil's Protectors Wraithblades unit within 12" of this model:
▪ That unit heals D3 wounds.
▪ That unit's attacks have [PRECISION] until the start of your next Movement phase.`,
        },
        {
          name: 'Guided Jump',
          isDefault: false,
          upgrade: true,
          flavor: "Guided by the insight of their craftworld's seers, these Aspect Warriors arrive ahead of their allies, taking up optimal positions to strike at the advancing enemy.",
          body: "Upgrade: Kygharil's Protectors Warp Spiders unit only. This unit has Scouts 6\".",
        },
      ],

      datasheets: [
        {
          id: 'kygharils-protectors-dire-avengers',
          name: "Kygharil's Protectors Dire Avengers",
          profiles: [
            { name: 'Dire Avengers Exarch', m: '7"', t: '3', sv: '4+', w: '1', ld: '6+', oc: '1', inv: '5+' },
            { name: 'Dire Avenger', m: '7"', t: '3', sv: '4+', w: '1', ld: '6+', oc: '1', inv: '5+' },
          ],
          ranged: [
            { name: 'Avenger Shuriken Catapult', tags: ['ASSAULT'], range: '18"', a: '4', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Weapon Strike', tags: [], a: '2', ws: '3+', s: '3', ap: '0', d: '1' },
            { name: 'Power Glaive', tags: [], a: '3', ws: '3+', s: '5', ap: '-3', d: '1' },
          ],
          faction: 'Battle Focus',
          abilities: [
            { name: 'Aspect Shrine Token (Once per battle per unit)', text: 'When this unit makes hit rolls or wound rolls, you can use this ability. If you do, change one of those rolls to an unmodified 6.' },
            { name: 'Bladestorm', text: "This unit's ranged attacks that target a unit within half range have [SUSTAINED HITS 1]." },
            { name: 'Shimmershield', text: 'This model has 4+ InSv.' },
          ],
          composition: ['1 Dire Avengers Exarch model', '4 Dire Avenger models'],
          loadout: `**The Dire Avengers Exarch is equipped with:** Power Glaive; Shimmershield.
**Every Dire Avenger is equipped with:** Avenger Shuriken Catapult; Weapon Strike.`,
          keywords: ['Aeldari', 'Aspect Warriors', 'Infantry', "Kygharil's Protectors"],
          factionKeywords: ['Asuryani'],
          baseSize: '28.5mm',
        },
        {
          id: 'spiritseer-kygharil',
          name: 'Spiritseer Kygharil',
          profiles: [
            { name: 'Spiritseer Kygharil', m: '7"', t: '3', sv: '6+', w: '3', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Shuriken Pistol', tags: ['ASSAULT', 'CLOSE-QUARTERS'], range: '12"', a: '1', bs: '2+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Witch Staff', tags: ['ANTI-INFANTRY 2+', 'PSYCHIC'], a: '2', ws: '2+', s: '3', ap: '0', d: 'D3' },
          ],
          faction: 'Battle Focus',
          abilities: [
            { name: 'Spiritseer', text: 'While this unit is within 3" of a friendly Wraith Construct unit, this unit has Lone Operative.' },
            { name: 'Spirit Mark (Psychic) (Once per turn per unit)', text: "When this unit starts or ends a move, you can use this ability. If you do, select one friendly Wraith Construct unit (excluding Titanic units) within 6\" of this model and one enemy unit visible to this model. That friendly unit's attacks that target that enemy unit have [SUSTAINED HITS 1] until the start of your next Movement phase." },
            { name: 'Tears of Isha (Psychic)', text: 'In your Command phase, you can select one friendly Wraith Construct unit within 6" of this model that has not been selected for this ability this turn.\n▪ If that unit has a destroyed model, return one destroyed model to that unit.\n▪ Or: If that unit does not have a destroyed model, one model in that unit heals D3 wounds.' },
          ],
          composition: ['1 Spiritseer Kygharil model'],
          loadout: '**This model is equipped with:** Shuriken Pistol; Witch Staff.',
          keywords: ['Aeldari', 'Character', 'Infantry', "Kygharil's Protectors", 'Psyker', 'Spiritseer'],
          factionKeywords: ['Asuryani'],
          baseSize: '25mm',
        },
        {
          id: 'kygharils-protectors-wraithblades',
          name: "Kygharil's Protectors Wraithblades",
          profiles: [
            { name: "Kygharil's Protectors Wraithblades", m: '6"', t: '6', sv: '2+', w: '3', ld: '8+', oc: '1' },
          ],
          melee: [
            { name: 'Ghostaxe', tags: [], a: '3', ws: '4+', s: '7', ap: '-2', d: '2' },
          ],
          abilities: [
            { name: 'Psychic Guidance', text: 'While this unit is within 12" of one or more friendly Aeldari Psyker models:\n▪ This unit has 6+ Ld.\n▪ This unit\'s attacks have +1 to hit rolls.' },
            { name: 'Forceshield', text: 'This model has 4+ InSv.' },
            { name: 'Malevolent Souls', text: 'When a model in this unit is destroyed, if this unit has not been selected to fight this phase, roll one D6:\n▪ On a 3+, do not remove that model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.' },
          ],
          composition: ['5 Wraithblade models'],
          loadout: '**Every model is equipped with:** Forceshield; Ghostaxe.',
          keywords: ['Aeldari', 'Infantry', "Kygharil's Protectors", 'Wraith Construct'],
          factionKeywords: ['Asuryani'],
          baseSize: '40mm',
        },
        {
          id: 'kygharils-protectors-warp-spiders',
          name: "Kygharil's Protectors Warp Spiders",
          profiles: [
            { name: 'Warp Spider', m: '12"', t: '3', sv: '3+', w: '1', ld: '6+', oc: '1' },
            { name: 'Warp Spider Exarch', m: '12"', t: '3', sv: '3+', w: '1', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Death Weavers', tags: ['IGNORES COVER', 'TORRENT', 'TWIN-LINKED'], range: '6"', a: 'D6', bs: '-', s: '4', ap: '-1', d: '1' },
            { name: 'Death Spinner', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Powerblades', tags: ['LETHAL HITS', 'TWIN-LINKED'], a: '5', ws: '3+', s: '4', ap: '-2', d: '1' },
            { name: 'Weapon Strike', tags: [], a: '2', ws: '3+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Battle Focus',
          abilities: [
            { name: 'Aspect Shrine Token', text: 'When this unit makes hit rolls or wound rolls, you can use this ability. If you do, change one of those rolls to an unmodified 6.' },
            { name: 'Engulfing Flames (Once per battle per unit)', text: "When this unit is selected to shoot, you can use this ability. If you do, this unit's ranged attacks have [ANTI-INFANTRY 3+]." },
          ],
          composition: ['1 Warp Spider Exarch model', '4 Warp Spider models'],
          loadout: `**The Warp Spider Exarch is equipped with:** Death Weavers; Powerblades.
**Every Warp Spider is equipped with:** Death Spinner; Weapon Strike.`,
          keywords: ['Aeldari', 'Aspect Warriors', 'Fly', 'Infantry', 'Jump Pack', "Kygharil's Protectors"],
          factionKeywords: ['Asuryani'],
          baseSize: '28.5mm',
        },
      ],
    },

    {
      slug: 'black-templars',
      name: 'Black Templars',
      boxName: 'Vow-Sworn of Vedrenn',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Close-range Destruction',
        flavor: 'The Black Templars revel in close-quarters fighting. They hurl themselves upon the enemy in wave assaults, each more furious and bloodthirsty than the last.',
        body: `▪ Friendly Vow-Sworn of Vedrenn units' attacks that target a unit within 12" can ignore modifiers to BS, WS and hit rolls.
▪ When playing a Combat Patrol battle, the following friendly units must start the battle in strategic reserves and cannot be set up on the battlefield before the battle round stated, and must be set up wholly within your deployment zone when they do: Emperor's Champion (battle round 2).`,
      },

      // Verbatim from the Codex armyRule (src/data/factions/black-templars.js) — the CP box's own
      // Templar Vows copy differs only in incidental HTML-formatting noise from the Codex one
      // (confirmed byte-for-byte identical game text), so reused as-is rather than
      // re-transcribed. Its "Heirs of Sigismund" section is folded in the same way.
      armyRule: {
        name: 'Templar Vows',
        flavor: 'On the eve of battle, the Black Templars gather to be led in prayer and contemplation by their champions. United in their hatred of the foe, they swear a mighty vow to uphold in the battle ahead.',
        body: `If your Army Faction is Adeptus Astartes, at the start of the first battle round, select one of the following Vows to be active for Adeptus Astartes units from your army. While a Vow is active for a unit from your army, that unit has the associated ability shown below.

### Abhor the Witch, Destroy the Witch
This unit's melee attacks that target a Psyker unit have [PRECISION].
▪ When this unit declares a charge, if an enemy Psyker unit is within 12" of this unit, you can use this part of this ability. If you do:
▪ This unit can re-roll that charge roll.
▪ This unit must end that charge move engaged with one or more of those enemy Psyker units.

### Accept Any Challenge, No Matter the Odds
Each time a model in this unit makes a melee attack, if the Strength characteristic of that attack is less than or equal to the Toughness characteristic of the target, add 1 to the Wound roll.

### Suffer Not the Unclean to Live
This unit is eligible to declare a charge in a turn in which it Fell Back, and each time a model in this unit makes a Pile-in or Consolidation move, it does not need to end that move closer to the closest enemy model, provided it ends that move as close as possible to the closest enemy unit.

### Uphold the Honour of the Emperor
If this unit has the Infantry keyword:
▪ At the end of your Command phase, if this unit is within range of an objective marker you control, that objective marker remains under your control until your opponent's Level of Control over that objective marker is greater than yours at the end of a phase.
▪ If the mission you are playing features Actions, this unit is eligible to start to perform an Action in a turn in which it Advanced.

**Heirs of Sigismund:**
▪ If an Adeptus Astartes unit has a second Faction keyword on its datasheet, that Faction keyword is the name of that unit's Chapter (e.g. High Marshal Helbrecht has both the Adeptus Astartes and Black Templars keywords, and is from the Black Templars Chapter).
▪ You cannot include units from more than one Chapter in your army.`,
      },

      stratagems: [
        {
          name: 'Come To Their Aid',
          sublabel: 'Vow-Sworn of Vedrenn – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Bonds of brotherhood are close amongst the Vow-sworn. When allies find themselves bogged down by teeming masses of foes, their battle-brothers are swift to come to their relief, thundering eagerly into the fray.',
          when: 'Your Charge phase, when a friendly Vow-Sworn of Vedrenn unit has made a charge roll.',
          target: 'That Vow-Sworn of Vedrenn unit.',
          effect: `▪ Add 2 to the charge roll.
▪ When selecting charge targets, your unit can only select enemy units engaged with friendly Vow-Sworn of Vedrenn units.`,
          restrictions: '',
        },
        {
          name: 'Heavy Strikes',
          sublabel: 'Vow-Sworn of Vedrenn – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The God-Emperor’s greatest gift is hatred. The Black Templars know how to channel it to the greatest effect, raising their transhuman strength to new heights.',
          when: 'Fight phase, when a friendly Vow-Sworn Sword Brethren Squad/Bladeguard Veteran Squad unit is selected to fight.',
          target: 'That Vow-Sworn Sword Brethren Squad/Bladeguard Veteran Squad unit.',
          effect: "Your unit's melee attacks that target a Monster/Vehicle unit have +1 D.",
          restrictions: '',
        },
        {
          name: 'Blessed Aura',
          sublabel: 'Vow-Sworn of Vedrenn – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'As casualties mount and wounds are suffered, faith is tested. Those that maintain their zeal are rewarded, the blessings of the God-Emperor settling upon them as they wade deeper into battle.',
          when: 'Your Command phase, when a friendly Vow-Sworn of Vedrenn unit passes a battle-shock roll.',
          target: 'That Vow-Sworn of Vedrenn unit.',
          effect: 'Melee attacks that target your unit have -1 to hit rolls until the start of your next turn.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Divine Endurance',
          isDefault: false,
          flavor: 'In pursuit of holy goals, the Black Templars are unflinching and untiring, trusting in the Emperor to shield them from harm as they plough towards their objectives.',
          body: `Vow-Sworn of Vedrenn Emperor's Champion model only. At the start of your Movement phase, you can select one friendly Vow-Sworn of Vedrenn unit visible to and within 12" of this model. If you do, when that unit is selected to make an advance/fall-back move this turn:
▪ If that unit uses the desperate escape mode, it passes any hazard rolls.
▪ That move does not prevent that unit from being eligible to start an action.`,
        },
        {
          name: 'Divine Protection',
          isDefault: true,
          upgrade: true,
          flavor: 'The Black Templars and unfaltering in their belief that the God-Emperor guides and protects the most faithful of His flock.',
          body: 'Upgrade: Vow-Sworn Sword Brethren unit only. (Once per battle, per unit) When an enemy unit targets this unit, you can use this ability. If you do, this unit has 4+ InSv.',
        },
      ],

      datasheets: [
        {
          id: 'emperors-champion-vedrenn',
          name: "Emperor's Champion Vedrenn",
          profiles: [
            { name: "Emperor's Champion Vedrenn", m: '8"', t: '4', sv: '2+', w: '5', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '2+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Black Sword – Strike', tags: ['ANTI-CHARACTER 5+', 'PRECISION'], a: '6', ws: '2+', s: '8', ap: '-3', d: '3' },
            { name: 'Black Sword – Sweep', tags: [], a: '10', ws: '2+', s: '6', ap: '-2', d: '1' },
          ],
          faction: 'Templar Vows',
          abilities: [
            { name: 'Deft Riposte', text: 'Melee attacks that target this unit have [HAZARDOUS].' },
          ],
          composition: ["1 Emperor's Champion Vedrenn model"],
          loadout: "**This model is equipped with:** Black Sword; Bolt Pistol.",
          keywords: ['Character', "Emperor's Champion", 'Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vow-Sworn of Vedrenn'],
          factionKeywords: ['Black Templars', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'vow-sworn-sword-brethren-squad',
          name: 'Vow-Sworn Sword Brethren Squad',
          profiles: [
            { name: 'Sword Brother with Plasma Pistol and Master-crafted Power Weapon', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Sword Brother with Pyre Pistol and Master-crafted Power Weapon', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Sword Brother with Twin Lightning Claws', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Sword Brother with Heavy Bolt Pistol and Chainsword', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Sword Brother Castellan', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Combi-Weapon', tags: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'RAPID FIRE 1'], range: '24"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Pyre Pistol', tags: ['CLOSE-QUARTERS', 'IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Master-Crafted Power Weapon', tags: ['LETHAL HITS'], a: '3', ws: '2+', s: '5', ap: '-2', d: '2' },
            { name: 'Chainsword', tags: ['SUSTAINED HITS 1'], a: '6', ws: '2+', s: '4', ap: '-1', d: '1' },
            { name: 'Twin Lightning Claws', tags: ['TWIN-LINKED'], a: '5', ws: '2+', s: '5', ap: '-2', d: '1' },
          ],
          faction: 'Templar Vows',
          abilities: [
            { name: 'Exploit Their Cowardice', text: "When an enemy unit engaged with this unit is selected to make a fall-back move, after that enemy unit ends that fall-back move, if this unit is unengaged, this unit can make a normal move." },
          ],
          composition: [
            '1 Sword Brother Castellan model',
            '1 Sword Brother with Heavy Bolt Pistol and Chainsword model',
            '1 Sword Brother with Plasma Pistol and Master-crafted Power Weapon model',
            '1 Sword Brother with Pyre Pistol and Master-crafted Power Weapon model',
            '1 Sword Brother with Twin Lightning Claws model',
          ],
          loadout: `**The Sword Brother Castellan is equipped with:** Combi-Weapon; Master-Crafted Power Weapon.
**The Sword Brother with Heavy Bolt Pistol and Chainsword is equipped with:** Chainsword; Heavy Bolt Pistol.
**The Sword Brother with Plasma Pistol and Master-crafted Power Weapon is equipped with:** Master-Crafted Power Weapon; Plasma Pistol.
**The Sword Brother with Pyre Pistol and Master-crafted Power Weapon is equipped with:** Master-Crafted Power Weapon; Pyre Pistol.
**The Sword Brother with Twin Lightning Claws is equipped with:** Twin Lightning Claws.`,
          keywords: ['Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vow-Sworn of Vedrenn'],
          factionKeywords: ['Black Templars', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'vow-sworn-crusader-squad',
          name: 'Vow-Sworn Crusader Squad',
          profiles: [
            { name: 'Initiate with Heavy Bolt Pistol and Chainsword', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Initiate with Bolt Pistol, Bolt Rifle and Knives and Fists', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Sword Brother', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Initiate with Pyreblaster, Bolt Pistol and Knives and Fists', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Neophyte with Neophyte Firearm and Knives and Fists', m: '6"', t: '4', sv: '4+', w: '2', ld: '6+', oc: '2' },
            { name: 'Neophyte with Bolt Pistol and Chainsword', m: '6"', t: '4', sv: '4+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Pyreblaster', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '5', ap: '0', d: '1' },
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Bolt Rifle', tags: ['ASSAULT', 'HEAVY'], range: '24"', a: '2', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Neophyte Firearm', tags: ['ASSAULT'], range: '18"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Knives and Fists', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Chainsword', tags: ['SUSTAINED HITS 1'], a: '4', ws: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Master-crafted Power Weapon', tags: ['LETHAL HITS'], a: '3', ws: '2+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Templar Vows',
          abilities: [
            { name: 'Righteous Zeal (Once per turn, per unit)', text: "In your opponent's Shooting phase, when an enemy unit has shot, if those attacks destroyed a model in this unit and this unit is unengaged, this unit can make a surge move of up to D6+2\"." },
          ],
          composition: [
            '1 Initiate with Pyreblaster, Bolt Pistol and Knives and Fists model',
            '1 Sword Brother model',
            '2 Initiate with Bolt Pistol, Bolt Rifle and Knives and Fists models',
            '2 Initiate with Heavy Bolt Pistol and Chainsword models',
            '2 Neophyte with Bolt Pistol and Chainsword models',
            '2 Neophyte with Neophyte Firearm and Knives and Fists models',
          ],
          loadout: `**The Initiate with Pyreblaster, Bolt Pistol and Knives and Fists is equipped with:** Bolt Pistol; Knives and Fists; Pyreblaster.
**The Sword Brother is equipped with:** Heavy Bolt Pistol; Master-crafted Power Weapon.
**Every Initiate with Bolt Pistol, Bolt Rifle and Knives and Fists is equipped with:** Bolt Pistol; Bolt Rifle; Knives and Fists.
**Every Initiate with Heavy Bolt Pistol and Chainsword is equipped with:** Chainsword; Heavy Bolt Pistol.
**Every Neophyte with Bolt Pistol and Chainsword is equipped with:** Bolt Pistol; Chainsword.
**Every Neophyte with Neophyte Firearm and Knives and Fists is equipped with:** Knives and Fists; Neophyte Firearm.`,
          keywords: ['Battleline', 'Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vow-Sworn of Vedrenn'],
          factionKeywords: ['Black Templars', 'Adeptus Astartes'],
          baseSize: '28.5mm, 32mm, 40mm',
        },
        {
          id: 'vow-sworn-bladeguard-veteran-squad',
          name: 'Vow-Sworn Bladeguard Veteran Squad',
          profiles: [
            { name: 'Bladeguard Veteran Sergeant', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Bladeguard Veteran', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Neo-Volkite Pistol', tags: ['CLOSE-QUARTERS', 'DEVASTATING WOUNDS'], range: '12"', a: '1', bs: '3+', s: '5', ap: '0', d: '2' },
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Master-crafted Power Weapon', tags: [], a: '4', ws: '3+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Templar Vows',
          abilities: [
            { name: 'Bladeguard (Once per turn per unit)', text: "In the Fight phase, when this unit is selected to fight or when an enemy unit targets this unit, you can select one of the following:\n▪ This unit's melee attacks can re-roll hit rolls of 1.\n▪ Or: This unit can re-roll saving rolls of 1." },
          ],
          composition: ['1 Bladeguard Veteran Sergeant model', '2 Bladeguard Veteran models'],
          loadout: `**The Bladeguard Veteran Sergeant is equipped with:** Master-crafted Power Weapon; Neo-Volkite Pistol.
**Every Bladeguard Veteran is equipped with:** Heavy Bolt Pistol; Master-crafted Power Weapon.`,
          keywords: ['Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vow-Sworn of Vedrenn'],
          factionKeywords: ['Black Templars', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'blood-angels',
      name: 'Blood Angels',
      boxName: 'Sanguinary Spearhead',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Rapid Manoeuvres',
        flavor: 'Eschewing ranged combat in favour of honourable close-quarters battle, the Sanguinary Spearhead seek to close with the enemy as swiftly as possible.',
        body: 'Friendly Sanguinary Spearhead units can re-roll advance rolls.',
      },

      // Verbatim from the Codex armyRule (src/data/factions/blood-angels.js) — both CP-linked
      // rows (Oath of Moment, The Sons of Sanguinius) confirmed byte-for-byte identical to the
      // Codex versions.
      armyRule: {
        name: 'Oath of Moment & The Sons of Sanguinius',
        flavor: 'In battle, Space Marines swear mighty oaths to destroy the enemies of the Emperor and uphold the honour of their Chapter, and such vows are sacrosanct. When the Angels of Death strike, they do so with the precision of a surgeon and the force of a thunderbolt.',
        body: `### Oath of Moment
If your Army Faction is Adeptus Astartes, at the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your Oath of Moment target. Each time a model with this ability makes an attack that targets your Oath of Moment target, you can re-roll the Hit roll.

### The Sons of Sanguinius
▪ If an Adeptus Astartes unit has a second Faction keyword on its datasheet, that Faction keyword is the name of that unit's Chapter. For example, Lemartes has both the Adeptus Astartes and Blood Angels Faction keywords, and is therefore from the Blood Angels Chapter.
▪ You cannot include units from more than one Chapter in your army.`,
      },

      stratagems: [
        {
          name: 'Angelic Terror',
          sublabel: 'Sanguinary Spearhead – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Resplendent in burnished gold, the Sanguinary Guard plummet from the heavens like vengeful angels, striking fear into the hearts of their foes.',
          when: 'Your Command phase.',
          target: 'One friendly Sanguinary Spearhead Sanguinary Guard unit.',
          effect: 'Select one enemy unit within 3" of your unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.',
          restrictions: '',
        },
        {
          name: 'Dauntless Bravery',
          sublabel: 'Sanguinary Spearhead – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Embodying the bravery of their fallen Primarch, the Sanguinary Spearhead face certain death without fear, and shrug off blows that would fell lesser warriors.',
          when: 'Your opponent\'s Shooting phase or the Fight phase, when an enemy unit targets a friendly Sanguinary Spearhead unit that is within 3" of the centre of the battlefield.',
          target: 'That Sanguinary Spearhead unit.',
          effect: "Attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
        {
          name: 'Show No Mercy',
          sublabel: 'Sanguinary Spearhead – Stratagem',
          cp: '2CP',
          turn: 'opponent',
          flavor: 'The Blood Angels offer no mercy to their foes. Those cravens who attempt to flee the field of battle are pursued and butchered to the last.',
          when: 'Your opponent\'s Movement phase, when a unit is selected to make a fall-back move, if that unit is engaged with a friendly Sanguinary Spearhead unit.',
          target: 'That Sanguinary Spearhead unit.',
          effect: 'When an enemy unit engaged with your unit is selected to make a fall-back move, that enemy unit must use the desperate escape mode, with -1 to those hazard rolls if that enemy unit is battle-shocked.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Masterful Fighter',
          isDefault: false,
          flavor: 'The Captains of the Blood Angels Chapter walk a fine line between order and fury, fighting with consummate skill and a ferocity born of hatred.',
          body: `Sanguinary Spearhead Captain model only. This model's melee attacks have:
▪ +2 S.
▪ +1 AP.`,
        },
        {
          name: 'Overwhelming Charge',
          isDefault: true,
          upgrade: true,
          flavor: 'Speed and aggression are the hallmarks of a Blood Angels’ assault. The enemy must be given no time to rally.',
          body: 'Upgrade: Sanguinary Spearhead Assault Intercessor Squad unit only. When this unit is selected to make a pile-in move, this unit can move up to D3+3".',
        },
      ],

      datasheets: [
        {
          id: 'sanguinary-spearhead-assault-intercessor-squad',
          name: 'Sanguinary Spearhead Assault Intercessor Squad',
          profiles: [
            { name: 'Assault Intercessor Sergeant', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Assault Intercessor', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Chainsword', tags: [], a: '4', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: 'The Sons of Sanguinius',
          abilities: [
            { name: 'Targeted Intercession', text: "This unit's melee attacks:\n▪ Can re-roll wound rolls of 1.\n▪ Or: That target a unit within range of an objective can re-roll wound rolls." },
          ],
          composition: ['1 Assault Intercessor Sergeant model', '9 Assault Intercessor models'],
          loadout: `**The Assault Intercessor Sergeant is equipped with:** Chainsword; Plasma Pistol.
**Every Assault Intercessor is equipped with:** Chainsword; Heavy Bolt Pistol.`,
          keywords: ['Battleline', 'Explosives', 'Imperium', 'Infantry', 'Sanguinary Spearhead', 'Tacticus'],
          factionKeywords: ['Blood Angels', 'Adeptus Astartes'],
          baseSize: '32mm',
        },
        {
          id: 'sanguinary-spearhead-sanguinary-guard',
          name: 'Sanguinary Spearhead Sanguinary Guard',
          profiles: [
            { name: 'Sanguinary Guard with Encarmine Blade', m: '12"', t: '4', sv: '2+', w: '3', ld: '6+', oc: '1' },
            { name: 'Sanguinary Guard with Encarmine Spear', m: '12"', t: '4', sv: '2+', w: '3', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Angelus Boltgun', tags: [], range: '12"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Encarmine Blade', tags: [], a: '4', ws: '2+', s: '6', ap: '-3', d: '2' },
            { name: 'Encarmine Spear', tags: ['LANCE'], a: '4', ws: '2+', s: '6', ap: '-2', d: '2' },
          ],
          faction: 'The Sons of Sanguinius',
          abilities: [
            { name: 'Born To Fight', text: 'While this unit is engaged, this unit has +2 OC.' },
          ],
          composition: ['1 Sanguinary Guard with Encarmine Blade model', '2 Sanguinary Guard with Encarmine Spear models'],
          loadout: `**The Sanguinary Guard with Encarmine Blade is equipped with:** Angelus Boltgun; Encarmine Blade.
**Every Sanguinary Guard with Encarmine Spear is equipped with:** Angelus Boltgun; Encarmine Spear.`,
          keywords: ['Explosives', 'Fly', 'Imperium', 'Infantry', 'Jump Pack', 'Sanguinary Spearhead', 'Tacticus'],
          factionKeywords: ['Blood Angels', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'captain-raldeo',
          name: 'Captain Raldeo',
          profiles: [
            { name: 'Captain Raldeo', m: '6"', t: '4', sv: '3+', w: '5', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Inferno Pistol', tags: ['CLOSE-QUARTERS', 'MELTA 2'], range: '6"', a: '1', bs: '2+', s: '8', ap: '-4', d: 'D3' },
          ],
          melee: [
            { name: 'Master-crafted Chainsword', tags: [], a: '7', ws: '2+', s: '4', ap: '-1', d: '2' },
          ],
          faction: 'The Sons of Sanguinius',
          abilities: [
            { name: 'Targeted Intercession', text: "This unit's melee attacks:\n▪ Can re-roll wound rolls of 1.\n▪ Or: That target a unit within range of an objective can re-roll wound rolls." },
          ],
          composition: ['1 Captain Raldeo model'],
          loadout: '**This model is equipped with:** Inferno Pistol; Master-crafted Chainsword.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Sanguinary Spearhead Assault Intercessor Squad'],
          },
          keywords: ['Captain', 'Character', 'Explosives', 'Imperium', 'Infantry', 'Sanguinary Spearhead', 'Tacticus'],
          factionKeywords: ['Blood Angels', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'dark-angels',
      name: 'Dark Angels',
      boxName: 'The Vengeful Brethren',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Honoured Knights',
        flavor: 'The Dark Angels are renowned for their unswerving loyalty to their commanders and commitment to duty and honour. They meet the savagery of their enemies with disciplined defence, stoic resilience and expert bladework.',
        body: "When an enemy unit ends a charge move, friendly Vengeful Brethren units engaged with that enemy unit are in defence stance until the end of the turn:\n▪ While a unit is in defence stance, attacks that target that unit with a S greater than that unit's T have -1 to wound rolls.",
      },

      // Verbatim from the Codex armyRule (src/data/factions/dark-angels.js) — all 4 CP-linked
      // rows (Oath of Moment, The Deathwing, The Ravenwing, The Unforgiven) confirmed
      // byte-for-byte identical to the Codex versions, already combined there into one armyRule.
      armyRule: {
        name: 'Oath of Moment & The Unforgiven',
        flavor: 'None fight with more grim determination than the sons of the Lion, and their specialised companies — known as the Deathwing and the Ravenwing in the case of the Dark Angels — are the bane of their terrified foes.',
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

      stratagems: [
        {
          name: 'For the Lion',
          sublabel: 'The Vengeful Brethren – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Evoking the name of their risen Primarch, these warriors stride boldly towards their objectives and leave the enemy in no doubt as to their might.',
          when: 'Command phase.',
          target: 'One friendly Vengeful Brethren unit.',
          effect: 'Your unit has +1 OC until the end of the turn.',
          restrictions: '',
        },
        {
          name: 'Mission Focus',
          sublabel: 'The Vengeful Brethren – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The Dark Angels are determined to achieve their objectives and will spend every iota of their strength to secure victory. Those who attempt to halt them in their tracks are cut down without mercy.',
          when: 'Your Shooting phase or the Fight phase, when a friendly Vengeful Brethren unit within range of an objective is selected to attack.',
          target: 'That Vengeful Brethren unit.',
          effect: "Your unit's attacks have +1 to hit rolls.",
          restrictions: '',
        },
        {
          name: 'Determined to the Last',
          sublabel: 'The Vengeful Brethren – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Among the most skilled warriors in their Chapter, Bladeguard Veterans are resolute in the face of the enemy, fighting through even the most grievous wounds to see their duty done.',
          when: 'Fight phase, when an enemy unit targets a friendly Vengeful Brethren Bladeguard Veteran Squad unit.',
          target: 'That Vengeful Brethren Bladeguard Veteran Squad unit.',
          effect: 'When a model in your unit is destroyed, if your unit has not been selected to fight this phase, roll one D6:\n▪ On a 2+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Supreme Combatant',
          isDefault: false,
          flavor: 'An exemplar of the Dark Angels’ relentless determination to duty, this warrior shirks from no fight, demonstrating skill and strength enough to topple almost any foe.',
          body: `Vengeful Brethren Gravis Captain model only. When this unit is selected to attack, this unit's attacks have:
▪ [LETHAL HITS].
▪ Or: [SUSTAINED HITS 1].`,
        },
        {
          name: 'Dutiful Defenders',
          isDefault: true,
          upgrade: true,
          flavor: 'Tasked with shielding their brethren from harm, these veteran warriors rush to engage and hack down any who threaten their battle-brothers.',
          body: 'Upgrade: Vengeful Brethren Bladeguard Veteran Squad unit only. (Once per battle round, per army) When you target this unit with the Heroic Intervention stratagem, that use is -1 CP.',
        },
      ],

      datasheets: [
        {
          id: 'vengeful-brethren-bladeguard-veteran-squad',
          name: 'Vengeful Brethren Bladeguard Veteran Squad',
          profiles: [
            { name: 'Bladeguard Veteran', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Bladeguard Veteran Sergeant', m: '6"', t: '3', sv: '3+', w: '3', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Heavy Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '18"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Master-crafted Power Weapon', tags: [], a: '4', ws: '3+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Oath of Moment & The Unforgiven',
          abilities: [
            // Reconstructed from a garbled/malformed appdata text block (broken mid-sentence
            // HTML tags) — the underlying game text (two alternative +1 hit / -1 hit effects) is
            // unambiguous from context; only the markup was corrupted.
            { name: 'Bladeguard (Once per turn per unit)', text: "In the Fight phase, when this unit is selected to fight or when an enemy unit targets this unit, you can select one of the following:\n▪ This unit's melee attacks have +1 to hit rolls.\n▪ Or: Attacks that target this unit have -1 to hit rolls." },
          ],
          composition: ['1 Bladeguard Veteran Sergeant model', '2 Bladeguard Veteran models'],
          loadout: '**Every model is equipped with:** Heavy Bolt Pistol; Master-crafted Power Weapon.',
          keywords: ['Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vengeful Brethren'],
          factionKeywords: ['Dark Angels', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'master-zacharial',
          name: 'Master Zacharial',
          profiles: [
            { name: 'Master Zacharial', m: '5"', t: '6', sv: '3+', w: '6', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Boltstorm Gauntlet', tags: ['CLOSE-QUARTERS'], range: '12"', a: '3', bs: '2+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Power Fist', tags: [], a: '5', ws: '2+', s: '8', ap: '-2', d: '2' },
            { name: 'Relic Chainsword', tags: ['EXTRA ATTACKS'], a: '3', ws: '2+', s: '4', ap: '-1', d: '2' },
          ],
          faction: 'Oath of Moment & The Unforgiven',
          abilities: [
            { name: 'Gravis Protection', text: 'Attacks that target this unit have -1 D.' },
          ],
          composition: ['1 Master Zacharial model'],
          loadout: '**This model is equipped with:** Boltstorm Gauntlet; Power Fist; Relic Chainsword.',
          keywords: ['Captain', 'Character', 'Gravis', 'Imperium', 'Infantry', 'Vengeful Brethren'],
          factionKeywords: ['Dark Angels', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'vengeful-brethren-hellblaster-squad',
          name: 'Vengeful Brethren Hellblaster Squad',
          profiles: [
            { name: 'Hellblaster Sergeant', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '1' },
            { name: 'Hellblaster', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Plasma Incinerator – Standard', tags: ['ASSAULT', 'HEAVY'], range: '24"', a: '2', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Incinerator – Supercharge', tags: ['ASSAULT', 'HAZARDOUS', 'HEAVY'], range: '24"', a: '2', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Knives and Fists', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Oath of Moment & The Unforgiven',
          abilities: [
            { name: 'Punishing Volley', text: 'In your Shooting phase, when this unit has shot, select one enemy unit hit by those attacks. That unit makes a battle-shock roll.' },
          ],
          composition: ['1 Hellblaster Sergeant model', '4 Hellblaster models'],
          loadout: '**Every model is equipped with:** Bolt Pistol; Knives and Fists; Plasma Incinerator.',
          keywords: ['Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vengeful Brethren'],
          factionKeywords: ['Dark Angels', 'Adeptus Astartes'],
          baseSize: '32mm',
        },
        {
          id: 'vengeful-brethren-intercessor-squad',
          name: 'Vengeful Brethren Intercessor Squad',
          profiles: [
            { name: 'Intercessor Sergeant', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Intercessor', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Bolt Rifle', tags: ['ASSAULT', 'HEAVY'], range: '24"', a: '2', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Knives and Fists', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Oath of Moment & The Unforgiven',
          abilities: [
            { name: 'Objective Secured', text: 'At the end of your Command phase, if this unit is controlling an objective, that objective is secured.' },
          ],
          composition: ['1 Intercessor Sergeant model', '9 Intercessor models'],
          loadout: '**Every model is equipped with:** Bolt Pistol; Bolt Rifle; Knives and Fists.',
          keywords: ['Battleline', 'Explosives', 'Imperium', 'Infantry', 'Tacticus', 'Vengeful Brethren'],
          factionKeywords: ['Dark Angels', 'Adeptus Astartes'],
          baseSize: '32mm',
        },
      ],
    },

    {
      slug: 'death-guard',
      name: 'Death Guard',
      boxName: 'Maggot Lords',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Creeping Rot',
        flavor: 'A bow-wave of contagion precedes the Maggot Lords. From this miasma of pungent filth they stride, looming close as the foe struggle to suppress their terror and muster a defence.',
        body: 'Friendly Maggot Lords Terminator units have Scouts 3".',
      },

      // Verbatim from the Codex armyRule (src/data/factions/death-guard.js) — the CP box's
      // "Nurgle's Gift (Aura)" row is byte-for-byte identical to wh11ed's existing text (which
      // itself already matches the CP/box wording rather than the Codex's narrower "melee attack"
      // phrasing for Skullsquirm Blight — see the Codex file for that pre-existing note); "Pact
      // of Decay" is verbatim identical between CP and Codex.
      armyRule: {
        name: "Nurgle's Gift (Aura) & Pact of Decay",
        flavor: 'The Death Guard are warriors of the Plague God Nurgle. Their bloated bodies are riddled with corruption, and their mere presence causes the foe to sicken and wither in the grip of supernatural diseases while the battlefield falls to rot and ruin around them.',
        body: `If your Army Faction is Death Guard, while an enemy unit is within Contagion Range of one or more Death Guard models from your army, it is Afflicted (see below).

### Contagion Range
Contagion Range changes over the course of the battle:
▪ During the first battle round: Contagion Range 3".
▪ Second battle round onwards: Contagion Range 6".
▪ Contagion Range cannot be greater than 12" after modifiers.

### Afflicted
During the Declare Battle Formations step, select one of the Plagues below. Until the end of the battle, while an enemy unit is Afflicted, subtract 1 from the Toughness characteristic of models in that unit, and that unit has the effect of your chosen Plague.
▪ Skullsquirm Blight: Each time a model in this unit makes an attack, subtract 1 from the Hit roll.
▪ Rattlejoint Ague: Worsen the Save characteristic of models in this unit by 1.
▪ Scabrous Soulrot: Worsen the Move, Leadership and Objective Control characteristics of models in this unit by 1 (this rule can only worsen a model's Objective Control characteristic to a minimum of 1).

**Pact of Decay:** When mustering your army, unless specifically stated otherwise, you cannot select Plague Legions as your Army Faction.`,
      },

      stratagems: [
        {
          name: 'Inexorable Executioners',
          sublabel: 'Maggot Lords – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Ponderous though the Deathshroud may appear, they are unrelenting in their pursuit of the enemy. Those who block their path are swept aside as if they were little more than crawling vermin.',
          when: 'Your Charge phase, when a friendly Maggot Lords Deathshroud Terminators unit starts a charge move.',
          target: 'That Maggot Lords Deathshroud Terminators unit.',
          effect: 'Your unit can move through models (excluding Monster/Vehicle models).',
          restrictions: '',
        },
        {
          name: 'Vomitous Salvoes',
          sublabel: 'Maggot Lords – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Retching and heaving like living things, the weapons of the Death Guard eject an overwhelming hail of projectiles, foul infectious matter and squealing parasites that saturate the ranks of the foe.',
          when: 'Your Shooting phase, when a friendly Maggot Lords Plague Marines unit is selected to shoot.',
          target: 'That Maggot Lords Plague Marines unit.',
          effect: "Your unit's Lethal Hits ranged attacks have [RAPID FIRE 1].",
          restrictions: '',
        },
        {
          name: 'Sickening Horror',
          sublabel: 'Maggot Lords – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'A wave of supernatural dread and all-too-natural revulsion washes across the foe as the Death Guard approach.',
          when: 'Start of the Fight phase.',
          target: 'One friendly Maggot Lords Infantry unit.',
          effect: 'Select one enemy unit engaged with your unit. That enemy unit makes a battle-shock roll.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Noisome Veil',
          isDefault: false,
          flavor: 'A noxious shroud rises around the Tallyman, obscuring his form as he lumbers across the battlefield, monotonous incantations and droning enumerations still rumbling from his vox-emitter.',
          body: "Maggot Lords Tallyman model only. (Once per battle, per army) In your opponent's Shooting phase, when an enemy unit targets this unit, you can use this ability. If you do, this unit has Stealth.",
        },
        {
          name: 'Bountiful Regeneration',
          isDefault: true,
          flavor: 'No matter the harm done to this warrior, the unclean vitality that seethes within their body constantly repairs the damage with fresh layers of rancid fat, bubbling buboes and mutant flesh.',
          body: 'Maggot Lords Lord of Virulence model only. In your Command phase, this model heals 1 wound.',
        },
      ],

      datasheets: [
        {
          id: 'sholgor-the-putrid',
          name: 'Sholgor the Putrid',
          profiles: [
            { name: 'Sholgor the Putrid', m: '5"', t: '7', sv: '2+', w: '6', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Twin Plague Spewer', tags: ['ANTI-INFANTRY 2+', 'IGNORES COVER', 'TORRENT', 'TWIN-LINKED'], range: '12"', a: 'D6', bs: '-', s: '5', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Power Fist', tags: ['LETHAL HITS'], a: '5', ws: '2+', s: '8', ap: '-2', d: '2' },
          ],
          faction: "Nurgle's Gift (Aura) & Pact of Decay",
          abilities: [
            { name: 'Enemy Spotted', text: 'At the start of your Shooting phase, you can select one enemy unit within 18" of this model. That unit has +6" detection range.' },
          ],
          composition: ['1 Sholgor the Putrid model'],
          loadout: '**This model is equipped with:** Power Fist; Twin Plague Spewer.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Maggot Lords Deathshroud Terminators'],
          },
          keywords: ['Chaos', 'Character', 'Infantry', 'Lord of Virulence', 'Maggot Lords', 'Nurgle', 'Terminator'],
          factionKeywords: ['Death Guard'],
          baseSize: '50mm',
        },
        {
          id: 'maggot-lords-chaos-rhino',
          name: 'Maggot Lords Chaos Rhino',
          profiles: [
            { name: 'Maggot Lords Chaos Rhino', m: '12"', t: '9', sv: '3+', w: '10', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Havoc Launcher', tags: ['BLAST 1'], range: '48"', a: 'D6', bs: '3+', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Armoured Tracks', tags: [], a: '3', ws: '4+', s: '6', ap: '0', d: '1' },
          ],
          faction: "Nurgle's Gift (Aura) & Pact of Decay",
          transport: 'This model has a transport capacity of 12 Death Guard models. It cannot transport Terminator models.',
          composition: ['1 Chaos Rhino model'],
          loadout: '**This model is equipped with:** Armoured Tracks; Havoc Launcher.',
          keywords: ['Chaos', 'Dedicated Transport', 'Maggot Lords', 'Nurgle', 'Smoke', 'Transport', 'Vehicle'],
          factionKeywords: ['Death Guard'],
          baseSize: 'None',
        },
        {
          id: 'maggot-lords-deathshroud-terminators',
          name: 'Maggot Lords Deathshroud Terminators',
          profiles: [
            { name: 'Deathshroud Terminator', m: '5"', t: '7', sv: '2+', w: '4', ld: '6+', oc: '1', inv: '4+' },
            { name: 'Deathshroud Champion', m: '5"', t: '7', sv: '2+', w: '4', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Plaguespurt Gauntlet', tags: ['ANTI-INFANTRY 4+', 'CLOSE-QUARTERS', 'IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Manreaper – Strike', tags: ['LETHAL HITS'], a: '4', ws: '2+', s: '8', ap: '-2', d: '2' },
            { name: 'Manreaper – Sweep', tags: ['LETHAL HITS'], a: '8', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: "Nurgle's Gift (Aura) & Pact of Decay",
          abilities: [
            { name: 'Obstinate Resistance', text: 'While this unit is engaged, this unit has +1 OC.' },
          ],
          composition: ['1 Deathshroud Champion model', '2 Deathshroud Terminator models'],
          loadout: '**Every model is equipped with:** Manreaper; Plaguespurt Gauntlet.',
          keywords: ['Chaos', 'Infantry', 'Maggot Lords', 'Nurgle', 'Terminator'],
          factionKeywords: ['Death Guard'],
          baseSize: '40mm',
        },
        {
          id: 'septimol-fulg-maggot-lords-tallyman',
          name: 'Septimol Fulg, Maggot Lords Tallyman',
          profiles: [
            { name: 'Septimol Fulg', m: '5"', t: '6', sv: '3+', w: '4', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Numerological Artefacts', tags: [], a: '4', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          faction: "Nurgle's Gift (Aura) & Pact of Decay",
          abilities: [
            { name: 'Sevenfold Chant', text: 'In your Command phase, if this model is on the battlefield, roll 2D6:\n▪ On a 7+, you gain 1 CP.' },
            { name: 'Malicious Calculations', text: 'This unit\'s attacks can ignore modifiers to:\n▪ BS.\n▪ WS.\n▪ Hit rolls.' },
          ],
          composition: ['1 Septimol Fulg model'],
          loadout: '**This model is equipped with:** Numerological Artefacts; Plasma Pistol.',
          keywords: ['Chaos', 'Character', 'Infantry', 'Maggot Lords', 'Nurgle', 'Tallyman'],
          factionKeywords: ['Death Guard'],
          baseSize: '40mm',
        },
        {
          id: 'maggot-lords-plague-marines',
          name: 'Maggot Lords Plague Marines',
          profiles: [
            { name: 'Plague Marine with Plague Spewer', m: '5"', t: '6', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Plague Marine', m: '5"', t: '6', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Plague Champion', m: '5"', t: '6', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Plague Marine with Blight Launcher', m: '5"', t: '6', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Blight Launcher', tags: ['BLAST 1', 'LETHAL HITS'], range: '24"', a: 'D3', bs: '3+', s: '6', ap: '-1', d: '2' },
            { name: 'Plague Spewer', tags: ['ANTI-INFANTRY 2+', 'IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '5', ap: '-1', d: '1' },
            { name: 'Boltgun', tags: ['LETHAL HITS'], range: '24"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Power Fist', tags: ['LETHAL HITS'], a: '3', ws: '3+', s: '8', ap: '-2', d: '2' },
            { name: 'Plague Knives', tags: ['LETHAL HITS'], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          faction: "Nurgle's Gift (Aura) & Pact of Decay",
          abilities: [
            { name: 'Infused with the Blessings of Nurgle', text: 'In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those ranged attacks. If you do, that enemy unit is Afflicted until the start of your next turn.' },
          ],
          composition: [
            '1 Plague Champion model',
            '1 Plague Marine with Blight Launcher model',
            '1 Plague Marine with Plague Spewer model',
            '4 Plague Marine models',
          ],
          loadout: `**The Plague Champion is equipped with:** Plasma Pistol; Power Fist.
**The Plague Marine with Blight Launcher is equipped with:** Blight Launcher; Plague Knives.
**The Plague Marine with Plague Spewer is equipped with:** Plague Knives; Plague Spewer.
**Every Plague Marine is equipped with:** Boltgun; Plague Knives.`,
          keywords: ['Battleline', 'Chaos', 'Explosives', 'Infantry', 'Maggot Lords', 'Nurgle'],
          factionKeywords: ['Death Guard'],
          baseSize: '32mm',
        },
      ],
    },

    {
      slug: 'drukhari',
      name: 'Drukhari',
      boxName: 'Coven of Agonies',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Pain Enlivens',
        flavor: 'All pain nourishes the souls of nearby Drukhari, even the suffering of their own.',
        body: 'When a friendly Coven of Agonies unit is destroyed, you gain 1 Pain token.',
      },

      // Verbatim from the Codex armyRule (src/data/factions/drukhari.js) — both CP-linked rows
      // (Power From Pain, Corsairs and Travelling Players) confirmed byte-for-byte identical to
      // the Codex versions.
      armyRule: {
        name: 'Power From Pain',
        flavor: 'The Drukhari feed on suffering and terror. Every arc of blood that jets from a blade-slit artery, every scream of agonised horror, every vertiginous moment of shock or despair experienced by their prey surges through the Drukhari like an intoxicant. As the battle rages, the denizens of the Dark City drink deep of the floodtide of pain.',
        body: `### Pain Abilities
All Drukhari units have a Pain ability, tagged with the word 'Pain'. Pain abilities only apply to a unit while it is Empowered. If your Army Faction is Drukhari, you can Empower units from your army with Pain abilities by spending Pain tokens (see below).

### Gaining Pain Tokens
If your Army Faction is Drukhari, you gain Pain tokens as follows:
▪ 1 Pain token at the start of your Command phase.
▪ 1 Pain token each time an enemy unit is destroyed.
▪ 1 Pain token each time an enemy unit fails a Battle-shock test.

Each time you gain a Pain token, keep it to one side — this is your Pain token pool. Each time you spend a Pain token, reduce your Pain token pool by the same amount.

### Empowered Through Pain
Each Pain ability will state when you can spend Pain tokens to Empower that unit. When you do, until the end of the phase, that unit is Empowered and all Pain abilities it has take effect. While an Attached unit is Empowered, the Pain abilities of all Leader and Bodyguard units in that unit take effect — you do not need to spend additional Pain tokens to activate each of those Pain abilities.

### Corsairs and Travelling Players
If your Army Faction is Drukhari, you can include Harlequins and Anhrathe units in your army, even though they do not have the Drukhari Faction keyword. No Harlequins or Anhrathe models included in your army in this way can be your Warlord, and they cannot be given Enhancements.`,
      },

      stratagems: [
        {
          name: 'Hardened Physiology',
          sublabel: 'Coven of Agonies – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Nuul’s Exquisite fleshcraft and alchemical tinkering have provided his Wracks with formidable, hardened skin, quite capable of absorbing bullets and deflecting blades.',
          when: "Your opponent's Shooting phase or the Fight phase, when an enemy unit targets a friendly Coven of Agonies Wracks unit.",
          target: 'That Coven of Agonies Wracks unit.',
          effect: 'Attacks that target your unit have -1 to wound rolls.',
          restrictions: '',
        },
        {
          name: 'Powerful Creations',
          sublabel: 'Coven of Agonies – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Drawing upon the alchemical might of the dark sciences that fashioned it, this Pain Engine rampages across the battlefield with nightmarish vitality.',
          when: 'Fight phase, when a friendly Coven of Agonies Monster unit is selected to fight.',
          target: 'That Coven of Agonies Monster unit.',
          effect: `▪ Your unit's attacks that target a Monster/Vehicle unit have +1 to wound rolls.
▪ Your unit's attacks that target a Monster/Vehicle unit have +1 AP.`,
          restrictions: '',
        },
        {
          name: 'Agonising Onslaught',
          sublabel: 'Coven of Agonies – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Driven to inflict maximum agony upon their targets, Nuul’s menagerie unleashes relentless fusillades or flurries of savage blows, channelling harvested pain to empower their efforts.',
          when: 'Your Shooting phase or the Fight phase, when a friendly Coven of Agonies unit is selected to attack.',
          target: 'That Coven of Agonies unit.',
          effect: `▪ Your unit's attacks can re-roll hit rolls of 1.
▪ Or: If you spend 1 Pain token, your unit's attacks can re-roll hit rolls.`,
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Toxin-laced Blades',
          isDefault: false,
          flavor: 'Masters of alchemy and dark science, Haemonculi excel at creating potent toxins whose effects are almost always grotesque and lethal. They coat their blades with these poisons prior to battle and delight in testing them upon the foe.',
          body: "Coven of Agonies Haemonculus model only. This unit's melee attacks have +1 AP.",
        },
        {
          name: 'Superior Soulcraft',
          isDefault: true,
          upgrade: true,
          flavor: 'Crafted by Xatrophos Nuul’s own hand, this Cronos’ soul-draining weapons have been refined by the Haemonculus, rendering their agonising effects even more pronounced and horrific.',
          body: 'Upgrade: Coven of Agonies Cronos unit only. This unit can re-roll rolls to determine the A of a weapon.',
        },
      ],

      datasheets: [
        {
          id: 'coven-of-agonies-wracks',
          name: 'Coven of Agonies Wracks',
          profiles: [
            { name: 'Wrack', m: '7"', t: '4', sv: '5+', w: '2', ld: '7+', oc: '2' },
            { name: 'Wrack with Ossefactor', m: '7"', t: '4', sv: '5+', w: '2', ld: '7+', oc: '2' },
            { name: 'Acothyst', m: '7"', t: '4', sv: '5+', w: '2', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Hexrifle', tags: ['HEAVY', 'PRECISION'], range: '36"', a: '1', bs: '3+', s: '8', ap: '-2', d: '3' },
            { name: 'Ossefactor', tags: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS'], range: '24"', a: '1', bs: '3+', s: '2', ap: '-2', d: '2' },
          ],
          melee: [
            { name: "Torturer's Tool", tags: [], a: '2', ws: '3+', s: '4', ap: '-1', d: '1' },
            { name: "Twin Torturer's Tools", tags: ['ANTI-INFANTRY 4+', 'TWIN-LINKED'], a: '2', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: 'Power From Pain',
          abilities: [
            { name: 'Torturer’s Craft', text: 'In your Shooting phase or the Fight phase, after this unit has attacked, you can select one enemy unit (excluding Vehicle units) hit by those attacks. That enemy unit makes a battle-shock roll.' },
            { name: 'Experimental Enhancements (Pain)', text: "In the Fight phase, when this unit is selected to fight, you can spend 1 Pain token to Empower this unit. If you do:\n▪ This unit's melee attacks (excluding Character models' attacks) have 3 A.\n▪ Or: This unit's melee attacks (excluding Character models' attacks) have 4 A and [HAZARDOUS]." },
          ],
          composition: ['1 Acothyst model', '1 Wrack with Ossefactor model', '3 Wrack models'],
          loadout: `**The Acothyst is equipped with:** Hexrifle; Torturer's Tool.
**The Wrack with Ossefactor is equipped with:** Ossefactor; Torturer's Tool.
**Every Wrack is equipped with:** Twin Torturer's Tools.`,
          keywords: ['Aeldari', 'Battleline', 'Coven of Agonies', 'Haemonculus Covens', 'Infantry'],
          factionKeywords: ['Drukhari'],
          baseSize: '25mm',
        },
        {
          id: 'coven-of-agonies-talos',
          name: 'Coven of Agonies Talos',
          profiles: [
            { name: 'Coven of Agonies Talos', m: '7"', t: '7', sv: '3+', w: '7', ld: '7+', oc: '2', inv: '6+' },
          ],
          ranged: [
            { name: 'Twin Liquifier Gun', tags: ['ANTI-INFANTRY 3+', 'TORRENT', 'TWIN-LINKED'], range: '12"', a: 'D6', bs: '-', s: '4', ap: '-1', d: '1' },
            { name: 'Twin Splinter Cannon', tags: ['ANTI-INFANTRY 3+', 'SUSTAINED HITS 1', 'TWIN-LINKED'], range: '36"', a: '3', bs: '3+', s: '3', ap: '-1', d: '2' },
          ],
          melee: [
            { name: 'Chain-flails', tags: [], a: '8', ws: '3+', s: '6', ap: '-1', d: '1' },
          ],
          faction: 'Power From Pain',
          abilities: [
            { name: 'Mindless Killing Machines (Pain)', text: 'At the start of the Fight phase, you can spend 1 Pain token to Empower this unit. If you do, when a model in this unit is destroyed, if this unit has not been selected to fight this phase, roll one D6: on a 2+, do not remove that model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.' },
            { name: 'Torture Device', text: 'When this unit destroys an enemy unit, you gain 1 Pain token.' },
          ],
          composition: ['1 Talos model'],
          loadout: '**This model is equipped with:** Chain-flails; Twin Liquifier Gun; Twin Splinter Cannon.',
          keywords: ['Aeldari', 'Coven of Agonies', 'Fly', 'Haemonculus Covens', 'Monster'],
          factionKeywords: ['Drukhari'],
          baseSize: 'Large Flying Base',
        },
        {
          id: 'coven-of-agonies-cronos',
          name: 'Coven of Agonies Cronos',
          profiles: [
            { name: 'Coven of Agonies Cronos', m: '7"', t: '7', sv: '3+', w: '7', ld: '7+', oc: '2', inv: '6+' },
          ],
          ranged: [
            { name: 'Spirit Syphon', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '5', ap: '-1', d: '1' },
            { name: 'Spirit Vortex', tags: ['BLAST 1', 'IGNORES COVER'], range: '18"', a: 'D6', bs: '3+', s: '5', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Spirit Leech tentacles', tags: ['ANTI-INFANTRY 2+'], a: '6', ws: '3+', s: '5', ap: '-1', d: '1' },
          ],
          faction: 'Power From Pain',
          abilities: [
            { name: 'Empowered Engines (Pain)', text: 'When this unit is selected to make a normal/advance/fall-back move, you can spend 1 Pain token to Empower this unit. If you do, this unit has +2" M.' },
            { name: 'Pain Engine (Aura)', text: 'While a friendly unit is within 9" of this unit, when you spend 1 Pain token to Empower that friendly unit, roll one D6, with +1 to the result if a model in this unit does not have a spirit vortex weapon:\n▪ On a 5+, you gain 1 Pain token.' },
          ],
          composition: ['1 Cronos model'],
          loadout: '**This model is equipped with:** Spirit Leech tentacles; Spirit Syphon; Spirit Vortex.',
          keywords: ['Aeldari', 'Coven of Agonies', 'Fly', 'Haemonculus Covens', 'Monster'],
          factionKeywords: ['Drukhari'],
          baseSize: 'Large Flying Base',
        },
        {
          id: 'xatrophos-nuul',
          name: 'Xatrophos Nuul',
          profiles: [
            { name: 'Xatrophos Nuul', m: '7"', t: '4', sv: '5+', w: '5', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Stinger Pistol', tags: ['ANTI-INFANTRY 2+', 'CLOSE-QUARTERS', 'PRECISION'], range: '12"', a: '1', bs: '2+', s: '2', ap: '-1', d: 'D3' },
          ],
          melee: [
            { name: 'Haemonculus Tools and Scissorhands', tags: ['ANTI-INFANTRY 2+', 'PRECISION'], a: '5', ws: '2+', s: '3', ap: '-1', d: 'D3' },
          ],
          faction: 'Power From Pain',
          abilities: [
            { name: 'Pain Adept', text: 'In your Command phase, if a model with this ability is on the battlefield, roll one D6:\n▪ On a 4+, you gain 1 Pain token.' },
            { name: 'Fear Incarnate (Aura)', text: 'While an enemy unit is within 6" of this model:\n▪ That enemy unit has -1 Ld.\n▪ In the Battle-shock step of your opponent\'s Command phase, if that enemy unit is below starting strength, it makes a battle-shock roll.' },
            { name: 'Vile Weaponry (Pain)', text: "In the Fight phase, when this unit is selected to fight, you can spend 1 Pain token to Empower this unit. If you do, this model's attacks have 3 D." },
          ],
          composition: ['1 Xatrophos Nuul model'],
          loadout: '**This model is equipped with:** Haemonculus Tools and Scissorhands; Stinger Pistol.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Coven of Agonies Wracks'],
          },
          keywords: ['Aeldari', 'Character', 'Coven of Agonies', 'Haemonculus', 'Haemonculus Covens', 'Infantry'],
          factionKeywords: ['Drukhari'],
          baseSize: '25mm',
        },
      ],
    },

    {
      slug: 'emperors-children',
      name: 'Emperor’s Children',
      boxName: 'Callous Blades',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Nimble Strikes',
        flavor: 'The Callous Blades fight with consummate skill and grace, dancing through allies and enemies alike to land the killing blow on their chosen prey.',
        body: 'When friendly Callous Blades units start a normal/advance/charge move, those units can move through models (excluding Monster/Vehicle models).',
      },

      // Verbatim from the Codex armyRule (src/data/factions/emperors-children.js) — both
      // CP-linked rows (Thrill Seekers, Pact of Excess) confirmed byte-for-byte identical to
      // the Codex versions.
      armyRule: {
        name: 'Thrill Seekers',
        flavor: 'The Emperor’s Children are skilled warriors all, their transhuman might enhanced by a lifetime of ceaseless conflict. Their ingrained desire for sensation in all its forms sees them move rapidly across the battlefield, flitting between targets as they attempt to satiate their never-ending hunger for fresh experience.',
        body: `If your Army Faction is Emperor's Children, this unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back, but when doing so:
▪ It cannot target a unit it was within Engagement Range of at the start of the turn.
▪ It cannot target a unit that was the target of another unit's charge or attack this phase.

### Pact of Excess
When mustering your army, unless specifically stated otherwise, you cannot select Legions of Excess as your Army Faction.`,
      },

      stratagems: [
        {
          name: 'Duellist’s Death',
          sublabel: 'Callous Blades – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The Emperor’s Children are perfectionists to the last. Even in death, they seek to satisfy their violent obsessions.',
          when: 'Fight phase, when an enemy unit targets a friendly Callous Blades unit.',
          target: 'That Callous Blades unit.',
          effect: 'When a model in your unit is destroyed, if your unit has not been selected to fight this phase, roll one D6, with +1 to the result if your unit has Flawless Blades:\n▪ On a 4+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.',
          restrictions: '',
        },
        {
          name: 'Shatter Strike',
          sublabel: 'Callous Blades – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Allying power to grace, the Flawless Blades cut down their foes in a few brutally efficient strikes.',
          when: 'Fight phase, when a friendly Callous Blades Flawless Blades unit is selected to fight.',
          target: 'That Callous Blades Flawless Blades unit.',
          effect: "Your unit's melee attacks have +1 D.",
          restrictions: '',
        },
        {
          name: 'Profane Desecration',
          sublabel: 'Callous Blades – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Through horrific ritual, empyric rite and grotesque banners of writhing flesh, the followers of Slaanesh stake their claim upon the battleground.',
          when: 'End of your Movement phase.',
          target: 'One friendly Callous Blades unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Invigorating Agonies',
          isDefault: false,
          flavor: 'The Emperor’s Children seek experience and sensation in all its forms. The impact of bullets and searing energy blasts only serves to stir these debased warriors to new heights of ecstasy and goad them on.',
          body: "Callous Blades Lord Exultant model only. (Once per battle, per army) In your opponent's Shooting phase, when an enemy unit has shot, if this unit was hit by those attacks, you can use this ability. If you do, this unit can make a surge move of up to D3+1\".",
        },
        {
          name: 'Martial Perfection',
          isDefault: true,
          upgrade: true,
          flavor: 'The Callous Blades wield their weapons with preternatural skill and grace, deflecting incoming blows with contemptuous ease.',
          body: 'Upgrade: Callous Blades Infractors unit only. (Once per battle, per army) In the Fight phase, when an enemy unit targets this unit, you can use this ability. If you do, attacks that target your unit have -1 to hit rolls.',
        },
      ],

      datasheets: [
        {
          id: 'callous-blades-flawless-blades',
          name: 'Callous Blades Flawless Blades',
          profiles: [
            { name: 'Flawless Blades', m: '8"', t: '5', sv: '3+', w: '3', ld: '6+', oc: '1', inv: '5+' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Blissblade', tags: [], a: '4', ws: '2+', s: '6', ap: '-3', d: '2' },
          ],
          faction: 'Thrill Seekers',
          abilities: [
            { name: 'Daemonic Patrons', text: "When this unit is selected to fight, you can use this ability. If you do:\n▪ This unit's melee attacks score a critical wound on an unmodified 3+.\n▪ When this unit has fought, if those attacks did not destroy an enemy model, one model in this unit is destroyed." },
          ],
          composition: ['3 Flawless Blades models'],
          loadout: '**Every model is equipped with:** Blissblade; Bolt Pistol.',
          keywords: ['Callous Blades', 'Chaos', 'Explosives', 'Infantry', 'Slaanesh'],
          factionKeywords: ['Emperor’s Children'],
          baseSize: '40mm',
        },
        {
          id: 'lord-kaphrael-of-the-callous-blades',
          name: 'Lord Kaphrael of the Callous Blades',
          profiles: [
            { name: 'Lord Kaphrael', m: '7"', t: '4', sv: '3+', w: '5', ld: '6+', oc: '1', inv: '4+' },
          ],
          melee: [
            { name: 'Phoenix Power Spear', tags: ['LANCE'], a: '5', ws: '2+', s: '7', ap: '-2', d: '2' },
            { name: 'Power Fist', tags: [], a: '5', ws: '2+', s: '8', ap: '-2', d: '2' },
          ],
          faction: 'Thrill Seekers',
          abilities: [
            { name: 'Peerless Killer', text: "This unit's attacks have [LETHAL HITS]." },
          ],
          composition: ['1 Lord Kaphrael model'],
          loadout: '**This model is equipped with:** Phoenix Power Spear; Power Fist.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Callous Blades Infractors'],
          },
          keywords: ['Callous Blades', 'Chaos', 'Character', 'Explosives', 'Infantry', 'Lord Exultant', 'Slaanesh'],
          factionKeywords: ['Emperor’s Children'],
          baseSize: '40mm',
        },
        {
          id: 'callous-blades-infractors',
          name: 'Callous Blades Infractors',
          profiles: [
            { name: 'Obsessionist', m: '7"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Infractor', m: '7"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Power Sword', tags: ['PRECISION'], a: '4', ws: '3+', s: '5', ap: '-2', d: '1' },
            { name: 'Duelling Sabre', tags: ['PRECISION'], a: '4', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: 'Thrill Seekers',
          abilities: [
            { name: 'Icon of Excess', text: 'At the end of your Shooting phase or the Fight phase, if this unit destroyed an enemy unit this phase, this unit makes a leadership roll:\n▪ On a success, you gain 1 CP.' },
            { name: 'Excessive Assault', text: "This unit's melee attacks:\n▪ Can re-roll wound rolls of 1.\n▪ Or: That target a unit within range of an objective can re-roll wound rolls." },
          ],
          composition: ['1 Obsessionist model', '9 Infractor models'],
          loadout: `**The Obsessionist is equipped with:** Bolt Pistol; Power Sword.
**Every Infractor is equipped with:** Bolt Pistol; Duelling Sabre.`,
          keywords: ['Battleline', 'Callous Blades', 'Chaos', 'Explosives', 'Infantry', 'Slaanesh'],
          factionKeywords: ['Emperor’s Children'],
          baseSize: '32mm',
        },
      ],
    },

    {
      slug: 'genestealer-cults',
      name: 'Genestealer Cults',
      boxName: 'Claw of Ascension',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Xenos Resilience',
        flavor: 'Regardless of how human they may look, all Genestealer Cultists are genetic chimaeras. The fusion of human and xenos genetics often results in tougher skin, the growth of chitinous plates and other mutations that provide considerable defence against incoming fire.',
        body: "Ranged attacks that target friendly Claw of Ascension units with a S greater than that unit's T have -1 to wound rolls.",
      },

      // This box's own copy is CP-specific (fixed at 2 Resurgence points, with unit-specific
      // reincarnation costs for this box's own datasheets) rather than a reworded copy of the
      // Codex's battle-size-scaled version — transcribed from appdata as printed (its "Atalal
      // Jackals" typo corrected to "Atalan Jackals" to match the actual datasheet name).
      armyRule: {
        name: 'Cult Ambush',
        flavor: 'Genestealer Cults keep their fighting strength carefully hidden from their oppressors until the glorious Day of Ascension arrives. Even as most rise up amidst raging battle, reinforcements slip from the shadows or spill up from the dark places below, called to war by the Broodmind.',
        body: `If your Army Faction is Genestealer Cults, you start the battle with a number of Resurgence points, depending on the battle size, as shown below.
▪ Combat Patrol: 2 Resurgence points
▪ Incursion: 6 Resurgence points
▪ Strike Force: 10 Resurgence points
▪ Onslaught: 14 Resurgence points

Each time a unit from your army is destroyed, if every model in that unit has this ability, you can spend the relevant number of Resurgence points shown below based on that unit's Starting Strength.
▪ Claw of Ascension Hybrid Metamorphs (5 models): 2 Resurgence points
▪ Claw of Ascension Atalan Jackals (5 models): 2 Resurgence points

If you do:
▪ Add a new unit to your army identical to your destroyed unit, in Cult Ambush, at its Starting Strength, with all of its wounds remaining and any [ONE SHOT] weapons those models are equipped with considered as not having been shot.
▪ Place one Cult Ambush marker (see below) anywhere on the battlefield that is more than 9" horizontally away from all enemy units (if this is not possible, no marker is placed).

### Units in Cult Ambush
Cult Ambush is a type of Strategic Reserves. Units in Cult Ambush cannot be targeted with the Rapid Ingress Stratagem, but can be set up on the battlefield using a Cult Ambush marker as described below, or by following the rules for Strategic Reserves in a subsequent turn. Units in Cult Ambush are not automatically destroyed at the end of the third battle round.

### Cult Ambush Markers
Use a circular 32mm diameter marker for Cult Ambush markers. If an enemy model (excluding Aircraft) ends any kind of move within 8" of a Cult Ambush marker you placed, that Cult Ambush marker is removed from the battlefield. At the end of your opponent's next Movement phase, for each of your Cult Ambush markers still on the battlefield, you can select one unit from your army that is in Cult Ambush to make an ingress move. For that ingress move, set that unit up with at least one model in that unit in base contact with that Cult Ambush marker and all other models placed wholly within 3" of that Cult Ambush marker (that Cult Ambush marker is then removed from the battlefield). Units in Cult Ambush can make an ingress move in the first battle round using this rule.`,
      },

      stratagems: [
        {
          name: 'Cult Zealotry',
          sublabel: 'Claw of Ascension – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Frenzied in the pursuit of their cause, Genestealer Cultists of all forms and phases fight with savage determination to earn their freedom and ensure the glorious arrival of their star-born saviours.',
          when: 'Fight phase, when a friendly Claw of Ascension unit is selected to fight.',
          target: 'That Claw of Ascension unit.',
          effect: "Your unit's melee attacks can re-roll wound rolls.",
          restrictions: '',
        },
        {
          name: 'Dedicated to the End',
          sublabel: 'Claw of Ascension – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'The cultists of the Claw of Ascension do not fear death. Neither do they accept it meekly. They fight until their dying breath to slaughter the oppressors and ensure the liberty of future generations.',
          when: 'The Fight phase, when an enemy unit targets a friendly Claw of Ascension unit.',
          target: 'That Claw of Ascension unit.',
          effect: 'When a model in your unit is destroyed, if your unit has not been selected to fight this phase, roll one D6:\n▪ On a 3+, do not remove that model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), that model is removed from the battlefield.',
          restrictions: '',
        },
        {
          name: 'Guerrilla Warriors',
          sublabel: 'Claw of Ascension – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Well-used to fighting against superior opponents, Genestealer Cults make use of hit and fade attacks and other shock tactics to even the odds.',
          when: 'Your Movement phase, when a friendly Claw of Ascension unit is selected to make a fall-back move.',
          target: 'That Claw of Ascension unit.',
          effect: 'That move does not prevent your unit from being eligible to shoot/declare a charge.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Heavy Munitions',
          isDefault: false,
          upgrade: true,
          flavor: 'Stockpiles of high-grade munitions seized from enemy supply depots provide the Claw of Ascension with the firepower they need to engage heavily armoured targets.',
          body: "Upgrade: Claw of Ascension Achilles Ridgerunners unit only. This unit's Achilles missile launcher weapon has +1 A, S and AP.",
        },
        {
          name: 'Practiced Eye',
          isDefault: true,
          flavor: 'Shanus Daskovian’s skill as a sharpshooter is legendary amongst her cult, and she is equally adept at guiding the fire of the cult guerrillas under her command.',
          body: "Claw of Ascension Jackal Alphus model only. At the start of your Shooting phase, you can select one enemy unit. Friendly Claw of Ascension units' attacks that target that enemy unit have +1 to hit rolls.",
        },
      ],

      datasheets: [
        {
          id: 'claw-of-ascension-hybrid-metamorphs',
          name: 'Claw of Ascension Hybrid Metamorphs',
          profiles: [
            { name: 'Metamorph', m: '6"', t: '4', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Metamorph Leader', m: '6"', t: '4', sv: '5+', w: '1', ld: '7+', oc: '1' },
            { name: 'Metamorph with Hand Flamer', m: '6"', t: '4', sv: '5+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Hand Flamer', tags: ['CLOSE-QUARTERS', 'IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '3', ap: '0', d: '1' },
            { name: 'Autopistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Metamorph Mutations – Strike', tags: [], a: '3', ws: '3+', s: '5', ap: '-1', d: '2' },
            { name: 'Metamorph Mutations – Sweep', tags: [], a: '3', ws: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Leader’s Weapon Symbiote', tags: [], a: '5', ws: '3+', s: '5', ap: '-1', d: '2' },
          ],
          faction: 'Cult Ambush',
          abilities: [
            { name: 'Brood Claim', text: 'At the end of your Movement phase, if this unit is controlling an objective, that objective is secured.' },
          ],
          composition: ['1 Metamorph model', '1 Metamorph Leader model', '3 Metamorph with Hand Flamer models'],
          loadout: `**The Metamorph is equipped with:** Metamorph Mutations.
**The Metamorph Leader is equipped with:** Autopistol; Leader's Weapon Symbiote.
**Every Metamorph with Hand Flamer is equipped with:** Hand Flamer; Metamorph Mutations.`,
          keywords: ['Claw of Ascension', 'Explosives', 'Great Devourer', 'Infantry'],
          factionKeywords: ['Genestealer Cults'],
          baseSize: '32mm',
        },
        {
          id: 'shanus-daskovian',
          name: 'Shanus Daskovian',
          profiles: [
            { name: 'Shanus Daskovian', m: '12"', t: '4', sv: '5+', w: '4', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Autopistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '3', ap: '0', d: '1' },
            { name: 'Cult Sniper Rifle', tags: ['HEAVY', 'PRECISION'], range: '36"', a: '1', bs: '3+', s: '5', ap: '-2', d: '3' },
          ],
          melee: [
            { name: 'Stolen Blade', tags: [], a: '1', ws: '3+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Cult Ambush',
          abilities: [
            { name: 'Priority Target', text: "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those cult sniper rifle attacks. Friendly Genestealer Cults units' attacks that target that enemy unit can re-roll hit rolls of 1." },
            { name: 'Master Outrider', text: 'In your Shooting phase, when this unit has shot, you can use this ability. If you do:\n▪ This unit can make a normal move of up to 6".\n▪ This unit is not eligible to declare a charge until the end of the turn.' },
          ],
          composition: ['1 Shanus Daskovian model'],
          loadout: '**This model is equipped with:** Autopistol; Cult Sniper Rifle; Stolen Blade.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Claw of Ascension Atalan Jackals'],
          },
          keywords: ['Character', 'Claw of Ascension', 'Explosives', 'Great Devourer', 'Jackal Alphus', 'Mounted'],
          factionKeywords: ['Genestealer Cults'],
          baseSize: '60x35.5mm Oval Base',
        },
        {
          id: 'claw-of-ascension-atalan-jackals',
          name: 'Claw of Ascension Atalan Jackals',
          profiles: [
            { name: 'Atalan Jackal', m: '12"', t: '4', sv: '5+', w: '2', ld: '7+', oc: '1' },
            { name: 'Atalan Wolfquad', m: '12"', t: '4', sv: '5+', w: '4', ld: '7+', oc: '1' },
            { name: 'Atalan Jackal with Power Weapon', m: '12"', t: '4', sv: '5+', w: '2', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Stolen Firearms', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Mining Laser', tags: [], range: '24"', a: '1', bs: '4+', s: '12', ap: '-3', d: 'D6+1' },
          ],
          melee: [
            { name: 'Power Weapon', tags: [], a: '2', ws: '4+', s: '4', ap: '-2', d: '1' },
            { name: 'Stolen Blade', tags: [], a: '2', ws: '4+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Cult Ambush',
          abilities: [
            { name: 'Adaptable Fighters', text: 'When this unit is selected to attack, its attacks have:\n▪ [SUSTAINED HITS 1].\n▪ Or: [LETHAL HITS].' },
          ],
          composition: ['1 Atalan Jackal with Power Weapon model', '1 Atalan Wolfquad model', '3 Atalan Jackal models'],
          loadout: `**The Atalan Jackal with Power Weapon is equipped with:** Power Weapon; Stolen Firearms.
**The Atalan Wolfquad is equipped with:** Mining Laser; Stolen Blade; Stolen Firearms.
**Every Atalan Jackal is equipped with:** Stolen Blade; Stolen Firearms.`,
          keywords: ['Claw of Ascension', 'Explosives', 'Great Devourer', 'Mounted'],
          factionKeywords: ['Genestealer Cults'],
          baseSize: '60mm, 60x35.5mm Oval Base',
        },
        {
          id: 'claw-of-ascension-achilles-ridgerunner',
          name: 'Claw of Ascension Achilles Ridgerunner',
          profiles: [
            { name: 'Achilles Ridgerunner', m: '12"', t: '7', sv: '3+', w: '8', ld: '7+', oc: '3' },
          ],
          ranged: [
            { name: 'Missile Launcher', tags: [], range: '36"', a: '3', bs: '4+', s: '9', ap: '-2', d: '3' },
            { name: 'Twin Heavy Stubber', tags: ['RAPID FIRE 3', 'TWIN-LINKED'], range: '36"', a: '3', bs: '4+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Armoured Hull', tags: [], a: '3', ws: '4+', s: '5', ap: '0', d: '1' },
          ],
          faction: 'Cult Ambush',
          abilities: [
            { name: 'Survey Augur', text: "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those attacks. Friendly Genestealer Cults units' attacks that target that enemy unit [IGNORES COVER]." },
            { name: 'Crossfire', text: "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those attacks that has not been selected for this ability this turn. Friendly Genestealer Cults units' attacks that target that enemy unit have +1 AP until the end of the turn." },
          ],
          composition: ['1 Achilles Ridgerunner model'],
          loadout: '**This model is equipped with:** Armoured Hull; Missile Launcher; Survey Augur; Twin Heavy Stubber.',
          keywords: ['Claw of Ascension', 'Great Devourer', 'Vehicle'],
          factionKeywords: ['Genestealer Cults'],
          baseSize: '120x92mm Oval Base',
        },
      ],
    },

    {
      slug: 'grey-knights',
      name: 'Grey Knights',
      boxName: 'Crowe’s Sanctifiers',
      dp: 1,
      forceDisposition: 'Priority Assets',

      rule: {
        name: 'Strike from the Warp',
        flavor: 'Masters of teleportation technology and other warpcraft, the Grey Knights often hold warriors in reserve, ready to enter the fray at a moment’s notice. When called to battle, these warriors strike as if from nowhere, charging to engage stunned foes before they can lift a weapon in response.',
        body: `▪ When a friendly Crowe's Sanctifiers unit ends a charge move, if that unit made an ingress move this turn, you can select one enemy unit engaged with that friendly unit. If you do, that enemy unit makes a battle-shock roll.
▪ When playing a Combat Patrol battle, the following friendly units must start the battle in strategic reserves and cannot be set up on the battlefield before the battle round stated, and must be set up wholly within your deployment zone when they do: Brotherhood Terminator Squad (battle round 2), Venerable Dreadnought (battle round 3).`,
      },

      // The box's own copy omits the Codex armyRule's battle-size unit-count table and its
      // "can make an ingress move in your next Movement phase" acceleration clause (see
      // src/data/factions/grey-knights.js for that fuller Codex version) — a genuine CP-specific
      // simplification, not a formatting artifact, so transcribed as printed rather than reused.
      armyRule: {
        name: 'Gate of Infinity',
        flavor: 'Few can command the powers of the Warp with anything like the skill and control of the Grey Knights. So masterful is their sorcery that they can conjure glowing empyric gateways to step in and out of reality. In this way, they swiftly outflank their foes and redeploy their forces to counter threats, kept safe during their split-second Warp travel by the intricate wards worked into their wargear.',
        body: "If your Army Faction is Grey Knights, at the end of your opponent's Fight phase, you can select a number of units from your army that are on the battlefield (excluding units that are within Engagement Range of one or more enemy units), provided every model in those units has this ability. Once you have made your selections, remove those units from the battlefield and place them into Strategic Reserves.",
      },

      stratagems: [
        {
          name: 'Exigent Assignments',
          sublabel: 'Crowe’s Sanctifiers – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With the fate of the Imperium at stake, time is always of the essence. Leaving the broken corpses of their victims behind them, Crowe’s Sanctifiers press towards their assigned objectives.',
          when: "Fight phase, when a friendly Crowe's Sanctifiers unit is selected to make a consolidation move.",
          target: "That Crowe's Sanctifiers unit.",
          effect: 'When making that consolidation move, your unit can move up to D3+3".',
          restrictions: '',
        },
        {
          name: 'Refusal to Yield',
          sublabel: 'Crowe’s Sanctifiers – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Grey Knights Strike Squads are expected to face down the greatest empyric threats and never break. With adamantine resolve, they shrug off all but the most punishing blows.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Crowe's Sanctifiers Strike Squad unit.",
          target: "That Crowe's Sanctifiers Strike Squad unit.",
          effect: "Ranged attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
        {
          name: 'Psi-reactive Ammunition',
          sublabel: 'Crowe’s Sanctifiers – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Impregnated with negative psychic energy, this ammunition is lethally effective against sorcerers, daemons and others who draw their power from the Warp.',
          when: "Your Shooting phase, when a friendly Crowe's Sanctifiers unit is selected to shoot.",
          target: "That Crowe's Sanctifiers unit.",
          effect: "Your unit's storm bolter weapons have [PSYCHIC].",
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Sanctified Auspexes',
          isDefault: true,
          upgrade: true,
          flavor: 'Ancient, ritually purified, and blessed by the Chapter’s Techmarines, hypersensitive targeting augurs deliver exceptionally accurate targeting solutions.',
          body: "Upgrade: Crowe's Sanctifiers Venerable Dreadnought unit only. This unit's ranged attacks can re-roll one hit roll.",
        },
        {
          name: 'Purifying Force',
          isDefault: false,
          upgrade: true,
          flavor: 'Terminators of the Purifiers are often confronted with monstrous foes. Combining physical, mechanical and spiritual might, they strike with enough might to shatter armour, splinter carapaces, and banish the unholy.',
          body: "Upgrade: Crowe's Sanctifiers Brotherhood Terminator Squad unit only. (Once per battle, per army) When this unit is selected to fight, if it made a charge move this turn, you can use this ability. If you do, this unit's melee attacks have [LETHAL HITS].",
        },
      ],

      datasheets: [
        {
          id: 'crowes-sanctifiers-strike-squad',
          name: "Crowe's Sanctifiers Strike Squad",
          profiles: [
            { name: 'Grey Knight with Incinerator and Ceramite Fists', m: '6"', t: '4', sv: '2+', w: '2', ld: '6+', oc: '2' },
            { name: 'Grey Knight with Psycannon and Ceramite Fists', m: '6"', t: '4', sv: '2+', w: '2', ld: '6+', oc: '2' },
            { name: 'Grey Knight with Storm Bolter and Nemesis Force Weapon', m: '6"', t: '4', sv: '2+', w: '2', ld: '6+', oc: '2' },
            { name: 'Justicar', m: '6"', t: '4', sv: '2+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Incinerator', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '-', s: '6', ap: '-1', d: '1' },
            { name: 'Psycannon', tags: ['PSYCHIC'], range: '24"', a: '3', bs: '3+', s: '8', ap: '-1', d: '2' },
            { name: 'Storm Bolter', tags: ['RAPID FIRE 2'], range: '24"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Ceramite Fists', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Nemesis Force Weapon', tags: ['PSYCHIC'], a: '3', ws: '3+', s: '6', ap: '-2', d: '2' },
          ],
          faction: 'Gate of Infinity',
          abilities: [
            { name: 'Sanctifying Ritual (Psychic)', text: 'At the end of your Command phase, if this unit is controlling an objective, that objective is secured.' },
            { name: 'Combat Squad', text: 'At the start of the Declare Battle Formations step, you can split this unit into two separate units, each containing five models.' },
          ],
          composition: [
            '1 Grey Knight with Incinerator and Ceramite Fists model',
            '1 Grey Knight with Psycannon and Ceramite Fists model',
            '1 Justicar model',
            '7 Grey Knight with Storm Bolter and Nemesis Force Weapon models',
          ],
          loadout: `**The Grey Knight with Incinerator and Ceramite Fists is equipped with:** Ceramite Fists; Incinerator.
**The Grey Knight with Psycannon and Ceramite Fists is equipped with:** Ceramite Fists; Psycannon.
**The Justicar is equipped with:** Nemesis Force Weapon; Storm Bolter.
**Every Grey Knight with Storm Bolter and Nemesis Force Weapon is equipped with:** Nemesis Force Weapon; Storm Bolter.`,
          keywords: ['Battleline', "Crowe's Sanctifiers", 'Explosives', 'Imperium', 'Infantry', 'Psyker'],
          factionKeywords: ['Grey Knights'],
          baseSize: '32mm',
        },
        {
          id: 'crowes-sanctifiers-venerable-dreadnought',
          name: "Crowe's Sanctifiers Venerable Dreadnought",
          profiles: [
            { name: 'Venerable Dreadnought', m: '8"', t: '9', sv: '2+', w: '8', ld: '6+', oc: '3' },
          ],
          ranged: [
            { name: 'Storm Bolter', tags: ['RAPID FIRE 2'], range: '24"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Twin Lascannon', tags: ['TWIN-LINKED'], range: '48"', a: '1', bs: '3+', s: '12', ap: '-3', d: 'D6+1' },
          ],
          melee: [
            { name: 'Dreadnought Fist', tags: [], a: '5', ws: '3+', s: '12', ap: '-2', d: '3' },
          ],
          faction: 'Gate of Infinity',
          abilities: [
            { name: 'Guidance of the Ancients (Psychic)', text: "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those ranged attacks. If you do, friendly Grey Knights models' ranged attacks that target that enemy unit have +1 to hit rolls." },
          ],
          composition: ['1 Venerable Dreadnought model'],
          loadout: '**This model is equipped with:** Dreadnought Fist; Storm Bolter; Twin Lascannon.',
          keywords: ['Character', "Crowe's Sanctifiers", 'Imperium', 'Psyker', 'Smoke', 'Vehicle', 'Venerable Dreadnought', 'Walker'],
          factionKeywords: ['Grey Knights'],
          baseSize: '60mm',
        },
        {
          id: 'crowes-sanctifiers-brotherhood-terminator-squad',
          name: "Crowe's Sanctifiers Brotherhood Terminator Squad",
          profiles: [
            { name: 'Brotherhood Terminator Justicar', m: '5"', t: '5', sv: '2+', w: '3', ld: '6+', oc: '2', inv: '4+' },
            { name: 'Brotherhood Terminator with Storm Bolter and Nemesis Force Weapon', m: '5"', t: '5', sv: '2+', w: '3', ld: '6+', oc: '2', inv: '4+' },
            { name: 'Brotherhood Terminator with Psycannon and Nemesis Force Weapon', m: '5"', t: '5', sv: '2+', w: '3', ld: '6+', oc: '2', inv: '4+' },
          ],
          ranged: [
            { name: 'Storm Bolter', tags: ['RAPID FIRE 2'], range: '24"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Psycannon', tags: ['PSYCHIC'], range: '24"', a: '3', bs: '3+', s: '8', ap: '-1', d: '2' },
          ],
          melee: [
            { name: 'Nemesis Force Weapon', tags: ['PSYCHIC'], a: '4', ws: '3+', s: '6', ap: '-2', d: '2' },
          ],
          faction: 'Gate of Infinity',
          abilities: [
            { name: 'Force Edge (Psychic)', text: "This unit's melee attacks that target a unit (excluding Monster/Vehicle units) have +1 AP." },
          ],
          composition: [
            '1 Brotherhood Terminator Justicar model',
            '1 Brotherhood Terminator with Psycannon and Nemesis Force Weapon model',
            '3 Brotherhood Terminator with Storm Bolter and Nemesis Force Weapon models',
          ],
          loadout: `**The Brotherhood Terminator Justicar is equipped with:** Nemesis Force Weapon; Storm Bolter.
**The Brotherhood Terminator with Psycannon and Nemesis Force Weapon is equipped with:** Nemesis Force Weapon; Psycannon.
**Every Brotherhood Terminator with Storm Bolter and Nemesis Force Weapon is equipped with:** Nemesis Force Weapon; Storm Bolter.`,
          keywords: ['Battleline', 'Brotherhood Terminator Squad', "Crowe's Sanctifiers", 'Explosives', 'Imperium', 'Infantry', 'Psyker', 'Terminator'],
          factionKeywords: ['Grey Knights'],
          baseSize: '40mm',
        },
        {
          id: 'sanctifiers-castellan-crowe',
          name: 'Sanctifiers Castellan Crowe',
          profiles: [
            { name: 'Castellan Crowe', m: '6"', t: '4', sv: '2+', w: '5', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Purifying Flame', tags: ['ANTI-INFANTRY 2+', 'IGNORES COVER', 'PSYCHIC'], range: '18"', a: '3', bs: '2+', s: '4', ap: '-2', d: '1' },
            { name: 'Storm Bolter', tags: ['RAPID FIRE 2'], range: '24"', a: '2', bs: '2+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Black Blade of Antwyr', tags: ['DEVASTATING WOUNDS', 'PRECISION'], a: '5', ws: '2+', s: '6', ap: '-2', d: '2' },
          ],
          faction: 'Gate of Infinity',
          abilities: [
            { name: 'Foesight (Psychic)', text: "This unit's attacks that target a Character unit can re-roll hit rolls." },
          ],
          composition: ['1 Castellan Crowe model'],
          loadout: '**This model is equipped with:** Black Blade of Antwyr; Purifying Flame; Storm Bolter.',
          keywords: ['Character', "Crowe's Sanctifiers", 'Epic Hero', 'Explosives', 'Imperium', 'Infantry', 'Psyker'],
          factionKeywords: ['Grey Knights'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'chaos-space-marines',
      name: 'Chaos Space Marines',
      boxName: 'Zarkan’s Daemonkin',
      dp: 1,
      forceDisposition: 'Disruption',

      rule: {
        name: 'Abject Fear',
        flavor: 'To gaze upon Zarkan and his daemonkin is to know true terror.',
        body: `Friendly Zarkan's Daemonkin units have the following ability:
▪ Terrifying Presence (Aura): While an enemy unit is within 3" of this unit, that enemy unit has -1 Ld.`,
      },

      // Verbatim from the Codex armyRule (src/data/factions/chaos-space-marines.js, appdata slug
      // "heretic-astartes") — both CP-linked rows (Dark Pacts, Cults of the Dark Gods) confirmed
      // byte-for-byte identical to the Codex versions.
      armyRule: {
        name: 'Dark Pacts & Cults of the Dark Gods',
        flavor: 'Beseeching the Chaos Gods with fanatical fervour, the profane champions of the Heretic Astartes pray for diabolic boons, promising the vilest of offerings in return for their power.',
        body: `If your Army Faction is Heretic Astartes, each time a unit with this ability is selected to shoot or fight, it can make a Dark Pact. If it does, it must first take a Leadership test before any effects of that Dark Pact are resolved; if that test is failed, that unit suffers D3 mortal wounds. Then, select one of the following abilities for that unit's weapons to gain until the end of the phase:
▪ [LETHAL HITS]
▪ [SUSTAINED HITS 1]

### Cults of the Dark Gods
If your Army Faction is Heretic Astartes, you can include any of the following units in your army, and when you do so their Faction keywords are replaced with Heretic Astartes:
▪ Khorne Berzerkers (see World Eaters)
▪ Rubric Marines (see Thousand Sons)
▪ Plague Marines (see Death Guard)
▪ Noise Marines (see Emperor's Children)

The combined points value of such units you can include in your army depends on the battle size: Incursion — up to 250 pts; Strike Force — up to 500 pts; Onslaught — up to 750 pts.`,
      },

      stratagems: [
        {
          name: 'Vindictive Strategy',
          sublabel: 'Zarkan’s Daemonkin – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Zarkan’s Legionaries give no quarter to the weak, pursuing their cowering foes with relentless brutality.',
          when: "Your Shooting phase or the Fight phase, when a friendly Zarkan's Daemonkin Legionaries unit is selected to attack.",
          target: "That Zarkan's Daemonkin Legionaries unit.",
          effect: `▪ Your unit's attacks can re-roll hit rolls of 1.
▪ Your unit's attacks can re-roll wound rolls of 1.`,
          restrictions: '',
        },
        {
          name: 'Daemonic Frenzy',
          sublabel: 'Zarkan’s Daemonkin – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'When overcome by bloodlust and savagery, Possessed are all but impossible to escape. Those who flee from combat are snatched up by grasping claws or hacked to bloody shreds by blades and talons.',
          when: "Your opponent's Movement phase, when an enemy unit is selected to make a fall-back move, if that unit is engaged with a friendly Zarkan's Daemonkin Possessed unit.",
          target: "That Zarkan's Daemonkin Possessed unit.",
          effect: 'When an enemy unit engaged with your unit is selected to make a fall-back move, that enemy unit must use the desperate escape mode, with -1 to those hazard rolls if that enemy unit is battle-shocked.',
          restrictions: '',
        },
        {
          name: 'Alert to Danger',
          sublabel: 'Zarkan’s Daemonkin – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'To serve at Zarkan’s side and remain alive for any length of time requires alertness and cunning. His mortal thralls display both, being careful to stay out of the clutches of the enemy and to exploit their movements.',
          when: "Your opponent's Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Zarkan's Daemonkin Cultist Mob unit.",
          target: "That Zarkan's Daemonkin Cultist Mob unit.",
          effect: 'Your unit can make a normal move of up to D3+1".',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Prey on the Weak',
          isDefault: false,
          upgrade: true,
          flavor: 'Eager to rend flesh and spill gore in honour of their daemonic patrons, Possessed Legionaries surge forward, closing the gap upon cowering victims.',
          body: "Upgrade: Zarkan's Daemonkin Possessed unit only. This unit has Scouts 6\".",
        },
        {
          name: 'Infernal Infusion',
          isDefault: true,
          flavor: 'Channelling the might of bound daemonic entities, the Master of Possession infused their mortal form with diabolical might.',
          body: "Zarkan's Daemonkin Master of Possession model only. This unit's attacks have +1 S.",
        },
      ],

      datasheets: [
        {
          id: 'aranis-zarkan',
          name: 'Aranis Zarkan',
          profiles: [
            { name: 'Aranis Zarkan', m: '8"', t: '4', sv: '3+', w: '4', ld: '6+', oc: '1', inv: '5+' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Rite of Possession – Focused Witchfire', tags: ['ANTI-PSYKER 2+', 'CLOSE-QUARTERS', 'HAZARDOUS', 'PRECISION', 'PSYCHIC'], range: '18"', a: '2', bs: '3+', s: '6', ap: '-3', d: '3' },
            { name: 'Rite of Possession – Witchfire', tags: ['ANTI-PSYKER 2+', 'CLOSE-QUARTERS', 'PRECISION', 'PSYCHIC'], range: '18"', a: '2', bs: '3+', s: '4', ap: '-3', d: '2' },
          ],
          melee: [
            { name: 'Staff of Possession', tags: ['ANTI-PSYKER 2+', 'PSYCHIC'], a: '4', ws: '3+', s: '6', ap: '-1', d: 'D3' },
          ],
          faction: 'Dark Pacts & Cults of the Dark Gods',
          abilities: [
            { name: 'Sacrificial Dagger (Once per phase, per unit)', text: "When this unit is selected to attack, you can use this ability. If you do:\n▪ This unit suffers 1 mortal wound.\n▪ This unit's Psychic attacks have +1 to hit rolls and +1 to wound rolls." },
            { name: 'Daemonkin (Psychic)', text: 'While this unit has a Bodyguard model, this unit has +1 to advance rolls and charge rolls.' },
          ],
          composition: ['1 Aranis Zarkan model'],
          loadout: '**This model is equipped with:** Bolt Pistol; Rite of Possession; Staff of Possession.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ["Zarkan's Daemonkin Legionaries", "Zarkan's Daemonkin Possessed"],
          },
          keywords: ['Chaos', 'Character', 'Infantry', 'Master of Possession', 'Psyker', "Zarkan's Daemonkin"],
          factionKeywords: ['Heretic Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'zarkans-daemonkin-legionaries',
          name: "Zarkan's Daemonkin Legionaries",
          profiles: [
            { name: 'Legionary', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Aspiring Champion', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Legionary with Meltagun', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Legionary with Heavy Bolter', m: '6"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
            { name: 'Heavy Bolter', tags: ['HEAVY', 'SUSTAINED HITS 1'], range: '36"', a: '3', bs: '4+', s: '5', ap: '-1', d: '2' },
            { name: 'Meltagun', tags: ['MELTA 2'], range: '12"', a: '1', bs: '3+', s: '9', ap: '-4', d: 'D6' },
            { name: 'Boltgun', tags: [], range: '24"', a: '2', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Accursed Weapon', tags: [], a: '4', ws: '3+', s: '5', ap: '-2', d: '1' },
            { name: 'Fists and Knives', tags: [], a: '3', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Dark Pacts & Cults of the Dark Gods',
          abilities: [
            { name: 'Combat Squad', text: 'At the start of the Declare Battle Formations step, you can split this unit into two separate units, each containing five models.' },
            { name: 'Chaos Icon', text: 'When this unit makes a Dark Pact, this unit can re-roll the leadership test.' },
            { name: 'Veterans of the Long War', text: "This unit's melee attacks:\n▪ Can re-roll wound rolls of 1.\n▪ Or: That target a unit within range of an objective can re-roll wound rolls." },
          ],
          composition: [
            '1 Aspiring Champion model',
            '1 Legionary with Heavy Bolter model',
            '1 Legionary with Meltagun model',
            '7 Legionary models',
          ],
          loadout: `**The Aspiring Champion is equipped with:** Accursed Weapon; Plasma Pistol.
**The Legionary with Heavy Bolter is equipped with:** Bolt Pistol; Fists and Knives; Heavy Bolter.
**The Legionary with Meltagun is equipped with:** Bolt Pistol; Fists and Knives; Meltagun.
**Every Legionary is equipped with:** Boltgun; Bolt Pistol; Fists and Knives.`,
          keywords: ['Battleline', 'Chaos', 'Explosives', 'Infantry', "Zarkan's Daemonkin"],
          factionKeywords: ['Heretic Astartes'],
          baseSize: '32mm',
        },
        {
          id: 'zarkans-daemonkin-cultist-mob',
          name: "Zarkan's Daemonkin Cultist Mob",
          profiles: [
            { name: 'Cultist Champion', m: '6"', t: '3', sv: '6+', w: '1', ld: '7+', oc: '1' },
            { name: 'Chaos Cultist', m: '6"', t: '3', sv: '6+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Autopistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Blades and Cudgels', tags: [], a: '2', ws: '4+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Dark Pacts & Cults of the Dark Gods',
          abilities: [
            { name: 'For the Dark Gods', text: 'At the end of your Command phase, if this unit is controlling an objective, that objective is secured.' },
          ],
          composition: ['1 Cultist Champion model', '9 Chaos Cultist models'],
          loadout: `**The Cultist Champion is equipped with:** Blades and Cudgels; Bolt Pistol.
**Every Chaos Cultist is equipped with:** Autopistol; Blades and Cudgels.`,
          keywords: ['Battleline', 'Chaos', 'Damned', 'Explosives', 'Infantry', "Zarkan's Daemonkin"],
          factionKeywords: ['Heretic Astartes'],
          baseSize: '25mm',
        },
        {
          id: 'zarkans-daemonkin-possessed',
          name: "Zarkan's Daemonkin Possessed",
          profiles: [
            { name: 'Possessed Champion', m: '9"', t: '6', sv: '3+', w: '3', ld: '6+', oc: '1' },
            { name: 'Possessed', m: '9"', t: '6', sv: '3+', w: '3', ld: '6+', oc: '1' },
          ],
          melee: [
            { name: 'Hideous Mutations', tags: [], a: '4', ws: '3+', s: '5', ap: '-1', d: '2' },
          ],
          faction: 'Dark Pacts & Cults of the Dark Gods',
          abilities: [
            { name: 'Chaos Icon', text: 'When this unit makes a Dark Pact, this unit can re-roll the leadership roll.' },
            { name: 'Unholy Bloodshed (Once per battle, per unit)', text: "When this unit makes a Dark Pact, you can use this ability. If you do, this unit's attacks have [DEVASTATING WOUNDS]." },
          ],
          composition: ['1 Possessed Champion model', '4 Possessed models'],
          loadout: '**Every model is equipped with:** Hideous Mutations.',
          keywords: ['Chaos', 'Daemon', 'Infantry', "Zarkan's Daemonkin"],
          factionKeywords: ['Heretic Astartes'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'leagues-of-votann',
      name: 'Leagues of Votann',
      boxName: 'Bane-slayer’s Bulwark',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Secure Resources',
        flavor: 'Staking their claim upon resource-rich ground, the Kin sweep forward to secure further territory.',
        body: "At the end of your Movement phase, if a friendly Bane-slayer's Bulwark unit is controlling an objective, that objective is secured.",
      },

      // Verbatim from the Codex armyRule (src/data/factions/leagues-of-votann.js) — confirmed
      // byte-for-byte identical to the CP box's own copy.
      armyRule: {
        name: 'Prioritised Efficiency',
        flavor: 'As the Kin truth describes, Luck has. Need keeps. Toil earns. The kinhost’s ability to efficiently switch its strategic footing embodies this wisdom. It results from swift assessments of a foe’s possessions, how best to seize them for the kindred’s need and then to stubbornly toil to hold them against counterattacks.',
        body: `If your Army Faction is Leagues of Votann, Leagues of Votann units from your army have one of two abilities: Hostile Acquisition or Fortify Takeover (see below). During the battle, which ability those Leagues of Votann units have will change depending on how many Yield points (YP) you currently have:
▪ At the start of the battle, your units have Hostile Acquisition until the start of your next Command phase.
▪ At the end of your Command phase, if you have fewer than 7YP, your units have Hostile Acquisition until the start of your next Command phase.
▪ At the end of your Command phase, if you have 7YP or more, your units have Fortify Takeover until the start of your next Command phase.

### Hostile Acquisition
▪ Each time a model in this unit makes an attack that targets an enemy unit within range of one or more objective markers, add 1 to the Hit roll.
▪ You can re-roll Advance and Charge rolls made for this unit.

### Fortify Takeover
▪ Each time a model in this unit makes an attack that targets an enemy unit, if this unit is within range of one or more objective markers you control, add 1 to the Hit roll.
▪ Each time an attack targets this unit, if the Strength characteristic of that attack is greater than this unit's Toughness characteristic and this unit is not a Vehicle, subtract 1 from the Wound roll.

### Yield Points
At the end of each player's Command phase, you gain 1YP if you control one or more objective markers within your deployment zone, and, from the second battle round onwards, you gain 1 additional YP for each of the following conditions you satisfy:
▪ You control one or more objective markers not within your deployment zone.
▪ You control two or more objective markers not within your deployment zone.
▪ You control more objective markers than your opponent.

In your turn, YP gained in this way are always gained before checking which ability Leagues of Votann units from your army have. Whenever a rule allows you to spend YP, reduce the number of YP you have by that amount (your YP cannot go below 0), otherwise you cannot use that rule.`,
      },

      stratagems: [
        {
          name: 'Opportune Advance',
          sublabel: 'Bane-slayer’s Bulwark – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'As opponents open fire, these warriors take the opportunity to charge forward, gaining ground as their enemies reload spent weapons.',
          when: "Your opponent's Shooting phase, when an enemy unit that targeted a friendly unengaged Bane-slayer's Bulwark Einhyr Hearthguard unit has shot.",
          target: "That Bane-slayer's Bulwark Einhyr Hearthguard unit.",
          effect: 'Your unit can make a surge move of up to D6+1".',
          restrictions: '',
        },
        {
          name: 'Point-blank Fusillade',
          sublabel: 'Bane-slayer’s Bulwark – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'So resolute and steadfast are the Kin that their warriors can keep aiming and firing even amid close-quarters battle.',
          when: "Your Shooting phase, when a friendly Bane-slayer's Bulwark unit is selected to shoot.",
          target: "That Bane-slayer's Bulwark unit.",
          effect: "Your unit's ranged attacks have [CLOSE-QUARTERS].",
          restrictions: '',
        },
        {
          name: 'Claimed for the Kindred',
          sublabel: 'Bane-slayer’s Bulwark – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Having staked their claim upon contested ground, the Kin stand and fight with renewed determination.',
          when: 'Command phase.',
          target: "One friendly Bane-slayer's Bulwark Hearthkyn Warriors unit.",
          effect: 'Your unit has +1 OC until the end of the turn.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Indomitable Exemplar',
          isDefault: true,
          flavor: 'This war leader is a living embodiment of the ceaseless drive to strike down their kindred’s foes. Through their deeds, they exhort their warriors not to waste even their last breaths on anything but vengeful retribution.',
          body: "Bane-slayer's Bulwark Einhyr Champion model only. In the Fight phase, when this model is destroyed, if this unit has not been selected to fight this phase, roll one D6: on a 2+, do not remove this model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield.",
        },
        {
          name: 'Brôkhyr Barrage',
          isDefault: false,
          upgrade: true,
          flavor: 'Pooling their fire into a concentrated barrage, Brôkhyr Thunderkyn annihilate their foes, along with the obstacles behind which they have taken cover. Such is the ferocity of the onslaught that even the boldest warriors are shaken.',
          body: `Upgrade: Bane-slayer's Bulwark Brôkhyr Thunderkyn unit only.
▪ This unit's ranged attacks have [IGNORES COVER].
▪ In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those ranged attacks. If you do, that enemy unit makes a battle-shock roll.`,
        },
      ],

      datasheets: [
        {
          id: 'bane-slayers-bulwark-einhyr-hearthguard',
          name: "Bane-Slayer's Bulwark Einhyr Hearthguard",
          profiles: [
            { name: 'Hesyr', m: '5"', t: '5', sv: '2+', w: '2', ld: '7+', oc: '1' },
            { name: 'Einhyr Hearthguard', m: '5"', t: '5', sv: '2+', w: '2', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Exoarmour Grenade Launcher', tags: ['BLAST 1'], range: '24"', a: 'D3', bs: '3+', s: '3', ap: '0', d: '1' },
            { name: 'Volkanite Disintegrator', tags: ['DEVASTATING WOUNDS'], range: '24"', a: '3', bs: '3+', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Graviton Hammer', tags: ['ANTI-MONSTER/VEHICLE 3+'], a: '3', ws: '4+', s: '9', ap: '-1', d: '3' },
            { name: 'Plasma Blade Gauntlet', tags: [], a: '3', ws: '3+', s: '6', ap: '-2', d: '1' },
          ],
          faction: 'Prioritised Efficiency',
          abilities: [
            { name: 'Decisive Destruction', text: "This unit's ranged attacks that target the closest eligible target can re-roll hit rolls of 1." },
            { name: 'Weavefield Crest', text: 'This unit has 5+ InSv.' },
          ],
          composition: ['1 Hesyr model', '4 Einhyr Hearthguard models'],
          loadout: `**The Hesyr is equipped with:** Exoarmour Grenade Launcher; Graviton Hammer; Volkanite Disintegrator.
**Every Einhyr Hearthguard is equipped with:** Exoarmour Grenade Launcher; Plasma Blade Gauntlet; Volkanite Disintegrator.`,
          keywords: ["Bane-Slayer's Bulwark", 'Einhyr', 'Exoarmour', 'Infantry'],
          factionKeywords: ['Leagues of Votann'],
          baseSize: '32mm',
        },
        {
          id: 'bane-slayers-bulwark-hearthkyn-warriors',
          name: "Bane-Slayer's Bulwark Hearthkyn Warriors",
          profiles: [
            { name: 'Hearthkyn Warrior with Autoch-pattern Bolt Pistol and Plasma Knife', m: '5"', t: '5', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Magna-Rail Rifle and Armoured Fists', m: '5"', t: '5', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Theyn', m: '5"', t: '5', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Ion Blaster and Armoured Fists', m: '5"', t: '5', sv: '4+', w: '1', ld: '7+', oc: '2' },
            { name: 'Hearthkyn Warrior with Autoch-pattern Bolt Pistol, HYLas Auto Rifle and Armoured Fists', m: '5"', t: '5', sv: '4+', w: '1', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Autoch-pattern Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
            { name: 'HYLas Auto Rifle', tags: ['ASSAULT', 'RAPID FIRE 3'], range: '24"', a: '3', bs: '4+', s: '6', ap: '-1', d: '1' },
            { name: 'Magna-rail Rifle', tags: ['DEVASTATING WOUNDS', 'HEAVY'], range: '18"', a: '1', bs: '5+', s: '12', ap: '-3', d: 'D3+3' },
            { name: 'Theyn’s Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '8', ap: '-2', d: '1' },
            { name: 'Ion Blaster', tags: [], range: '18"', a: '1', bs: '4+', s: '5', ap: '-2', d: '1' },
          ],
          melee: [
            { name: 'Plasma Knife', tags: [], a: '2', ws: '4+', s: '4', ap: '-2', d: '1' },
            { name: 'Armoured Fists', tags: [], a: '1', ws: '4+', s: '4', ap: '0', d: '1' },
            { name: 'Theyn’s Armaments', tags: [], a: '2', ws: '4+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Prioritised Efficiency',
          abilities: [
            { name: 'Weavefield Crest', text: 'This unit has 5+ InSv.' },
            { name: 'Panspectral Scanning', text: "This unit's ranged attacks can re-roll hit rolls of 1." },
          ],
          composition: [
            '1 Hearthkyn Warrior with Autoch-pattern Bolt Pistol and Plasma Knife model',
            '1 Hearthkyn Warrior with Autoch-pattern Bolt Pistol, HYLas Auto Rifle and Armoured Fists model',
            '1 Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Magna-Rail Rifle and Armoured Fists model',
            '1 Theyn model',
            '6 Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Ion Blaster and Armoured Fists models',
          ],
          loadout: `**The Hearthkyn Warrior with Autoch-pattern Bolt Pistol and Plasma Knife is equipped with:** Autoch-pattern Bolt Pistol; Plasma Knife.
**The Hearthkyn Warrior with Autoch-pattern Bolt Pistol, HYLas Auto Rifle and Armoured Fists is equipped with:** Armoured Fists; Autoch-pattern Bolt Pistol; HYLas Auto Rifle.
**The Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Magna-Rail Rifle and Armoured Fists is equipped with:** Armoured Fists; Autoch-pattern Bolt Pistol; Magna-rail Rifle.
**The Theyn is equipped with:** Autoch-pattern Bolt Pistol; Theyn's Armaments; Theyn's Pistol.
**Every Hearthkyn Warrior with Autoch-pattern Bolt Pistol, Ion Blaster and Armoured Fists is equipped with:** Armoured Fists; Autoch-pattern Bolt Pistol; Ion Blaster.`,
          keywords: ["Bane-Slayer's Bulwark", 'Explosives', 'Hearthkyn', 'Infantry'],
          factionKeywords: ['Leagues of Votann'],
          baseSize: '28.5mm',
        },
        {
          id: 'bane-slayers-bulwark-brokhyr-thunderkyn',
          // appdata's own name for this one datasheet drops the hyphen ("Bane Slayer's" vs the
          // other 3 units' "Bane-Slayer's") — kept as printed rather than "corrected" to match
          // its siblings.
          name: "Bane Slayer's Bulwark Brokhyr Thunderkyn",
          profiles: [
            { name: 'Brokhyr Thunderkyn', m: '5"', t: '6', sv: '3+', w: '2', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'SP Conversion Beamer', tags: ['CONVERSION', 'LETHAL HITS'], range: '24"', a: '2', bs: '4+', s: '7', ap: '-2', d: '3' },
          ],
          melee: [
            { name: 'Powered Strikes', tags: [], a: '2', ws: '4+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Prioritised Efficiency',
          abilities: [
            { name: 'Breaching Fire', text: "In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those attacks. If you do, friendly Leagues of Votann units' ranged attacks that target that enemy unit have [IGNORES COVER]." },
          ],
          composition: ['3 Brokhyr Thunderkyn models'],
          loadout: '**Every model is equipped with:** Powered Strikes; SP Conversion Beamer.',
          keywords: ["Bane-Slayer's Bulwark", 'Brokhyr', 'Exoframe', 'Infantry'],
          factionKeywords: ['Leagues of Votann'],
          baseSize: '40mm',
        },
        {
          id: 'vynn-bane-slayer',
          name: 'Vynn Bane-Slayer',
          profiles: [
            { name: 'Vynn Bane-Slayer', m: '5"', t: '5', sv: '2+', w: '5', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Autoch-pattern Combi-bolter', tags: ['ASSAULT'], range: '24"', a: '4', bs: '2+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Mass Hammer', tags: [], a: '3', ws: '3+', s: '12', ap: '-3', d: 'D6+1' },
          ],
          faction: 'Prioritised Efficiency',
          abilities: [
            { name: 'Weavefield Crest', text: 'This model has 4+ InSv.' },
            { name: 'Fast-firing Targeters', text: "This unit's ranged attacks have [ASSAULT]." },
          ],
          composition: ['1 Vynn Bane-Slayer model'],
          loadout: '**This model is equipped with:** Autoch-pattern Combi-bolter; Mass Hammer.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ["Bane-Slayer's Bulwark Einhyr Hearthguard"],
          },
          keywords: ["Bane-Slayer's Bulwark", 'Character', 'Einhyr', 'Einhyr Champion', 'Exoarmour', 'Infantry'],
          factionKeywords: ['Leagues of Votann'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'space-wolves',
      name: 'Space Wolves',
      boxName: 'Askar’s Wolfpack',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Hidden Hunters',
        flavor: 'Cunning as the lupine predators of his home world, Fyrri Askar favours ambush tactics. His warriors stalk the perimeter of the battlefield, striking only at the most opportune moment.',
        body: 'Friendly Askar\'s Wolfpack units have -3" detection range.',
      },

      // The box links all 4 of the Codex's army rules (Oath of Moment, Curse of the Wulfen,
      // Sagas, Sons of Russ) — all confirmed byte-for-byte identical to the Codex versions.
      // Oath of Moment/Curse of the Wulfen are already combined in
      // src/data/factions/space-wolves.js; Sagas/Sons of Russ added here to cover all 4 CP-linked
      // rows (Sagas' own text is a one-line pointer to per-Detachment Sagas, largely inert for a
      // single-detachment Combat Patrol box, but included for completeness).
      armyRule: {
        name: 'Oath of Moment & Curse of the Wulfen',
        flavor: 'In battle, Space Marines swear mighty oaths to destroy the enemies of the Emperor and uphold the honour of their Chapter, and such vows are sacrosanct. When the Angels of Death strike, they do so with the precision of a surgeon and the force of a thunderbolt. Only while fighting at the side of their battle-brothers can the feral Wulfen control their frenzied aggression.',
        body: `### Oath of Moment
If your Army Faction is Adeptus Astartes, at the start of your Command phase, select one unit from your opponent's army. Until the start of your next Command phase, that enemy unit is your Oath of Moment target. Each time a model with this ability makes an attack that targets your Oath of Moment target, you can re-roll the Hit roll.

### Curse of the Wulfen
While this unit is within 6" of one or more friendly Space Wolves Character models (excluding Wulfen models) or within 12" of one or more friendly Wolf Priest models, if it is not Battle-shocked, add 1 to the Objective Control characteristic of Infantry models in it and add 3 to the Objective Control characteristic of Vehicle models in it.

### Sagas
Each Detachment rule in Codex Supplement: Space Wolves includes a Saga you can complete, with additional effects that apply once you have done so.

### Sons of Russ
▪ If an Adeptus Astartes unit has a second Faction keyword on its datasheet, that Faction keyword is the name of that unit's Chapter. For example, Ragnar Blackmane has both the Adeptus Astartes and Space Wolves Faction keywords, and is therefore from the Space Wolves Chapter.
▪ You cannot include units from more than one Chapter in your army.`,
      },

      stratagems: [
        {
          name: 'Born Hunters',
          sublabel: 'Askar’s Wolfpack – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'The Space Wolves pursue their prey like feral predators, reacting to every move of their quarry with lightning speed.',
          when: "Your opponent's Movement phase, when an enemy unit that was engaged with a friendly Askar's Wolfpack unit (excluding Terminator units) ends a fall-back move, if that Askar's Wolfpack unit is unengaged.",
          target: "That Askar's Wolfpack unit.",
          effect: 'Your unit can make a normal move of up to D3+1".',
          restrictions: '',
        },
        {
          name: 'Bestial Dominance',
          sublabel: 'Askar’s Wolfpack – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Standing over the butchered corpses of the enemy, their armour flecked with gore, these warriors leave none in doubt as to their superiority.',
          when: "Your Shooting phase or the Fight phase, when an enemy unit is destroyed by a friendly Askar's Wolfpack Wulfen unit.",
          target: "That Askar's Wolfpack Wulfen unit.",
          effect: 'Your unit has +1 OC until the end of the battle.',
          restrictions: '',
        },
        {
          name: 'Bring It Down',
          sublabel: 'Askar’s Wolfpack – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'Even behemothic foes shielded by heavy armour are not immune to the Wolfpack’s wrath. Their weaponised fury is great enough to tear tanks and monsters asunder.',
          when: "Fight phase, when a friendly Askar's Wolfpack unit is selected to fight.",
          target: "That Askar's Wolfpack unit.",
          effect: "Your unit's melee attacks have [ANTI-MONSTER/VEHICLE 4+].",
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Lone Hunter',
          isDefault: false,
          flavor: 'Fyrri Askar often prefers to hunt alone, stalking his prey from the shadows, observing the unfolding battle and throwing himself into battle only when he judges it necessary.',
          body: `Askar's Wolfpack Battle Leader model only. This model has:
▪ Lone Operative 9".
▪ Stealth.
▪ +1 T.`,
        },
        {
          name: 'Aggressive Response',
          isDefault: true,
          upgrade: true,
          flavor: 'Struck by incoming fire, the pack responds with immediate aggression, closing in upon their assailants with fangs bared.',
          body: "Upgrade: Askar's Wolfpack Wolf Guard Terminators unit only. (Once per turn, per unit) In your opponent's Shooting phase, when an enemy unit has shot, if this unit was hit by those attacks, this unit can make a surge move of up to D3+1\".",
        },
      ],

      datasheets: [
        {
          id: 'askars-wolfpack-blood-claws',
          name: "Askar's Wolfpack Blood Claws",
          profiles: [
            { name: 'Blood Claw Pack Leader', m: '7"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Blood Claw', m: '7"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '3+', s: '8', ap: '-3', d: '2' },
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Power Weapon', tags: [], a: '4', ws: '3+', s: '5', ap: '-2', d: '1' },
            { name: 'Chainsword', tags: [], a: '4', ws: '3+', s: '4', ap: '-1', d: '1' },
          ],
          faction: 'Oath of Moment & Curse of the Wulfen',
          abilities: [
            { name: 'Berserk Charge', text: 'When this unit makes an advance move, that advance move does not prevent this unit from being eligible to declare a charge.' },
          ],
          composition: ['1 Blood Claw Pack Leader model', '9 Blood Claw models'],
          loadout: `**The Blood Claw Pack Leader is equipped with:** Plasma Pistol; Power Weapon.
**Every Blood Claw is equipped with:** Bolt Pistol; Chainsword.`,
          keywords: ["Askar's Wolfpack", 'Battleline', 'Explosives', 'Imperium', 'Infantry', 'Tacticus'],
          factionKeywords: ['Space Wolves', 'Adeptus Astartes'],
          baseSize: '32mm',
        },
        {
          id: 'askars-wolfpack-wolf-guard-terminators',
          name: "Askar's Wolfpack Wolf Guard Terminators",
          profiles: [
            { name: 'Wolf Guard Terminator Pack Leader', m: '6"', t: '5', sv: '2+', w: '3', ld: '6+', oc: '1', inv: '4+' },
            { name: 'Wolf Guard Terminator with Assault Cannon and Power Fist', m: '6"', t: '5', sv: '2+', w: '3', ld: '6+', oc: '1', inv: '4+' },
            { name: 'Wolf Guard Terminator with Storm Bolter and Master-crafted Power Weapon', m: '6"', t: '5', sv: '2+', w: '3', ld: '6+', oc: '1', inv: '4+' },
          ],
          ranged: [
            { name: 'Assault Cannon', tags: ['DEVASTATING WOUNDS'], range: '24"', a: '6', bs: '2+', s: '6', ap: '0', d: '1' },
            { name: 'Storm Bolter', tags: ['RAPID FIRE 2'], range: '24"', a: '2', bs: '2+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Relic Greataxe', tags: ['DEVASTATING WOUNDS'], a: '3', ws: '3+', s: '7', ap: '-2', d: '3' },
            { name: 'Power Fist', tags: [], a: '3', ws: '3+', s: '8', ap: '-2', d: '2' },
            { name: 'Master-crafted Power Weapon', tags: [], a: '4', ws: '3+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Oath of Moment & Curse of the Wulfen',
          abilities: [
            { name: 'Rugged Resilience', text: "Attacks that target this unit with a S greater than this unit's T have -1 to wound rolls." },
          ],
          composition: [
            '1 Wolf Guard Terminator Pack Leader model',
            '1 Wolf Guard Terminator with Assault Cannon and Power Fist model',
            '3 Wolf Guard Terminator with Storm Bolter and Master-crafted Power Weapon models',
          ],
          loadout: `**The Wolf Guard Terminator Pack Leader is equipped with:** Relic Greataxe.
**The Wolf Guard Terminator with Assault Cannon and Power Fist is equipped with:** Assault Cannon; Power Fist.
**Every Wolf Guard Terminator with Storm Bolter and Master-crafted Power Weapon is equipped with:** Master-crafted Power Weapon; Storm Bolter.`,
          keywords: ["Askar's Wolfpack", 'Imperium', 'Infantry', 'Terminator', 'Wolf Guard'],
          factionKeywords: ['Space Wolves', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'fyrri-askar',
          name: 'Fyrri Askar',
          profiles: [
            { name: 'Fyrri Askar', m: '7"', t: '4', sv: '3+', w: '5', ld: '6+', oc: '1', inv: '4+' },
          ],
          melee: [
            { name: 'Master-crafted Power Weapon', tags: [], a: '7', ws: '2+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Oath of Moment & Curse of the Wulfen',
          abilities: [
            { name: 'Storm Shield', text: 'This model has 6 W.' },
            { name: 'Heroic Last Stand', text: 'In the Fight phase, when this model is destroyed, if this unit has not been selected to fight this phase, roll one D6: on a 2+, do not remove this model from the battlefield. When this unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield.' },
          ],
          composition: ['1 Fyrri Askar model'],
          loadout: '**This model is equipped with:** Master-crafted Power Weapon.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ["Askar's Wolfpack Blood Claws"],
          },
          keywords: ["Askar's Wolfpack", 'Battle Leader', 'Character', 'Imperium', 'Infantry', 'Tacticus', 'Wolf Guard'],
          factionKeywords: ['Space Wolves', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
        {
          id: 'askars-wolfpack-wulfen',
          name: "Askar's Wolfpack Wulfen",
          profiles: [
            { name: 'Wulfen', m: '9"', t: '6', sv: '4+', w: '2', ld: '7+', oc: '0' },
            { name: 'Wulfen with Stormfrag Auto-launcher', m: '9"', t: '6', sv: '4+', w: '2', ld: '7+', oc: '0' },
          ],
          ranged: [
            { name: 'Stormfrag Auto-launcher', tags: ['ASSAULT', 'BLAST 1'], range: '12"', a: 'D3', bs: '4+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Feral Claws', tags: ['SUSTAINED HITS 1'], a: '3', ws: '3+', s: '5', ap: '-2', d: '2' },
          ],
          faction: 'Oath of Moment & Curse of the Wulfen',
          abilities: [
            { name: 'Death Totem', text: "This model's melee attacks can re-roll hit rolls of 1." },
            { name: 'Savage Frenzy', text: 'When an enemy unit (excluding Monster/Vehicle units) engaged with this unit is selected to make a fall-back move:\n▪ That enemy unit must select the desperate escape mode.\n▪ If that enemy unit is battle-shocked, that enemy unit has -1 to the hazard rolls made for that desperate escape.' },
          ],
          composition: ['2 Wulfen with Feral Claws and Stormfrag Auto-launcher models', '3 Wulfen with Feral Claws models'],
          loadout: `**Every Wulfen with Feral Claws and Stormfrag Auto-launcher is equipped with:** Death Totem; Feral Claws; Stormfrag Auto-launcher.
**Every Wulfen with Feral Claws is equipped with:** Death Totem; Feral Claws.`,
          keywords: ["Askar's Wolfpack", 'Imperium', 'Infantry'],
          factionKeywords: ['Space Wolves', 'Adeptus Astartes'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'thousand-sons',
      name: 'Thousand Sons',
      boxName: 'Prism of Zadophon',
      dp: 1,
      forceDisposition: 'Take and Hold',

      rule: {
        name: 'Committed to the Ritual',
        flavor: 'Zadophon’s empyric rituals bend the weave of fate to better serve his Dark God’s designs. His thralls are committed to their completion and will not be swayed from their part in these magicks, no matter the might sent against them.',
        body: `▪ Friendly Prism of Zadophon units have +1 Ld while within range of an objective.
▪ Binding Ritual (Once per turn, per army): When playing a Combat Patrol battle, when a friendly model within range of an objective manifests a Ritual with a Warp Charge value of 7 or more, you can choose for your army to have bound that Ritual and that objective (see the Cult Ritual Objective). If you do, do not resolve that Ritual's effects.
▪ When playing a Combat Patrol battle, the following friendly units must start the battle in strategic reserves and cannot be set up on the battlefield before the battle round stated, and must be set up wholly within your deployment zone when they do: Daemon Prince (battle round 3).`,
      },

      // Verbatim from the Codex armyRule (src/data/factions/thousand-sons.js) — both CP-linked
      // rows (Cabal of Sorcerers, Pact of Sorcery) confirmed identical in game text to the Codex
      // versions (the only differences were decorative appdata image placeholders, no text change).
      armyRule: {
        name: 'Cabal of Sorcerers & Pact of Sorcery',
        flavor: 'The Thousand Sons are wreathed in the energies of the Warp. It is the gift of their sorcerous leaders to channel this power through battlefield ritual, to divine forbidden knowledge, to weave illusory magicks or to ravage their foes with empyric fire and mutation.',
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

      stratagems: [
        {
          name: 'Twist of Fate',
          sublabel: 'Prism of Zadophon – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Shimmering empyric energies surround this mutant cultist’s form. Perhaps this being is destined to play a crucial role in the Changer of Ways’ endless schemes?',
          when: 'Your opponent\'s Shooting phase or the Fight phase, when an enemy unit targets a friendly Prism of Zadophon Mutant unit.',
          target: 'That Prism of Zadophon Mutant unit.',
          effect: 'Your unit has 4+ InSv.',
          restrictions: '',
        },
        {
          name: 'Spell-warded Armour',
          sublabel: 'Prism of Zadophon – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Reinforced by sorcerous wards and hexes, the armour of Rubric Marines is astonishingly resilient to incoming fire.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Prism of Zadophon Rubric Marines unit.",
          target: 'That Prism of Zadophon Rubric Marines unit.',
          effect: "Ranged attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
        {
          name: 'Embroiling Energies',
          sublabel: 'Prism of Zadophon – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Those Sorcerers who shepherd the Rubricae in battle favour destructive magicks, wielding warpflame even in the press and confusion of melee combat.',
          when: 'Your Shooting phase, when a friendly Prism of Zadophon Rubric Marines unit is selected to shoot.',
          target: 'That Prism of Zadophon Rubric Marines unit.',
          effect: `▪ That unit's malefic curse weapon has [CLOSE-QUARTERS].
▪ That unit's malefic curse weapon has +1 to hit rolls.`,
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Foresight of the Changer',
          isDefault: true,
          flavor: 'The faithful of Tzeentch may benefit from his foresight and by doing so escape certain doom.',
          body: 'Prism of Zadophon Tzaangor Shaman model only. (Once per turn, per unit) In your opponent\'s Movement phase, when an enemy unit ends a move within 8" of this unit, if this unit is unengaged, this unit can make a normal move of up to D3+1".',
        },
        {
          name: 'Warp-tainted Shells',
          isDefault: false,
          flavor: 'Twisted by malefic sorcery, Zadophon’s infernal cannon spits warp-corrupted ammunition that, on impact, sears the soul as terribly as it obliterates the flesh.',
          body: "Prism of Zadophon Daemon Prince model only. This model's infernal cannon weapon has [PSYCHIC].",
        },
      ],

      datasheets: [
        {
          id: 'kaaskrek',
          name: "Kaa'skrek",
          profiles: [
            { name: "Kaa'skrek", m: '10"', t: '4', sv: '5+', w: '4', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Baleful Devolution', tags: ['BLAST 1', 'DEVASTATING WOUNDS', 'PSYCHIC'], range: '18"', a: 'D6', bs: '3+', s: '9', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Force Stave', tags: ['PSYCHIC'], a: '3', ws: '3+', s: '5', ap: '-1', d: 'D3' },
          ],
          faction: 'Cabal of Sorcerers & Pact of Sorcery',
          abilities: [
            { name: 'Bestial Prophet', text: "If this unit is an Attached unit, this unit's attacks have +1 to hit rolls." },
            { name: 'Sacrificial Blessing', text: "In your Shooting phase and the Fight phase, when this unit is selected to attack, if this unit has one or more Bodyguard models, you can use this ability. If you do:\n▪ One Bodyguard model in this unit is destroyed.\n▪ This model's attacks have +D3 A and S." },
          ],
          composition: ["1 Kaa'skrek model"],
          loadout: '**This model is equipped with:** Baleful Devolution; Force Stave.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Prism of Zadophon Tzaangor Enlightened'],
          },
          keywords: ['Chaos', 'Character', 'Fly', 'Infantry', 'Mounted', 'Mutant', 'Prism of Zadophon', 'Psyker', 'Tzaangor Shaman', 'Tzeentch'],
          factionKeywords: ['Thousand Sons'],
          baseSize: '40mm',
        },
        {
          id: 'zadophon-the-soul-eater',
          name: 'Zadophon the Soul Eater',
          profiles: [
            { name: 'Zadophon the Soul Eater', m: '9"', t: '10', sv: '2+', w: '10', ld: '6+', oc: '3', inv: '4+' },
          ],
          ranged: [
            { name: 'Infernal Cannon', tags: [], range: '24"', a: '3', bs: '2+', s: '5', ap: '-2', d: '2' },
          ],
          melee: [
            { name: 'Hellforged Weapons – Strike', tags: ['DEVASTATING WOUNDS', 'PSYCHIC'], a: '6', ws: '2+', s: '8', ap: '-2', d: '3' },
            { name: 'Hellforged Weapons – Sweep', tags: ['DEVASTATING WOUNDS', 'PSYCHIC'], a: '12', ws: '2+', s: '6', ap: '-1', d: '1' },
          ],
          faction: 'Cabal of Sorcerers & Pact of Sorcery',
          abilities: [
            { name: 'Spirit Snare', text: "When a friendly Thousand Sons Psyker model with the Cabal of Sorcerers ability is destroyed, if that model is within 9\" of a model with this ability, you can select one of those models with this ability. When that selected model attempts a Ritual, it has +1 to the Psychic test result (to a maximum of +2)." },
            { name: 'Glamour of Tzeentch (Aura, Psychic)', text: 'While a friendly Thousand Sons Infantry unit is within 6" of this model, that unit has Stealth.' },
          ],
          composition: ['1 Zadophon the Soul Eater model'],
          loadout: '**This model is equipped with:** Hellforged Weapons; Infernal Cannon.',
          keywords: ['Chaos', 'Character', 'Daemon', 'Daemon Prince', 'Monster', 'Prism of Zadophon', 'Psyker', 'Tzeentch'],
          factionKeywords: ['Thousand Sons'],
          baseSize: '60mm',
        },
        {
          id: 'prism-of-zadophon-tzaangor-enlightened',
          name: 'Prism of Zadophon Tzaangor Enlightened',
          profiles: [
            { name: 'Tzaangor Enlightened', m: '10"', t: '4', sv: '5+', w: '2', ld: '7+', oc: '2', inv: '5+' },
          ],
          melee: [
            { name: 'Divining Spear', tags: ['LANCE', 'PRECISION'], a: '3', ws: '4+', s: '5', ap: '-1', d: '2' },
          ],
          faction: 'Cabal of Sorcerers & Pact of Sorcery',
          abilities: [
            { name: 'Prophesied Doom', text: 'When this unit ends a charge move, you can select one enemy unit engaged with this unit. For each model in this unit engaged with that enemy unit, roll one D6:\n▪ On a 4+, that enemy unit suffers 1 mortal wound.' },
          ],
          composition: ['3 Tzaangor Enlightened models'],
          loadout: '**Every model is equipped with:** Divining Spear.',
          keywords: ['Chaos', 'Fly', 'Mounted', 'Mutant', 'Prism of Zadophon', 'Tzeentch'],
          factionKeywords: ['Thousand Sons'],
          baseSize: '40mm',
        },
        {
          id: 'prism-of-zadophon-rubric-marines',
          name: 'Prism of Zadophon Rubric Marines',
          profiles: [
            { name: 'Aspiring Sorcerer', m: '6"', t: '4', sv: '3+', w: '3', ld: '6+', oc: '2' },
            { name: 'Rubric Marine with Warpflamer and Stocks and Fists', m: '6"', t: '4', sv: '3+', w: '2', ld: '7+', oc: '2' },
            { name: 'Rubric Marine with Soulreaper Cannon and Stocks and Fists', m: '6"', t: '4', sv: '3+', w: '2', ld: '7+', oc: '2' },
            { name: 'Rubric Marine with Inferno Boltgun and Stocks and Fists', m: '6"', t: '4', sv: '3+', w: '2', ld: '7+', oc: '2' },
          ],
          ranged: [
            { name: 'Inferno Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Malefic Curse', tags: ['ANTI-INFANTRY 4+', 'DEVASTATING WOUNDS', 'PSYCHIC'], range: '24"', a: '3', bs: '3+', s: '4', ap: '-3', d: '1' },
            { name: 'Soulreaper Cannon', tags: ['DEVASTATING WOUNDS'], range: '24"', a: '6', bs: '3+', s: '6', ap: '-2', d: '1' },
            { name: 'Inferno Boltgun', tags: [], range: '24"', a: '2', bs: '3+', s: '4', ap: '-2', d: '1' },
            { name: 'Warpflamer', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '3+', s: '4', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Force Weapon', tags: ['PSYCHIC'], a: '3', ws: '3+', s: '6', ap: '-1', d: 'D3' },
            { name: 'Stocks and Fists', tags: [], a: '2', ws: '3+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Cabal of Sorcerers & Pact of Sorcery',
          abilities: [
            { name: 'Icon of Flame', text: "This unit's ranged attacks (excluding Character models' attacks) have [IGNORES COVER]." },
            { name: 'Bringers of Change', text: "This unit's ranged attacks:\n▪ Can re-roll wound rolls of 1.\n▪ Or: That target a unit within range of an objective can re-roll wound rolls." },
          ],
          composition: [
            '1 Aspiring Sorcerer model',
            '1 Rubric Marine with Soulreaper Cannon and Stocks and Fists model',
            '3 Rubric Marine with Inferno Boltgun and Stocks and Fists models',
            '5 Rubric Marine with Warpflamer and Stocks and Fists models',
          ],
          loadout: `**The Aspiring Sorcerer is equipped with:** Force Weapon; Inferno Bolt Pistol; Malefic Curse.
**The Rubric Marine with Soulreaper Cannon and Stocks and Fists is equipped with:** Soulreaper Cannon; Stocks and Fists.
**Every Rubric Marine with Inferno Boltgun and Stocks and Fists is equipped with:** Inferno Boltgun; Stocks and Fists.
**Every Rubric Marine with Warpflamer and Stocks and Fists is equipped with:** Stocks and Fists; Warpflamer.`,
          keywords: ['Battleline', 'Chaos', 'Infantry', 'Prism of Zadophon', 'Psyker', 'Rubricae', 'Tzeentch'],
          factionKeywords: ['Thousand Sons'],
          baseSize: '32mm',
        },
      ],
    },

    {
      slug: 'tyranids',
      name: 'Tyranids',
      boxName: 'The Vardenghast Swarm',
      dp: 1,
      forceDisposition: 'Disruption',

      rule: {
        name: 'Skittering Hordes',
        flavor: 'So numerous and horrifying are the teeming organisms of the Vardenghast Swarm that mortal minds struggle to select targets amid the scrambling masses.',
        body: 'Enemy units\' ranged attacks that target a friendly Vardenghast Swarm Infantry unit not within 12" have -1 to hit rolls.',
      },

      // Verbatim from the Codex armyRule (src/data/factions/tyranids.js) — both CP-linked rows
      // (Shadow in the Warp, Synapse) confirmed byte-for-byte identical to the Codex versions.
      armyRule: {
        name: 'Synapse & Shadow in the Warp',
        flavor: 'The teeming broods of a hive fleet do not think for themselves. They are directed by the gestalt consciousness of the Hive Mind, its iron will channelled through synapse-beasts and cast over the battlefield as an icy, alien dread that gnaws at the minds of the prey.',
        body: `### Synapse
Some Tyranids serve as synaptic conduits or nodal relays through which a portion of the Hive Mind's iron will flows, overriding the natural instincts of the swarm to direct the teeming warrior-beasts to function as a single, gestalt organism on the battlefield.

If your Army Faction is Tyranids, while a Tyranids unit from your army is within 6" of one or more friendly Synapse models, that Tyranids unit is said to be within Synapse Range of that model and of your army. While a Tyranids unit from your army is within Synapse Range of your army:
▪ Each time that unit takes a Battle-shock test, take that test on 3D6 instead of 2D6.
▪ Each time a model in that unit makes a melee attack, add 1 to the Strength characteristic of that attack.

### Shadow in the Warp
Tyranids flood the battlefield with the psychic signature of the hive fleet — an icy, alien dread that gnaws at the minds of their prey and smothers even the most stalwart courage. When faced with such unfathomable horror, many are driven insane or suffer catastrophic neural damage.

If your Army Faction is Tyranids, once per battle, in either player's Command phase, if one or more units from your army with this ability are on the battlefield, you can unleash the Shadow in the Warp. When you do, each enemy unit on the battlefield must take a Battle-shock test. Each time an enemy unit takes such a Battle-shock test, if it is within 6" of one or more Synapse units from your army, subtract 1 from that test.`,
      },

      stratagems: [
        {
          name: 'Swarm-marked',
          sublabel: 'The Vardenghast Swarm – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'Biomass-rich positions are laced with pheromones and toxic spores by the Vardenghast Swarm’s warrior organisms, marking them out for further waves to overrun and devour.',
          when: 'End of your Movement phase.',
          target: 'One friendly Vardenghast Swarm Termagants unit.',
          effect: 'Select one objective your unit is controlling. That objective is secured.',
          restrictions: '',
        },
        {
          name: 'Skulking Hunters',
          sublabel: 'The Vardenghast Swarm – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Possessing the sharpened instincts of true predators, the warrior organisms of the Vardenghast Swarm are capable of stealth, skittering through shadows and cover to conceal their approach from wary foes.',
          when: "Start of your opponent's Shooting phase.",
          target: 'One friendly Vardenghast Swarm Infantry unit.',
          effect: 'Your unit has -6" detection range.',
          restrictions: '',
        },
        {
          name: 'Brute Speed',
          sublabel: 'The Vardenghast Swarm – Stratagem',
          cp: '1CP',
          turn: 'your',
          flavor: 'The Vardenghast Swarm sweeps toward their prey with horrifying speed, bounding across open ground and through shattered ruins to close in on wavering prey.',
          when: 'Your Movement phase, when a friendly Vardenghast Swarm unit is selected to make an advance move.',
          target: 'That Vardenghast Swarm unit.',
          effect: 'Your unit can change that advance roll to a 6.',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Adapted Organism',
          isDefault: true,
          flavor: 'Forged by the Hive Mind as a dedicated killer, this warrior organism possesses hyperattuned reflexes, plentiful fast-twitch muscle fibres and additional, ablative layers of chitinous plate.',
          body: `Vardenghast Swarm Winged Tyranid Prime model only.
▪ This model has 4+ InSv.
▪ This model's melee attacks have +2 AP.`,
        },
        {
          name: 'Psychoclastic Overload',
          isDefault: false,
          upgrade: true,
          flavor: 'When a Psychophage’s retention sacs reach capacity, such a creature can vomit forth a stream of psychocorrosive particles large enough to erode the minds and bodies of an entire squad of enemy soldiers.',
          body: 'Upgrade: Vardenghast Swarm Psychophage unit only. This unit can re-roll rolls to determine the A of a weapon.',
        },
      ],

      datasheets: [
        {
          id: 'vardenghast-swarm-psychophage',
          name: 'Vardenghast Swarm Psychophage',
          profiles: [
            { name: 'Vardenghast Swarm Psychophage', m: '12"', t: '9', sv: '3+', w: '10', ld: '8+', oc: '3' },
          ],
          ranged: [
            { name: 'Psychoclastic Torrent', tags: ['IGNORES COVER', 'TORRENT'], range: '12"', a: 'D6', bs: '3+', s: '6', ap: '-1', d: '1' },
          ],
          melee: [
            { name: 'Talons and Betentacled Maw', tags: ['ANTI-PSYKER 4+', 'DEVASTATING WOUNDS'], a: '6', ws: '3+', s: '6', ap: '-2', d: '2' },
          ],
          faction: 'Synapse & Shadow in the Warp',
          abilities: [
            { name: 'Feeding Frenzy', text: "This model's melee attacks that target:\n▪ A unit below starting strength have +1 to hit rolls.\n▪ A unit below half-strength have +1 to wound rolls." },
            { name: 'Bio-stimulus (Aura)', text: 'While a friendly Tyranids unit is within 6" of this model, that unit has Feel No Pain 6+.' },
          ],
          composition: ['1 Psychophage model'],
          loadout: '**This model is equipped with:** Psychoclastic Torrent; Talons and Betentacled Maw.',
          keywords: ['Harvester', 'Monster', 'Smoke', 'Vardenghast Swarm'],
          factionKeywords: ['Tyranids'],
          baseSize: '120x92mm Oval Base',
        },
        {
          id: 'vardenghast-swarm-barbgaunts',
          name: 'Vardenghast Swarm Barbgaunts',
          profiles: [
            { name: 'Barbgaunt', m: '6"', t: '4', sv: '4+', w: '2', ld: '8+', oc: '1' },
          ],
          ranged: [
            { name: 'Barblauncher', tags: ['BLAST 1', 'HEAVY'], range: '24"', a: 'D6', bs: '4+', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Chitinous Claws and Teeth', tags: [], a: '1', ws: '4+', s: '4', ap: '0', d: '1' },
          ],
          faction: 'Synapse & Shadow in the Warp',
          abilities: [
            { name: 'Disruption Bombardment', text: 'In your Shooting phase, when this unit has shot, you can select one enemy unit hit by those attacks. If you do, that enemy unit is pinned until the start of your next turn:\n▪ While a unit is pinned, that unit:\n▪ Has -2" M.\n▪ Has -2 to advance rolls and charge rolls.' },
          ],
          composition: ['5 Barbgaunt models'],
          loadout: '**Every model is equipped with:** Barblauncher; Chitinous Claws and Teeth.',
          keywords: ['Infantry', 'Vardenghast Swarm'],
          factionKeywords: ['Tyranids'],
          baseSize: '40mm',
        },
        {
          id: 'terror-of-vardenghast',
          name: 'Terror of Vardenghast',
          profiles: [
            { name: 'Terror of Vardenghast', m: '12"', t: '5', sv: '4+', w: '6', ld: '7+', oc: '1' },
          ],
          melee: [
            { name: 'Prime Talons', tags: [], a: '6', ws: '2+', s: '6', ap: '-1', d: '2' },
          ],
          faction: 'Synapse & Shadow in the Warp',
          abilities: [
            { name: 'Death Blow', text: 'In the fight phase, when this model is destroyed, if this unit has not been selected to fight this phase, roll one D6:\n▪ On a 4+, do not remove this model from the battlefield. When your unit has fought, or at the end of the phase (whichever comes first), this model is removed from the battlefield.' },
            { name: 'Bio-Reserves (Once per battle per unit)', text: 'At the start or end of your Movement phase, you can use this ability. If you do:\n▪ Select one friendly unengaged Vardenghast Swarm Termagants unit. That unit heals 2D6 wounds.\n▪ Or: Select one friendly destroyed Vardenghast Swarm Termagants unit. That unit heals 10 wounds and is placed in strategic reserves.' },
          ],
          composition: ['1 Terror of Vardenghast model'],
          loadout: '**This model is equipped with:** Prime Talons.',
          keywords: ['Character', 'Fly', 'Infantry', 'Synapse', 'Vanguard Invader', 'Vardenghast Swarm', 'Winged Tyranid Prime'],
          factionKeywords: ['Tyranids'],
          baseSize: '50mm',
        },
        {
          id: 'vardenghast-swarm-termagants',
          name: 'Vardenghast Swarm Termagants',
          profiles: [
            { name: 'Termagant', m: '6"', t: '3', sv: '5+', w: '1', ld: '8+', oc: '2' },
          ],
          ranged: [
            { name: 'Fleshborer', tags: ['ASSAULT'], range: '18"', a: '1', bs: '4+', s: '5', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Chitinous Claws and Teeth', tags: [], a: '1', ws: '4+', s: '3', ap: '0', d: '1' },
          ],
          faction: 'Synapse & Shadow in the Warp',
          abilities: [
            { name: 'Skulking Horrors (Once per phase per unit)', text: 'In your opponent’s Movement phase, when an enemy unit ends a move within 8" of this unit, if this unit is unengaged, this unit can make a normal move of up to D6".' },
          ],
          composition: ['10 Termagant models'],
          loadout: '**Every model is equipped with:** Chitinous Claws and Teeth; Fleshborer.',
          keywords: ['Battleline', 'Endless Multitude', 'Infantry', 'Vardenghast Swarm'],
          factionKeywords: ['Tyranids'],
          baseSize: '28.5mm',
        },
        {
          id: 'vardenghast-swarm-von-ryans-leapers',
          name: "Vardenghast Swarm Von Ryan's Leapers",
          profiles: [
            { name: "Von Ryan's Leaper", m: '10"', t: '5', sv: '4+', w: '3', ld: '8+', oc: '1', inv: '6+' },
          ],
          melee: [
            { name: 'Chitinous Talons', tags: [], a: '6', ws: '3+', s: '5', ap: '-1', d: '1' },
          ],
          faction: 'Synapse & Shadow in the Warp',
          abilities: [
            { name: 'Pouncing Leap (Once per turn per unit)', text: 'You can target this unit with the Heroic Intervention stratagem, regardless of any other uses of that stratagem this phase. If you do:\n▪ That use is -1 CP.\n▪ That use does not prevent any uses of that stratagem on other units this phase.' },
          ],
          composition: ["3 Von Ryan's Leaper models"],
          loadout: '**Every model is equipped with:** Chitinous Talons.',
          keywords: ['Infantry', 'Vanguard Invader', 'Vardenghast Swarm'],
          factionKeywords: ['Tyranids'],
          baseSize: '40mm',
        },
      ],
    },

    {
      slug: 'world-eaters',
      name: 'World Eaters',
      boxName: 'Frenzied Reavers',
      dp: 1,
      forceDisposition: 'Purge the Foe',

      rule: {
        name: 'Berzerker Charge',
        flavor: 'The World Eaters attack in relentless waves of fury, each as rabid and bloodthirsty as the last.',
        body: `▪ When a friendly Frenzied Reavers unit is selected to fight, if that unit made a charge move this turn, its melee attacks have +1 S.
▪ When playing a Combat Patrol battle, the following friendly units must start the battle in strategic reserves and cannot be set up on the battlefield before the battle round stated, and must be set up wholly within your deployment zone when they do: Daemon Prince (battle round 2).`,
      },

      // Verbatim from the Codex armyRule (src/data/factions/world-eaters.js) — confirmed
      // identical in game text to the CP box's own copy (the only differences were decorative
      // appdata image placeholders showing each Blessing's dice requirement, no text change).
      armyRule: {
        name: 'Blessings of Khorne',
        flavor: 'Khorne is the Chaos god of warfare and slaughter to whom all World Eaters are devoted. He blesses those who spill blood and take skulls in his infernal name.',
        body: `If your Army Faction is World Eaters, at the start of the battle round, you can make a Blessings of Khorne roll. To do so, roll eight D6. You can then use those dice to activate up to two Blessings of Khorne (see below). Each Blessing of Khorne specifies the dice results it requires (where a number is specified, a double or triple of that value or higher is required). You can only activate each Blessing of Khorne once per battle round. Any unused dice from the Blessings of Khorne roll are then discarded. Once activated, each Blessing of Khorne applies to all units from your army with this ability until the end of the battle round.

### The Blessings
▪ **Unbridled Bloodlust (Double 1+):** This unit has +1 to Charge rolls.
▪ **Rage-Fuelled Invigoration (Double 2+):** Each time a model in this unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".
▪ **Total Carnage (Double 3+):** Each time a model in this unit is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 4+, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.
▪ **Martial Excellence (Double 4+):** Melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.
▪ **Warp Blades (Double 5+):** Melee weapons equipped by models in this unit have the [LETHAL HITS] ability.
▪ **Decapitating Strikes (Double 6):** Each time a model in this unit makes a melee attack that targets an Infantry unit, that attack has the [DEVASTATING WOUNDS] ability.`,
      },

      stratagems: [
        {
          name: 'Horrifying Butchery',
          sublabel: 'Frenzied Reavers – Stratagem',
          cp: '1CP',
          turn: 'either',
          flavor: 'With chainaxe, boot and fist, Khorne Berzerkers hack and bludgeon their way forward, the gore-drenched violence of their advance filling mortal hearts with debilitating terror.',
          when: 'Start of the Fight phase.',
          target: 'One friendly engaged Frenzied Reavers Khorne Berzerkers unit.',
          effect: 'Select one enemy unit engaged with your unit. That enemy unit makes a battle-shock roll, with -1 to that battle-shock roll.',
          restrictions: '',
        },
        {
          name: 'Berserk Resilience',
          sublabel: 'Frenzied Reavers – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'When lost in the ecstasy of slaughter, the followers of Khorne are all but inured to injury.',
          when: "Your opponent's Shooting phase, when an enemy unit targets a friendly Frenzied Reavers Infantry unit.",
          target: 'That Frenzied Reavers Infantry unit.',
          effect: "Ranged attacks that target your unit with a S greater than your unit's T have -1 to wound rolls.",
          restrictions: '',
        },
        {
          name: 'Rabid Response',
          sublabel: 'Frenzied Reavers – Stratagem',
          cp: '1CP',
          turn: 'opponent',
          flavor: 'Stimms and tainted blood coursing through their arteries and veins, Jakhals exist in a permanent state of twitching frenzy, reacting to incoming fire by hurling themselves bodily towards their assailants.',
          when: "Your opponent's Shooting phase, when an enemy unit has shot, if that unit targeted a friendly unengaged Frenzied Reavers Jakhals unit.",
          target: 'That Frenzied Reavers Jakhals unit.',
          effect: 'Your unit can make a normal move of up to D6".',
          restrictions: '',
        },
      ],

      enhancements: [
        {
          name: 'Bane of the Craven',
          isDefault: true,
          flavor: 'Daemon Princes of Khorne reserve their most violent hatred for cowards, butchering any who flee the fight with murderous abandon.',
          body: `Frenzied Reavers Master of Executions model only. When an enemy unit engaged with this unit is selected to make a fall-back move:
▪ That enemy unit must select the desperate escape mode.
▪ If that enemy unit is battle-shocked, that enemy unit has -1 to the hazard rolls made for that desperate escape.`,
        },
        {
          name: 'Fearsome Presence',
          isDefault: false,
          flavor: 'Towering infernal monsters, Daemon Princes of Khorne dominate the battlefield, inspiring abject terror in all who stand before them.',
          body: 'Frenzied Reavers Daemon Prince model only. This model has OC 5.',
        },
      ],

      datasheets: [
        {
          id: 'frenzied-reavers-khorne-berzerkers',
          name: 'Frenzied Reavers Khorne Berzerkers',
          profiles: [
            { name: 'Khorne Berzerker with Bolt Pistol and Chainblade', m: '8"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Khorne Berzerker Champion', m: '8"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Khorne Berzerker with Plasma Pistol and Chainblade', m: '8"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
            { name: 'Khorne Berzerker with Bolt Pistol and Khornate Eviscerator', m: '8"', t: '4', sv: '3+', w: '2', ld: '6+', oc: '2' },
          ],
          ranged: [
            { name: 'Plasma Pistol – Standard', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '7', ap: '-2', d: '1' },
            { name: 'Plasma Pistol – Supercharge', tags: ['CLOSE-QUARTERS', 'HAZARDOUS'], range: '12"', a: '1', bs: '4+', s: '8', ap: '-3', d: '2' },
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Chainblade', tags: [], a: '4', ws: '3+', s: '4', ap: '-1', d: '1' },
            { name: 'Khornate Eviscerator', tags: [], a: '3', ws: '3+', s: '8', ap: '-2', d: '2' },
          ],
          faction: 'Blessings of Khorne',
          abilities: [
            { name: 'Icon of Khorne', text: 'When this unit destroys an enemy unit, you gain 1 Bloodshed Point. When making a Blessings of Khorne roll:\n▪ Roll one additional D6 for each Bloodshed Point you have.\n▪ Then, you lose your Bloodshed Points.' },
            { name: 'Blood Surge (Once per turn, per unit)', text: "In your opponent's Shooting phase, when an enemy unit has shot, if those attacks destroyed a model in this unit and this unit is unengaged, this unit can make a surge move of up to D6+2\"." },
          ],
          composition: [
            '1 Khorne Berzerker Champion model',
            '2 Khorne Berzerker with Bolt Pistol and Khornate Eviscerator models',
            '2 Khorne Berzerker with Plasma Pistol and Chainblade models',
            '5 Khorne Berzerker with Bolt Pistol and Chainblade models',
          ],
          loadout: `**The Khorne Berzerker Champion is equipped with:** Chainblade; Plasma Pistol.
**Every Khorne Berzerker with Bolt Pistol and Khornate Eviscerator is equipped with:** Bolt Pistol; Khornate Eviscerator.
**Every Khorne Berzerker with Plasma Pistol and Chainblade is equipped with:** Chainblade; Plasma Pistol.
**Every Khorne Berzerker with Bolt Pistol and Chainblade is equipped with:** Bolt Pistol; Chainblade.`,
          keywords: ['Battleline', 'Chaos', 'Explosives', 'Frenzied Reavers', 'Infantry', 'Khorne'],
          factionKeywords: ['World Eaters'],
          baseSize: '32mm',
        },
        {
          id: 'frenzied-reavers-master-of-executions',
          name: 'Frenzied Reavers Master of Executions',
          profiles: [
            { name: 'Master of Executions', m: '8"', t: '4', sv: '3+', w: '4', ld: '6+', oc: '1' },
          ],
          ranged: [
            { name: 'Bolt Pistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '3+', s: '4', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Axe of Dismemberment', tags: ['DEVASTATING WOUNDS', 'PRECISION'], a: '5', ws: '2+', s: '7', ap: '-2', d: '2' },
          ],
          faction: 'Blessings of Khorne',
          abilities: [
            { name: 'A Worthy Skull', text: "▪ This model's melee attacks that target a Character unit can re-roll hit rolls and re-roll wound rolls.\n▪ When this unit destroys a Character model, you gain 1CP." },
          ],
          composition: ['1 Master of Executions model'],
          loadout: '**This model is equipped with:** Axe of Dismemberment; Bolt Pistol.',
          leader: {
            text: 'This model can be attached to the following units:',
            units: ['Frenzied Reavers Khorne Berzerkers'],
          },
          keywords: ['Chaos', 'Character', 'Frenzied Reavers', 'Infantry', 'Khorne'],
          factionKeywords: ['World Eaters'],
          baseSize: '40mm',
        },
        {
          id: 'frenzied-reavers-jakhals',
          name: 'Frenzied Reavers Jakhals',
          profiles: [
            { name: 'Dishonoured', m: '7"', t: '4', sv: '6+', w: '1', ld: '7+', oc: '1' },
            { name: 'Jakhal with Autopistol and Chainblade', m: '7"', t: '4', sv: '6+', w: '1', ld: '7+', oc: '1' },
            { name: 'Jakhal with Autopistol and Mauler Chainblade', m: '7"', t: '4', sv: '6+', w: '1', ld: '7+', oc: '1' },
            { name: 'Jakhal Pack Leader', m: '7"', t: '4', sv: '6+', w: '1', ld: '7+', oc: '1' },
          ],
          ranged: [
            { name: 'Autopistol', tags: ['CLOSE-QUARTERS'], range: '12"', a: '1', bs: '4+', s: '3', ap: '0', d: '1' },
          ],
          melee: [
            { name: 'Skullsmasher and Mangler', tags: [], a: '2', ws: '4+', s: '4', ap: '-1', d: '2' },
            { name: 'Chainblade', tags: [], a: '3', ws: '4+', s: '3', ap: '0', d: '1' },
            { name: 'Mauler Chainblade', tags: [], a: '3', ws: '5+', s: '4', ap: '-1', d: '2' },
          ],
          faction: 'Blessings of Khorne',
          abilities: [
            { name: 'Icon of Khorne', text: 'When this unit destroys an enemy unit, you gain 1 Bloodshed Point. When making a Blessings of Khorne roll:\n▪ Roll one additional D6 for each Bloodshed Point you have.\n▪ Then, you lose your Bloodshed Points.' },
            { name: 'Objective Ravaged', text: 'At the end of your Command phase, if this unit is controlling an objective, that objective is secured.' },
          ],
          composition: [
            '1 Dishonoured model',
            '1 Jakhal Pack Leader model',
            '1 Jakhal with Autopistol and Mauler Chainblade model',
            '7 Jakhal with Autopistol and Chainblade models',
          ],
          loadout: `**The Dishonoured is equipped with:** Skullsmasher and Mangler.
**The Jakhal Pack Leader is equipped with:** Autopistol; Chainblade.
**The Jakhal with Autopistol and Mauler Chainblade is equipped with:** Autopistol; Mauler Chainblade.
**Every Jakhal with Autopistol and Chainblade is equipped with:** Autopistol; Chainblade.`,
          keywords: ['Chaos', 'Explosives', 'Frenzied Reavers', 'Infantry', 'Khorne'],
          factionKeywords: ['World Eaters'],
          baseSize: '28.5mm, 40mm',
        },
        {
          id: 'vorrakh-lord-of-the-frenzied-reavers',
          name: 'Vorrakh, Lord of the Frenzied Reavers',
          profiles: [
            { name: 'Vorrakh', m: '10"', t: '10', sv: '2+', w: '10', ld: '6+', oc: '3', inv: '4+' },
          ],
          ranged: [
            { name: 'Infernal Cannon', tags: ['RAPID FIRE 1'], range: '24"', a: '3', bs: '3+', s: '5', ap: '-1', d: '2' },
          ],
          melee: [
            { name: 'Hellforged Weapons', tags: [], a: '16', ws: '2+', s: '6', ap: '-1', d: '1' },
          ],
          faction: 'Blessings of Khorne',
          abilities: [
            { name: 'Lord of Murder', text: 'While this model is within 3" of a friendly Frenzied Reavers Infantry unit, this unit has Lone Operative.' },
            { name: 'Direct the Slaughter', text: '(Once per battle round, per army) When a friendly Frenzied Reavers unit within 12" of this model is targeted with a stratagem, you can use this ability. If you do, that use is -1CP.' },
            { name: 'Devastating Assault', text: "If this unit made a charge move this turn, this unit's melee attacks have [DEVASTATING WOUNDS]." },
          ],
          composition: ['1 Vorrakh model'],
          loadout: '**This model is equipped with:** Hellforged Weapons; Infernal Cannon.',
          keywords: ['Chaos', 'Character', 'Daemon', 'Daemon Prince', 'Frenzied Reavers', 'Khorne', 'Monster'],
          factionKeywords: ['World Eaters'],
          baseSize: '60mm',
        },
      ],
    },
  ],
}

export const combatPatrol = { en, ru: deepOverlay(en, combatPatrolRu) }
