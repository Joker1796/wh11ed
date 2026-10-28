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
// duplicates), not the randomness.

/**
 * @typedef {{ slug: string, kind: 'honour' | 'skill' | 'relic', phase?: number, alliance?: string }} UpgradeCard
 * @typedef {{ slug: string, phase: number }} LocationCard
 * @typedef {{ upgrades: UpgradeCard[], locations: LocationCard[] }} Deck
 * @typedef {{ seq: number, author: string, type: string, payload: any }} CampaignEvent
 * @typedef {{ phase: number }} AgendaCard
 * @typedef {{ id: string, name: string, alliance: string | null, faction: string | null, member: string | null, upgrades: string[], agenda: AgendaCard[] }} Player
 * @typedef {{ id: string, phase: number, a: string, b: string, victor: 'a' | 'b' | null, achieved: { a: number, b: number }, status: 'pending' | 'approved' | 'rejected', by: string }} Battle
 * @typedef {{ id: string, player: string, kind: string, phase: number, draw: number, battle: string | null }} Reward
 * @typedef {{ control: string | null, tie: boolean, honours: Record<string, number>, ascendancy: string[], np: Record<string, number> }} PhaseResult
 * @typedef {{
 *   name: string, draw: 'app' | 'manual', phase: number, finished: boolean,
 *   locations: Record<number, string | null>, control: Record<string, string>,
 *   players: Player[], battles: Battle[], pending: Reward[],
 *   results: Record<number, PhaseResult>, rejected: Array<{ seq: number, reason: string }>
 * }} CampaignState
 */

export const ALLIANCES = ['liberators', 'oppressors', 'raiders']
export const MAX_AGENDA_ACHIEVED = 3
export const PATH_TO_CONQUEST = 'path-to-conquest'

// Location bonuses the fold applies (the rest are read where they act: Staging Post by the
// Warmaster's next-Location step, Auspicious Augury as a reward its player reports).
/** @type {Record<string, string>} */
const EXTRA_DRAW = { 'the-mannheim-gap': 'skill', 'the-morpheon-line': 'honour', 'volcanus-archipelago': 'relic' }
/** @type {Array<'a' | 'b'>} */
const SIDES = ['a', 'b']

/** @returns {CampaignState} */
function empty() {
  return {
    name: '', draw: 'app', phase: 1, finished: false,
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
    s.pending.push({ id: `${b.id}:${side}`, player: p.id, kind, phase: b.phase, draw, battle: b.id })
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
    if (loc === 'victorinius-spaceport') for (const p of members) s.pending.push({ id: `p${phase}:fresh:${p.id}`, player: p.id, kind: 'fresh', phase, draw: 1, battle: null })
    if (loc === 'blackfire-death-pits') for (const p of members) s.pending.push({ id: `p${phase}:mettle:${p.id}`, player: p.id, kind: 'mettle', phase, draw: 0, battle: null })
    if (loc === 'eyes-of-the-emperor-observatory') for (const p of members.filter((x) => x.agenda.length < MAX_AGENDA_ACHIEVED)) s.pending.push({ id: `p${phase}:augury:${p.id}`, player: p.id, kind: 'augury', phase, draw: 4, battle: null })
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
      s.pending.push({ id: `p${phase}:relic:${p.id}`, player: p.id, kind: 'relic', phase, draw, battle: null })
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
  for (const e of events) {
    const why = apply(s, deck, e)
    if (why) s.rejected.push({ seq: e.seq, reason: why })
  }
  return s
}

/**
 * Apply one event; a string is the reason it was refused.
 * @param {CampaignState} s @param {Deck} deck @param {CampaignEvent} e
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

    case 'battle': {
      if (s.finished) return 'campaign finished'
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
      const battle = { id: p.id, phase: s.phase, a: a.id, b: b.id, victor: p.victor, achieved: { a: ach(p.achieved?.a), b: ach(p.achieved?.b) }, status: 'pending', by: e.author }
      s.battles.push(battle)
      // The Warmaster's own entry needs no second look.
      if (owner) approveBattle(s, battle)
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
          if (s.draw === 'app') {
            const drawn = Array.isArray(p.drawn) ? p.drawn : []
            if (!drawn.includes(p.kept) || drawn.length > r.draw || drawn.some((/** @type {any} */ d) => !pile.includes(d))) return 'kept card was not drawn'
          }
          pl.upgrades.push(p.kept)
        }
      }
      s.pending = s.pending.filter((x) => x !== r)
      return null
    }

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
      if (p.agenda != null) pl.agenda = Array.from({ length: Math.max(0, Math.min(MAX_AGENDA_ACHIEVED, Math.floor(Number(p.agenda) || 0))) }, () => ({ phase: s.phase }))
      return null
    }

    default:
      return 'unknown event'
  }
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
