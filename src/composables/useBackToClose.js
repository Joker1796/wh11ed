import { getCurrentInstance, onBeforeUnmount, onMounted, onScopeDispose, watch } from 'vue'

// Android's Back — the button or the gesture — closes an open dialog instead of leaving the page,
// or, in the installed app opened straight onto a page, instead of closing the app. To the person
// holding the phone a full-height dialog IS a page, and Back is how they leave one.
//
// How: opening pushes a history entry that is a copy of the current one (same URL, the router's
// own state, plus a token). Back pops it → popstate → the dialog closes. vue-router sees a pop
// to the very location it is on and settles without moving anything (its scroll restore lands on
// the position it just saved). Closing by other means — X, Escape, backdrop, the parent flipping
// its flag — pops the copy itself, so Back afterwards still leaves the page as it always did.
//
// That self-pop is deferred a tick and re-checked, because a dialog that closes AND navigates in
// the same breath (search picking a result) has the router push its new entry right after the
// dialog unmounts: a history.back() issued in between would travel back from the NEW entry and
// undo the navigation. While the router reports a navigation in flight, or once the copy is no
// longer on top, the copy is left behind as a dead entry — and the popstate listener steps over
// dead entries whenever Back (or Forward) lands on one, so they never cost a press.
//
// Two entry points: useBackToClose is mount-based like useModalA11y — call it from a component
// that exists only while the dialog is open (BaseModal, ConfirmModal, SearchModal all do, through
// useModalA11y); useBackToCloseWhile follows a ref for an overlay that stays mounted and merely
// opens (the phone's navigation drawer).

const KEY = 'whDialog'
const open = new Map() // token → onClose, in opening order (tokens grow with it)
let seq = 0
let lastPosition = null // history.state.position last seen — at our push, or at a popstate
let lastSkipped = null // token of the dead entry stepped over most recently
let skipping = false // the next popstate is the landing of our own step-over
let navigating = false // a router navigation is in flight (guards registered once below)
let listening = false
const wiredRouters = new WeakSet()

function onPopState(e) {
  const state = e.state
  const token = state?.[KEY] || 0
  const pos = state?.position ?? null
  // Everything opened above the entry we landed on is closed, top first. `open` is deleted before
  // onClose runs so the dialog's unmount knows Back already popped its entry.
  for (const t of [...open.keys()].reverse()) {
    if (t <= token) break
    const close = open.get(t)
    open.delete(t)
    close()
  }
  if (skipping) {
    skipping = false
    lastPosition = pos
    return
  }
  const dead = token && !open.has(token)
  if (!dead) {
    lastPosition = pos
    lastSkipped = null
    return
  }
  // A dead copy sits at the same position as the entry below it, so equal positions are a Back
  // from further up — unless we bounced off this very entry a moment ago, which makes this the
  // Forward that follows. Step over it the way we were going.
  let dir = -1
  if (pos != null && lastPosition != null && (pos > lastPosition || (pos === lastPosition && lastSkipped === token))) dir = 1
  lastPosition = pos
  lastSkipped = token
  skipping = true
  history.go(dir)
}

function wire(router) {
  if (!listening) {
    listening = true
    window.addEventListener('popstate', onPopState)
  }
  if (!router || wiredRouters.has(router)) return
  wiredRouters.add(router)
  router.beforeEach(() => { navigating = true })
  router.afterEach(() => { navigating = false })
  router.onError(() => { navigating = false })
}

// Push the copy for an overlay that just opened; returns the function to call when it closes by
// any other means than Back.
function attach(onClose, router) {
  wire(router)
  const token = ++seq
  const base = history.state || {}
  lastPosition = base.position ?? null
  lastSkipped = null
  history.pushState({ ...base, [KEY]: token }, '', location.href)
  open.set(token, onClose)
  return () => {
    if (!open.has(token)) return // Back popped the entry itself
    open.delete(token)
    setTimeout(() => {
      if (navigating || history.state?.[KEY] !== token) return
      history.back()
    }, 0)
  }
}

// The router as it installed itself on the app, not an import from vue-router: dialogs are
// mounted without one in tests, and some tests mock the module away entirely.
const appRouter = () => getCurrentInstance()?.appContext.config.globalProperties.$router || null

export function useBackToClose(onClose) {
  const router = appRouter()
  let detach = null
  onMounted(() => { detach = attach(onClose, router) })
  onBeforeUnmount(() => { detach?.() })
}

export function useBackToCloseWhile(isOpen, onClose) {
  const router = appRouter()
  let detach = null
  watch(isOpen, (v) => {
    if (v) detach = attach(onClose, router)
    else { detach?.(); detach = null }
  }, { flush: 'sync' })
  onScopeDispose(() => { detach?.() })
}
