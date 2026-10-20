// GW's rules documents the app does not carry — the Faction Packs and the Event Companions — that
// moved to a new version in one update. Read from scripts/patch-notes/documents.json (the editions
// seen, with GW's own dates; `npm run documents`), not from git history: our commits of a pack land
// days after GW's (the 14 October packs were transcribed after the 981 data bump), and the update a
// document belongs to is the one of its date.
//
// An edition is reported in the update whose window holds its date — after the previous update's
// day, up to its own — and only when an earlier edition is known: the first one we saw of a
// document is where our record starts, not GW's news.

const COMPANIONS = {
  main: 'Warhammer Event Companion',
  doubles: 'Warhammer Doubles',
  teams: 'Warhammer Teams',
  dominatus: 'Warhammer Dominatus',
}
// GW's file names are its asset names; a hand-renamed copy has no address.
const urlOf = (file) => (/^eng_/.test(file) ? `https://assets.warhammer-community.com/${file}` : null)

/**
 * @param {{ doc: string, version: string, published: string, file: string }[]} editions
 * @param {string|null} after the previous update's date (exclusive), null for the first update
 * @param {string} upto this update's date (inclusive)
 */
export function diffDocuments(editions, after, upto) {
  const byDoc = new Map()
  for (const e of [...editions].sort((a, b) => a.published.localeCompare(b.published))) {
    if (!byDoc.has(e.doc)) byDoc.set(e.doc, [])
    byDoc.get(e.doc).push(e)
  }
  const out = []
  for (const [doc, list] of byDoc) {
    list.forEach((e, i) => {
      if (!i || e.published > upto || (after && e.published <= after)) return
      const [kind, id] = doc.split(':')
      out.push({
        faction: kind === 'pack' ? id : null,
        kind: 'document',
        name: kind === 'pack' ? 'Faction Pack' : COMPANIONS[id] || id,
        change: 'changed',
        date: e.published,
        fields: [{ field: 'version', from: list[i - 1].version, to: e.version }],
        url: urlOf(e.file),
      })
    })
  }
  return out
}
