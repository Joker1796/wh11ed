// 11th-edition rules hand out several things at once as a LIST under one verb:
//
//   Friendly TECH-PRIEST models have:
//   ▪ 4+ **InSv**.
//   ▪ **Feel No Pain 5+**.
//
// Every reader of "what does this rule grant" — the modifier generator's candidate heuristic and
// the core-grants gate — looks for the verb right before the thing ("have the Feel No Pain",
// "have [LETHAL HITS]"), and a colon and a line break stand between them here. Until 2026-10-18
// that hid 70 rules from both (Lords of the Forge's 4+ invulnerable save and Feel No Pain 5+ among
// them, found by a player). Give each item its verb back, so the list reads as the sentences it
// stands for: "have 4+ InSv. have Feel No Pain 5+."
//
// An item written as an alternative ("__Or:__ [LETHAL HITS]") is a grant all the same — which one
// applies is the reviewer's reading, not the scan's.
const HEAD = /\b(has|have|gains?):\s*$/i
const ITEM = /^▪\s*(?:__Or:__\s*)?/

export function flattenGrantLists(text) {
  let verb = null
  return String(text || '').split('\n').map((line) => {
    const head = line.match(HEAD)
    if (head) {
      verb = head[1]
      return line.replace(/:\s*$/, '.')
    }
    if (verb && ITEM.test(line)) return `${verb} ${line.replace(ITEM, '')}`
    verb = null
    return line
  }).join('\n')
}
