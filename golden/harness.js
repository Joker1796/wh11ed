// The golden master's inputs and outputs (see README.md). Lists are built from the data of the day —
// every unit of a faction, its Characters attached where they can lead — and what the engine makes
// of them is reduced to the parts a player reads: points, validation, the exported text and each
// unit's card as useRosterUnitCard resolves it.
import { defineComponent, h } from 'vue'
import { vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { useRosterUnitCard } from '../src/composables/rosterUnitCard.js'
import { leaderTargetsFor, rosterPoints } from '../src/core/roster/rosterEngine.js'

// Every unit once, at its default size, each Character on the first unit it may lead that nobody
// leads yet. Deterministic: the faction's own unit order.
export function everyUnitRoster(faction, detachment, items) {
  const defOf = (id) => faction.units.find((u) => u.id === id)
  const units = faction.units.map((def, i) => {
    const at = (def.sizes || []).findIndex((s) => s.default)
    return { uid: `u${i}`, id: def.id, size: at >= 0 ? at : 0 }
  })
  const dets = faction.detachments.filter((d) => d.name === detachment)
  for (const u of units) {
    const target = leaderTargetsFor(defOf(u.id), units, u.uid, defOf, dets, items).find((t) => !t.used)
    if (target) u.leaderOf = target.uid
  }
  return { id: 'golden', name: 'golden', faction: faction.slug, detachments: [detachment], battleSize: 'strike-force', units }
}

export { rosterPoints }

// The card of one entry, through the composable both card screens read.
const Probe = defineComponent({
  props: { unitId: { type: String, required: true }, factionSlug: { type: String, required: true }, ctx: { type: Object, default: null } },
  setup(props, { expose }) {
    const card = useRosterUnitCard(props)
    expose({ card })
    return () => h('i')
  },
})

// Whether a faction has rule prose at all — the card loads it with no flag of its own, so a card is
// complete once the prose is there, or straight away for a faction that has none.
const prose = new Map()
async function hasProse(slug) {
  if (!prose.has(slug)) {
    const { loadFactionWithCodex } = await import('../src/composables/rosterFactionRules.js')
    prose.set(slug, !!(await loadFactionWithCodex(slug, 'en', null)).en)
  }
  return prose.get(slug)
}

export async function cardOf(unitId, factionSlug, ctx) {
  const needsProse = await hasProse(factionSlug)
  const w = mount(Probe, { props: { unitId, factionSlug, ctx } })
  const c = w.vm.card
  // The card's own readiness, not a guess at how many ticks loading takes: the first mount of a
  // faction imports its files cold, and a snapshot taken early would be empty only sometimes.
  await vi.waitFor(() => {
    if (!c.loaded.value || !c.modifiersSettled.value || (needsProse && !c.rulesFactionEn.value)) throw new Error('loading')
  }, { timeout: 20000, interval: 5 })
  await flushPromises()
  const out = reduceCard(c)
  w.unmount()
  return out
}

// Everything the card says, in a form that diffs well: functions and Vue internals dropped, long
// prose (rule bodies, which the data gates already hold) replaced by a short hash, so a changed
// sentence still shows as a changed snapshot without carrying 20 MB of text.
function plain(v, depth = 0) {
  if (v == null || typeof v === 'number' || typeof v === 'boolean') return v
  if (typeof v === 'string') return v.length > 160 ? `#${hash(v)}:${v.length}` : v
  if (typeof v === 'function' || depth > 8) return undefined
  if (v instanceof Set) return [...v].map((x) => plain(x, depth + 1)).sort()
  if (v instanceof Map) return Object.fromEntries([...v].map(([k, x]) => [String(k), plain(x, depth + 1)]))
  if (Array.isArray(v)) return v.map((x) => plain(x, depth + 1))
  const out = {}
  for (const k of Object.keys(v).sort()) {
    const x = plain(v[k], depth + 1)
    // An absent field and an empty one read the same on a card; leaving them out halves the file.
    if (x !== undefined && x !== null && x !== false) out[k] = x
  }
  return out
}

// JSON with one line per leaf: an object or array holding no object is written on its own line, so
// a changed number is a one-line diff and the file is a third of indented JSON.
export function stringify(v, indent = '') {
  const leaf = (x) => x === null || typeof x !== 'object' || Object.values(x).every((y) => y === null || typeof y !== 'object')
  if (leaf(v)) return JSON.stringify(v)
  const next = indent + ' '
  if (Array.isArray(v)) return `[\n${v.map((x) => next + stringify(x, next)).join(',\n')}\n${indent}]`
  return `{\n${Object.entries(v).map(([k, x]) => `${next}${JSON.stringify(k)}: ${stringify(x, next)}`).join(',\n')}\n${indent}}`
}
function hash(s) {
  let a = 0x811c9dc5
  for (let i = 0; i < s.length; i++) a = Math.imul(a ^ s.charCodeAt(i), 0x01000193) >>> 0
  return a.toString(36)
}
export { plain, hash }

function reduceCard(c) {
  const sheet = c.statMods.value?.sheet
  if (!sheet) return null
  return plain({
    sheet,
    marks: c.statMods.value.marks,
    core: c.statMods.value.core,
    notes: c.statNotes.value,
    granted: c.allGrantedKeywords.value,
    abilities: c.abilityStates.value,
    rules: c.ruleBlocks.value,
  })
}
