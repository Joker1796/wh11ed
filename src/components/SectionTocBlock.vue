<template>
  <div class="section-toc">
    <p v-if="description" class="section-toc-desc">{{ description }}</p>
    <ol class="section-toc-list">
      <li v-for="item in items" :key="item.id">
        <a href="#" class="section-toc-link" @click.prevent="go(item)">
          <span class="section-toc-num">{{ item.sectionNum }}</span>
          {{ item.title }}
        </a>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  items: { type: Array, required: true },
  route: { type: String, required: true },
  description: { type: String, default: '' },
})

const router = useRouter()

async function go(item) {
  await router.push({ path: props.route, hash: '#' + item.id })
  await new Promise(r => setTimeout(r, 80))
  const el = document.getElementById(item.id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.section-toc {
  background: var(--bg-card);
  border-top: 3px solid var(--border);
  border-radius: 0 0 4px 4px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.4rem;
}

.section-toc-desc {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0 0 0.75rem;
}

.section-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.section-toc-link {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.5;
}

.section-toc-link:hover {
  color: var(--accent);
}

.section-toc-num {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  min-width: 2.8rem;
  flex-shrink: 0;
}
</style>
