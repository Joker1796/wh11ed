<template>
  <nav class="sidebar" :class="{ open: mobileOpen }">
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <span class="sidebar-logo">WH40K</span>
        <span class="sidebar-subtitle">Core Rules 11th Ed.</span>
      </div>
      <button class="mobile-close" @click="$emit('close')" aria-label="Close menu">✕</button>
    </div>

    <div class="nav-groups">
      <div
        v-for="group in localizedGroups"
        :key="group.path"
        class="nav-group"
        :class="{ active: isActive(group) }"
      >
        <button
          class="nav-group-label"
          :class="{ expanded: expandedPath === group.path }"
          @click="toggleGroup(group)"
        >
          {{ group.label }}
          <svg v-if="group.sections.length || group.factionGroups" class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <transition name="expand">
          <div v-if="expandedPath === group.path && group.factionGroups" class="nav-sub nav-factions">
            <div v-for="cat in group.factionGroups" :key="cat.label" class="nav-faction-group">
              <span class="nav-faction-category">{{ cat.label }}</span>
              <RouterLink
                v-for="f in cat.factions"
                :key="f.path"
                :to="f.path"
                class="nav-sub-link nav-faction-link"
                @click="$emit('close')"
              >{{ f.label }}</RouterLink>
            </div>
          </div>
          <ul v-else-if="expandedPath === group.path && group.sections.length" class="nav-sub">
            <li v-for="sec in group.sections" :key="sec.id">
              <a href="#" class="nav-sub-link" @click.prevent="handleAnchorClick(group.path, sec.id)">
                {{ sec.label }}
              </a>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navGroups, navGroupsRu } from '../router/index.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({ mobileOpen: Boolean })
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const localizedGroups = computed(() => locale.value === 'ru' ? navGroupsRu : navGroups)

const expandedPath = ref(route.path)

watch(() => route.path, (p) => { expandedPath.value = p })

function isActive(group) {
  if (group.factionGroups) return route.path.startsWith('/factions/')
  return route.path === group.path
}

function toggleGroup(group) {
  if (expandedPath.value === group.path) {
    expandedPath.value = null
  } else {
    expandedPath.value = group.path
    if (!group.sections.length && !group.factionGroups) {
      router.push(group.path)
      emit('close')
    }
  }
}

async function handleAnchorClick(path, id) {
  emit('close')
  if (route.path !== path) {
    await router.push(path)
  }
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 300)
}
</script>

<style scoped>
.sidebar {
  display: none;
}

@media (max-width: 900px) {
  .sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: var(--sidebar-width);
    max-width: 85vw;
    height: 100dvh;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border);
    z-index: 300;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.18);
  }
}

.sidebar-header {
  padding: 1rem 1rem 0.9rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-logo {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 2px;
}

.sidebar-subtitle {
  font-size: 0.68rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-close {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.mobile-close:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--text-primary);
}

.nav-groups {
  padding: 0.5rem 0;
  overflow-y: auto;
}

.nav-group {
  border-bottom: 1px solid var(--border);
}

.nav-group-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color 0.15s, background 0.15s;
  font-family: var(--font-sans);
}

.nav-group-label:hover {
  color: var(--text-primary);
  background: rgba(110, 0, 8, 0.05);
}

.nav-group.active .nav-group-label {
  color: var(--accent);
  background: rgba(110, 0, 8, 0.08);
}

.chevron {
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform 0.22s ease;
}

.nav-group-label.expanded .chevron {
  transform: rotate(180deg);
}

.nav-sub {
  list-style: none;
  padding: 0 0 0.5rem 0;
  margin: 0;
}

.nav-sub li {
  margin: 0;
}

.nav-sub-link {
  display: block;
  padding: 0.45rem 1rem 0.45rem 1.75rem;
  font-size: 0.82rem;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.nav-sub-link:hover {
  color: var(--text-primary);
  background: rgba(110, 0, 8, 0.04);
}

.nav-factions {
  padding: 0.25rem 0 0.5rem;
}

.nav-faction-group {
  margin-bottom: 0.15rem;
}

.nav-faction-category {
  display: block;
  padding: 0.3rem 1rem 0.15rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-dim);
  opacity: 0.55;
}

.nav-faction-link {
  padding-left: 2rem;
}

.expand-enter-active, .expand-leave-active {
  transition: max-height 0.25s ease;
  overflow: hidden;
  max-height: 600px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
}
</style>
