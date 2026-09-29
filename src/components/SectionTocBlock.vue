<template>
  <div class="section-toc">
    <p
      v-if="description"
      class="section-toc-desc"
    >
      {{ description }}
    </p>
    <ol class="section-toc-list">
      <li
        v-for="item in items"
        :key="item.id"
      >
        <a
          href="#"
          class="section-toc-link"
          @click.prevent="go(item)"
        >
          <span class="section-toc-num">{{ item.sectionNum }}</span>
          {{ item.title }}
        </a>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { scrollToAnchor } from '../composables/useRefNavigation.js'

const props = defineProps({
  items: { type: Array, required: true },
  route: { type: String, required: true },
  description: { type: String, default: '' },
})

const router = useRouter()


// The same glide every in-page jump takes (useRefNavigation's scrollToAnchor). This used the
// browser's own `behavior: 'smooth'` against a position computed once — which is what the rest
// of the app moved away from: the chapters are `content-visibility: auto`, so that position is
// a guess until they are drawn.
async function go(item) {
  await router.push({ path: props.route, hash: '#' + item.id })
  scrollToAnchor(item.id, 100, { glide: true })
}
</script>

<style scoped>
.section-toc {
  background: var(--bg-card);
  border-top: 3px solid var(--border);
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
  gap: 0;
}

.section-toc-link {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.5;
  /* 24px tap target (WCAG 2.5.8, `npm run a11y`) — one pixel over the line box, invisible. */
  min-height: 24px;
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
