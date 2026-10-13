import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from './useAuth.js'
import { useSignInModal } from './useSignInModal.js'

// The two things any account control does — go in, go out — plus the name to show while you're
// in. Shared by the navbar's account dropdown (desktop) and the same entries inside the gear
// menu (mobile), so the pair can't drift apart.
//
// Signing in opens the sign-in dialog (email + password, or Yandex). The current path travels with
// it: a Yandex sign-in is a full-page trip and comes back to whichever page it started from.
export function useAccountActions() {
  const route = useRoute()
  const { status, user, logout } = useAuth()
  const { openSignIn } = useSignInModal()

  // Yandex ID gives us an email for most accounts and a display name for the rest.
  const accountName = computed(() => user.value?.email || user.value?.displayName || '')

  // Resolves true: the dialog is open (a caller that is itself a menu or a card closes on it).
  async function signIn() {
    openSignIn(route.fullPath)
    return true
  }

  return { status, accountName, signIn, signOut: logout }
}
