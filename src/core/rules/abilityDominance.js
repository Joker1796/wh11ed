// @ts-check
// Two instances of one ability are not cumulative, "regardless of any numbers or keywords included
// in them" — the player picks one (24.02). Where one instance is at least as good as the other in
// every way, that pick is no pick at all, and a card showing both reads as if both apply: a granted
// SUSTAINED HITS 1 beside a printed SUSTAINED HITS 2, Scouts 6" beside a printed Scouts 7"
// (owner, 2026-10-17: the worse one is hidden). Shared by the weapon tags (rosterStatMods.js) and
// the Core line (datasheetParts.js), so the two cannot disagree about which instance is worse.
//
// What "at least as good" can mean, and nothing more:
//   - the same ability: the same name with the same keyword ("ANTI-VEHICLE 4+" and "ANTI-INFANTRY
//     2+" target different units — that IS a choice, both stay);
//   - a number that is no worse: a roll ("4+", "Feel No Pain 5+") is better lower, anything else
//     ("SUSTAINED HITS 2", 'Scouts 7"') higher; a dice value ("D3") compares with nothing but itself;
//   - no narrower: a rule's reach is a set of targets — "LETHAL HITS: non-VEHICLE" (everything but
//     vehicles) covers "LETHAL HITS: non-MONSTER/VEHICLE", "ANTI-CHARACTER/MONSTER 4+" covers
//     "ANTI-MONSTER 4+", and the plain ability covers every narrowed one. A list and a "non-" list
//     never compare: a MONSTER can be a CHARACTER too. A "(vs …)" condition ("Feel No Pain 4+ (vs
//     mortal wounds)") is a set of attacks it works against, in any order: "(vs Psychic Attacks and
//     mortal wounds)" is "(vs mortal wounds and Psychic Attacks)" and covers "(vs mortal wounds)".
//     Any other bracket is a narrowing that compares only with itself.
import { foldName } from '../shared/foldName.js'

const NUMBERED = /^(.*?)\s+(\d+)(\+|")?$/

/**
 * A rule's reach, as reach() reads it: a list of targets (`neg` for a "non-" list), a "(vs …)" set of
 * attacks, or an opaque bracket that compares only with itself.
 * @typedef {{ opaque: string, vs?: undefined, neg?: undefined, set?: undefined } | { opaque?: undefined, vs?: boolean, neg: boolean, set: Set<string> }} Reach
 */

/**
 * "MONSTER/VEHICLE" → { neg: false, set }, "non-VEHICLE" → { neg: true, set }, "(vs A and B)" → { vs, set }, other "(…)" → opaque
 * @param {string | null} q
 * @returns {Reach | null}
 */
function reach(q) {
  if (q == null) return null
  const t = foldName(q)
  const vs = /^\(vs (.+)\)$/.exec(t)
  if (vs) return { vs: true, neg: false, set: new Set(vs[1].split(/\s*(?:,|\/|\band\b)\s*/).filter(Boolean)) }
  if (t.startsWith('(')) return { opaque: t }
  const neg = t.startsWith('non-')
  return { neg, set: new Set((neg ? t.slice(4) : t).split('/').map((x) => x.trim()).filter(Boolean)) }
}

/** @param {Reach} r */
const opaqueOf = (r) => ('opaque' in r ? r.opaque : null)

/**
 * Does reach `a` include every target of reach `b`? null is "every target".
 * @param {Reach | null} a
 * @param {Reach | null} b
 */
function covers(a, b) {
  if (!a) return true
  if (!b) return false
  if ('opaque' in a || 'opaque' in b) return opaqueOf(a) === opaqueOf(b)
  if (!!a.vs !== !!b.vs) return false
  if (a.neg !== b.neg) return false
  const [small, big] = a.neg ? [a.set, b.set] : [b.set, a.set]
  return [...small].every((x) => big.has(x))
}

/** @param {unknown} ability */
function parse(ability) {
  let s = String(ability).trim()
  let qual = null
  const colon = s.indexOf(':')
  if (colon >= 0) { qual = s.slice(colon + 1).trim(); s = s.slice(0, colon).trim() }
  const bracket = /^(.*?)\s*(\(.*\))$/.exec(s)
  if (bracket) { qual = bracket[2]; s = bracket[1] }
  // ANTI-<targets> N+: the targets are its reach, the name is ANTI
  const anti = /^anti-(.+?)\s+(\d+)\+$/i.exec(s)
  if (anti) return { base: 'anti', n: Number(anti[2]), lowerBetter: true, name: foldName(s), reach: reach(anti[1]) }
  const m = NUMBERED.exec(s)
  if (m) return { base: foldName(m[1]), n: Number(m[2]), lowerBetter: m[3] === '+', name: foldName(s), reach: reach(qual) }
  // "SUSTAINED HITS D3", "Deadly Demise 2D6": a dice value — the base without it, but no number
  const dice = /^(.*?)\s+\d*D\d+(?:\+\d+)?$/i.exec(s)
  return { base: foldName(dice ? dice[1] : s), n: null, dice: !!dice, lowerBetter: false, name: foldName(s), reach: reach(qual) }
}

/**
 * Is `a` at least as good as `b` in every way, so that `b` says nothing `a` does not?
 * @param {unknown} a
 * @param {unknown} b
 */
export function dominates(a, b) {
  const pa = parse(a)
  const pb = parse(b)
  if (pa.base !== pb.base || !covers(pa.reach, pb.reach)) return false
  if (pa.dice || pb.dice) return pa.name === pb.name
  if (pa.n == null || pb.n == null) return pa.n == null && pb.n == null
  if (pa.lowerBetter !== pb.lowerBetter) return false
  return pa.lowerBetter ? pa.n <= pb.n : pa.n >= pb.n
}
