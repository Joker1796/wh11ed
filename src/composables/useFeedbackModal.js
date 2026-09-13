import { ref } from 'vue'

// Module-singleton open/closed state for the bug-report dialog: the navbar's ⚙ menu and the
// footer both open it, App.vue renders it — a shared ref beats threading events through three
// layers (same pattern as the keyword popover).
const open = ref(false)

export function useFeedbackModal() {
  return {
    open,
    openFeedback: () => { open.value = true },
    closeFeedback: () => { open.value = false },
  }
}
