import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join, basename } from 'node:path'

// A parent listening for an event its child never emits fails silently: Vue passes the listener
// down as a native one, nothing fires it, and the button it hangs on just does nothing. That is how
// every lobby confirmation shipped in v2.7.0 with `@cancel` on a ConfirmModal that emits `close` —
// the ×, Back and the phone's back gesture all dead (a player's report, 2026-09-24).
//
// So: for every component that declares its emits as an array, each `@event` a template puts on it
// must be one of them. Native DOM events a component's root can legitimately receive through
// attribute fallthrough are allowed; `cancel` is deliberately NOT among them.
const NATIVE = new Set(['click', 'keydown', 'keyup', 'input', 'change', 'focus', 'blur', 'mouseenter',
  'mouseleave', 'pointerdown', 'pointerup', 'submit', 'touchstart', 'scroll', 'transitionend'])

function vueFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? vueFiles(join(dir, e.name)) : e.name.endsWith('.vue') ? [join(dir, e.name)] : [])
}

// Vue treats `toggle-open`, `toggleOpen` and `update:model-value` / `update:modelValue` as one
// event, so both sides are compared camelised.
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

const files = vueFiles('src')
const emitsOf = new Map()
for (const f of files) {
  const m = readFileSync(f, 'utf8').match(/defineEmits\(\[([^\]]*)\]\)/)
  if (m) emitsOf.set(basename(f, '.vue'), new Set([...m[1].matchAll(/'([^']+)'/g)].map((x) => camel(x[1]))))
}

describe('component listeners', () => {
  it('finds components to check', () => {
    expect(emitsOf.get('ConfirmModal')).toEqual(new Set(['confirm', 'close']))
  })

  it('listens only for events the component emits', () => {
    const bad = []
    for (const f of files) {
      const src = readFileSync(f, 'utf8')
      const template = src.slice(0, src.indexOf('<script'))
      for (const [, name, attrs] of template.matchAll(/<([A-Z][A-Za-z0-9]+)\b([^>]*?)\/?>/gs)) {
        const emits = emitsOf.get(name)
        if (!emits) continue
        for (const [, ev] of attrs.matchAll(/(?:@|v-on:)([a-zA-Z][\w:-]*)/g)) {
          const evt = camel(ev.split('.')[0])
          if (!emits.has(evt) && !NATIVE.has(evt)) bad.push(`${f}: <${name} @${evt}>`)
        }
      }
    }
    expect(bad).toEqual([])
  })
})
