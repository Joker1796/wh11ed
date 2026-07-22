<template>
  <BaseModal :title="title" max-width="640px" max-height="85vh" @close="$emit('close')">
    <div class="modal-body">
      <div v-if="rangedRows.length" class="wpm-weapons">
        <table>
          <thead>
            <tr><th class="wname">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
          </thead>
          <tbody>
            <tr v-for="(w, i) in rangedRows" :key="i" :class="'wg-' + w.gpos">
              <td class="wname"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
              <td>{{ w.range }}</td><td>{{ w.a }}</td><td>{{ w.bs }}</td><td>{{ w.s }}</td><td>{{ w.ap }}</td><td>{{ w.d }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="meleeRows.length" class="wpm-weapons">
        <table>
          <thead>
            <tr><th class="wname">{{ labels.dsMelee }}</th><th>Range</th><th>A</th><th>WS</th><th>S</th><th>AP</th><th>D</th></tr>
          </thead>
          <tbody>
            <tr v-for="(w, i) in meleeRows" :key="i" :class="'wg-' + w.gpos">
              <td class="wname"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
              <td>Melee</td><td>{{ w.a }}</td><td>{{ w.ws }}</td><td>{{ w.s }}</td><td>{{ w.ap }}</td><td>{{ w.d }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="abilityRows.length" class="wpm-abilities">
        <div v-for="a in abilityRows" :key="a.name" class="wpm-ability">
          <strong>{{ a.name }}:</strong> <span v-html="renderInline(a.text)"></span>
        </div>
      </div>
      <p v-if="loaded && !rangedRows.length && !meleeRows.length && !abilityRows.length" class="wpm-missing">{{ labels.rosterNoProfile }}</p>
    </div>
  </BaseModal>
</template>

<script setup>
// A focused view of one (or a few, for a "replace X and Y with…" group's default row) wargear
// item — looked up by name in the unit's own linked datasheet. Most wargear items are weapons
// (a stat-line profile from `sheet.ranged`/`sheet.melee`, which lists every profile the unit can
// take, default and optional alike — datasheets don't model wargear choices themselves), but a
// handful grant an ABILITY instead of a weapon profile (e.g. Necrons' Resurrection Orb, which has
// no stat line at all — it's a `wargearAbilities` entry), so both are matched by name and shown.
// Weapon names/stats are never RU-translated (see CLAUDE.md's roster decision "имена данных EN"),
// so this only ever needs the EN sheet, unlike RosterUnitRulesModal. Deliberately NOT the same
// component as RosterUnitRulesModal/DatasheetCard: a wargear pick's info button should show just
// that item's own profile/rule, not the whole unit sheet.
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { weaponBase, withGroupPos } from '../../utils/weaponGroups.js'

const props = defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
  names: { type: Array, required: true },
})
defineEmits(['close'])

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

const title = computed(() => props.names.join(' / '))

const sheet = ref(null)
const loaded = ref(false)
watch(
  () => props.factionSlug,
  async (slug) => {
    sheet.value = null
    loaded.value = false
    if (!slug) return
    const list = await loadDatasheets(slug)
    if (props.factionSlug !== slug) return
    sheet.value = (list || []).find((d) => d.id === props.unitId) || null
    loaded.value = true
  },
  { immediate: true },
)

const wanted = computed(() => new Set(props.names.map((n) => (n || '').toLowerCase())))
function matching(list) {
  return withGroupPos((list || []).filter((w) => wanted.value.has(weaponBase(w.name).toLowerCase())))
}
const rangedRows = computed(() => matching(sheet.value?.ranged))
const meleeRows = computed(() => matching(sheet.value?.melee))

function abilityMatching(list) {
  return (list || []).filter((a) => wanted.value.has((a.name || '').toLowerCase()))
}
// Checked in this order since a wargear-granted ability (Resurrection Orb) is the common
// non-weapon case; the other two lists are checked too so nothing that happens to share a name
// with a core/special ability silently comes up empty.
const abilityRows = computed(() => [
  ...abilityMatching(sheet.value?.wargearAbilities),
  ...abilityMatching(sheet.value?.abilities),
  ...abilityMatching(sheet.value?.specialAbilities),
])
</script>

<style scoped>
.modal-body { padding: 0.9rem; overflow-y: auto; }
.wpm-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }
.wpm-abilities { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); }
.wpm-ability { margin-bottom: 0.45rem; }
.wpm-ability:last-child { margin-bottom: 0; }

/* Same weapon-table look as DatasheetCard's .ds-weapons, kept local since scoped styles can't
   cross components — this is presentation-only duplication, not logic (see weaponGroups.js for
   the shared pure helpers). */
.wpm-weapons { overflow-x: auto; margin-bottom: 0.7rem; }
.wpm-weapons table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.wpm-weapons th {
  text-align: center;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #fff;
  background: var(--accent);
  padding: 0.3rem 0.35rem;
  white-space: nowrap;
}
.wpm-weapons th:first-child { border-top-left-radius: 4px; }
.wpm-weapons th:last-child { border-top-right-radius: 4px; }
.wpm-weapons td {
  text-align: center;
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  white-space: nowrap;
}
.wpm-weapons .wname { text-align: left; white-space: normal; min-width: 10rem; }
.wtag { font-size: 0.72rem; }
.wpm-weapons tr.wg-start td,
.wpm-weapons tr.wg-mid td,
.wpm-weapons tr.wg-end td {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
.wprofile-arrow {
  display: inline-block;
  width: 13px;
  height: 9px;
  margin-right: 0.4rem;
  background: var(--accent);
  clip-path: polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%);
  vertical-align: middle;
}
</style>
