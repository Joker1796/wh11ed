// Playing a stratagem in a game (owner, 2026-09-30): ONE act, wherever it starts — the CP tab or a
// unit's card — that spends the CP, names the unit it was played on, and switches its effect on
// that unit's card when the card has one. Before, the two were separate marks that did not know
// about each other: CP spent with no unit, or a card's effect on with no CP spent.
//
// This file holds the pure parts: whose unit a stratagem is aimed at (its English TARGET line),
// which of a card's modifier records IS a deck stratagem, and why a unit cannot be picked as the
// target right now. The writes are the store's (useTracker's playStratagem / unplayOnUnit).
import { normName } from './gameStratagems.js'
import { stratagemsBlocked, stampOf } from './rosterGameContext.js'

// 'own' — aimed at a unit of the player's own army (almost every one: "One unit from your army",
// "That CHARACTER unit"); 'enemy' — at the opponent's ("One enemy unit"); null — at no unit
// ("Your army", a roll with no unit named). Read off the ENGLISH line, as every derived field is.
export function stratTargetSide(strat) {
  const t = String(strat?._target || '').replace(/\*\*|\[gloss:[^:\]]*:([^\]]*)\]/g, '$1')
  if (!/\b(unit|model)s?\b/i.test(t)) return null
  if (/\benemy\b/i.test(t) && !/\b(from your army|friendly)\b/i.test(t)) return 'enemy'
  return 'own'
}

// The app data (and so the records) keep GW's own misspellings where our faction texts correct
// them; each one named here, so the pairing gate (stratagemPlay.test.js) says when a new one appears.
const SPELLINGS = { 'martial examplars': 'martial exemplars', 'unbridled feroicity': 'unbridled ferocity' }
const nameKey = (s) => { const k = normName(String(s || '')); return SPELLINGS[k] || k }

// The card's modifier record for a deck stratagem — the same detachment and the same name, loosely
// matched (the two data sets differ on case and apostrophes: "No Prey too Big" / "No Prey Too Big").
export function recordFor(strat, records) {
  if (!strat?._detId) return null
  const name = nameKey(strat._enName || strat.name)
  return (records || []).find((r) => r.ref?.kind === 'stratagem' && r.ref.det === strat._detId
    && nameKey(r.ref.name || r.name) === name) || null
}

// …and the other way: the deck stratagem a card's record stands for.
export function deckStratFor(record, deck) {
  if (record?.ref?.kind !== 'stratagem') return null
  const name = nameKey(record.ref.name || record.name)
  return (deck || []).find((s) => s._detId === record.ref.det && nameKey(s._enName || s.name) === name) || null
}

// Why this unit cannot be the target right now, or null:
//   'shock'     it is Battle-shocked — no stratagem may target it (Core Rules 01.07)
//   'unitPhase' a stratagem was already played on it in this phase (the card's own rule, now also
//               counting the ones played from the CP tab)
// `side` holds the CP ledger (the side), `member` the unit's states (a doubles member, or the side).
export function targetBlock(side, member, clock, entry) {
  if (!entry) return null
  if (stratagemsBlocked(member, clock, entry)) return 'shock'
  if (!clock?.tracked) return null
  const now = stampOf(clock)
  const onCard = Object.values(member?.ctx?.strats?.[entry.uid] || {}).some((at) => at === now)
  const onLedger = (side?.cpLog || []).some((e) => e.kind === 'spend' && e.target?.uid === entry.uid
    && e.round === clock.round && (e.turn ?? 0) === clock.turn && e.phase === clock.phase)
  return onCard || onLedger ? 'unitPhase' : null
}

// The units a stratagem may be played on, for the CP tab's question: the army's own attached list
// (or the other side's, for one aimed at an enemy unit), each with the card record it switches on
// (`sid`, own units only) and why it cannot be picked now (`block`). Empty when the stratagem is
// aimed at no unit or no list is attached — the question is then not asked. The lists, their unit
// names and the modifier records are imported here, when a stratagem is played, never with the
// game screen.
export async function loadStratTargets(game, pi, strat) {
  const kind = stratTargetSide(strat)
  if (!kind || !game?.players) return []
  const at = kind === 'enemy' ? 1 - pi : pi
  const side = game.players[at]
  const [{ membersOf, rosterFromPlayer }, { loadRosterFaction }, { loadRosterModifiers, usableEntries }, { usesAllies, sectionsOf, GROUP_LABEL_KEYS }, { clockOf }] = await Promise.all([
    import('./rosterGameLink.js'),
    import('../data/roster/index.js'),
    import('../data/rosterModifiers/index.js'),
    import('../core/roster/rosterEngine.js'),
    import('./rosterGameContext.js'),
  ])
  const clock = clockOf(game, at)
  const doubles = game.settings?.gameType === 'doubles'
  const out = []
  for (const [mi, m] of membersOf(side).entries()) {
    const roster = rosterFromPlayer(m)
    if (!roster?.units?.length) continue
    const data = await loadRosterFaction(roster.faction || m.factionSlug, { allies: usesAllies(roster), cp: roster.cp || null })
    const defs = new Map((data?.units || []).map((u) => [u.id, u]))
    const rec = kind === 'own' ? recordFor(strat, usableEntries(await loadRosterModifiers(m.factionSlug))) : null
    const member = m === side ? side : m
    // By role, as the roster's own unit lists group them (owner, 2026-10-02): `group` is the
    // heading — an i18n key for a role, the source's name for an ally group.
    const detachments = (roster.detachments || []).map((n) => (data?.detachments || []).find((d) => d.name === n)).filter(Boolean)
    const sections = data ? sectionsOf(roster.units, { faction: data, detachments, defOf: (id) => defs.get(id), keepLocked: true }) : []
    const filed = new Set()
    const push = (u, group) => {
      filed.add(u)
      out.push({
        uid: u.uid,
        ...(doubles ? { mi, sub: m.name || '' } : {}),
        name: defs.get(u.id)?.name || u.id,
        group,
        ...(rec ? { sid: rec.sid } : {}),
        ...(kind === 'enemy' ? { opp: true } : { block: targetBlock(side, member, clock, u) }),
      })
    }
    for (const sec of sections) {
      const group = sec.ally ? { name: sec.ally.name } : { key: GROUP_LABEL_KEYS[sec.id] }
      for (const u of sec.items) push(u, group)
    }
    // A unit no section took (its datasheet gone from the data) is still offered, last.
    for (const u of roster.units) if (!filed.has(u)) push(u, null)
  }
  return out
}
