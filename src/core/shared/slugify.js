// Turn a display name into a URL/DOM-id-safe slug. Shared between build scripts (Node,
// scripts/gen-faction-rules-index.mjs) and the browser (FactionRuleView.vue) so a stratagem's/
// enhancement's DOM id computed at render time always matches the id baked into the generated
// search index — same reasoning as src/data/deepOverlay.js being importable from both.
export function slugify(name) {
  return (name || '')
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// The key two spellings of one DETACHMENT name share. The roster stores appdata's spelling, the
// MFM its own, and they differ in case, apostrophe and diacritics ("Vow-sworn Crusaders" /
// "Vow-Sworn Crusaders", "Dëlve Assault Shift" / "delve-assault-shift"), so an exact `===` silently
// finds nothing (player report b337c3bf, 2026-10-07: a Purge the Foe list showed no chip). Combining
// marks go first: slugify() alone drops "ë" to a hyphen. slugify() itself stays untouched — it is
// load-bearing for DOM ids and the search index.
export function detKey(name) {
  return slugify((name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
}
