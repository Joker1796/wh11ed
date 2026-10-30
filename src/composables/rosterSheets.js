import { loadDatasheets } from '../data/datasheets/index.js'
import { allySourceOf } from '../core/roster/rosterEngine.js'

// A roster's full datasheets, keyed by the id the ROSTER uses, which for an allied unit is
// namespaced: its datasheet lives in its own faction's file (Draxus is an Imperial Agents sheet),
// and keyed by the bare id every ally row would quietly lose its sheet. Read by the roster screen
// (statline plates, live rules) and by the `.ros` export.
/** @param {{ faction?: string, units?: Array<{ id: string }>, cp?: string | null } | null | undefined} roster */
export async function loadRosterSheets(roster) {
  const slug = roster?.faction
  if (!slug) return new Map()
  const srcs = [...new Set((roster?.units || []).map((u) => allySourceOf(u.id)?.[0]).filter(Boolean))]
  const [own, ...allies] = await Promise.all([loadDatasheets(slug, { cp: roster?.cp }), ...srcs.map((s) => loadDatasheets(s))])
  const m = new Map()
  for (const d of own || []) m.set(d.id, d)
  srcs.forEach((src, i) => { for (const d of allies[i] || []) m.set(`${src}:${d.id}`, d) })
  return m
}
