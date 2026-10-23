// A ring buffer of the last few JS errors, attached to a bug report's tech block. This is what
// turns "the button does nothing" into a stack trace. Installed once from main.js — before the
// app mounts, so even a boot-time error is caught — and read only when a report is being built.
//
// Since 2026-10-14 it can also SEND them (wh11ed-api POST /errors, counted aggregates, nobody
// identified) — only for a visitor who switched it on: off by default (owner). A signed-in player
// who runs into a real error is asked once per browser (ErrorReportsOffer.vue, lazy); the answer
// is remembered here. Noise is dropped before anything is kept for sending: browser extensions,
// the resize-observer warning, cross-origin "Script error.", anything while offline. A chunk that
// failed to load is sent marked `chunk` (staleChunks.js reloads the page for it) and never prompts.
import { API_BASE_URL } from '../config.js'
import { APP_VERSION } from '../buildInfo.js'
import { APP_DATA_VERSION } from '../data/appDataVersion.js'
import { getItem, setItem } from './safeStorage.js'
import { isChunkLoadError } from './staleChunks.js'

const MAX = 10
const errors = []

export const ERROR_REPORTS_KEY = 'wh11ed-error-reports' // '1' = send
export const ERROR_OFFER_KEY = 'wh11ed-error-reports-offered' // asked in this browser, whatever the answer
const HELLO_KEY = 'wh11ed-error-reports-hello' // the day this browser last said "I report"
const PER_PAGE = 5 // distinct errors sent per page load
const FLUSH_MS = 3000

const NOISE = /^(ResizeObserver loop|Script error\.?$)|extension:\/\/|safari-(web-)?extension:/
const sent = new Set() // fingerprints already sent (or offered) in this page load
let queue = []
let timer = 0
const unsent = [] // real errors seen while sending was off — the offer sends them if accepted
const listeners = new Set()

export const reportsOn = () => getItem(ERROR_REPORTS_KEY, '') === '1'

// What identifies an error for de-duplication in this page load; the server makes its own.
const fp = (e) => `${e.kind}|${e.msg.replace(/\d+/g, 'N').slice(0, 200)}|${(e.stack || '').split('\n').find((l) => /:\d+:\d+/.test(l)) || ''}`

function push(entry) {
  errors.push({ t: new Date().toISOString(), ...entry })
  if (errors.length > MAX) errors.shift()
  report(entry)
}

function report(entry) {
  const text = `${entry.msg} ${entry.src || ''} ${entry.stack || ''}`
  if (NOISE.test(entry.msg) || NOISE.test(text) || navigator.onLine === false) return
  const e = { kind: entry.kind, msg: entry.msg.slice(0, 500), stack: entry.stack?.slice(0, 2000), src: entry.src?.slice(0, 300) }
  if (isChunkLoadError(entry.msg)) e.kind = 'chunk'
  const key = fp(e)
  if (sent.has(key) || sent.size >= PER_PAGE) return
  sent.add(key)
  if (reportsOn()) return enqueue(e)
  if (e.kind === 'chunk') return
  unsent.push(e)
  for (const fn of listeners) fn()
}

function enqueue(e) {
  queue.push(e)
  clearTimeout(timer)
  timer = setTimeout(flush, FLUSH_MS)
}

function payload(extra) {
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
  return {
    channel: import.meta.env.VITE_BETA === '1' ? 'beta' : 'prod',
    appVersion: APP_VERSION || '0.0.0',
    dataVersion: APP_DATA_VERSION,
    locale: location.pathname.startsWith('/ru') ? 'ru' : 'en',
    standalone,
    route: location.pathname, // never the query or the hash: a shared roster rides in the hash
    ...extra,
  }
}

function post(body) {
  // text/plain and no credentials: a CORS "simple request" — no preflight, and `keepalive` lets
  // it finish after the tab closes.
  fetch(`${API_BASE_URL}/errors`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'text/plain' }, credentials: 'omit', keepalive: true }).catch(() => {})
}

function flush() {
  clearTimeout(timer)
  const today = new Date().toISOString().slice(0, 10)
  const hello = getItem(HELLO_KEY, '') !== today
  if (!queue.length && !hello) return
  if (hello) setItem(HELLO_KEY, today)
  post(payload({ errors: queue.splice(0, 10), ...(hello ? { hello: true } : {}) }))
}

/** Switch sending on or off. On sends what was seen this page load and says hello for the day. */
export function setErrorReports(on) {
  setItem(ERROR_REPORTS_KEY, on ? '1' : '')
  if (!on) return
  queue.push(...unsent.splice(0))
  flush()
}

/** The offer's trigger: a real error seen while sending is off. Returns the unsubscribe. */
export function onUnsentError(fn) {
  listeners.add(fn)
  if (unsent.length) fn()
  return () => listeners.delete(fn)
}

// A stack kept to 1500 characters, its top AND its bottom: a stack overflow ("too much recursion",
// Firefox, 2.10.0) is thrown wherever the stack ran out, and its first ten frames named only that
// spot — the loop that filled it was in the part cut off.
const STACK_MAX = 1500
export function trimStack(stack) {
  const s = String(stack)
  if (s.length <= STACK_MAX) return s
  const lines = s.split('\n')
  const head = []
  const tail = []
  let room = STACK_MAX - 40 // the "… N frames …" line
  let i = 0
  let j = lines.length - 1
  while (i <= j) {
    const top = head.length <= tail.length
    const line = top ? lines[i] : lines[j]
    if (line.length + 1 > room) break
    if (top) { head.push(line); i++ } else { tail.unshift(line); j-- }
    room -= line.length + 1
  }
  return [...head, `    … ${j - i + 1} frames …`, ...tail].join('\n')
}

// Where Vue caught it. A dev build says it in words ("render function"); a production one gives a
// link to the error reference, cut down here to its code ("runtime-1") — cut by length, the link
// left "https://vuejs.org/error-refere" and nothing that told one place from another.
const vueWhere = (info) => String(info).replace(/^https?:\/\/vuejs\.org\/error-reference\/#?/, '').slice(0, 30)

/** An error Vue caught in a component (main.js errorHandler): it never reaches window.onerror. */
export function logError(err, info) {
  push({
    kind: 'error',
    msg: `${String(err?.message || err).slice(0, 460)}${info ? ` [vue: ${vueWhere(info)}]` : ''}`,
    stack: err?.stack ? trimStack(err.stack) : undefined,
  })
}

export function installErrorLog() {
  if (typeof window === 'undefined') return
  window.addEventListener('error', (e) => {
    push({
      kind: 'error',
      msg: String(e.message || e.error || 'error').slice(0, 500),
      src: e.filename ? `${e.filename}:${e.lineno || 0}` : undefined,
      stack: e.error?.stack ? trimStack(e.error.stack) : undefined,
    })
  })
  window.addEventListener('unhandledrejection', (e) => {
    const r = e.reason
    push({
      kind: 'rejection',
      msg: `unhandled rejection: ${String(r?.message || r).slice(0, 500)}`,
      stack: r?.stack ? trimStack(r.stack) : undefined,
    })
  })
  // A batch still waiting goes now, as the page is hidden or closed; a reporting browser says
  // hello once a day even on a page without errors (the digest's count of reporters).
  window.addEventListener('pagehide', flush)
  if (reportsOn()) setTimeout(flush, FLUSH_MS)
}

export function recentErrors() {
  return errors.slice()
}
