// Compare the scope of attack re-rolls, independently for Hit and Wound rolls.
// Deliberately scoped to ones -> unrestricted upgrades and explicit single-roll grants;
// other re-roll prose is collected, but this wording change does not rewrite it.
import { foldChars } from '../../src/core/shared/foldName.js'

export function plain(text) {
  return foldChars(text).replace(/\[gloss:[^:\]]+:([^\]]+)\]/g, '$1')
    .replace(/\*\*|__/g, '').toLowerCase()
}

export function rerolls(text, locale) {
  if (typeof text !== 'string') return []
  const s = plain(text)
  const roll = /\b(?:(one|a single|any|all|a|the)\s+)?(hit|wound) rolls?\b(?:\s+of\s+(1(?:\s*(?:and|or|-)\s*2)?))?/g
  // Army tracker notes can retain the English roll name inside Russian prose.
  // JS \b is ASCII-only: Russian terms need a Unicode-aware boundary.
  const ruRoll = /(?:(один|любой|любые)\s+)?(?:брос(?:ок|ки)\s+(?:на\s+)?(попадани[ея]|ранени[ея]|ран)(?!\p{L})|(hit|wound) rolls?\b)/gu
  const result = []
  for (const m of s.matchAll(locale === 'en' ? roll : ruRoll)) {
    const before = s.slice(0, m.index)
    const clause = before.split(/[.!?;\n()]/).at(-1)
    const verb = locale === 'en' ? /re-?roll\b/g : /переброс\p{L}*|перебрасы\p{L}*/gu
    const verbs = [...clause.matchAll(verb)]
    // A colon introduces a list of rolls, each of which can be a separate sentence.
    const list = locale === 'en' ? /re-?roll:\s*(?:▪[^\n]*\n\s*)*▪\s*$/ : /переброс\p{L}*:\s*(?:▪[^\n]*\n\s*)*▪\s*$/u
    if (!verbs.length && !list.test(before)) continue
    const between = verbs.length ? clause.slice(verbs.at(-1).index) : ''
    if (locale === 'en' && /\b(?:add|subtract|improve|fails?)\b/.test(between)) continue
    if (locale === 'ru' && /(?:прибав|добав|выч|улучш)\p{L}*/u.test(between)) continue
    const kind = locale === 'en' ? m[2] : m[3] || (m[2].startsWith('попад') ? 'hit' : 'wound')
    const tail = s.slice(m.index + m[0].length)
    const ones = locale === 'en' ? m[3] : tail.match(/^(?:,?\s*(?:равн(?:ый|ые)|с результатом)?\s*)(1(?:\s*(?:и|или|-)\s*2)?)(?!\d)/)?.[1]
    let scope = ones ? ones.replace(/\s*(?:and|or|и|или|-)\s*/g, '-') : m[1] === 'one' || m[1] === 'a single' || m[1] === 'один' ? 'one' : 'any'
    if (locale === 'ru' && !ones && !m[1]) scope = 'unspecified'
    result.push({ kind, scope })
  }
  return result
}

export function needsUpgradeWording(en) {
  const rolls = rerolls(en, 'en')
  return ['hit', 'wound'].some(kind => rolls.some(r => r.kind === kind && r.scope === '1') && rolls.some(r => r.kind === kind && r.scope === 'any'))
}

export function checkPair(en, ru) {
  const expected = rerolls(en, 'en')
  const upgrade = needsUpgradeWording(en)
  if (!upgrade && !expected.some(r => r.scope === 'one')) return null
  const actual = rerolls(ru, 'ru')
  return JSON.stringify(expected) === JSON.stringify(actual) ? null : { expected, actual }
}
