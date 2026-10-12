// @ts-check
// The shapes the roster engine works on, as JSDoc types — for `npm run typecheck` and the editor,
// nothing at runtime: this module exports no values and nothing imports it but type comments
// (`import('./roster.types.js').RosterUnit`).
//
// Two kinds of data meet in the engine:
//   • the GENERATED datasheet facts, src/data/roster/<slug>.js (scripts/gen-roster-data.mjs and,
//     for Faction Pack Legends, scripts/lib/pack-roster.mjs). Keys are short because 30 of these
//     files ship to the browser; a "boolean" there is `1` or absent. Every key the generator
//     emits must be described here — src/data/roster/types.test.js fails on one that is not;
//   • the PLAYER's roster as it is saved (useRosters.js) — entries that point at those facts by id.
//
// What each field MEANS is written where it is read, in rosterEngine.js and
// src/components/roster/CLAUDE.md; here only enough to know what is what.

/** A wargear item id — a key of src/data/roster/items.js `items`. @typedef {number} ItemId */

/**
 * One option of a wargear group: `[what it grants, points?]`. Slot 0 is an item id, or for a
 * BUNDLE ("1 hexrifle and 1 torturer's tool") a list of `[itemId, count]`. Read it through
 * `optionItems()`, never by hand.
 * @typedef {[ItemId | Array<[ItemId, number]>, number?]} GearOption
 */

/**
 * One wargear group of a datasheet — one instruction ("This model's bolt pistol can be replaced…").
 * @typedef {object} GearGroup
 * @property {number} [m] the miniature profile (index into `minis`) the group belongs to
 * @property {number} [t] instruction text id (items.js `texts`)
 * @property {'checkbox' | 'stepper'} [in] the control: one pick per option, or a count
 * @property {GearOption[]} o the options
 * @property {1} [all] unit-wide: scoped to the whole squad rather than one profile
 * @property {1} [alt] "X or Y": each pick gives up ONE of `rep`, whichever the model holds
 * @property {[number, number]} [cond] `[siblingGroupIndex, wantActive]` — live only on that sibling's state
 * @property {number} [cp] copies of the weapon each model carries, when picks count per copy
 * @property {number} [rc] copies one pick replaces ("2 of this model's heavy bolters")
 * @property {number} [dr] points one pick gives back from a priced default loadout
 * @property {number} [ex] "two different weapons": picks the group must have, once touched
 * @property {number[]} [solo] options complete on their own in an `ex` group
 * @property {number[][]} [excl] sets of options of which each model holds at most one
 * @property {ItemId[]} [keep] items the model keeps ("that model's boltgun cannot be replaced")
 * @property {Array<[number, number, number?]>} [lim] `[modelCount, choiceLimit, duplicateLimit?]` steps
 * @property {ItemId[]} [rep] items a pick replaces
 * @property {1} [repall] a tick swaps the whole profile, not one model
 */

/**
 * A unit size bracket.
 * @typedef {object} SizeBracket
 * @property {number} pts points for the bracket
 * @property {[number, number]} per `[minModels, maxModels]`
 * @property {1} [default] the bracket a new entry starts at
 * @property {Array<[number, number] | [number, number, number]>} [comp] per profile: `[mini, n]` fixed, `[mini, min, max]` free
 */

/**
 * Who a unit can join, named: one row of `leads`.
 * @typedef {object} LeadLink
 * @property {string} to the target datasheet id
 * @property {'leader' | 'support'} type
 * @property {string[]} [allKw] keywords one of which leader and unit must BOTH have (Pactbound Zealots)
 * @property {string} [reqDet] only in this detachment (its appdata uuid, a detachment's `sid`)
 * @property {string} [exclDet] never in this detachment
 */

/**
 * Who a unit can join, by keyword ("any IMPERIUM BATTLELINE INFANTRY unit").
 * @typedef {object} LeadKeywordGroup
 * @property {string[]} kw every keyword the target must have
 * @property {'leader' | 'support'} type
 * @property {string[]} [allKw]
 * @property {string} [reqDet]
 * @property {string} [exclDet]
 */

/**
 * The mark or keyword an entry chooses for itself (`alleg`).
 * @typedef {object} AllegianceChoice
 * @property {string} t the rule's name ("Mark of Chaos")
 * @property {string} [g] the group an optional, army-capped choice counts against
 * @property {string} [det] the detachment that opens it, by name
 * @property {number} [min]
 * @property {number} [max] how many entries of the army may take it
 * @property {1} [req] mandatory: an entry owes a choice
 * @property {Array<{ n: string, wg?: ItemId, kw?: string }>} o the choices; `wg` an item the choice grants
 */

/**
 * The flags a datasheet carries; each is `1` or absent.
 * @typedef {object} UnitFlags
 * @property {1} [alongside] joins beside another Leader without taking its slot
 * @property {1} [char] CHARACTER
 * @property {1} [epic] EPIC HERO
 * @property {1} [legends]
 * @property {1} [noEnh] can take no enhancement
 * @property {1} [noWarlord] cannot be the Warlord
 * @property {1} [nonCharWarlordOk] may be the Warlord without being a CHARACTER
 * @property {1} [supreme] SUPREME COMMANDER
 */

/**
 * One datasheet as the roster builder knows it. `id` is namespaced `<slug>:<id>` for an ally.
 * @typedef {object} RosterUnit
 * @property {string} id
 * @property {string} [sid] appdata datasheet uuid
 * @property {string} name
 * @property {string[]} kws keywords
 * @property {UnitFlags} flags
 * @property {SizeBracket[]} sizes
 * @property {1} [linked] has a datasheet page
 * @property {{ at: number, pts: number }} [step] copy tax: `pts` more from the `at`-th copy on
 * @property {Array<[number, Array<[ItemId, number] | [ItemId, number, 1]>]>} [defaults] per profile, its printed loadout `[item, count, total?]`
 * @property {Array<[number, number]>} [dw] per profile, points one model's default loadout costs
 * @property {GearGroup[]} [gear]
 * @property {Array<{ n: string }>} [minis] miniature profiles, by name
 * @property {LeadLink[]} [leads]
 * @property {LeadKeywordGroup[]} [leadKw]
 * @property {string[]} [along] keywords of a Leader this one may join beside
 * @property {{ n?: number, minModels?: number, noDup?: 1, oneKw?: string }} [hosts] a bodyguard that holds more than one Leader
 * @property {AllegianceChoice} [alleg]
 * @property {1} [condBattleline] can be Battleline under some detachment
 * @property {Array<{ id: string, name: string }>} [crew]
 * @property {{ add: number, base?: number, slots: number, one?: ItemId[], ranged?: [number, ItemId[]] }} [pm] per-model rules across groups
 * @property {Array<{ s: Array<[number] | [number, number]>, k?: number, item?: ItemId }>} [xpm] a model's limit across groups
 * @property {string} [charId] shares a duplicate cap with another datasheet (none today)
 * @property {1} [shared] folded in from the Space Marines pool (index.js, at load)
 */

/**
 * An enhancement a detachment offers.
 * @typedef {object} Enhancement
 * @property {string} name
 * @property {number} pts
 * @property {'miniature' | 'upgrade' | 'unit'} [type]
 * @property {number} [limit] how many units may take it (an "(Upgrade)"); 1 when absent
 * @property {1} [mandatory] applied to every eligible unit, never picked
 * @property {1} [epicOk] an EPIC HERO may take it
 * @property {1} [nonCharOk] a non-CHARACTER may take it
 * @property {1} [notWarlord] not on the Warlord
 * @property {1} [uncounted] does not count against the army's enhancement limit
 * @property {string[]} [exclKw] keywords that bar it
 * @property {Array<{ ds?: string, kw?: string[], fac?: string[] }>} [req] who may take it — any one group
 * @property {Array<{ to: string, type: 'leader' | 'support' }>} [attach] units the bearer can then join
 * @property {string[]} [lockDs] only these datasheets, by `sid` (gen-roster-data.mjs ENH_LOCK_FIXES; empty today)
 */

/**
 * A detachment, as the faction data carries it and the editor passes it around.
 * @typedef {object} Detachment
 * @property {string} name
 * @property {string} [sid] appdata uuid
 * @property {number} [dp] Detachment Points
 * @property {string[]} [fds] the Force Dispositions it gives access to
 * @property {Enhancement[]} enhancements
 * @property {string} [unique] a keyword two of the army's detachments may not share
 * @property {string} [chapter] a Chapter-locked detachment's Chapter
 * @property {1} [lend] offered to other factions only (dropped at load)
 * @property {string[]} [excludedUnits] datasheet ids it locks out
 * @property {string[]} [grantedWarlord] datasheet ids it lets be the Warlord
 * @property {string[]} [mandWarlord] datasheet ids one of which must be the Warlord
 * @property {1} [shared] folded in from another bundle (index.js, at load)
 * @property {string} [from] that bundle's slug
 */

/**
 * An allied context a faction offers.
 * @typedef {object} AllyGroup
 * @property {string} key
 * @property {string} name
 * @property {string[]} ids the units it lists (`<slug>:<id>` when from another bundle)
 * @property {string[]} [dets] the detachments that open it; open always when absent
 * @property {Record<string, number>} [pts] points ceiling per battle size
 * @property {Record<string, Record<string, number>>} [lim] per keyword, a count ceiling per battle size
 * @property {number} [enh]
 * @property {number} [mutex]
 * @property {string[]} [ratio]
 * @property {Array<{ kw: string, donor: string[], recv: string[] }>} [free]
 * @property {Record<string, Record<string, number>>} [up] per unit, points by model count
 */

/**
 * One faction's roster data (src/data/roster/<slug>.js, as loadRosterFaction returns it).
 * @typedef {object} RosterFaction
 * @property {string} slug
 * @property {string} name
 * @property {RosterUnit[]} units
 * @property {Detachment[]} detachments
 * @property {AllyGroup[]} [allies]
 * @property {string[]} [sharedUnitIds] Space Marines datasheets a Chapter folds in
 * @property {string[]} [sharedDetachments]
 * @property {Record<string, string>} [sharedDetachmentFrom]
 * @property {Record<string, Record<string, number>>} [unitPoints] a Chapter's own price for a folded datasheet
 * @property {Record<string, number>} [detachmentDp] a Chapter's own dp for a folded detachment
 * @property {string[]} [noBuild] datasheets with no roster entry, and why not is in the generator
 */

/**
 * A wargear pick on an entry: `[groupIndex, optionIndex, count?]`.
 * @typedef {[number, number, number?]} WargearPick
 */

/**
 * One unit in a player's list.
 * @typedef {object} RosterEntry
 * @property {string} uid
 * @property {string} id the datasheet id
 * @property {number} [size] index into the datasheet's `sizes`
 * @property {number} [count] models fielded, when not the bracket's minimum
 * @property {WargearPick[]} [wg] picks on top of the default loadout, in the order last touched
 * @property {string} [enh] the chosen enhancement, by name
 * @property {boolean} [warlord]
 * @property {string} [leaderOf] uid of the unit this one is attached to
 * @property {string} [alleg] the chosen allegiance option, by name
 * @property {string} [note]
 * @property {string} [blockName] the name of the block this entry is the host of
 */

/**
 * A player's list, as saved.
 * @typedef {object} Roster
 * @property {string} id
 * @property {string} name
 * @property {string} faction
 * @property {string[]} detachments by name
 * @property {string} battleSize a battle size id, 'custom' or 'none'
 * @property {number} [customPoints]
 * @property {{ dp?: number, enh?: number, dup?: number, line?: number }} [customLimits]
 * @property {boolean} [checkLegality]
 * @property {boolean} [archived]
 * @property {string} [disposition] the declared Force Disposition, as `fds` spells it
 * @property {string} [notes]
 * @property {RosterEntry[]} units
 */

/**
 * One battle size (src/data/roster/core.js).
 * @typedef {object} BattleSize
 * @property {string} id
 * @property {string} name
 * @property {number} points
 * @property {number} dp
 * @property {number} enhLimit
 * @property {number} dupLimit
 */

/**
 * One finding of validateRoster (rosterValidation.js). `code` names an `issue_<code>` template in
 * ui.js; `uid` ties it to an entry; `params` fill the template.
 * @typedef {object} RosterIssue
 * @property {string} code
 * @property {'error' | 'warn'} level
 * @property {string} [uid]
 * @property {Record<string, string | number>} [params]
 */

/**
 * A weapon row of a printed datasheet (src/data/datasheets/<slug>.js). The overlay adds `qty` (how
 * many the unit holds), `copy` (a second copy on one model) and `enh` (an enhancement's weapon).
 * @typedef {object} WeaponRow
 * @property {string} name
 * @property {string[]} [tags]
 * @property {string} [range]
 * @property {string} [a]
 * @property {string} [bs]
 * @property {string} [ws]
 * @property {string} [s]
 * @property {string} [ap]
 * @property {string} [d]
 * @property {number} [qty]
 * @property {number} [copy]
 * @property {string} [enh]
 */

/**
 * A printed datasheet as the roster overlay reads it — only the parts it touches are named; the
 * rest of the sheet rides along untouched.
 * @typedef {{ id: string, name: string, ranged?: WeaponRow[], melee?: WeaponRow[], wargearAbilities?: Array<{ name: string, nameEn?: string, text?: string }> } & Record<string, any>} PrintedSheet
 */

/**
 * A roster modifier record (src/data/rosterModifiers/<slug>.js) — the parts read outside its own
 * module.
 * @typedef {{ ref?: { unit?: string, item?: string }, effects?: Array<{ cond?: string[] }> } & Record<string, any>} ModifierRecord
 */

/** Resolves a datasheet id to its facts. @typedef {(id: string) => RosterUnit | null | undefined} DefOf */

export {}
