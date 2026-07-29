// Sparse RU translation overlay for src/data/combatPatrol.js, deep-merged over the `en` object
// via deepOverlay() (see ../deepOverlay.js) — the same mechanism src/data/factions/ru/*.js uses
// for normal faction content. Only translated PROSE lives here: rule/army-rule flavor+body(
// +example), stratagem flavor/when/target/effect/restrictions, enhancement flavor/body,
// datasheet ability text, composition, loadout, options, leader.text, damaged.note/text,
// transport. Everything else (ids, slugs, stats, keywords, dp, cp, sublabel, and every NAME —
// faction/detachment/army-rule/stratagem/enhancement/unit/weapon/ability names) stays absent
// here and inherits from EN, matching the project's "names stay English" convention.
//
// Array entries are matched to their EN counterpart by `name` (factions, stratagems,
// enhancements, abilities) or `id` (datasheets) — see deepOverlay() — so factions can be
// translated one at a time without touching the others, and an entry's key fields (`name: '…'`
// / `id: '…'`) must be copied VERBATIM from combatPatrol.js for the match to work.
//
// See COMBAT-PATROL-RU-TRANSLATION-TASK.md (repo root, one level up) for the full brief:
// exact field-by-field translate/keep-English rules, bilingual conventions (bold, glosses,
// apostrophes, ALL-CAPS keywords), and verification steps.
export const combatPatrolRu = {
  factions: [
    // { name: 'Necrons', rule: { flavor: '…', body: '…' }, armyRule: { body: '…', example: '…' },
    //   stratagems: [{ name: 'Gauss Storm', flavor: '…', when: '…', target: '…', effect: '…' }],
    //   enhancements: [{ name: 'Metalline Might', flavor: '…', body: '…' }],
    //   datasheets: [{ id: 'amonhotekhs-guard-necron-warriors', abilities: [{ name: '…', text: '…' }],
    //     composition: ['…'], loadout: '…' }] },
  ],
}
