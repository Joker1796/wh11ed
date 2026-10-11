import { ref } from 'vue'

// Module-singleton state of the sign-in dialog (SignInModal.vue, rendered by App.vue): every
// "Sign in" in the app opens it — the ⚙ menu, the install offer, the installed app's first run —
// and the path it was opened from travels with it, so a Yandex sign-in still comes back there.
const open = ref(false)
const returnTo = ref('')
// What the dialog opens on: 'login' for a guest; 'add' (an email + password for a Yandex account)
// or 'change' (a new password) from the ⚙ menu of a signed-in player.
const startMode = ref('login')

export function useSignInModal() {
  return {
    open,
    returnTo,
    startMode,
    openSignIn: (from = '', mode = 'login') => { returnTo.value = from; startMode.value = mode; open.value = true },
    closeSignIn: () => { open.value = false },
  }
}
