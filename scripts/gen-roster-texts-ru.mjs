// Generate src/data/roster/ru/texts.js — Russian for the wargear GROUP INSTRUCTIONS shown in the
// roster's unit configuration ("The Sister Superior's boltgun can be replaced with one of the
// following:"). 967 of them, ~99 KB, all machine-extracted from appdata by gen-roster-data.mjs.
//
// WHY GENERATED AND NOT TRANSLATED BY HAND. This corpus is regenerated on every appdata bump, so
// a hand translation would go stale exactly as fast as GW ships datasheets — the same drift the
// modifier layer's hash pinning exists to catch, except here it would be 967 strings instead of a
// few hundred records. The sentences are also formulaic: a handful of frames wrapped around
// weapon and unit names, and those names STAY ENGLISH by project convention (see wh11ed/CLAUDE.md
// — unit/weapon names and ALL-CAPS keywords are never translated), so only the frame needs
// Russian at all.
//
// FAIL-OPEN, AND WHY IT MATTERS. A sentence is translated only when it matches a frame end to
// end. Anything else is left out of the output entirely and the UI falls back to the English
// original — a fully English line reads fine, half-translated Russian does not. Coverage is
// reported on every run; treat a drop after an appdata bump as a signal that GW introduced a new
// wording, not as noise.
//
// Usage:
//   node scripts/gen-roster-texts-ru.mjs          # write + report
//   node scripts/gen-roster-texts-ru.mjs --check  # report only; non-zero exit if stale
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, loadModule } from './lib/sync-common.mjs'

const OUT = path.join(ROOT, 'src/data/roster/ru/texts.js')

// ── Pieces every frame shares ───────────────────────────────────────────────────────────────
// A captured owner/subject slot is only trusted when it really is a bare noun phrase. The frames
// below use lazy `(.+?)` captures, which will happily swallow a leading condition ("If this unit
// contains 10 models, 1 Corsair Voidscarred") or a trailing qualifier ("1 Missionary model
// equipped with 1 plasma gun") and emit confident nonsense. Rejecting those makes the frame miss,
// and a miss leaves the whole sentence in English — which is the intended failure.
const SLOT_NOISE = /[,;:()◦•▫]|\bif\b|\bfor every\b|\bequipped with\b|\bthat is\b|\bthat has\b|\bcontains\b|\bwith\b|^(?:each of|any|all|up to|either)\b/i
const plainSlot = (raw) => {
  const s = (raw || '').trim()
  return !!s && s.length <= 48 && !SLOT_NOISE.test(s) && !s.includes('\n')
}

// A VALUE slot ("…replaced with X") must be a plain list of items. Some instructions chain a
// second frame inside it ("…replaced with 1 shuriken pistol and one of the following:"), which a
// lazy capture happily swallows, leaving an English clause embedded in a Russian sentence.
const VALUE_NOISE = /of the following|can be (?:replaced|equipped)|can replace|can take|duplicates are not allowed/i
const plainValue = (raw) => !!(raw || '').trim() && !VALUE_NOISE.test(raw)

// ── The item dictionary, and why the "and" glue needs it ────────────────────────────────────
// "tachyon arrow and Overlord's blade" is two weapons glued with "and"; "transonic razor and
// chordclaw" is ONE weapon's printed name. The sentences are indistinguishable, so the glue is
// translated exactly when the whole slot is not itself a known item and both halves are. The
// set is primed from src/data/roster/items.js by run() (and by tests).
let ITEM_NAMES = new Set()
const normName = (s) => s.toLowerCase().replace(/['’]/g, '’').replace(/\s+/g, ' ').trim()
const isItem = (s) => {
  const n = normName(s).replace(/^\d+\s+/, '')
  return ITEM_NAMES.has(n) || ITEM_NAMES.has(n.replace(/s$/, ''))
}
export const primeItemNames = (names) => { ITEM_NAMES = new Set(names.map(normName)) }
const slotRu = (s) => {
  if (isItem(s)) return s
  // "A, B and C" — a comma list closed by the glue; every part has to be an item.
  const commaParts = s.split(', ')
  if (commaParts.length > 1) {
    const pair = commaParts[commaParts.length - 1].split(' and ')
    if (pair.length === 2 && commaParts.slice(0, -1).every(isItem) && pair.every(isItem))
      return [...commaParts.slice(0, -1), pair.join(' и ')].join(', ')
    return s
  }
  // A bare pair — but either half may itself contain the connective ("autopistol and cult claws
  // and knife"), so every split point is tried, not just the first.
  for (const [en, ru] of [[' and ', ' и '], [' or ', ' или ']]) {
    for (let i = s.indexOf(en); i !== -1; i = s.indexOf(en, i + 1)) {
      const a = s.slice(0, i)
      const b = s.slice(i + en.length)
      if (isItem(a) && isItem(b)) return a + ru + b
    }
  }
  return s
}
// An "…is equipped with a plasma pistol and a power weapon" condition carries English articles a
// weapon list never does; drop them before the glue check so both halves are bare item names.
const condRu = (s) => slotRu(s.replace(/\b[Aa]n? /g, ''))

// The owner of a weapon: "This model", "The Sister Superior", "1 Battle Sister", "Each Wrack".
// Rendered in the genitive, which is the case every frame below needs it in.
// "Combat Servitor models" names a unit and then repeats the English noun; keeping it would read
// as "моделей Combat Servitor models".
const stripNoun = (s) => s.replace(/\s+in this unit$/i, '').replace(/(?:\s+|^)models?$/i, '').trim()
// " Raptors" or nothing at all — a bare "models" leaves no name to print, and a stray double
// space is exactly the kind of thing that makes generated text look generated.
const suffix = (s) => { const n = stripNoun(s); return n ? ` ${n}` : '' }

// "One Celestian Insidiant" is a count, not a name — normalised so the digit paths below apply
// ("модели One Celestian Insidiant" is the kind of thing this file exists to not print).
const oneToDigit = (s) => s.replace(/^[Oo]ne(?=\s)/, '1')

function ownerRu(raw) {
  const s = oneToDigit(stripNoun(raw.trim().replace(/^The\s+/i, '')))
  if (/^this$/i.test(s)) return 'этой модели'
  if (/^one$/i.test(s)) return 'одной модели'
  if (/^each$/i.test(s)) return 'каждой модели'
  if (/^this unit$/i.test(s)) return 'этого отряда'
  const n = s.match(/^(\d+)\s*(.*)$/)
  if (n) return n[2] ? `${n[1]} модели ${n[2]}` : `${n[1]} модели`
  return s ? `модели ${s}` : 'модели'
}

// The same owner as a SUBJECT ("… can be equipped with …"), so nominative.
function subjectRu(raw) {
  const s = oneToDigit(stripNoun(raw.trim().replace(/^The\s+/i, '')))
  if (/^this$/i.test(s)) return 'Эта модель'
  if (/^each$/i.test(s)) return 'Каждая модель'
  if (/^this unit$/i.test(s)) return 'Этот отряд'
  if (/^(it|one)$/i.test(s)) return /^it$/i.test(s) ? 'Отряд' : '1 модель'
  const n = s.match(/^(\d+)\s*(.*)$/)
  if (n) return n[2] ? `${n[1]} модель ${n[2]}` : `${n[1]} модель`
  return s ? `Модель ${s}` : 'Модель'
}

const verbFor = (raw) => {
  const n = raw.trim().replace(/^The\s+/i, '').match(/^(\d+)\s/)
  return n && n[1] !== '1' ? 'могут' : 'может'
}

// The subject mid-sentence ("Если эта модель…"), and the pronouns a conditional needs. Only the
// first letter is lowered — the rest of the string can be a unit's printed English name.
const subjLower = (raw) => { const s = subjectRu(raw); return s.charAt(0).toLowerCase() + s.slice(1) }
const isUnitSubj = (raw) => /^this unit$/i.test(stripNoun(raw.trim().replace(/^The\s+/i, '')))
const pronoun = (raw) => (isUnitSubj(raw) ? 'он' : 'она')
const possessive = (raw) => (isUnitSubj(raw) ? 'его' : 'её')
// A conditional's subject slot must not swallow a possessive chain ("this unit's Dire Avenger
// Exarch") — subjectRu would print confident nonsense for it.
const condSubj = (raw) => plainSlot(raw) && !/['’]s\b/.test(raw)
// "Sister Superior’s" → "Sister Superior", "Princeps’" → "Princeps".
const possOwner = (raw) => raw.replace(/[’']s$/i, '').replace(/[’']$/, '')

// ── Frames. Ordered: the first match wins, so the most specific come first. ──────────────────
const FRAMES = [
  // "Up to 2 Celestian Insidiants can each have their condemnor bolt pistol replaced with 1 X."
  {
    re: /^Up to (\d+) (.+?) can each have (?:their|its) (.+?) replaced with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(m[2]),
    ru: (m) => `До ${m[1]} моделей${suffix(m[2])} могут заменить ${slotRu(m[3])} на одно из:`,
  },
  {
    re: /^Up to (\d+) (.+?) can each have (?:their|its) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[2]) && plainValue(m[4]),
    ru: (m) => `До ${m[1]} моделей${suffix(m[2])} могут заменить ${slotRu(m[3])} на ${joinRu(m[4])}.`,
  },
  // "All models in this unit can each have their X replaced with …" (and "All of the models…").
  {
    re: /^All (?:of the )?models in this unit can each have (?:their|its) (.+?) replaced with (?:one|1) of the following:?\s*$/i,
    ru: (m) => `Все модели отряда могут заменить ${slotRu(m[1])} на одно из:`,
  },
  {
    re: /^All (?:of the )?models in this unit can each have (?:their|its) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainValue(m[2]),
    ru: (m) => `Все модели отряда могут заменить ${slotRu(m[1])} на ${joinRu(m[2])}.`,
  },
  // "Any number of models can each be equipped with …" / "All models in this unit can each be…"
  {
    re: /^(?:Any number of models|All (?:of the )?models in this unit) can each be equipped with (?:one|1) of the following:?\s*$/i,
    ru: () => 'Каждая модель отряда может получить одно из:',
  },
  {
    re: /^(?:Any number of models|All (?:of the )?models in this unit) can each be equipped with (.+?)\.?$/i,
    ok: (m) => plainValue(m[1]),
    ru: (m) => `Каждая модель отряда может получить ${joinRu(m[1])}.`,
  },
  // "Any number of Boyz can each be equipped with 1 shoota."
  {
    re: /^Any number of (.+?) can each be equipped with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `Любое количество моделей${suffix(m[1])} может получить одно из:`,
  },
  {
    re: /^Any number of (.+?) can each be equipped with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[2]),
    ru: (m) => `Любое количество моделей${suffix(m[1])} может получить ${joinRu(m[2])}.`,
  },
  // "Any number of models can each replace their X with …"
  {
    re: /^Any number of (.+?) can each replace (?:their|its) (.+?) with (?:one|1) of the following:?\s*$/i,
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${slotRu(m[2])} на одно из:`,
  },
  {
    re: /^Any number of (.+?) can each replace (?:their|its) (.+?) with (.+?)\.?$/i,
    ok: (m) => plainValue(m[3]),
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${slotRu(m[2])} на ${joinRu(m[3])}.`,
  },
  // "The Skyreaver Felarch can replace its shuriken pistol with one of the following:"
  {
    re: /^(.+?) can replace (?:its|their) (.+?) with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} заменить ${slotRu(m[2])} на одно из:`,
  },
  {
    re: /^(.+?) can replace (?:its|their) (.+?) with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[3]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} заменить ${slotRu(m[2])} на ${joinRu(m[3])}.`,
  },
  // "The Voidreaver Felarch can be equipped with:" — the list follows as its own block.
  {
    re: /^(.+?) can be equipped with:\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} получить:`,
  },
  // "Any number of models can each have their hallowed mace replaced with …", and the same with
  // a named unit instead of the bare "models" ("Any number of Sisters Novitiate can each have…").
  {
    re: /^Any number of (.+?) can each have (?:their|its) (.+?) replaced with (?:one|1) of the following:?\s*$/i,
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${slotRu(m[2])} на одно из:`,
  },
  {
    re: /^Any number of (.+?) can each have (?:their|its) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainValue(m[3]),
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${slotRu(m[2])} на ${joinRu(m[3])}.`,
  },
  // "1 Missionary model can have its 1 plasma gun replaced with 1 meltagun." — and the bare
  // "1 model can have its boltgun and power weapon replaced with …" with no unit name at all.
  {
    re: /^(\d+)(?: (.+?))?(?: models?)? can (?:each )?have (?:its|their) (.+?) replaced with (?:one|1) of the following:?\s*$/i,
    ok: (m) => (!m[2] || plainSlot(m[2])) && !/\bor (?:its|their)\b/i.test(m[3]),
    ru: (m) => `${m[1]} модель${suffix(m[2] || '')} может заменить ${slotRu(m[3])} на одно из:`,
  },
  {
    re: /^(\d+)(?: (.+?))?(?: models?)? can (?:each )?have (?:its|their) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => (!m[2] || plainSlot(m[2])) && !/\bor (?:its|their)\b/i.test(m[3]) && plainValue(m[4]),
    ru: (m) => `${m[1]} модель${suffix(m[2] || '')} может заменить ${slotRu(m[3])} на ${joinRu(m[4])}.`,
  },
  // "The Sister Superior's boltgun can be replaced with one of the following:" — the owner may
  // end in an s-final possessive too ("the Princeps’ transonic razor"), stripped back to the name.
  {
    re: /^(?:The\s+)?(.+?(?:[’']s|s[’'])) (.+?) can be replaced with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(possOwner(m[1])),
    ru: (m) => `${slotRu(m[2])} ${ownerRu(possOwner(m[1]))} можно заменить на одно из:`,
  },
  {
    re: /^(?:The\s+)?(.+?(?:[’']s|s[’'])) (.+?) can be replaced with:\s*$/i,
    ok: (m) => plainSlot(possOwner(m[1])),
    ru: (m) => `${slotRu(m[2])} ${ownerRu(possOwner(m[1]))} можно заменить на:`,
  },
  {
    re: /^(?:The\s+)?(.+?(?:[’']s|s[’'])) (.+?) can be replaced with (.+?)\.?$/i,
    ok: (m) => plainSlot(possOwner(m[1])) && plainValue(m[3]),
    ru: (m) => `${slotRu(m[2])} ${ownerRu(possOwner(m[1]))} можно заменить на ${joinRu(m[3])}.`,
  },
  // "1 Battle Sister equipped with 1 boltgun can be equipped with 1 simulacrum imperialis"
  {
    re: /^(.+?) can be equipped with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} получить одно из:`,
  },
  {
    re: /^(.+?) can be equipped with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[2]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} получить ${joinRu(m[2])}.`,
  },
  // "If this model is equipped with a plasma pistol and a power weapon, it can be equipped
  // with…" — plus the negated form the daemonic icons and the resurrection orb use, and the
  // "…its X can be replaced" tail. "[Il]f": appdata itself ships one "lf this model…" typo.
  {
    re: /^[Il]f (.+?) is (not )?equipped with (?:an? )?(.+?), it can be equipped with(?: (?:one|1) of the following)?:\s*$/i,
    ok: (m) => condSubj(m[1]),
    ru: (m) => `Если ${subjLower(m[1])} ${m[2] ? 'не имеет' : 'имеет'} ${condRu(m[3])}, ${pronoun(m[1])} может получить одно из:`,
  },
  {
    re: /^[Il]f (.+?) is (not )?equipped with (?:an? )?(.+?), it can be equipped with (.+?)\.?$/i,
    ok: (m) => condSubj(m[1]) && plainValue(m[4]),
    ru: (m) => `Если ${subjLower(m[1])} ${m[2] ? 'не имеет' : 'имеет'} ${condRu(m[3])}, ${pronoun(m[1])} может получить ${joinRu(m[4])}.`,
  },
  {
    re: /^[Il]f (.+?) is (not )?equipped with (?:an? )?(.+?), (?:its|their) (.+?) can be replaced with (.+?)\.?$/i,
    ok: (m) => condSubj(m[1]) && plainValue(m[5]),
    ru: (m) => `Если ${subjLower(m[1])} ${m[2] ? 'не имеет' : 'имеет'} ${condRu(m[3])}, ${possessive(m[1])} ${slotRu(m[4])} можно заменить на ${joinRu(m[5])}.`,
  },
  // "1 Bloodletter that is not equipped with a daemonic icon can be equipped with 1 instrument
  // of Chaos." — restricted to a count of 1: «модель, не имеющая» does not decline past it.
  {
    re: /^(?:1|One) (other )?(.+?) that is (not )?equipped with (?:an? )?(.+?) can be equipped with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[2]) && plainValue(m[5]),
    ru: (m) => `1 ${m[1] ? 'другая ' : ''}модель${suffix(m[2])}, ${m[3] ? 'не имеющая' : 'имеющая'} ${condRu(m[4])}, может получить ${joinRu(m[5])}.`,
  },
  // "1 Battle Sister equipped with 1 boltgun can be equipped with one of the following:"
  {
    re: /^(?:1|One) (.+?)(?: models?)? equipped with (?:an? |1 )?(.+?) can be equipped with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]) && plainSlot(m[2]),
    ru: (m) => `1 модель${suffix(m[1])}, имеющая ${condRu(m[2])}, может получить одно из:`,
  },
  {
    re: /^(?:1|One) (.+?)(?: models?)? equipped with (?:an? |1 )?(.+?) can be equipped with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainSlot(m[2]) && plainValue(m[3]),
    ru: (m) => `1 модель${suffix(m[1])}, имеющая ${condRu(m[2])}, может получить ${joinRu(m[3])}.`,
  },
  // A bare "X can be replaced with …" with no possessive owner.
  {
    re: /^(.+?) can be replaced with (?:one|1) of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${slotRu(m[1])} можно заменить на одно из:`,
  },
  {
    re: /^(.+?) can be replaced with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[2]),
    ru: (m) => `${slotRu(m[1])} можно заменить на ${joinRu(m[2])}.`,
  },
]

// "For every 5 models in the unit: <clause> ◦ <clause>" — the head is translated here and each
// clause goes back through the frames, so this composes instead of needing its own copies.
const FOR_EVERY = /^For every (\d+) (models|.+?) in (?:the|this) unit[:,]\s*([\s\S]*)$/i

// "If this unit contains 10 models, <clause>" / "…contains 9 or fewer models: <clause>" — same
// composition: the head is translated here, the clause goes back through the frames.
const CONTAINS = /^[Il]f this unit contains (\d+)( or fewer| or more)? models[:,]\s*([\s\S]*)$/i

// Many instructions spell the choices out as a bullet list under the sentence
// ("…one of the following:\n• 1 holy eviscerator\n• 1 Ministorum hand flamer"). The list is
// nothing but weapon names and counts, which stay English anyway, so it is split off, the
// sentence above it translated, and the list re-attached with its line structure intact (only
// the counted-item connective inside each bullet is translated).
const LIST_HEAD = /^([\s\S]*?(?:one|1) of the following:)\s*([\s\S]+)$/i

// "1 vexilla and 1 misericordia" — the connective between counted items is glue, not part of a
// weapon name, so it is safe to translate. Anchored on the count so a name containing "and"
// ("shield and sword") is left alone.
// …and "up to 4 big shootas" opens a value with an English quantifier rather than a name.
// The parenthetical notes some bullets carry are as formulaic as the frames; the ones below are
// every wording the corpus contains. An unrecognised note simply stays English inside its bullet.
const noteRu = (s) => s
  .replace(/\((?:that|this) model[’']s (.+?) cannot be replaced\)/gi, (_, w) => `(${slotRu(w)} этой модели нельзя заменить)`)
  .replace(/\(these models[’'] (.+?) cannot be replaced\)/gi, (_, w) => `(${slotRu(w)} этих моделей нельзя заменить)`)
  .replace(/\(a model cannot be equipped with more than one (.+?)\)/gi, '(модель не может иметь больше одного $1)')
  .replace(/\* (?:that|this) model[’']s (.+?) cannot be replaced\./gi, (_, w) => `* ${slotRu(w)} этой модели нельзя заменить.`)
  .replace(/\. (?:That|This) model[’']s (.+?) cannot be replaced$/i, (_, w) => `. ${slotRu(w)} этой модели нельзя заменить`)

const joinRu = (s) => noteRu(s)
  .replace(/ and (?=\d)/g, ' и ')
  .replace(/^up to (?=\d)/i, 'до ')
  .replace(/^one (?=[A-Z])/, '1 ')

function translateClause(text) {
  // appdata occasionally leaks a list marker into the instruction itself ("■ This model's …"),
  // and the odd no-break space where a frame expects a plain one ("…replaced with 1 twin…").
  let s = text.replace(/[   ]/g, ' ').trim().replace(/^■\s*/, '')
  if (!s) return null

  const list = s.match(LIST_HEAD)
  let tail = ''
  if (list) {
    s = list[1].trim()
    // Kept line-per-line: the bullets are a list, and the UI renders one row per line. Only the
    // counted-item connective inside a bullet is translated (joinRu) — the names themselves stay
    // English by convention, so the bullet is already correct Russian apart from that glue.
    tail = `\n${list[2].trim().split('\n').map((l) => joinRu(l.trim())).join('\n')}`
  }

  for (const f of FRAMES) {
    const m = s.match(f.re)
    if (!m) continue
    if (f.ok && !f.ok(m)) continue
    const ru = f.ru(m)
    // The last line of defence: a slot the guards above didn't think of can still smuggle frame
    // English into the translated sentence ("…Piranha burst cannon can be на…"). Item names never
    // use these words, so their presence means the capture went wrong — fall back to English.
    // The bullet tail is exempt: its notes stay English by design when noteRu doesn't know them.
    if (/\b(?:can|cannot|following|replaced?|equipped)\b/i.test(ru)) return null
    // appdata contains stray double spaces; they read as a generator slip once inside Russian.
    return (ru + tail).replace(/[ \t]{2,}/g, ' ')
  }
  return null
}

// A translated head glued onto the rest of the sentence, which goes back through the frames.
// One clause first — that same ◦ bullet also separates the entries of an option list
// ("…one of the following: ◦ 1 X ◦ 1 Y"), and splitting blindly tore those lists into fragments
// that translate to nothing. Multi-clause tails are re-emitted in the source's own layout — one
// bullet per line, marker included (joining them into a single line with inline ◦ separators
// read as one run-on sentence and lost the first bullet's marker entirely).
function composed(head, rest) {
  // A rest that IS the bullet list ("If this unit contains 10 models:\n◦ The Leader can…") has
  // no whole-sentence reading — go straight to the per-bullet path.
  const whole = /^[◦•▫]/.test(rest.trim()) ? null : translateClause(rest)
  if (whole) return head + whole

  const parts = rest.split(/\s*◦\s*/).map((p) => p.trim()).filter(Boolean)
  if (!parts.length) return null
  const out = parts.map(translateClause)
  if (out.some((p) => p === null)) return null // all or nothing
  return `${head.trimEnd()}\n${out.map((p) => `◦ ${p.replace(/\.$/, '')}`).join('\n')}`
}

export function translate(text) {
  const s = (text || '').trim()
  if (!s) return null

  const every = s.match(FOR_EVERY)
  if (every) {
    const who = /^models$/i.test(every[2]) ? '' : `${suffix(every[2])}`
    if (who && !plainSlot(every[2])) return null
    return composed(`На каждые ${every[1]} моделей${who} в отряде: `, every[3])
  }

  const contains = s.match(CONTAINS)
  if (contains) {
    const bound = contains[2] ? (/fewer/i.test(contains[2]) ? ' или меньше' : ' или больше') : ''
    return composed(`Если в отряде ${contains[1]}${bound} моделей: `, contains[3])
  }

  return translateClause(s)
}

export async function run(argv = process.argv.slice(2)) {
  const check = argv.includes('--check')
  const mod = await loadModule(path.join(ROOT, 'src/data/roster/items.js'))
  const texts = mod?.default?.texts
  if (!texts) {
    console.log('  ⚠ could not read src/data/roster/items.js — run `npm run roster:data` first.')
    return 0
  }
  primeItemNames(Object.values(mod.default.items || {}))

  const out = {}
  const missed = []
  for (const [id, en] of Object.entries(texts)) {
    const ru = translate(en)
    if (ru) out[id] = ru
    else missed.push(en)
  }

  const total = Object.keys(texts).length
  const done = Object.keys(out).length
  console.log(`  ${done}/${total} instructions translated (${Math.round((done / total) * 100)}%), ${missed.length} left in English`)
  if (missed.length) {
    console.log('  untranslated wordings (first 5):')
    for (const m of missed.slice(0, 5)) console.log(`    • ${m.slice(0, 110)}`)
  }

  const body = `// Generated by gen-roster-texts-ru.mjs — do not edit. Re-run \`npm run roster:texts-ru\`.\n`
    + `// Russian for the wargear group instructions. Weapon and unit names stay English by project\n`
    + `// convention, so only the sentence frame is translated. A wording the generator doesn't\n`
    + `// recognise is absent here on purpose — the UI falls back to the English original rather\n`
    + `// than showing a half-translated line.\n`
    + `export default ${JSON.stringify(out, null, 2)}\n`

  const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null
  if (check) {
    if (prev !== body) {
      console.log('  --check: src/data/roster/ru/texts.js is stale; run `npm run roster:texts-ru`.')
      return 1
    }
    console.log('  --check: up to date.')
    return 0
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  if (prev !== body) fs.writeFileSync(OUT, body)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
