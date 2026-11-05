// @ts-check
// A Dominatus campaign as a fold over its events. The server keeps an append-only log per
// campaign (wh11ed-api `/campaigns`) and knows nothing of what the events mean; this module is the
// authority on that. Every phone reads the same log and folds it the same way, so there is no
// state to keep in step — only events to append, and two phones appending never collide.
//
// Who wrote an event is in `author`: 'owner' (the Warmaster, signed in) or a member id (a player
// who joined by the invite link). The fold enforces the rights the log cannot: a member speaks
// only for the player they registered, a battle they took part in, a reward of their own. An event
// the fold refuses is kept in `rejected` with the reason, never applied.
//
// The rules are the booklet's (src/data/dominatus.js `rules`):
//   - A battle, once the Warmaster approves it: Agenda Achieved cards to each side (a player holds
//     at most 3); in phases 1–2 the victor draws a Battle Honour of the phase, the other side (both
//     on a draw) a Battle Skill, one card more for a side that gained an Agenda Achieved card and
//     one more under a Location bonus; in phase 3 the victor gains Path to Conquest.
//   - The end of a phase: Take Control (most Battle Honours this phase; tie → over the campaign;
//     still tied → the Warmaster's word), the Location bonus of a first take, Ascendancy (most
//     Agenda Achieved cards held, ties all), Narrative Points, Relic draws (phases 1–2), the
//     discard of Agenda Achieved cards from earlier phases.
// A draw is "draw N, keep 1" — by the app, or by hand from a physical deck (`draw` setting); the
// fold checks the card kept against what may be drawn and against the player's hand (no
// duplicates), not the randomness. The app's draw is an event of its own (`draw`), written before
// the card is kept: the cards that came are the campaign's, on every device and after a reload, and
// a second draw for the same reward is refused.
//
// The Warmaster corrects the log, never rewrites it (the booklet leaves everything to them): an
// `amend` names earlier events and gives each a new payload, or none to take it out. The fold reads
// each amended event in its own place with its new payload, so what followed is worked out again —
// a battle's rewards, the end of a phase. `battleAmend`, `reopenPhase` and `removePlayer` say which
// events a correction has to touch for the rest of the log to still hold.

/**
 * @typedef {{ slug: string, kind: 'honour' | 'skill' | 'relic', phase?: number, alliance?: string }} UpgradeCard
 * @typedef {{ slug: string, phase: number }} LocationCard
 * @typedef {{ upgrades: UpgradeCard[], locations: LocationCard[] }} Deck
 * @typedef {{ seq: number, author: string, type: string, payload: any, at?: string }} CampaignEvent
 * @typedef {{ phase: number }} AgendaCard
 * @typedef {{ code: string, name: string, points: number, faction: string | null, at: string | null }} RosterSnapshot
 * @typedef {{ id: string, name: string, alliance: string | null, faction: string | null, member: string | null, upgrades: string[], agenda: AgendaCard[], roster: RosterSnapshot | null, factionAsk?: string | null, allianceAsk?: string | null }} Player
 * @typedef {{ side: 'a' | 'b', slug: string, unit: string }} BattleUpgrade
 * @typedef {{ id: string, phase: number, a: string, b: string, victor: 'a' | 'b' | null, achieved: { a: number, b: number }, upgrades: BattleUpgrade[], alliances: { a: string | null, b: string | null }, status: 'pending' | 'approved' | 'rejected', by: string, edited: boolean }} Battle
 * @typedef {{ id: string, player: string, kind: string, phase: number, draw: number, battle: string | null, drawn: string[] | null }} Reward
 * @typedef {{ seq: number, payload: object | null }} Amendment
 * @typedef {{ control: string | null, tie: boolean, honours: Record<string, number>, ascendancy: string[], np: Record<string, number> }} PhaseResult
 * @typedef {{ id: string, phase: number, a: string, b: string }} Pairing
 * @typedef {{
 *   name: string, draw: 'app' | 'manual', phase: number, finished: boolean,
 *   approve: 'warmaster' | 'auto', format: 'deck' | 'event', schedule: number[], me: string | null,
 *   join: 'open' | 'closed', allianceBy: 'player' | 'warmaster', factionLock: boolean, allianceLock: boolean,
 *   roster: 'none' | 'optional' | 'required', size: string | string[], battlesBy: 'players' | 'warmaster',
 *   rewardsBy: 'players' | 'warmaster', strict: boolean, pairBy: 'free' | 'warmaster' | 'random',
 *   phaseEnd: 'warmaster' | 'auto', deadlines: Array<string | null>, drawExtra: number, upgradeLimit: number,
 *   hands: 'open' | 'hidden',
 *   pairings: Pairing[],
 *   locations: Record<number, string | null>, control: Record<string, string>,
 *   players: Player[], battles: Battle[], pending: Reward[],
 *   results: Record<number, PhaseResult>, rejected: Array<{ seq: number, reason: string }>
 * }} CampaignState
 */

export const ALLIANCES = ['liberators', 'oppressors', 'raiders']
export const MAX_AGENDA_ACHIEVED = 3
export const PATH_TO_CONQUEST = 'path-to-conquest'
export const DEFAULT_SCHEDULE = [2, 2, 1]
const MAX_SCHEDULE = 20
// The battle sizes a campaign may be played at (the tracker's ids).
export const CAMPAIGN_SIZES = ['incursion', 'strikeForce', 'onslaught']
// A roster snapshot is the share code of the list (rosterShare.js): a deflated, base64url string.
export const MAX_ROSTER_CODE = 7000
// A new campaign's settings. Battles counted by the Warmaster or at once; the booklet's rules or the
// Event Companion's (Relics, the discard and two Location bonuses resolved at the next phase's first
// battle); the Battle Schedule; the player the Warmaster plays as. And who may do what, and what a
// player brings (owner, 2026-11-01): joining by the link open or closed; the Alliance the player's
// or the Warmaster's; the faction kept from the first battle (the booklet) or free; a roster none /
// optional / required (a snapshot everyone sees); the battle size; battles entered by the players or
// the Warmaster alone; rewards taken by the players or handed out by the Warmaster.
//
// And what the booklet's "Modifying Dominatus" offers and more (owner, 2026-11-04): the battle size
// one for the campaign or one a phase (`size`, a string or three); the Alliance kept from the first
// battle (`allianceLock` — after it a change is an ask, as the faction's); battles under strict rules
// (`strict`); who plays whom — anyone, the Warmaster's pairings, or pairings the app draws (`pairBy`);
// the end of a phase by the Warmaster's hand or by itself once the schedule is played (`phaseEnd`);
// a date each phase is played by (`deadlines`); cards more to choose from on every reward
// (`drawExtra`); Upgrades a battle (`upgradeLimit`, the booklet's 3 — Titangrave's +1 on top); the
// players' cards open to all or each to their own player and the Warmaster (`hands`).
export const UPGRADE_LIMIT = 3
export const SETTINGS_DEFAULTS = Object.freeze({
  draw: 'app', approve: 'warmaster', format: 'deck', schedule: DEFAULT_SCHEDULE, me: null,
  join: 'open', allianceBy: 'player', factionLock: true, allianceLock: true, roster: 'none', size: 'strikeForce',
  battlesBy: 'players', rewardsBy: 'players', strict: false, pairBy: 'free', phaseEnd: 'warmaster',
  deadlines: [null, null, null], drawExtra: 0, upgradeLimit: UPGRADE_LIMIT, hands: 'open',
})
const MAX_DRAW_EXTRA = 2
const UPGRADE_LIMITS = [1, 5]
const DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * The battle size of a phase: the campaign's one, or that phase's.
 * @param {CampaignState} s @param {number} [phase]
 */
export function sizeOf(s, phase = s.phase) {
  return Array.isArray(s.size) ? s.size[phase - 1] || SETTINGS_DEFAULTS.size : s.size
}

// Location bonuses the fold applies (the rest are read where they act: Staging Post by the
// Warmaster's next-Location step, Auspicious Augury as a reward its player reports).
/** @type {Record<string, string>} */
const EXTRA_DRAW = { 'the-mannheim-gap': 'skill', 'the-morpheon-line': 'honour', 'volcanus-archipelago': 'relic' }
/** @type {Array<'a' | 'b'>} */
const SIDES = ['a', 'b']
// What an `amend` may touch: the events that describe the campaign. Not an amend (a correction is
// itself corrected by a newer amend of the same event), not the campaign's creation.
const AMENDABLE = ['settings', 'player', 'location', 'pairing', 'battle', 'review', 'claim', 'draw', 'endPhase', 'adjust']
// The rewards that are drawn from a deck (the rest ask the player something).
const DRAWN = ['honour', 'skill', 'relic', 'fresh']

/** @returns {CampaignState} */
function empty() {
  return {
    name: '', phase: 1, finished: false,
    ...SETTINGS_DEFAULTS, schedule: [...DEFAULT_SCHEDULE], deadlines: [null, null, null],
    pairings: [],
    locations: { 1: null, 2: null, 3: null }, control: {},
    players: [], battles: [], pending: [], results: {}, rejected: [],
  }
}

/** @param {CampaignState} s @param {string} id */
const playerById = (s, id) => s.players.find((p) => p.id === id) || null
/** A battle of theirs is in the campaign (counted or waiting): the faction is kept from then. @param {CampaignState} s @param {string} id */
const hasPlayed = (s, id) => s.battles.some((b) => b.status !== 'rejected' && (b.a === id || b.b === id))

/** The two are paired this phase (the Warmaster's pairings or the app's). @param {CampaignState} s @param {string} a @param {string} b */
const paired = (s, a, b) => s.pairings.some((x) => x.phase === s.phase && ((x.a === a && x.b === b) || (x.a === b && x.b === a)))

/** @param {CampaignState} s @param {string | null} alliance @param {string} kind */
function extraDraw(s, alliance, kind) {
  if (!alliance) return 0
  return Object.entries(s.control).some(([loc, a]) => a === alliance && EXTRA_DRAW[loc] === kind) ? 1 : 0
}

/** @param {Player} p @param {number} n @param {number} phase */
function gainAgenda(p, n, phase) {
  for (let i = 0; i < n && p.agenda.length < MAX_AGENDA_ACHIEVED; i++) p.agenda.push({ phase })
}

/**
 * The cards a player may draw for a reward: the pile (a phase's Honours, the Skills, their
 * Alliance's Relics), less what they already hold.
 * @param {Deck} deck @param {Player} p @param {Reward} r
 * @returns {string[]}
 */
export function drawPile(deck, p, r) {
  const held = new Set(p.upgrades)
  /** @param {UpgradeCard} u */
  const ok = (u) => !held.has(u.slug)
  if (r.kind === 'honour') return deck.upgrades.filter((u) => u.kind === 'honour' && u.phase === r.phase && ok(u)).map((u) => u.slug)
  if (r.kind === 'skill') return deck.upgrades.filter((u) => u.kind === 'skill' && ok(u)).map((u) => u.slug)
  if (r.kind === 'relic') return deck.upgrades.filter((u) => u.kind === 'relic' && u.alliance === p.alliance && ok(u)).map((u) => u.slug)
  // Fresh Supplies: a Battle Skill or a Phase 1 Battle Honour.
  if (r.kind === 'fresh') return deck.upgrades.filter((u) => (u.kind === 'skill' || (u.kind === 'honour' && u.phase === 1)) && ok(u)).map((u) => u.slug)
  return []
}

/**
 * Draw `r.draw` cards at random from the pile — what the app does when it draws for the players.
 * @param {Deck} deck @param {Player} p @param {Reward} r @param {() => number} [random]
 */
export function drawFor(deck, p, r, random = Math.random) {
  const pile = drawPile(deck, p, r)
  const out = []
  while (out.length < r.draw && pile.length) out.push(pile.splice(Math.floor(random() * pile.length), 1)[0])
  return out
}

/** @param {CampaignState} s @param {Battle} b */
function approveBattle(s, b) {
  b.status = 'approved'
  for (const side of SIDES) {
    const p = playerById(s, b[side])
    if (!p) continue
    gainAgenda(p, b.achieved[side], b.phase)
    if (b.phase === 3) {
      if (b.victor === side && !p.upgrades.includes(PATH_TO_CONQUEST)) p.upgrades.push(PATH_TO_CONQUEST)
      continue
    }
    const kind = b.victor === side ? 'honour' : 'skill'
    const draw = 1 + (b.achieved[side] > 0 ? 1 : 0) + extraDraw(s, p.alliance, kind) + s.drawExtra
    s.pending.push({ id: `${b.id}:${side}`, player: p.id, kind, phase: b.phase, draw, battle: b.id, drawn: null })
  }
}

/** @param {CampaignState} s @param {number} phase @param {Battle[]} battles */
function honoursBy(s, phase, battles) {
  /** @type {Record<string, number>} */
  const out = {}
  for (const b of battles) {
    if (b.status !== 'approved' || (phase && b.phase !== phase) || !b.victor) continue
    // The Alliance the victor fought for: a player who changed Alliance since takes no Honour along.
    const a = b.alliances?.[b.victor] ?? playerById(s, b[b.victor])?.alliance
    if (a) out[a] = (out[a] || 0) + 1
  }
  return out
}

/**
 * Take Control's candidates: the Alliances with most Battle Honours this phase, a tie broken by the
 * campaign's; more than one left is the Warmaster's word.
 * @param {CampaignState} s @param {number} phase
 */
function controlCandidates(s, phase) {
  const inPhase = honoursBy(s, phase, s.battles)
  const top = Math.max(0, ...Object.values(inPhase))
  let tied = Object.keys(inPhase).filter((a) => inPhase[a] === top && top > 0)
  if (tied.length > 1) {
    const overall = honoursBy(s, 0, s.battles)
    const best = Math.max(...tied.map((a) => overall[a] || 0))
    tied = tied.filter((a) => (overall[a] || 0) === best)
  }
  return tied
}

/**
 * @param {CampaignState} s
 * @param {Deck} deck
 * @param {number} phase
 * @param {string | null} override — the Warmaster's word on a tie nothing else breaks
 */
function endPhase(s, deck, phase, override) {
  const loc = s.locations[phase]
  // I. Take Control
  const tied = controlCandidates(s, phase)
  const tie = tied.length > 1
  const control = tied.length === 1 ? tied[0] : (override && tied.includes(override) ? override : null)
  if (control && loc) {
    s.control[loc] = control
    const members = s.players.filter((p) => p.alliance === control)
    if (loc === 'victorinius-spaceport') for (const p of members) s.pending.push({ id: `p${phase}:fresh:${p.id}`, player: p.id, kind: 'fresh', phase, draw: 1, battle: null, drawn: null })
    if (loc === 'blackfire-death-pits') for (const p of members) s.pending.push({ id: `p${phase}:mettle:${p.id}`, player: p.id, kind: 'mettle', phase, draw: 0, battle: null, drawn: null })
    if (loc === 'eyes-of-the-emperor-observatory') for (const p of members.filter((x) => x.agenda.length < MAX_AGENDA_ACHIEVED)) s.pending.push({ id: `p${phase}:augury:${p.id}`, player: p.id, kind: 'augury', phase, draw: 4, battle: null, drawn: null })
    if (loc === 'titangrave') for (const p of members) if (p.upgrades.filter((u) => deck.upgrades.find((c) => c.slug === u)?.kind === 'honour').length >= 4) gainAgenda(p, 1, phase)
    if (loc === 'hive-acheron-subsprawl') for (const p of members) if (p.upgrades.filter((u) => deck.upgrades.find((c) => c.slug === u)?.kind === 'skill').length >= 3) gainAgenda(p, 1, phase)
  }
  // II. Ascendancy — most Agenda Achieved cards held; every tied Alliance is in ascendancy.
  /** @type {Record<string, number>} */
  const held = {}
  for (const p of s.players) if (p.alliance) held[p.alliance] = (held[p.alliance] || 0) + p.agenda.length
  const most = Math.max(0, ...Object.values(held))
  const ascendancy = most > 0 ? Object.keys(held).filter((a) => held[a] === most) : []
  // Narrative Points (the reverse of each Briefing card)
  /** @type {Record<string, number>} */
  const np = {}
  for (const p of s.players) {
    const a = p.alliance
    if (!a || a in np) continue
    np[a] = (a === control ? (phase === 3 ? 2 : 1) : 0) + (ascendancy.includes(a) ? 1 : 0)
  }
  // III. Acquire Relics — phases 1 and 2, as many cards as Agenda Achieved cards held.
  if (phase < 3) {
    for (const p of s.players) {
      if (!p.agenda.length) continue
      const draw = p.agenda.length + extraDraw(s, p.alliance, 'relic') + s.drawExtra
      s.pending.push({ id: `p${phase}:relic:${p.id}`, player: p.id, kind: 'relic', phase, draw, battle: null, drawn: null })
    }
  }
  // V. Discard the Agenda Achieved cards of previous phases.
  for (const p of s.players) p.agenda = p.agenda.filter((c) => c.phase >= phase)
  s.results[phase] = { control, tie, honours: honoursBy(s, phase, s.battles), ascendancy, np }
  if (phase === 3) s.finished = true
  else s.phase = phase + 1
}

/**
 * @param {CampaignState} s @param {CampaignEvent} e
 * @returns {Player | null} the player the author speaks for, or null for the owner
 */
const memberPlayer = (s, e) => s.players.find((p) => p.member === e.author) || null

/** The players a member who speaks for no one may take as theirs: entered by the Warmaster, spoken
 * for by no one, and not the one the Warmaster plays as.
 * @param {CampaignState} s @returns {Player[]} */
export function takeablePlayers(s) {
  return s.players.filter((p) => !p.member && p.id !== s.me)
}

/**
 * Fold the log into the campaign.
 * @param {CampaignEvent[]} events — in `seq` order
 * @param {Deck} deck
 * @returns {CampaignState}
 */
export function campaignState(events, deck) {
  const s = empty()
  for (const e of liveEvents(events)) {
    const why = apply(s, deck, e)
    if (why) s.rejected.push({ seq: e.seq, reason: why })
  }
  return s
}

/**
 * The Warmaster's corrections in force: each amended event's latest payload, null for one taken out.
 * Exported for the chronicle, which marks what was corrected.
 * @param {CampaignEvent[]} events
 * @returns {Map<number, object | null>}
 */
export function amendments(events) {
  /** @type {Map<number, CampaignEvent>} */
  const bySeq = new Map(events.map((e) => [e.seq, e]))
  /** @type {Map<number, object | null>} */
  const out = new Map()
  for (const e of events) {
    if (e.type !== 'amend' || e.author !== 'owner') continue
    const edits = Array.isArray(e.payload?.edits) ? e.payload.edits : []
    for (const x of edits) {
      const t = bySeq.get(x?.seq)
      if (!t || t.seq >= e.seq || !AMENDABLE.includes(t.type)) continue
      out.set(t.seq, x.payload && typeof x.payload === 'object' ? x.payload : null)
    }
  }
  return out
}

/**
 * The log as the fold reads it: an event taken out is gone, an amended one carries its new payload
 * (and `amended`), the amends themselves stay for the fold to check who wrote them.
 * @param {CampaignEvent[]} events
 * @returns {Array<CampaignEvent & { amended?: boolean }>}
 */
function liveEvents(events) {
  const am = amendments(events)
  const out = []
  for (const e of events) {
    if (!am.has(e.seq)) { out.push(e); continue }
    const payload = am.get(e.seq)
    if (payload) out.push({ ...e, payload, amended: true })
  }
  return out
}

/**
 * Take out the claims and draws of these rewards: the reward comes back to be drawn again.
 * @param {CampaignEvent[]} live @param {string[]} rewards
 * @returns {Amendment[]}
 */
function rewardEdits(live, rewards) {
  return live
    .filter((e) => (e.type === 'claim' || e.type === 'draw') && rewards.includes(e.payload?.reward))
    .map((e) => ({ seq: e.seq, payload: null }))
}

// The Upgrades a battle was played with, for the chronicle ("Ann: Fire and Fury → Leman Russ"): a
// record, not a rule — nothing in the campaign is worked out from them, so an entry the deck does not
// know is dropped rather than the battle refused. At most UPGRADES_PER_SIDE a side: the largest limit
// a campaign may set, 5, and Titangrave's one more (upgrades.js `upgradeLimit`).
export const UPGRADES_PER_SIDE = 6
/**
 * @param {unknown} list @param {Deck} deck
 * @returns {BattleUpgrade[]}
 */
function battleUpgrades(list, deck) {
  if (!Array.isArray(list)) return []
  /** @type {BattleUpgrade[]} */
  const out = []
  for (const u of list) {
    const side = u?.side
    if ((side !== 'a' && side !== 'b') || !deck.upgrades.some((c) => c.slug === u.slug)) continue
    if (out.filter((x) => x.side === side).length >= UPGRADES_PER_SIDE) continue
    out.push({ side, slug: u.slug, unit: typeof u.unit === 'string' ? u.unit.trim().slice(0, 80) : '' })
  }
  return out
}

/**
 * The `battle` event a finished tracker game makes, as campaign players `a` and `b` (its first and
 * second side): the victor, each side's Agenda Achieved cards, the phase it was played in (sent after
 * that phase ended, the campaign refuses it rather than counting it in the next one) and the Upgrades
 * each side gave its units. Its id is the game's, so the same game sent twice — by both phones of a
 * shared game — counts once.
 * @param {any} game a finished tracker game
 * @param {string} a @param {string} b
 * @param {0 | 1 | null} winner the side ahead (gameScoring.js `leader`), null on a draw
 */
export function battleEvent(game, a, b, winner) {
  const phase = game.settings?.dominatus?.phase
  /** @type {Array<'a' | 'b'>} */
  const sides = ['a', 'b']
  return {
    id: `g-${game.id}`,
    ...(phase ? { phase } : {}),
    a,
    b,
    victor: winner === 0 ? 'a' : winner === 1 ? 'b' : null,
    achieved: { a: game.players[0].agendaAchieved || 0, b: game.players[1].agendaAchieved || 0 },
    upgrades: sides.flatMap((side, i) => (game.players[i].upgrades || []).map((/** @type {any} */ u) => ({ side, slug: u.slug, unit: u.unit || '' }))),
    // Played under strict rules: a campaign that asks for them takes a member's battle only so.
    strict: !!game.settings?.strictRules,
  }
}

/**
 * The amend that corrects a counted battle's result, or takes the battle out (`change` null).
 * Taken out, its review and every card drawn for it go too. Corrected, a side whose reward changes
 * (an Honour for a Skill, or one card more or less to draw) gives back what it drew for it and draws
 * again; a side whose reward stays keeps its card.
 * @param {CampaignEvent[]} events
 * @param {string} battleId
 * @param {{ victor: 'a' | 'b' | null, achieved: { a: number, b: number } } | null} change
 * @returns {Amendment[]}
 */
export function battleAmend(events, battleId, change) {
  const live = liveEvents(events)
  const be = live.find((e) => e.type === 'battle' && e.payload?.id === battleId)
  if (!be) return []
  const rewardOf = (/** @type {string} */ side) => `${battleId}:${side}`
  if (!change) {
    return [
      { seq: be.seq, payload: null },
      ...live.filter((e) => e.type === 'review' && e.payload?.battle === battleId).map((e) => ({ seq: e.seq, payload: null })),
      ...rewardEdits(live, SIDES.map(rewardOf)),
    ]
  }
  const was = be.payload
  const next = { ...was, victor: change.victor, achieved: { a: change.achieved.a, b: change.achieved.b } }
  /** @param {any} b @param {string} side */
  const reward = (b, side) => `${b.victor === side ? 'honour' : 'skill'}:${(Number(b.achieved?.[side]) || 0) > 0}`
  const changed = SIDES.filter((side) => reward(was, side) !== reward(next, side)).map(rewardOf)
  return [{ seq: be.seq, payload: next }, ...rewardEdits(live, changed)]
}

/**
 * What stands in the way of correcting a battle: one of a closed phase is corrected by reopening
 * the phase first (its end drew Relics on the Agenda Achieved cards it counted).
 * @param {CampaignState} s @param {Battle} b
 * @returns {'closed' | null}
 */
export function battleLocked(s, b) {
  return s.finished || b.phase !== s.phase ? 'closed' : null
}

/**
 * The phase the Warmaster can reopen — the last one ended — and what stands in the way: a battle
 * already counted or waiting in the phase after it. Rejected battles of that phase go with it.
 * @param {CampaignState} s
 * @returns {{ phase: number, blocked: boolean } | null}
 */
export function reopenable(s) {
  const phase = s.finished ? 3 : s.phase - 1
  if (phase < 1) return null
  const blocked = !s.finished && s.battles.some((b) => b.phase === s.phase && b.status !== 'rejected')
  return { phase, blocked }
}

/**
 * The amend that reopens the last phase ended: its end goes, with what only it led to — the next
 * phase's Location, the Relics and Location bonuses it handed out (drawn, kept or reported), the
 * next phase's refused battles.
 * @param {CampaignEvent[]} events
 * @param {CampaignState} s
 * @returns {Amendment[]}
 */
export function reopenPhase(events, s) {
  const r = reopenable(s)
  if (!r || r.blocked) return []
  const live = liveEvents(events)
  const end = live.filter((e) => e.type === 'endPhase' && e.payload?.phase === r.phase).pop()
  if (!end) return []
  const next = r.phase + 1
  const dropped = s.battles.filter((b) => b.phase === next).map((b) => b.id)
  const out = live.filter((e) => e.seq > end.seq && (
    ((e.type === 'location' || e.type === 'pairing') && e.payload?.phase === next)
    || ((e.type === 'claim' || e.type === 'draw') && String(e.payload?.reward || '').startsWith(`p${r.phase}:`))
    || (e.type === 'battle' && dropped.includes(e.payload?.id))
    || (e.type === 'review' && dropped.includes(e.payload?.battle))
  ))
  return [{ seq: end.seq, payload: null }, ...out.map((e) => ({ seq: e.seq, payload: null }))]
}

/**
 * Can the Warmaster take a player out: only one who has fought no battle and is owed nothing —
 * their battles are other players' battles too.
 * @param {CampaignState} s @param {string} playerId
 */
export function removable(s, playerId) {
  return !s.battles.some((b) => b.a === playerId || b.b === playerId) && !s.pending.some((r) => r.player === playerId)
}

/**
 * The amend that takes a player out: every event that made or changed them.
 * @param {CampaignEvent[]} events @param {string} playerId
 * @returns {Amendment[]}
 */
export function removePlayer(events, playerId) {
  return liveEvents(events)
    .filter((e) => (e.type === 'player' && e.payload?.id === playerId) || (e.type === 'adjust' && e.payload?.player === playerId))
    .map((e) => ({ seq: e.seq, payload: null }))
}

/**
 * Apply one event; a string is the reason it was refused.
 * @param {CampaignState} s @param {Deck} deck @param {CampaignEvent & { amended?: boolean }} e
 * @returns {string | null}
 */
function apply(s, deck, e) {
  const owner = e.author === 'owner'
  const p = e.payload || {}
  switch (e.type) {
    case 'created':
    case 'settings':
      if (!owner) return 'owner only'
      if (typeof p.name === 'string') s.name = p.name
      if (p.draw === 'app' || p.draw === 'manual') s.draw = p.draw
      if (p.approve === 'warmaster' || p.approve === 'auto') s.approve = p.approve
      if (p.format === 'deck' || p.format === 'event') s.format = p.format
      if (Array.isArray(p.schedule) && p.schedule.length === 3) s.schedule = p.schedule.map((/** @type {any} */ n) => Math.max(0, Math.min(MAX_SCHEDULE, Math.floor(Number(n) || 0))))
      if (p.me !== undefined) s.me = typeof p.me === 'string' && p.me ? p.me : null
      if (p.join === 'open' || p.join === 'closed') s.join = p.join
      if (p.allianceBy === 'player' || p.allianceBy === 'warmaster') s.allianceBy = p.allianceBy
      if (typeof p.factionLock === 'boolean') s.factionLock = p.factionLock
      if (p.roster === 'none' || p.roster === 'optional' || p.roster === 'required') s.roster = p.roster
      if (CAMPAIGN_SIZES.includes(p.size)) s.size = p.size
      else if (Array.isArray(p.size) && p.size.length === 3 && p.size.every((/** @type {any} */ x) => CAMPAIGN_SIZES.includes(x))) s.size = [...p.size]
      if (typeof p.allianceLock === 'boolean') s.allianceLock = p.allianceLock
      if (typeof p.strict === 'boolean') s.strict = p.strict
      if (p.pairBy === 'free' || p.pairBy === 'warmaster' || p.pairBy === 'random') s.pairBy = p.pairBy
      if (p.phaseEnd === 'warmaster' || p.phaseEnd === 'auto') s.phaseEnd = p.phaseEnd
      if (Array.isArray(p.deadlines) && p.deadlines.length === 3) s.deadlines = p.deadlines.map((/** @type {any} */ d) => (typeof d === 'string' && DATE.test(d) ? d : null))
      if (Number.isInteger(p.drawExtra)) s.drawExtra = Math.max(0, Math.min(MAX_DRAW_EXTRA, p.drawExtra))
      if (Number.isInteger(p.upgradeLimit)) s.upgradeLimit = Math.max(UPGRADE_LIMITS[0], Math.min(UPGRADE_LIMITS[1], p.upgradeLimit))
      if (p.hands === 'open' || p.hands === 'hidden') s.hands = p.hands
      if (p.battlesBy === 'players' || p.battlesBy === 'warmaster') s.battlesBy = p.battlesBy
      if (p.rewardsBy === 'players' || p.rewardsBy === 'warmaster') s.rewardsBy = p.rewardsBy
      return null

    case 'player': {
      // The Warmaster adds or edits anyone; a member registers or edits the one player they are — or,
      // speaking for no one yet, takes a player the Warmaster entered by name and no one speaks for
      // ("This is me", owner 2026-11-05: the Warmaster wrote "Bob" in, Bob opened the link and was a
      // second Bob). Taking is the member alone; the Warmaster gives a player to another entry.
      if (typeof p.id !== 'string' || !p.id) return 'no player id'
      if (p.alliance != null && !ALLIANCES.includes(p.alliance)) return 'unknown alliance'
      const was = playerById(s, p.id)
      // A player who has played, in a campaign that keeps the faction, asks the Warmaster for another
      // one (owner, 2026-11-03: "flexible, but the last word is the Warmaster's"): the ask waits on
      // the player (`factionAsk`) until the Warmaster sets a faction or turns it down (`factionAsk:
      // null`); the player asking for the faction they have takes the ask back.
      let ask = false
      let allianceAsk = false
      let takes = false
      if (!owner) {
        const mine = memberPlayer(s, e)
        takes = !!was && takeablePlayers(s).includes(was) && !mine && p.member === e.author
        if (was ? was.member !== e.author && !takes : !!mine) return 'not your player'
        if (!was && s.join === 'closed') return 'registration closed'
        const newAlliance = p.alliance !== undefined && (p.alliance || null) !== (was?.alliance || null)
        if (s.allianceBy === 'warmaster' && newAlliance) return 'alliance by the warmaster'
        // The Alliance, like the faction, is kept from the first battle: after it, a change is an ask.
        if (s.allianceLock && was && newAlliance && hasPlayed(s, was.id)) {
          if (!p.alliance) return 'alliance locked'
          allianceAsk = true
        }
        if (s.factionLock && was && p.faction !== undefined && (p.faction || null) !== was.faction && hasPlayed(s, was.id)) {
          if (!p.faction) return 'faction locked'
          ask = true
        }
      }
      /** @type {Player} */
      const row = was || { id: p.id, name: '', alliance: null, faction: null, member: owner ? null : e.author, upgrades: [], agenda: [], roster: null }
      if (typeof p.name === 'string') row.name = p.name.slice(0, 40)
      if (allianceAsk) row.allianceAsk = p.alliance
      else if (p.alliance !== undefined) {
        row.alliance = p.alliance
        if (row.allianceAsk) row.allianceAsk = null
      }
      if (owner && p.allianceAsk === null && row.allianceAsk) row.allianceAsk = null
      if (ask) row.factionAsk = p.faction
      else if (p.faction !== undefined) {
        row.faction = p.faction || null
        if (row.factionAsk) row.factionAsk = null
      }
      if (owner && p.factionAsk === null && row.factionAsk) row.factionAsk = null
      if (owner && p.member !== undefined) row.member = p.member || null
      if (takes) row.member = e.author
      if (!was) s.players.push(row)
      return null
    }

    case 'roster': {
      // A player's list, as a snapshot (the share code) everyone in the campaign can open; `code:
      // null` takes it off. The Warmaster for anyone, a member for their own player.
      const pl = playerById(s, p.player)
      if (!pl) return 'no such player'
      if (!owner && pl.member !== e.author) return 'not your player'
      if (p.code == null) { pl.roster = null; return null }
      if (s.roster === 'none') return 'rosters off'
      if (typeof p.code !== 'string' || !p.code || p.code.length > MAX_ROSTER_CODE) return 'roster too long'
      // `at` — when the copy was made (the server's stamp): a list changed in the builder since is
      // not this one, and the line says so by its date (owner, 2026-11-05).
      pl.roster = { code: p.code, name: String(p.name || '').slice(0, 60), points: Math.max(0, Math.floor(Number(p.points) || 0)), faction: typeof p.faction === 'string' ? p.faction : null, at: typeof e.at === 'string' ? e.at : null }
      return null
    }

    case 'location':
      if (!owner) return 'owner only'
      if (p.phase !== s.phase) return 'not the current phase'
      if (!deck.locations.some((l) => l.slug === p.slug && l.phase === p.phase)) return 'not a Location of this phase'
      s.locations[p.phase] = p.slug
      return null

    case 'pairing': {
      // The Warmaster sets who plays whom this phase; taken back by an amend.
      if (!owner) return 'owner only'
      if (s.finished || p.phase !== s.phase) return 'not the current phase'
      if (typeof p.id !== 'string' || !p.id || s.pairings.some((x) => x.id === p.id)) return 'duplicate pairing'
      const a = playerById(s, p.a), b = playerById(s, p.b)
      if (!a || !b || a === b) return 'unknown players'
      if (!a.alliance || !b.alliance || a.alliance === b.alliance) return 'players of one Alliance'
      s.pairings.push({ id: p.id, phase: s.phase, a: a.id, b: b.id })
      return null
    }

    case 'battle': {
      if (s.finished) return 'campaign finished'
      // A battle says which phase it was played in (a game sent after the phase it belongs to has
      // ended must not land in the next one); an older entry without it is the current phase's. A
      // late one says so in its own words: the Warmaster may reopen the phase (owner, 2026-11-05).
      if (p.phase != null && p.phase < s.phase) return 'phase ended'
      if (p.phase != null && p.phase !== s.phase) return 'not the current phase'
      if (typeof p.id !== 'string' || s.battles.some((b) => b.id === p.id)) return 'duplicate battle'
      const a = playerById(s, p.a), b = playerById(s, p.b)
      if (!a || !b || a === b) return 'unknown players'
      if (!a.alliance || !b.alliance || a.alliance === b.alliance) return 'players of one Alliance'
      if (!owner && a.member !== e.author && b.member !== e.author) return 'not your battle'
      if (!owner && s.battlesBy === 'warmaster') return 'battles by the warmaster'
      if (!owner && s.roster === 'required' && (!a.roster || !b.roster)) return 'no roster'
      if (!owner && s.strict && p.strict !== true) return 'not strict rules'
      if (!owner && s.pairBy !== 'free' && !paired(s, a.id, b.id)) return 'not paired'
      if (p.victor !== 'a' && p.victor !== 'b' && p.victor !== null) return 'bad victor'
      const cap = s.phase === 3 ? 2 : 1
      /** @param {any} n */
      const ach = (n) => Math.max(0, Math.min(cap, Math.floor(Number(n) || 0)))
      /** @type {Battle} */
      const battle = { id: p.id, phase: s.phase, a: a.id, b: b.id, victor: p.victor, achieved: { a: ach(p.achieved?.a), b: ach(p.achieved?.b) }, upgrades: battleUpgrades(p.upgrades, deck), alliances: { a: a.alliance, b: b.alliance }, status: 'pending', by: e.author, edited: !!e.amended }
      s.battles.push(battle)
      // The Warmaster's own entry needs no second look, nor any under a campaign that counts at once.
      if (owner || s.approve === 'auto') approveBattle(s, battle)
      return null
    }

    case 'review': {
      if (!owner) return 'owner only'
      const b = s.battles.find((x) => x.id === p.battle)
      if (!b || b.status !== 'pending') return 'no pending battle'
      if (p.ok) approveBattle(s, b)
      else b.status = 'rejected'
      return null
    }

    case 'claim': {
      // A reward taken: the card kept (and, drawn by the app, the cards it drew).
      const r = s.pending.find((x) => x.id === p.reward)
      if (!r) return 'no such reward'
      const pl = playerById(s, r.player)
      if (!pl) return 'no such player'
      if (!owner && pl.member !== e.author) return 'not your reward'
      if (!owner && s.rewardsBy === 'warmaster') return 'rewards by the warmaster'
      if (r.kind === 'augury') {
        gainAgenda(pl, Math.max(0, Math.min(r.draw, Math.floor(Number(p.gained) || 0))), r.phase)
      } else if (r.kind === 'mettle') {
        // Test of Mettle: up to one Honour and one Skill swapped for another of the same type.
        for (const sw of Array.isArray(p.swaps) ? p.swaps.slice(0, 2) : []) {
          const out = deck.upgrades.find((u) => u.slug === sw?.out), into = deck.upgrades.find((u) => u.slug === sw?.in)
          if (!out || !into || out.kind !== into.kind || out.kind === 'relic' || (out.kind === 'honour' && out.phase !== into.phase)) return 'not a swap of one type'
          if (!pl.upgrades.includes(out.slug) || pl.upgrades.includes(into.slug)) return 'swap not possible'
          pl.upgrades = pl.upgrades.map((u) => (u === out.slug ? into.slug : u))
        }
      } else {
        const pile = drawPile(deck, pl, r)
        if (p.kept != null) {
          if (!pile.includes(p.kept)) return 'card not in the pile'
          // Drawn by the app: the card kept is one of those its `draw` event drew.
          if (s.draw === 'app' && !(r.drawn || []).includes(p.kept)) return 'kept card was not drawn'
          pl.upgrades.push(p.kept)
        }
      }
      s.pending = s.pending.filter((x) => x !== r)
      return null
    }

    case 'draw': {
      // The cards the app drew for a reward, before one is kept: as many as the reward draws (fewer
      // only when the pile runs short), all from the pile, once.
      const r = s.pending.find((x) => x.id === p.reward)
      if (!r) return 'no such reward'
      const pl = playerById(s, r.player)
      if (!pl) return 'no such player'
      if (!owner && pl.member !== e.author) return 'not your reward'
      if (!owner && s.rewardsBy === 'warmaster') return 'rewards by the warmaster'
      if (s.draw !== 'app') return 'drawn at the table'
      if (!DRAWN.includes(r.kind)) return 'nothing to draw'
      if (r.drawn) return 'already drawn'
      const pile = drawPile(deck, pl, r)
      const cards = Array.isArray(p.cards) ? p.cards : []
      if (cards.length !== Math.min(r.draw, pile.length) || new Set(cards).size !== cards.length || cards.some((/** @type {any} */ c) => !pile.includes(c))) return 'not a draw from the pile'
      r.drawn = [...cards]
      return null
    }

    case 'amend':
      // Read before the fold (liveEvents); here only who wrote it.
      return owner ? null : 'owner only'

    case 'endPhase':
      if (!owner) return 'owner only'
      if (s.finished || p.phase !== s.phase) return 'not the current phase'
      if (!s.locations[s.phase]) return 'no Location chosen'
      endPhase(s, deck, s.phase, typeof p.control === 'string' ? p.control : null)
      return null

    case 'adjust': {
      // The Warmaster's hand on a player's cards — the booklet lets them change anything.
      if (!owner) return 'owner only'
      const pl = playerById(s, p.player)
      if (!pl) return 'no such player'
      if (Array.isArray(p.upgrades)) pl.upgrades = [...new Set(p.upgrades.filter((/** @type {any} */ u) => deck.upgrades.some((c) => c.slug === u)))]
      if (p.agenda != null) {
        // The cards kept keep their phase (one from the last phase is still discarded at the end of
        // this one); a card added is of this phase.
        const n = Math.max(0, Math.min(MAX_AGENDA_ACHIEVED, Math.floor(Number(p.agenda) || 0)))
        pl.agenda = [...pl.agenda.slice(0, n), ...Array.from({ length: Math.max(0, n - pl.agenda.length) }, () => ({ phase: s.phase }))]
      }
      return null
    }

    default:
      return 'unknown event'
  }
}

/**
 * A player's counted battles: won, drawn, lost. A battle the Warmaster has not counted (pending) or
 * refused is not in it.
 * @param {CampaignState} s
 * @param {string} playerId
 */
export function recordOf(s, playerId) {
  const r = { won: 0, drawn: 0, lost: 0 }
  for (const b of s.battles) {
    if (b.status !== 'approved') continue
    const side = b.a === playerId ? 'a' : b.b === playerId ? 'b' : null
    if (!side) continue
    if (!b.victor) r.drawn++
    else if (b.victor === side) r.won++
    else r.lost++
  }
  return r
}

/**
 * A player's battles this phase that count toward the Battle Schedule: counted or waiting.
 * @param {CampaignState} s @param {string} playerId @param {number} [phase]
 */
export function playedIn(s, playerId, phase = s.phase) {
  return s.battles.filter((b) => b.phase === phase && b.status !== 'rejected' && (b.a === playerId || b.b === playerId)).length
}

/**
 * The Battle Schedule this phase: each player in an Alliance, battles played and due; `done` once
 * every one of them has played theirs (and the Warmaster has counted them all).
 * @param {CampaignState} s
 */
export function scheduleProgress(s) {
  const due = s.schedule[s.phase - 1] ?? 0
  const rows = s.players.filter((p) => p.alliance).map((p) => ({ player: p.id, played: playedIn(s, p.id), due }))
  const waiting = s.battles.some((b) => b.phase === s.phase && b.status === 'pending')
  return { due, rows, done: !s.finished && due > 0 && rows.length > 0 && rows.every((r) => r.played >= due) && !waiting }
}

/**
 * The Warmaster's pairings this phase, each with whether a battle between the two is in.
 * @param {CampaignState} s
 */
export function pairingsNow(s) {
  return s.pairings.filter((x) => x.phase === s.phase).map((x) => ({
    ...x,
    played: s.battles.some((b) => b.phase === x.phase && b.status !== 'rejected' && ((b.a === x.a && b.b === x.b) || (b.a === x.b && b.b === x.a))),
  }))
}

/**
 * @typedef {{ kind: string, todo: boolean, tab: string, n?: number, player?: string, reward?: Reward, battle?: Battle, faction?: string, alliance?: string }} NextStep
 */

/**
 * What waits for this reader now, in the order to do it: first what they can do (`todo`), then what
 * they wait for (owner, 2026-11-03: a player opened the campaign and did not know what was asked of
 * them). `me` is the player this reader speaks for (`myPlayer`), `owner` whether they are the
 * Warmaster. Each step names the tab where it is done.
 * @param {CampaignState} s @param {Player | null} me @param {boolean} owner
 * @returns {NextStep[]}
 */
export function nextSteps(s, me, owner) {
  /** @type {NextStep[]} */
  const todo = []
  /** @type {NextStep[]} */
  const wait = []
  if (s.finished) return [{ kind: 'finished', todo: false, tab: 'standings' }]
  // Speaking for no one yet: take the player the Warmaster entered by name, or sign up.
  if (!owner && !me) {
    if (takeablePlayers(s).length) return [{ kind: 'take', todo: true, tab: 'players' }]
    return s.join === 'open' ? [{ kind: 'register', todo: true, tab: 'players' }] : []
  }
  const other = (/** @type {Battle} */ b, /** @type {string} */ id) => (b.a === id ? b.b : b.a)
  // Rewards: a player's own (or handed out by the Warmaster); the Warmaster's, everyone's they hand out.
  for (const r of s.pending.filter((x) => me && x.player === me.id)) {
    const battle = s.battles.find((b) => b.id === r.battle)
    const step = { kind: 'reward', tab: 'rewards', reward: r, ...(battle && me ? { player: other(battle, me.id) } : {}) }
    if (owner || s.rewardsBy !== 'warmaster') todo.push({ ...step, todo: true })
    else wait.push({ ...step, kind: 'rewardWait', todo: false })
  }
  const located = !!s.locations[s.phase]
  if (owner) {
    if (!located) todo.push({ kind: 'location', todo: true, tab: 'phase' })
    const toCount = s.battles.filter((b) => b.status === 'pending').length
    if (toCount) todo.push({ kind: 'count', todo: true, tab: 'battles', n: toCount })
    const toGive = s.pending.filter((x) => x.player !== me?.id).length
    if (toGive && s.rewardsBy === 'warmaster') todo.push({ kind: 'give', todo: true, tab: 'rewards', n: toGive })
    for (const p of s.players.filter((x) => x.factionAsk)) todo.push({ kind: 'factionAsk', todo: true, tab: 'players', player: p.id, faction: p.factionAsk || undefined })
    for (const p of s.players.filter((x) => x.allianceAsk)) todo.push({ kind: 'allianceAsk', todo: true, tab: 'players', player: p.id, alliance: p.allianceAsk || undefined })
    // The app's pairings are the Warmaster's to draw, once a phase has its Location.
    if (s.pairBy === 'random' && located && !s.pairings.some((x) => x.phase === s.phase)) todo.push({ kind: 'drawPairs', todo: true, tab: 'battles' })
  }
  if (!owner && me?.factionAsk) wait.push({ kind: 'factionAskWait', todo: false, tab: 'players', player: me.id, faction: me.factionAsk || undefined })
  if (!owner && me?.allianceAsk) wait.push({ kind: 'allianceAskWait', todo: false, tab: 'players', player: me.id, alliance: me.allianceAsk || undefined })
  if (me && me.alliance) {
    for (const b of s.battles.filter((x) => x.phase === s.phase && x.status === 'pending' && (x.a === me.id || x.b === me.id))) {
      wait.push({ kind: 'waitCount', todo: false, tab: 'battles', battle: b, player: other(b, me.id) })
    }
    const due = s.schedule[s.phase - 1] ?? 0
    const left = due - playedIn(s, me.id)
    const paired = pairingsNow(s).filter((x) => !x.played && (x.a === me.id || x.b === me.id))
    if (left > 0 && !located && !owner) wait.push({ kind: 'waitLocation', todo: false, tab: 'phase' })
    else if (left > 0 && located && !(s.battlesBy === 'warmaster' && !owner)) {
      for (const x of paired.slice(0, left)) todo.push({ kind: 'play', todo: true, tab: 'battles', player: x.a === me.id ? x.b : x.a })
      // Under pairings a battle is played only with the paired opponent.
      if (left > paired.length && s.pairBy === 'free') todo.push({ kind: 'playMore', todo: true, tab: 'battles', n: left - paired.length })
      else if (!paired.length && s.pairBy !== 'free') wait.push({ kind: 'waitPairs', todo: false, tab: 'battles' })
    } else if (left <= 0 && due > 0 && !owner) wait.push({ kind: 'phaseDone', todo: false, tab: 'phase' })
  }
  if (owner && scheduleProgress(s).done) todo.push({ kind: 'endPhase', todo: true, tab: 'phase' })
  return [...todo, ...wait]
}

/**
 * Battles waiting for the Warmaster that look entered twice: the same two players in the same phase
 * as another battle not refused (two phones each sending the game they kept).
 * @param {CampaignState} s
 * @returns {Set<string>}
 */
export function likelyDuplicates(s) {
  const key = (/** @type {Battle} */ b) => `${b.phase}:${[b.a, b.b].sort().join('|')}`
  /** @type {Map<string, number>} */
  const n = new Map()
  for (const b of s.battles) if (b.status !== 'rejected') n.set(key(b), (n.get(key(b)) || 0) + 1)
  return new Set(s.battles.filter((b) => b.status === 'pending' && (n.get(key(b)) || 0) > 1).map((b) => b.id))
}

/**
 * Battle Honours, Agenda Achieved cards held and Narrative Points so far, per Alliance — the
 * standings the campaign page shows.
 * @param {CampaignState} s
 */
export function standings(s) {
  const phaseHonours = honoursBy(s, s.phase, s.battles)
  const totalHonours = honoursBy(s, 0, s.battles)
  return ALLIANCES.filter((a) => s.players.some((p) => p.alliance === a)).map((a) => ({
    alliance: a,
    honours: phaseHonours[a] || 0,
    totalHonours: totalHonours[a] || 0,
    agendaAchieved: s.players.filter((p) => p.alliance === a).reduce((n, p) => n + p.agenda.length, 0),
    np: Object.values(s.results).reduce((n, r) => n + (r.np[a] || 0), 0),
    locations: Object.entries(s.control).filter(([, x]) => x === a).map(([loc]) => loc),
  }))
}

/**
 * Pairings the app draws for this phase (`pairBy: 'random'`): every player in an Alliance, each with
 * an opponent of another Alliance, as evenly as the Alliances allow — the largest Alliance's players
 * first, each against the opponent with the fewest pairings so far. A player left without one (an
 * odd count) plays whoever the Warmaster adds. Returns `{ a, b }` pairs.
 * @param {CampaignState} s @param {() => number} [random]
 */
export function randomPairings(s, random = Math.random) {
  const shuffle = (/** @type {Player[]} */ xs) => {
    const a = [...xs]
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
    return a
  }
  const left = shuffle(s.players.filter((p) => p.alliance))
  /** @type {Array<{ a: string, b: string }>} */
  const out = []
  while (left.length > 1) {
    // The player of the largest Alliance still left, so no Alliance is left with only itself.
    const count = (/** @type {string | null} */ al) => left.filter((p) => p.alliance === al).length
    left.sort((x, y) => count(y.alliance) - count(x.alliance))
    const a = left.shift()
    const i = left.findIndex((p) => p.alliance !== a?.alliance)
    if (!a || i < 0) break
    const [b] = left.splice(i, 1)
    out.push({ a: a.id, b: b.id })
  }
  return out
}

/**
 * The phase ends by itself (`phaseEnd: 'auto'`): the schedule is played and counted, and nothing
 * waits for the Warmaster's word — no tie for control that the rules cannot break. The Warmaster's
 * device then writes the end (an event of theirs, as by the button).
 * @param {CampaignState} s
 */
export function phaseEndsByItself(s) {
  if (s.phaseEnd !== 'auto' || !s.locations[s.phase] || !scheduleProgress(s).done) return false
  return controlCandidates(s, s.phase).length <= 1
}
