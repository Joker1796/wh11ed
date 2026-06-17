<template>
  <nav class="page-nav" v-if="prev || next">
    <RouterLink v-if="prev" :to="prev.path" class="page-nav-link prev">
      <span class="page-nav-caption">← {{ labels.pagerPrev }}</span>
      <span class="page-nav-title">{{ prev.label }}</span>
    </RouterLink>
    <RouterLink v-if="next" :to="next.path" class="page-nav-link next">
      <span class="page-nav-caption">{{ labels.pagerNext }} →</span>
      <span class="page-nav-title">{{ next.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navGroups, navGroupsRu } from '../router/index.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const route = useRoute()

const labels = computed(() => ui[locale.value])
const groups = computed(() => (locale.value === 'ru' ? navGroupsRu : navGroups))

const idx = computed(() => groups.value.findIndex(g => g.path === route.path))
const prev = computed(() => (idx.value > 0 ? groups.value[idx.value - 1] : null))
const next = computed(() =>
  idx.value >= 0 && idx.value < groups.value.length - 1
    ? groups.value[idx.value + 1]
    : null
)
</script>

<style scoped>
.page-nav {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
}

.page-nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  text-decoration: none;
  color: var(--text-primary);
  transition: border-color 0.15s, background 0.15s;
  max-width: 48%;
}

.page-nav-link:hover {
  border-color: var(--accent);
  background: var(--bg-card);
}

.page-nav-link.next {
  margin-left: auto;
  text-align: right;
}

.page-nav-caption {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.page-nav-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--accent);
}
</style>
