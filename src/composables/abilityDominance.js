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
//   - no narrower: "LETHAL HITS: non-VEHICLE" (Tactical Precision) is worse than a plain LETHAL
//     HITS, never better than it.
import { foldName } from '../utils/foldName.js'

const NUMBERED = /^(.*?)\s+(\d+)(\+|")?$/

/** @param {unknown} ability */
function parse(ability) {
  const [head, ...rest] = String(ability).split(':')
  const name = head.trim()
  const qual = rest.length ? foldName(rest.join(':')) : null
  const m = NUMBERED.exec(name)
  if (m) return { base: foldName(m[1]), n: Number(m[2]), lowerBetter: m[3] === '+', name: foldName(name), qual }
  // "SUSTAINED HITS D3", "Deadly Demise D6": a dice value — the base without it, but no number
  const dice = /^(.*?)\s+D\d+(?:\+\d+)?$/i.exec(name)
  return { base: foldName(dice ? dice[1] : name), n: null, dice: !!dice, lowerBetter: false, name: foldName(name), qual }
}

/** Is `a` at least as good as `b` in every way, so that `b` says nothing `a` does not? */
export function dominates(a, b) {
  const pa = parse(a)
  const pb = parse(b)
  if (pa.base !== pb.base) return false
  if (pa.qual && pa.qual !== pb.qual) return false
  if (pa.dice || pb.dice) return pa.name === pb.name
  if (pa.n == null || pb.n == null) return pa.n == null && pb.n == null
  if (pa.lowerBetter !== pb.lowerBetter) return false
  return pa.lowerBetter ? pa.n <= pb.n : pa.n >= pb.n
}
