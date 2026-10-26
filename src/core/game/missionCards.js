// @ts-check
// The rules of a mission card, as plain functions over the card itself: which battle rounds a
// block scores in, which rows of a block exclude each other, what a row's VP is worth, whether a
// card can be taken as Fixed. The tracker finds the cards (useTracker's missionBySlug — the app's
// mission data, localised) and hands them in.

/** A block of a mission card, as src/data/missions.js writes it. @typedef {{ kind?: string, heading?: string, when?: string, rounds?: number[], rows: Array<{ vp?: number | string, modifier?: string, text?: string }> }} MissionBlock */
/** @typedef {{ slug?: string, blocks: MissionBlock[] }} Mission */

// Which battle rounds a block can score in, by its (English) heading.
/** @type {Record<string, number[]>} */
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
/** @param {string | undefined} headingEn */
export function blockRounds(headingEn) {
  return (headingEn && BLOCK_ROUNDS[headingEn]) || [1, 2, 3, 4, 5]
}

// A row that tallies — "For each…", "Each time…" — rather than names one bracket.
/** @param {string | null | undefined} text */
export function isPerEachText(text) {
  return /^(For each|Each time)/i.test(text || '')
}

/** vp is a number, or a '+N' string for cumulative bonuses. @param {number | string | null | undefined} v */
export function numericVp(v) {
  if (typeof v === 'number') return v
  const n = parseInt(String(v).replace('+', ''), 10)
  return Number.isFinite(n) ? n : 0
}

// Only missions that actually have a Fixed scoring option can be taken as Fixed
// (A Grievous Blow, Assassination, Bring it Down, Engage on All Fronts).
/** @param {Mission} mission */
export const canBeFixed = (mission) => mission.blocks.some((b) => b.kind === 'fixed')

// Every block of a mission, annotated for the scoring UI; a block that cannot score in `round` is
// marked `offRound`. The scoring dialogs show the whole card and grey those (a player's report,
// 2026-10-20: in round 1 the "Second Battle Round Onwards" half of a primary was simply missing —
// shown, never hidden, like a locked row). Round-gating and the per-each flag are read from the
// ENGLISH card (`en`); display heading/when/text come from the localised one (`local`, the same card
// when there is none). Keeps picks keyed by bi:ri.
/** @param {Mission | null | undefined} en @param {Mission | null | undefined} local @param {number} round */
export function cardBlocksOf(en, local, round) {
  if (!en) return []
  return en.blocks.map((b, bi) => {
    // A Combat Patrol mission names its rounds (appdata's periods); a Chapter Approved card's
    // are read off its heading.
    const offRound = !(b.rounds || blockRounds(b.heading)).includes(round)
    const lb = (local && local.blocks[bi]) || b
    return {
      bi, kind: b.kind, heading: lb.heading, when: lb.when, offRound,
      rows: b.rows.map((er, ri) => ({
        ri, vp: er.vp, modifier: er.modifier,
        text: lb.rows && lb.rows[ri] ? lb.rows[ri].text : er.text,
        perEach: isPerEachText(er.text),
      })),
    }
  })
}

// "or"-linked rows in a block are mutually-exclusive BRACKETS (e.g. control 1 / 2 / 3+
// objectives) — only one may be scored. Given a row, returns the pick keys of its
// sibling rows that selecting it should clear. Per-tally rows ("For each…/Each time…")
// are independent alternatives (a model is one bracket or the other, but both tally
// over the game), so they're never excluded and never exclude others.
/** @param {Mission | null | undefined} mission @param {number} blockIdx @param {number} rowIdx */
export function orSiblingKeys(mission, blockIdx, rowIdx) {
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
