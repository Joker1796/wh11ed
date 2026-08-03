// Extract `### English | Russian` h4 subheadings from a faction/Combat Patrol rule body
// string, in body order. Mirrors RuleBody.vue's own h4 parsing (a `### ` line, optionally
// split on ' | ' into an English heading + its RU caption) — shared so the generated search
// index's subheading list always matches what actually renders, and the two agree on the
// 1-based order anchors.js's h4AnchorId() numbers them by (only '### ' lines advance that
// counter in RuleBody.vue, same as here).
export function extractSubheadings(body) {
  if (!body) return []
  const out = []
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line.startsWith('### ')) continue
    const rest = line.slice(4)
    const pipe = rest.indexOf(' | ')
    out.push({
      text: (pipe >= 0 ? rest.slice(0, pipe) : rest).trim(),
      ru: pipe >= 0 ? rest.slice(pipe + 3).trim() : '',
    })
  }
  return out
}
