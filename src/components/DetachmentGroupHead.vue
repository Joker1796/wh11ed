<template>
  <p class="det-group">
    {{ labels.factionDetachmentsFrom.replace('{faction}', name) }}
  </p>
</template>

<script setup>
// The heading over another faction's detachments in a picker — a Chapter's Codex: Space Marines
// ones, anyone's Deathwatch Support — which come after the army's own: a Chapter's two or eight
// would otherwise drown in the Codex's fifteen (owner, 2026-10-05). Every detachment list draws
// it the same way: a row whose `from` (a faction slug) differs from the row above opens a group
// (FactionDetachmentList on the faction pages, DetachmentPickerList in the roster and tracker).
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'

const props = defineProps({ from: { type: String, required: true } })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
// Faction names are proper names and stay English in both locales.
const name = computed(() => factionIndexBySlug(props.from)?.name || props.from)
</script>

<style scoped>
.det-group {
  margin: 0.45rem 0 0;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
</style>
