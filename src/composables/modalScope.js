// What a screen hands down to the dialogs opened from it. A dialog (BaseModal) is teleported to
// <body>, out of the screen's DOM, so custom properties set on the screen never reach it — the
// tracker's turn colour was the case (2026-09-27: the take-two dialog stayed red through the
// opponent's turn). A screen provides a scope `{ class, style }` here; BaseModal puts it on its
// overlay. Provide/inject follows the COMPONENT tree, which the teleport does not break, so every
// dialog under the screen — nested ones included — gets it, and nothing outside does.
import { inject, provide } from 'vue'

const MODAL_SCOPE = Symbol('modalScope')

// `scope` — a ref/computed of `{ class, style }`.
export function provideModalScope(scope) {
  provide(MODAL_SCOPE, scope)
}
export function useModalScope() {
  return inject(MODAL_SCOPE, null)
}
