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
  const data = mod[exportName(slug)] ?? Object.values(mod)[0] ?? null
  await attachExtras(slug, data)
  return data
}

// What the GW app applies as data rather than prints in a rule (keyword grants, restrictions and
// allied units, who an enhancement's bearer can lead, its weapon) lives in ./extras/<slug>.js, out
// of the rule bodies so those can match the app word for word (owner, 2026-10-06). It is hung on
// the objects here as `extras` — [{ en, ru }] — on a detachment's `rule` and on an enhancement;
// RuleExtras.vue draws it under the text. The RU overlay inherits it (deepOverlay copies what the
// overlay does not name). Its own chunk, fetched with the faction that has one. Once per module.
const extrasModules = import.meta.glob('./extras/*.js')
async function attachExtras(slug, data) {
  if (!data?.en || data.__extras) return
  const loader = extrasModules[`./extras/${slug}.js`]
  const x = loader ? (await loader()).default : null
  if (x) {
    for (const det of data.en.detachments || []) {
      if (x[`det:${det.id}`] && det.rule) det.rule.extras = x[`det:${det.id}`]
      for (const e of det.enhancements || []) if (x[`enh:${det.id}:${e.name}`]) e.extras = x[`enh:${det.id}:${e.name}`]
    }
  }
  Object.defineProperty(data, '__extras', { value: true })
}
