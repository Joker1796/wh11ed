<template>
  <div class="see-also">
    <div class="see-also-label">{{ locale === 'ru' ? 'Смотрите также' : 'See also' }}</div>
    <div v-if="title" class="see-also-title">{{ title }}</div>
    <ul>
      <li v-for="ref in refs" :key="ref">
        <RouterLink
          v-if="resolveRef(ref).route"
          :to="{ path: resolveRef(ref).route, hash: '#' + resolveRef(ref).anchor }"
          class="see-also-link"
          @click.prevent="navigateTo(resolveRef(ref))"
        >{{ resolveRef(ref).label }}</RouterLink>
        <span v-else>{{ ref }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRefNavigation } from '../composables/useRefNavigation.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({
  title: { type: String, default: '' },
  refs: { type: Array, required: true },
})

const { resolveRef, navigateTo } = useRefNavigation()
const { locale } = useLocale()
</script>

<style scoped>
.see-also {
  float: right;
  flex-shrink: 0;
  width: 160px;
  margin-left: 1.5rem;
  margin-bottom: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.6rem 0.8rem;
  font-size: 0.78rem;
}

.see-also-label {
  font-weight: 700;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 0.1rem;
}

.see-also-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.see-also ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.see-also ul li {
  padding: 0.05rem 0;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-light);
  font-size: 0.8rem;
  line-height: 1.35;
}

.see-also ul li:last-child {
  border-bottom: none;
}

.see-also-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.8rem;
}

.see-also-link:hover {
  text-decoration: underline;
}

@media (max-width: 700px) {
  .see-also {
    float: none;
    width: 100%;
    margin-left: 0;
    margin-bottom: 1rem;
  }
}
</style>
