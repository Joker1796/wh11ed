// The game's log — the whole history of what was done (owner, 2026-10-19).
//
// Most of it is READ from what the game already holds: the CP ledger (cpLedger.js — Core CP,
// bonuses, spends, corrections), the secondaries drawn / scored / set aside, the primary per
// round. That costs the game nothing to carry (a shared game travels in slices against the API's
// 64 KB cap), it is the same on every phone of a shared game, and it cannot disagree with the
// score. What the game does not hold — an act taken back, a score corrected, a unit destroyed, an
// army rule used, the turn ending — the store writes as it happens (actionLog.js, `acts`), and
// this reads those too. An entry taken back stays in the log struck through (`undone`), and the
// taking back is an entry of its own (`undo`).
//
// Events: { round, turn (0 | 1 | null), pi, kind, type, … }
//   kind — the filter: 'points' | 'cp' | 'strat' | 'cards'
//   type — what happened:
//     'primary'  { vp, slug }           the round's primary VP
//     'scored'   { vp, slug }           a secondary scored this round
//     'drawn'    { slug, source }       a secondary came into the hand
//     'achieved' { slug }               …left it achieved at the end of a turn
//     'discard'  { slug, cp }           …discarded at the end of the turn (cp: the bonus it gained)
//     'setAside' { slug }               …set aside by hand
//     'redraw'   { slug }               …replaced for 1CP
//     'whenDrawn' { slug, mode }        …discarded / shuffled back by its own WHEN DRAWN rule
//     'returned' { slug }               …put back in the deck by hand (its draw is told as 'drawn' too)
//     'core' | 'bonus' { amount, source } · 'adjust' { amount } · 'strat' { amount, name, ref, target? }
//       (`target` — the unit it was played on, when it was: { uid, name, opp? })
//   …and the recorded acts (actionLog.js): 'undo' { of }, 'unit', 'unitSwitch', the army rule's
//   'army*', and the battle's 'turn' / 'finish' / 'resume' / 'setup'.
//   undone — the entry was taken back: drawn struck through.

import { ledgerEvent, discardEvent, ACT_KIND } from './actionLog.js'

// An undo finds the entry it took back by what that entry says. Only a RECORDED act can still be
// there to find (a unit switch, an army rule's call); an entry read from the game state — a spend,
// a score — is gone once taken back, and a twin still standing (two identical uses, one taken back)
// must not be mistaken for it.
const sig = (e) => JSON.stringify([e.type, e.t ?? null, e.round ?? null, e.slug ?? null, e.name ?? null, e.amount ?? null, e.vp ?? null, e.uid ?? null, e.id ?? null, e.opt ?? null])
const kindOf = (e) => (e.type === 'undo' ? kindOf(e.of || {}) : e.kind || ACT_KIND[e.type] || 'cp')

export function buildGameLog(game) {
  const out = []
  if (!game?.players) return out
  game.players.forEach((pl, pi) => {
    pl.rounds?.forEach((r, i) => {
      if (r?.primary) out.push({ round: i + 1, turn: pi, pi, kind: 'points', type: 'primary', vp: r.primary, slug: pl.primarySlug, t: r.t })
    })
    const s = pl.secondary || {}
    const redrawn = new Set((pl.cpLog || []).filter((e) => e.kind === 'spend' && e.source === 'redraw').map((e) => e.ref))
    for (const [slug, round] of Object.entries(s.drawn || {})) {
      out.push({ round, turn: pi, pi, kind: 'cards', type: 'drawn', slug, source: s.source?.[slug] || null, t: s.drawnAt?.[slug] })
    }
    // A card put back by hand: its draw happened — struck, since putting it back undid it — and
    // so did the putting back (useTracker's returnSecondaryToDeck keeps both, since the undo wipes
    // the card's own `drawn`).
    for (const e of s.returned || []) {
      out.push({ round: e.drawnRound, turn: pi, pi, kind: 'cards', type: 'drawn', slug: e.slug, source: e.source || null, t: e.drawnAt ?? undefined, undone: true })
      out.push({ round: e.round, turn: pi, pi, kind: 'cards', type: 'returned', slug: e.slug, t: e.t })
    }
    for (const e of s.whenDrawn || []) {
      out.push({ round: e.round, turn: pi, pi, kind: 'cards', type: 'whenDrawn', slug: e.slug, mode: e.mode, t: e.t })
    }
    for (const e of s.scored || []) {
      if (e?.vp > 0) out.push({ round: e.round, turn: null, pi, kind: 'points', type: 'scored', vp: e.vp, slug: e.slug, t: e.t })
    }
    for (const d of s.discarded || []) out.push({ ...discardEvent(d, redrawn), pi })
    for (const e of pl.cpLog || []) {
      // Told by its card: the replacement ('redraw') and the end-of-turn discard's point ('discard').
      if (e.kind === 'spend' && e.source === 'redraw') continue
      if (e.kind === 'bonus' && e.source === 'discard') continue
      out.push({ ...ledgerEvent(e), pi })
    }
    for (const a of pl.acts || []) out.push({ ...a, pi: a.pi ?? pi, kind: kindOf(a), act: true })
  })
  // The battle's own acts carry the side they concern (whose turn began, which phone finished).
  for (const a of game.acts || []) out.push({ ...a, pi: a.pi ?? 0, kind: kindOf(a), act: true })
  markUndone(out)
  // Newest first, as a log is read mid-game: by round, then — where both acts carry when they were
  // made (`t`, stamped since 2026-09-30) — by that, so one turn reads in the order it was played
  // rather than grouped by kind (the CP corrections a player made last showed under the cards they
  // drew first). Acts of one moment (a take's two cards), or a game saved before the stamps, fall
  // back to turn (unknown last within a round), then side.
  const tu = (x) => (x == null ? 2 : x)
  return out.sort((a, b) => (b.round || 0) - (a.round || 0)
    || (a.t != null && b.t != null && a.t !== b.t ? b.t - a.t : tu(b.turn) - tu(a.turn) || a.pi - b.pi))
}

// Every undo strikes the entry it took back: the act still in the log, or, when the game no longer
// holds it (a stratagem's spend, a score since corrected), the copy the undo carries, put back where
// it was.
function markUndone(out) {
  const open = new Map()
  for (const e of out) {
    if (!e.act || e.type === 'undo' || e.undone) continue
    const k = `${e.pi}|${sig(e)}`
    if (!open.has(k)) open.set(k, [])
    open.get(k).push(e)
  }
  for (const u of out.filter((e) => e.type === 'undo' && e.of)) {
    const hit = open.get(`${u.pi}|${sig(u.of)}`)?.shift()
    if (hit) hit.undone = true
    else out.push({ ...u.of, pi: u.pi, kind: kindOf(u.of), undone: true })
  }
}
