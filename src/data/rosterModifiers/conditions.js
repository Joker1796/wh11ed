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
  // address. The ones named by a weapon ABILITY (PSYCHIC, TORRENT, PISTOL…) or by name carry an
  // `only` filter instead and are no longer blocked — including, since 2026-08-25, ten effects
  // whose restriction was an EXCLUSION ("excluding [ONE SHOT] weapons", "excluding Devastating
  // Wounds weapons") that had been left here although `only.notTag` could always say it.
  // What is left needs a choice the data does not record — "one melee weapon, selected at the
  // start of the battle", the Helbrute's two weapons "in addition to its close combat weapon" —
  // or a name matched anywhere but the start ("weapon profiles with 'Plasma' in their name"),
  // which `only.name` cannot express: it is a prefix.
  'blocked-weapon': { en: 'applies to certain weapons only', ru: 'действует только на часть оружия' },
}

// `group` — ids that are alternatives to one another, of which only so many can be on at once. The
// rule says so in words ("select one of the Orders below", "a unit can only be affected by one
// Order at a time — any Order subsequently issued replaces the current one"), and useTracker
// enforces it on write: turning one on evicts the oldest sibling once the group is full. Without it
// a card could show a unit under two Orders at once, which is not a state the game has. Ungrouped
// where the rule allows any number.
//
// `GROUP_LIMITS` — how many of a group may be on together. A group absent from the map allows ONE,
// which is what nearly every group means; the exceptions are rules that let you pick a fixed
// handful ("either select one from the list below, or randomly determine two"). The limit lives
// here rather than on each member so the six ids of a set cannot disagree about their own size.
export const GROUP_LIMITS = {
  // Creations of Bile — "either select one from the list below, or randomly determine two".
  augmentation: 2,
  // Zephyrim — one ability each time the unit fights, "or select both abilities above instead" in
  // a turn it made a Charge move. The charge is what buys the second; the effects say so in their
  // `when`, and the group only has to allow the state the rule can reach.
  'embodied-prophecy': 2,
  // Preternatural Precision — "select one of the following abilities, or select two … if you
  // removed an Aspect Shrine token during this usage".
  'preternatural-precision': 2,
}
// An ability set's options are NOT in this vocabulary: which one is up is a choice about one model,
// keyed by the option's own record (`ref.set` / `ref.pickLimit`, stored in `ctx.picks`), the same
// way a spent stratagem is. See rosterGameContext's pickSwitchesFor.

export const groupLimitOf = (group) => (group ? GROUP_LIMITS[group] || 1 : 0)

// `hint` — what the state IS, for the "i" beside the chip. Only for the states the CORE rules
// define: a player who cannot remember whether a failed charge counts, or what being Battle-shocked
// costs, is answered here rather than three screens away. Written in both locales because the chip
// is (RosterViewView's withRuleInfo picks one), and free to use the body markup every other rule
// text uses — a `(11.02)` cross-ref navigates to that rule, a `[gloss:…]` opens its definition.
// A state that is a FACTION rule (an Imperative, an Order, a Kastelan protocol) deliberately has
// none: its text lives in that rule's own body, which is a pointer this dictionary does not hold
// yet, and a hand-written paraphrase of somebody's rule is how the two quietly come to disagree.
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
  // Both Blessings that carry a modifier have an auto reader (rosterGameContext's AUTO): the World
  // Eaters army-rule tracker already records which up-to-two are active this round.
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
  'manifestation-wrath': { scope: 'army', duration: 'round', label: { en: 'Wrath of the Immaterium selected', ru: 'Выбран Wrath of the Immaterium' } },
  // Chaos Space Marines, Creations of Bile: "at the start of the battle, select which augmentations
  // are active … until the end of the battle" — chosen once, so battle-long. One group with a
  // limit of two, because the rule offers "either select one from the list below, or randomly
  // determine two": two is the most the army can ever be running, and without the cap all six
  // could be switched on at once, each one rewriting a printed stat.
  'augment-cholinergic-accelerants': { scope: 'army', duration: 'battle', group: 'augmentation', label: { en: 'Cholinergic Accelerants', ru: 'Cholinergic Accelerants' } },
  'augment-hyperadrenal-infusion': { scope: 'army', duration: 'battle', group: 'augmentation', label: { en: 'Hyperadrenal Infusion', ru: 'Hyperadrenal Infusion' } },
  'augment-paraneural-reactions': { scope: 'army', duration: 'battle', group: 'augmentation', label: { en: 'Paraneural Reactions', ru: 'Paraneural Reactions' } },
  'augment-supracutaneous-chitination': { scope: 'army', duration: 'battle', group: 'augmentation', label: { en: 'Supracutaneous Chitination', ru: 'Supracutaneous Chitination' } },
  'augment-macrotensile-sinews': { scope: 'army', duration: 'battle', group: 'augmentation', label: { en: 'Macrotensile Sinews', ru: 'Macrotensile Sinews' } },
  'augment-ophthalmic-enhancement': { scope: 'army', duration: 'battle', group: 'augmentation', label: { en: 'Ophthalmic Enhancement', ru: 'Ophthalmic Enhancement' } },

  // ── Unit state ──────────────────────────────────────────────────────────────────────────
  'unit-charged': {
    scope: 'unit', duration: 'turn',
    label: { en: 'Made a Charge move', ru: 'Совершил Charge' },
    hint: {
      en: 'This unit declared a charge this turn and completed the **charge move**. A charge that failed leaves the unit where it was and does not count (11.02).',
      ru: 'Отряд объявил charge в этом ходу и выполнил **charge move**. Провалившийся charge оставляет отряд на месте и не считается (11.02).',
    },
  },
  'unit-advanced': {
    scope: 'unit', duration: 'turn',
    label: { en: 'Advanced', ru: 'Совершил Advance' },
    hint: {
      en: 'This unit made an **Advance move** this turn: its M characteristic plus an Advance roll. Until the end of the turn it is not eligible to declare a charge or to start an action (09.06).',
      ru: 'Отряд выполнил **Advance move** в этом ходу: характеристика M плюс advance roll. До конца хода он не может объявить charge и начать action (09.06).',
    },
  },
  // "Each time this unit Remains Stationary, until the start of your next Movement phase…" — the
  // window runs to the next Movement phase, which is one turn's worth of the game.
  'unit-stationary': {
    scope: 'unit', duration: 'turn',
    label: { en: 'Remained Stationary', ru: 'Остался на месте' },
    hint: {
      en: 'This unit Remained Stationary in the Movement phase: no model was moved or rotated, so nothing that triggers on a unit starting or ending a move was triggered (09.04).',
      ru: 'Отряд Remained Stationary в Movement phase: ни одна модель не перемещалась и не поворачивалась, поэтому правила на начало и конец перемещения не сработали (09.04).',
    },
  },
  // "While this unit is engaged" — in Engagement Range of an enemy. Only the player knows, and it
  // changes as the battle moves, so it expires at the phase boundary rather than the round's.
  // Drukhari — "you can spend 1 Pain token to Empower this unit". The tracker banks Pain tokens
  // but says nothing about which unit was Empowered with one, so this stays a switch; the window
  // the rules give it is the phase it was spent in.
  'unit-empowered': { scope: 'unit', duration: 'phase', label: { en: 'Empowered', ru: 'Empowered' } },
  // Two Drukhari Pain abilities ask a SECOND question when the token is spent — which of the
  // options the Empowerment buys. The pick lasts as long as the Empowerment does (the phase) and
  // one is up at a time, so each option is its own switch inside a group of the default size.
  // Without them the effects had nowhere to hang: Lady Malys had no record at all and the Wracks'
  // two lines were parked on `blocked-subset`.
  'malys-sustained': { scope: 'unit', duration: 'phase', group: 'malys-poisoned-tongue', label: { en: 'SUSTAINED HITS 1', ru: 'SUSTAINED HITS 1' } },
  'malys-lethal': { scope: 'unit', duration: 'phase', group: 'malys-poisoned-tongue', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'wrack-attacks-3': { scope: 'unit', duration: 'phase', group: 'wrack-enhancement', label: { en: 'Attacks 3', ru: 'Атаки 3' } },
  'wrack-attacks-4': { scope: 'unit', duration: 'phase', group: 'wrack-enhancement', label: { en: 'Attacks 4, [HAZARDOUS]', ru: 'Атаки 4, [HAZARDOUS]' } },
  // The same shape, faction by faction: a rule that hands a unit ONE of several weapon abilities
  // for the phase, written inline rather than as an ability set. Which one is up is the player's
  // to say and nothing else can answer it, so each option is a switch and the group holds one —
  // except where the rule itself allows two (see GROUP_LIMITS).
  'prophecy-sustained': { scope: 'unit', duration: 'phase', group: 'embodied-prophecy', label: { en: 'SUSTAINED HITS 1', ru: 'SUSTAINED HITS 1' } },
  'prophecy-lethal': { scope: 'unit', duration: 'phase', group: 'embodied-prophecy', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'jester-ignores-cover': { scope: 'unit', duration: 'phase', group: 'cruel-amusement', label: { en: 'IGNORES COVER', ru: 'IGNORES COVER' } },
  'jester-precision': { scope: 'unit', duration: 'phase', group: 'cruel-amusement', label: { en: 'PRECISION', ru: 'PRECISION' } },
  'jester-sustained-3': { scope: 'unit', duration: 'phase', group: 'cruel-amusement', label: { en: 'SUSTAINED HITS 3', ru: 'SUSTAINED HITS 3' } },
  'harbinger-lethal': { scope: 'unit', duration: 'phase', group: 'harbinger-of-death', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'harbinger-precision': { scope: 'unit', duration: 'phase', group: 'harbinger-of-death', label: { en: 'PRECISION', ru: 'PRECISION' } },
  'harbinger-sustained': { scope: 'unit', duration: 'phase', group: 'harbinger-of-death', label: { en: 'SUSTAINED HITS 1', ru: 'SUSTAINED HITS 1' } },
  'magicks-ignores-cover': { scope: 'unit', duration: 'phase', group: 'master-of-magicks', label: { en: 'IGNORES COVER', ru: 'IGNORES COVER' } },
  'magicks-lethal': { scope: 'unit', duration: 'phase', group: 'master-of-magicks', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'magicks-sustained': { scope: 'unit', duration: 'phase', group: 'master-of-magicks', label: { en: 'SUSTAINED HITS D3', ru: 'SUSTAINED HITS D3' } },
  // Dark Pacts is taken per activation, by a unit that passed (or failed) its Leadership test —
  // the test is the player's business, the ability chosen is what the card has to show.
  'pact-lethal': { scope: 'unit', duration: 'phase', group: 'dark-pact', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'pact-sustained': { scope: 'unit', duration: 'phase', group: 'dark-pact', label: { en: 'SUSTAINED HITS 1', ru: 'SUSTAINED HITS 1' } },
  'swordsmanship-lethal': { scope: 'unit', duration: 'phase', group: 'exquisite-swordsmanship', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'swordsmanship-sustained': { scope: 'unit', duration: 'phase', group: 'exquisite-swordsmanship', label: { en: 'SUSTAINED HITS 1', ru: 'SUSTAINED HITS 1' } },
  'preternatural-ignores-cover': { scope: 'unit', duration: 'phase', group: 'preternatural-precision', label: { en: 'IGNORES COVER', ru: 'IGNORES COVER' } },
  'preternatural-lethal': { scope: 'unit', duration: 'phase', group: 'preternatural-precision', label: { en: 'LETHAL HITS', ru: 'LETHAL HITS' } },
  'preternatural-sustained': { scope: 'unit', duration: 'phase', group: 'preternatural-precision', label: { en: 'SUSTAINED HITS 1', ru: 'SUSTAINED HITS 1' } },
  // Adeptus Mechanicus — a Cybernetica Datasmith puts the KASTELAN ROBOTS it leads into one
  // protocol, "and it remains in that protocol until it enters a different one": battle-long, and
  // exactly one at a time.
  'protocol-protector': { scope: 'unit', duration: 'battle', group: 'kastelan-protocol', label: { en: 'Protector Protocol', ru: 'Protector Protocol' } },
  'protocol-conqueror': { scope: 'unit', duration: 'battle', group: 'kastelan-protocol', label: { en: 'Conqueror Protocol', ru: 'Conqueror Protocol' } },
  'protocol-aegis': { scope: 'unit', duration: 'battle', group: 'kastelan-protocol', label: { en: 'Aegis Protocol', ru: 'Aegis Protocol' } },
  'unit-engaged': {
    scope: 'unit', duration: 'phase',
    label: { en: 'Engaged', ru: 'В ближнем бою' },
    hint: {
      en: 'One or more models in this unit are within **[gloss:engagement-range:engagement range]** of an enemy model — 2" horizontally and 5" vertically (03.04).',
      ru: 'Хотя бы одна модель отряда находится в **[gloss:engagement-range:engagement range]** от модели противника — 2" по горизонтали и 5" по вертикали (03.04).',
    },
  },
  // `blocksStratagems` is the one condition flag the app ACTS on rather than merely reads: while it
  // is on, no Stratagem may be used to affect the unit (Core Rules 01.07), so the card blocks the
  // ones it has not got and drops the ongoing ones it had. Nothing else in the vocabulary carries
  // it today; it lives here rather than as an id spelled out in the code so the rule is stated once.
  'unit-battle-shocked': {
    scope: 'unit', duration: 'round', blocksStratagems: true,
    label: { en: 'Battle-shocked', ru: 'Battle-shocked' },
    hint: {
      en: "This unit failed a battle-shock roll. While it is **[gloss:battle-shocked:battle-shocked]** the OC of all its models is '-', it cannot start an action, and it cannot be targeted with Stratagems — which is why the card blocks them (01.07).",
      ru: "Отряд провалил проверку боевого шока. Пока он **[gloss:battle-shocked:подвержен боевому шоку]**, OC всех его моделей — '-', он не может начинать action, и на него нельзя нацеливать стратагемы — поэтому карточка их блокирует (01.07).",
    },
  },
  'unit-not-battle-shocked': {
    scope: 'unit', duration: 'round',
    label: { en: 'Not Battle-shocked', ru: 'Не Battle-shocked' },
    hint: {
      en: 'The ordinary state. The rule names it because its own effect stops while the unit IS **[gloss:battle-shocked:battle-shocked]** (01.07).',
      ru: 'Обычное состояние. Правило называет его потому, что перестаёт действовать, пока отряд **[gloss:battle-shocked:подвержен боевому шоку]** (01.07).',
    },
  },
  'unit-arrived-from-reserves': {
    scope: 'unit', duration: 'turn',
    label: { en: 'Arrived from Reserves', ru: 'Прибыл из резерва' },
    hint: {
      en: 'This unit was set up on the battlefield this turn from **[gloss:strategic-reserves:strategic reserves]** rather than during deployment (20.01).',
      ru: 'Отряд выставлен на поле боя в этом ходу из **[gloss:strategic-reserves:стратегического резерва]**, а не в расстановке (20.01).',
    },
  },
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
  'unit-disembarked': {
    scope: 'unit', duration: 'turn',
    label: { en: 'Disembarked this turn', ru: 'Высадился в этом ходу' },
    hint: {
      en: 'This unit disembarked from a [gloss:transport:TRANSPORT] this turn. Any disembark move counts, including the emergency one out of a destroyed TRANSPORT (18.03).',
      ru: 'Отряд высадился из [gloss:transport:TRANSPORT] в этом ходу. Считается любой disembark move, включая аварийный из уничтоженного TRANSPORT (18.03).',
    },
  },
  'unit-selected-command-phase': { scope: 'unit', duration: 'round', label: { en: 'Selected this Command phase', ru: 'Выбран в эту Command phase' } },
  'unit-favoured-champions': { scope: 'unit', duration: 'round', label: { en: "Army's Favoured Champions", ru: 'Favoured Champions армии' } },
  'unit-achieved-boast': { scope: 'unit', duration: 'battle', label: { en: 'Achieved a Boast', ru: 'Выполнил Boast' } },
  // Not casualty TRACKING (out of scope) — one switch the player flips when it stops being true.
  'unit-at-starting-strength': {
    scope: 'unit', duration: 'battle',
    label: { en: 'At Starting Strength', ru: 'В полном составе' },
    hint: {
      en: 'The unit still contains every model it had at the start of the first battle round — its **[gloss:starting-strength:starting strength]** (01.02.01).',
      ru: 'В отряде остались все модели, которые были в нём в начале первого раунда боя, — его **[gloss:starting-strength:начальная численность]** (01.02.01).',
    },
  },
  'unit-lost-wounds': { scope: 'unit', duration: 'battle', label: { en: 'Has lost wounds', ru: 'Потерял раны' } },
  'unit-destroyed-model-melee': { scope: 'unit', duration: 'battle', label: { en: 'Destroyed a model in melee', ru: 'Уничтожил модель в мели' } },
  'unit-dark-pact-invoked': { scope: 'unit', duration: 'phase', label: { en: 'Invoked its Dark Pact contract', ru: 'Призвал контракт Dark Pact' } },
  'unit-desperate-pact': { scope: 'unit', duration: 'phase', label: { en: 'Made a Desperate Pact', ru: 'Совершил Desperate Pact' } },
  'unit-manoeuvre-swift-as-the-wind': { scope: 'unit', duration: 'phase', label: { en: 'Swift as the Wind performed', ru: 'Выполнен Swift as the Wind' } },
  'surge-unholy-hunger': { scope: 'unit', duration: 'phase', label: { en: 'Unholy Hunger', ru: 'Unholy Hunger' } },
  'surge-unnatural-fortitude': { scope: 'unit', duration: 'phase', label: { en: 'Unnatural Fortitude', ru: 'Unnatural Fortitude' } },
  'surge-diabolic-power': { scope: 'unit', duration: 'phase', label: { en: 'Diabolic Power', ru: 'Diabolic Power' } },
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
