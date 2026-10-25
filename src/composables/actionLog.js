// The acts the game keeps for its log (gameLog.js) that its own state cannot tell — owner,
// 2026-10-19: "the log is the whole history of actions".
//
// Most of the log is READ from the game: the CP ledger, the secondaries, the primary per round.
// What that reading cannot see is anything the game no longer holds — an act taken back, a score
// corrected — and the acts that leave no record of their own: a unit destroyed or arriving from
// reserves, a rule switched on for a unit, an army rule's counter, the turn ending. Those are
// written here, as they happen, into `acts`:
//   - on the side (`players[pi].acts`) for what that side did — so it travels in the side's slice
//     and is written by the phone that plays it, like the rest of the side (gameSlices.js);
//   - on the game (`acts`) for what belongs to the battle: the turn, the end and the resumption.
//
// An act is `{ t, round, turn, type, … }`. A TAKING BACK is an act too: `{ type: 'undo', of }`,
// where `of` is the entry as the log would have told it. The log draws that entry struck through
// (where it was) and the undo as a line of its own (when it was) — owner, 2026-10-19. `of` is a
// copy, not a pointer: the thing undone is usually gone from the game by then.
//
// Kept small on purpose — every save and every sync carries it: no text but the names a reader
// needs, and a counter turned several times in a row is one act (COALESCE_MS).

// Writing in a row to the same counter within this many ms reads as one change, not five.
export const COALESCE_MS = 60_000

// The most acts one holder keeps — a fuse, not a budget. A side travels in one slice of a shared
// game, capped at 256 KB by the API (maxPartySliceBytes; 32 KB until 2026-10-19), and an act
// weighs ~100–150 bytes; a busy game measured ~60 a side. Past the fuse the OLDEST go: the log
// loses its start rather than the game losing its sync.
export const MAX_ACTS = 1000

function holderActs(holder) {
  if (!Array.isArray(holder.acts)) holder.acts = []
  return holder.acts
}

export function pushAct(holder, act) {
  if (!holder) return null
  const entry = { t: Date.now(), ...act }
  for (const k of ['label', 'optLabel', 'item']) if (k in entry) entry[k] = compactLabel(entry[k])
  const acts = holderActs(holder)
  acts.push(entry)
  if (acts.length > MAX_ACTS) acts.splice(0, acts.length - MAX_ACTS)
  return entry
}

// The act was a value set by a stepper (`key` names which): one tapped again within COALESCE_MS
// moves the last act's `to` instead of adding another — and a value stepped back to where it
// started leaves no act at all.
export function pushValueAct(holder, act, key) {
  if (!holder) return null
  const acts = holderActs(holder)
  const last = acts.at(-1)
  const now = Date.now()
  if (last && last.type === act.type && last.key === key && last.round === act.round && now - last.t < COALESCE_MS) {
    last.to = act.to
    last.t = now
    if (last.to === last.from) acts.pop()
    return last
  }
  if (act.to === act.from) return null
  return pushAct(holder, { ...act, key })
}

// A label in both languages kept as one string where the two agree (a stratagem's name, an English
// game term) — most of them, and the log is carried by every save and every sync.
export function compactLabel(x) {
  if (!x || typeof x !== 'object') return x ?? null
  return !x.ru || x.ru === x.en ? (x.en ?? '') : { en: x.en, ru: x.ru }
}

// `of` was taken back. Its `t` stays as it was: that is what places the struck entry in the log.
// `extra` — what the undo itself carries besides: the side a battle act concerns (`pi`).
export function pushUndo(holder, of, clock, extra = {}) {
  if (!holder || !of) return null
  return pushAct(holder, { type: 'undo', round: clock.round, turn: clock.turn, ...extra, of: strip(of) })
}

// The fields an undone entry needs to be told again — without the bookkeeping, and without what
// its type already says (the filter it is under, ACT_KIND) or the log never shows (a ledger ref).
const DROP = new Set(['pi', 'undone', 'act', 'kind', 'source', 'ref', 'key'])
function strip(e) {
  const out = {}
  for (const [k, v] of Object.entries(e)) if (v !== undefined && !DROP.has(k)) out[k] = v
  return out
}

// ── The derived entries, built one way for the log and for an undo of them ──

// A CP ledger entry (cpLedger.js) as the log tells it.
export function ledgerEvent(e) {
  // A point spent from the balance's "−" (no stratagem to spend through) is a CP line, not a stratagem.
  const manual = e.kind === 'spend' && e.source === 'manual'
  const type = manual ? 'spend' : e.kind === 'spend' ? 'strat' : e.kind
  return {
    round: e.round, turn: e.turn ?? null, kind: e.kind === 'spend' && !manual ? 'strat' : 'cp', type, t: e.t,
    amount: e.amount, ...(e.source ? { source: e.source } : {}), ...(e.name ? { name: e.name } : {}), ...(e.ref ? { ref: e.ref } : {}),
    ...(e.target ? { target: e.target } : {}),
  }
}

// A card that left the hand (`secondary.discarded`) as the log tells it: replaced for 1CP, discarded
// at the end of the turn for CP, achieved, or set aside by hand.
export function discardEvent(d, redrawn) {
  const slug = d.slug ?? d
  const type = redrawn?.has(slug) ? 'redraw' : d.cp ? 'discard' : d.auto != null ? 'achieved' : 'setAside'
  return { round: d.round ?? null, turn: d.auto ?? null, kind: 'cards', type, slug, ...(type === 'discard' ? { cp: true } : {}), t: d.t }
}

// What a kind of act is filed under in the log.
export const ACT_KIND = {
  primary: 'points', scored: 'points', fix: 'points', core: 'cp', bonus: 'cp', adjust: 'cp', strat: 'strat',
  drawn: 'cards', returned: 'cards', whenDrawn: 'cards', setAside: 'cards', achieved: 'cards', discard: 'cards', redraw: 'cards',
  unit: 'units', unitSwitch: 'units',
  armyCond: 'army', armyValue: 'army', armyPick: 'army', armyFire: 'army', armyDie: 'army', armyDieUse: 'army', armySpend: 'army', armyBonus: 'army',
  turn: 'turn', finish: 'turn', resume: 'turn', setup: 'turn',
}
