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
 * @typedef {{ seq: number, author: string, type: string, payload: any }} CampaignEvent
 * @typedef {{ phase: number }} AgendaCard
 * @typedef {{ id: string, name: string, alliance: string | null, faction: string | null, member: string | null, upgrades: string[], agenda: AgendaCard[] }} Player
 * @typedef {{ id: string, phase: number, a: string, b: string, victor: 'a' | 'b' | null, achieved: { a: number, b: number }, status: 'pending' | 'approved' | 'rejected', by: string, edited: boolean }} Battle
 * @typedef {{ id: string, player: string, kind: string, phase: number, draw: number, battle: string | null, drawn: string[] | null }} Reward
 * @typedef {{ seq: number, payload: object | null }} Amendment
 * @typedef {{ control: string | null, tie: boolean, honours: Record<string, number>, ascendancy: string[], np: Record<string, number> }} PhaseResult
 * @typedef {{ id: string, phase: number, a: string, b: string }} Pairing
 * @typedef {{
 *   name: string, draw: 'app' | 'manual', phase: number, finished: boolean,
 *   approve: 'warmaster' | 'auto', format: 'deck' | 'event', schedule: number[], me: string | null,
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
    name: '', draw: 'app', phase: 1, finished: false,
    // Battles counted by the Warmaster or at once; the booklet's rules or the Event Companion's
    // (Relics, the discard and two Location bonuses resolved at the next phase's first battle); the
    // Battle Schedule's battles per player per phase (the booklet's default 2 / 2 / 1); the player
    // the Warmaster plays as, if they play.
    approve: 'warmaster', format: 'deck', schedule: [...DEFAULT_SCHEDULE], me: null,
    pairings: [],
    locations: { 1: null, 2: null, 3: null }, control: {},
    players: [], battles: [], pending: [], results: {}, rejected: [],
  }
}

/** @param {CampaignState} s @param {string} id */
const playerById = (s, id) => s.players.find((p) => p.id === id) || null

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
    const draw = 1 + (b.achieved[side] > 0 ? 1 : 0) + extraDraw(s, p.alliance, kind)
    s.pending.push({ id: `${b.id}:${side}`, player: p.id, kind, phase: b.phase, draw, battle: b.id, drawn: null })
  }
}

/** @param {CampaignState} s @param {number} phase @param {Battle[]} battles */
function honoursBy(s, phase, battles) {
  /** @type {Record<string, number>} */
  const out = {}
  for (const b of battles) {
    if (b.status !== 'approved' || (phase && b.phase !== phase) || !b.victor) continue
    const a = playerById(s, b[b.victor])?.alliance
    if (a) out[a] = (out[a] || 0) + 1
  }
  return out
}

/**
 * @param {CampaignState} s
 * @param {Deck} deck
 * @param {number} phase
 * @param {string | null} override — the Warmaster's word on a tie nothing else breaks
 */
function endPhase(s, deck, phase, override) {
  const loc = s.locations[phase]
  const inPhase = honoursBy(s, phase, s.battles)
  const overall = honoursBy(s, 0, s.battles)
  // I. Take Control
  const top = Math.max(0, ...Object.values(inPhase))
  let tied = Object.keys(inPhase).filter((a) => inPhase[a] === top && top > 0)
  if (tied.length > 1) {
    const best = Math.max(...tied.map((a) => overall[a] || 0))
    tied = tied.filter((a) => (overall[a] || 0) === best)
  }
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
      const draw = p.agenda.length + extraDraw(s, p.alliance, 'relic')
      s.pending.push({ id: `p${phase}:relic:${p.id}`, player: p.id, kind: 'relic', phase, draw, battle: null, drawn: null })
    }
  }
  // V. Discard the Agenda Achieved cards of previous phases.
  for (const p of s.players) p.agenda = p.agenda.filter((c) => c.phase >= phase)
  s.results[phase] = { control, tie, honours: inPhase, ascendancy, np }
  if (phase === 3) s.finished = true
  else s.phase = phase + 1
}

/**
 * @param {CampaignState} s @param {CampaignEvent} e
 * @returns {Player | null} the player the author speaks for, or null for the owner
 */
const memberPlayer = (s, e) => s.players.find((p) => p.member === e.author) || null

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
      return null

    case 'player': {
      // The Warmaster adds or edits anyone; a member registers or edits the one player they are.
      if (typeof p.id !== 'string' || !p.id) return 'no player id'
      if (p.alliance != null && !ALLIANCES.includes(p.alliance)) return 'unknown alliance'
      const was = playerById(s, p.id)
      if (!owner) {
        const mine = memberPlayer(s, e)
        if (was ? was.member !== e.author : !!mine) return 'not your player'
      }
      const row = was || { id: p.id, name: '', alliance: null, faction: null, member: owner ? null : e.author, upgrades: [], agenda: [] }
      if (typeof p.name === 'string') row.name = p.name.slice(0, 40)
      if (p.alliance !== undefined) row.alliance = p.alliance
      if (p.faction !== undefined) row.faction = p.faction || null
      if (owner && p.member !== undefined) row.member = p.member || null
      if (!was) s.players.push(row)
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
      // ended must not land in the next one); an older entry without it is the current phase's.
      if (p.phase != null && p.phase !== s.phase) return 'not the current phase'
      if (typeof p.id !== 'string' || s.battles.some((b) => b.id === p.id)) return 'duplicate battle'
      const a = playerById(s, p.a), b = playerById(s, p.b)
      if (!a || !b || a === b) return 'unknown players'
      if (!a.alliance || !b.alliance || a.alliance === b.alliance) return 'players of one Alliance'
      if (!owner && a.member !== e.author && b.member !== e.author) return 'not your battle'
      if (p.victor !== 'a' && p.victor !== 'b' && p.victor !== null) return 'bad victor'
      const cap = s.phase === 3 ? 2 : 1
      /** @param {any} n */
      const ach = (n) => Math.max(0, Math.min(cap, Math.floor(Number(n) || 0)))
      /** @type {Battle} */
      const battle = { id: p.id, phase: s.phase, a: a.id, b: b.id, victor: p.victor, achieved: { a: ach(p.achieved?.a), b: ach(p.achieved?.b) }, status: 'pending', by: e.author, edited: !!e.amended }
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
