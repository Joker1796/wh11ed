// Lazy per-faction rule data (army rule, detachments, stratagems, enhancements). Each
// src/data/factions/<slug>.js is code-split into its own chunk via import.meta.glob and only
// fetched when a page actually asks for that faction — the same shape data/factions/ru/index.js
// already uses for the RU overlays and data/datasheets/index.js for the datasheets.
//
// This module used to statically import all 30 factions into one `factionData` map, so rollup
// rolled them into a single ~1.5MB (366KB gzip) chunk and opening ONE faction's rules page
// downloaded all thirty. **Never reintroduce a static import here** — that regression is
// invisible locally and only shows up as a fat chunk in the build output.
//
// Build scripts are unaffected: scripts/*.mjs never import this file, they read
// src/data/factions/<slug>.js directly through sync-common.mjs's loadModule (import.meta.glob
// is a Vite transform and would not resolve under plain Node).
const modules = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])

// Every faction file has exactly one named export, the camelCase of its slug
// ('space-marines' → `spaceMarines`). Resolve by that name and fall back to the module's first
// value, so adding a helper export can't silently turn the lookup into undefined.
const exportName = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

// Resolves one faction's `{ en, ru }` data object, or null for a slug with no rules file
// (the /factions list shows those as "coming soon"). Async by nature — callers that used the
// old synchronous getFaction() must treat "not loaded yet" the same as "no such faction".
export async function loadFaction(slug) {
  const loader = modules[`./${slug}.js`]
  if (!loader) return null
  const mod = await loader()
  return mod[exportName(slug)] ?? Object.values(mod)[0] ?? null
}
