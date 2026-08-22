// The vocabulary of game-state conditions a Tier C effect can be gated on — the machine-readable
// half of an effect's `when` prose, hand-assigned in the same review pass (see the `cond` field in
// each faction's records and ROSTER-IN-GAME-PROGRESS.md for the plan this serves).
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
// `duration` is read from the rule's own wording and says when a switch stops being true. NOTE
// that the tracker's only clock is the battle round: it has no phases and no notion of whose turn
// it is, so anything shorter than a round can only be auto-cleared at the round boundary until
// that changes (§3.5 of ROSTER-IN-GAME-PROGRESS.md).

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

// scope — who answers the question:
//   army    one switch for the whole army (an army rule state; the army-rule tracker proves some)
//   unit    a per-entry switch (this unit charged, is Battle-shocked, has an Order on it)
//   roster  no switch at all: the list already answers it (attachment, wargear)
//   phase   the phase/turn the game is in — NOT tracked yet, so these never come out true; marked
//           so the future phase work inherits a finished list instead of starting from the prose
export const conditions = {
  // ── Army state ──────────────────────────────────────────────────────────────────────────
  'waaagh-active': { scope: 'army', duration: 'round', label: { en: 'Waaagh! called', ru: 'Waaagh! объявлен' } },
  'imperative-protector': { scope: 'army', duration: 'round', label: { en: 'Protector Imperative', ru: 'Protector Imperative' } },
  'imperative-conqueror': { scope: 'army', duration: 'round', label: { en: 'Conqueror Imperative', ru: 'Conqueror Imperative' } },
  'benediction-citation-in-savagery': { scope: 'army', duration: 'round', label: { en: 'Citation in Savagery', ru: 'Citation in Savagery' } },
  'tactic-furor': { scope: 'army', duration: 'round', label: { en: 'Furor Tactics', ru: 'Furor Tactics' } },
  'tactic-malleus': { scope: 'army', duration: 'round', label: { en: 'Malleus Tactics', ru: 'Malleus Tactics' } },
  'drug-adrenalight': { scope: 'army', duration: 'battle', label: { en: 'Adrenalight', ru: 'Adrenalight' } },
  'drug-hypex': { scope: 'army', duration: 'battle', label: { en: 'Hypex', ru: 'Hypex' } },
  'drug-serpentin': { scope: 'army', duration: 'battle', label: { en: 'Serpentin', ru: 'Serpentin' } },
  'drug-painbringer': { scope: 'army', duration: 'battle', label: { en: 'Painbringer', ru: 'Painbringer' } },
  'drug-grave-lotus': { scope: 'army', duration: 'battle', label: { en: 'Grave Lotus', ru: 'Grave Lotus' } },
  'drug-splintermind': { scope: 'army', duration: 'battle', label: { en: 'Splintermind', ru: 'Splintermind' } },
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
  'order-move-move-move': { scope: 'unit', duration: 'round', label: { en: '«Move! Move! Move!»', ru: '«Move! Move! Move!»' } },
  'order-fix-bayonets': { scope: 'unit', duration: 'round', label: { en: '«Fix Bayonets!»', ru: '«Fix Bayonets!»' } },
  'order-take-aim': { scope: 'unit', duration: 'round', label: { en: '«Take Aim!»', ru: '«Take Aim!»' } },
  'order-duty-and-honour': { scope: 'unit', duration: 'round', label: { en: '«Duty and Honour!»', ru: '«Duty and Honour!»' } },
  'order-first-rank-fire': { scope: 'unit', duration: 'round', label: { en: '«First Rank, Fire! Second Rank, Fire!»', ru: '«First Rank, Fire! Second Rank, Fire!»' } },

  // ── Answered by the list itself ─────────────────────────────────────────────────────────
  // The roster records the attachment, so there is nothing to ask the player.
  'unit-leading': { scope: 'roster', duration: 'battle', label: { en: 'Leading a unit', ru: 'Ведёт отряд' } },

  // ── Not tracked yet (see the header) ────────────────────────────────────────────────────
  // The tracker now HAS a clock (useTracker's currentTurn/currentPhase, added 2026-08-22), but
  // rosterGameContext still answers none of these — wiring it up is P3c/P3d in
  // ROSTER-IN-GAME-PROGRESS.md. They are marked on the effects anyway, so that work inherits a
  // finished list instead of re-reading the prose.
  // The vocabulary carries only the phases some effect actually names — index.test.js enforces
  // that, and rightly: an id nothing uses is a promise about the data that isn't true.
  'phase-shooting': { scope: 'phase', duration: 'phase', label: { en: 'Your Shooting phase', ru: 'Ваша Shooting phase' } },
  'phase-fight': { scope: 'phase', duration: 'phase', label: { en: 'The Fight phase', ru: 'Фаза боя' } },
}

export const isSentinel = (id) => Object.hasOwn(SENTINELS, id)

// True when every condition on the effect is one the app can actually answer. A sentinel, an
// unknown id, or a scope nothing resolves yet (`phase`) all mean the same thing to the caller:
// keep the printed number and show the note.
export function isAnswerable(cond) {
  if (!Array.isArray(cond) || !cond.length) return false
  return cond.every((id) => conditions[id] && conditions[id].scope !== 'phase')
}
