import { ref, watch } from 'vue'
import { missions } from '../data/missions.js'
import { missionsRu } from '../data/missionsRu.js'
import { eventCompanion } from '../data/eventCompanion.js'
import {
  PRIMARY_GAME_CAP,
  TACTICAL_SECONDARY_CAP,
  primaryTotal as primaryTotalOf,
  secondaryTotal as secondaryTotalOf,
  grandTotal as grandTotalOf,
  leader as leaderOf,
} from './gameScoring.js'

// Game Tracker store — a module singleton persisted to localStorage, mirroring the
// pattern in useLocale.js / useLoreVisibility.js. Models a 2-player game of 40k 11th:
// setup → 5 battle rounds → finish, with primary/secondary/CP scoring. Inspired by the
// GDM tracker; scoring constants (15/round, 45 total primary; 45 total secondary;
// 20 per fixed secondary) match the official caps.

const CUR_KEY = 'wh11ed-tracker-current'
const HIST_KEY = 'wh11ed-tracker-history'
const DRAFT_KEY = 'wh11ed-tracker-setup-draft'

export const ROUND_COUNT = 5
// Battle sizes (rule 25.03): each sets the Detachment-Points budget used in setup.
export const BATTLE_SIZES = [
  { id: 'incursion', name: 'Incursion', points: 1000, maxDp: 2 },
  { id: 'strikeForce', name: 'Strike Force', points: 2000, maxDp: 3 },
  { id: 'onslaught', name: 'Onslaught', points: 3000, maxDp: 3 },
]
export const PRIMARY_ROUND_CAP = 15
// Game-level caps live in gameScoring.js (single source of truth); re-export for existing
// importers (RoundTracker, ScoreBreakdown).
export {
  PRIMARY_GAME_CAP,
  FIXED_SECONDARY_CAP,
  TACTICAL_SECONDARY_CAP,
  SECONDARY_GAME_CAP,
  BATTLE_READY_VP,
} from './gameScoring.js'

// The 5 Force Dispositions (canonical id + English name), reused from the Event Companion.
export const DISPOSITIONS = eventCompanion.en.dispositions.map(d => ({ id: d.id, name: d.name }))

export function dispositionName(id) {
  const d = DISPOSITIONS.find(x => x.id === id)
  return d ? d.name : ''
}

// Faction / detachment data (FACTIONS, FACTION_GROUPS, detachmentsFor, …) lives in
// trackerFactions.js so the heavy mfmFactions.js dataset only loads with the setup wizard.
// Overlay the RU block text (heading/when/rows.text) onto the EN mission. Name and all
// logic fields (slug/vp/modifier/kind/…) stay English; mission names are intentionally EN
// (an optional nameRu adds a translated display subline, same convention as stratagems).
function localize(m, role) {
  if (!m) return null
  const tr = role ? missionsRu.secondary[`${m.slug}|${role}`] : missionsRu.primary[m.slug]
  if (!tr) return m
  return {
    ...m,
    ...(tr.nameRu ? { nameRu: tr.nameRu } : {}),
    // briefing is replaced wholesale (RU mirrors the EN structure, maintained in lockstep).
    ...(tr.briefing ? { briefing: tr.briefing } : {}),
    ...(tr.lore ? { lore: tr.lore } : {}),
    blocks: m.blocks.map((b, bi) => {
      const tb = tr.blocks[bi]
      if (!tb) return b
      return {
        ...b,
        heading: tb.heading ?? b.heading,
        when: b.when != null ? (tb.when ?? b.when) : b.when,
        rows: b.rows.map((r, ri) => ({ ...r, text: (tb.rows && tb.rows[ri]) || r.text })),
      }
    }),
  }
}

export function missionBySlug(slug, role, locale = 'en') {
  const m = role
    ? missions.en.secondary.find(x => x.slug === slug && x.role === role) || null
    : missions.en.primary.find(x => x.slug === slug) || null
  return locale === 'ru' ? localize(m, role) : m
}
// Which battle rounds a block can score in, by its (English) heading.
const BLOCK_ROUNDS = {
  'Any Battle Round': [1, 2, 3, 4, 5],
  'First Battle Round': [1],
  'First & Second Battle Round': [1, 2],
  'Second Battle Round Onwards': [2, 3, 4, 5],
  'Second & Third Battle Round': [2, 3],
  'Second to Fourth Battle Round': [2, 3, 4],
  'Fourth Battle Round Onwards': [4, 5],
  'Fifth Battle Round': [5],
  'End of Battle': [5],
}
export function blockRounds(headingEn) {
  return BLOCK_ROUNDS[headingEn] || [1, 2, 3, 4, 5]
}

// Blocks of a mission that can be scored in `round`, annotated for the scoring UI.
// Round-gating and the per-each flag are derived from the ENGLISH mission (heading/text);
// display heading/when/text come from the localized mission. Keeps picks keyed by bi:ri.
export function scorableBlocks(slug, role, round, locale = 'en') {
  const enM = missionBySlug(slug, role)
  if (!enM) return []
  const locM = missionBySlug(slug, role, locale)
  const out = []
  enM.blocks.forEach((b, bi) => {
    if (!blockRounds(b.heading).includes(round)) return
    const lb = (locM && locM.blocks[bi]) || b
    out.push({
      bi, kind: b.kind, heading: lb.heading, when: lb.when,
      rows: b.rows.map((er, ri) => ({
        ri, vp: er.vp, modifier: er.modifier,
        text: lb.rows && lb.rows[ri] ? lb.rows[ri].text : er.text,
        perEach: /^(For each|Each time)/i.test(er.text),
      })),
    })
  })
  return out
}

export function secondaryPool(role) {
  // 18 distinct secondary missions for the given role.
  return missions.en.secondary.filter(m => m.role === role)
}
export function numericVp(v) {
  // vp is a number, or a '+N' string for cumulative bonuses.
  if (typeof v === 'number') return v
  const n = parseInt(String(v).replace('+', ''), 10)
  return Number.isFinite(n) ? n : 0
}
export function fixedPool(role) {
  // Only missions that actually have a Fixed scoring option can be taken as Fixed
  // (A Grievous Blow, Assassination, Bring it Down, Engage on All Fronts).
  return secondaryPool(role).filter(m => m.blocks.some(b => b.kind === 'fixed'))
}

// Primary mission a player scores = the card for (their disposition vs opponent's).
export function primaryFor(myDisposition, opponentDisposition) {
  const oppName = dispositionName(opponentDisposition)
  return missions.en.primary.find(m => m.deck === myDisposition && m.opponent === oppName) || null
}

// The five "mirror" primary missions both players can share under the Mirrored World
// twist (each is a self-vs-self disposition matchup, tagged `mirror: true`).
export const MIRROR_MISSIONS = missions.en.primary.filter(m => m.mirror)

// Effective primary mission for a player, accounting for an active Twist:
//  • scrambled-communications — players exchange Primary Mission cards (take the opponent's).
//  • mirrored-world — both players use the same chosen mission (`settings.twistMission`).
// Falls back to the normal disposition-derived primary. Returns the mission object or null.
export function derivePrimary(myDisposition, opponentDisposition, settings = {}) {
  if (settings.twist === 'scrambled-communications') return primaryFor(opponentDisposition, myDisposition)
  if (settings.twist === 'mirrored-world' && settings.twistMission)
    return missions.en.primary.find(m => m.slug === settings.twistMission) || primaryFor(myDisposition, opponentDisposition)
  return primaryFor(myDisposition, opponentDisposition)
}

// "or"-linked rows in a block are mutually-exclusive BRACKETS (e.g. control 1 / 2 / 3+
// objectives) — only one may be scored. Given a row, returns the pick keys of its
// sibling rows that selecting it should clear. Per-tally rows ("For each…/Each time…")
// are independent alternatives (a model is one bracket or the other, but both tally
// over the game), so they're never excluded and never exclude others.
function isPerEachText(text) {
  return /^(For each|Each time)/i.test(text || '')
}
function orSiblingKeys(mission, blockIdx, rowIdx) {
  const block = mission && mission.blocks && mission.blocks[blockIdx]
  if (!block) return []
  const rows = block.rows
  const row = rows[rowIdx]
  if (!row || isPerEachText(row.text)) return []
  let start = rowIdx
  while (start > 0 && rows[start].modifier === 'or') start--
  let end = start
  while (end + 1 < rows.length && rows[end + 1].modifier === 'or') end++
  const keys = []
  for (let r = start; r <= end; r++) {
    if (r === rowIdx || isPerEachText(rows[r].text)) continue
    keys.push(`${blockIdx}:${r}`)
  }
  return keys
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

// Minimal shape guard: a corrupted or old-schema blob can JSON.parse fine yet be the wrong
// shape, then throw deep in a render (e.g. `current.players[i].primarySlug`) and wedge the
// tracker. Reject anything without the stable game shape (two players + a settings object).
export function isValidGame(g) {
  return (
    !!g && typeof g === 'object' &&
    Array.isArray(g.players) && g.players.length === 2 &&
    g.players.every((p) => p && typeof p === 'object') &&
    !!g.settings && typeof g.settings === 'object'
  )
}

const loadedCurrent = load(CUR_KEY, null)
const current = ref(isValidGame(loadedCurrent) ? loadedCurrent : null)
const history = ref((load(HIST_KEY, []) || []).filter(isValidGame))
// In-progress new-game setup, persisted so it survives reloads / navigating away.
const setupDraft = ref(load(DRAFT_KEY, null))

// Auto-save on every mutation — "saved automatically as you play". Debounced so a
// burst of changes (e.g. typing in a name field, stepping a score counter) doesn't
// deep-serialize the whole game tree on every keystroke; we flush before the page
// goes away so the last change is never lost.
const SAVE_DELAY = 500
let saveTimer = null
let pendingCurrent = false
let pendingHistory = false
let pendingSetupDraft = false

function flushSave() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null }
  // History BEFORE current: when archiving, current is cleared and the game moves to history.
  // Writing history first means a failure (quota/iOS) on the current write can't leave us with
  // a finished game dropped from both keys.
  if (pendingHistory) {
    pendingHistory = false
    try { localStorage.setItem(HIST_KEY, JSON.stringify(history.value)) } catch { /* ignore */ }
  }
  if (pendingCurrent) {
    pendingCurrent = false
    try {
      if (current.value) localStorage.setItem(CUR_KEY, JSON.stringify(current.value))
      else localStorage.removeItem(CUR_KEY)
    } catch { /* quota / private mode — ignore */ }
  }
  if (pendingSetupDraft) {
    pendingSetupDraft = false
    try {
      if (setupDraft.value) localStorage.setItem(DRAFT_KEY, JSON.stringify(setupDraft.value))
      else localStorage.removeItem(DRAFT_KEY)
    } catch { /* ignore */ }
  }
}

function scheduleSave() {
  if (!saveTimer) saveTimer = setTimeout(() => { saveTimer = null; flushSave() }, SAVE_DELAY)
}

// Force an immediate, synchronous persist. The 500ms debounce (+ flush on pagehide/hidden)
// is fine for frequent in-play edits, but for the infrequent, critical game transitions
// (archive/discard/resume-from-history) it's risky: an installed iOS PWA can be frozen and
// killed without reliably firing pagehide, dropping the pending write — so a finished game
// the user just "saved" reverts on relaunch. Write those through right away instead.
function saveNow() {
  pendingCurrent = true
  pendingHistory = true
  flushSave()
}

watch(current, () => { pendingCurrent = true; scheduleSave() }, { deep: true })
watch(history, () => { pendingHistory = true; scheduleSave() }, { deep: true })
watch(setupDraft, () => { pendingSetupDraft = true; scheduleSave() }, { deep: true })

// The debounce window could drop the final mutation if the tab closes / refreshes /
// is backgrounded (mobile/PWA) before the timer fires — flush synchronously on those.
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', flushSave)
  window.addEventListener('beforeunload', flushSave)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushSave()
  })
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makePlayer(p, opponent, settings, isYou = false) {
  const primary = derivePrimary(p.disposition, opponent.disposition, settings)
  const poolSlugs = secondaryPool(p.role).map(m => m.slug)
  const secondaryMode = p.secondaryMode || 'tactical'
  return {
    isYou: !!isYou,
    name: p.name || '',
    factionSlug: p.factionSlug || null,
    detachments: [...(p.detachments || [])],   // up to 3 DP worth; each grants a disposition
    disposition: p.disposition,                // the active disposition (drives the primary mission)
    role: p.role,
    secondaryMode,                             // tactical | fixed — chosen per player
    battleReady: !!p.battleReady,              // +10 VP if the army is battle-ready
    primarySlug: primary ? primary.slug : null,
    cp: 0,
    // Army-rule tracker state (Pain tokens, Battle Focus, etc.) — a free-form per-faction blob
    // interpreted by src/data/armyTrackers. Empty until a widget writes to it; absent on games
    // saved before this existed, so readers/mutations must default it (see setArmyCounter).
    army: {},
    rounds: Array.from({ length: ROUND_COUNT }, () => ({ primary: 0, picks: {} })),
    secondary: {
      // tactical: draw from a shuffled deck each round; fixed: the set chosen at setup is locked in.
      deck: secondaryMode === 'tactical' ? shuffle(poolSlugs) : [],
      hand: secondaryMode === 'fixed' ? [...(p.fixedSecondaries || [])] : [],
      // round each card became active (fixed cards are active from round 1).
      drawn: secondaryMode === 'fixed'
        ? Object.fromEntries((p.fixedSecondaries || []).map(s => [s, 1]))
        : {},
      discarded: [],            // [{ slug, round }] — set aside (kept their points, won't be redrawn)
      scored: [],               // [{ slug, round, picks: {'bi:ri': count}, vp }]
    },
  }
}

// ---- public API ----
export function useTracker() {

  function newGame(setup) {
    // setup = { settings, players: [p1=You, p2=Opponent] }
    // p = { name, factionSlug, detachments, disposition, role, secondaryMode }
    const [a, b] = setup.players
    const settings = { ...setup.settings }
    // Mirrored World with no agreed mission → roll a random one of the five and persist it
    // (so a reload doesn't re-roll, and both players resolve to the same mission).
    if (settings.twist === 'mirrored-world' && !settings.twistMission && MIRROR_MISSIONS.length) {
      settings.twistMission = MIRROR_MISSIONS[Math.floor(Math.random() * MIRROR_MISSIONS.length)].slug
    }
    // Reorder so the first-turn player is always at index 0; normalize firstTurn to 1 so
    // players[0] can be identified as first-turn player regardless of original selection.
    const youFirst = settings.firstTurn !== 2
    settings.firstTurn = 1
    current.value = {
      id: 'g' + Date.now(),
      createdAt: new Date().toISOString(),
      phase: 'playing',
      currentRound: 1,
      settings,
      players: youFirst
        ? [makePlayer(a, b, settings, true),  makePlayer(b, a, settings, false)]
        : [makePlayer(b, a, settings, false), makePlayer(a, b, settings, true)],
    }
  }

  // Fallback (no primary card): set the round primary directly, clamped to the round cap.
  function setRoundPrimary(pi, roundIdx, value) {
    current.value.players[pi].rounds[roundIdx].primary = Math.max(0, Math.min(value, PRIMARY_ROUND_CAP))
  }

  // Record how many times a primary scoring row was achieved this round; the round's
  // primary = min(sum of row contributions, 15). The game cap (45) is applied in primaryTotal.
  function setPrimaryRow(pi, roundIdx, blockIdx, rowIdx, count) {
    const pl = current.value.players[pi]
    const round = pl.rounds[roundIdx]
    if (!round.picks) round.picks = {}
    round.picks[`${blockIdx}:${rowIdx}`] = Math.max(0, count)
    const m = missionBySlug(pl.primarySlug)
    // Selecting one "or" bracket clears the competing brackets in the same group.
    if (count > 0) for (const k of orSiblingKeys(m, blockIdx, rowIdx)) delete round.picks[k]
    let raw = 0
    if (m) {
      for (const [key, c] of Object.entries(round.picks)) {
        const [bi, ri] = key.split(':').map(Number)
        const row = m.blocks[bi] && m.blocks[bi].rows[ri]
        if (row) raw += c * numericVp(row.vp)
      }
    }
    round.primary = Math.min(raw, PRIMARY_ROUND_CAP)
  }

  function primaryRowCount(pi, roundIdx, blockIdx, rowIdx) {
    const picks = current.value.players[pi].rounds[roundIdx].picks
    return picks ? (picks[`${blockIdx}:${rowIdx}`] || 0) : 0
  }

  function setCp(pi, value) {
    current.value.players[pi].cp = Math.max(0, value)
  }

  // Army-rule counter primitive (Pain tokens, Yield Points, …). `army` may be absent on games
  // saved before it existed, so initialize it lazily. Clamped ≥ 0; pools have no fixed max.
  function setArmyCounter(pi, value) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    pl.army.counter = Math.max(0, value)
  }

  // Army-rule selection primitive (Doctrina Imperative, etc.) — a per-round pick (the choice resets
  // each battle round, so it's keyed by round). Clicking the active option again clears it.
  function setArmySelection(pi, round, id) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (!pl.army.selectionByRound) pl.army.selectionByRound = {}
    if (pl.army.selectionByRound[round] === id) delete pl.army.selectionByRound[round]
    else pl.army.selectionByRound[round] = id
  }

  // Army-rule multi-selection primitive (World Eaters' Blessings of Khorne) — pick UP TO `max`
  // options per battle round (unlike setArmySelection's single per-round pick), reset each round.
  // Stored as a per-round array of ids. Tapping an active option removes it; a new pick is ignored
  // once the round is at its cap (the widget also disables the chips then).
  function toggleArmyMulti(pi, round, id, max) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (!pl.army.multiByRound) pl.army.multiByRound = {}
    const cur = pl.army.multiByRound[round] || []
    if (cur.includes(id)) {
      const next = cur.filter((x) => x !== id)
      if (next.length) pl.army.multiByRound[round] = next
      else delete pl.army.multiByRound[round]
    } else if (cur.length < max) {
      pl.army.multiByRound[round] = [...cur, id]
    }
  }

  // Army-rule battle-long selection (Templar Vows, Death Guard Plague) — a single pick made once for
  // the whole battle (unlike setArmySelection's per-round choice, so it's not keyed by round).
  // Clicking the active option again clears it.
  function setArmyChoice(pi, id) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (pl.army.choice === id) delete pl.army.choice
    else pl.army.choice = id
  }

  // Army-rule once-per-battle toggle (Waaagh!, etc.) — records the round(s) it was fired in. It's a
  // list because a few abilities can be fired more than once a battle (e.g. an Ork Warboss with the
  // Raucous Warcaller enhancement gets a second Waaagh!); the widget caps how many via the spec.
  function fireArmyToggle(pi, round) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (!pl.army.toggleRounds) pl.army.toggleRounds = []
    pl.army.toggleRounds.push(round)
  }
  // Undo the most recent fire (reset / correct a mis-tap).
  function undoArmyToggle(pi) {
    const pl = current.value.players[pi]
    if (!pl.army?.toggleRounds?.length) return
    pl.army.toggleRounds.pop()
    if (!pl.army.toggleRounds.length) delete pl.army.toggleRounds
  }

  // Army-rule dice-pool primitive (Miracle dice, …) — a bank of D6 values. Add records a rolled
  // value; remove spends one die by index. (A Miracle die's value can't change once rolled, so
  // there's no in-place edit — a wrong one is removed and re-added.)
  function addArmyDie(pi, value) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (!pl.army.dice) pl.army.dice = []
    pl.army.dice.push(value)
  }
  function removeArmyDie(pi, index) {
    const pl = current.value.players[pi]
    if (!pl.army?.dice) return
    pl.army.dice.splice(index, 1)
    if (!pl.army.dice.length) delete pl.army.dice
  }

  // Army-rule pool primitive (Battle Focus, …) — a per-round resource that REFILLS each battle round
  // (unspent tokens are lost at round's end), so the remaining count is stored per round, keyed like
  // selectionByRound. An untouched round has no entry; the widget defaults it to the battle-size
  // allotment (+ any detachment bonus) and this records the explicit remaining after a spend. ≥ 0.
  function setArmyPool(pi, round, value) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (!pl.army.poolByRound) pl.army.poolByRound = {}
    pl.army.poolByRound[round] = Math.max(0, value)
  }

  // Army-rule spend log (GSC's Resurgence-point resurrects) — records what a `spends` entry bought,
  // on top of the counter change itself, so the spend has a visible history instead of just a number
  // going down. The component computes the new counter value (current effective value − cost), same
  // convention as setArmyCounter, so this stays a generic "counter + its spend log" primitive.
  function resurrectArmyUnit(pi, newCounterValue, label, cost) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    pl.army.counter = Math.max(0, newCounterValue)
    if (!pl.army.resurrected) pl.army.resurrected = []
    pl.army.resurrected.push({ label, cost })
  }
  // Undo one spend-log entry (a mis-tap in the picker) — refunds its cost back onto the counter and
  // drops the entry.
  function undoArmyResurrect(pi, index) {
    const pl = current.value.players[pi]
    const entry = pl.army?.resurrected?.[index]
    if (!entry) return
    pl.army.resurrected.splice(index, 1)
    if (!pl.army.resurrected.length) delete pl.army.resurrected
    pl.army.counter = Math.max(0, (pl.army.counter ?? 0) + entry.cost)
  }

  // Army-rule one-time start-of-battle bonus (GSC's Deeds That Speak to the Masses enhancement) —
  // the tracker doesn't record enhancement picks, so this is a manual bump gated to round 1 (it's a
  // STARTING-pool bonus, meaningless once the battle is under way). `bonusApplied` guards against
  // double-tapping; the component computes the new counter value, same convention as setArmyCounter.
  function applyArmyBonus(pi, newCounterValue) {
    const pl = current.value.players[pi]
    if (!pl.army) pl.army = {}
    if (pl.army.bonusApplied) return
    pl.army.counter = Math.max(0, newCounterValue)
    pl.army.bonusApplied = true
  }
  // Undo the bonus (mis-tap) — the component passes the counter value with it subtracted back out.
  function undoArmyBonus(pi, newCounterValue) {
    const pl = current.value.players[pi]
    if (!pl.army?.bonusApplied) return
    pl.army.counter = Math.max(0, newCounterValue)
    delete pl.army.bonusApplied
  }

  function drawSecondary(pi) {
    const s = current.value.players[pi].secondary
    if (!s.deck.length) return
    const slug = s.deck.shift()
    s.hand.push(slug)
    if (!s.drawn) s.drawn = {}
    s.drawn[slug] = current.value.currentRound
  }

  // Pick a specific card from the deck instead of drawing at random.
  function drawSpecificSecondary(pi, slug) {
    const s = current.value.players[pi].secondary
    const i = s.deck.indexOf(slug)
    if (i < 0) return
    s.deck.splice(i, 1)
    s.hand.push(slug)
    if (!s.drawn) s.drawn = {}
    s.drawn[slug] = current.value.currentRound
  }

  // Return a card to the deck — a full undo: drop it from hand/discarded, wipe any VP
  // it scored, forget its drawn round, and make it available to draw/pick again.
  function returnSecondaryToDeck(pi, slug) {
    const s = current.value.players[pi].secondary
    s.hand = s.hand.filter(x => x !== slug)
    s.discarded = (s.discarded || []).filter(d => (d.slug ?? d) !== slug)
    s.scored = s.scored.filter(e => e.slug !== slug)
    if (s.drawn) delete s.drawn[slug]
    if (!s.deck.includes(slug)) s.deck.push(slug)
  }

  function discardFromHand(pi, slug) {
    // Set the card aside: it leaves the hand but KEEPS any points already scored,
    // and (being off the deck already) cannot be drawn again.
    const s = current.value.players[pi].secondary
    s.hand = s.hand.filter(x => x !== slug)
    // Dedup tolerant of legacy string-form entries (read paths use `d.slug ?? d`).
    if (!s.discarded.some(d => (d.slug ?? d) === slug)) {
      s.discarded.push({ slug, round: current.value.currentRound })
    }
  }

  // Undo an accidental set-aside: move the card from discarded[] back into the hand as an
  // active card. Unlike returnSecondaryToDeck, this KEEPS any scored VP and its drawn round —
  // the card resumes exactly as it was before being set aside.
  function restoreSecondaryToHand(pi, slug) {
    const s = current.value.players[pi].secondary
    s.discarded = (s.discarded || []).filter(d => (d.slug ?? d) !== slug)
    if (!s.hand.includes(slug)) s.hand.push(slug)
  }

  // Apply a tactical card's WHEN DRAWN action: drop the just-drawn card (it has scored
  // nothing) and draw a random replacement. mode 'shuffle' returns it to the deck (it can
  // come back), mode 'discard' removes it from play entirely. No-op if not in hand, or if
  // the deck is empty — no replacement exists, so 'shuffle' would just draw the same card
  // back and 'discard' would leave the hand a card short.
  function redrawSecondary(pi, slug, mode) {
    const s = current.value.players[pi].secondary
    if (!s.hand.includes(slug)) return
    if (!s.deck.length) return
    s.hand = s.hand.filter(x => x !== slug)
    s.scored = s.scored.filter(e => e.slug !== slug)
    s.discarded = (s.discarded || []).filter(d => (d.slug ?? d) !== slug)
    if (s.drawn) delete s.drawn[slug]
    if (mode === 'shuffle' && !s.deck.includes(slug)) s.deck.push(slug)
    drawSecondary(pi)
  }

  function entryVp(pi, entry) {
    const m = missionBySlug(entry.slug, current.value.players[pi].role)
    if (!m || !entry.picks) return entry.vp || 0
    let total = 0
    for (const [key, count] of Object.entries(entry.picks)) {
      const [bi, ri] = key.split(':').map(Number)
      const row = m.blocks[bi] && m.blocks[bi].rows[ri]
      if (row) total += count * numericVp(row.vp)
    }
    // Tactical secondaries score at most 5VP per scoring ("up to 5VP" on the cards).
    // Fixed secondaries are capped per-game (20) in secondaryTotal, not per scoring.
    if (current.value.players[pi].secondaryMode === 'tactical') {
      total = Math.min(total, TACTICAL_SECONDARY_CAP)
    }
    return total
  }

  // Record how many times a given scoring row was achieved this round.
  function scoreSecondaryRow(pi, slug, blockIdx, rowIdx, count) {
    const s = current.value.players[pi].secondary
    const round = current.value.currentRound
    let entry = s.scored.find(e => e.slug === slug && e.round === round)
    if (!entry) { entry = { slug, round, picks: {}, vp: 0 }; s.scored.push(entry) }
    if (!entry.picks) entry.picks = {}
    entry.picks[`${blockIdx}:${rowIdx}`] = Math.max(0, count)
    // Selecting one "or" bracket clears the competing brackets in the same group.
    if (count > 0) {
      const m = missionBySlug(slug, current.value.players[pi].role)
      for (const k of orSiblingKeys(m, blockIdx, rowIdx)) delete entry.picks[k]
    }
    entry.vp = entryVp(pi, entry)
  }

  function secondaryRowCount(pi, slug, blockIdx, rowIdx) {
    const round = current.value.currentRound
    const entry = current.value.players[pi].secondary.scored.find(e => e.slug === slug && e.round === round)
    return entry && entry.picks ? (entry.picks[`${blockIdx}:${rowIdx}`] || 0) : 0
  }

  // Total VP a card has scored this round (sum across its rows).
  function secondaryCardVp(pi, slug, round = current.value.currentRound) {
    const entry = current.value.players[pi].secondary.scored.find(e => e.slug === slug && e.round === round)
    return entry ? entry.vp || 0 : 0
  }

  function goToRound(n) {
    const target = Math.max(1, Math.min(ROUND_COUNT, n))
    const leaving = current.value.currentRound
    // Advancing: a tactical secondary that scored in an earlier round is set aside
    // automatically (keeps its VP, won't be redrawn) — the player draws a fresh one.
    // It is recorded against the round being LEFT (its last active round), so it shows
    // there but not in the new round.
    if (target > leaving) {
      for (const pl of current.value.players) {
        if (pl.secondaryMode !== 'tactical') continue
        const s = pl.secondary
        const scoredEarlier = new Set(
          s.scored.filter(e => (e.vp || 0) > 0 && e.round < target).map(e => e.slug)
        )
        for (const slug of [...s.hand]) {
          if (scoredEarlier.has(slug)) {
            s.hand = s.hand.filter(x => x !== slug)
            if (!s.discarded.some(d => (d.slug ?? d) === slug)) s.discarded.push({ slug, round: leaving })
          }
        }
      }
    }
    current.value.currentRound = target
  }

  // Finish = show the final summary; the game stays current so it can be resumed.
  // `reason` (optional) records how the game ended ('played'|'early'|'friendly-concede'|
  // 'opponent-concede'); 'early' games can be continued later from history.
  function finishGame(reason) {
    if (!current.value) return
    const g = current.value
    g.phase = 'finished'
    g.finishedAt = new Date().toISOString()
    g.endReason = reason || null
    g.result = { totals: g.players.map((_, i) => grandTotal(i)) }
  }

  function resumeGame() {
    if (current.value) current.value.phase = 'playing'
  }

  // Edit setup fields on a game already in progress — only the ones that don't feed
  // scoring (primarySlug, secondary deck/hand, rounds, cp are never touched here), so a
  // mid-game correction can't orphan anything already recorded.
  function updateSetup({ settings, players } = {}) {
    if (!current.value) return
    if (players) players.forEach((p, i) => {
      const pl = current.value.players[i]
      if (!p || !pl) return
      if (p.name !== undefined) pl.name = p.name
      if (p.battleReady !== undefined) pl.battleReady = !!p.battleReady
    })
    if (settings) {
      // players[0] is always the first-turn player (see newGame) and firstTurn itself
      // stays normalized to 1. settings.firstTurn here is the desired state (1=You,
      // 2=Opponent) — swap the two player objects in place if that differs from who's
      // currently first, so each player's already-recorded rounds/scores travel with them.
      if (settings.firstTurn !== undefined) {
        const wantsYouFirst = settings.firstTurn === 1
        if (wantsYouFirst !== current.value.players[0].isYou) current.value.players.reverse()
      }
      Object.assign(current.value.settings, settings, { firstTurn: 1 })
    }
  }

  // Pull a finished game back out of history into active play (used for games that ended
  // early). Strips the finished metadata; the caller guards against overwriting a live game.
  function resumeFromHistory(id) {
    const g = history.value.find(x => x.id === id)
    if (!g) return
    const resumed = JSON.parse(JSON.stringify(g))
    resumed.phase = 'playing'
    delete resumed.finishedAt
    delete resumed.result
    delete resumed.endReason
    current.value = resumed
    history.value = history.value.filter(x => x.id !== id)
    saveNow()
  }

  // Save the finished game to history and clear the current slot.
  function archiveGame() {
    if (!current.value) return
    history.value = [JSON.parse(JSON.stringify(current.value)), ...history.value]
    current.value = null
    saveNow() // persist synchronously — don't let an iOS PWA suspend drop the just-saved game
  }

  function discardGame() {
    current.value = null
    saveNow()
  }

  function deleteHistory(id) {
    history.value = history.value.filter(g => g.id !== id)
    // Synchronous write, like archiveGame/discardGame: the caller deletes the cloud copy
    // immediately, so losing the local delete to a frozen-PWA debounce window would
    // resurrect the game locally while its backup is already gone.
    saveNow()
  }

  // ---- scoring (thin wrappers over gameScoring.js bound to the active game) ----
  const primaryTotal = (pi) => primaryTotalOf(current.value, pi)
  const secondaryTotal = (pi) => secondaryTotalOf(current.value, pi)
  const grandTotal = (pi) => grandTotalOf(current.value, pi)
  const leader = () => leaderOf(current.value)

  function roundPrimaryMax(pi, roundIdx) {
    const pl = current.value.players[pi]
    const others = pl.rounds.reduce((s, r, i) => i === roundIdx ? s : s + (r.primary || 0), 0)
    return Math.max(0, Math.min(PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP - others))
  }

  return {
    current, history, setupDraft,
    newGame, updateSetup, setRoundPrimary, setCp, setArmyCounter, setArmySelection, toggleArmyMulti,
    setArmyChoice, fireArmyToggle, undoArmyToggle, addArmyDie, removeArmyDie, setArmyPool,
    resurrectArmyUnit, undoArmyResurrect, applyArmyBonus, undoArmyBonus,
    setPrimaryRow, primaryRowCount,
    drawSecondary, drawSpecificSecondary, returnSecondaryToDeck, discardFromHand,
    restoreSecondaryToHand, redrawSecondary,
    scoreSecondaryRow, secondaryRowCount, secondaryCardVp,
    goToRound, finishGame, resumeGame, resumeFromHistory, archiveGame, discardGame, deleteHistory,
    primaryTotal, roundPrimaryMax, secondaryTotal, grandTotal, leader,
  }
}
