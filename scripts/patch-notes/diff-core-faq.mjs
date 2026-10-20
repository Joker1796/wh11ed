// The Core Rules FAQ & errata between two app versions — appdata's tables/faq.json, the rows of the
// Core Rules publication. Until 2026-10-20 the page read FAQ only from src/data/factionFaq.json,
// which is the factions' own, and 32 Core Rules answers GW added in 931, 963 and 981 never showed.
//
// An entry is its question (Q&A) or its header (errata), as for the factions (diff-faq.mjs); what GW
// changed is the answer or the errata's body. Rows are paired by text, not id: the key IS the
// question. Noise a real update produced:
//   • 963 dropped the "Q:"/"A:" a few rows opened on — the same entry;
//   • 981 printed the Firing Deck question three times, its example growing — one question, the
//     longest answer standing for it (check-core-faq.mjs reads it the same way).
import { plain, readable } from './diff-bundles.mjs'

const unprefixed = (s) => String(s || '').replace(/^\s*(?:<[^>]+>\s*)*[QA]:\s*/i, '')
const key = (s) => plain(unprefixed(s)).toLowerCase().replace(/[.?]$/, '').replace(/\s+/g, ' ').trim()

/** The Core Rules entries of one app version, one per question. @returns {Map<string, object>} */
function entries(faq, publications) {
  const pub = (publications || []).find((p) => (p.localisations?.en?.name || p.name) === 'Core Rules')
  const out = new Map()
  for (const r of (faq || []).filter((x) => pub && x.publicationId === pub.id)) {
    const l = r.localisations?.en || {}
    const e = l.question
      ? { type: 'qa', name: unprefixed(l.question), text: unprefixed(l.answer) }
      : { type: 'errata', name: l.errataHeader || '', text: l.errataText || '' }
    const k = `${e.type}|${key(e.name)}`
    if (!out.has(k) || e.text.length > out.get(k).text.length) out.set(k, e)
  }
  return out
}

/**
 * @param {{ faq: object[], publications: object[] }|null} a the older version's tables
 * @param {{ faq: object[], publications: object[] }|null} b the newer one's
 */
export function diffCoreFaq(a, b) {
  // A version without the table (the first ones appdata kept) says nothing about what changed.
  if (!a?.faq || !b?.faq) return []
  const A = entries(a?.faq, a?.publications)
  const B = entries(b?.faq, b?.publications)
  const out = []
  // The question is the entry's name, a plain line on the page: no bold, no paragraphs.
  const item = (e, rest) => ({ faction: null, kind: 'faq', type: e.type, name: readable(e.name).replace(/\*\*|__/g, '').replace(/\n+/g, ' '), ...rest })
  for (const [k, e] of B) {
    const o = A.get(k)
    if (!o) out.push(item(e, { change: 'added', to: readable(e.text) }))
    else if (key(o.text) !== key(e.text)) out.push(item(e, { change: 'changed', fields: [{ field: 'text', from: readable(o.text), to: readable(e.text) }] }))
  }
  for (const [k, e] of A) if (!B.has(k)) out.push(item(e, { change: 'removed' }))
  return out
}
