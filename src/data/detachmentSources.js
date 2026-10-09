// The faction files an army's detachments are read from: its own first, then each file it borrows
// a detachment from (chapterDetachments.js — the entitlements the roster editor and the faction
// page offer). A Chapter reads Codex: Space Marines; every Space Marines army also reads the
// Deathwatch file, where Deathwatch Support lives. Its own file comes first, so a name it reprints
// is read from there. Every reader of a list's detachments asks this, not a hand-written list
// (detachmentSources.test.js).
import chapterDetachments from './chapterDetachments.js'

export function detachmentSources(slug) {
  return [slug, ...new Set((chapterDetachments[slug] || []).map((e) => e.from))]
}

// The detachments an army borrows from one file, by name — what it may read from a file it does
// not otherwise draw on.
export function borrowedFrom(slug, from) {
  return new Set((chapterDetachments[slug] || []).filter((e) => e.from === from).map((e) => e.name))
}
