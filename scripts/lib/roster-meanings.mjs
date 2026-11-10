// What a stored roster index MEANS, and how to carry it from one generation of the roster data to
// the next. A saved entry keeps its wargear as `[group, option, n]` and its size as a bracket index
// (src/core/shared/roster.types.js RosterEntry); those are positions in generated data, and the
// generator moves them whenever a codex is replaced or a reading is fixed. Before 2026-11-08 every
// such move needed a hand-written migration in useRosters.js — and data 963 (Codex: Space Marines)
// moved 105 units with none, so old lists silently showed another weapon.
//
// Here a position is turned into its meaning — the profile that holds the group, what the group
// replaces, the items an option grants; the model counts of a bracket — and two generations are
// matched by meaning. gen-roster-moves.mjs writes the result for the app (src/data/rosterIndexMoves.js)
// and holds the ledger of the last generation (scripts/lib/roster-meanings.json).

import { foldName } from '../../src/core/shared/foldName.js'

// The app's one name fold, then hyphens and apostrophes as spaces: "multi-melta" and "multi melta",
// "Astartes" with a typographic apostrophe or not, are one item here.
const norm = (s) => foldName(s).replace(/[-'`]+/g, ' ').replace(/\s+/g, ' ').trim()

/** Item names of one option, sorted, with counts: "boltgun×1+chainsword×1". */
function optionKey(option, names, alias) {
  const first = option[0]
  const pairs = Array.isArray(first) ? first : [[first, option[1] ?? 1]]
  return pairs.map(([id, n]) => `${alias(norm(names[id] ?? `#${id}`))}×${n ?? 1}`).sort().join('+')
}

/**
 * One faction file's units → their meanings, keyed `<slug>:<unit id>`.
 * @param {string} slug
 * @param {{ units: any[] }} data a generated src/data/roster/<slug>.js
 * @param {Record<string, string>} names items.js `items`
 * @param {Record<string, string>} [aliases] old item name → new (normalized), for a rename by GW
 */
export function meaningsOf(slug, data, names, aliases = {}) {
  const alias = (n) => aliases[n] ?? n
  const out = {}
  for (const u of data?.units || []) {
    const minis = (u.minis || []).map((m) => norm(m.n))
    const profile = (g) => (g.all || g.m == null ? '*' : minis[g.m] ?? `#${g.m}`)
    const groups = (u.gear || []).map((g) => {
      const rep = (g.rep || []).map((id) => alias(norm(names[id] ?? `#${id}`))).sort().join('+')
      return { p: profile(g), r: rep, ...(g.fixed ? { fixed: 1 } : {}), o: (g.o || []).map((o) => optionKey(o, names, alias)) }
    })
    const sizes = (u.sizes || []).map((s) => {
      const comp = (s.comp || []).map(([m, ...n]) => `${minis[m] ?? `#${m}`}:${n.join('-')}`).sort().join(',')
      return `${(s.per || []).join('-')}${comp ? `|${comp}` : ''}`
    })
    const automatic = [...new Set((u.alleg?.o || []).flatMap(option => option.wg ? [`${alias(norm(names[option.wg]))}×1`] : []))]
    out[`${slug}:${u.id}`] = { g: groups, s: sizes, m: minis, ...(automatic.length ? { automatic } : {}) }
  }
  return out
}

// A pick is found again by its full meaning; failing that by the same items on the same profile
// (the generator fixed what the group replaces); failing that by the same items anywhere in the
// unit. A looser key counts only when it is unique on both sides — never a guess between two.
function pickIndex(groups) {
  const keys = [
    { profile: true, key: (g, o) => `${g.p}|${g.r}|${o}` },
    { profile: true, key: (g, o) => `${g.p}|${o}` },
    { profile: false, key: (g, o) => `${g.r}|${o}` },
    { profile: false, key: (g, o) => o },
  ]
  return keys.map(({ profile, key }) => {
    const at = new Map()
    groups.forEach((g, gi) => g.o.forEach((o, oi) => {
      const k = key(g, o)
      at.set(k, at.has(k) ? null : [gi, oi])
    }))
    return { key, at, profile }
  })
}

/**
 * How every stored index of the previous generation reaches the next one. Only what moved or went
 * is listed: `wg["g.o"]` is the new "g.o" or 0 (gone — the pick is dropped), `s[i]` the new index
 * or -1 (gone — the size falls back to the default bracket). A unit that left the data is absent:
 * the roster's `unknownUnit` already says so, and datasheet renames are recorded elsewhere.
 * @returns {{ moves: Record<string, { wg?: Record<string, string | 0 | { review: string, automatic?: true }>, s?: Record<string, number> }>, gone: string[] }}
 */
export function matchMeanings(prev, next) {
  const moves = {}
  const gone = []
  for (const [unit, before] of Object.entries(prev)) {
    const after = next[unit]
    if (!after) continue
    if (JSON.stringify(before) === JSON.stringify(after)) continue
    const entry = {}
    // An older generation may not have named its profiles ("#1"), and its profile order is not the
    // next one's: such a group is matched only by keys that do not involve the profile.
    const unnamed = (p) => /^#\d+$/.test(p)
    const beforeG = before.g
    const oldIdx = pickIndex(beforeG)
    const newIdx = pickIndex(after.g)
    beforeG.forEach((g, gi) => g.o.forEach((o, oi) => {
      // Where the same meaning still stands, the index stays — even if it now has a twin elsewhere.
      const same = after.g[gi]
      if (same && same.o[oi] === o && same.p === g.p && same.r === g.r) return
      let to = null
      for (let k = 0; k < newIdx.length && !to; k++) {
        if (newIdx[k].profile && unnamed(g.p)) continue
        const key = newIdx[k].key(g, o)
        if (oldIdx[k].at.get(key) === null) continue // ambiguous on the old side: not this key
        const hit = newIdx[k].at.get(key)
        if (hit) to = hit
      }
      if (!to && after.automatic?.includes(o)) {
        ;(entry.wg ??= {})[`${gi}.${oi}`] = { review: o, automatic: true }
        return
      }
      // Only a newly explicit fixed-prefix group can complete an old partial choice.
      // Multiple completions preserve the original meaning for an explicit player decision.
      if (!to && same?.fixed && same.p === g.p && same.r === g.r) {
        const quantities = key => new Map(key.split('+').map(part => {
          const at = part.lastIndexOf('×')
          return [part.slice(0, at), Number(part.slice(at + 1))]
        }))
        const old = quantities(o)
        const candidates = same.o.map((key, index) => [quantities(key), index])
          .filter(([items]) => [...old].every(([name, n]) => (items.get(name) || 0) >= n))
        if (candidates.length === 1) to = [gi, candidates[0][1]]
        else {
          ;(entry.wg ??= {})[`${gi}.${oi}`] = { review: o }
          return
        }
      }
      if (to && to[0] === gi && to[1] === oi) return
      ;(entry.wg ??= {})[`${gi}.${oi}`] = to ? `${to[0]}.${to[1]}` : 0
      if (!to) gone.push(`${unit} wargear ${gi}.${oi} (${g.p}: ${o})`)
    }))
    // A bracket is found again by its composition; failing that by the same model range; failing
    // that, when the range itself changed (6-10 → 10), by the one new bracket inside the old range —
    // then with the new range, so a model count outside it falls back to the bracket's minimum.
    const range = (x) => x.split('|')[0].split('-').map(Number)
    before.s.forEach((s, si) => {
      /** @type {number | [number, number, number]} */
      let to = after.s.indexOf(s)
      if (to < 0) {
        const same = after.s.map((x, i) => [x.split('|')[0], i]).filter(([r]) => r === s.split('|')[0])
        to = same.length === 1 ? same[0][1] : -1
      }
      if (to < 0) {
        const [lo, hi] = range(s)
        const inside = after.s.map((x, i) => [range(x), i]).filter(([[a, b]]) => a >= lo && b <= hi)
        if (inside.length === 1) to = [inside[0][1], ...inside[0][0]]
      }
      if (to === si) return
      ;(entry.s ??= {})[si] = to
      if (to === -1) gone.push(`${unit} size ${si} (${s})`)
    })
    if (entry.wg || entry.s) moves[unit] = entry
  }
  return { moves, gone }
}
