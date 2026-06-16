<template>
  <FactionStub :name="meta.name" :category="meta.category" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import FactionStub from '../../components/FactionStub.vue'
import { factionsBySlug } from '../../data/factions/factionsConfig.js'

const route = useRoute()
const meta = computed(() => factionsBySlug[route.params.slug] ?? { name: route.params.slug, category: 'Xenos' })
</script>
