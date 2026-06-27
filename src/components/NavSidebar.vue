<template>
  <nav class="sidebar" :class="{ open: mobileOpen }" :aria-label="labels.ariaNavigation">
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <span class="sidebar-logo">WH40K</span>
        <span class="sidebar-subtitle">Core Rules 11th Ed.</span>
      </div>
      <button class="mobile-close" @click="$emit('close')" :aria-label="labels.ariaCloseMenu">✕</button>
    </div>

    <div class="nav-groups">
      <div
        v-for="section in navSections"
        :key="section.key"
        class="nav-section"
        :class="{ open: openSection === section.key }"
      >
        <div class="nav-section-header">
          <button class="nav-section-label" @click="goToSection(section)">{{ section.label }}</button>
          <button
            v-if="!isDirect(section)"
            class="nav-section-toggle"
            @click="toggleSection(section.key)"
            :aria-expanded="openSection === section.key"
            :aria-label="labels.ariaToggleSection"
          >
            <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <transition name="expand-section">
          <div v-if="openSection === section.key && !isDirect(section)" class="nav-section-body">
            <div
              v-for="group in section.groups"
              :key="group.path"
              class="nav-group"
              :class="{ active: isActive(group) }"
            >
              <div class="nav-group-label">
                <button class="nav-group-link" @click="goToGroup(group)">{{ group.label }}</button>
                <button
                  v-if="group.sections.length"
                  class="nav-group-toggle"
                  :class="{ expanded: expandedPath === group.path }"
                  @click="toggleGroupExpand(group)"
                  :aria-expanded="expandedPath === group.path"
                  :aria-label="labels.ariaToggleSubsections"
                >
                  <svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <transition name="expand">
                <ul v-if="expandedPath === group.path && group.sections.length" class="nav-sub">
                  <li v-for="sec in group.sections" :key="sec.label">
                    <a href="#" class="nav-sub-link" @click.prevent="handleAnchorClick(group.path, sec.id, sec.filter)">
                      {{ sec.label.replace(/^\d+\s+/, '') }}
                    </a>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { navGroups, navGroupsRu, eventGroups, eventGroupsRu, trackerGroups, trackerGroupsRu, linksGroups, linksGroupsRu } from '../router/index.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useAbilityFilter } from '../composables/useAbilityFilter.js'

defineProps({ mobileOpen: Boolean })
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const { activeFilter } = useAbilityFilter()
const labels = computed(() => ui[locale.value])
const localizedGroups = computed(() => locale.value === 'ru' ? navGroupsRu : navGroups)
const localizedEventGroups = computed(() => locale.value === 'ru' ? eventGroupsRu : eventGroups)
const localizedTrackerGroups = computed(() => locale.value === 'ru' ? trackerGroupsRu : trackerGroups)
const localizedLinksGroups = computed(() => locale.value === 'ru' ? linksGroupsRu : linksGroups)

const navSections = computed(() => [
  { key: 'core',    label: labels.value.navCoreRules,      groups: localizedGroups.value },
  { key: 'event',   label: labels.value.navEventCompanion, groups: localizedEventGroups.value },
  { key: 'tracker', label: labels.value.navTracker,        groups: localizedTrackerGroups.value },
  { key: 'links',   label: labels.value.navLinks,          groups: localizedLinksGroups.value },
])

const currentSection = computed(() => {
  const p = route.path
  if (p.startsWith('/tracker')) return 'tracker'
  if (p.startsWith('/event-companion')) return 'event'
  if (p.startsWith('/links')) return 'links'
  return 'core'
})

// Which group's subsections are open (one at a time), and which top-level
// section accordion is expanded (also one at a time). Both follow the route.
const expandedPath = ref(route.path)
const openSection = ref(currentSection.value)

watch(() => route.path, (p) => {
  expandedPath.value = p
  openSection.value = currentSection.value
})

function isActive(group) {
  return route.path === group.path
}

function toggleSection(key) {
  openSection.value = openSection.value === key ? null : key
}

// A section with a single page and no sub-anchors (e.g. Links) needs no accordion —
// its header just navigates straight to that page.
function isDirect(section) {
  return section.groups.length === 1 && !section.groups[0].sections.length
}

// Tap a section label → go to that section's main page (its first group). Tap a group label →
// go to that page. The square chevron buttons handle expand/collapse without navigating.
function goToSection(section) {
  const path = section.groups[0]?.path
  if (!path) return
  if (route.path !== path) router.push(path)
  emit('close')
}

function goToGroup(group) {
  if (route.path !== group.path) router.push(group.path)
  emit('close')
}

function toggleGroupExpand(group) {
  expandedPath.value = expandedPath.value === group.path ? null : group.path
}

async function handleAnchorClick(path, id, filter) {
  emit('close')
  if (filter) activeFilter.value = filter
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
    right: 0;
    top: 0;
    width: var(--sidebar-width);
    max-width: 85vw;
    height: 100dvh;
    /* Keep the drawer header below the iOS translucent status bar */
    padding-top: var(--safe-top);
    background: var(--bg-secondary);
    border-left: 1px solid var(--border);
    z-index: 300;
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.18);
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
  background: color-mix(in srgb, var(--text-primary) 7%, transparent);
  color: var(--text-primary);
}

.nav-groups {
  padding: 0.5rem 0;
  overflow-y: auto;
}

.nav-section {
  /* The section header is a dark surface (--bg-insert) in both themes, where --border
     (#3a3a40) is invisible in dark mode. Use the same light-on-dark divider as the other
     in-header separators (e.g. .nav-section-toggle) so the lines show in both themes. */
  border-bottom: 1px solid color-mix(in srgb, var(--text-on-dark) 14%, transparent);
}

.nav-section-header {
  display: flex;
  align-items: stretch;
  min-height: 44px;
  background: var(--bg-insert);
}

.nav-section-label {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-on-dark);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}

.nav-section-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  flex-shrink: 0;
  background: none;
  border: none;
  border-left: 1px solid color-mix(in srgb, var(--text-on-dark) 18%, transparent);
  color: var(--text-on-dark);
  cursor: pointer;
  transition: background 0.15s;
}

.nav-section-label:hover,
.nav-section-toggle:hover,
.nav-section.open .nav-section-header {
  background: color-mix(in srgb, var(--bg-insert) 85%, #fff);
}

.nav-section-toggle .chevron {
  color: var(--text-on-dark);
}

.nav-section.open .nav-section-toggle .chevron {
  transform: rotate(180deg);
}

.nav-section-body {
  overflow: hidden;
}

.nav-group {
  border-top: 1px solid var(--border);
}

.nav-group-label {
  display: flex;
  align-items: stretch;
}

.nav-group-link {
  flex: 1;
  min-width: 0;
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

.nav-group-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  flex-shrink: 0;
  background: none;
  border: none;
  border-left: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.nav-group-link:hover,
.nav-group-toggle:hover {
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
}

.nav-group.active .nav-group-link {
  color: var(--text-primary);
  font-weight: 700;
  background: color-mix(in srgb, var(--text-primary) 9%, transparent);
  box-shadow: inset 3px 0 0 var(--text-muted);
}

.chevron {
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform 0.22s ease;
}

.nav-group-toggle.expanded .chevron {
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
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

.expand-enter-active, .expand-leave-active {
  transition: max-height 0.25s ease;
  overflow: hidden;
  max-height: 800px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
}

/* Section-level accordion — larger cap so a section body containing an
   expanded group never clips mid-animation. */
.expand-section-enter-active, .expand-section-leave-active {
  transition: max-height 0.28s ease;
  overflow: hidden;
  max-height: 2000px;
}
.expand-section-enter-from, .expand-section-leave-to {
  max-height: 0;
}
</style>
