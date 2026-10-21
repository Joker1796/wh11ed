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
 * A wargear group's condition: `[siblingGroupIndex, wantActive, options?, alsoGroups?]` — `options`
 * (indexes into the sibling's `o`) narrows "the sibling has a pick" to a pick of those; `alsoGroups`
 * are the other groups that take the same item away, counted with the sibling (`options` is null
 * when only they are given).
 * @typedef {[number, number, (number[] | null)?, number[]?]} GearCond
 */

/**
 * One wargear group of a datasheet — one instruction ("This model's bolt pistol can be replaced…").
 * @typedef {object} GearGroup
 * @property {number} [m] the miniature profile (index into `minis`) the group belongs to
 * @property {number} [t] instruction text id (items.js `texts`)
 * @property {'checkbox' | 'stepper'} [in] the control: one pick per option, or a count
 * @property {GearOption[]} o the options
 * @property {1} [all] the unit's, not a model's ("This unit can be equipped with…")
 * @property {[number, 1?]} [pb] a budget per model of the profile: `[picks, noDuplicates?]`
 * @property {1} [alt] "X or Y": each pick gives up ONE of `rep`, whichever the model holds
 * @property {ItemId[][]} [alts] the alternatives of an `alt` group when one is several items ("X and Y, or Z")
 * @property {GearCond | GearCond[]} [cond] one condition, or several that must all hold — live only on those siblings' state (rosterEngine.js condsOf)
 * @property {number} [cp] copies of the weapon each model carries, when picks count per copy
 * @property {number} [rc] copies one pick replaces ("2 of this model's heavy bolters")
 * @property {number} [dr] points one pick gives back from a priced default loadout
 * @property {number} [ex] "two different weapons": picks the group must have, once touched
 * @property {number[]} [solo] options complete on their own in an `ex` group
 * @property {number[][]} [excl] sets of options of which each model holds at most one
 * @property {ItemId[]} [keep] items the model keeps ("that model's boltgun cannot be replaced")
 * @property {Array<[number, number, number?]>} [lim] `[modelCount, choiceLimit, duplicateLimit?]` steps
 * @property {Record<string, number>} [od] one option's own duplicate cap, by option index (Strike Team's guardian drone in a group that takes duplicates)
 * @property {ItemId[]} [rep] items a pick replaces
 * @property {1} [repall] a tick swaps the whole profile, not one model
 */

/**
 * One instruction offered to several profiles, each its own group (`gear` indices, sergeant first),
 * with the allowance they share — `[modelCount, choiceLimit, duplicateLimit?]` steps, as `lim`.
 * @typedef {{ g: number[], lim?: Array<[number, number, number?]> }} GearPool
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
 * @property {string[]} [reqDs] only with one of these datasheets (uuids) in the army (Cato Sicarius: Support with Calgar)
 * @property {string[]} [exclDs] never with one of these in the army
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
 * @property {string} [gid] which appdata group: several share a name and differ in their rules
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
 * @property {string[]} [has] which of the names some enhancement `needs` this unit has (an ability, or an item it can carry)
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
 * @property {Array<{ id: string, name: string, rule: string }>} [spawns] units an ability of this one brings into the game (rosterCompanionRows.js)
 * @property {{ add: number | number[], base?: number | number[], slots: number, one?: ItemId[], ranged?: [number, ItemId[]] }} [pm] per-model rules across groups (a slot names a group or all its copies)
 * @property {GearPool[]} [pools] one instruction's copies, a profile each, and the allowance they share
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
 * @property {string[]} [needs] an ability or an item the bearer must have (appdata's enhancement_datasheet_ability / _required_wargear_item); matched against the unit's `has`
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
 * @property {string} [enhDet] the detachment it was taken from, by name — two can print one of the same name
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
 * @property {number} [createdAt] epoch ms
 * @property {number} [updatedAt] epoch ms
 * @property {boolean} [draft] still in the creation wizard (never synced)
 * @property {RosterSummary} [summary] cached points/units/issues for the list screen (rosterSummary.js)
 */

/**
 * The cached summary a list row prints without loading the faction (rosterSummary.js).
 * @typedef {{ points: number, unitCount: number, issues: number, v: string }} RosterSummary
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
 * @property {Record<string, string | number | undefined>} [params] a param is missing when the data it names
 *   is (a group with no title, a target with no name)
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
 * One effect of a modifier record: what it changes (`on` a profile, a weapon table, a keyword…,
 * `stat`, `op`, `value`) and when (`cond` — condition ids from conditions.js; `when` its wording).
 * The overlay adds `rows` when it places a bearer's effect on particular rows (splitBearers).
 * @typedef {object} ModifierEffect
 * @property {string} [on] absent on a `state` effect; `incoming` is an attack made AGAINST the unit
 * @property {string} [stat] absent on a `state` effect
 * @property {string} op `add` / `improve` / `set` / `grant`, or `state`: no number, only the
 *   condition(s) in `cond` — a choice the rule offers, made a switch (rosterGameContext's switchesFor)
 * @property {string | number} [value]
 * @property {string[] | null} [cond]
 * @property {{ en: string, ru?: string } | null} [when]
 * @property {string} [target]
 * @property {{ name?: string, notName?: string[], tag?: string, notTag?: string }} [only]
 * @property {number} [alt]
 * @property {'melee' | 'ranged' | 'psychic' | 's-gt-t' | 'ranged-s-gt-t' | 'melee-s-gt-t'} [vs] which incoming attacks (`on: 'incoming'`)
 * @property {number} [scope]
 * @property {Record<string, number[]>} [rows]
 * @property {string} [best] the rule's own limit on a roll ("3+": Take Cover!)
 * @property {boolean} [ruledOut] set by gateStratagems: the list answered its condition, and answered no
 * @property {{ per: 'unit' | 'army', dur: string }} [once] a once-per-battle rule: in force while the use
 *   the player marked is inside `dur` (rosterGameContext's activeUses); `per: 'army'` spends it for every unit
 * @property {string[]} [reach] the keywords of the units this effect reaches, where the record's own
 *   prose gate cannot say (a Bondsman ability: "one friendly ARMIGER model")
 * @property {true} [selected] an aura that reaches the ONE unit its rule selects ("select one friendly
 *   VEHICLE model within 3\""): proven only by the player's aura chip on that unit, never by the list
 */

/** A keyword gate read off a rule's prose; `models`/`modelExcludes` are the phrases it names as MODELS (ruleTargets' scopeHits). @typedef {{ targets: string[], excludes: string[], models?: string[], modelExcludes?: string[] }} RuleScope */

/**
 * What a modifier record hangs off, by kind — each kind always carries its own fields (checked over
 * all 2048 records, 2026-10-12): a datasheet ability its `unit`, a wargear rule its `unit` and
 * `item`, a detachment rule, enhancement or stratagem its detachment `det`…
 * @typedef {{ kind: 'ability', unit: string, scopes?: RuleScope[], set?: string, pickLimit?: number }
 *   | { kind: 'wargear', unit: string, item: string, scopes?: RuleScope[] }
 *   | { kind: 'detachmentRule', det: string, scopes?: RuleScope[] }
 *   | { kind: 'enhancement', det: string, scopes?: RuleScope[] }
 *   | { kind: 'stratagem', det: string, name: string }
 *   | { kind: 'allegiance', g: string, gid?: string, opt: string }
 *   | { kind: 'armyRule' }} ModifierRef
 */

/**
 * A roster modifier record (src/data/rosterModifiers/<slug>.js, `entries`) — every key the
 * generator emits; roster.types.test.js holds the data to this list.
 * @typedef {object} ModifierRecord
 * @property {string} sid
 * @property {string} name
 * @property {string} kind
 * @property {string | null} [det]
 * @property {string} [dur]
 * @property {ModifierEffect[]} effects
 * @property {string} [hash]
 * @property {string} [note]
 * @property {boolean} [reviewed]
 * @property {number} [ver]
 * @property {ModifierRef | null} [ref]
 * @property {string} [num]  a core-rule record's section (coreRules.js), which has no ref
 * @property {string[]} [appliesWhile]  a detachment rule in force only while these list-answered
 *   conditions hold — the whole rule, not one effect (Command Protocols: `unit-led`)
 */

/**
 * A modifier record as the overlay applies it: the generated record plus what the caller resolved
 * — the prose `body`, the unit it is printed on (`owner`) and the direction it reached this card
 * from (`from`), an aura's keyword gate (`scopes`), a stratagem's `slot` and `targetScopes`.
 * @typedef {ModifierRecord & { body?: string, owner?: string | null, from?: string | null, scopes?: RuleScope[] | null, slot?: { phases: string[], sides: Record<string, string> } | null, targetScopes?: RuleScope[] | null }} ModEntry
 */

/** Resolves a datasheet id to its facts. @typedef {(id: string) => RosterUnit | null | undefined} DefOf */

/**
 * What a live game hands a unit's card (RosterViewView's viewingGameCtx): what is true for the unit
 * now, and the chips of each kind it may flip.
 * @typedef {object} CardGameCtx
 * @property {Set<string>} [active]
 * @property {CondSwitch[]} [strats]
 * @property {CondSwitch[]} [auras]
 * @property {CondSwitch[]} [picks]
 * @property {CondSwitch[]} [uses] once-per-battle rules on this card, ticked once used
 * @property {Set<string>} [chosen] ability-set options picked anywhere in the army
 * @property {CondSwitch[]} [switches]
 * @property {CondSwitch[]} [armySwitches]
 */

// ── A list somebody else's tool wrote (rosterImport.js) ───────────────────────────────────────

/** A weapon line in a unit's body: `n` copies, printed under the profile `mini` if the export said. @typedef {{ n: number, name: string, mini?: string | null }} GearLine */

/** A model line: `n` models of the profile it names (empty when the export named none). In a flat body the same object can turn out to be a weapon line, and then carries its profile (`mini`). @typedef {{ n: number, name: string, mini?: string | null }} ModelLine */

/**
 * A unit as a parser read it, before any datasheet is known. `group` ties the members of one
 * attached block together; `attachedTo` is WTC's link line, `loose` the lines nobody understood.
 * @typedef {object} ParsedUnit
 * @property {string} name
 * @property {number} pts
 * @property {string | null} group
 * @property {null} [role]
 * @property {boolean} warlord
 * @property {string | null} enh
 * @property {string | null} alleg
 * @property {string | null} [attachedAs]
 * @property {Array<{ group: string | null, attachedAs: string | null | undefined }>} [also] the other block a repeated unit stood in
 * @property {number | null} [models]
 * @property {GearLine[]} [weapons]
 * @property {ModelLine[]} [modelLines]
 * @property {boolean} [flatBody] the body lost its nesting, so every line is a candidate model line
 * @property {string | null} [ref] WTC's `Char1`-style reference
 * @property {string[]} [attachedTo]
 * @property {string[]} [loose]
 * @property {boolean} [fromProfiles] the model count is being summed from profile lines
 */

/**
 * A whole list as a parser read it.
 * @typedef {object} ParsedList
 * @property {'gw' | 'wtc' | 'listhammer-compact'} format
 * @property {string} name
 * @property {string} faction
 * @property {number} limit  the battle size's points
 * @property {number} stated the list's own total
 * @property {string[]} detachments
 * @property {string} [detachmentLine] the raw line, resolved against the faction's detachments later
 * @property {string} [disposition]
 * @property {ParsedUnit[]} units
 * @property {number} [repeated] repeats of an attached unit folded away
 * @property {Array<{ name: string, onRef: string | null, onName: string | null }>} [enhancements] WTC header
 * @property {{ ref: string | null, name: string } | null} [warlord] WTC header
 */

/**
 * One unit of the import report: what it matched, and what of it did not land.
 * @typedef {object} ImportUnitLine
 * @property {string} name
 * @property {string} id
 * @property {number | null} models
 * @property {{ picked: string[], missing: string[], check?: string[] }} gear `check`: weapons whose count came out different from the list's
 * @property {{ name: string, ok: boolean } | null} enh
 * @property {{ stated: number, computed: number }} points
 */

/**
 * @typedef {object} ImportReport
 * @property {string} name
 * @property {ImportUnitLine[]} units
 * @property {Array<{ name: string, pts: number }>} missing datasheets we do not have
 * @property {number} repeated
 * @property {{ matched: string[], missing: string[] }} detachments
 * @property {{ stated: number, statedUnits: number, computed: number }} points
 */

/**
 * The roster an import creates — the stored roster's fields, before the store gives it an id.
 * @typedef {object} ImportPayload
 * @property {string} name
 * @property {string} faction
 * @property {string[]} detachments
 * @property {string} [disposition]
 * @property {string} battleSize
 * @property {number} [customPoints]
 * @property {RosterEntry[]} units
 */

// ── A game, as the live-rules layer reads it (rosterGameContext.js) ───────────────────────────

/**
 * One entry of the condition vocabulary (src/data/rosterModifiers/conditions.js) — a state of the
 * game a modifier can wait on. `scope` says who answers it; `rounds` / `phase` + `side` are the
 * clock's half, `gear` the loadout a `wargear-*` id asks for, `negates` the state an ordinary one
 * is the opposite of.
 * @typedef {object} Condition
 * @property {'army' | 'unit' | 'roster' | 'clock'} scope
 * @property {'phase' | 'turn' | 'round' | 'battle'} duration
 * @property {{ en: string, ru: string }} label
 * @property {{ en: string, ru: string }} [hint]
 * @property {string} [group]
 * @property {string} [negates]
 * @property {boolean} [blocksStratagems]
 * @property {number[]} [rounds]
 * @property {string} [phase]
 * @property {'own' | 'any'} [side]
 * @property {{ copies?: number, name?: string, melee?: number, besides?: string[], all?: string[], mini?: string }} [gear]
 * @property {string[]} [bodyguard]  in an attached unit whose Bodyguard carries any of these keywords
 * @property {string[]} [self]  this entry's own datasheet carries any of these keywords
 * @property {string} [alleg]  the entry chose this allegiance option (its stored `alleg`)
 * @property {string} [bodyguardCore]  in an attached unit whose Bodyguard prints this core ability
 * @property {boolean} [attachedCharacter]  in an attached unit that holds another CHARACTER
 * @property {string[]} [warlord]  the army's Warlord carries all of these keywords
 * @property {boolean} [onUse]  a spent rule's own option: offered only while a stratagem or once-per-battle use naming it is in force on the unit
 */

/**
 * A printed sheet, looked up by datasheet id — what a list-answered condition reads the OTHER
 * entries' keywords and core abilities from.
 * @typedef {(unitId: string) => ({ keywords?: string[], factionKeywords?: string[], keywordsByModel?: { list?: string[] }[], name?: string, core?: string } | null | undefined)} SheetOf
 */

/**
 * What a game is standing on, from one player's side (`clockOf`). `turn` is whose turn it is —
 * 0 the first player, 1 the second — and `mine` whether that is this player.
 * @typedef {object} GameClock
 * @property {number} round
 * @property {0 | 1} turn
 * @property {string} phase  a BATTLE_PHASES id
 * @property {boolean} mine
 * @property {boolean} tracked  the game keeps phases (settings.trackPhases)
 * @property {boolean} [shock]  the game keeps Battle-shock (settings.trackBattleShock); absent reads as kept
 */

/**
 * A moment as one number, `round*100 + turn*10 + phase` — or, in a game saved before the clock
 * existed, the bare round (1..5).
 * @typedef {number} Stamp
 */

/** Switches or records in force, each with the moment it was flipped. @typedef {Record<string, Stamp>} StampStore */

/**
 * What the player has told the game about their army: `army` the army-wide switches, and per roster
 * entry uid its unit switches, the stratagems spent on it, the ability-set options picked on it and
 * the auras marked as reaching it, and the once-per-battle rules it has used.
 * @typedef {object} PlayerCtx
 * @property {StampStore} [army]
 * @property {Record<string, StampStore>} [units]
 * @property {Record<string, StampStore>} [strats]
 * @property {Record<string, StampStore>} [picks]
 * @property {Record<string, StampStore>} [auras]
 * @property {Record<string, StampStore>} [uses]
 */

/**
 * The army-rule tracker's state, per battle round (the shared primitives in useTracker).
 * @typedef {object} ArmyTrackerState
 * @property {Record<number, string>} [selectionByRound]
 * @property {Record<number, string[]>} [multiByRound]
 * @property {number[]} [toggleRounds]
 */

/**
 * The tracker's player, the part the live-rules layer reads.
 * @typedef {object} GamePlayer
 * @property {string} [factionSlug]
 * @property {ArmyTrackerState} [army]
 * @property {PlayerCtx} [ctx]
 */

/**
 * The game itself, the part `clockOf` reads.
 * @typedef {object} GameState
 * @property {Record<string, any>} [settings]
 * @property {number} [currentRound]
 * @property {number} [currentTurn]
 * @property {string} [currentPhase]
 */

/**
 * One chip of a condition strip (ConditionChips): a game state, a spent stratagem, a picked
 * ability-set option or a marked aura. Every kind carries the first five fields; the rest belong to
 * the kinds that need them.
 * @typedef {object} CondSwitch
 * @property {string} id
 * @property {{ en: string, ru: string }} label
 * @property {boolean} on
 * @property {boolean} auto       shown, not the player's to flip here
 * @property {string} [duration]
 * @property {string} [scope]
 * @property {string | null} [group]
 * @property {number} [groupLimit]
 * @property {{ kind: string, name: string, det: string | null, unit: string | null } | null} [src]
 * @property {string | null} [det]
 * @property {boolean} [blocked]
 * @property {'shock' | 'wrongPhase' | 'unitPhase' | 'usedPhase' | 'usedArmy' | 'forbidden' | 'rule' | 'armyPick' | null} [blockedBy]
 *   for a game state: `rule` the unit's own rules hold it on, `forbidden` they forbid it, `armyPick`
 *   it is the army's pick
 * @property {boolean} [pick]
 * @property {{ owner: string | null, ability: string, set: string, unit: string }} [from]
 * @property {boolean} [aura]
 * @property {boolean} [live]   a once-per-battle use whose effect is still running
 * @property {boolean} [spent]  used, and its window has closed
 * @property {'unit' | 'army'} [once]
 * @property {string | null} [unit]     a once-per-battle chip: the datasheet its rule is printed on
 * @property {string} [ability]         and the rule's full name there
 * @property {{ name: string, text: string } | null} [info]
 */

/**
 * An aura that could reach a unit (rosterStatMods' `aurasReaching`), as the chip strip takes it.
 * @typedef {{ sid: string, source: string, name: string, nameRu?: string, info?: { name: string, text: string } | null }} AuraReach
 */

export {}
