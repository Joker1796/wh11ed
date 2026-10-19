// The game's log — derived, not recorded.
//
// Mikhail's prototype keeps a separate list of events with clock times. Here the log is READ from
// what the game already holds: the CP ledger (cpLedger.js — Core CP, bonuses, spends, corrections),
// the secondaries drawn / scored / set aside, the primary per round. So it costs the game nothing
// to carry (a shared game travels in slices against the API's 64 KB cap), it is the same on every
// phone of a shared game, and it cannot disagree with the score — undo a scoring and it is gone
// from the log too. What it gives up is the time of day: an entry is placed by round (and turn,
// where the game knows it), which is the clock a 40k game is read by anyway.
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

const KIND = { core: 'cp', bonus: 'cp', adjust: 'cp' }

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
    // A card put back by hand: its draw happened, and so did the putting back (useTracker's
    // returnSecondaryToDeck keeps both, since the undo wipes the card's own `drawn`).
    for (const e of s.returned || []) {
      out.push({ round: e.drawnRound, turn: pi, pi, kind: 'cards', type: 'drawn', slug: e.slug, source: e.source || null, t: e.drawnAt ?? undefined })
      out.push({ round: e.round, turn: pi, pi, kind: 'cards', type: 'returned', slug: e.slug, t: e.t })
    }
    for (const e of s.whenDrawn || []) {
      out.push({ round: e.round, turn: pi, pi, kind: 'cards', type: 'whenDrawn', slug: e.slug, mode: e.mode, t: e.t })
    }
    for (const e of s.scored || []) {
      if (e?.vp > 0) out.push({ round: e.round, turn: null, pi, kind: 'points', type: 'scored', vp: e.vp, slug: e.slug, t: e.t })
    }
    for (const d of s.discarded || []) {
      const slug = d.slug ?? d
      const type = redrawn.has(slug) ? 'redraw' : d.cp ? 'discard' : d.auto != null ? 'achieved' : 'setAside'
      out.push({ round: d.round ?? null, turn: d.auto ?? null, pi, kind: 'cards', type, slug, ...(type === 'discard' ? { cp: true } : {}), t: d.t })
    }
    for (const e of pl.cpLog || []) {
      // Told by its card: the replacement ('redraw') and the end-of-turn discard's point ('discard').
      if (e.kind === 'spend' && e.source === 'redraw') continue
      if (e.kind === 'bonus' && e.source === 'discard') continue
      const type = e.kind === 'spend' ? 'strat' : e.kind
      out.push({
        round: e.round, turn: e.turn ?? null, pi, kind: e.kind === 'spend' ? 'strat' : KIND[e.kind] || 'cp', type, t: e.t,
        amount: e.amount, ...(e.source ? { source: e.source } : {}), ...(e.name ? { name: e.name } : {}), ...(e.ref ? { ref: e.ref } : {}),
        ...(e.target ? { target: e.target } : {}),
      })
    }
  })
  // Newest first, as a log is read mid-game: by round, then — where both acts carry when they were
  // made (`t`, stamped since 2026-09-30) — by that, so one turn reads in the order it was played
  // rather than grouped by kind (the CP corrections a player made last showed under the cards they
  // drew first). Acts of one moment (a take's two cards), or a game saved before the stamps, fall
  // back to turn (unknown last within a round), then side.
  const tu = (x) => (x == null ? 2 : x)
  return out.sort((a, b) => (b.round || 0) - (a.round || 0)
    || (a.t != null && b.t != null && a.t !== b.t ? b.t - a.t : tu(b.turn) - tu(a.turn) || a.pi - b.pi))
}
