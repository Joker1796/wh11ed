// What a screen hands down to the dialogs opened from it. A dialog (BaseModal) is teleported to
// <body>, out of the screen's DOM, so custom properties set on the screen never reach it — the
// tracker's turn colour was the case (2026-09-27: the take-two dialog stayed red through the
// opponent's turn). A screen provides a scope `{ class, style }` here; BaseModal puts it on its
// overlay. Provide/inject follows the COMPONENT tree, which the teleport does not break, so every
// dialog under the screen — nested ones included — gets it, and nothing outside does.
import { computed, inject, provide } from 'vue'

const MODAL_SCOPE = Symbol('modalScope')

// `scope` — a ref/computed of `{ class, style }`.
export function provideModalScope(scope) {
  provide(MODAL_SCOPE, scope)
}
export function useModalScope() {
  return inject(MODAL_SCOPE, null)
}

// A part of the game screen that belongs to ONE side — its missions, its CP and stratagems, its
// army rule — re-points the turn colour of every dialog under it at that side (owner, 2026-10-20:
// on your turn, the opponent's mission opened in your colour). `isOpp` is a getter: true for the
// opponent's side, false for yours, null to leave the screen's turn colour as it is. A scope
// without the turn colour (no game around) is left untouched.
export function provideSideScope(isOpp) {
  const parent = useModalScope()
  provideModalScope(computed(() => {
    const p = parent?.value
    const opp = isOpp()
    if (!p || opp == null) return p
    const cls = [p.class].flat().filter((c) => !(c && typeof c === 'object' && 'turn-opp' in c))
    if (!cls.includes('turn-colored')) return p
    return { ...p, class: [...cls, { 'turn-opp': !!opp }] }
  }))
}
