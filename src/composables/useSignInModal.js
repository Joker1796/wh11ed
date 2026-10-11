import { ref } from 'vue'

// Module-singleton state of the sign-in dialog (SignInModal.vue, rendered by App.vue): every
// "Sign in" in the app opens it — the ⚙ menu, the install offer, the installed app's first run —
// and the path it was opened from travels with it, so a Yandex sign-in still comes back there.
const open = ref(false)
const returnTo = ref('')

export function useSignInModal() {
  return {
    open,
    returnTo,
    openSignIn: (from = '') => { returnTo.value = from; open.value = true },
    closeSignIn: () => { open.value = false },
  }
}
