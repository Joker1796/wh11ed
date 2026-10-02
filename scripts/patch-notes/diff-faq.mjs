// FAQ & errata between two generations of src/data/factionFaq.json: an entry is its question (Q&A)
// or its header (errata) — what GW changed is the answer or the errata's body. A Space Marine
// Chapter's file carries the Codex: Space Marines entries too (gen-faction-faq.mjs folds them in);
// those are reported once, under Space Marines.
const CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])
const key = (s) => (s || '').toLowerCase().replace(/[‘’`]/g, "'").replace(/[“”]/g, '"').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
const idOf = (e) => `${e.type}|${key(e.type === 'qa' ? e.q : e.header)}`
const textOf = (e) => (e.type === 'qa' ? e.a : e.body) || ''
const titleOf = (e) => (e.type === 'qa' ? e.q : e.header) || ''

export function diffFaq(a, b) {
  const out = []
  const smIds = (f) => new Set((f?.['space-marines']?.entries || []).map((e) => `${idOf(e)}|${key(textOf(e))}`))
  const smA = smIds(a)
  const smB = smIds(b)
  for (const slug of new Set([...Object.keys(a || {}), ...Object.keys(b || {})])) {
    const own = (f, sm) => (f?.[slug]?.entries || []).filter((e) => !CHAPTERS.has(slug) || !sm.has(`${idOf(e)}|${key(textOf(e))}`))
    const A = new Map(own(a, smA).map((e) => [idOf(e), e]))
    const B = new Map(own(b, smB).map((e) => [idOf(e), e]))
    for (const [k, e] of B) {
      const o = A.get(k)
      if (!o) out.push({ faction: slug, kind: 'faq', type: e.type, name: titleOf(e), change: 'added', to: textOf(e) })
      else if (key(textOf(o)) !== key(textOf(e))) out.push({ faction: slug, kind: 'faq', type: e.type, name: titleOf(e), change: 'changed', fields: [{ field: 'text', from: textOf(o), to: textOf(e) }] })
    }
    for (const [k, e] of A) if (!B.has(k)) out.push({ faction: slug, kind: 'faq', type: e.type, name: titleOf(e), change: 'removed' })
  }
  return out
}
