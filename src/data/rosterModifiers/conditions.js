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
  // start of the battle" — or a name matched anywhere but the start ("weapon profiles with 'Plasma' in their name"),
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

// `WHOLE_GROUPS` — groups a card shows in full once any member is shown, even the members no
// modifier on that unit reads. A doctrine is the ARMY's pick of the round: a Space Marines card
// offered Assault and Devastator but not Tactical (it changes no number there), so a round under
// Tactical showed both unticked and the third looked lost (owner, 2026-10-06). Picking it still
// says something: it switches the other two off.
export const WHOLE_GROUPS = new Set(['combat-doctrine'])

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
//
// negates — the ORDINARY state, named by a rule only to say when its effect stops ("while the
// bearer's unit is not Battle-shocked"). It is true by default, off the table and on it, and
// stops being true exactly while the condition it negates is on; it is never a switch of its
// own. Until 2026-09-22 `unit-not-battle-shocked` was a plain per-unit switch nobody flipped,
// so the Mandulian Reliquary's +3 OC never reached the card (a player's report). A negation
// keeps the scope of the state it negates and answers from that state's source.
/** @type {Record<string, import('../../composables/roster.types.js').Condition>} */
export const conditions = {
  // ── Army state ──────────────────────────────────────────────────────────────────────────
  // Codex: Orks replaced "the Waaagh! is active for your army" with a per-unit state: the War Cry
  // riles every ORKS unit up for a turn, but so do a dozen other rules, one unit at a time.
  // The RU label stays English on purpose: the state is spelled **riled up** in the faction
  // rules and on the datasheets in both locales, and a chip reading otherwise would be a second
  // name for the rule the player is looking at.
  'riled-up': { scope: 'unit', duration: 'round', label: { en: 'Riled up', ru: 'Riled up' } },
  'imperative-protector': { scope: 'army', duration: 'round', label: { en: 'Protector Imperative', ru: 'Protector Imperative' } },
  'imperative-conqueror': { scope: 'army', duration: 'round', label: { en: 'Conqueror Imperative', ru: 'Conqueror Imperative' } },
  'benediction-panegyric-procession': { scope: 'army', duration: 'battle', group: 'benediction', label: { en: 'Panegyric Procession', ru: 'Panegyric Procession' } },
  // Selected at the start of the first battle round, active until the end of the battle (until
  // 2026-10-15 this one read 'round' and went out after the first).
  'benediction-citation-in-savagery': { scope: 'army', duration: 'battle', group: 'benediction', label: { en: 'Citation in Savagery', ru: 'Citation in Savagery' } },
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
  // Codex: Space Marines (11th) — Combat Doctrines. The army's pick is read from the tracker
  // (rosterGameContext's SOFT_AUTO), but a doctrine can also be made active for ONE unit (Adept of
  // the Codex, stratagems), and "only one combat doctrine can be active for each unit": a per-unit
  // group, where the unit's own later switch evicts the army's (capGroups drops the oldest, and
  // the tracker's pick carries no stamp). Tactical is read by Deathwatch's Malleus Tactics and
  // Space Wolves' Ferocious Strike (app data 963).
  'doctrine-assault': { scope: 'unit', duration: 'round', group: 'combat-doctrine', label: { en: 'Assault Doctrine', ru: 'Assault Doctrine' } },
  'doctrine-devastator': { scope: 'unit', duration: 'round', group: 'combat-doctrine', label: { en: 'Devastator Doctrine', ru: 'Devastator Doctrine' } },
  'doctrine-tactical': { scope: 'unit', duration: 'round', group: 'combat-doctrine', label: { en: 'Tactical Doctrine', ru: 'Tactical Doctrine' } },
  'manifestation-imbued': { scope: 'army', duration: 'round', label: { en: 'Imbued Manifestation selected', ru: 'Выбран Imbued Manifestation' } },
  'manifestation-wrath': { scope: 'army', duration: 'round', label: { en: 'Wrath of the Immaterium selected', ru: 'Выбран Wrath of the Immaterium' } },
  'manifestation-maelstrom': { scope: 'army', duration: 'round', label: { en: 'Psychic Maelstrom selected', ru: 'Выбран Psychic Maelstrom' } },
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
    scope: 'unit', duration: 'round', negates: 'unit-battle-shocked',
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
  // "Set up on the battlefield this turn" is wider than arriving from Reserves: a unit that
  // disembarks is set up too (18.02's FAQ — the embark ban on a unit "set up this turn" holds after
  // a disembark). Fire Zone Purge's Scions come out of Tauroxes and Valkyries as often as from
  // Reserves; reading the rule as Reserves alone dropped half of it (2026-10-21).
  'unit-set-up-this-turn': {
    scope: 'unit', duration: 'turn',
    label: { en: 'Set up this turn', ru: 'Выставлен в этом ходу' },
    hint: {
      en: 'This unit was set up on the battlefield this turn: it arrived from **[gloss:strategic-reserves:strategic reserves]** (20.01) or disembarked from a [gloss:transport:TRANSPORT] (18.03).',
      ru: 'Отряд выставлен на поле боя в этом ходу: прибыл из **[gloss:strategic-reserves:стратегического резерва]** (20.01) или высадился из [gloss:transport:TRANSPORT] (18.03).',
    },
  },
  'unit-righteous': { scope: 'unit', duration: 'round', label: { en: 'Righteous', ru: 'Righteous' } },
  // Martial Ka'tah (Codex: Adeptus Custodes, data 981): a readied unit spends one ka'tah ability
  // per round, each in its own phase, so this is a per-unit choice that lasts the phase. Only the
  // abilities that change a number on the card are here — Rendax itself, and the Favoured Ka'tah
  // additions of Solar Watch (Calistus, +2" M) and Aquilan Shield (Salvus, +6" range).
  'stance-rendax': { scope: 'unit', duration: 'phase', group: 'ka-tah', label: { en: 'Rendax', ru: 'Rendax' } },
  'stance-calistus': { scope: 'unit', duration: 'phase', group: 'ka-tah', label: { en: 'Calistus', ru: 'Calistus' } },
  'stance-salvus': { scope: 'unit', duration: 'phase', group: 'ka-tah', label: { en: 'Salvus', ru: 'Salvus' } },
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
  // Not casualty TRACKING (out of scope) — one switch the player flips when it stops being true.
  // Where the unit stands against its starting strength — one of three, so marking it below half
  // takes "at starting strength" off. An effect for "below starting strength" holds below half too;
  // its record carries the second line for that (one is on at a time, so they never stack).
  'unit-at-starting-strength': {
    scope: 'unit', duration: 'battle', group: 'unit-strength',
    label: { en: 'At Starting Strength', ru: 'В полном составе' },
    hint: {
      en: 'The unit still contains every model it had at the start of the first battle round — its **[gloss:starting-strength:starting strength]** (01.02.01).',
      ru: 'В отряде остались все модели, которые были в нём в начале первого раунда боя, — его **[gloss:starting-strength:начальная численность]** (01.02.01).',
    },
  },
  'unit-below-starting-strength': {
    scope: 'unit', duration: 'battle', group: 'unit-strength',
    label: { en: 'Below Starting Strength', ru: 'Ниже начальной численности' },
    hint: {
      en: 'What **[gloss:below-starting-strength:below starting strength]** means depends on the unit’s starting strength — for a single model it is counted in wounds (01.02.01).',
      ru: 'Что значит **[gloss:below-starting-strength:ниже начальной численности]**, зависит от начальной численности отряда — у одиночной модели считают раны (01.02.01).',
    },
  },
  'unit-below-half-strength': {
    scope: 'unit', duration: 'battle', group: 'unit-strength',
    label: { en: 'Below Half-strength', ru: 'Ниже половины численности' },
    hint: {
      en: 'What below **[gloss:half-strength:half-strength]** means depends on the unit’s starting strength — for a single model it is counted in wounds (01.02.01).',
      ru: 'Что значит ниже **[gloss:half-strength:половины численности]**, зависит от начальной численности отряда — у одиночной модели считают раны (01.02.01).',
    },
  },
  'unit-lost-wounds': { scope: 'unit', duration: 'battle', label: { en: 'Has lost wounds', ru: 'Потерял раны' } },
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
  'order-take-cover': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«Take Cover!»', ru: '«Take Cover!»' } },
  'order-duty-and-honour': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«Duty and Honour!»', ru: '«Duty and Honour!»' } },
  'order-first-rank-fire': { scope: 'unit', duration: 'round', group: 'order', label: { en: '«First Rank, Fire! Second Rank, Fire!»', ru: '«First Rank, Fire! Second Rank, Fire!»' } },

  // ── Answered by the list itself ─────────────────────────────────────────────────────────
  // The roster records the attachment, so there is nothing to ask the player.
  'unit-leading': { scope: 'roster', duration: 'battle', label: { en: 'Leading a unit', ru: 'Ведёт отряд' } },
  // The other side of the same attachment: "while a NECRONS CHARACTER model is leading this unit"
  // (Command Protocols). True for every entry of an attached unit that has a Leader in it — the
  // bodyguard it joined AND the Leader himself, since "this unit" is then the attached unit
  // (Core Rules 19.04). Answered from the roster's `leaderOf` links, so the caller passes the units.
  'unit-led': { scope: 'roster', duration: 'battle', label: { en: 'Led by a Character', ru: 'Отряд ведёт персонаж' } },
  // The rest of what the list records about an attachment and the Warlord (2026-10-17). These were
  // parked as `never` — "while the bearer is leading an Aspect Warriors unit", "if a Militarum
  // Tempestus Officer model is your Warlord" — although the list answers each as surely as
  // `unit-leading`. A shape names what to read, and the keywords come from the printed sheets the
  // caller hands rosterAnswers (rosterGameContext.js):
  //   bodyguard: [kws]        — this entry is in an attached unit whose Bodyguard carries ANY of them
  //                             (true on both halves: the Leader's card and the unit it leads)
  //   bodyguardCore: name     — …whose Bodyguard prints that core ability
  //   attachedCharacter: true — …that holds another CHARACTER besides this entry
  //   warlord: [kws]          — the army's Warlord is a unit carrying ALL of them
  // "…that is not an Attached unit" (Hidden Amongst the Dead) — the opposite state, answered from
  // `unit-led` the way every negation is (rosterGameContext).
  'unit-not-led': { scope: 'roster', duration: 'battle', negates: 'unit-led', label: { en: 'Not an Attached unit', ru: 'Не в отряде с лидером' } },
  'unit-warlord': { scope: 'roster', duration: 'battle', label: { en: 'Is your Warlord', ru: 'Ваш WARLORD' } },
  // The unit's OWN printed keywords (2026-10-19): "if this unit is a VEHICLE unit" (Methodical
  // Brutality), "if your unit has the Markerlight keyword", "if your unit has KILL TEAM". Parked
  // as `never` until then, although the sheet answers each as surely as the Bodyguard's:
  //   self: [kws] — this entry's datasheet carries ANY of them
  // The keyword the entry chose for itself when it joined the army (2026-10-20): "if this model has
  // the KHORNE keyword" on a Legends Giant Chaos Spawn, whose Daemonic Allegiance is a pick of the
  // list. `alleg` is the option's name as the entry stores it (rosterEngine's allegKeyword).
  'alleg-khorne': { scope: 'roster', duration: 'battle', alleg: 'Khorne', label: { en: 'Chose KHORNE', ru: 'Выбран KHORNE' } },
  'alleg-tzeentch': { scope: 'roster', duration: 'battle', alleg: 'Tzeentch', label: { en: 'Chose TZEENTCH', ru: 'Выбран TZEENTCH' } },
  'alleg-nurgle': { scope: 'roster', duration: 'battle', alleg: 'Nurgle', label: { en: 'Chose NURGLE', ru: 'Выбран NURGLE' } },
  'alleg-slaanesh': { scope: 'roster', duration: 'battle', alleg: 'Slaanesh', label: { en: 'Chose SLAANESH', ru: 'Выбран SLAANESH' } },
  'unit-vehicle': { scope: 'roster', duration: 'battle', self: ['VEHICLE'], label: { en: 'A VEHICLE unit', ru: 'Отряд VEHICLE' } },
  'unit-markerlight': { scope: 'roster', duration: 'battle', self: ['MARKERLIGHT'], label: { en: 'Has the MARKERLIGHT keyword', ru: 'Есть ключевое слово MARKERLIGHT' } },
  'unit-kill-team': { scope: 'roster', duration: 'battle', self: ['KILL TEAM'], label: { en: 'A KILL TEAM unit', ru: 'Отряд KILL TEAM' } },
  'warlord-tempestus-officer': { scope: 'roster', duration: 'battle', warlord: ['MILITARUM TEMPESTUS', 'OFFICER'], label: { en: 'A Militarum Tempestus Officer is your Warlord', ru: 'WARLORD — Militarum Tempestus Officer' } },
  'unit-leading-aspect-warriors': { scope: 'roster', duration: 'battle', bodyguard: ['ASPECT WARRIORS'], label: { en: 'Leading an Aspect Warriors unit', ru: 'Ведёт отряд Aspect Warriors' } },
  'unit-leading-dire-avengers-or-guardians': { scope: 'roster', duration: 'battle', bodyguard: ['DIRE AVENGERS', 'GUARDIANS'], label: { en: 'Leading a Dire Avengers or Guardians unit', ru: 'Ведёт отряд Dire Avengers или Guardians' } },
  'unit-leading-storm-guardians': { scope: 'roster', duration: 'battle', bodyguard: ['STORM GUARDIANS'], label: { en: 'Leading a Storm Guardians unit', ru: 'Ведёт отряд Storm Guardians' } },
  'unit-leading-regiment': { scope: 'roster', duration: 'battle', bodyguard: ['REGIMENT'], label: { en: 'Leading a Regiment unit', ru: 'Ведёт отряд Regiment' } },
  'unit-leading-poxwalkers': { scope: 'roster', duration: 'battle', bodyguard: ['POXWALKERS'], label: { en: 'Leading a Poxwalkers unit', ru: 'Ведёт отряд Poxwalkers' } },
  'unit-leading-kastelan-robots': { scope: 'roster', duration: 'battle', bodyguard: ['KASTELAN ROBOTS'], label: { en: 'Attached to a Kastelan Robots unit', ru: 'Присоединён к отряду Kastelan Robots' } },
  'unit-leading-blood-claws': { scope: 'roster', duration: 'battle', bodyguard: ['BLOOD CLAWS'], label: { en: 'Attached to a Blood Claws unit', ru: 'Присоединён к отряду Blood Claws' } },
  'unit-leading-mounted': { scope: 'roster', duration: 'battle', bodyguard: ['MOUNTED'], label: { en: 'Attached to a Mounted unit', ru: 'Присоединён к отряду MOUNTED' } },
  'unit-leading-scouts': { scope: 'roster', duration: 'battle', bodyguardCore: 'Scouts', label: { en: 'Leading a unit with Scouts', ru: 'Ведёт отряд со Scouts' } },
  'unit-attached-character': { scope: 'roster', duration: 'battle', attachedCharacter: true, label: { en: 'Attached to a unit with another Character', ru: 'В отряде есть другой персонаж' } },
  // The wargear the entry took (2026-09-28). A handful of datasheets reward a PAIR of weapons —
  // two macro-scalpels make them [TWIN-LINKED], a Helbrute's two melee weapons besides its close
  // combat weapon get +2 Attacks — and the list knows exactly what was taken. These were `never`
  // (or `blocked-weapon`) while the card summed copies into one row and could not say which model
  // held what; now the copies are counted per model (rosterModifiers' loadoutItemCopies), and
  // wargearConditions answers from them. `gear` is what has to be true on EVERY model of the
  // profile — a pair on one Talos of two is a note, not a rewritten card:
  //   copies: n, name  — n copies of the one melee weapon whose row starts with `name`
  //   melee: n, besides — n melee weapons (copies count), leaving out the rows named in `besides`
  //   all: [names]     — each of these melee weapons
  // src/data/rosterModifiers/index.test.js holds every datasheet ability that makes a bonus
  // depend on a set of weapons to one of these.
  'wargear-two-macro-scalpels': { scope: 'roster', duration: 'battle', gear: { copies: 2, name: 'Macro-scalpel' }, label: { en: 'Two macro-scalpels', ru: 'Два macro-scalpel' } },
  'wargear-two-melee-besides-ccw': { scope: 'roster', duration: 'battle', gear: { melee: 2, besides: ['Close combat weapon'] }, label: { en: 'Two melee weapons besides the close combat weapon', ru: 'Два оружия ближнего боя кроме close combat weapon' } },
  'wargear-two-melee': { scope: 'roster', duration: 'battle', gear: { melee: 2 }, label: { en: 'Two melee weapons', ru: 'Два оружия ближнего боя' } },
  // A model the unit's SIZE brings (the Tidewall Shieldline's defence platform is its 105-point
  // option, a second model in the list) — read off the size the entry took, not off its weapons.
  // A model the unit holds by its size: "while this unit contains a Tempestor Prime".
  'contains-tempestor-prime': { scope: 'roster', duration: 'battle', gear: { mini: 'Tempestor Prime' }, label: { en: 'With a Tempestor Prime', ru: 'С Tempestor Prime' } },
  'contains-medicae-servitors': { scope: 'roster', duration: 'battle', gear: { mini: 'Medicae Servitors' }, label: { en: 'With Medicae Servitors', ru: 'С Medicae Servitors' } },
  'contains-quartermaster-revenant': { scope: 'roster', duration: 'battle', gear: { mini: 'Quartermaster Revenant' }, label: { en: 'With a Quartermaster Revenant', ru: 'С Quartermaster Revenant' } },
  'contains-deathwing-ancient': { scope: 'roster', duration: 'battle', gear: { mini: 'Deathwing Ancient' }, label: { en: 'With a Deathwing Ancient', ru: 'С Deathwing Ancient' } },
  'contains-chaplain-cassius': { scope: 'roster', duration: 'battle', gear: { mini: 'Chaplain Cassius' }, label: { en: 'With Chaplain Cassius', ru: 'С Chaplain Cassius' } },
  'wargear-tidewall-platform': { scope: 'roster', duration: 'battle', gear: { mini: 'Tidewall Defence Platform' }, label: { en: 'With a Tidewall defence platform', ru: 'С Tidewall defence platform' } },
  'wargear-spear-and-chainsword':{ scope: 'roster', duration: 'battle', gear: { all: ['Thundershock spear', 'Bellatus reaper chainsword'] }, label: { en: 'Thundershock spear and bellatus reaper chainsword', ru: 'Thundershock spear и bellatus reaper chainsword' } },
  // "The bearer has +1 Wounds", "the bearer's melee weapons have [LANCE]" (2026-10-01). Never put
  // in the active set: it is answered by PLACING the effect — rosterStatMods' splitBearers gives the
  // models that carry the item a row of their own and applies the effect to that row alone. Until
  // it is `blocked-subset`'s note, and where the list cannot say who carries what it stays one.
  // `placed` says so to the gate that rules out what the list answered no (gateStratagems): with
  // nothing in the active set to prove it, every Storm Shield's +1 W read as decided against and
  // was dropped after the shield's row was split off (a player's report, 2026-10-24).
  'wargear-bearer': { scope: 'roster', duration: 'battle', placed: true, label: { en: 'The bearer only', ru: 'Только носитель' } },

  // ── A rule's own choices (2026-10-15) ───────────────────────────────────────────────────
  // Options a detachment rule offers and the player picks — a Vow, a Hyper-adaptation, a Contract.
  // Until then an option was a switch only where a number hung on it, so these were never offered
  // (src/components/roster/CLAUDE.md → "A state with no number"). Named as GW names them.
  'vow-abhor-the-witch': { scope: 'army', duration: 'battle', group: 'bt-vow', label: { en: 'Abhor the Witch, Destroy the Witch', ru: 'Abhor the Witch, Destroy the Witch' } },
  'vow-accept-any-challenge': { scope: 'army', duration: 'battle', group: 'bt-vow', label: { en: 'Accept Any Challenge, No Matter the Odds', ru: 'Accept Any Challenge, No Matter the Odds' } },
  'vow-uphold-the-honour': { scope: 'army', duration: 'battle', group: 'bt-vow', label: { en: 'Uphold the Honour of the Emperor', ru: 'Uphold the Honour of the Emperor' } },
  'hyper-swarming-instincts': { scope: 'army', duration: 'battle', group: 'hyper-adaptation', label: { en: 'Swarming Instincts', ru: 'Swarming Instincts' } },
  'hyper-aggression': { scope: 'army', duration: 'battle', group: 'hyper-adaptation', label: { en: 'Hyper-aggression', ru: 'Hyper-aggression' } },
  'hyper-hive-predators': { scope: 'army', duration: 'battle', group: 'hyper-adaptation', label: { en: 'Hive Predators', ru: 'Hive Predators' } },
  'synaptic-augmentation': { scope: 'army', duration: 'round', group: 'synaptic-imperative', label: { en: 'Synaptic Augmentation', ru: 'Synaptic Augmentation' } },
  'synaptic-surging-vitality': { scope: 'army', duration: 'round', group: 'synaptic-imperative', label: { en: 'Surging Vitality', ru: 'Surging Vitality' } },
  'synaptic-goaded-to-slaughter': { scope: 'army', duration: 'round', group: 'synaptic-imperative', label: { en: 'Goaded to Slaughter', ru: 'Goaded to Slaughter' } },
  'contract-trophy-hunters': { scope: 'army', duration: 'battle', group: 'contract', label: { en: 'Trophy Hunters', ru: 'Trophy Hunters' } },
  'contract-sow-fear-and-terror': { scope: 'army', duration: 'battle', group: 'contract', label: { en: 'Sow Fear and Terror', ru: 'Sow Fear and Terror' } },
  'contract-show-of-strength': { scope: 'army', duration: 'battle', group: 'contract', label: { en: 'Show of Strength', ru: 'Show of Strength' } },
  'unit-halo-override': { scope: 'unit', duration: 'round', label: { en: 'Halo Override', ru: 'Halo Override' } },
  'override-electromotive-energisation': { scope: 'army', duration: 'round', group: 'halo-override', label: { en: 'Electromotive Energisation', ru: 'Electromotive Energisation' } },
  'override-microactuator-bracing': { scope: 'army', duration: 'round', group: 'halo-override', label: { en: 'Microactuator Bracing', ru: 'Microactuator Bracing' } },
  'override-predation-protocols': { scope: 'army', duration: 'round', group: 'halo-override', label: { en: 'Predation Protocols', ru: 'Predation Protocols' } },
  'override-muted-servomotors': { scope: 'army', duration: 'round', group: 'halo-override', label: { en: 'Muted Servomotors', ru: 'Muted Servomotors' } },
  'tithe-enraged-abjuration': { scope: 'army', duration: 'battle', label: { en: 'Enraged Abjuration', ru: 'Enraged Abjuration' } },
  'tithe-daemonic-rage': { scope: 'army', duration: 'battle', label: { en: 'Daemonic Rage', ru: 'Daemonic Rage' } },
  'tithe-boon-of-blood': { scope: 'army', duration: 'battle', label: { en: 'Boon of Blood', ru: 'Boon of Blood' } },
  'tithe-might-of-khorne': { scope: 'army', duration: 'battle', label: { en: 'Might of Khorne', ru: 'Might of Khorne' } },

  'oath-deed-tyrant': { scope: 'army', duration: 'battle', group: 'oath-deed', label: { en: 'We vow to lay low the tyrant…', ru: 'We vow to lay low the tyrant…' } },
  'oath-deed-realm': { scope: 'army', duration: 'battle', group: 'oath-deed', label: { en: 'We swear to reclaim the realm…', ru: 'We swear to reclaim the realm…' } },
  'oath-deed-tally': { scope: 'army', duration: 'battle', group: 'oath-deed', label: { en: 'We pledge to reap a great tally…', ru: 'We pledge to reap a great tally…' } },
  'oath-quality-valour': { scope: 'army', duration: 'battle', group: 'oath-quality', label: { en: '…with all our martial valour risen over all.', ru: '…with all our martial valour risen over all.' } },
  'oath-quality-eager': { scope: 'army', duration: 'battle', group: 'oath-quality', label: { en: '…and we are eager for the challenge.', ru: '…and we are eager for the challenge.' } },
  'oath-quality-legacy': { scope: 'army', duration: 'battle', group: 'oath-quality', label: { en: '…yet shall our legacy be unsullied.', ru: '…yet shall our legacy be unsullied.' } },
  'army-honoured': { scope: 'army', duration: 'battle', label: { en: 'Honoured', ru: 'Honoured' } },
  'dread-despair': { scope: 'army', duration: 'battle', label: { en: 'Despair', ru: 'Despair' } },
  'dread-doom': { scope: 'army', duration: 'battle', label: { en: 'Doom', ru: 'Doom' } },
  'dread-darkness': { scope: 'army', duration: 'battle', label: { en: 'Darkness', ru: 'Darkness' } },
  'dread-dismay': { scope: 'army', duration: 'battle', label: { en: 'Dismay', ru: 'Dismay' } },
  'dread-delirium': { scope: 'army', duration: 'battle', label: { en: 'Delirium', ru: 'Delirium' } },
  'artillery-creeping-barrage': { scope: 'army', duration: 'round', group: 'artillery-support', label: { en: 'Creeping Barrage', ru: 'Creeping Barrage' } },
  'artillery-incendiary-bombardment': { scope: 'army', duration: 'round', group: 'artillery-support', label: { en: 'Incendiary Bombardment', ru: 'Incendiary Bombardment' } },
  'artillery-smoke-shells': { scope: 'army', duration: 'round', group: 'artillery-support', label: { en: 'Smoke Shells', ru: 'Smoke Shells' } },
  'twisted-doctrine-fell-back': { scope: 'unit', duration: 'turn', group: 'twisted-doctrine', label: { en: 'Default to Doctrine: shoot and charge after Falling Back', ru: 'Default to Doctrine: shoot and charge after Falling Back' } },
  'twisted-doctrine-advanced': { scope: 'unit', duration: 'turn', group: 'twisted-doctrine', label: { en: 'Default to Doctrine: charge after Advancing', ru: 'Default to Doctrine: charge after Advancing' } },
  'costs-eliminate': { scope: 'army', duration: 'round', group: 'at-all-costs', label: { en: 'Eliminate At All Costs', ru: 'Eliminate At All Costs' } },
  'costs-acquire': { scope: 'army', duration: 'round', group: 'at-all-costs', label: { en: 'Acquire At All Costs', ru: 'Acquire At All Costs' } },
  'tactic-purgatus': { scope: 'army', duration: 'round', group: 'mission-tactic', label: { en: 'Purgatus Tactics', ru: 'Purgatus Tactics' } },

  'hagio-rite': { scope: 'unit', duration: 'phase', group: 'hagiomnifex', label: { en: 'Rite of Revelation', ru: 'Rite of Revelation' } },
  'hagio-sermon': { scope: 'unit', duration: 'phase', group: 'hagiomnifex', label: { en: 'Sermon of Intolerance', ru: 'Sermon of Intolerance' } },
  'hagio-chorus': { scope: 'unit', duration: 'phase', group: 'hagiomnifex', label: { en: 'Chorus of Repudiation', ru: 'Chorus of Repudiation' } },
  'idol-infinite-rage': { scope: 'army', duration: 'round', group: 'idol-of-khorne', label: { en: 'Idol of Infinite Rage', ru: 'Idol of Infinite Rage' } },
  'idol-burning-wrath': { scope: 'army', duration: 'round', group: 'idol-of-khorne', label: { en: 'Idol of Burning Wrath', ru: 'Idol of Burning Wrath' } },
  'idol-blessed-blood': { scope: 'army', duration: 'round', group: 'idol-of-khorne', label: { en: 'Idol of Blessed Blood', ru: 'Idol of Blessed Blood' } },
  'techno-anti-infantry': { scope: 'unit', duration: 'phase', group: 'technosorcery', label: { en: '[ANTI-INFANTRY 3+]', ru: '[ANTI-INFANTRY 3+]' } },
  'techno-anti-mounted': { scope: 'unit', duration: 'phase', group: 'technosorcery', label: { en: '[ANTI-MOUNTED 4+]', ru: '[ANTI-MOUNTED 4+]' } },
  'techno-assault': { scope: 'unit', duration: 'phase', group: 'technosorcery', label: { en: '[ASSAULT]', ru: '[ASSAULT]' } },
  'techno-heavy': { scope: 'unit', duration: 'phase', group: 'technosorcery', label: { en: '[HEAVY]', ru: '[HEAVY]' } },
  'techno-ignores-cover': { scope: 'unit', duration: 'phase', group: 'technosorcery', label: { en: '[IGNORES COVER]', ru: '[IGNORES COVER]' } },

  'prey-sustained': { scope: 'unit', duration: 'phase', group: 'prey-adaptation', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'prey-lance': { scope: 'unit', duration: 'phase', group: 'prey-adaptation', label: { en: '[LANCE]', ru: '[LANCE]' } },
  'prey-lethal': { scope: 'unit', duration: 'phase', group: 'prey-adaptation', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'adaptive-strength': { scope: 'unit', duration: 'phase', group: 'adaptive-instincts', label: { en: 'Melee attacks +1 S', ru: 'Melee attacks +1 S' } },
  'adaptive-toughness': { scope: 'unit', duration: 'phase', group: 'adaptive-instincts', label: { en: '+1 T', ru: '+1 T' } },
  'tycho-assault': { scope: 'unit', duration: 'phase', group: 'gifted-commander', label: { en: '[ASSAULT]', ru: '[ASSAULT]' } },
  'tycho-heavy': { scope: 'unit', duration: 'phase', group: 'gifted-commander', label: { en: '[HEAVY]', ru: '[HEAVY]' } },
  'tycho-rapid-fire': { scope: 'unit', duration: 'phase', group: 'gifted-commander', label: { en: '[RAPID FIRE 1]', ru: '[RAPID FIRE 1]' } },
  'aunshi-direct-grace': { scope: 'unit', duration: 'phase', group: 'martial-warrior', label: { en: 'Direct Grace', ru: 'Direct Grace' } },
  'aunshi-forceful-strike': { scope: 'unit', duration: 'phase', group: 'martial-warrior', label: { en: 'Forceful Strike', ru: 'Forceful Strike' } },
  'aunshi-whirling-stance': { scope: 'unit', duration: 'phase', group: 'martial-warrior', label: { en: 'Whirling Stance', ru: 'Whirling Stance' } },
  'optics-ignores-cover': { scope: 'unit', duration: 'phase', group: 'special-issue-optics', label: { en: '[IGNORES COVER]', ru: '[IGNORES COVER]' } },
  'optics-detection': { scope: 'unit', duration: 'phase', group: 'special-issue-optics', label: { en: '+6" detection range on one enemy unit', ru: '+6" detection range on one enemy unit' } },
  'troupe-heros-prowess': { scope: 'unit', duration: 'phase', group: 'dance-of-death', label: { en: 'Hero’s Prowess', ru: 'Hero’s Prowess' } },
  'troupe-villains-doom': { scope: 'unit', duration: 'phase', group: 'dance-of-death', label: { en: 'Villain’s Doom', ru: 'Villain’s Doom' } },
  'troupe-tricksters-grace': { scope: 'unit', duration: 'phase', group: 'dance-of-death', label: { en: 'Trickster’s Grace', ru: 'Trickster’s Grace' } },
  'wrath-cleave': { scope: 'unit', duration: 'phase', group: 'wrath-of-khorne', label: { en: '[CLEAVE 1]', ru: '[CLEAVE 1]' } },
  'wrath-ap': { scope: 'unit', duration: 'phase', group: 'wrath-of-khorne', label: { en: '+1 AP', ru: '+1 AP' } },
  // Picked each time the unit is selected to fight (or to attack), for that phase.
  'mastery-sustained': { scope: 'unit', duration: 'phase', group: 'martial-mastery', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'mastery-lethal': { scope: 'unit', duration: 'phase', group: 'martial-mastery', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'executioner-lethal': { scope: 'unit', duration: 'phase', group: 'angelic-executioner', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'executioner-sustained': { scope: 'unit', duration: 'phase', group: 'angelic-executioner', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'cold-lethal': { scope: 'unit', duration: 'phase', group: 'cold-and-calculating', label: { en: '[LETHAL HITS: MONSTER/VEHICLE]', ru: '[LETHAL HITS: MONSTER/VEHICLE]' } },
  'cold-sustained': { scope: 'unit', duration: 'phase', group: 'cold-and-calculating', label: { en: '[SUSTAINED HITS 1: non-MONSTER/VEHICLE]', ru: '[SUSTAINED HITS 1: non-MONSTER/VEHICLE]' } },
  'path-hit-1': { scope: 'unit', duration: 'phase', group: 'path-of-the-warrior', label: { en: 'Re-roll a Hit roll of 1', ru: 'Переброс единиц на попадание' } },
  'path-wound-1': { scope: 'unit', duration: 'phase', group: 'path-of-the-warrior', label: { en: 'Re-roll a Wound roll of 1', ru: 'Переброс единиц на ранение' } },
  'combatant-lethal': { scope: 'unit', duration: 'phase', group: 'supreme-combatant', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'combatant-sustained': { scope: 'unit', duration: 'phase', group: 'supreme-combatant', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'adaptable-sustained': { scope: 'unit', duration: 'phase', group: 'adaptable-fighters', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'adaptable-lethal': { scope: 'unit', duration: 'phase', group: 'adaptable-fighters', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'optimiser-lethal': { scope: 'unit', duration: 'turn', group: 'prelocational-optimiser', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'optimiser-sustained': { scope: 'unit', duration: 'turn', group: 'prelocational-optimiser', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'smash-lethal': { scope: 'unit', duration: 'phase', group: 'smash-em-up', label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'smash-sustained': { scope: 'unit', duration: 'phase', group: 'smash-em-up', label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  // Backroom Deals: the one unit selected in the Declare Battle Formations step, for the battle.
  'backroom-deals': { scope: 'unit', duration: 'battle', label: { en: 'Selected for Backroom Deals', ru: 'Выбран для Backroom Deals' } },
  // "You can use this ability. If you do, until the end of the phase…" — the player's call each time,
  // and nothing the tracker records: one switch per rule, for the window the rule gives it.
  'used-extremis-trigger-word': { scope: 'unit', duration: 'phase', label: { en: 'Trigger word invoked', ru: 'Trigger word произнесено' } },
  'used-righteous-repugnance': { scope: 'unit', duration: 'phase', label: { en: 'Miracle dice discarded', ru: 'Miracle dice сброшен' } },
  'used-daemonic-ordnance': { scope: 'unit', duration: 'phase', label: { en: 'Daemonic Ordnance used', ru: 'Daemonic Ordnance применён' } },
  'used-sacrificial-dagger': { scope: 'unit', duration: 'phase', label: { en: 'Sacrificial Dagger used', ru: 'Sacrificial Dagger применён' } },
  'used-frenzied-metabolism': { scope: 'unit', duration: 'phase', label: { en: 'Frenzied Metabolism used', ru: 'Frenzied Metabolism применён' } },
  'used-resource-transmutation': { scope: 'unit', duration: 'phase', label: { en: 'Resource Transmutation used (1YP)', ru: 'Resource Transmutation применён (1YP)' } },
  'used-warpmeld-sacrifice': { scope: 'unit', duration: 'phase', label: { en: 'Warpmeld Sacrifice made', ru: 'Warpmeld Sacrifice совершён' } },
  'used-aetherstride': { scope: 'unit', duration: 'turn', label: { en: 'Aetherstride performed', ru: 'Aetherstride выполнен' } },
  'spent-yp-etacarn': { scope: 'unit', duration: 'phase', label: { en: '3YP spent (Etacarn SB9)', ru: 'Потрачено 3YP (Etacarn SB9)' } },
  'spent-yp-oathbound': { scope: 'unit', duration: 'phase', label: { en: '3YP spent (Oathbound Speculator)', ru: 'Потрачено 3YP (Oathbound Speculator)' } },
  'spent-yp-fury-of-the-hearth': { scope: 'unit', duration: 'phase', onUse: true, label: { en: '1YP spent', ru: 'Потрачен 1YP' } },
  'spent-pain-eye-of-spite': { scope: 'unit', duration: 'phase', label: { en: 'Pain token spent (Eye of Spite)', ru: 'Потрачен Pain token (Eye of Spite)' } },
  'spent-flux-pyrogenesis': { scope: 'unit', duration: 'phase', onUse: true, label: { en: 'Flux token spent', ru: 'Потрачен Flux token' } },
  // A state the unit's own deed puts it in for the rest of the battle.
  'soul-eater-fed': { scope: 'unit', duration: 'battle', label: { en: 'Destroyed a unit in the Fight phase', ru: 'Уничтожил отряд в фазе боя' } },
  'tox-cycler-hit': { scope: 'unit', duration: 'battle', label: { en: 'Scored a hit with the tox-cycler', ru: 'Попал из tox-cycler' } },
  'unit-normal-moved': { scope: 'unit', duration: 'turn', label: { en: 'Made a Normal move', ru: 'Совершил Normal move' } },
  // Bladeguard (once per turn): +1 to hit with its own melee attacks, or -1 to hit against it.
  'bladeguard-hit': { scope: 'unit', duration: 'phase', group: 'bladeguard', label: { en: '+1 to hit (melee)', ru: '+1 к попаданию (ближний бой)' } },
  'bladeguard-defend': { scope: 'unit', duration: 'phase', group: 'bladeguard', label: { en: '-1 to be hit', ru: '−1 к попаданию по отряду' } },
  // An army's pick of the Command phase, "until the start of your next Command phase" — the round is
  // the nearest window the clock has, and it errs early.
  'atonement-path-of-the-penitent': { scope: 'army', duration: 'round', group: 'vow-of-atonement', label: { en: 'The Path of the Penitent', ru: 'The Path of the Penitent' } },
  'atonement-absolution-in-battle': { scope: 'army', duration: 'round', group: 'vow-of-atonement', label: { en: 'Absolution in Battle', ru: 'Absolution in Battle' } },
  'atonement-death-before-disgrace': { scope: 'army', duration: 'round', group: 'vow-of-atonement', label: { en: 'Death Before Disgrace', ru: 'Death Before Disgrace' } },
  'motivation-hurons-elite': { scope: 'army', duration: 'round', group: 'tyrannical-motivation', label: { en: 'Huron’s Elite', ru: 'Huron’s Elite' } },
  'motivation-mobile-marauders': { scope: 'army', duration: 'round', group: 'tyrannical-motivation', label: { en: 'Mobile Marauders', ru: 'Mobile Marauders' } },
  // A spent rule's own options ("Your unit's attacks have: [LETHAL HITS]. Or: [SUSTAINED HITS 1].")
  // — the player says which one when spending a stratagem or using a once-per-battle ability.
  // `onUse: true` keeps the chips out of sight until a rule naming them is in force on the unit
  // (rosterGameContext's switchesFor): offered before, they would sit on every card of a detachment
  // that has the stratagem at all. The window is the rule's own, so the pick ends with it.
  'blademastery-sustained': { scope: 'unit', duration: 'phase', group: 'anathema-blademastery', onUse: true, label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'blademastery-lethal': { scope: 'unit', duration: 'phase', group: 'anathema-blademastery', onUse: true, label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'avowed-lethal': { scope: 'unit', duration: 'phase', group: 'avowed-destruction', onUse: true, label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'avowed-sustained': { scope: 'unit', duration: 'phase', group: 'avowed-destruction', onUse: true, label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'mercy-lethal': { scope: 'unit', duration: 'phase', group: 'mercy-is-weakness', onUse: true, label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'mercy-sustained': { scope: 'unit', duration: 'phase', group: 'mercy-is-weakness', onUse: true, label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'relentless-sustained': { scope: 'unit', duration: 'phase', group: 'relentless-assault', onUse: true, label: { en: '[SUSTAINED HITS 1: non-MONSTER/VEHICLE]', ru: '[SUSTAINED HITS 1: non-MONSTER/VEHICLE]' } },
  'relentless-lethal': { scope: 'unit', duration: 'phase', group: 'relentless-assault', onUse: true, label: { en: '[LETHAL HITS: MONSTER/VEHICLE]', ru: '[LETHAL HITS: MONSTER/VEHICLE]' } },
  'artillerists-lethal': { scope: 'unit', duration: 'phase', group: 'vindictive-artillerists', onUse: true, label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'artillerists-sustained': { scope: 'unit', duration: 'phase', group: 'vindictive-artillerists', onUse: true, label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'artillerists-both': { scope: 'unit', duration: 'phase', group: 'vindictive-artillerists', onUse: true, label: { en: 'Both, with [HAZARDOUS]', ru: 'Обе, с [HAZARDOUS]' } },
  // Hardened Killers is spent in your Command phase and lasts "until the start of your next turn":
  // the round is the nearest window the clock has, and it errs early, never late.
  'hardened-bs': { scope: 'unit', duration: 'round', group: 'hardened-killers', onUse: true, label: { en: '+1 BS', ru: '+1 BS' } },
  'hardened-rapid-fire': { scope: 'unit', duration: 'round', group: 'hardened-killers', onUse: true, label: { en: '+1 A, [RAPID FIRE] weapons', ru: '+1 A, оружие [RAPID FIRE]' } },
  'hardened-save': { scope: 'unit', duration: 'round', group: 'hardened-killers', onUse: true, label: { en: '+1 Sv', ru: '+1 Sv' } },
  // Experimental Ammunition's first option is +1 S, which the second has too: one chip for the
  // second is the whole choice.
  'ammo-overcharge': { scope: 'unit', duration: 'phase', onUse: true, label: { en: '+1 AP, [HAZARDOUS]', ru: '+1 AP, [HAZARDOUS]' } },
  'augmented-lethal': { scope: 'unit', duration: 'phase', group: 'augmented-targeting', onUse: true, label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'augmented-sustained': { scope: 'unit', duration: 'phase', group: 'augmented-targeting', onUse: true, label: { en: '[SUSTAINED HITS 1]', ru: '[SUSTAINED HITS 1]' } },
  'augmented-both': { scope: 'unit', duration: 'phase', group: 'augmented-targeting', onUse: true, label: { en: 'Both (entrenched)', ru: 'Обе (entrenched)' } },
  'spear-lethal': { scope: 'unit', duration: 'phase', group: 'spear-thrust', onUse: true, label: { en: '[LETHAL HITS]', ru: '[LETHAL HITS]' } },
  'spear-lance': { scope: 'unit', duration: 'phase', group: 'spear-thrust', onUse: true, label: { en: '[LANCE]', ru: '[LANCE]' } },
  'spear-both': { scope: 'unit', duration: 'phase', group: 'spear-thrust', onUse: true, label: { en: 'Both (MOUNTED)', ru: 'Обе (MOUNTED)' } },
  // Moment Shackle (once per battle): "+3 A on the Watcher's Axe" or "3+ InSv", picked when used.
  'shackle-axe': { scope: 'unit', duration: 'phase', group: 'moment-shackle', onUse: true, label: { en: 'Watcher’s Axe +3 A', ru: 'Watcher’s Axe +3 A' } },
  'shackle-save': { scope: 'unit', duration: 'phase', group: 'moment-shackle', onUse: true, label: { en: '3+ InSv', ru: '3+ InSv' } },
  // Desperate Pledge: "if your unit invokes its contract" — the player knows, the card cannot.
  'contract-invoked': { scope: 'unit', duration: 'phase', onUse: true, label: { en: 'Contract invoked', ru: 'Контракт заключён' } },

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
