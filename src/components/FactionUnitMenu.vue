<template>
  <!-- A unit's menu in a faction's list — its "…", a right click, a long press (owner, 2026-10-21):
       at the pointer or the button on a wide screen, the actions sheet on a phone. What the unit's
       own plate menu carries too (UnitMarkActions), plus what only the list can do: open the unit
       where the list is, open it in a new tab (a long press cannot otherwise ask for one on a
       phone; the installed app has no tabs, so not there — owner, 2026-10-22), add it to the
       comparison (a wide screen). -->
  <ActionMenu
    v-model:open="open"
    :anchor="anchor"
    :title="unit?.name || ''"
    width="18rem"
  >
    <template v-if="unit">
      <button
        class="act-btn act-ico"
        @click="pick('open-unit')"
      >
        <i class="wi wi-datasheet" />{{ labels.dsOpenUnit }}
      </button>
      <a
        v-if="inTab"
        :href="href"
        target="_blank"
        rel="noopener"
        class="act-btn act-ico"
        @click="open = false"
      >
        <i class="wi wi-arrow-right" />{{ labels.dsOpenNewTab }}
      </a>
      <button
        v-if="canCompare"
        class="act-btn act-ico"
        @click="pick('compare')"
      >
        <i class="wi wi-panes" />{{ labels.dsAddToCompare }}
      </button>
      <UnitMarkActions
        :slug="slug"
        :unit-id="unit.id"
        :name="unit.name"
        @done="open = false"
        @say="say"
      />
    </template>
  </ActionMenu>
  <!-- "Copied" has nowhere to show on a menu that has closed: a toast says it. -->
  <AppToast
    :show="!!toast"
    :text="toast"
    icon="wi wi-check"
    @close="toast = ''"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import ActionMenu from './ActionMenu.vue'
import AppToast from './AppToast.vue'
import UnitMarkActions from './UnitMarkActions.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { isStandaloneDisplay } from '../composables/standalone.js'
import { localePath } from '../router/locale.js'

const props = defineProps({
  slug: { type: String, required: true },
  // The unit the menu is for: { id, name }.
  unit: { type: Object, default: null },
  // Where it opens: the pointer, or the "…" button's rect (PickerDropdown's `anchor`).
  anchor: { type: Object, default: null },
  canCompare: { type: Boolean, default: false },
})
const emit = defineEmits(['open-unit', 'compare'])
const open = defineModel('open', { type: Boolean, default: false })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// A browser tab, not the installed app: only a tab can open another.
const inTab = !isStandaloneDisplay()
const href = computed(() => (props.unit ? localePath(`/factions/${props.slug}/datasheets/${props.unit.id}`, locale.value) : ''))

function pick(what) {
  open.value = false
  emit(what, props.unit.id)
}

const toast = ref('')
let toastTimer = null
function say(text) {
  toast.value = text
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 1500)
}
</script>
