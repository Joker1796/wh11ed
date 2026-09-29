import { computed, ref } from 'vue'
import { issueText } from './rosterValidation.js'

// Saving a list whose Force Disposition is not declared asks first (owner, 2026-09-29). It is a
// warning, not an error — the builder never blocks — but it is the one the list itself does not
// show, and it decides the Primary Mission the army plays. So Save says so once and offers the
// way back to it; "save anyway" is always there. The editor and the creation wizard both put their Save through
// `guard`, each deciding what "go and choose it" opens (its settings).
export function useDispositionGate(validation, labels) {
  const open = ref(false)
  const issue = computed(() => validation.value.issues.find((i) => i.code === 'dispositionUndeclared') || null)
  const message = computed(() => (issue.value
    ? `${issueText(issue.value, labels.value)}. ${labels.value.rosterFdAskBody}`
    : ''))
  let pending = null
  function guard(save) {
    if (!issue.value) return save()
    pending = save
    open.value = true
  }
  function confirm() {
    const save = pending
    pending = null
    open.value = false
    save?.()
  }
  function close() {
    pending = null
    open.value = false
  }
  return { open, message, guard, confirm, close }
}
