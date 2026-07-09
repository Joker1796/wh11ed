<template>
  <article class="ds-card">
    <!-- Stat profiles -->
    <div v-for="(p, i) in sheet.profiles" :key="i" class="ds-statline">
      <span v-if="sheet.profiles.length > 1" class="ds-prof-name">{{ p.name }}</span>
      <div class="ds-stats">
        <div v-for="s in statCells(p)" :key="s.label" class="ds-stat">
          <span class="ds-stat-label">{{ s.label }}</span>
          <span class="ds-stat-value">{{ s.value }}</span>
        </div>
        <div v-if="p.inv" class="ds-stat ds-stat-inv">
          <span class="ds-stat-label">INV</span>
          <span class="ds-stat-value">{{ p.inv }}</span>
        </div>
      </div>
      <div v-if="p.invNote" class="ds-inv-note">{{ p.invNote }}</div>
    </div>

    <!-- Weapons -->
    <div v-if="sheet.ranged" class="ds-weapons">
      <table>
        <thead>
          <tr><th class="wname">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in sheet.ranged" :key="i">
            <td class="wname">{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
            <td>{{ w.range }}</td><td>{{ w.a }}</td><td>{{ w.bs }}</td><td>{{ w.s }}</td><td>{{ w.ap }}</td><td>{{ w.d }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="sheet.melee" class="ds-weapons">
      <table>
        <thead>
          <tr><th class="wname">{{ labels.dsMelee }}</th><th>Range</th><th>A</th><th>WS</th><th>S</th><th>AP</th><th>D</th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in sheet.melee" :key="i">
            <td class="wname">{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
            <td>Melee</td><td>{{ w.a }}</td><td>{{ w.ws }}</td><td>{{ w.s }}</td><td>{{ w.ap }}</td><td>{{ w.d }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Abilities -->
    <div class="ds-abilities">
      <p v-if="sheet.core" class="ds-ability-line"><strong>{{ labels.dsCore }}:</strong> <span v-html="renderInline(sheet.core)"></span></p>
      <p v-if="sheet.faction" class="ds-ability-line"><strong>{{ labels.dsFaction }}:</strong> <span v-html="renderInline(sheet.faction)"></span></p>
      <div v-for="a in sheet.abilities" :key="a.name" class="ds-ability">
        <strong>{{ a.name }}:</strong> <span v-html="renderInline(a.text)"></span>
      </div>
      <template v-if="sheet.wargearAbilities">
        <h5 class="ds-group-title">{{ labels.dsWargearAbilities }}</h5>
        <div v-for="a in sheet.wargearAbilities" :key="a.name" class="ds-ability">
          <strong>{{ a.name }}:</strong> <span v-html="renderInline(a.text)"></span>
        </div>
      </template>
      <div v-for="a in sheet.specialAbilities" :key="a.name" class="ds-ability">
        <strong>{{ a.name }}:</strong> <span v-html="renderInline(a.text)"></span>
      </div>
      <div v-if="sheet.damaged" class="ds-damaged">
        <strong>{{ labels.dsDamaged }}: {{ sheet.damaged.note }}</strong>
        <div v-html="renderInline(sheet.damaged.text)"></div>
      </div>
    </div>

    <!-- Transport / Leader -->
    <div v-if="sheet.transport" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsTransport }}</h5>
      <div v-html="renderInline(sheet.transport)"></div>
    </div>
    <div v-if="sheet.leader" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsLeader }}</h5>
      <div v-html="renderInline(sheet.leader.text)"></div>
      <ul class="ds-list">
        <li v-for="u in sheet.leader.units" :key="u">{{ u }}</li>
      </ul>
      <div v-if="sheet.leader.footer" v-html="renderInline(sheet.leader.footer)"></div>
    </div>

    <!-- Composition / loadout / options -->
    <div v-if="sheet.composition || sheet.loadout" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsComposition }}</h5>
      <ul v-if="sheet.composition" class="ds-list">
        <li v-for="c in sheet.composition" :key="c" v-html="renderInline(c)"></li>
      </ul>
      <div v-if="sheet.loadout" class="ds-loadout" v-html="renderInline(sheet.loadout)"></div>
    </div>
    <div v-if="sheet.options" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsOptions }}</h5>
      <div v-for="(o, i) in sheet.options" :key="i" class="ds-option" v-html="renderInline(o)"></div>
    </div>

    <!-- Keywords -->
    <div class="ds-keywords">
      <div><strong>{{ labels.dsKeywords }}:</strong> {{ sheet.keywords.join(', ') }}</div>
      <div><strong>{{ labels.dsFactionKeywords }}:</strong> {{ sheet.factionKeywords.join(', ') }}</div>
    </div>

    <p v-if="sheet.flavor" class="ds-flavor">{{ sheet.flavor }}</p>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'

defineProps({
  sheet: { type: Object, required: true },
})

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

function statCells(p) {
  return [
    { label: 'M', value: p.m },
    { label: 'T', value: p.t },
    { label: 'SV', value: p.sv },
    { label: 'W', value: p.w },
    { label: 'LD', value: p.ld },
    { label: 'OC', value: p.oc },
  ]
}
</script>

<style scoped>
.ds-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 0.9rem 1rem 1rem;
}

/* Stat line */
.ds-statline { margin-bottom: 0.7rem; }
.ds-prof-name {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}
.ds-stats { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.ds-stat {
  min-width: 3rem;
  text-align: center;
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.25rem 0.3rem;
}
.ds-stat-label {
  display: block;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
}
.ds-stat-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--text-primary);
}
.ds-stat-inv { border-color: var(--accent); }
.ds-stat-inv .ds-stat-label, .ds-stat-inv .ds-stat-value { color: var(--accent); }
.ds-inv-note { font-size: 0.75rem; font-style: italic; color: var(--text-muted); margin-top: 0.25rem; }

/* Weapons */
.ds-weapons { overflow-x: auto; margin-bottom: 0.7rem; }
.ds-weapons table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.ds-weapons th {
  text-align: center;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
  padding: 0.25rem 0.35rem;
  white-space: nowrap;
}
.ds-weapons td {
  text-align: center;
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  white-space: nowrap;
}
.ds-weapons .wname { text-align: left; white-space: normal; min-width: 10rem; }
.wtag { font-size: 0.72rem; }

/* Abilities */
.ds-abilities { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); }
.ds-ability-line { margin-bottom: 0.3rem; }
.ds-ability { margin-bottom: 0.45rem; }
.ds-group-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0.7rem 0 0.3rem;
}
.ds-damaged {
  margin-top: 0.6rem;
  padding: 0.5rem 0.7rem;
  border-left: 3px solid #c0392b;
  background: color-mix(in srgb, #c0392b 8%, transparent);
  border-radius: 0 4px 4px 0;
  font-size: 0.82rem;
}

.ds-block { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); margin-top: 0.5rem; }
.ds-list { margin: 0.2rem 0 0.3rem 1.1rem; padding: 0; }
.ds-loadout, .ds-option { margin-bottom: 0.3rem; white-space: pre-line; }

.ds-keywords {
  margin-top: 0.8rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ds-flavor {
  margin-top: 0.7rem;
  font-style: italic;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--text-muted);
}
</style>
