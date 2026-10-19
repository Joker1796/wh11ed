import { computed, ref } from 'vue'
import { resolveSideColors, sidePicksOf, sidesClash } from './sideColors.js'

// Saving a setup whose two sides come out one colour asks first (owner, 2026-09-29). Faction
// colours are the default, and two armies can share one (Blood Angels and World Eaters, or a
// mirror match) — nothing is swapped behind the player's back, the setup says so once and offers
// "Customise colours"; keeping them as they are is always there. The wizard's Start and the
// edit dialog's Save both go through `guard`.
//
// `ctx` — the setup's option context (its sides' factions), `settings` — the draft.
export function useColorClashGate(ctx, settings) {
  const open = ref(false)
  const clash = computed(() => sidesClash(resolveSideColors(ctx.value.you.faction, ctx.value.opp.faction, sidePicksOf(settings))))
  let pending = null
  function guard(save) {
    if (!clash.value) return save()
    pending = save
    open.value = true
  }
  // "Keep them": go on with what was being saved.
  function confirm() {
    const save = pending
    pending = null
    open.value = false
    save?.()
  }
  // "Customise": stay, with the option on — its pickers open under it.
  function customise() {
    pending = null
    open.value = false
    settings.customColors = true
  }
  return { open, guard, confirm, customise }
}
