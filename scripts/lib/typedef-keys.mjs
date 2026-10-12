// Reading a JSDoc typedef file as data, for the gates that hold generated or hand-authored data to
// its types (roster.types.test.js, data.types.test.js): which properties a typedef declares, and
// the keys of an inline object type.

// typedef name → { property name → its type text }
export function typedefProps(src) {
  const out = new Map()
  for (const block of src.split('/**').slice(1)) {
    const name = block.match(/@typedef\s+\{object\}\s+(\w+)/)?.[1]
    if (!name) continue
    const props = new Map()
    for (const m of block.matchAll(/@property\s+\{(.+?)\}\s+\[?(\w+)/g)) props.set(m[2], m[1])
    out.set(name, props)
  }
  return out
}

// The keys of an inline object type: `{ at: number, pts: number }`, `Array<{ n: string }>`.
export function inlineKeys(type) {
  const body = type.match(/\{(.*)\}/)?.[1]
  return body ? [...body.matchAll(/(\w+)\??\s*:/g)].map((m) => m[1]) : null
}
