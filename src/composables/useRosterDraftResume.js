import { ref } from 'vue'

// "You left a roster half-built" — the one thing MobileUtilityBar needs that no screen can
// contribute through useMobileActionBar, because the button has to appear on the pages the
// wizard was left FOR (a faction's rules, another faction's datasheets) long after
// RosterCreateView unmounted. Module-singleton, same pattern as useMobileActionBar.js.
//
// Deliberately NOT "a draft exists". A draft is persistent and can sit on the Drafts tab for
// weeks; pinning a chip to every page until it's deleted would be nagging, not helping. This
// is scoped to the detour: set when the wizard is left, dropped when it's reopened, gone with
// the tab. Deliberately in memory only for the same reason — and a relaunch doesn't need it,
// since the stored last route now carries the wizard's own `?draft=` (see useViewRestore.js).
//
// The id is a hint, not a promise: the draft can be saved or deleted while the chip is up, so
// the chip asks `draftToResume()`, which re-checks it is still a draft. The check is handed over by
// the wizard (`isDraft`, over the roster store) rather than imported here: App.vue reads this on
// every page, and a static import of the roster store would put it in the app shell every visitor
// downloads (src/shellImports.test.js). When there is an id, the wizard has run and the store is
// loaded.
const pendingDraftId = ref(null)
let stillDraft = null

export function rememberDraft(id, isDraft) {
  stillDraft = isDraft || null
  pendingDraftId.value = id || null
}

export function forgetDraft() {
  stillDraft = null
  pendingDraftId.value = null
}

/** The draft to offer a way back to, or null. Reactive through the store `isDraft` reads. */
export function draftToResume() {
  const id = pendingDraftId.value
  return id && stillDraft?.(id) ? id : null
}

export function useRosterDraftResume() {
  return { pendingDraftId, rememberDraft, forgetDraft, draftToResume }
}
