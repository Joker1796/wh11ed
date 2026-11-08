<template>
  <BaseModal
    :title="title"
    :subtitle="kind"
    dense
    @close="$emit('close')"
  >
    <div class="modal-body prm-body">
      <RuleBody
        v-if="rule"
        :body="rule.body"
      />
    </div>
  </BaseModal>
</template>

<script setup>
// An army's rule read where it was tapped (owner, 2026-11-07): the Phase tab's line to the army
// rule or a detachment's rule opens its text over the tab, instead of switching to the Army tab and
// leaving the reader to find which fold opened. The text comes from the faction data the Army tab
// reads too (gameStratagems.js, imported on demand), so the playing screen still carries none.
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, membersOf } from '../../composables/useTracker.js'
import { loadArmyRules } from '../../composables/gameStratagems.js'
import { foldName } from '../../core/shared/foldName.js'

const props = defineProps({
  // The line's `army` (usePhaseRules): { pi, mi, rule } — 'army' or the detachment's name.
  at: { type: Object, required: true },
  // The line's own name, the title until the text is here.
  name: { type: String, default: '' },
})
defineEmits(['close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()

const member = computed(() => {
  const pl = current.value?.players?.[props.at.pi]
  if (!pl) return null
  return props.at.mi == null ? pl : membersOf(pl)[props.at.mi]
})

const rules = ref(null)
let token = 0
watch([locale, member], async () => {
  const t = ++token
  const r = await loadArmyRules(member.value, locale.value, !!current.value?.settings?.combatPatrol)
  if (t === token) rules.value = r
}, { immediate: true })

const det = computed(() => {
  if (props.at.rule === 'army') return null
  return rules.value?.detachments.find((d) => foldName(d.name) === foldName(props.at.rule)) || null
})
const rule = computed(() => (props.at.rule === 'army' ? rules.value?.armyRule : det.value?.rule) || null)
const title = computed(() => rule.value?.name || props.name)
const kind = computed(() => (props.at.rule === 'army'
  ? labels.value.trackerArmyRuleKind
  : `${labels.value.trackerArmyDetachmentKind} · ${det.value?.name || props.at.rule}`))
</script>

<style scoped>
.prm-body { padding: 0.75rem 1rem 1rem; }
</style>
