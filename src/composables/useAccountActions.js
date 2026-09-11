import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from './useAuth.js'

// The two things any account control does — go in, go out — plus the name to show while you're
// in. Shared by the navbar's account dropdown (desktop) and the same entries inside the gear
// menu (mobile), so the pair can't drift apart.
//
// Signing in is a full-page trip to the provider and back, so the current path travels with it:
// whichever page you signed in from is the page you come back to.
export function useAccountActions() {
  const route = useRoute()
  const { status, user, login, logout, dev, mockSignIn, mockSignOut } = useAuth()

  // Yandex ID gives us an email for most accounts and a display name for the rest.
  const accountName = computed(() => user.value?.email || user.value?.displayName || '')

  function signIn() {
    login('yandex', route.fullPath)
  }

  // DEV-only: flip a fake session without the OAuth round trip (stripped from prod builds).
  function toggleMock() {
    if (status.value === 'authed') mockSignOut()
    else mockSignIn()
  }

  return { status, accountName, signIn, signOut: logout, dev, toggleMock }
}
