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
// whoever reads this must re-check the roster is still a draft (App.vue does).
const pendingDraftId = ref(null)

export function rememberDraft(id) {
  pendingDraftId.value = id || null
}

export function forgetDraft() {
  pendingDraftId.value = null
}

export function useRosterDraftResume() {
  return { pendingDraftId, rememberDraft, forgetDraft }
}
