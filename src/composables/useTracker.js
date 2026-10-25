import { ref, watch } from 'vue'
import { debouncedSave } from '../utils/debouncedSave.js'
import { CUR_KEY, gameInPlay, isValidGame } from './gameInPlay.js'
import { missions, primaryFor } from '../data/missions.js'
import { overlayMission } from '../data/missionOverlay.js'
import { isCpMissionSlug, cpMissionBySlug, cpMissionSlugFor } from '../data/combatPatrolMissions.js'
import { missionsRu } from '../data/missionsRu.js'
import { eventCompanion } from '../data/eventCompanion.js'
import {
  ROUND_COUNT,
  PRIMARY_GAME_CAP,
  TACTICAL_SECONDARY_CAP,
  primaryTotal as primaryTotalOf,
  secondaryTotal as secondaryTotalOf,
  grandTotal as grandTotalOf,
  leader as leaderOf,
  youIndex,
} from './gameScoring.js'
import { BATTLE_PHASES, usableThisTurn, usableInSlot } from './stratagemPhases.js'
import { HISTORY_KEY as HIST_KEY } from './gameStats.js'
import { conditions, groupLimitOf } from '../data/rosterModifiers/conditions.js'
import { membersOf, memberAt } from './rosterGameLink.js'
import { applySlice, LOCAL_SETTING_KEYS } from './gameSlices.js'
import { tracks } from '../data/trackerOptions.js'
import { ledger, addEntry, removeEntries, clockBefore, adjustTo, bonusIn } from './cpLedger.js'
import { clockOf, stampOf } from './rosterGameContext.js'
import { SM_FAMILY } from '../data/smChapters.js'
import { statusRecord, setupReserves } from './unitStatus.js'
import { TRACKER_GEN } from './trackerGen.js'
import { pushAct, pushValueAct, pushUndo, ledgerEvent, discardEvent, COALESCE_MS } from './actionLog.js'
import { isStrict, isLatest, canClockBack } from './strictRules.js'

// Game Tracker store — a module singleton persisted to localStorage, mirroring the
// pattern in useLocale.js / useLoreVisibility.js. Models a 2-player game of 40k 11th:
// setup → 5 battle rounds → finish, with primary/secondary/CP scoring. Inspired by the
// GDM tracker; scoring constants (15/round, 45 total primary; 45 total secondary;
// 20 per fixed secondary) match the official caps.

// Where the finished games live. The key is defined in gameStats.js — the read-only side, used by
// screens that show a record without this store; this module remains their only WRITER.
const DRAFT_KEY = 'wh11ed-tracker-setup-draft'

// Battle sizes (rule 25.03): each sets the Detachment-Points budget used in setup.
export const BATTLE_SIZES = [
  { id: 'incursion', name: 'Incursion', points: 1000, maxDp: 2 },
  { id: 'strikeForce', name: 'Strike Force', points: 2000, maxDp: 3 },
  { id: 'onslaught', name: 'Onslaught', points: 3000, maxDp: 3 },
]
// "At the start of your Command phase, draw two Secondary Missions" — and two fixed ones.
export const SECONDARIES_PER_TURN = 2
// A size of the players' own (owner, 2026-10-23: evening events at 750 points with one secondary):
// `battleSize: 'custom'` and `settings.custom = { points, dp, secondaries }`. The ranges the setup
// offers, and what a field left out reads as.
export const CUSTOM_BATTLE = 'custom'
export const CUSTOM_RANGES = {
  // Steps of 250 (owner, 2026-10-23): 750, 1000, 1250 — the sizes events are played at; a
  // number in between is still typed into the field.
  points: { min: 250, max: 5000, step: 250, default: 1000 },
  dp: { min: 1, max: 3 },
  secondaries: { min: 1, max: 3 },
}
const inRange = (v, { min, max }) => (Number.isInteger(v) && v >= min && v <= max ? v : null)

// The battle a game is played at — every reader of the size goes through this, never
// BATTLE_SIZES by id, so a custom size answers everywhere a printed one does.
// `base` is the printed size whose numbers a custom one borrows where it sets none of its own:
// the army-rule counters keyed by size (GSC's starting pool, the Aeldari per-round gain) — the
// smallest size the points fit in, as the roster's custom limit does (rosterEngine's
// effectiveBattle). `known` is false for a game saved with no size at all.
export function battleOf(settings) {
  const s = settings || {}
  if (s.battleSize === CUSTOM_BATTLE) {
    const c = s.custom || {}
    const points = inRange(c.points, CUSTOM_RANGES.points) ?? CUSTOM_RANGES.points.default
    const base = BATTLE_SIZES.find((b) => points <= b.points) || BATTLE_SIZES[BATTLE_SIZES.length - 1]
    return {
      id: CUSTOM_BATTLE, base: base.id, name: null, points, custom: true, known: true,
      maxDp: inRange(c.dp, CUSTOM_RANGES.dp) ?? base.maxDp,
      secondaries: inRange(c.secondaries, CUSTOM_RANGES.secondaries) ?? SECONDARIES_PER_TURN,
    }
  }
  const b = BATTLE_SIZES.find((x) => x.id === s.battleSize)
  return { ...(b || BATTLE_SIZES[1]), base: (b || BATTLE_SIZES[1]).id, custom: false, known: !!b, secondaries: SECONDARIES_PER_TURN }
}
// The size as a line names it: the printed name, or "Custom · 750" (`custom` is the locale's
// label). Empty for a game saved with no size.
export function battleName(settings, custom) {
  const b = battleOf(settings)
  if (b.custom) return `${custom} · ${b.points}`
  return b.known ? b.name : ''
}
// A label that counts cards: `<key>` carries {n}, `<key>One` is the one-card form (Russian
// declines the noun for one and not for two or three, so a lone {n} cannot serve all three).
export function byCount(labels, key, n) {
  return n === 1 && labels[`${key}One`] ? labels[`${key}One`] : labels[key].replace('{n}', n)
}
export const PRIMARY_ROUND_CAP = 15
// Game-level caps live in gameScoring.js (single source of truth); re-export for existing
// importers (RoundTracker, ScoreBreakdown).
export {
  ROUND_COUNT,
  PRIMARY_GAME_CAP,
  FIXED_SECONDARY_CAP,
  TACTICAL_SECONDARY_CAP,
  SECONDARY_GAME_CAP,
  BATTLE_READY_VP,
} from './gameScoring.js'

// ── Doubles (Warhammer Doubles Event Companion v1.1) ──────────────────────────────────────────
// settings.gameType: 'singles' (default, absent on every game saved before this) | 'doubles'.
// A game always has exactly TWO sides (players[]); in doubles each side is a team carrying
// `teamName` + `members: [M, M]`, where a member holds the army identity (name / factionSlug /
// detachments / rosterId+roster / army tracker state). Everything the scoring engine reads —
// cp, rounds, secondary, primarySlug, disposition, role, battleReady — stays on the side,
// because the official companion keys all of it to the team (shared CP pool, one disposition,
// one secondary deck, +10 Battle Ready per team).
//
// Consumers never branch on the game type: membersOf(side) is the one way to reach army
// identity, and in singles the side IS its only member. memberAt(side, null) returns the side
// itself — that is where a unified force's SHARED army-rule pool lives (the companion: "there
// will be one pain token pool, and the force gains tokens", so one tracker card, side-level
// state, exactly like singles). The two live in rosterGameLink.js (pure, light) so the roster
// views can reach them without this module's heavy mission data; re-exported here for everyone
// already importing the store (the mutators below use memberAt themselves).
export { membersOf, memberAt }

// Which side is this device's owner. `isYou` is absent on games saved before it existed, and the
// first player was always the owner then — which is why every read goes through here (the
// history's roster links once read the flag bare and called an old game's owner "Opponent").
// The longest name a player or a team may be given (owner, 2026-10-25). A name is the players' own
// text, drawn on a phone's score cards, in the steps' sentences, on the history and over a broadcast;
// unbounded, one long word pushed screens sideways, and the API refuses a game whose name passes 120
// (wh11ed-api domain/game.ts), so its cloud backup failed. Every place that draws one still copes
// with it whole: a game saved before the limit keeps its name.
export const PLAYER_NAME_MAX = 30
export function isYouSide(pl, i) { return pl?.isYou ?? i === 0 }
// "You" / "Opponent", and a side's name falling back to it — nine screens spelled these out.
export function sideLabel(pl, i, labels) { return isYouSide(pl, i) ? labels.trackerYou : labels.trackerOpponent }
export function sideName(pl, i, labels) { return pl?.name || sideLabel(pl, i, labels) }

// Unified Force = both armies share all faction keywords (same faction, or — the companion's
// explicit carve-out — any two ADEPTUS ASTARTES Chapters); anything else is a Force of
// Convenience. This is the setup wizard's DEFAULT; the player can override it there (allies
// on a list can flip the real answer, and the app doesn't read lists at that depth).
export function deriveForceType(slugA, slugB) {
  if (!slugA || !slugB) return null
  if (slugA === slugB) return 'unified'
  if (SM_FAMILY.has(slugA) && SM_FAMILY.has(slugB)) return 'unified'
  return 'convenience'
}

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
  return overlayMission(m, role ? missionsRu.secondary[`${m.slug}|${role}`] : missionsRu.primary[m.slug])
}

export function missionBySlug(slug, role, locale = 'en') {
  // A Combat Patrol box's own mission (`cp-<box id>`) — a primary, with its own RU overlay.
  if (!role && isCpMissionSlug(slug)) return cpMissionBySlug(slug, locale)
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

// Every block of a mission, annotated for the scoring UI; a block that cannot score in `round` is
// marked `offRound`. The scoring dialogs show the whole card and grey those (a player's report,
// 2026-10-20: in round 1 the "Second Battle Round Onwards" half of a primary was simply missing —
// shown, never hidden, like a locked row). Round-gating and the per-each flag are derived from the
// ENGLISH mission (heading/text); display heading/when/text come from the localized mission.
// Keeps picks keyed by bi:ri.
export function cardBlocks(slug, role, round, locale = 'en') {
  const enM = missionBySlug(slug, role)
  if (!enM) return []
  const locM = missionBySlug(slug, role, locale)
  const out = []
  enM.blocks.forEach((b, bi) => {
    // A Combat Patrol mission names its rounds (appdata's periods); a Chapter Approved card's
    // are read off its heading.
    const offRound = !(b.rounds || blockRounds(b.heading)).includes(round)
    const lb = (locM && locM.blocks[bi]) || b
    out.push({
      bi, kind: b.kind, heading: lb.heading, when: lb.when, offRound,
      rows: b.rows.map((er, ri) => ({
        ri, vp: er.vp, modifier: er.modifier,
        text: lb.rows && lb.rows[ri] ? lb.rows[ri].text : er.text,
        perEach: /^(For each|Each time)/i.test(er.text),
      })),
    })
  })
  return out
}

// The blocks of a mission that can be scored in `round` — what the end-of-turn check, the phase
// reminder and the draw preview ask: the moment, not the card.
export function scorableBlocks(slug, role, round, locale = 'en') {
  return cardBlocks(slug, role, round, locale).filter((b) => !b.offRound)
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

// Primary mission a player scores = the card for (their disposition vs opponent's) — the matrix
// itself lives with the missions (src/data/missions.js); re-exported for the tracker's callers.
export { primaryFor }

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

// The primary a player scores: in a Combat Patrol game, their box's own mission (each player
// plays their own — the box decides it, not the two dispositions); otherwise the card of the two
// dispositions, twist-aware (derivePrimary). `p` and `opponent` are players or setup drafts.
export function primaryOf(p, opponent, settings = {}) {
  if (settings.combatPatrol) {
    const slug = cpMissionSlugFor(p)
    return slug ? cpMissionBySlug(slug) : null
  }
  return derivePrimary(p.disposition, opponent.disposition, settings)
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

// The shape guard lives with the shell's own view of the game (gameInPlay.js) and is re-exported
// for the store's other readers.
export { isValidGame }

const loadedCurrent = load(CUR_KEY, null)
const current = ref(isValidGame(loadedCurrent) ? loadedCurrent : null)
const history = ref((load(HIST_KEY, []) || []).filter(isValidGame))
// In-progress new-game setup, persisted so it survives reloads / navigating away.
const setupDraft = ref(load(DRAFT_KEY, null))

// Auto-save on every mutation — "saved automatically as you play". Debounced so a
// burst of changes (e.g. typing in a name field, stepping a score counter) doesn't
// deep-serialize the whole game tree on every keystroke; we flush before the page
// goes away so the last change is never lost (debouncedSave).
let pendingCurrent = false
let pendingHistory = false
let pendingSetupDraft = false

function writePending() {
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

const { schedule: scheduleSave, now: flushSave } = debouncedSave(writePending)

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
// The shell's "a game is on" flag (gameInPlay.js) follows the store from the moment it loads.
watch(() => current.value?.phase, (phase) => { gameInPlay.value = phase === 'playing' }, { immediate: true })
watch(history, () => { pendingHistory = true; scheduleSave() }, { deep: true })
watch(setupDraft, () => { pendingSetupDraft = true; scheduleSave() }, { deep: true })


// How a secondary came into the hand — 'random' (off the deck) or 'chosen' (picked by hand); the
// card shows it (a die / a hand icon). Kept per slug in `secondary.source`; absent on older games, where a
// card simply shows no mark.
function markSource(s, slug, how) {
  if (!s.source) s.source = {}
  s.source[slug] = how
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// One member of a doubles team: the army-identity slice of a side, plus its own army-rule
// tracker blob (a force of convenience runs each army's rules separately). `ctx` (the roster
// condition switches) is created lazily by the mutators, same as on a side.
function makeMember(m = {}) {
  return {
    name: m.name || '',
    factionSlug: m.factionSlug || null,
    detachments: [...(m.detachments || [])],
    rosterId: m.rosterId || null,
    roster: m.roster || null,
    unitStatus: setupReserves(m.unitStatus),
    army: {},
  }
}

// A side's secondary missions as a game holds them: tactical draws from a shuffled deck each
// round; fixed keeps the cards chosen, active from round 1. Built at the start, and again while
// the battle has not begun — the secondaries are chosen before the battle (setSecondaries).
function secondaryState(role, mode, fixed = []) {
  return {
    deck: mode === 'tactical' ? shuffle(secondaryPool(role).map(m => m.slug)) : [],
    hand: mode === 'fixed' ? [...fixed] : [],
    // round each card became active (fixed cards are active from round 1).
    drawn: mode === 'fixed' ? Object.fromEntries(fixed.map(s => [s, 1])) : {},
    discarded: [],            // [{ slug, round }] — set aside (kept their points, won't be redrawn)
    scored: [],               // [{ slug, round, picks: {'bi:ri': count}, vp }]
  }
}

function makePlayer(p, opponent, settings, isYou = false) {
  const primary = primaryOf(p, opponent, settings)
  const secondaryMode = p.secondaryMode || 'tactical'
  const doubles = settings.gameType === 'doubles'
  const members = doubles ? [makeMember(p.members?.[0]), makeMember(p.members?.[1])] : null
  return {
    isYou: !!isYou,
    // In doubles the side's display name IS the team name — every existing reader of
    // `name` (ScoreBoard, history, the backend's metadata) keeps working unchanged.
    name: doubles ? (p.teamName || '') : (p.name || ''),
    // Army identity lives on the members in doubles; the side's own fields stay empty so
    // no consumer (stats aggregation above all) mistakes one member's faction for the side's.
    factionSlug: doubles ? null : (p.factionSlug || null),
    detachments: doubles ? [] : [...(p.detachments || [])], // up to 3 DP worth; each grants a disposition
    disposition: p.disposition,                // the active disposition (drives the primary mission)
    role: p.role,
    secondaryMode,                             // tactical | fixed — chosen per player
    battleReady: !!p.battleReady,              // +10 VP if the army is battle-ready
    // The army list this player fielded, attached in the setup wizard and OPTIONAL on both sides —
    // a game with no rosters is the normal case. `roster` is a self-contained snapshot (so a game
    // in history still renders the list that was played even after the saved roster is edited or
    // deleted) and `rosterId` is provenance only, and may dangle. Built/read by rosterGameLink.js;
    // stored in the roster's own compact form (ids + indices) to stay small in every save and sync.
    rosterId: doubles ? null : (p.rosterId || null),
    roster: doubles ? null : (p.roster || null),
    // Where each unit of that list is (unitStatus.js) — the setup's reserves to start with.
    unitStatus: doubles ? {} : setupReserves(p.unitStatus),
    ...(doubles
      ? {
          teamName: p.teamName || '',
          members,
          // Resolved at start (wizard default = deriveForceType, player may override there).
          forceType:
            p.forceType ||
            deriveForceType(members[0].factionSlug, members[1].factionSlug) ||
            'convenience',
        }
      : {}),
    primarySlug: primary ? primary.slug : null,
    cp: 0,
    cpBase: 0,
    cpLog: [],                                 // the CP ledger — cpLedger.js
    // Army-rule tracker state (Pain tokens, Battle Focus, etc.) — a free-form per-faction blob
    // interpreted by src/data/armyTrackers. Empty until a widget writes to it; absent on games
    // saved before this existed, so readers/mutations must default it (see setArmyCounter).
    // In doubles this side-level blob is the UNIFIED force's shared pool; a force of
    // convenience tracks per member (members[mi].army) instead.
    army: {},
    rounds: Array.from({ length: ROUND_COUNT }, () => ({ primary: 0, picks: {} })),
    secondary: secondaryState(p.role, secondaryMode, p.fixedSecondaries || []),
  }
}

// ── Settling the clock: what the start and end of a turn do by themselves ─────────────────
//
// Moving the clock (End turn, Undo turn, the phase clock, a round) changes the game in two
// places besides the clock: every Command phase gives both players their Core CP, and at the end
// of every turn an achieved tactical card leaves its hand ("Achieving Secondary Missions",
// Event Companion). Both touch BOTH sides — and in a shared game a phone writes only its own
// (useParty snaps the other side back). So these are not steps of endTurn: `settleSide(pi)`
// brings one side in line with wherever the clock stands, idempotently, and every phone runs it
// for the sides it plays whenever the clock moves — its own tap or another phone's (the watch
// right below). Undo turn is the same call: a turn the clock is back inside is
// not over, so what its end did comes back.
//   - Core CP (games started with the ledger, `cpAuto`): one 'core' entry per turn the clock has
//     reached, none for a turn it has not (cpLedger.js).
//   - A turn not over any more: cards set aside at its end (`discarded[].auto` = that turn) go
//     back in hand, and the CP an end-of-turn discard gained with them is taken back.
//   - The last turn that ended: tactical cards achieved by then leave the hand, recorded
//     against that turn, so the round still shows them and the next does not. A card set
//     aside by hand (no `auto`) is never touched.
function settleSide(pi) {
  const g = current.value
  if (!g || g.phase !== 'playing' || !gameBegun(g)) return
  const pl = g.players[pi]
  if (!pl) return
  const R = g.currentRound
  const T = g.currentTurn === 1 ? 1 : 0
  const clock = { round: R, turn: T }
  if (g.cpAuto) {
    ledger(pl)
    dropLedger(pl, e => e.kind === 'core' && clockBefore(R, T, e.round, e.turn), clock)
    for (let r = 1; r <= R; r++) {
      for (let t = 0; t <= 1; t++) {
        if (clockBefore(R, T, r, t)) continue
        if (!pl.cpLog.some(e => e.kind === 'core' && e.round === r && e.turn === t)) {
          addEntry(pl, { kind: 'core', amount: 1, round: r, turn: t })
        }
      }
    }
  }
  const s = pl.secondary
  if (!s) return
  const back = (s.discarded || []).filter(d => d.auto != null && !clockBefore(d.round, d.auto, R, T))
  if (back.length) {
    s.discarded = s.discarded.filter(d => !back.includes(d))
    for (const d of back) {
      pushUndo(pl, discardEvent(d), clock)
      if (!s.hand.includes(d.slug)) s.hand.push(d.slug)
      if (d.cp) removeEntries(pl, e => e.kind === 'bonus' && e.source === 'discard' && e.ref === d.slug && e.round === d.round)
    }
  }
  if (pl.secondaryMode !== 'tactical' || (R === 1 && T === 0)) return
  const last = T === 1 ? { round: R, turn: 0 } : { round: R - 1, turn: 1 }
  const achieved = new Set(s.scored.filter(e => (e.vp || 0) > 0 && e.round <= last.round).map(e => e.slug))
  for (const slug of [...s.hand]) {
    if (!achieved.has(slug) || s.discarded.some(d => (d.slug ?? d) === slug)) continue
    s.hand = s.hand.filter(x => x !== slug)
    s.discarded.push({ slug, round: last.round, auto: last.turn, t: Date.now() })
  }
}
// Ledger entries taken out of the game, each one told in the log as taken back (actionLog.js).
// The two a card already tells — its replacement's 1CP, its discard's bonus point — go silently:
// the card's own entry is what is struck.
function dropLedger(pl, pred, clock) {
  for (const e of (pl.cpLog || []).filter(pred)) {
    if ((e.kind === 'spend' && e.source === 'redraw') || (e.kind === 'bonus' && e.source === 'discard')) continue
    pushUndo(pl, ledgerEvent(e), clock)
  }
  return removeEntries(pl, pred)
}

// What a setup edit can change that the game log tells: the shared settings and the sides' names,
// lists and armies — not the settings that are each phone's own (gameSlices.js).
function setupSig(g) {
  const settings = Object.fromEntries(Object.entries(g.settings || {}).filter(([k]) => !LOCAL_SETTING_KEYS.includes(k)))
  const side = (p) => [p.name, p.battleReady, p.rosterId, p.factionSlug, p.detachments, p.teamName, (p.members || []).map((m) => [m.name, m.rosterId, m.factionSlug, m.detachments])]
  return JSON.stringify([settings, (g.players || []).map(side)])
}

// The latest act of `holder` matching `pred` that has not been taken back — what an "off" undoes.
function lastOpenAct(holder, pred) {
  const acts = holder?.acts || []
  const undone = acts.filter(a => a.type === 'undo').map(a => a.of)
  for (let i = acts.length - 1; i >= 0; i--) {
    const a = acts[i]
    if (a.type === 'undo' || !pred(a)) continue
    const k = undone.findIndex(o => o.type === a.type && o.t === a.t)
    if (k === -1) return a
    undone.splice(k, 1)
  }
  return null
}

// The first turn has started (see `begun` in newGame); every game saved before the flag has.
export function gameBegun(g) { return !!g && g.begun !== false }

function settleAll() {
  current.value?.players?.forEach((_, pi) => settleSide(pi))
}

// The clock moved — here, or on another phone (applyRemote writes the shared slice in place, so
// this fires for it too) — or a game was loaded or started: settle every side. The writes to a
// side this phone does not play are snapped back by the sync layer; that side's own phone makes
// them. Sync flush, so the settled state is what the next render and the next save see.
watch(
  () => {
    const g = current.value
    return g ? `${g.id}|${g.phase}|${gameBegun(g)}|${g.currentRound}|${g.currentTurn === 1 ? 1 : 0}` : ''
  },
  () => settleAll(),
  { flush: 'sync', immediate: true },
)

// ---- public API ----
export function useTracker() {

  // ── The lobby: a game that exists before it is played ──────────────────────────────────────
  //
  // A shared SETUP needs something to share, and the only thing multi-device sync knows how to
  // move is a game (gameSlices.js cuts one into five slices). So the wizard's draft becomes a
  // game in `phase: 'setup'` the moment the host shares it: the same objects the wizard is
  // already editing, handed to `current` rather than copied into it, so a slice arriving from
  // the guest's phone lands in the very fields the host is looking at. The heavy half of a game
  // (rounds, the secondary deck, the army-rule state) is NOT built here — it is derived from
  // settings that are still being chosen, so `newGame` builds it at the start, as it always did.
  //
  // The lobby's own bookkeeping (who edits a side, who confirmed, an open request to re-edit)
  // lives in `shared.lobby` and `players[i].lobby` — inside the slices, so it travels for free
  // and the server never has to know about any of it. `stripLobby` wipes it when the game
  // starts: none of it belongs in history, in the cloud backup or in a broadcast.
  function startLobby({ settings, players }) {
    // A new lobby starts with nobody filling anything in. The wizard hands its own player objects
    // over, and one that sat in an earlier lobby (sharing stopped, the setup kept) still carried
    // that lobby's editor — a member id the new party never had, so the host's own side read as held
    // by "another phone" under the host's own name (the owner's test, 2026-10-25).
    players.forEach((pl) => { delete pl.lobby })
    current.value = {
      id: 'g' + Date.now(),
      createdAt: new Date().toISOString(),
      phase: 'setup',
      settings,
      players,
      // The host opens the lobby from the wizard's first step (the opponent's card), so it is on
      // the armies already (see useLobby.js). The code screen before the wizard is gone since
      // 2026-10-25; a lobby saved at its old 'invite' stage reads as this one.
      lobby: { stage: 'armies' },
    }
    setupDraft.value = null
    saveNow()
    return current.value
  }

  // The lobby without its handle — what the host keeps when it cancels sharing and goes back to
  // setting the game up alone. The party itself is ended by useParty's farewell watcher.
  function closeLobby() {
    const g = current.value
    if (!g || g.phase !== 'setup') return
    delete g.party
    delete g.lobby
    g.players.forEach((pl) => { delete pl.lobby })
  }

  function stripLobby(g) {
    delete g.lobby
    g.players.forEach((pl) => { delete pl.lobby })
  }

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
    // Promoting a lobby: the game keeps its identity and its party handle, so every phone that
    // joined the lobby stays in the same party when the first round begins. `lobby` itself does
    // not survive the promotion (stripLobby below).
    const lobby = current.value?.phase === 'setup' ? current.value : null
    current.value = {
      id: lobby?.id || 'g' + Date.now(),
      createdAt: lobby?.createdAt || new Date().toISOString(),
      ...(lobby?.party ? { party: lobby.party } : {}),
      phase: 'playing',
      currentRound: 1,
      // The clock. `phase` above is the GAME's state (playing/finished), so the battle phase had
      // to be called something else. "Whose turn" needs no new concept: players[0] is always the
      // first-turn player (see the reorder above), so currentTurn is simply that player's index.
      // Both are written even when settings.trackPhases is off — the row is hidden, not the state,
      // so turning the setting on mid-game finds a sane clock rather than an empty one.
      currentTurn: 0,
      currentPhase: BATTLE_PHASES[0],
      // Not begun yet (2026-10-02, owner): Start on the setup lands on the game screen, and the
      // first turn starts with its own button there — so nothing of turn 1 (its Core CP, the
      // secondaries dialog) happens while the players are still deploying. A game saved without
      // the flag has begun.
      begun: false,
      // The Mission Sequence's order (owner, 2026-10-25): the first turn is rolled for AFTER
      // deployment (step 10), on the game screen before the battle (PreBattle.vue) — until then the
      // players stand in the setup's order, provisionally. The setup says so by leaving
      // `firstTurn` unset; a game set up with it (a resumed or an older one) needs no roll.
      ...(setup.settings?.firstTurn == null ? { firstTurnPending: true } : {}),
      // Command points are a ledger in this game (cpLedger.js): Core CP arrive by themselves at
      // every Command phase. A game started before the ledger has no flag and keeps its stepper.
      cpAuto: true,
      // Which tracker plays it (trackerGen.js): the site's cannot join or resume it.
      trackerGen: TRACKER_GEN,
      settings,
      players: youFirst
        ? [makePlayer(a, b, settings, true),  makePlayer(b, a, settings, false)]
        : [makePlayer(b, a, settings, false), makePlayer(a, b, settings, true)],
    }
    stripLobby(current.value)
    return { swapped: !youFirst && !!lobby }
  }

  // ── Before the battle (PreBattle.vue): the Mission Sequence's steps 6 and 10 ──────────────
  // The secondaries of a side, chosen while the battle has not begun: the deck is rebuilt for the
  // mode (and the fixed cards). What is chosen is chosen — no Done (owner, 2026-10-25); in a shared
  // game the other phone sees it once the battle begins (RoundTracker's secretOf).
  function setSecondaries(pi, mode, fixed = []) {
    const g = current.value
    const pl = g?.players?.[pi]
    if (!pl || g.phase !== 'playing' || gameBegun(g)) return
    pl.secondaryMode = mode === 'fixed' ? 'fixed' : 'tactical'
    pl.secondary = secondaryState(pl.role, pl.secondaryMode, mode === 'fixed' ? fixed : [])
  }
  // The roll for the first turn (step 10): the winner goes first, so it moves to index 0 — the
  // setup's order was provisional. Returns whether the sides were exchanged (a shared game's seats
  // then travel with them: useParty's reseat).
  function rollFirstTurn(pi) {
    const g = current.value
    if (!g || g.phase !== 'playing' || gameBegun(g) || !g.players?.[pi]) return false
    delete g.firstTurnPending
    if (pi === 0) return false
    g.players.reverse()
    return true
  }
  // Whether the battle may begin, and if not, the first thing it waits for — the turn bar's
  // Start says it in place of its word.
  function battleWaitsFor() {
    const g = current.value
    if (!g || gameBegun(g)) return null
    if (g.players.some((pl) => pl.secondaryMode === 'fixed' && !pl.secondary?.hand?.length)) return 'fixed'
    if (g.firstTurnPending) return 'firstTurn'
    return null
  }

  // Fallback (no primary card): set the round primary directly, clamped to the round cap.
  // Where the clock stands — every act the log records is placed by it.
  function clk() {
    const g = current.value
    return { round: g.currentRound, turn: g.currentTurn === 1 ? 1 : 0 }
  }

  // ── Strict rules (strictRules.js): why an act is refused in a game played by the book ──
  // null = allowed (always, in a game without the switch). The mutators below ask before acting
  // and the screen asks the same to grey its button with the reason (ui.js `trackerStrict_<why>`).
  //   'choose' · 'return' · 'pencil' — refused outright;
  //   'round' (arg: the round written into, arg2: the turn, when known) — a round already over,
  //     or a turn of the live round already played;
  //   'hand' (arg: the card) — a tactical card not in the hand;
  //   'undo' (arg: when the act taken back was made) — only the side's last act;
  //   'clock' — the clock back, one step and only right after it moved.
  function strictWhy(action, pi, arg, arg2 = null) {
    const g = current.value
    if (!isStrict(g)) return null
    switch (action) {
      case 'choose': return 'random'
      case 'return': return 'noReturn'
      case 'pencil': return 'noPencil'
      case 'round': return isCorrection(arg, arg2) ? (arg < g.currentRound ? 'pastRound' : 'pastTurn') : null
      case 'hand': {
        const pl = g.players[pi]
        return pl?.secondaryMode === 'tactical' && !pl.secondary?.hand?.includes(arg) ? 'notInHand' : null
      }
      case 'undo': return isLatest(g, pi, arg) ? null : 'lastOnly'
      case 'clock': return canClockBack(g) ? null : 'clockBack'
    }
    return null
  }
  // The undos by name, each with the stamp of what it would take back — one question for the
  // mutator and its button.
  function strictUndoWhy(kind, pi, a, b) {
    const g = current.value
    if (!isStrict(g)) return null
    const pl = g.players[pi]
    const act = (pred) => lastOpenAct(pl, pred)?.t
    switch (kind) {
      case 'strat': return strictWhy('undo', pi, lastStratUse(pi, a)?.t)
      case 'unplay': {
        const last = lastUnitPlay(pi, a, b)
        return last ? strictWhy('undo', pi, last.t) : null
      }
      case 'bonus': return strictWhy('undo', pi, bonusIn(pl, g.currentRound)?.t)
      case 'restore': return strictWhy('undo', pi, (pl.secondary?.discarded || []).find(d => (d.slug ?? d) === a)?.t)
      case 'revive': return strictWhy('undo', pi, act(x => x.type === 'unit' && x.uid === a && x.s === 'destroyed'))
      case 'armyFire': return strictWhy('undo', pi, act(x => x.type === 'armyFire' && (x.mi ?? null) === (a ?? null)))
      case 'armySpend': {
        const entry = memberAt(pl, b)?.army?.resurrected?.[a]
        return strictWhy('undo', pi, entry && act(x => x.type === 'armySpend' && x.item === entry.label && x.cost === entry.cost && (x.mi ?? null) === (b ?? null)))
      }
      case 'armyBonus': return strictWhy('undo', pi, act(x => x.type === 'armyBonus' && (x.mi ?? null) === (a ?? null)))
    }
    return null
  }

  // Scoring a turn already played — a past round, or the live round's first turn from inside its
  // second — is a correction, opened on purpose from the round steps (missionTiming.lockedTurn: a
  // moment that has passed is not ticked in a later turn). `turn` null: the live turn of `round`.
  function isCorrection(round, turn) {
    const g = current.value
    return round < g.currentRound || (round === g.currentRound && turn != null && turn !== (g.currentTurn === 1 ? 1 : 0))
  }
  // A correction says so in the log (owner, 2026-10-21): when it was made, which turn it put
  // right and the VP before and after. Steppers and ticks within COALESCE_MS are one act.
  function logFix(pl, what, slug, round, turn, from, to) {
    pushValueAct(pl, { ...clk(), type: 'fix', what, slug, at: round, atTurn: turn, from, to }, `${what}:${slug}:${round}:${turn}`)
  }

  // A score changed after it stood for a while is a correction: the old one stays in the log,
  // struck (owner, 2026-10-19). Within COALESCE_MS it is still being entered — a stepper tapped
  // three times is one score, not two corrections.
  function scoreCorrected(pl, before, after, of) {
    if (!(before.vp > 0) || before.vp === after || before.t == null || Date.now() - before.t < COALESCE_MS) return
    pushUndo(pl, { ...of, vp: before.vp, t: before.t }, clk())
  }

  function setRoundPrimary(pi, roundIdx, value, turn = null) {
    if (strictWhy('round', pi, roundIdx + 1, turn)) return
    const pl = current.value.players[pi]
    const round = pl.rounds[roundIdx]
    const before = { vp: round.primary, t: round.t }
    round.primary = Math.max(0, Math.min(value, PRIMARY_ROUND_CAP))
    if (isCorrection(roundIdx + 1, turn)) logFix(pl, 'primary', pl.primarySlug, roundIdx + 1, turn, before.vp, round.primary)
    else scoreCorrected(pl, before, round.primary, { type: 'primary', kind: 'points', round: roundIdx + 1, turn: pi, slug: pl.primarySlug })
    round.t = Date.now() // when, for the game log
  }

  // Record how many times a primary scoring row was achieved this round; the round's
  // primary = min(sum of row contributions, 15). The game cap (45) is applied in primaryTotal.
  // An End of Battle row is outside the 15 (Event Companion FAQ: "VP scored at the end of the
  // battle are not subject to the 15VP per battle round scoring limit") — twelve primaries score
  // one, and the fifth round's cap was eating it.
  // `turn` — the turn on screen when it is not the live one (a correction, logged as such).
  function setPrimaryRow(pi, roundIdx, blockIdx, rowIdx, count, turn = null) {
    if (strictWhy('round', pi, roundIdx + 1, turn)) return
    const pl = current.value.players[pi]
    const round = pl.rounds[roundIdx]
    const before = { vp: round.primary, t: round.t }
    if (!round.picks) round.picks = {}
    round.picks[`${blockIdx}:${rowIdx}`] = Math.max(0, count)
    const m = missionBySlug(pl.primarySlug)
    // Selecting one "or" bracket clears the competing brackets in the same group.
    if (count > 0) for (const k of orSiblingKeys(m, blockIdx, rowIdx)) delete round.picks[k]
    let raw = 0
    let end = 0
    if (m) {
      for (const [key, c] of Object.entries(round.picks)) {
        const [bi, ri] = key.split(':').map(Number)
        const row = m.blocks[bi] && m.blocks[bi].rows[ri]
        if (!row) continue
        if (m.blocks[bi].heading === 'End of Battle') end += c * numericVp(row.vp)
        else raw += c * numericVp(row.vp)
      }
    }
    round.primary = Math.min(raw, PRIMARY_ROUND_CAP) + end
    if (isCorrection(roundIdx + 1, turn)) logFix(pl, 'primary', pl.primarySlug, roundIdx + 1, turn, before.vp, round.primary)
    else scoreCorrected(pl, before, round.primary, { type: 'primary', kind: 'points', round: roundIdx + 1, turn: pi, slug: pl.primarySlug })
    round.t = Date.now() // when, for the game log
  }

  function primaryRowCount(pi, roundIdx, blockIdx, rowIdx) {
    const picks = current.value.players[pi].rounds[roundIdx].picks
    return picks ? (picks[`${blockIdx}:${rowIdx}`] || 0) : 0
  }

  // The stepper: a hand correction, kept in the ledger as an 'adjust' entry for what the ledger
  // does not explain (cpLedger.js).
  function setCp(pi, value) {
    const g = current.value
    if (strictWhy('pencil', pi)) return
    adjustTo(g.players[pi], value, g.currentRound, g.currentTurn === 1 ? 1 : 0)
  }

  // The balance's "−" where stratagems are not paid for here (`stratSpendCp` off): a point spent,
  // told as one in the log. Allowed by strict rules — with no stratagem to spend through, this is
  // the spend, not a correction (the "+" stays one, setCp).
  function spendCpByHand(pi) {
    const g = current.value
    if (!g || (g.players[pi].cp || 0) <= 0) return
    spendCp(pi, 1, 'manual')
  }

  // ── Bonus CP: at most one a battle round, besides Core CP (cpLedger.js) ──
  function canGainBonus(pi) {
    const g = current.value
    return !!g && g.phase === 'playing' && !bonusIn(g.players[pi], g.currentRound)
  }
  function gainBonusCp(pi, source = 'manual', ref = null) {
    const g = current.value
    if (!canGainBonus(pi)) return false
    addEntry(g.players[pi], {
      kind: 'bonus', amount: 1, round: g.currentRound, turn: g.currentTurn === 1 ? 1 : 0, source,
      ...(ref ? { ref } : {}),
    })
    return true
  }
  // Only a bonus the player added by hand is taken back by hand: the discard's is the card's,
  // and goes with Undo turn (settleSide).
  function canUndoBonus(pi) {
    const g = current.value
    return !!g && g.phase === 'playing' && bonusIn(g.players[pi], g.currentRound)?.source === 'manual'
  }
  function undoBonusCp(pi) {
    const g = current.value
    if (!canUndoBonus(pi) || strictUndoWhy('bonus', pi)) return
    dropLedger(g.players[pi], e => e.kind === 'bonus' && e.round === g.currentRound && e.source === 'manual', clk())
  }
  // Spend / refund: the stratagems' and the replacement's way through the ledger.
  function spendCp(pi, amount, source, ref, name) {
    const g = current.value
    return addEntry(g.players[pi], {
      kind: 'spend', amount: -Math.max(0, amount), round: g.currentRound, turn: g.currentTurn === 1 ? 1 : 0,
      source, ...(ref ? { ref } : {}), ...(name ? { name } : {}),
    })
  }

  // Army-rule counter primitive (Pain tokens, Yield Points, …). `army` may be absent on games
  // saved before it existed, so initialize it lazily. Clamped ≥ 0; pools have no fixed max.
  //
  // Every army/ctx mutator below takes a trailing optional `mi` (doubles member index):
  // memberAt resolves the holder — the side itself when mi is null (singles, or a unified
  // doubles force's shared pool), otherwise that member. Existing callers pass nothing.
  //
  // …and, after it, what the game log needs to tell the act (actionLog.js): the army rule's own
  // `label` ({ en, ru } off the spec — the store has no faction data), the counter's value `from`,
  // the option labels. The act goes on the SIDE (`acts`), tagged with `mi`, so it travels in the
  // side's slice. A caller passing nothing changes the state and leaves no line in the log.
  const armyAct = (pi, mi, act) => pushAct(current.value.players[pi], { ...clk(), ...act, ...(mi != null ? { mi } : {}) })
  const armyUndo = (pi, pred) => {
    const pl = current.value.players[pi]
    const a = lastOpenAct(pl, pred)
    if (a) pushUndo(pl, a, clk())
  }
  function setArmyCounter(pi, value, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    const from = pl.army.counter ?? log?.from ?? 0
    pl.army.counter = Math.max(0, value)
    if (log) pushValueAct(current.value.players[pi], { ...clk(), type: 'armyValue', label: log.label, from, to: pl.army.counter, ...(mi != null ? { mi } : {}) }, `counter${mi ?? ''}`)
  }

  // Army-rule selection primitive (Doctrina Imperative, etc.) — a per-round pick (the choice resets
  // each battle round, so it's keyed by round). Clicking the active option again clears it.
  function setArmySelection(pi, round, id, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    if (!pl.army.selectionByRound) pl.army.selectionByRound = {}
    const prev = pl.army.selectionByRound[round]
    if (prev === id) delete pl.army.selectionByRound[round]
    else pl.army.selectionByRound[round] = id
    if (log) logPick(pi, mi, prev, prev === id ? null : id, log)
  }

  // A pick changed: the one it replaced (or cleared) is taken back, the new one is an act.
  function logPick(pi, mi, prev, next, log) {
    const optLabel = (id) => log.options?.find((o) => o.id === id)?.label ?? id
    if (prev != null) armyUndo(pi, (a) => a.type === 'armyPick' && a.opt === prev && (a.mi ?? null) === (mi ?? null))
    if (next != null) armyAct(pi, mi, { type: 'armyPick', label: log.label, opt: next, optLabel: optLabel(next) })
  }

  // Army-rule multi-selection primitive (World Eaters' Blessings of Khorne) — pick UP TO `max`
  // options per battle round (unlike setArmySelection's single per-round pick), reset each round.
  // Stored as a per-round array of ids. Tapping an active option removes it; a new pick is ignored
  // once the round is at its cap (the widget also disables the chips then).
  function toggleArmyMulti(pi, round, id, max, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    if (!pl.army.multiByRound) pl.army.multiByRound = {}
    const cur = pl.army.multiByRound[round] || []
    if (cur.includes(id)) {
      const next = cur.filter((x) => x !== id)
      if (next.length) pl.army.multiByRound[round] = next
      else delete pl.army.multiByRound[round]
      if (log) logPick(pi, mi, id, null, log)
    } else if (cur.length < max) {
      pl.army.multiByRound[round] = [...cur, id]
      if (log) logPick(pi, mi, null, id, log)
    }
  }

  // Army-rule battle-long selection (Death Guard Plague) — a single pick made once for
  // the whole battle (unlike setArmySelection's per-round choice, so it's not keyed by round).
  // Clicking the active option again clears it.
  function setArmyChoice(pi, id, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    const prev = pl.army.choice
    if (prev === id) delete pl.army.choice
    else pl.army.choice = id
    if (log) logPick(pi, mi, prev, prev === id ? null : id, log)
  }

  // ── Rule-condition switches (roster-in-game) ──────────────────────────────────────────────
  // What the app cannot know and the player tells it: an army-wide rule state, or one unit's
  // state (charged, Battle-shocked, carrying an Order). Read by rosterGameContext.js, which
  // decides whether a conditional Tier C modifier may rewrite a printed number.
  //
  // The stored value is WHEN the switch was flipped — a clock stamp from rosterGameContext's
  // stampOf(), which is what lets a state that lasts a phase or a turn expire on its own instead
  // of quietly staying true for the rest of the game. Games saved before stamps existed hold a
  // bare round number here; that layer recognises them (a stamp is never below 100) and reads
  // them as rounds. Absent on games older still, so every write defaults it.
  // Alternatives are enforced HERE rather than in the view, so no caller can forget: a condition
  // with a `group` excludes its siblings once the group is full, because the rules say so in words
  // ("select one of the Orders below"; "any Order subsequently issued to that unit replaces the
  // current one"). A card showing a unit under two Orders at once is not a state the game has.
  //
  // Most groups hold ONE, and then this is the plain "turning one on turns the others off" it has
  // always been. A group whose rule allows several (Creations of Bile picks two augmentations)
  // carries its size in GROUP_LIMITS, and the OLDEST sibling makes way — evicting rather than
  // refusing keeps a full group changeable in one tap, the same way a single-slot group is.
  //
  // `limit` is the unit's own size for the group where a rule raises it — a Tempestus squad led by a
  // Command Rod may hold two Orders (rosterGameContext's groupLimitsFor, which the caller asks).
  function enforceGroupLimit(store, id, limit = null) {
    const group = conditions[id]?.group
    if (!group || !store) return
    limit = limit ?? groupLimitOf(group)
    // Insertion order is the tie-break: two switches flipped in the same phase share a stamp, and
    // the one flipped first is still the one that has been on longest.
    const siblings = Object.keys(store)
      .filter((other) => other !== id && conditions[other]?.group === group)
      .map((other, i) => ({ id: other, at: store[other], i }))
      .sort((a, b) => a.at - b.at || a.i - b.i)
    // `id` itself is about to occupy a slot, so the others may keep limit - 1 of them.
    for (const s of siblings.slice(0, Math.max(0, siblings.length - (limit - 1)))) delete store[s.id]
  }

  function setArmyCondition(pi, id, at, on, mi) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.ctx) pl.ctx = {}
    if (!pl.ctx.army) pl.ctx.army = {}
    const was = pl.ctx.army[id] != null
    if (on) {
      enforceGroupLimit(pl.ctx.army, id)
      pl.ctx.army[id] = at
    } else delete pl.ctx.army[id]
    // A state the army is in, switched on or off — an act either way, not a taking back.
    if (was !== !!on) armyAct(pi, mi, { type: 'armyCond', id, on: !!on })
  }

  // Keyed by the roster ENTRY's uid — the game carries its own snapshot of the list, so those
  // uids are stable for the life of the game whatever happens to the saved roster.
  // `name` — the unit's, for the game log (the store has no datasheets). A state switched on or off
  // is an act either way: Battle-shock ends, a unit stops having charged.
  function setUnitCondition(pi, uid, id, at, on, mi, limit = null, name = null) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.ctx) pl.ctx = {}
    if (!pl.ctx.units) pl.ctx.units = {}
    if (!pl.ctx.units[uid]) pl.ctx.units[uid] = {}
    if ((pl.ctx.units[uid][id] != null) !== !!on && name) {
      armyAct(pi, mi, { type: 'unitSwitch', sw: 'cond', uid, name, id, on: !!on })
    }
    if (on) {
      enforceGroupLimit(pl.ctx.units[uid], id, limit)
      pl.ctx.units[uid][id] = at
    } else delete pl.ctx.units[uid][id]
    if (!Object.keys(pl.ctx.units[uid]).length) delete pl.ctx.units[uid]
  }

  // A unit of the attached list goes on the battlefield, into reserves, or is destroyed
  // (unitStatus.js). Before the first turn begins the record says round 0 — the reserves are
  // chosen before the battle (20.01). `name` is the unit's, for the game log.
  function setUnitStatus(pi, uid, status, name, mi) {
    const g = current.value
    const pl = memberAt(g.players[pi], mi)
    if (!pl.unitStatus) pl.unitStatus = {}
    const clock = { round: g.begun === false ? 0 : g.currentRound, turn: g.currentTurn === 1 ? 1 : 0, name }
    // Strict: a destroyed unit comes back only as the side's last act taken back.
    if (pl.unitStatus[uid]?.s === 'destroyed' && status !== 'destroyed' && strictUndoWhy('revive', pi, uid)) return
    // Moved during the battle — the reserves chosen at setup are the setup, not an act.
    if (g.begun !== false && (pl.unitStatus[uid]?.s || 'table') !== status) {
      armyAct(pi, mi, { type: 'unit', uid, name, s: status })
    }
    const rec = statusRecord(pl.unitStatus[uid], status, clock)
    if (rec) pl.unitStatus[uid] = rec
    else delete pl.unitStatus[uid]
  }

  // A stratagem SPENT on one unit. Keyed by the roster entry's uid and then by the modifier
  // record's sid, storing the clock stamp it was spent at — the record's own `dur` decides when
  // that stops meaning anything (rosterGameContext's activeStratagems). Kept apart from `ctx.units`
  // because a stratagem is not a state of the unit: several can be up at once, they are alternatives
  // to nothing, and they are identified by the record they came from rather than by a condition id.
  // `log` ({ name, label } — the unit's name, the record's label) is passed by a hand mark only:
  // a stratagem PLAYED is told by its spend, and the marks a play or a cleared state switch on and
  // off by themselves are part of that act. On is an act; off takes it back (unitSwitchLog).
  function setUnitStratagem(pi, uid, sid, at, on, mi, log = null) {
    if (log) unitSwitchLog(pi, mi, 'strat', uid, sid, on, log)
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.ctx) pl.ctx = {}
    if (!pl.ctx.strats) pl.ctx.strats = {}
    if (!pl.ctx.strats[uid]) pl.ctx.strats[uid] = {}
    if (on) pl.ctx.strats[uid][sid] = at
    else delete pl.ctx.strats[uid][sid]
    if (!Object.keys(pl.ctx.strats[uid]).length) delete pl.ctx.strats[uid]
  }

  // A ONCE-PER-BATTLE rule used by one unit ("Once per battle, when this unit is selected to fight,
  // you can use this ability…"). Keyed like a spent stratagem — roster entry uid → the modifier
  // record's sid → the stamp it was used at — and, unlike one, kept after its window closes: the
  // stamp is also the answer to "has this been used?" (rosterGameContext's usesFor). Taking it back
  // deletes it, so a mis-tap leaves nothing behind in the game — the log keeps it, struck.
  // `shared` are the other entries of the attached unit (rosterGameContext's attachedUids): a use
  // ticked on the Captain's card is taken back from the Intercessors' card as well.
  function setUnitUse(pi, uid, sid, at, on, mi, shared = [], log = null) {
    if (log) unitSwitchLog(pi, mi, 'use', uid, sid, on, log)
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.ctx) pl.ctx = {}
    if (!pl.ctx.uses) pl.ctx.uses = {}
    if (on) {
      if (!pl.ctx.uses[uid]) pl.ctx.uses[uid] = {}
      pl.ctx.uses[uid][sid] = at
      return
    }
    for (const u of new Set([uid, ...shared])) {
      if (!pl.ctx.uses[u]) continue
      delete pl.ctx.uses[u][sid]
      if (!Object.keys(pl.ctx.uses[u]).length) delete pl.ctx.uses[u]
    }
  }

  // An ABILITY SET's choice — "select up to two of the abilities in the Relics of the Matriarchs
  // section; until the start of the next battle round this model has those abilities". Keyed like
  // a spent stratagem (roster entry uid → the option record's sid → the stamp it was picked at),
  // because it is a choice this model made rather than a state it is in, and because the set's
  // options are records, not vocabulary.
  //
  // `siblings` are the set's other option sids and `limit` how many it holds, both from the record
  // (`ref.set` / `ref.pickLimit`): the store enforces the cap without knowing what a set IS,
  // evicting the OLDEST pick the same way a condition group does.
  function setUnitPick(pi, uid, sid, at, on, { siblings = [], limit = 1 } = {}, mi, log = null) {
    if (log) unitSwitchLog(pi, mi, 'pick', uid, sid, on, log)
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.ctx) pl.ctx = {}
    if (!pl.ctx.picks) pl.ctx.picks = {}
    if (!pl.ctx.picks[uid]) pl.ctx.picks[uid] = {}
    const store = pl.ctx.picks[uid]
    if (on) {
      const held = siblings
        .filter((other) => other !== sid && store[other] != null)
        .map((other, i) => ({ sid: other, at: store[other], i }))
        .sort((a, b) => a.at - b.at || a.i - b.i)
      for (const h of held.slice(0, Math.max(0, held.length - (limit - 1)))) delete store[h.sid]
      store[sid] = at
    } else delete store[sid]
    if (!Object.keys(store).length) delete pl.ctx.picks[uid]
  }

  // An AURA the player says is reaching this unit — keyed by the roster entry's uid and then by
  // the modifier record's sid, exactly like a spent stratagem and for the same reason: it is not a
  // state of the unit but a relationship with another model, identified by the record it comes
  // from. Stored with the clock stamp it was marked at, and read back through the record's own
  // window (rosterGameContext's activeAuras — a battle round, since what changes it is movement).
  // The bearer's own unit and the unit it is attached to are never in here: Core Rules 22.01 makes
  // those certain, and the app answers them from the list.
  function setUnitAura(pi, uid, sid, at, on, mi, log = null) {
    if (log) unitSwitchLog(pi, mi, 'aura', uid, sid, on, log)
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.ctx) pl.ctx = {}
    if (!pl.ctx.auras) pl.ctx.auras = {}
    if (!pl.ctx.auras[uid]) pl.ctx.auras[uid] = {}
    if (on) pl.ctx.auras[uid][sid] = at
    else delete pl.ctx.auras[uid][sid]
    if (!Object.keys(pl.ctx.auras[uid]).length) delete pl.ctx.auras[uid]
  }

  // A rule switched on for a unit by hand — a stratagem marked, a once-per-battle rule used, an
  // ability set's option picked, an aura said to reach it — is an act; switched off, it is that
  // act taken back (a mis-tap, or a window the player closes early).
  function unitSwitchLog(pi, mi, sw, uid, id, on, log) {
    if (on) armyAct(pi, mi, { type: 'unitSwitch', sw, uid, name: log.name, id, label: log.label, on: true })
    else armyUndo(pi, (a) => a.type === 'unitSwitch' && a.sw === sw && a.uid === uid && a.id === id && a.on)
  }

  // Army-rule once-per-battle toggle (Waaagh!, etc.) — records the round(s) it was fired in. It's a
  // list because a few abilities can be fired more than once a battle (e.g. an Ork Warboss with the
  // Raucous Warcaller enhancement gets a second Waaagh!); the widget caps how many via the spec.
  function fireArmyToggle(pi, round, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    if (!pl.army.toggleRounds) pl.army.toggleRounds = []
    pl.army.toggleRounds.push(round)
    if (log) armyAct(pi, mi, { type: 'armyFire', label: log.label })
  }
  // Undo the most recent fire (reset / correct a mis-tap).
  function undoArmyToggle(pi, mi) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army?.toggleRounds?.length || strictUndoWhy('armyFire', pi, mi)) return
    pl.army.toggleRounds.pop()
    if (!pl.army.toggleRounds.length) delete pl.army.toggleRounds
    armyUndo(pi, (a) => a.type === 'armyFire' && (a.mi ?? null) === (mi ?? null))
  }

  // Army-rule dice-pool primitive (Miracle dice, …) — a bank of D6 values. Add records a rolled
  // value; remove spends one die by index. (A Miracle die's value can't change once rolled, so
  // there's no in-place edit — a wrong one is removed and re-added.)
  function addArmyDie(pi, value, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    if (!pl.army.dice) pl.army.dice = []
    pl.army.dice.push(value)
    if (log) armyAct(pi, mi, { type: 'armyDie', label: log.label, v: value })
  }
  function removeArmyDie(pi, index, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army?.dice) return
    const [v] = pl.army.dice.splice(index, 1)
    if (!pl.army.dice.length) delete pl.army.dice
    if (log) armyAct(pi, mi, { type: 'armyDieUse', label: log.label, v })
  }

  // Army-rule pool primitive (Battle Focus, …) — a per-round resource that REFILLS each battle round
  // (unspent tokens are lost at round's end), so the remaining count is stored per round, keyed like
  // selectionByRound. An untouched round has no entry; the widget defaults it to the battle-size
  // allotment (+ any detachment bonus) and this records the explicit remaining after a spend. ≥ 0.
  function setArmyPool(pi, round, value, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    if (!pl.army.poolByRound) pl.army.poolByRound = {}
    const from = pl.army.poolByRound[round] ?? log?.from ?? 0
    pl.army.poolByRound[round] = Math.max(0, value)
    if (log) pushValueAct(current.value.players[pi], { ...clk(), type: 'armyValue', label: log.label, from, to: pl.army.poolByRound[round], ...(mi != null ? { mi } : {}) }, `pool${mi ?? ''}`)
  }

  // Army-rule spend log (GSC's Resurgence-point resurrects) — records what a `spends` entry bought,
  // on top of the counter change itself, so the spend has a visible history instead of just a number
  // going down. The component computes the new counter value (current effective value − cost), same
  // convention as setArmyCounter, so this stays a generic "counter + its spend log" primitive.
  function resurrectArmyUnit(pi, newCounterValue, label, cost, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    pl.army.counter = Math.max(0, newCounterValue)
    if (!pl.army.resurrected) pl.army.resurrected = []
    pl.army.resurrected.push({ label, cost })
    if (log) armyAct(pi, mi, { type: 'armySpend', label: log.label, item: label, cost })
  }
  // Undo one spend-log entry (a mis-tap in the picker) — refunds its cost back onto the counter and
  // drops the entry.
  function undoArmyResurrect(pi, index, mi) {
    const pl = memberAt(current.value.players[pi], mi)
    const entry = pl.army?.resurrected?.[index]
    if (!entry || strictUndoWhy('armySpend', pi, index, mi)) return
    pl.army.resurrected.splice(index, 1)
    if (!pl.army.resurrected.length) delete pl.army.resurrected
    pl.army.counter = Math.max(0, (pl.army.counter ?? 0) + entry.cost)
    armyUndo(pi, (a) => a.type === 'armySpend' && a.item === entry.label && a.cost === entry.cost && (a.mi ?? null) === (mi ?? null))
  }

  // Army-rule one-time start-of-battle bonus (GSC's Deeds That Speak to the Masses enhancement) —
  // the tracker doesn't record enhancement picks, so this is a manual bump gated to round 1 (it's a
  // STARTING-pool bonus, meaningless once the battle is under way). `bonusApplied` guards against
  // double-tapping; the component computes the new counter value, same convention as setArmyCounter.
  function applyArmyBonus(pi, newCounterValue, mi, log) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army) pl.army = {}
    if (pl.army.bonusApplied) return
    pl.army.counter = Math.max(0, newCounterValue)
    pl.army.bonusApplied = true
    if (log) armyAct(pi, mi, { type: 'armyBonus', label: log.label })
  }
  // Undo the bonus (mis-tap) — the component passes the counter value with it subtracted back out.
  function undoArmyBonus(pi, newCounterValue, mi) {
    const pl = memberAt(current.value.players[pi], mi)
    if (!pl.army?.bonusApplied || strictUndoWhy('armyBonus', pi, mi)) return
    pl.army.counter = Math.max(0, newCounterValue)
    delete pl.army.bonusApplied
    armyUndo(pi, (a) => a.type === 'armyBonus' && (a.mi ?? null) === (mi ?? null))
  }

  // A card came into the hand: the round it did (`drawn`) and when (`drawnAt`, ms — the game log
  // orders one turn's acts by it).
  function markDrawn(s, slug) {
    ;(s.drawn ||= {})[slug] = current.value.currentRound
    ;(s.drawnAt ||= {})[slug] = Date.now()
  }

  function drawSecondary(pi) {
    const s = current.value.players[pi].secondary
    if (!s.deck.length) return
    const slug = s.deck.shift()
    s.hand.push(slug)
    markDrawn(s, slug)
    markSource(s, slug, 'random')
  }

  // Pick a specific card from the deck instead of drawing at random.
  function drawSpecificSecondary(pi, slug) {
    const s = current.value.players[pi].secondary
    const i = s.deck.indexOf(slug)
    if (i < 0) return
    s.deck.splice(i, 1)
    s.hand.push(slug)
    markDrawn(s, slug)
    markSource(s, slug, 'chosen')
  }

  // Return a card to the deck — a full undo: drop it from hand/discarded, wipe any VP
  // it scored, forget its drawn round, and make it available to draw/pick again.
  //
  // The undo leaves a trace (owner, 2026-10-10, from Misha's note: draw two, put them back, draw
  // again until the hand suits — and nobody would know). `returned` keeps the draw it undid and
  // when the card went back; the log tells both, so a put-back hand reads as one in the log.
  function returnSecondaryToDeck(pi, slug) {
    if (strictWhy('return', pi)) return
    const s = current.value.players[pi].secondary
    if (s.drawn?.[slug] != null) {
      ;(s.returned ||= []).push({
        slug, drawnRound: s.drawn[slug], drawnAt: s.drawnAt?.[slug] ?? null, source: s.source?.[slug] ?? null,
        round: current.value.currentRound, t: Date.now(),
      })
    }
    s.hand = s.hand.filter(x => x !== slug)
    dropCardTrail(pi, slug)
    const R = current.value.currentRound
    const thisTurns = s.drawn?.[slug] === R
    if (s.drawn) delete s.drawn[slug]
    if (s.drawnAt) delete s.drawnAt[slug]
    if (s.source) delete s.source[slug]
    if (!s.deck.includes(slug)) s.deck.push(slug)
    // The last of this turn's cards put back undoes the take itself: the turn may take again.
    // Otherwise the dialog said "taken" with nothing to show (2026-09-29).
    if (thisTurns && s.took?.[R] && !Object.values(s.drawn || {}).includes(R)) delete s.took[R]
  }

  // A card leaving the game's record — put back in the deck, or replaced by its own WHEN DRAWN rule:
  // what it scored and where it was set aside go too, and the log keeps them struck.
  function dropCardTrail(pi, slug) {
    const pl = current.value.players[pi]
    const s = pl.secondary
    const redrawn = new Set((pl.cpLog || []).filter(e => e.kind === 'spend' && e.source === 'redraw').map(e => e.ref))
    for (const e of s.scored.filter(e => e.slug === slug && e.vp > 0)) {
      pushUndo(pl, { type: 'scored', kind: 'points', round: e.round, turn: null, vp: e.vp, slug, t: e.t }, clk())
    }
    for (const d of (s.discarded || []).filter(d => (d.slug ?? d) === slug)) pushUndo(pl, discardEvent(d, redrawn), clk())
    s.discarded = (s.discarded || []).filter(d => (d.slug ?? d) !== slug)
    s.scored = s.scored.filter(e => e.slug !== slug)
  }

  function discardFromHand(pi, slug) {
    // Set the card aside: it leaves the hand but KEEPS any points already scored,
    // and (being off the deck already) cannot be drawn again.
    const s = current.value.players[pi].secondary
    s.hand = s.hand.filter(x => x !== slug)
    // Dedup tolerant of legacy string-form entries (read paths use `d.slug ?? d`).
    if (!s.discarded.some(d => (d.slug ?? d) === slug)) {
      s.discarded.push({ slug, round: current.value.currentRound, t: Date.now() })
    }
  }

  // Undo an accidental set-aside: move the card from discarded[] back into the hand as an
  // active card. Unlike returnSecondaryToDeck, this KEEPS any scored VP and its drawn round —
  // the card resumes exactly as it was before being set aside. A card discarded at the end of a
  // turn for 1CP gives that CP back with it, as Undo turn does (settleSide) — the hand cannot
  // keep both the card and the point it was traded for.
  function restoreSecondaryToHand(pi, slug) {
    if (strictUndoWhy('restore', pi, slug)) return
    const pl = current.value.players[pi]
    const s = pl.secondary
    for (const d of (s.discarded || []).filter(d => (d.slug ?? d) === slug)) {
      pushUndo(pl, discardEvent(d), clk())
      if (d.cp) removeEntries(pl, e => e.kind === 'bonus' && e.source === 'discard' && e.ref === d.slug && e.round === d.round)
    }
    s.discarded = (s.discarded || []).filter(d => (d.slug ?? d) !== slug)
    if (!s.hand.includes(slug)) s.hand.push(slug)
  }

  // Apply a tactical card's WHEN DRAWN action: drop the just-drawn card (it has scored
  // nothing) and draw a random replacement. mode 'shuffle' returns it to the deck (it can
  // come back), mode 'discard' removes it from play entirely. No-op if not in hand, or if
  // the deck is empty — no replacement exists, so 'shuffle' would just draw the same card
  // back and 'discard' would leave the hand a card short.
  // `pick` — the replacement chosen by hand (a card that came in chosen may be replaced the same
  // way, as in Mikhail's prototype); none draws at random.
  // The card leaves no trace in the hand, the deck or the discards, so the action is noted in
  // `whenDrawn` ([{ slug, round, mode }]) for the game log (owner, 2026-09-30).
  function redrawSecondary(pi, slug, mode, pick = null) {
    const s = current.value.players[pi].secondary
    if (!s.hand.includes(slug)) return
    if (!s.deck.length) return
    if (pick && (pick === slug || !s.deck.includes(pick) || strictWhy('choose', pi))) return
    s.hand = s.hand.filter(x => x !== slug)
    dropCardTrail(pi, slug)
    if (s.drawn) delete s.drawn[slug]
    if (s.drawnAt) delete s.drawnAt[slug]
    if (s.source) delete s.source[slug]
    if (mode === 'shuffle' && !s.deck.includes(slug)) s.deck.push(slug)
    ;(s.whenDrawn ||= []).push({ slug, round: current.value.currentRound, mode, t: Date.now() })
    replaceInto(pi, pick)
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
  // `round` defaults to the live one; a past round — or a past turn, `turn` — is scored when the
  // player corrects it after the fact (the round steps on the game screen), and logged as such. A tactical card still in hand that turns out
  // to have been achieved in a past round is achieved — it leaves the hand, as it would have at
  // the end of that turn (setAsideAchieved).
  function scoreSecondaryRow(pi, slug, blockIdx, rowIdx, count, round = current.value.currentRound, turn = null) {
    if (strictWhy('round', pi, round, turn) || strictWhy('hand', pi, slug)) return
    const s = current.value.players[pi].secondary
    let entry = s.scored.find(e => e.slug === slug && e.round === round)
    if (!entry) { entry = { slug, round, picks: {}, vp: 0 }; s.scored.push(entry) }
    const before = { vp: entry.vp, t: entry.t }
    if (!entry.picks) entry.picks = {}
    entry.picks[`${blockIdx}:${rowIdx}`] = Math.max(0, count)
    // Selecting one "or" bracket clears the competing brackets in the same group.
    if (count > 0) {
      const m = missionBySlug(slug, current.value.players[pi].role)
      for (const k of orSiblingKeys(m, blockIdx, rowIdx)) delete entry.picks[k]
    }
    entry.vp = entryVp(pi, entry)
    if (isCorrection(round, turn)) logFix(current.value.players[pi], 'scored', slug, round, turn, before.vp || 0, entry.vp)
    else scoreCorrected(current.value.players[pi], before, entry.vp, { type: 'scored', kind: 'points', round, turn: null, slug })
    entry.t = Date.now() // the latest change, for the game log
    if (isCorrection(round, turn) && entry.vp > 0) settleSide(pi)
  }

  function secondaryRowCount(pi, slug, blockIdx, rowIdx, round = current.value.currentRound) {
    const entry = current.value.players[pi].secondary.scored.find(e => e.slug === slug && e.round === round)
    return entry && entry.picks ? (entry.picks[`${blockIdx}:${rowIdx}`] || 0) : 0
  }

  // Total VP a card has scored this round (sum across its rows).
  function secondaryCardVp(pi, slug, round = current.value.currentRound) {
    const entry = current.value.players[pi].secondary.scored.find(e => e.slug === slug && e.round === round)
    return entry ? entry.vp || 0 : 0
  }

  // ── Taking the turn's secondaries (tactical) ──────────────────────────────────────────────
  // "At the start of your Command phase, draw two Secondary Missions" — once per own turn, so
  // once per round per side. `secondary.took[round]` records that it was done and how: 'random'
  // (two off the shuffled deck) or 'chosen' (two picked by hand). One way for both cards, as in
  // Mikhail's prototype. After that the hand changes only through a card's own rule (WHEN
  // DRAWN), the once-per-battle 1CP replacement or the end-of-turn discard. A random draw is
  // written at once, so reopening the dialog cannot re-roll it.
  // Two in a printed size; a custom one sets its own (battleOf).
  const takeCount = () => battleOf(current.value?.settings).secondaries
  function tookSecondaries(pi, round = current.value.currentRound) {
    const s = current.value.players[pi]?.secondary
    if (!s) return null
    const drawn = s.drawn || {}
    // A take whose cards were all put back since is no take (a game from before
    // returnSecondaryToDeck undid it — see there).
    if (s.took?.[round]) return Object.values(drawn).includes(round) ? s.took[round] : null
    // A game from before `took` existed: two cards that came in this round are the same fact.
    return Object.values(drawn).filter(r => r === round).length >= takeCount() ? 'legacy' : null
  }
  function canTakeSecondaries(pi) {
    const g = current.value
    const pl = g?.players?.[pi]
    return !!pl && g.phase === 'playing' && gameBegun(g) && pl.secondaryMode === 'tactical'
      && (g.currentTurn === 1 ? 1 : 0) === pi && !tookSecondaries(pi) && pl.secondary.deck.length > 0
  }
  function markTook(pi, how) {
    const s = current.value.players[pi].secondary
    if (!s.took) s.took = {}
    s.took[current.value.currentRound] = how
  }
  function takeRandomSecondaries(pi) {
    if (!canTakeSecondaries(pi)) return
    for (let k = takeCount(); k > 0; k--) drawSecondary(pi)
    markTook(pi, 'random')
  }
  function takeChosenSecondaries(pi, slugs) {
    if (!canTakeSecondaries(pi) || strictWhy('choose', pi)) return
    const deck = current.value.players[pi].secondary.deck
    const pick = [...new Set(slugs)].filter(x => deck.includes(x))
    if (pick.length !== Math.min(takeCount(), deck.length)) return
    for (const slug of pick) drawSpecificSecondary(pi, slug)
    markTook(pi, 'chosen')
  }
  // Take the turn's cards back (a mis-tap): only while none has scored or been replaced.
  function canUntakeSecondaries(pi) {
    const g = current.value
    const s = g?.players?.[pi]?.secondary
    const how = s?.took?.[g.currentRound]
    if (!how) return false
    const mine = Object.entries(s.drawn || {}).filter(([, r]) => r === g.currentRound).map(([slug]) => slug)
    return mine.length > 0 && mine.every(slug => s.hand.includes(slug) && !s.scored.some(e => e.slug === slug && (e.vp || 0) > 0))
  }
  function untakeSecondaries(pi) {
    if (!canUntakeSecondaries(pi) || strictWhy('return', pi)) return
    const g = current.value
    const s = g.players[pi].secondary
    for (const [slug, r] of Object.entries(s.drawn || {})) if (r === g.currentRound) returnSecondaryToDeck(pi, slug)
    delete s.took[g.currentRound]
    // A card shuffled back when drawn is in the deck again, as if the take never was; one
    // discarded when drawn stays out of the game, and so stays in the log.
    if (s.whenDrawn) s.whenDrawn = s.whenDrawn.filter((e) => e.round !== g.currentRound || e.mode === 'discard')
  }

  // Draw the replacement for a card that just left: the picked one, or one at random that is not
  // the card itself (a shuffled-back card sits in the deck again, and an immediate replacement
  // must not be the same card).
  function replaceInto(pi, pick) {
    if (pick) return drawSpecificSecondary(pi, pick)
    drawSecondary(pi)
  }

  // ── Stratagems: spending CP on one (the CP tab) ──
  // A use is a 'spend' entry in the ledger, source 'strat', ref = the stratagem's `_key`
  // (gameStratagems.js), with the clock it was used at — the phase too when the game keeps one.
  // Either side may spend at any moment: half the core stratagems are played in the OTHER
  // player's turn (Fire Overwatch, Rapid Ingress, Smokescreen, Heroic Intervention). What is
  // refused, and why (the reason is a ui.js key suffix):
  //   'finished' — the game is over;  'cp' — not enough CP for the cost asked;
  //   'ownTurnOnly' / 'oppTurnOnly' — the stratagem is played only in its side's own / the other's turn;
  //   'minRound' / 'perBattle' / 'perRound' / 'perTurn' — the stratagem's own restrictions
  //   (`_limits`); 'perPhase' — the Core Rules' "the same Stratagem cannot be used more than once
  //   in the same phase", checked only when the game keeps phases (it has no phase otherwise).
  function stratUses(pi, key) {
    return (current.value?.players?.[pi]?.cpLog || []).filter(e => e.kind === 'spend' && e.source === 'strat' && e.ref === key)
  }
  function stratBlock(pi, strat, cost) {
    const g = current.value
    if (!g || g.phase !== 'playing') return 'finished'
    const R = g.currentRound
    const T = g.currentTurn === 1 ? 1 : 0
    // Whose turn it is decides half of it (owner, 2026-09-29): Fire Overwatch is the other side's
    // move, a Command-phase stratagem never is.
    const mine = T === pi
    if (!usableThisTurn(strat._phases, strat._sides, mine)) return mine ? 'oppTurnOnly' : 'ownTurnOnly'
    const lim = strat._limits || {}
    const uses = stratUses(pi, strat._key)
    if (lim.minRound && R < lim.minRound) return 'minRound'
    if (lim.perBattle && uses.length) return 'perBattle'
    if (lim.perRound && uses.some(e => e.round === R)) return 'perRound'
    if (lim.perTurn && uses.some(e => e.round === R && e.turn === T)) return 'perTurn'
    if (tracks(g.settings, 'trackPhases') && uses.some(e => e.round === R && e.turn === T && e.phase === (g.currentPhase || 'command'))) return 'perPhase'
    // A game not keeping phases cannot say which phase a use was in, but it knows the most a turn
    // allows: once per phase (15.01), in the phases of this turn the stratagem's WHEN names — Fire
    // Overwatch once (the opponent's Movement phase), Command Re-roll five times. Exact, so it
    // holds without a "strict rules" switch (owner, 2026-10-19, after Mikhail's "a hundred times").
    if (!tracks(g.settings, 'trackPhases')) {
      const slots = BATTLE_PHASES.filter(p => usableInSlot(strat._phases, strat._sides, p, mine)).length
      if (uses.filter(e => e.round === R && e.turn === T).length >= slots) return 'turnFull'
    }
    if ((g.players[pi].cp || 0) < cost) return 'cp'
    return null
  }
  function useStratagem(pi, strat, cost) {
    const g = current.value
    if (stratBlock(pi, strat, cost)) return null
    const entry = spendCp(pi, cost, 'strat', strat._key, strat.name)
    if (tracks(g.settings, 'trackPhases')) entry.phase = g.currentPhase || 'command'
    return entry
  }
  // Take back the latest use of a stratagem made this battle round — a mis-tap, or a use the
  // players agreed to rewind.
  function lastStratUse(pi, key) {
    const R = current.value?.currentRound
    return stratUses(pi, key).filter(e => e.round === R).at(-1) || null
  }
  function undoStratagem(pi, key) {
    const last = lastStratUse(pi, key)
    if (!last || strictUndoWhy('strat', pi, key)) return
    dropLedger(current.value.players[pi], e => e === last, clk())
    unsetTarget(pi, last)
  }

  // ── A stratagem PLAYED on a unit (stratagemPlay.js) ──
  // One act: the CP spent (useStratagem, at the cost asked for THIS use), the unit it was played on
  // written onto that ledger entry — `target: { uid, mi?, name, sid?, opp? }` — and, when the unit's
  // card has a record for the stratagem (`sid`), that record switched on at the same moment. Taking
  // either back takes both: undoStratagem above, unplayOnUnit below. A target of the other side
  // (`opp`) is named only: the effect records are the player's own army's.
  function playStratagem(pi, strat, cost, target = null) {
    const entry = useStratagem(pi, strat, cost)
    if (!entry || !target) return entry
    entry.target = {
      uid: target.uid, name: target.name,
      ...(target.mi != null ? { mi: target.mi } : {}),
      ...(target.sid ? { sid: target.sid } : {}),
      ...(target.opp ? { opp: true } : {}),
    }
    if (target.sid && !target.opp) {
      setUnitStratagem(pi, target.uid, target.sid, stampOf(clockOf(current.value, pi)), true, target.mi ?? null)
    }
    return entry
  }
  function unsetTarget(pi, entry) {
    const t = entry?.target
    if (t?.sid && !t.opp) setUnitStratagem(pi, t.uid, t.sid, 0, false, t.mi ?? null)
  }
  // The card's box unticked: the latest play of that stratagem on that unit this battle round goes,
  // its CP with it; a mark with no play behind it (set before plays were linked, or in a game not
  // counting CP) just comes off.
  function lastUnitPlay(pi, uid, sid) {
    const R = current.value?.currentRound
    return (current.value.players[pi].cpLog || []).filter(e => e.kind === 'spend' && e.round === R && e.target?.uid === uid && e.target?.sid === sid).at(-1)
  }
  function unplayOnUnit(pi, uid, sid, mi = null) {
    const pl = current.value.players[pi]
    const last = lastUnitPlay(pi, uid, sid)
    if (strictUndoWhy('unplay', pi, uid, sid)) return
    if (last) dropLedger(pl, e => e === last, clk())
    setUnitStratagem(pi, uid, sid, 0, false, mi)
  }

  // ── The once-per-battle 1CP replacement (Event Companion, Tactical Missions) ──
  // "Once per battle, at the end of your Command phase, you can spend 1CP to discard one of your
  // active Secondary Mission cards and draw one new card." The side on turn, the live round, the
  // CP in the bank. The card is discarded for good (it keeps any VP); the CP goes in the ledger.
  function canCpRedraw(pi) {
    const g = current.value
    const pl = g?.players?.[pi]
    return !!pl && g.phase === 'playing' && pl.secondaryMode === 'tactical'
      && (g.currentTurn === 1 ? 1 : 0) === pi && !pl.secondary.cpRedrawUsed
      && (pl.cp || 0) >= 1 && pl.secondary.deck.length > 0
  }
  function cpRedraw(pi, slug, pick = null) {
    const g = current.value
    const s = g.players[pi].secondary
    if (!canCpRedraw(pi) || !s.hand.includes(slug)) return
    if (pick && (!s.deck.includes(pick) || strictWhy('choose', pi))) return
    s.hand = s.hand.filter(x => x !== slug)
    s.discarded.push({ slug, round: g.currentRound, t: Date.now() })
    s.cpRedrawUsed = true
    spendCp(pi, 1, 'redraw', slug)
    replaceInto(pi, pick)
  }

  // ── The end-of-turn discard: "if it is your turn … you can discard one or more active
  // Secondary Mission cards. If you do, you gain 1CP" — the round's bonus point, if it is still
  // free. It happens at the END of the turn, so it ends the turn (the game screen first shows the
  // turn-end check, missionTiming.turnEndChecks, as for End turn). The card remembers the turn and
  // that it gained CP (`auto`, `cp`), so Undo turn gives both back (settleSide).
  function canEndTurnDiscard(pi) {
    const g = current.value
    const pl = g?.players?.[pi]
    return !!pl && g.phase === 'playing' && pl.secondaryMode === 'tactical'
      && (g.currentTurn === 1 ? 1 : 0) === pi
  }
  // The card leaves for the round's bonus CP (while it is free). A card that scored this turn is
  // achieved, not active: it leaves for its VP, not for CP. Returns whether it went.
  function discardAtTurnEnd(pi, slug) {
    const g = current.value
    const s = g.players[pi].secondary
    if (!canEndTurnDiscard(pi) || !s.hand.includes(slug) || secondaryCardVp(pi, slug) > 0) return false
    const gained = gainBonusCp(pi, 'discard', slug)
    s.hand = s.hand.filter(x => x !== slug)
    s.discarded.push({ slug, round: g.currentRound, auto: g.currentTurn === 1 ? 1 : 0, ...(gained ? { cp: true } : {}), t: Date.now() })
    return true
  }
  function endTurnDiscard(pi, slug) {
    if (!discardAtTurnEnd(pi, slug)) return
    // The last turn of the battle has no next turn: the game screen goes on to finishing it.
    if (canEndTurn()) endTurn()
  }
  // Marked to go at the end of the turn, without ending it now (owner, 2026-10-20): the card stays
  // in hand, says so, and leaves when the turn is ended (`endTurn`). Kept on the side's own slice,
  // so a shared game shows the mark on every phone. Tapping again takes the mark off.
  function isMarkedForTurnEnd(pi, slug) {
    return !!current.value?.players?.[pi]?.secondary?.eotMarked?.includes(slug)
  }
  function canMarkForTurnEnd(pi, slug) {
    return canEndTurnDiscard(pi) && !!current.value.players[pi].secondary.hand.includes(slug) && secondaryCardVp(pi, slug) === 0
  }
  function markForTurnEnd(pi, slug) {
    const s = current.value?.players?.[pi]?.secondary
    if (!s) return
    if (isMarkedForTurnEnd(pi, slug)) {
      const left = s.eotMarked.filter(x => x !== slug)
      if (left.length) s.eotMarked = left
      else delete s.eotMarked
    } else if (canMarkForTurnEnd(pi, slug)) {
      s.eotMarked = [...(s.eotMarked || []), slug]
    }
  }
  // The side on turn's marked cards leave as its turn ends; a card that scored since stays (and is
  // set aside as achieved), and the marks go either way.
  function discardMarked() {
    const g = current.value
    const pi = g.currentTurn === 1 ? 1 : 0
    const s = g.players[pi]?.secondary
    if (!s?.eotMarked) return
    for (const slug of s.eotMarked) discardAtTurnEnd(pi, slug)
    delete s.eotMarked
  }

  function goToRound(n) {
    const target = Math.max(1, Math.min(ROUND_COUNT, n))
    // Advancing: a tactical secondary that scored in an earlier round is set aside
    // automatically (keeps its VP, won't be redrawn) — the player draws a fresh one.
    // It is recorded against the round being LEFT (its last active round), so it shows
    // there but not in the new round.
    current.value.currentRound = target
    // A new round starts at the first-turn player's Command phase. A phase left over from the
    // round you just left would read as "now", and it isn't. stepPhase() writes the clock AFTER
    // calling this, which is how stepping backwards across the boundary lands on Fight instead.
    current.value.currentTurn = 0
    current.value.currentPhase = BATTLE_PHASES[0]
  }

  // ── The clock: battle round → whose turn → phase ───────────────────────────────────────────
  // A game created before this existed has neither field; both read as the first-turn player's
  // Command phase until something moves them, so no migration is needed.
  function phaseIndex(g) {
    const i = BATTLE_PHASES.indexOf(g?.currentPhase)
    return i === -1 ? 0 : i
  }

  // Position within the battle round, 0..9 — two turns of five phases.
  function clockSlot(g) {
    return (g?.currentTurn === 1 ? 1 : 0) * BATTLE_PHASES.length + phaseIndex(g)
  }

  const SLOTS = BATTLE_PHASES.length * 2

  // Can the clock move by `delta` at all? Round 1's opening phase and round 5's closing one are
  // the ends of the game — same convention as the round bar's own arrows.
  function canStepPhase(delta) {
    const g = current.value
    if (!g) return false
    const next = clockSlot(g) + delta
    if (next < 0) return g.currentRound > 1
    if (next >= SLOTS) return g.currentRound < ROUND_COUNT
    return true
  }

  // One phase forward or back, rolling over into the neighbouring battle round. Crossing a
  // boundary goes through goToRound so the secondary-card housekeeping there still happens.
  function stepPhase(delta) {
    const g = current.value
    if (!g || !canStepPhase(delta) || (delta < 0 && strictWhy('clock'))) return
    moveClock(() => stepClock(g, delta))
  }
  function stepClock(g, delta) {
    let next = clockSlot(g) + delta
    if (next < 0) {
      goToRound(g.currentRound - 1)
      next = SLOTS - 1
    } else if (next >= SLOTS) {
      goToRound(g.currentRound + 1)
      next = 0
    }
    g.currentTurn = next >= BATTLE_PHASES.length ? 1 : 0
    g.currentPhase = BATTLE_PHASES[next % BATTLE_PHASES.length]
  }

  // The turn is always kept, phases or not: "End turn" hands the game to the other player's
  // Command phase, and the second turn of a round opens the next round (through goToRound, for
  // the secondary housekeeping). The last turn of the game has nowhere to go — the screen offers
  // "Finish game" there instead.
  function canEndTurn() {
    const g = current.value
    return !!g && (g.currentTurn !== 1 || g.currentRound < ROUND_COUNT)
  }

  function beginGame() {
    const g = current.value
    if (!g || g.phase !== 'playing') return
    const starting = g.begun === false
    if (starting && battleWaitsFor()) return
    delete g.begun
    delete g.firstTurnPending
    // A game saved while sides still confirmed their secondaries (2.10.5 betas) carries the flag.
    g.players.forEach((pl) => { delete pl.secondaryPending })
    if (starting) pushAct(g, { type: 'turn', round: g.currentRound, turn: 0, pi: 0 })
    if (starting) g.clockAt = Date.now()
  }

  // The turn told in the log (actionLog.js, the game's own `acts`): a turn the clock moved INTO is
  // an act — "Opp's turn" — and one it moved back out of is that act taken back. The phases are not
  // told (owner, 2026-10-19: five lines a turn would bury the rest). Every way the clock moves goes
  // through here: End turn, Undo turn, the phase arrows and the phase picker.
  function moveClock(move) {
    const g = current.value
    const from = clk()
    const fromSlot = clockSlot(g)
    move(g)
    const to = clk()
    // When the clock last moved, and whether that was back — what strict rules read to allow one
    // step back right after it (strictRules.js canClockBack).
    const step = (to.round - from.round) * SLOTS + clockSlot(g) - fromSlot
    if (step) {
      g.clockAt = Date.now()
      if (step < 0) g.clockBack = true
      else delete g.clockBack
    }
    if (from.round === to.round && from.turn === to.turn) return
    if (clockBefore(from.round, from.turn, to.round, to.turn)) {
      pushAct(g, { type: 'turn', round: to.round, turn: to.turn, pi: to.turn })
      return
    }
    for (;;) {
      const a = lastOpenAct(g, a => a.type === 'turn' && clockBefore(to.round, to.turn, a.round, a.turn))
      if (!a) break
      pushUndo(g, a, to, { pi: a.pi })
    }
  }

  function endTurn() {
    const g = current.value
    if (!g || !canEndTurn()) return
    discardMarked()
    moveClock(() => {
      if (g.currentTurn === 1) {
        goToRound(g.currentRound + 1)
      } else {
        g.currentTurn = 1
        g.currentPhase = BATTLE_PHASES[0]
      }
    })
  }

  // "Undo turn": back into the turn that just ended, at its last phase — the moment it was ended
  // from. An action of its own rather than a snapshot of the game: in a shared game the other
  // phones already have the new turn, and whatever was scored since must survive the undo.
  function canUndoTurn() {
    const g = current.value
    return !!g && (g.currentTurn === 1 || g.currentRound > 1)
  }

  function undoTurn() {
    const g = current.value
    if (!g || !canUndoTurn() || strictWhy('clock')) return
    moveClock(() => {
      // goToRound resets the clock to the round's first turn, so the target is decided up front.
      const wasFirst = g.currentTurn !== 1
      if (wasFirst) goToRound(g.currentRound - 1)
      g.currentTurn = wasFirst ? 1 : 0
      g.currentPhase = BATTLE_PHASES[BATTLE_PHASES.length - 1]
    })
  }

  // Jump straight to one phase of one player's turn (the phase picker).
  function goToPhase(turn, phaseKey) {
    const g = current.value
    if (!g || !BATTLE_PHASES.includes(phaseKey)) return
    const target = (turn === 1 ? BATTLE_PHASES.length : 0) + BATTLE_PHASES.indexOf(phaseKey)
    if (target < clockSlot(g) && strictWhy('clock')) return
    moveClock(() => {
      g.currentTurn = turn === 1 ? 1 : 0
      g.currentPhase = phaseKey
    })
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
    // Who conceded, as a SIDE: the reason says "you" from this phone's view (gameScoring.concededSide).
    const you = youIndex(g)
    if (reason === 'friendly-concede') g.concededBy = you
    else if (reason === 'opponent-concede') g.concededBy = 1 - you
    else delete g.concededBy
    g.result = { totals: g.players.map((_, i) => grandTotal(i)) }
    pushAct(g, { ...clk(), type: 'finish', reason: g.endReason, pi: you })
  }

  function resumeGame() {
    const g = current.value
    if (!g) return
    g.phase = 'playing'
    pushAct(g, { ...clk(), type: 'resume', pi: youIndex(g) })
  }

  // Edit setup fields on a game already in progress — only the ones that don't feed
  // scoring (primarySlug, secondary deck/hand, rounds, cp are never touched here), so a
  // mid-game correction can't orphan anything already recorded.
  function updateSetup({ settings, players } = {}) {
    if (!current.value) return
    const before = setupSig(current.value)
    if (players) players.forEach((p, i) => {
      const pl = current.value.players[i]
      if (!p || !pl) return
      if (p.name !== undefined) pl.name = p.name
      if (p.battleReady !== undefined) pl.battleReady = !!p.battleReady
      // The army list can be attached (or detached) after the game has started — see
      // EditSetupModal. `factionSlug`/`detachments` come with it only in the narrow cases that
      // modal allows (a legacy game that never had a faction; detachments still empty): mid-game
      // they are load-bearing — missions, the army-rule tracker, the points already scored and
      // the stratagem list all hang on them — so the list never overwrites a standing choice.
      if (p.rosterId !== undefined) pl.rosterId = p.rosterId
      if (p.roster !== undefined) pl.roster = p.roster
      if (p.factionSlug !== undefined) pl.factionSlug = p.factionSlug
      if (p.detachments !== undefined) pl.detachments = [...p.detachments]
      // Doubles: the team name doubles as the side's display name (see makePlayer), and the
      // members' editable fields mirror the side-level ones above under the same narrow rules.
      if (p.teamName !== undefined) { pl.teamName = p.teamName; pl.name = p.teamName }
      if (p.members !== undefined && Array.isArray(pl.members)) p.members.forEach((m, mi) => {
        const mem = pl.members[mi]
        if (!m || !mem) return
        if (m.name !== undefined) mem.name = m.name
        if (m.rosterId !== undefined) mem.rosterId = m.rosterId
        if (m.roster !== undefined) mem.roster = m.roster
        if (m.factionSlug !== undefined) mem.factionSlug = m.factionSlug
        if (m.detachments !== undefined) mem.detachments = [...m.detachments]
      })
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
    // A change the whole game sees goes in its log; a phone's own display switches do not.
    const g = current.value
    if (g.phase !== 'setup' && setupSig(g) !== before) pushAct(g, { ...clk(), type: 'setup', pi: youIndex(g) })
  }

  // ── Multi-device sync: the one door another device's changes come in through ────────────────
  // A slice (gameSlices.js: shared / side0 / side1 / roster0 / roster1) written into the live game
  // in place. Nothing else here is bypassed: the mutation lands on `current`, so the deep watcher
  // persists it exactly like a local tap, and every other slice — the other side's scores, this
  // side's list, this device's `isYou` — stays as it was. False when there is no game to write
  // into or the slice is not one we know; the sync layer decides what to do about that (a game
  // that has not been joined yet is assembled whole, not applied piecemeal).
  function applyRemote(name, data) {
    const g = current.value
    if (!isValidGame(g)) return false
    return applySlice(g, name, data)
  }

  // Pull a finished game back out of history into active play (used for games that ended
  // early). Strips the finished metadata; the caller guards against overwriting a live game.
  function resumeFromHistory(id) {
    const g = history.value.find(x => x.id === id)
    if (!g) return
    const resumed = JSON.parse(JSON.stringify(g))
    resumed.phase = 'playing'
    pushAct(resumed, { round: resumed.currentRound, turn: resumed.currentTurn === 1 ? 1 : 0, type: 'resume', pi: youIndex(resumed) })
    // Played on here, it is this tracker's game from now on (trackerGen.js).
    resumed.trackerGen = TRACKER_GEN
    delete resumed.finishedAt
    delete resumed.result
    delete resumed.endReason
    current.value = resumed
    history.value = history.value.filter(x => x.id !== id)
    saveNow()
  }

  // Save the finished game to history and clear the current slot. The record does not carry the
  // shared-game handle (`party`, useParty.js): it is this phone's credential for a live link, and
  // the link ends with the game — dropping it here is what tells the sync layer so.
  function archiveGame() {
    if (!current.value) return
    const record = JSON.parse(JSON.stringify(current.value))
    delete record.party
    history.value = [record, ...history.value]
    current.value = null
    saveNow() // persist synchronously — don't let an iOS PWA suspend drop the just-saved game
  }

  function discardGame() {
    current.value = null
    saveNow()
  }

  // Putting the current game away to make room for another one — a new game, a seat at someone
  // else's table, a game pulled back out of history. A game that was PLAYED is frozen at its
  // score and kept; a LOBBY is dropped. A lobby has no rounds, no result and nothing anyone did
  // in it, and archiving one would put a game that never happened into the record (and into the
  // statistics, which read those rounds back).
  function putAwayCurrent() {
    const g = current.value
    if (!g) return
    if (g.phase === 'setup') { discardGame(); return }
    finishGame('early')
    archiveGame()
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
    startLobby, closeLobby, newGame, updateSetup, setRoundPrimary, setCp, spendCpByHand, setArmyCounter, setArmySelection, toggleArmyMulti,
    setArmyChoice, fireArmyToggle, undoArmyToggle, addArmyDie, removeArmyDie, setArmyPool,
    setArmyCondition, setUnitCondition, setUnitStratagem, setUnitUse, setUnitAura, setUnitPick,
    resurrectArmyUnit, undoArmyResurrect, applyArmyBonus, undoArmyBonus,
    setPrimaryRow, primaryRowCount,
    drawSecondary, drawSpecificSecondary, returnSecondaryToDeck, discardFromHand,
    tookSecondaries, canTakeSecondaries, takeRandomSecondaries, takeChosenSecondaries, canUntakeSecondaries, untakeSecondaries,
    restoreSecondaryToHand, redrawSecondary, canCpRedraw, cpRedraw, canEndTurnDiscard, endTurnDiscard, isMarkedForTurnEnd, canMarkForTurnEnd, markForTurnEnd,
    canGainBonus, gainBonusCp, canUndoBonus, undoBonusCp, spendCp, strictWhy, strictUndoWhy,
    stratUses, stratBlock, useStratagem, lastStratUse, undoStratagem, playStratagem, unplayOnUnit,
    scoreSecondaryRow, secondaryRowCount, secondaryCardVp,
    setUnitStatus,
    goToRound, stepPhase, goToPhase, canStepPhase, endTurn, canEndTurn, beginGame, battleWaitsFor, setSecondaries, rollFirstTurn, undoTurn, canUndoTurn, finishGame, resumeGame, resumeFromHistory, archiveGame, discardGame, putAwayCurrent, deleteHistory,
    applyRemote,
    primaryTotal, roundPrimaryMax, secondaryTotal, grandTotal, leader,
  }
}
