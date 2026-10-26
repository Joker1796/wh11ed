// @ts-check
// The shapes of the two hand-authored datasets the roster screens read: a faction's datasheets
// (src/data/datasheets/<slug>.js) and its rules bundle (src/data/factions/<slug>.js — army rule,
// detachments, their enhancements and stratagems). Types only, for `@ts-check`'d code: nothing here
// runs, and Vite drops it with every other comment. data.types.test.js holds every key in every
// faction's files to these lists, so a field added to the data fails until the type says what it is.

/** A name and its rule text — an ability, a wargear ability, a named rule. @typedef {{ name: string, text: string }} NamedText */

/**
 * One model profile of a datasheet's statline.
 * @typedef {object} DatasheetProfile
 * @property {string} [name]   the profile's name, where a sheet prints several
 * @property {string} m
 * @property {string} t
 * @property {string} sv
 * @property {string} w
 * @property {string} ld
 * @property {string} oc
 * @property {string} [inv]
 * @property {string} [invNote]
 * @property {string} [baseSize]   a model on another base than its unit's — only from MODEL_BASES (scripts/lib/model-bases.mjs)
 */

/** One Munitorum price row. @typedef {{ models: number, points: number, note?: string }} DatasheetPoints */

/**
 * A datasheet as its faction file prints it (English; the RU overlay localises the prose fields).
 * @typedef {object} Datasheet
 * @property {string} id
 * @property {string} name
 * @property {DatasheetPoints[]} [points]
 * @property {Array<{ name: string, points: number }>} [wargearPoints]  the MFM's WARGEAR OPTIONS — each piece's price on top of the unit
 * @property {string} [flavor]
 * @property {DatasheetProfile[]} [profiles]
 * @property {import('../core/shared/roster.types.js').WeaponRow[]} [ranged]
 * @property {import('../core/shared/roster.types.js').WeaponRow[]} [melee]
 * @property {string} [core]      the core abilities line
 * @property {string} [faction]   the faction ability line — names the army rule
 * @property {NamedText[]} [abilities]
 * @property {NamedText[]} [wargearAbilities]
 * @property {NamedText[]} [specialAbilities]
 * @property {NamedText[]} [rules]
 * @property {Array<{ name: string, options: NamedText[] }>} [abilitySets]
 * @property {string[]} [composition]
 * @property {string} [loadout]
 * @property {string[]} [separateProfiles]  weapons whose profiles are all fired, not one picked — read from `loadout` (weaponGroups.js)
 * @property {string[]} [options]
 * @property {{ text?: string, units?: string[], footer?: string }} [leader]
 * @property {{ note?: string, text: string }} [damaged]
 * @property {string} [transport]
 * @property {string[]} [keywords]
 * @property {string[]} [factionKeywords]
 * @property {Array<{ model: string, list: string[] }>} [keywordsByModel]
 * @property {string} [baseSize]   appdata's, word for word: one size, or a "<model>: <size>" line per model (`npm run bases`)
 * @property {boolean} [legends]
 * @property {string} [source]        'faction-pack' for a Legends sheet transcribed from its PDF
 * @property {string} [sourceVersion]
 */

/** Text the GW app applies as data rather than prints in the rule (factions/extras). @typedef {Array<{ en: string, ru: string }>} RuleExtras */

/**
 * @typedef {object} ArmyRule
 * @property {string} id
 * @property {string} name
 * @property {string} [flavor]
 * @property {string} body
 * @property {string} [example]
 * @property {string} [nameRu]   attached by the loader in RU
 */

/**
 * A detachment's own rule.
 * @typedef {object} DetachmentRule
 * @property {string} name
 * @property {string} [flavor]
 * @property {string} body
 * @property {RuleExtras} [extras]  attached by loadFaction
 * @property {string} [nameRu]
 */

/**
 * @typedef {object} RulesEnhancement
 * @property {string} name
 * @property {number} [points]
 * @property {string} [flavor]
 * @property {string} body
 * @property {boolean} [upgrade]
 * @property {boolean} [aura]
 * @property {boolean} [binding]
 * @property {RuleExtras} [extras]  attached by loadFaction
 * @property {string} [nameRu]
 */

/**
 * @typedef {object} RulesStratagem
 * @property {string} name
 * @property {string} [sublabel]
 * @property {string} cp
 * @property {string} [turn]
 * @property {string} [flavor]
 * @property {string} when
 * @property {string} target
 * @property {string} effect
 * @property {string} [restrictions]
 * @property {Array<{ cp: string, title: string, titleRu?: string, body: string }>} [extraCost]  a second effect for more CP (appdata's secondaryEffect)
 * @property {string} [nameRu]
 * @property {string[]} [_phases]  attached by rosterFactionRules, from the ENGLISH `when`
 * @property {Record<string, string>} [_sides]
 */

/**
 * A detachment with its prose — the rules side of what the roster data calls a Detachment.
 * @typedef {object} RulesDetachment
 * @property {string} id
 * @property {string} name
 * @property {string} [source]
 * @property {number} [dp]
 * @property {string[]} [forceDispositions]
 * @property {DetachmentRule} [rule]
 * @property {RulesStratagem[]} [stratagems]
 * @property {RulesEnhancement[]} [enhancements]
 * @property {string} [unique]   the tag two detachments may not share (25.04)
 * @property {string} [chapter]  the Chapter a Space Marines detachment belongs to
 * @property {string} [nameRu]
 */

/**
 * One locale of a faction's rules bundle (`en`, or the RU overlay laid over it).
 * @typedef {object} FactionRules
 * @property {string} slug
 * @property {string} name
 * @property {ArmyRule} [armyRule]
 * @property {RulesDetachment[]} detachments
 * @property {unknown[]} [datasheets]  always empty: the sheets live in src/data/datasheets
 * @property {string[]} [chapters]     the Chapters that play out of this codex
 */

/**
 * A faction's RU datasheet overlay module (datasheets/ru/<slug>.js, loadDatasheetsRu): sparse
 * per-datasheet overlays by id, and the faction-wide EN → RU ability-name map.
 * @typedef {{ default: Record<string, object>, abilityNamesRu?: Record<string, string> }} DatasheetsRuModule
 */

export {}
