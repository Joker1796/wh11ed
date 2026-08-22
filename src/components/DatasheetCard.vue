<template>
  <article class="ds-card">
    <!-- Stat profiles -->
    <!-- The whole statline zone is part of the datasheet header: it bleeds over the card
         padding and carries an accent-tinted background, reading as one band with the
         solid faction-color name plate (.ds-head) that the parent view renders above. -->
    <!-- Grid: row 1 = the six stat columns + (multi-profile) model name to the right;
         row 2 = the invulnerable box straight under SV, with the faction-color band
         top-aligned to its right and the asterisk note under the band. -->
    <div v-if="sheet.profiles?.length" class="ds-cardhead">
      <div v-for="(p, i) in sheet.profiles" :key="i" class="ds-statline">
        <div class="ds-stats" :class="{ 'has-name': sheet.profiles.length > 1 }">
          <!-- Stat labels only once, above the first profile's row -->
          <div v-for="s in statCells(p)" :key="s.label" class="ds-stat">
            <span v-if="i === 0" class="ds-stat-label">{{ s.label }}</span>
            <span class="ds-stat-box" :class="{ 'ds-stat-mod': isMarked('profile', s.key, i) }">{{ s.value }}<sup v-if="isMarked('profile', s.key, i)" class="ds-mod-star" aria-hidden="true">*</sup></span>
          </div>
          <span v-if="sheet.profiles.length > 1" class="ds-prof-name">{{ p.name }} <span v-if="p.baseSize" class="ds-base">({{ fmtBase(p.baseSize) }})</span></span>
          <template v-if="p.inv">
            <div class="ds-stat ds-inv-box">
              <span class="ds-stat-box" :class="{ 'ds-stat-mod': isMarked('profile', 'inv', i) }">{{ p.inv }}{{ p.invNote ? '*' : '' }}<sup v-if="isMarked('profile', 'inv', i)" class="ds-mod-star" aria-hidden="true">*</sup></span>
            </div>
            <div class="ds-inv-side">
              <span class="ds-inv-band">Invulnerable Save</span>
              <span v-if="p.invNote" class="ds-inv-note">{{ invNoteText(p.invNote) }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Weapons -->
    <div v-if="sheet.ranged" class="ds-weapons">
      <table>
        <thead>
          <tr><th class="wname">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in rangedRows" :key="i" :class="'wg-' + w.gpos">
            <td class="wname"><span class="wname-text"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }}</span><span v-if="w.tags?.length" class="wtags"><span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></span></td>
            <td data-label="Range">{{ w.range }}</td><td data-label="A" :class="{ 'ds-stat-mod': isMarked('ranged', 'a', i) }">{{ w.a }}<sup v-if="isMarked('ranged', 'a', i)" class="ds-mod-star">*</sup></td><td data-label="BS" :class="{ 'ds-stat-mod': isMarked('ranged', 'bs', i) }">{{ w.bs }}<sup v-if="isMarked('ranged', 'bs', i)" class="ds-mod-star">*</sup></td><td data-label="S" :class="{ 'ds-stat-mod': isMarked('ranged', 's', i) }">{{ w.s }}<sup v-if="isMarked('ranged', 's', i)" class="ds-mod-star">*</sup></td><td data-label="AP" :class="{ 'ds-stat-mod': isMarked('ranged', 'ap', i) }">{{ w.ap }}<sup v-if="isMarked('ranged', 'ap', i)" class="ds-mod-star">*</sup></td><td data-label="D" :class="{ 'ds-stat-mod': isMarked('ranged', 'd', i) }">{{ w.d }}<sup v-if="isMarked('ranged', 'd', i)" class="ds-mod-star">*</sup></td>
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
          <tr v-for="(w, i) in meleeRows" :key="i" :class="'wg-' + w.gpos">
            <td class="wname"><span class="wname-text"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }}</span><span v-if="w.tags?.length" class="wtags"><span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></span></td>
            <td data-label="Range">Melee</td><td data-label="A" :class="{ 'ds-stat-mod': isMarked('melee', 'a', i) }">{{ w.a }}<sup v-if="isMarked('melee', 'a', i)" class="ds-mod-star">*</sup></td><td data-label="WS" :class="{ 'ds-stat-mod': isMarked('melee', 'ws', i) }">{{ w.ws }}<sup v-if="isMarked('melee', 'ws', i)" class="ds-mod-star">*</sup></td><td data-label="S" :class="{ 'ds-stat-mod': isMarked('melee', 's', i) }">{{ w.s }}<sup v-if="isMarked('melee', 's', i)" class="ds-mod-star">*</sup></td><td data-label="AP" :class="{ 'ds-stat-mod': isMarked('melee', 'ap', i) }">{{ w.ap }}<sup v-if="isMarked('melee', 'ap', i)" class="ds-mod-star">*</sup></td><td data-label="D" :class="{ 'ds-stat-mod': isMarked('melee', 'd', i) }">{{ w.d }}<sup v-if="isMarked('melee', 'd', i)" class="ds-mod-star">*</sup></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- What the roster's modifier layer did to the numbers above (Tier C). Every rewritten value
         carries a `*`; this is where the `*` is explained. A CONDITIONAL modifier appears here
         too, with its condition and WITHOUT having touched the number — that asymmetry is the
         whole point of the layer, so the two are rendered distinctly rather than as one list of
         "modifiers". -->
    <ul v-if="statNotes.length" class="ds-mods">
      <li class="ds-mods-h">{{ labels.dsModifiers }}</li>
      <li v-for="(n, i) in statNotes" :key="i" class="ds-mod" :class="{ 'ds-mod-when': !n.applied, 'ds-mod-live': n.applied && n.via }">
        <span class="ds-mod-delta">{{ modDelta(n) }}</span>
        <!-- The rule behind the number. A note whose caller could resolve the prose carries
             `hasSource`, and then the name itself opens it in the same popover a core ability or
             the faction line uses — otherwise the reader has to go find "Experimental
             Augmentations" in another block of the same card. -->
        <button
          v-if="n.hasSource"
          type="button"
          class="ds-mod-src ds-mod-srcbtn"
          @click="$emit('mod-source-click', n, $event.currentTarget.getBoundingClientRect())"
        >{{ n.source }}<span v-if="n.det" class="ds-mod-det"> · {{ n.det }}</span><i class="bi bi-info-circle"></i></button>
        <span v-else class="ds-mod-src">{{ n.source }}<span v-if="n.det" class="ds-mod-det"> · {{ n.det }}</span></span>
        <!-- `via` means the condition was PROVEN by the game in progress, so the number above was
             rewritten after all. The condition still shows — a value that is only true while
             something is switched on must never read as a printed one. -->
        <span v-if="n.when" class="ds-mod-cond"><i v-if="n.via" class="bi bi-lightning-charge-fill"></i> {{ n.when[locale] || n.when.en }}</span>
      </li>
    </ul>

    <!-- Abilities -->
    <div class="ds-abilities">
      <!-- Core abilities are clickable keywords: Leader, Deep Strike, Scouts 9"… all
           resolve in KeywordPopover via the coreAbilities lookup (exact or prefix match). -->
      <p v-if="sheet.core" class="ds-ability-line">
        <strong>{{ labels.dsCore }}:</strong>
        <template v-for="(c, i) in coreParts" :key="c">{{ i ? ', ' : ' ' }}<span class="keyword">{{ c }}</span></template>
      </p>
      <!-- Faction ability line. A caller that HAS the army rule's text (the roster's unit modal)
           passes its name in `linkedFactionRules`; that part then renders as a `.keyword` and
           opens in the same popover a core ability does, which is where the army rule belongs —
           the datasheet's own faction line is its statement of which army rule it has, so a sheet
           without one (128 of them: Anathema Psykana, Aeldari wraith constructs, aircraft…)
           correctly offers nothing to open. Parts with no match stay plain text. -->
      <p v-if="sheet.faction" class="ds-ability-line">
        <strong>{{ labels.dsFaction }}:</strong>
        <template v-for="(f, i) in factionParts" :key="f">{{ i ? ', ' : ' ' }}<span
          v-if="linkedFactionRule(f)"
          class="keyword"
          @click="$emit('faction-rule-click', linkedFactionRule(f), $event.currentTarget.getBoundingClientRect())"
        >{{ f }}</span><span v-else class="ds-faction-rule">{{ f }}</span></template>
      </p>
      <!-- Every block below (Abilities, Wargear/Special Abilities, ability sets, named rules,
           Damaged) collapses into an accordion when shown in a modal (`collapsible`) — stats,
           weapons and keywords never do (see the sections above/below). DsAccordion is headless
           (no markup/CSS of its own): the header slot keeps writing the exact same
           `.ds-group-title` element this always had, so none of this block's own styling moved. -->
      <div v-if="sheet.abilities" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsAbilities }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ labels.dsAbilities }}</h5>
          </template>
          <div v-for="a in sheet.abilities" :key="a.name" class="ds-ability" :class="{ 'ds-ability-idle': abilityState(a)?.on === false }">
            <strong>{{ a.name }}<span v-if="a.nameEn" class="ds-name-en"> ({{ a.nameEn }})</span>:</strong>
            <span v-if="abilityState(a)" class="ds-ab-state" :class="{ on: abilityState(a).on }">
              <i class="bi" :class="abilityState(a).on ? 'bi-link-45deg' : 'bi-slash-circle'"></i>{{ abilityStateLabel(abilityState(a)) }}
            </span>
            <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-if="sheet.wargearAbilities" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsWargearAbilities }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ labels.dsWargearAbilities }}</h5>
          </template>
          <div v-for="a in sheet.wargearAbilities" :key="a.name" class="ds-ability" :class="{ 'ds-ability-idle': abilityState(a)?.on === false }">
            <strong>{{ a.name }}<span v-if="a.nameEn" class="ds-name-en"> ({{ a.nameEn }})</span>:</strong>
            <span v-if="abilityState(a)" class="ds-ab-state" :class="{ on: abilityState(a).on }">
              <i class="bi" :class="abilityState(a).on ? 'bi-link-45deg' : 'bi-slash-circle'"></i>{{ abilityStateLabel(abilityState(a)) }}
            </span>
            <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-if="sheet.specialAbilities" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsSpecialAbilities }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ labels.dsSpecialAbilities }}</h5>
          </template>
          <div v-for="a in sheet.specialAbilities" :key="a.name" class="ds-ability" :class="{ 'ds-ability-idle': abilityState(a)?.on === false }">
            <strong>{{ a.name }}<span v-if="a.nameEn" class="ds-name-en"> ({{ a.nameEn }})</span>:</strong>
            <span v-if="abilityState(a)" class="ds-ab-state" :class="{ on: abilityState(a).on }">
              <i class="bi" :class="abilityState(a).on ? 'bi-link-45deg' : 'bi-slash-circle'"></i>{{ abilityStateLabel(abilityState(a)) }}
            </span>
            <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <!-- Selectable ability sets (Primarch/named-character "pick one" groups). The heading is
           the parent ability's name, so its "(see below)" reference resolves to this block. -->
      <div v-for="set in sheet.abilitySets" :key="set.name" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ set.name }}<span v-if="set.nameEn" class="ds-name-en"> ({{ set.nameEn }})</span></span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ set.name }}<span v-if="set.nameEn" class="ds-name-en"> ({{ set.nameEn }})</span></h5>
          </template>
          <div v-for="a in set.options" :key="a.name" class="ds-ability" :class="{ 'ds-ability-idle': abilityState(a)?.on === false }">
            <strong>{{ a.name }}<span v-if="a.nameEn" class="ds-name-en"> ({{ a.nameEn }})</span>:</strong>
            <span v-if="abilityState(a)" class="ds-ab-state" :class="{ on: abilityState(a).on }">
              <i class="bi" :class="abilityState(a).on ? 'bi-link-45deg' : 'bi-slash-circle'"></i>{{ abilityStateLabel(abilityState(a)) }}
            </span>
            <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-for="r in sheet.rules" :key="r.name" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ r.name }}<span v-if="r.nameEn" class="ds-name-en"> ({{ r.nameEn }})</span></span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ r.name }}<span v-if="r.nameEn" class="ds-name-en"> ({{ r.nameEn }})</span></h5>
          </template>
          <div class="ds-ability">
            <span v-html="dsRichText(r.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-if="sheet.damaged" class="ds-damaged">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-damaged-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsDamaged }}: {{ sheet.damaged.note }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <strong v-else>{{ labels.dsDamaged }}: {{ sheet.damaged.note }}</strong>
          </template>
          <div v-html="dsRichText(sheet.damaged.text)"></div>
        </DsAccordion>
      </div>
    </div>

    <!-- Transport / Leader -->
    <div v-if="sheet.transport" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ labels.dsTransport }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ labels.dsTransport }}</h5>
        </template>
        <div class="ds-ability" v-html="dsRichText(sheet.transport)"></div>
      </DsAccordion>
    </div>
    <div v-if="sheet.leader" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ leaderGroupLabel }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ leaderGroupLabel }}</h5>
        </template>
        <div class="ds-ability">
          <div v-html="dsRichText(sheet.leader.text)"></div>
          <ul class="ds-list">
            <li v-for="u in visibleLeaderUnits" :key="u">
              <RouterLink v-if="unitIndex?.get(u)" :to="`/factions/${factionSlug}/datasheets/${unitIndex.get(u)}`">{{ u }}</RouterLink>
              <template v-else>{{ u }}</template>
            </li>
          </ul>
          <div v-if="sheet.leader.footer" v-html="dsRichText(sheet.leader.footer)"></div>
        </div>
      </DsAccordion>
    </div>

    <!-- Composition / loadout / options.
         Hidden entirely under `hideChoices` (the roster builder): every one of these three
         describes a decision the roster has ALREADY made — how many models, what they start
         equipped with, what may be swapped — and the printed default loadout actively
         contradicts the card above it there, since the weapon tables are filtered to the
         entry's real loadout (see src/components/roster/CLAUDE.md). -->
    <div v-if="!hideChoices && (sheet.composition || sheet.loadout)" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ labels.dsComposition }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ labels.dsComposition }}</h5>
        </template>
        <div class="ds-ability">
          <ul v-if="sheet.composition" class="ds-list">
            <li v-for="c in sheet.composition" :key="c" v-html="dsText(c)"></li>
          </ul>
          <div v-if="sheet.loadout" class="ds-loadout" v-html="dsText(sheet.loadout)"></div>
        </div>
      </DsAccordion>
    </div>
    <div v-if="!hideChoices && sheet.options" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ labels.dsOptions }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ labels.dsOptions }}</h5>
        </template>
        <div class="ds-ability">
          <div v-for="(o, i) in sheet.options" :key="i" class="ds-option" v-html="dsText(o)"></div>
        </div>
      </DsAccordion>
    </div>

    <!-- Anything a caller wants to sit inside the card, above its closing Keywords line — the
         roster's "in effect for this unit" rule blocks land here so they read as part of the
         card rather than as something appended after it. Empty for every other caller. -->
    <slot name="before-keywords"></slot>

    <!-- Keywords -->
    <div class="ds-keywords">
      <div>
        <strong>{{ labels.dsKeywords }}:</strong>
        <template v-for="(g, gi) in keywordGroups" :key="gi">
          <template v-if="gi">{{ ' |' }}</template>
          <template v-if="g.model">{{ ' ' + g.model + ' -' }}</template>
          <template v-for="(k, i) in g.list" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw" :class="{ 'ds-kw-link': keywordLinksEnabled }" @click="keywordLinksEnabled && $emit('keyword-click', k)">{{ k }}</span></template>
        </template>
        <template v-for="g in extraKeywords" :key="'g:' + g.kw">{{ ', ' }}<span class="ds-kw" :class="{ 'ds-kw-link': keywordLinksEnabled }" @click="keywordLinksEnabled && $emit('keyword-click', g.kw)">{{ g.kw }}</span><sup class="ds-kw-star" aria-hidden="true">*</sup></template>
      </div>
      <div>
        <strong>{{ labels.dsFactionKeywords }}:</strong>
        <template v-for="(k, i) in sheet.factionKeywords" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw">{{ k }}</span></template>
      </div>
      <p v-for="n in extraKeywordNotes" :key="n.note" class="ds-kw-footnote">* {{ n.kws.join(', ') }} — {{ n.note }}</p>
    </div>

    <!-- Points: unit sizes × MFM copy tiers (1st-2nd / 3rd+ copy of this datasheet).
         Always the LAST section of the card (mirrors the source books: costs live at the
         bottom of a datasheet, never in its header) — an accent-tinted band like the
         statline zone at the top, so the card is framed by the faction colour. -->
    <div v-if="pointsTable && !collapsible" class="ds-points">
      <h5 class="ds-points-title">{{ labels.dsPoints }}</h5>
      <table>
        <thead>
          <tr>
            <th class="pname">{{ pointsTable.hasLabels ? '' : labels.dsModels }}</th>
            <th v-for="t in pointsTable.tiers" :key="t || 'pts'">{{ tierLabel(t) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in pointsTable.rows" :key="r.key">
            <td class="pname">{{ r.label || r.models }}</td>
            <td v-for="t in pointsTable.tiers" :key="t || 'pts'">{{ r.cells[t ?? ''] != null ? r.cells[t ?? ''] + ' pts' : '—' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="pointsTable.tiers.some((t) => t)" class="ds-points-note">{{ labels.dsPointsCopyNote }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { formatBaseSize } from '../utils/baseSize.js'
import { withGroupPos } from '../utils/weaponGroups.js'
import DsAccordion from './DsAccordion.vue'

const props = defineProps({
  sheet: { type: Object, required: true },
  // Name → id lookup (this faction's datasheets only) and the faction slug, used to turn
  // Leader/Attached-unit bodyguard-unit names into links to their own datasheet page.
  // Optional so DatasheetCard still works if a future caller doesn't wire them up — names
  // just render as plain text then, same as before this feature existed.
  unitIndex: { type: Object, default: null },
  factionSlug: { type: String, default: '' },
  // Modal usage (RosterUnitRulesModal — the roster builder's single "show this unit in a
  // modal" component): every info block except stats/weapons/keywords collapses into an
  // accordion, and Points is hidden outright (the unit's tile in the roster editor already
  // shows its points). The standalone datasheet page never sets this — full page, nothing to
  // save space on, so everything renders exactly as it always has.
  collapsible: { type: Boolean, default: false },
  // Keywords this unit GAINS from an army/detachment rule rather than having printed on its
  // sheet (e.g. Deathwing/Ravenwing via Dark Angels' The Unforgiven, or Battleline granted by a
  // detachment) — computed by the caller from the active army choice and merged into the keyword
  // line here, each flagged with a `*` and a footnote naming its source (see extraKeywordNotes
  // below) so it still reads as printed-card-accurate at a glance but a curious reader can tell
  // it's a rule grant, not ink on the card. Optional, so callers without a faction/detachment
  // context just render the printed keywords as before.
  // Shape: [{ kw: 'Shadow Legion', detName: 'Shadow Legion' | null, extra?: boolean }] — `detName`
  // is the active detachment's display name when the grant is gated on one, or null for a
  // roster-wide/Chapter grant that applies regardless of detachment. `extra: true` means the
  // grant ALSO depends on something beyond the detachment/faction context (currently always a
  // Warlord requirement) that isn't itself modelled — the footnote adds a caveat instead of
  // implying that context is the whole story.
  grantedKeywords: { type: Array, default: () => [] },
  // Leader/Attached-unit bodyguard-unit names to hide from `sheet.leader.units` entirely,
  // rather than render as a dead (unlinked) name — used for a name that resolves to a REAL
  // datasheet, just on a different faction's page (e.g. Dark Angels' shared "Ancient in
  // Terminator Armour" can attach to Deathwatch's own "Deathwatch Terminator Squad" via that
  // squad's own ATTACHED UNIT rule, but navigation is always within one faction's context, and
  // that target was never a valid attachment while THIS faction's army is what you're building —
  // see the raw ability text for the full, faction-agnostic list). A name with no datasheet
  // anywhere (a stale/Legends reference in the source rule text) is left as plain text, not
  // hidden — there's nothing to disambiguate there, it's just not a link target.
  otherFactionUnits: { type: Array, default: () => [] },
  // Cells the roster's modifier layer rewrote, as `profile:<stat>:<i>` / `ranged:<stat>:<row>` /
  // `melee:<stat>:<row>` keys (src/composables/rosterStatMods.js), and the notes explaining them.
  // A note with `applied: false` is a CONDITIONAL modifier: its number was deliberately left
  // printed, and the note is the only thing that says the value can change. One with both
  // `applied` and `via` is a conditional whose condition the live game proved — applied, but
  // still shown with its condition. A note may also carry `hasSource: true`, meaning the caller
  // holds the prose of the rule it came from and wants the name to open it (`mod-source-click`).
  // Empty for every caller outside the roster.
  statMarks: { type: Array, default: () => [] },
  statNotes: { type: Array, default: () => [] },
  // Whether an ability's own precondition holds right now, keyed by ENGLISH ability name (see
  // src/composables/abilityStatus.js). Only the abilities that HAVE one appear, so a plain
  // datasheet — and every caller outside the roster — passes nothing and renders as before.
  abilityStates: { type: Object, default: null },
  // Hide the build-choice blocks (Unit Composition, the default-loadout sentence, Wargear
  // Options). For a datasheet being READ those are the sheet; for a unit already in a roster they
  // are settled questions, and the loadout sentence disagrees with the weapon tables once those
  // are trimmed to what the entry actually fields. Off everywhere except the roster's unit modal.
  hideChoices: { type: Boolean, default: false },
  // Army-rule names this card's caller can open (see the faction line above). Matched against the
  // comma-separated parts of `sheet.faction` apostrophe- and case-insensitively, because the
  // datasheets and the faction files disagree on the glyph ("Martial Ka’tah" vs "Martial Ka'tah").
  linkedFactionRules: { type: Array, default: () => [] },
  // Whether printed/granted keywords open the "units with this keyword" modal. Off by default
  // for callers with no per-unit route to link to (Combat Patrol's fixed roster renders every
  // unit inline on one page, not as separate routed datasheets) — keywords there just stay
  // plain, non-interactive text instead of looking clickable and doing nothing.
  keywordLinksEnabled: { type: Boolean, default: false },
})
// Printed/granted keyword clicked (e.g. "Infantry") — the caller owns finding which other
// units share it and opening a modal; DatasheetCard has no access to the rest of the
// faction's roster. Faction keywords (ORKS, ADEPTUS ASTARTES…) deliberately stay plain text:
// virtually every unit on the page shares those, so a "units with this keyword" list would
// just be the whole roster.
defineEmits(['keyword-click', 'faction-rule-click', 'mod-source-click'])

const { locale } = useLocale()
const { renderInline, renderRichText } = useRenderInline()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)

const coreParts = computed(() => (props.sheet.core ? props.sheet.core.split(/,\s*/) : []))
// The faction line is a comma-separated list too ("Oath of Moment, Curse of the Wulfen"), and
// only the part the caller can actually open should look clickable.
const factionParts = computed(() => (props.sheet.faction ? props.sheet.faction.split(/,\s*/) : []))
const fkey = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()
function linkedFactionRule(part) {
  return props.linkedFactionRules.find((n) => fkey(n) === fkey(part)) || null
}

// The "Leader" ability-group heading above the bodyguard-unit list: a handful of
// characters carry the "Support" core ability instead of "Leader" (a Faction-Pack
// errata override — e.g. Necrons' six Cryptek Leaders, see datasheets/necrons.js's
// header comment) but populate the exact same sheet.leader field, so the heading must
// follow whichever core ability this specific sheet actually has.
const leaderGroupLabel = computed(() =>
  /\bSupport\b/.test(props.sheet.core || '') ? labels.value.dsSupport : labels.value.dsLeader,
)

// See the otherFactionUnits prop doc above — drop those names entirely rather than list a
// bodyguard target the current faction's army could never actually take.
const visibleLeaderUnits = computed(() => {
  const hidden = new Set(props.otherFactionUnits)
  return (props.sheet.leader?.units || []).filter((u) => !hidden.has(u))
})

// Per-model keyword split (e.g. The Silent King: keywords shared by every model in the
// unit vs ones that only apply to a specific named model) — sheet.keywordsByModel is
// [{ model, list }]; falls back to a single unlabelled group for the common flat-array case.
const keywordGroups = computed(() =>
  props.sheet.keywordsByModel ? props.sheet.keywordsByModel : [{ model: null, list: props.sheet.keywords || [] }],
)

// Rule-granted keywords (grantedKeywords prop) appended after the printed ones, minus any the
// sheet already prints in any model group — so a grant never doubles a printed keyword.
const extraKeywords = computed(() => {
  const printed = new Set(keywordGroups.value.flatMap((g) => g.list))
  return props.grantedKeywords.filter((g) => !printed.has(g.kw))
})

// One footnote line per distinct source (usually just one — either "this faction's own rules"
// for every roster-wide grant, or the single currently-active detachment for every gated one —
// but a unit could carry both kinds at once), grouping every keyword that shares it so e.g.
// Deathwing/Ravenwing (both roster-wide, no detachment) collapse into a single line instead of
// repeating the same source sentence twice.
const extraKeywordNotes = computed(() => {
  const groups = new Map()
  for (const g of extraKeywords.value) {
    let note = g.detName
      ? labels.value.dsKeywordGrantedByDetachment.replace('{det}', g.detName)
      : labels.value.dsKeywordGrantedByFaction
    // A grant can depend on more than just the detachment/faction context shown above (currently
    // always a Warlord requirement — see gen-conditional-keywords.mjs's header comment) — say so
    // rather than implying that context alone is the whole condition. Folded into the same
    // string (not a separate flag on the group) so an `extra` grant never silently merges with a
    // plain one that happens to share the same base sentence.
    if (g.extra) note += ' ' + labels.value.dsKeywordExtraCondition
    const kws = groups.get(note) || []
    kws.push(g.kw)
    groups.set(note, kws)
  }
  return [...groups.entries()].map(([note, kws]) => ({ note, kws }))
})

const rangedRows = computed(() => withGroupPos(props.sheet.ranged))
const meleeRows = computed(() => withGroupPos(props.sheet.melee))

// MFM points notes are either a bare copy tier ('1st-2nd', '3rd+', '2nd+', '1st-3rd'…),
// a composition label with the tier in parens ('3 Wolf Guard Headtakers (1st-2nd)'),
// or absent. Pivot them into rows (unit size / composition) × columns (copy tier).
const TIER_RE = /^\d+(?:st|nd|rd|th)(?:-\d+(?:st|nd|rd|th))?\+?$/
function splitNote(note) {
  if (!note) return { label: null, tier: null }
  if (TIER_RE.test(note)) return { label: null, tier: note }
  const m = note.match(/^(.*?)\s*\((\d[^)]*)\)$/)
  if (m) return { label: m[1], tier: m[2] }
  return { label: note, tier: null }
}

const pointsTable = computed(() => {
  const pts = props.sheet.points
  // Even a single flat cost renders (the card is the only place showing prices now —
  // the header plate deliberately carries none, matching the source datasheets).
  if (!pts?.length) return null
  const rows = []
  const tiers = []
  for (const p of pts) {
    const { label, tier } = splitNote(p.note)
    const key = label ?? String(p.models ?? '')
    let row = rows.find((r) => r.key === key)
    if (!row) {
      row = { key, label, models: p.models, cells: {} }
      rows.push(row)
    }
    if (!tiers.includes(tier)) tiers.push(tier)
    row.cells[tier ?? ''] = p.points
  }
  return { rows, tiers, hasLabels: rows.some((r) => r.label) }
})

// '1st-2nd' / '3rd+' → "1st–2nd copy" / «1–2-я копия»: which copy of this datasheet
// in the army the price applies to (explained by the note under the table).
function tierLabel(tier) {
  if (!tier) return labels.value.dsPoints
  if (locale.value === 'ru') {
    const nums = (tier.match(/\d+/g) || []).join('–')
    return `${nums}-я${tier.includes('+') ? '+' : ''} копия`
  }
  return `${tier.replace('-', '–')} copy`
}

// invNote data is inconsistent about the leading asterisk — normalize to one '* '.
function invNoteText(note) {
  return '* ' + note.replace(/^\*\s*/, '')
}

// Bold this sheet's faction keywords (ORKS, ADEPTUS ASTARTES…) wherever the rules text
// mentions them, matching the codex typography. [BRACKET] tags and existing **bold**
// runs are matched first and passed through untouched so the markup never nests.
const factionKwRegex = computed(() => {
  const kws = (props.sheet.factionKeywords || [])
    .map((k) => k.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
  return kws.length ? new RegExp(`\\[[^\\]]*\\]|\\*\\*.*?\\*\\*|\\b(${kws.join('|')})\\b`, 'g') : null
})

function markFactionKw(text) {
  const re = factionKwRegex.value
  return re ? text.replace(re, (m, kw) => (kw ? `**${kw}**` : m)) : text
}

function dsText(text) {
  return renderInline(markFactionKw(text))
}

// Ability/rule bodies are transcribed with the same `▪ ` bullet-list convention as the core
// rules body markup (see wh11ed/CLAUDE.md's body-markup table) but never went through RuleBody's
// block parser — dsText() alone just inlined the literal "▪" characters and the `\n`s collapsed
// under normal white-space, running every item onto one line. renderRichText renders real
// <ul>/<ol> like RuleBody; markFactionKw bolds this sheet's faction keywords first, and the
// generated lists reuse the sheet's existing `.ds-list` styling.
function dsRichText(text) {
  return renderRichText(text, { pre: markFactionKw, listClass: 'ds-list' })
}

function statCells(p) {
  return [
    { key: 'm', label: 'M', value: p.m },
    { key: 't', label: 'T', value: p.t },
    { key: 'sv', label: 'SV', value: p.sv },
    { key: 'w', label: 'W', value: p.w },
    { key: 'ld', label: 'LD', value: p.ld },
    { key: 'oc', label: 'OC', value: p.oc },
  ]
}

// A cell whose printed number was rewritten by the roster's modifier layer (Tier C). The mark is
// the same `*` the granted-keyword treatment uses, and for the same reason: the value on screen
// is no longer what the card prints, and the reader is owed both that signal and the footnote
// naming the rule responsible.
const markSet = computed(() => new Set(props.statMarks))
const isMarked = (on, stat, index) => markSet.value.has(`${on}:${stat}:${index}`)

// An ability's precondition, keyed by the English name — which is what `nameEn` carries once the
// RU overlay has renamed the header (see src/data/datasheets/ru/index.js).
const abilityState = (a) => props.abilityStates?.[a.nameEn || a.name] || null
// The badge deliberately states the FACT the roster knows ("leading Chaos Space Marines"), not the
// conclusion that the rule is therefore doing something: several of these abilities carry a second
// condition in the same sentence ("…leading a unit that is below its Starting Strength"). The
// negative side is the one that can be stated outright — not attached is not in effect, always.
function abilityStateLabel(st) {
  const l = labels.value
  if (st.id === 'led') return st.on ? l.dsAbilityLed : l.dsAbilityNotLed
  if (!st.on) return l.dsAbilityNotLeading
  return st.subject ? l.dsAbilityLeading.replace('{name}', st.subject) : l.dsAbilityLeadingAny
}

const STAT_LABEL = { m: 'M', t: 'T', sv: 'SV', w: 'W', ld: 'LD', oc: 'OC', inv: 'INV', a: 'A', bs: 'BS', ws: 'WS', s: 'S', ap: 'AP', d: 'D', range: 'RANGE' }
// "+2 S", "SV −1", "INV = 5+" — deliberately symbolic rather than a sentence, so the note needs
// no translating of its own beyond the condition text the record already carries bilingually.
function modDelta(n) {
  const stat = STAT_LABEL[n.stat] || String(n.stat).toUpperCase()
  if (n.op === 'set') return `${stat} = ${n.value}`
  if (n.op === 'improve') return `${stat} −${n.value}`
  // A value can be a dice expression ("D3") on a conditional modifier, which Number() can't sign.
  const signed = Number.isFinite(Number(n.value)) && Number(n.value) < 0 ? '' : '+'
  return `${signed}${n.value} ${stat}`
}
</script>

<style scoped>
.ds-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 0.9rem 1rem 1rem;
}

/* Header zone of the card: bleeds over the card padding so the accent-tinted band runs
   edge-to-edge under the solid name plate above; a border separates it from the body.
   Stat boxes get a plain card-colored fill so they pop on the tinted background. */
.ds-cardhead {
  margin: -0.9rem -1rem 0.8rem;
  padding: 0.75rem 1rem 0.7rem;
  background: color-mix(in srgb, var(--ds-th-bg, var(--accent)) 10%, var(--bg-card));
  border-bottom: 1px solid var(--border);
}
.ds-cardhead .ds-stat-box::before { background: var(--bg-card); }
.ds-cardhead .ds-statline:last-child { margin-bottom: 0; }

/* Stat line (consecutive profile rows sit tight — labels render only on the first) */
.ds-statline { margin-bottom: 0.7rem; }
.ds-statline:has(+ .ds-statline) { margin-bottom: 0.35rem; }
.ds-stats {
  display: grid;
  grid-template-columns: repeat(6, max-content) minmax(0, 1fr);
  gap: 0.35rem;
  align-items: start;
}
.ds-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.ds-stat-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
}
/* Stat boxes: 10th-ed look — no rounding, top-left + bottom-right corners chamfered.
   clip-path can't carry a border, so the fill is an inset ::before over a border-colour
   base (isolation keeps the z-index:-1 fill inside this box). Numbers are big + heavy. */
.ds-stat-box {
  position: relative;
  isolation: isolate;
  display: block;
  min-width: 3.1rem;
  text-align: center;
  background: var(--border);
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
  padding: 0.28rem 0.3rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.65rem;
  line-height: 1.1;
  color: var(--text-primary);
}
.ds-stat-box::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
}
/* Multi-profile model name: right of the stat row, vertically centred on it. */
.ds-prof-name {
  grid-column: 7;
  grid-row: 1;
  align-self: center;
  justify-self: start;
  padding-left: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.25;
  color: var(--text-muted);
}
/* Base size (⌀32mm / 75×42mm …) after the model name — secondary: same muted colour as
   the name but lighter weight, so it never stands out more than the model name itself. */
.ds-prof-name .ds-base {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-muted);
  white-space: nowrap;
}
/* Invulnerable save: shield straight under SV (column 3), label + note to its right.
   Source style — the value sits in a downward-pointing shield (flat top, pointed bottom)
   and the label is plain uppercase text, not a coloured pill. */
.ds-inv-box { grid-column: 3; grid-row: 2; }
.ds-inv-box .ds-stat-box,
.ds-inv-box .ds-stat-box::before {
  clip-path: polygon(0 0, 100% 0, 100% 52%, 50% 100%, 0 52%);
}
.ds-inv-box .ds-stat-box { padding-bottom: 0.85rem; }
.ds-inv-side {
  grid-column: 4 / -1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
}
.ds-inv-band {
  color: var(--accent);
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap;
}
.ds-inv-note { font-size: 0.72rem; font-style: italic; line-height: 1.35; color: var(--text-muted); }

@media (max-width: 480px) {
  .ds-stat-box {
    min-width: 2.7rem;
    font-size: 1.4rem;
    padding: 0.24rem;
    clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
  }
  .ds-stat-box::before {
    clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
  }
  .ds-inv-box .ds-stat-box,
  .ds-inv-box .ds-stat-box::before {
    clip-path: polygon(0 0, 100% 0, 100% 52%, 50% 100%, 0 52%);
  }
}

/* Mobile: multi-profile model names move above their stat row (right of it on desktop) */
@media (max-width: 640px) {
  .ds-stats.has-name .ds-prof-name {
    grid-column: 1 / -1;
    grid-row: 1;
    align-self: end;
    padding-left: 0;
  }
  .ds-stats.has-name .ds-stat { grid-row: 2; }
  .ds-stats.has-name .ds-inv-box { grid-row: 3; }
  .ds-stats.has-name .ds-inv-side { grid-row: 3; }
}

/* Points — closing faction-colour band: bleeds over the card padding (mirroring
   .ds-cardhead at the top) with the same accent-tinted fill, so the header and the
   costs frame the card in the faction colour. */
.ds-points {
  overflow-x: auto;
  margin: 0.8rem -1rem -1rem;
  padding: 0.55rem 1rem 0.75rem;
  background: color-mix(in srgb, var(--ds-th-bg, var(--accent)) 10%, var(--bg-card));
  border-top: 1px solid var(--border);
  border-radius: 0 0 5px 5px;
}
.ds-points-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0 0 0.25rem;
}
.ds-points table { border-collapse: collapse; font-size: 0.8rem; }
.ds-points th {
  text-align: center;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  /* Override the global dark `th` fill — the points band already carries its own
     accent-tinted background, so the header must stay transparent (was dark in light theme). */
  background: none;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  padding: 0.2rem 0.7rem;
  white-space: nowrap;
}
.ds-points td {
  text-align: center;
  padding: 0.25rem 0.7rem;
  color: var(--text-primary);
  font-family: var(--font-mono);
  white-space: nowrap;
}
.ds-points .pname { text-align: left; padding-left: 0; }
.ds-points td.pname { font-family: var(--font-sans); color: var(--text-muted); white-space: normal; }
.ds-points-note {
  margin-top: 0.35rem;
  font-size: 0.72rem;
  font-style: italic;
  color: var(--text-muted);
}

/* Weapons */
.ds-weapons { overflow-x: auto; margin-bottom: 0.7rem; }
/* Ranged immediately followed by melee: tighten the gap between the two tables — the 0.7rem
   above is for what comes after the LAST weapons table (abilities/keywords/points), which still
   wants the fuller gap. */
.ds-weapons:has(+ .ds-weapons) { margin-bottom: 0.05rem; }
/* …and the same for a weapons table immediately followed by the modifier footnotes: they explain
   the numbers in that table, so they have to read as attached to it. */
.ds-weapons:has(+ .ds-mods) { margin-bottom: 0.3rem; }
.ds-weapons table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.ds-weapons th {
  text-align: center;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #fff;
  background: var(--ds-th-bg, var(--accent));
  padding: 0.3rem 0.35rem;
  white-space: nowrap;
}

.ds-weapons th:first-child { border-top-left-radius: 4px; }
.ds-weapons th:last-child { border-top-right-radius: 4px; }
.ds-weapons td {
  text-align: center;
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  white-space: nowrap;
}
.ds-weapons .wname { text-align: left; white-space: normal; min-width: 10rem; }
.wtags { margin-left: 0.35rem; }
.wtag { font-size: 0.72rem; }
/* Weapon ability badges ([DEVASTATING WOUNDS]…) — the shared .keyword class (style.css)
   sizes itself in `em`, so nested in .wtag's already-small 0.72rem it rendered near-illegible
   (~9px) and the letters ran together. Pin it to a fixed, readable size instead of letting it
   compound with the ancestor font-size. */
.wtag :deep(.keyword) {
  font-size: 0.74rem;
  letter-spacing: 0.2px;
}

/* Multi-profile weapons (Wahapedia-style): each profile row carries an accent arrow-pennant
   before the name, and all rows of one weapon share a faint faction-accent background so the
   profiles read as one weapon. Single-profile weapons are untouched. */
.ds-weapons tr.wg-start td,
.ds-weapons tr.wg-mid td,
.ds-weapons tr.wg-end td {
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

/* Very narrow phones (≤480px): placed after the base .ds-card/.ds-cardhead/.ds-points/
   .ds-weapons rules above so it wins the cascade at equal specificity (a same-specificity
   override defined earlier in the file, e.g. inside the .ds-stat-box media block, loses to
   these later unconditional rules regardless of the media query matching). The card bleeds
   past .main-content's own gutter to the true viewport edge (same 100vw trick as
   FactionPickerBar's .fpb) and loses its rounding — a full-bleed native-feeling section
   flush under the header, not a floating card with two stacked gutters. Its own small
   0.4rem padding is what's left to keep content off the screen edge; the header/points
   bands re-bleed to the CARD's edge (their negative margins key off that 0.4rem), and
   tighten the weapon/points tables, which otherwise have no responsive treatment at all:
   .wname's 10rem floor plus nowrap on every other cell forces horizontal scroll well
   before this. */
@media (max-width: 480px) {
  .ds-card {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0.9rem 0.4rem 0.6rem;
    border-radius: 0;
  }
  .ds-cardhead { margin: -0.9rem -0.4rem 0.8rem; padding: 0.75rem 0.4rem 0.7rem; }
  .ds-points { margin: 0.8rem -0.4rem -0.6rem; padding: 0.55rem 0.4rem 0.75rem; }

  /* Bleed the weapon table to the card's edges too, same as .ds-cardhead/.ds-points above —
     the gutter comes from the cells' own padding, not from staying inset. */
  .ds-weapons {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
  .ds-weapons th:first-child,
  .ds-weapons th:last-child {
    border-radius: 0;
  }
  .ds-points table {
    font-size: 0.72rem;
  }
  .ds-points th,
  .ds-points td {
    padding: 0.2rem 0.3rem;
  }
}

/* Phones: the weapon tables stop being tables.
   A six-column statline plus a weapon name never fits a phone without either a horizontal
   scroll or columns squeezed past legibility — this file used to do the latter. Below 560px
   (the same width BaseModal treats as "phone"; tablets start at 600) each row becomes its own
   small card: the weapon name on its own line, then the statline as a labelled six-column grid,
   then its ability tags. Same markup either way — no second template, no JS media query, and no
   risk of the two drifting — via `tr { display: grid }` plus `display: contents` on the name
   cell so its name and tags become grid items in their own right. The column labels come back as
   `td::before { content: attr(data-label) }`, since the shared `thead` is gone.

   The `thead` is not hidden outright: its FIRST cell is the "Ranged Weapons"/"Melee Weapons"
   caption, which is the only thing telling the two blocks apart once they are stacked cards, so
   it survives as a section label above the group while the six stat headers go. Reusing that
   cell keeps one source for the text (and its translation) instead of adding a second one. */
@media (max-width: 560px) {
  .ds-weapons { overflow-x: visible; }
  /* Cancel the ≤480px edge bleed: these are bordered, rounded cards now, and running them off
     the screen would clip the rounding on both sides. */
  .ds-weapons { margin-left: 0; margin-right: 0; }
  /* A real gap between the ranged block and the melee block — they are two labelled sections
     now, not two halves of one table (the base rule tightens them to 0.05rem). */
  .ds-weapons:has(+ .ds-weapons) { margin-bottom: 0.8rem; }

  .ds-weapons table,
  .ds-weapons thead,
  .ds-weapons tbody,
  .ds-weapons thead tr { display: block; }
  /* Section caption: the accent-coloured label above the group, not the filled bar it is on a
     table (there is no row of columns left for it to head). */
  .ds-weapons th { display: none; }
  .ds-weapons th.wname {
    display: block;
    min-width: 0;
    padding: 0 0.1rem 0.3rem;
    background: none;
    color: var(--accent);
    border-radius: 0;
    font-size: 0.64rem;
  }

  /* Each weapon (or each group of profiles) is its own card. */
  .ds-weapons tbody tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.1rem 0.2rem;
    margin-bottom: 0.35rem;
    padding: 0.5rem 0.55rem 0.55rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: color-mix(in srgb, var(--text-primary) 3%, transparent);
  }
  .ds-weapons tbody tr:last-child { margin-bottom: 0; }
  .ds-weapons td {
    display: block;
    padding: 0;
    border: none;
    text-align: center;
    font-weight: 600;
  }
  /* The name cell dissolves so its two children lay out as grid items themselves: the name on
     the first row, the tags after the stats (hence `order`, which the stat cells leave at 0). */
  .ds-weapons td.wname { display: contents; }
  .ds-weapons .wname-text {
    grid-column: 1 / -1;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0.15rem;
  }
  .ds-weapons .wtags {
    grid-column: 1 / -1;
    order: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin: 0.3rem 0 0;
  }
  .ds-weapons td[data-label]::before {
    content: attr(data-label);
    display: block;
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* A multi-profile weapon stays ONE card: the profiles keep the group tint, lose the gap
     between them, and share the rounding — only the group's ends are rounded, and the seams
     between profiles are drawn as internal dividers. */
  .ds-weapons tbody tr.wg-start,
  .ds-weapons tbody tr.wg-mid,
  .ds-weapons tbody tr.wg-end {
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }
  .ds-weapons tr.wg-start td,
  .ds-weapons tr.wg-mid td,
  .ds-weapons tr.wg-end td { background: none; }
  .ds-weapons tbody tr.wg-start,
  .ds-weapons tbody tr.wg-mid {
    margin-bottom: 0;
    border-bottom: none;
  }
  .ds-weapons tbody tr.wg-start { border-radius: 6px 6px 0 0; }
  .ds-weapons tbody tr.wg-mid { border-radius: 0; }
  .ds-weapons tbody tr.wg-end { border-radius: 0 0 6px 6px; }
  .ds-weapons tbody tr.wg-mid,
  .ds-weapons tbody tr.wg-end { border-top: 1px dashed var(--border); }
}

/* Modifier footnotes — quiet, small, and clearly secondary to the card's own content: they
   explain the `*` on a rewritten value, they are not part of the printed datasheet. */
/* Sits with the weapon tables it annotates, not floating between them and the abilities below:
   the gap above is closed (see the `:has` rule under .ds-weapons) and a rule + a wider gap
   separate it from whatever follows. Symmetric margins made it read as belonging to neither. */
.ds-mods {
  list-style: none;
  margin: 0 0 0.9rem;
  padding: 0 0 0.7rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.76rem;
}
.ds-mods-h {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin-bottom: 0.2rem;
}
.ds-mod { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.35rem; color: var(--text-muted); }
.ds-mod-delta { font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums; }
.ds-mod-src { color: var(--text-primary); }
.ds-mod-srcbtn {
  display: inline-flex; align-items: baseline; gap: 0.25rem;
  padding: 0; border: 0; background: none; font: inherit; color: var(--text-primary);
  cursor: pointer; text-align: left;
}
.ds-mod-srcbtn:hover { color: var(--accent); }
.ds-mod-srcbtn .bi { font-size: 0.85em; color: var(--text-muted); }
.ds-mod-srcbtn:hover .bi { color: var(--accent); }
.ds-mod-det { color: var(--text-muted); }
/* A conditional modifier didn't change anything on the card — the dimmed delta says so at a
   glance, and the condition follows. */
.ds-mod-when .ds-mod-delta { font-weight: 600; color: var(--text-muted); }
.ds-mod-cond { flex-basis: 100%; padding-left: 0.1rem; font-style: italic; }
/* Applied because the game says so, not because it is printed — the accent marks the difference
   at a glance, the italic condition beside it says what would take it away again. */
.ds-mod-live .ds-mod-cond { color: var(--accent); font-style: normal; }
.ds-mod-live .ds-mod-delta { color: var(--accent); }
/* The `*` on a value the layer rewrote, and its cell. Same asterisk convention as the granted
   keywords' `.ds-kw-star`.
   `line-height: 0` + `position: relative` instead of the default `vertical-align: super`: a real
   superscript grows the line box UPWARDS, and since the line starts right under the column label
   in the phone layout, that pushed the marked value's baseline down and left it sitting lower
   than its neighbours in the stat row. This raises the glyph without it occupying any height.
   The value itself is marked by COLOUR rather than an underline — an underline spans the whole
   grid cell, label included, which read as a heavy bar under one column. The `::before` label
   sets its own colour, so it stays muted. */
.ds-mod-star {
  position: relative;
  top: -0.4em;
  vertical-align: baseline;
  line-height: 0;
  font-size: 0.7em;
  color: var(--accent);
  font-weight: 700;
  margin-left: 1px;
}
/* Both hosts set their own `color` at a higher specificity than a bare class — `.ds-weapons td`
   and `.ds-stat-box` are class+element — so the mark has to match that or the value stays the
   default colour and only the asterisk shows. */
.ds-weapons td.ds-stat-mod,
.ds-weapons tbody td.ds-stat-mod,
span.ds-stat-box.ds-stat-mod { color: var(--accent); }

/* Abilities */
.ds-abilities { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); }
.ds-faction-rule { font-weight: 600; }
.ds-ability-line { margin-bottom: 0.3rem; }
/* Core-ability badges (Deep Strike, Leader…) — same fixed-size fix as .wtag's .keyword
   above, so they read clearly instead of the shared class's default em-scaled size. */
.ds-ability-line .keyword {
  font-size: 0.76rem;
  letter-spacing: 0.2px;
}
.ds-ability { margin-bottom: 0.45rem; }
/* An ability's own precondition, answered by the army list: whether this model is leading a unit
   (or being led). Inline with the name, quiet when it holds — the ability reads normally, the chip
   is a confirmation — and the whole row dims when it does not, because a printed ability that
   cannot be doing anything is exactly what a reader keeps re-reading. */
.ds-ab-state {
  display: inline-flex; align-items: baseline; gap: 0.2rem; margin-right: 0.3rem;
  color: var(--text-muted); font-size: 0.78em; font-style: italic;
}
.ds-ab-state.on { color: var(--accent); font-style: normal; }
.ds-ab-state .bi { font-size: 0.9em; font-style: normal; }
.ds-ability-idle { opacity: 0.62; }

/* The English original beside a translated ability name (RU locale only — in EN there is nothing
   to keep). Deliberately quiet: it is a lookup key for the codex and for talking to an opponent,
   not a second title, so it never competes with the name it follows. */
.ds-name-en { font-weight: 400; font-size: 0.85em; color: var(--text-muted); text-transform: none; letter-spacing: 0; }
.ds-group-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0.7rem 0 0.3rem;
}
/* Accordion header variant (collapsible/modal mode only) — same `.ds-group-title` look, reset to
   a full-width clickable row with the chevron at the end. Non-collapsible callers never render
   this class (see the h5 fallback in the template), so the plain page is untouched. */
.ds-group-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  text-align: left;
}
.ds-chev { font-size: 0.7rem; flex-shrink: 0; }
/* Damaged's own header isn't a `.ds-group-title` (no uppercase/accent styling — it's the same
   bold inline label the box always had); the accordion button variant just adds the chevron row
   layout on top of that, using the surrounding red instead of the accent colour. */
.ds-damaged-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  border: none;
  background: none;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  color: inherit;
}
/* Plain and special abilities each sit in a faction-accent-tinted card with a solid-fill
   header bar (same idiom as the weapon table headers), so the two categories read as
   distinct groups rather than one undifferentiated list. */
.ds-ability-group {
  margin: 0.6rem 0;
  border-radius: 4px;
  overflow: hidden;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-primary);
}
.ds-ability-group > .ds-group-title {
  margin: 0;
  padding: 0.3rem 0.7rem;
  background: var(--ds-th-bg, var(--accent));
  color: #fff;
}
.ds-ability-group .ds-ability { margin: 0.45rem 0.7rem; }
.ds-ability-group .ds-ability:first-of-type { margin-top: 0.5rem; }
.ds-ability-group .ds-ability:last-child { margin-bottom: 0.5rem; }
.ds-damaged {
  margin-top: 0.6rem;
  padding: 0.5rem 0.7rem;
  border-left: 3px solid #c0392b;
  background: color-mix(in srgb, #c0392b 8%, transparent);
  border-radius: 0 4px 4px 0;
  font-size: 0.82rem;
}

/* Very narrow phones: bleed ability groups to the card's edges too (placed after the
   base .ds-ability-group rule above so it wins the cascade — see the .ds-weapons media
   block earlier for why source order matters here). Square corners since it's flush
   against the card border now, not floating mid-card. */
@media (max-width: 480px) {
  .ds-ability-group {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
    border-radius: 0;
  }
}

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

.ds-kw {
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-primary);
}

/* Printed/granted unit keywords open a "units with this keyword" modal — signal it the same
   quiet way .def-link does (dotted underline, no pill/background) rather than a stronger
   treatment that would fight the plain-printed-card look of the rest of the Keywords line. */
.ds-kw-link {
  cursor: pointer;
  text-decoration: underline dotted;
  text-underline-offset: 2px;
}

.ds-kw-link:hover {
  color: var(--link-accent-hover);
}

.ds-kw-star {
  color: var(--accent);
  margin-left: 1px;
}

.ds-kw-footnote {
  margin: 0.2rem 0 0;
  font-size: 0.72rem;
  font-style: italic;
  color: var(--text-muted);
}

</style>

<!-- Unscoped on purpose (same reason as FactionLayout): a data-theme selector above the
     component root can't be expressed in scoped CSS without the :global() pitfall.
     Weapon-table headers are Wahapedia-style solid faction-color bands with white text.
     In the dark theme the accents are deliberately LIGHT (unreadable under white text),
     so the band uses the faction's dark variant (--fa-light, inherited from
     FactionLayout) — darkened plain accent as the non-faction fallback. -->
<style>
/* --bg-row-hover is a hardcoded brand-red rgba on :root and does NOT follow the faction
   --accent, so table row-hover on datasheets flashed the global red. Re-point it at the
   faction accent for every table inside the card. (The zebra --bg-row-alt is a neutral
   olive, not red, so it's left alone.) */
.ds-card {
  --ds-th-bg: var(--accent);
  --bg-row-hover: color-mix(in srgb, var(--accent) 14%, transparent);
}
@media (prefers-color-scheme: dark) {
  .ds-card { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
}
:root[data-theme='light'] .ds-card { --ds-th-bg: var(--accent); }
:root[data-theme='dark'] .ds-card { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
</style>
