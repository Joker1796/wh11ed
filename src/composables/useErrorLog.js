// A ring buffer of the last few JS errors, attached to a bug report's tech block. This is what
// turns "the button does nothing" into a stack trace. Installed once from main.js — before the
// app mounts, so even a boot-time error is caught — and read only when a report is being built.

const MAX = 10
const errors = []

function push(entry) {
  errors.push({ t: new Date().toISOString(), ...entry })
  if (errors.length > MAX) errors.shift()
}

export function installErrorLog() {
  if (typeof window === 'undefined') return
  window.addEventListener('error', (e) => {
    push({
      msg: String(e.message || e.error || 'error').slice(0, 500),
      src: e.filename ? `${e.filename}:${e.lineno || 0}` : undefined,
      stack: e.error?.stack ? String(e.error.stack).slice(0, 1500) : undefined,
    })
  })
  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason
    push({
      msg: `unhandled rejection: ${String(r?.message || r).slice(0, 500)}`,
      stack: r?.stack ? String(r.stack).slice(0, 1500) : undefined,
    })
  })
}

export function recentErrors() {
  return errors.slice()
}
