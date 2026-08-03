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
