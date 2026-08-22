// The vocabulary of game-state conditions a Tier C effect can be gated on — the machine-readable
// half of an effect's `when` prose, hand-assigned in the same review pass (see the `cond` field in
// each faction's records, and src/components/roster/CLAUDE.md → "Live rules" for what it serves).
//
// WHY A DICTIONARY AND NOT REGEXES ON THE PROSE. `when` is written for a human reading a footnote:
// 218 conditional effects across 161 distinct wordings, most of them one-offs. There is no grammar
// to parse. What there IS is a small set of STATES a game can be in — a Waaagh! called, an
// Imperative selected, a unit that charged — and those are enumerable. The prose stays the label;
// this is the switch.
//
// THE RULE THIS SERVES. Tier C rewrites a printed number only when the modifier is unconditional
// (rosterStatMods.js). An id here is a promise that the condition can be answered HONESTLY at the
// table — either the game tracker proves it, the roster itself proves it, or the player flips one
// switch they cannot misread. Everything else keeps its footnote, and says so explicitly through a
// sentinel rather than by having no `cond` at all — "not automatable" and "not reviewed yet" must
// never look the same.
//
// `duration` is read from the rule's own wording and says when a switch stops being true. The
// tracker's clock resolves round → turn → phase, so a duration shorter than a round is honoured
// as written — except in a game not keeping phases, where everything falls back to the round
// boundary (rosterGameContext.js).

// Sentinels — the effect stays an attributed note. Each says WHY, because the reasons have
// different fixes and three of the four are removable.
// (There used to be a fourth, `blocked-alternate`, for an "instead" variant with no way to say
// WHICH effect it replaced. An effect can now name that effect through `alt`, so the blocker is
// gone; those variants carry their real condition, or `never` when it is out of reach.)
export const SENTINELS = {
  // No honest switch exists: the condition is resolved per attack, per target, by position on the
  // table, or by a dice roll. This is the one that is meant to stay forever.
  never: { en: 'resolved per attack or by position — check it yourself', ru: 'решается на атаку или по расстановке — проверьте сами' },
  // The condition names a subset of models/units inside the prose ("Penitent models, while…"),
  // where the scope machinery would need it as a `scope` index. A switch would over-apply to the
  // whole unit. Fixable by moving the subset into the record's `scope` (a Tier C data change).
  'blocked-subset': { en: 'applies to part of the unit only', ru: 'действует только на часть отряда' },
  // Restricted to a weapon subset Tier C's `on` (ranged / melee / weapon / profile) cannot
  // address. The ones named by a weapon ABILITY (PSYCHIC, TORRENT, PISTOL…) or by name now carry
  // an `only` filter instead and are no longer blocked; what is left needs a choice the data does
  // not record — "one melee weapon, selected at the start of the battle".
  'blocked-weapon': { en: 'applies to certain weapons only', ru: 'действует только на часть оружия' },
}

// `group` — ids that are alternatives to one another, at most one of which can be on. The rule
// says so in words ("select one of the Orders below", "a unit can only be affected by one Order at
// a time — any Order subsequently issued replaces the current one"), and useTracker enforces it on
// write: turning one on clears its siblings. Without it a card could show a unit under two Orders
// at once, which is not a state the game has. Ungrouped where the rule allows several — Blessings
// of Khorne activates up to two, Combat Drugs can be rolled two at a time.
//
// scope — who answers the question:
//   army    one switch for the whole army (an army rule state; the army-rule tracker proves some)
//   unit    a per-entry switch (this unit charged, is Battle-shocked, has an Order on it)
//   roster  no switch at all: the list already answers it (attachment, wargear)
//   clock   the tracker's own clock answers it — which battle round it is, and (when the game is
//           keeping phases) which phase of whose turn. Never a switch: two sources for one fact
//           is how a card ends up disagreeing with the tracker next to it
export const conditions = {
  // ── Army state ──────────────────────────────────────────────────────────────────────────
  'waaagh-active': { scope: 'army', duration: 'round', label: { en: 'Waaagh! called', ru: 'Waaagh! объявлен' } },
  'imperative-protector': { scope: 'army', duration: 'round', label: { en: 'Protector Imperative', ru: 'Protector Imperative' } },
  'imperative-conqueror': { scope: 'army', duration: 'round', label: { en: 'Conqueror Imperative', ru: 'Conqueror Imperative' } },
  'benediction-citation-in-savagery': { scope: 'army', duration: 'round', label: { en: 'Citation in Savagery', ru: 'Citation in Savagery' } },
  'discipline-biomancy': { scope: 'army', duration: 'round', group: 'psychic-discipline', label: { en: 'Biomancy Discipline', ru: 'Biomancy Discipline' } },
  'discipline-pyromancy': { scope: 'army', duration: 'round', group: 'psychic-discipline', label: { en: 'Pyromancy Discipline', ru: 'Pyromancy Discipline' } },
  'blessing-martial-excellence': { scope: 'army', duration: 'round', label: { en: 'Martial Excellence', ru: 'Martial Excellence' } },
  'blessing-warp-blades': { scope: 'army', duration: 'round', label: { en: 'Warp Blades', ru: 'Warp Blades' } },
  'tactic-furor': { scope: 'army', duration: 'round', group: 'mission-tactic', label: { en: 'Furor Tactics', ru: 'Furor Tactics' } },
  'tactic-malleus': { scope: 'army', duration: 'round', group: 'mission-tactic', label: { en: 'Malleus Tactics', ru: 'Malleus Tactics' } },
  'drug-adrenalight': { scope: 'army', duration: 'round', label: { en: 'Adrenalight', ru: 'Adrenalight' } },
  'drug-hypex': { scope: 'army', duration: 'round', label: { en: 'Hypex', ru: 'Hypex' } },
  'drug-serpentin': { scope: 'army', duration: 'round', label: { en: 'Serpentin', ru: 'Serpentin' } },
  'drug-painbringer': { scope: 'army', duration: 'round', label: { en: 'Painbringer', ru: 'Painbringer' } },
  'drug-grave-lotus': { scope: 'army', duration: 'round', label: { en: 'Grave Lotus', ru: 'Grave Lotus' } },
  'drug-splintermind': { scope: 'army', duration: 'round', label: { en: 'Splintermind', ru: 'Splintermind' } },
  // Necrons' Cursed Legion: the trigger is one Destroyer Cult unit killing something, but the
  // bonus is the army's for the rest of the turn — an army switch, not a per-unit one.
  'cold-fervour': { scope: 'army', duration: 'turn', label: { en: 'Cold Fervour triggered', ru: 'Cold Fervour сработал' } },
  'vision-momentous-brutality': { scope: 'army', duration: 'battle', label: { en: 'Vision of Momentous Brutality chosen', ru: 'Выбран Vision of Momentous Brutality' } },
  'doctrine-assault': { scope: 'army', duration: 'round', label: { en: 'Assault Doctrine', ru: 'Assault Doctrine' } },
  'manifestation-imbued': { scope: 'army', duration: 'round', label: { en: 'Imbued Manifestation selected', ru: 'Выбран Imbued Manifestation' } },
  // Chaos Space Marines, Creations of Bile: "at the start of the battle, select which augmentations
  // are active … until the end of the battle" — chosen once, so battle-long.
  'augment-cholinergic-accelerants': { scope: 'army', duration: 'battle', label: { en: 'Cholinergic Accelerants', ru: 'Cholinergic Accelerants' } },
  'augment-hyperadrenal-infusion': { scope: 'army', duration: 'battle', label: { en: 'Hyperadrenal Infusion', ru: 'Hyperadrenal Infusion' } },
  'augment-paraneural-reactions': { scope: 'army', duration: 'battle', label: { en: 'Paraneural Reactions', ru: 'Paraneural Reactions' } },
  'augment-supracutaneous-chitination': { scope: 'army', duration: 'battle', label: { en: 'Supracutaneous Chitination', ru: 'Supracutaneous Chitination' } },
  'augment-macrotensile-sinews': { scope: 'army', duration: 'battle', label: { en: 'Macrotensile Sinews', ru: 'Macrotensile Sinews' } },
  'augment-ophthalmic-enhancement': { scope: 'army', duration: 'battle', label: { en: 'Ophthalmic Enhancement', ru: 'Ophthalmic Enhancement' } },

  // ── Unit state ──────────────────────────────────────────────────────────────────────────
  'unit-charged': { scope: 'unit', duration: 'turn', label: { en: 'Made a Charge move', ru: 'Совершил Charge' } },
  'unit-advanced': { scope: 'unit', duration: 'turn', label: { en: 'Advanced', ru: 'Совершил Advance' } },
  'unit-battle-shocked': { scope: 'unit', duration: 'round', label: { en: 'Battle-shocked', ru: 'Battle-shocked' } },
  'unit-not-battle-shocked': { scope: 'unit', duration: 'round', label: { en: 'Not Battle-shocked', ru: 'Не Battle-shocked' } },
  'unit-arrived-from-reserves': { scope: 'unit', duration: 'turn', label: { en: 'Arrived from Reserves', ru: 'Прибыл из резерва' } },
  'unit-righteous': { scope: 'unit', duration: 'round', label: { en: 'Righteous', ru: 'Righteous' } },
  // Martial Ka'tah: the unit picks a stance each time it is selected to fight, so this is a
  // per-unit choice that lasts the phase — nothing can derive it, which is exactly what a switch
  // is for.
  'stance-dacatari': { scope: 'unit', duration: 'phase', group: 'ka-tah', label: { en: 'Dacatari Stance', ru: 'Стойка Dacatari' } },
  'stance-rendax': { scope: 'unit', duration: 'phase', group: 'ka-tah', label: { en: 'Rendax Stance', ru: 'Стойка Rendax' } },
  // Grey Knights' Channelled Force: pass a Leadership test when selected to fight, then pick one of
  // two rules for the phase. Both halves are the player's to know, so both live in one switch.
  'channelled-sustained': { scope: 'unit', duration: 'phase', group: 'channelled-force', label: { en: 'Channelled: Sustained Hits', ru: 'Channelled: Sustained Hits' } },
  'channelled-lethal': { scope: 'unit', duration: 'phase', group: 'channelled-force', label: { en: 'Channelled: Lethal Hits', ru: 'Channelled: Lethal Hits' } },
  // Hagiomnifex: once per turn the unit uses one of five abilities, chosen at the start of a
  // phase. Two of the five change a number. Read as lasting that phase — the shorter reading, so
  // a stale switch can't rewrite a number after the fact.
  'hagio-catechism': { scope: 'unit', duration: 'phase', group: 'hagiomnifex', label: { en: 'Catechism of Raging Fervour', ru: 'Catechism of Raging Fervour' } },
  'hagio-psalm': { scope: 'unit', duration: 'phase', group: 'hagiomnifex', label: { en: 'Psalm of Righteous Smiting', ru: 'Psalm of Righteous Smiting' } },
  'unit-disembarked': { scope: 'unit', duration: 'turn', label: { en: 'Disembarked this turn', ru: 'Высадился в этом ходу' } },
  'unit-selected-command-phase': { scope: 'unit', duration: 'round', label: { en: 'Selected this Command phase', ru: 'Выбран в эту Command phase' } },
  'unit-favoured-champions': { scope: 'unit', duration: 'round', label: { en: "Army's Favoured Champions", ru: 'Favoured Champions армии' } },
  'unit-achieved-boast': { scope: 'unit', duration: 'battle', label: { en: 'Achieved a Boast', ru: 'Выполнил Boast' } },
  // Not casualty TRACKING (out of scope) — one switch the player flips when it stops being true.
  'unit-at-starting-strength': { scope: 'unit', duration: 'battle', label: { en: 'At Starting Strength', ru: 'В полном составе' } },
  'unit-lost-wounds': { scope: 'unit', duration: 'battle', label: { en: 'Has lost wounds', ru: 'Потерял раны' } },
  'unit-destroyed-model-melee': { scope: 'unit', duration: 'battle', label: { en: 'Destroyed a model in melee', ru: 'Уничтожил модель в мели' } },
  'unit-dark-pact-invoked': { scope: 'unit', duration: 'phase', label: { en: 'Invoked its Dark Pact contract', ru: 'Призвал контракт Dark Pact' } },
  'unit-desperate-pact': { scope: 'unit', duration: 'phase', label: { en: 'Made a Desperate Pact', ru: 'Совершил Desperate Pact' } },
  'unit-manoeuvre-swift-as-the-wind': { scope: 'unit', duration: 'phase', label: { en: 'Swift as the Wind performed', ru: 'Выполнен Swift as the Wind' } },
  'surge-unholy-hunger': { scope: 'unit', duration: 'phase', label: { en: 'Unholy Hunger', ru: 'Unholy Hunger' } },
  'surge-unnatural-fortitude': { scope: 'unit', duration: 'phase', label: { en: 'Unnatural Fortitude', ru: 'Unnatural Fortitude' } },
  // Astra Militarum Orders — issued to one unit in the Command phase, so per unit, not per army.
  'order-move-move-move': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«Move! Move! Move!»', ru: '«Move! Move! Move!»' } },
  'order-fix-bayonets': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«Fix Bayonets!»', ru: '«Fix Bayonets!»' } },
  'order-take-aim': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«Take Aim!»', ru: '«Take Aim!»' } },
  'order-duty-and-honour': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«Duty and Honour!»', ru: '«Duty and Honour!»' } },
  'order-first-rank-fire': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«First Rank, Fire! Second Rank, Fire!»', ru: '«First Rank, Fire! Second Rank, Fire!»' } },

  // ── Answered by the list itself ─────────────────────────────────────────────────────────
  // The roster records the attachment, so there is nothing to ask the player.
  'unit-leading': { scope: 'roster', duration: 'battle', label: { en: 'Leading a unit', ru: 'Ведёт отряд' } },

  // ── Not tracked yet (see the header) ────────────────────────────────────────────────────
  // Answered by the tracker's clock (rosterGameContext's clockHolds), never by a switch. A phase
  // id carries `phase` and `side`, because GW says whose phase it is when that matters and the
  // Fight phase happens in both turns; only a game keeping phases can answer one. A `rounds` id
  // needs no phases at all — every game knows its battle round — so those answer always.
  // The vocabulary carries only what some effect actually names — index.test.js enforces that,
  // and rightly: an id nothing uses is a promise about the data that isn't true.
  'phase-shooting': { scope: 'clock', phase: 'shooting', side: 'own', duration: 'phase', label: { en: 'Your Shooting phase', ru: 'Ваша Shooting phase' } },
  'phase-fight': { scope: 'clock', phase: 'fight', side: 'any', duration: 'phase', label: { en: 'The Fight phase', ru: 'Фаза боя' } },
  'rounds-1-3': { scope: 'clock', rounds: [1, 2, 3], duration: 'round', label: { en: 'Battle rounds 1–3', ru: 'Раунды 1–3' } },
  'rounds-3-5': { scope: 'clock', rounds: [3, 4, 5], duration: 'round', label: { en: 'Battle rounds 3–5', ru: 'Раунды 3–5' } },
}

export const isSentinel = (id) => Object.hasOwn(SENTINELS, id)

// True when every condition on the effect is one the app can actually answer. A sentinel or an
// unknown id means the same thing to the caller: keep the printed number and show the note.
//
// A `clock` condition depends on the GAME, not on the data — a battle round is always known, but
// a phase only in a game keeping them — so `phases` says which kind of game is asking. The live
// answer is rosterGameContext's; this is the static view of the same question.
export function isAnswerable(cond, { phases = false } = {}) {
  if (!Array.isArray(cond) || !cond.length) return false
  return cond.every((id) => {
    const c = conditions[id]
    if (!c) return false
    if (c.scope !== 'clock') return true
    return c.rounds ? true : phases
  })
}
