<template>
  <nav class="sidebar" :class="{ open: mobileOpen }">
    <div class="sidebar-header">
      <span class="sidebar-logo">WH40K</span>
      <span class="sidebar-subtitle">Core Rules 11th Ed.</span>
      <button class="mobile-close" @click="$emit('close')">✕</button>
    </div>

    <div class="nav-groups">
      <div
        v-for="group in localizedGroups"
        :key="group.path"
        class="nav-group"
        :class="{ active: isActive(group.path) }"
      >
        <RouterLink
          :to="group.path"
          class="nav-group-label"
          @click="handleNavClick"
        >
          {{ group.label }}
        </RouterLink>

        <transition name="expand">
          <ul v-if="isActive(group.path) && group.sections.length" class="nav-sub">
            <li v-for="sec in group.sections" :key="sec.id">
              <a href="#" class="nav-sub-link" @click.prevent="handleAnchorClick(sec.id)">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { navGroups, navGroupsRu } from '../router/index.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({ mobileOpen: Boolean })
const emit = defineEmits(['close'])

const route = useRoute()
const { locale } = useLocale()
const localizedGroups = computed(() => locale.value === 'ru' ? navGroupsRu : navGroups)

function isActive(path) {
  return route.path === path
}

function handleNavClick() {
  emit('close')
}

function handleAnchorClick(id) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  min-height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 1.25rem 1rem 1rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-logo {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 2px;
}

.sidebar-subtitle {
  font-size: 0.72rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-close {
  display: none;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  align-self: flex-end;
  margin-top: -1.8rem;
}

.nav-groups {
  padding: 0.5rem 0;
}

.nav-group {
  border-bottom: 1px solid var(--border);
}

.nav-group-label {
  display: block;
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: color 0.2s, background 0.2s;
}

.nav-group-label:hover {
  color: var(--text-primary);
  background: rgba(233, 69, 96, 0.06);
  text-decoration: none;
}

.nav-group.active .nav-group-label {
  color: var(--accent);
  background: rgba(233, 69, 96, 0.1);
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
  padding: 0.3rem 1rem 0.3rem 1.75rem;
  font-size: 0.82rem;
  color: var(--text-dim);
  transition: color 0.15s;
}

.nav-sub-link:hover {
  color: var(--text-primary);
  text-decoration: none;
}

.expand-enter-active, .expand-leave-active {
  transition: max-height 0.25s ease;
  overflow: hidden;
  max-height: 400px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .mobile-close {
    display: block;
  }
}
</style>
