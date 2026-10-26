<!-- One of a datasheet's two weapons tables, ranged or melee — the same table written out twice
     in DatasheetCard until 2026-10-12. -->
<template>
  <div class="ds-weapons">
    <table>
      <thead>
        <tr>
          <th class="wname">
            {{ melee ? labels.dsMelee : labels.dsRanged }}
          </th><th>Range</th><th>A</th><th>{{ melee ? 'WS' : 'BS' }}</th><th>S</th><th>AP</th><th>D</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(w, i) in rows"
          :key="i"
        >
          <!-- A weapon with several profiles: its name once, on a row of its own, and each
               profile under it by what tells them apart — "Plasma incinerator – supercharge ×5"
               in a half-row column broke over two lines on most phones (see weaponGroups.js). -->
          <tr
            v-if="w.gpos === 'start'"
            class="wg-head"
          >
            <td
              class="wname"
              colspan="7"
            >
              <span class="wname-text">{{ w.base }}<wbr v-if="w.qty > 1"><span
                v-if="w.qty > 1"
                class="wqty"
              >&times;{{ w.qty }}</span></span>
            </td>
          </tr>
          <tr :class="'wg-' + w.gpos">
            <td class="wname">
              <span class="wname-text"><span
                v-if="w.gpos !== 'single'"
                class="wprofile-arrow"
                aria-hidden="true"
              /><span
                v-if="w.gpos !== 'single'"
                class="wn-prof"
              >{{ w.profile }}</span><span :class="{ 'wn-full': w.gpos !== 'single' }">{{ w.name }}<wbr v-if="w.qty > 1"><span
                v-if="w.qty > 1"
                class="wqty"
              >&times;{{ w.qty }}</span></span></span><span
                v-if="w.enh"
                class="wenh"
                :title="w.enh"
              >{{ labels.dsEnhancementWeapon }}</span><span
                v-if="w.copy"
                class="wenh wcopy"
                :title="labels.dsWeaponCopyHint"
              >{{ labels.dsWeaponCopy }}</span><span
                v-if="w.tags?.length"
                class="wtags"
              ><span
                v-for="t in w.tags"
                :key="t"
                class="wtag"
              ><span
                v-if="ownRule(t)"
                class="keyword"
                role="button"
                tabindex="0"
                data-kw-open
                @click="openOwn(t, $event)"
                @keydown.enter="openOwn(t, $event)"
              >[{{ t }}]</span><span
                v-else
                v-safe-html="renderInline('[' + t + ']')"
              /></span></span>
            </td>
            <td data-label="Range">
              {{ melee ? 'Melee' : w.range }}
            </td><td
              data-label="A"
              :class="{ 'ds-stat-mod': isMarked(kind, 'a', i) }"
            >
              {{ w.a }}<sup
                v-if="isMarked(kind, 'a', i)"
                class="ds-mod-star"
              >*</sup>
            </td><td
              :data-label="skill.toUpperCase()"
              :class="{ 'ds-stat-mod': isMarked(kind, skill, i) }"
            >
              {{ w[skill] }}<sup
                v-if="isMarked(kind, skill, i)"
                class="ds-mod-star"
              >*</sup>
            </td><td
              data-label="S"
              :class="{ 'ds-stat-mod': isMarked(kind, 's', i) }"
            >
              {{ w.s }}<sup
                v-if="isMarked(kind, 's', i)"
                class="ds-mod-star"
              >*</sup>
            </td><td
              data-label="AP"
              :class="{ 'ds-stat-mod': isMarked(kind, 'ap', i) }"
            >
              {{ w.ap }}<sup
                v-if="isMarked(kind, 'ap', i)"
                class="ds-mod-star"
              >*</sup>
            </td><td
              data-label="D"
              :class="{ 'ds-stat-mod': isMarked(kind, 'd', i) }"
            >
              {{ w.d }}<sup
                v-if="isMarked(kind, 'd', i)"
                class="ds-mod-star"
              >*</sup>
            </td>
          </tr>
          <!-- Two rows on purpose (rosterModifiers' meleeRowsFor): said once, under the second,
               with the rule it rests on as a link (owner, 2026-10-11). -->
          <tr
            v-if="melee && w.copy === 2"
            class="wcopy-note"
          >
            <td colspan="7">
              <div
                v-safe-html="renderInline(labels.dsWeaponCopyNote)"
                class="wcopy-note-text"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'
import { vSafeHtml } from '../directives/safeHtml.js'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'
import { sheetRuleForTag } from '../core/rules/weaponTag.js'

// `rows` — useDatasheetParts' rangedRows / meleeRows, the profile groups already placed; `isMarked`
// — its question of which cells the roster's modifier layer rewrote, by table, stat and row.
const props = defineProps({
  kind: { type: String, required: true, validator: (k) => k === 'ranged' || k === 'melee' },
  rows: { type: Array, required: true },
  isMarked: { type: Function, required: true },
  // The sheet's own abilities (wargear, unit, special), localized — what a tag that is no core
  // ability stands for: [PSYCHIC ASSASSIN], [CONVERSION], [PLASMA WARHEAD]. Until 2026-10-16 such a
  // tap opened a core ability whose name it began with, or nothing.
  rules: { type: Array, default: () => [] },
})
const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])
const melee = computed(() => props.kind === 'melee')
const { openRule } = useKeywordPopover()
const ownRule = (tag) => sheetRuleForTag(tag, props.rules)
function openOwn(tag, e) {
  const r = ownRule(tag)
  if (r) openRule(`[${tag}]`, r.text, e.currentTarget.getBoundingClientRect())
}
// The skill column: Ballistic Skill for a ranged weapon, Weapon Skill for a melee one.
const skill = computed(() => (melee.value ? 'ws' : 'bs'))
</script>

<style scoped src="./datasheetMarks.css"></style>

<style scoped>
/* `margin: 0` because style.css gives every `table` a 1rem margin top and bottom — the card's own
   spacing (--ds-space, the 0.05rem between ranged and melee below) sat ON TOP of 32px of that
   between the two tables and 16px above and below the pair, unnoticed since the first commit
   (a player's screenshot, 2026-09-19). The card decides its gaps; the page rule is for prose. */
.ds-weapons table { width: 100%; border-collapse: collapse; font-size: 0.82rem; margin: 0; }
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

.ds-weapons td {
  text-align: center;
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  white-space: nowrap;
}
.ds-weapons .wname { text-align: left; white-space: normal; min-width: 10rem; }
/* The FIRST header cell is not a column label — it is the block's name ("Ranged Weapons"), the
   twin of the band over the abilities block, and it is read from across the table rather than
   scanned like RANGE / A / BS. So it holds `.ds-group-title`'s size and tracking at every width,
   including the narrow ones below where the six stat labels shrink to fit (owner, 2026-09-24).
   Sizing it apart from them is what makes that possible: the stat labels set the width of six
   columns, this one sits in the name's column and costs the row nothing. */
.ds-weapons th.wname { font-size: 0.68rem; letter-spacing: 1px; }
/* A weapon's name and numbers in the stat plates' face (owner, 2026-09-30): the condensed display
   font — the name in the body font read a size larger than numbers of the same size. 400, the
   regular face: 600 and then 500 at 1.25rem still read heavy beside the plates' 700 (owner,
   2026-09-30, and twice 2026-10-02). */
.ds-weapons td:not(.wname),
.ds-weapons .wname-text { font-family: var(--font-display); font-weight: 400; }
/* ONE scale for the weapon rows at every width (owner, 2026-10-02: "the sizes are inconsistent").
   Until then the name and the numbers were 20px in a narrow card and 13px in a wide one — a tablet
   or the desk read its weapons smaller than a phone did, beside a count (16px) and tags (12px)
   that had not shrunk with them. The name and numbers are 1.25rem everywhere; the count, the tags
   and the column labels hang off the same scale (below). */
.ds-weapons td:not(.wname),
.ds-weapons .wname-text { font-size: 1.25rem; line-height: 1.2; }
.wtags { margin-left: 0.35rem; }
/* A weapon the entry's enhancement gives it (rosterModifiers' withEnhancementWeapons): said beside
   its name, since nothing else on the row tells it from the datasheet's own. */
.wenh {
  display: inline-block; margin-left: 0.35rem; padding: 0 0.3rem;
  border: 1px solid var(--accent); color: var(--accent-ink);
  font-size: 0.62rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; vertical-align: 0.1em;
}
/* A second copy of a melee weapon on the same model (rosterModifiers' meleeRowsFor): a model fights
   with one (04.01), so the row says so where the number would otherwise read as more attacks. */
.wcopy { border-color: var(--border); color: var(--text-muted); text-transform: none; letter-spacing: 0; }
/* The note wraps at the table's width and never sets it: `width: 0; min-width: 100%` adds nothing to
   the column sizing an auto table does, then fills the cell the other rows sized. */
.wcopy-note td { padding-top: 0; white-space: normal; }
.wcopy-note-text {
  width: 0; min-width: 100%;
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 400; line-height: 1.35;
  text-transform: none; letter-spacing: 0; text-align: left; color: var(--text-muted);
}
/* A small gap between tags, across and between wrapped lines — butted together their frames read
   as one long box (owner, 2026-10-02). inline-block so the vertical margin takes. The stacked
   layout lays them out with a flex `gap` instead and zeroes this. */
.wtag { display: inline-block; font-size: 0.72rem; margin: 0 0.25rem 0.2rem 0; }
/* Weapon ability badges ([DEVASTATING WOUNDS]…) — the shared .keyword class (style.css)
   sizes itself in `em`, so nested in .wtag's already-small 0.72rem it rendered near-illegible
   (~9px) and the letters ran together. Pin it to a fixed, readable size instead of letting it
   compound with the ancestor font-size. */
.wtag :deep(.keyword) {
  font-size: 0.68rem;
  letter-spacing: 0.2px;
}

/* Multi-profile weapons (Wahapedia-style): each profile row carries an accent arrow-pennant
   before the name, and all rows of one weapon share a faint faction-accent background so the
   profiles read as one weapon. Single-profile weapons are untouched. */
.ds-weapons tr.wg-head td,
.ds-weapons tr.wg-start td,
.ds-weapons tr.wg-mid td,
.ds-weapons tr.wg-end td {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
/* The weapon's own name over its profiles — in a NARROW card only (the ≤560px block below). A wide
   card has the room for "Plasma Incinerator – supercharge ×5" on one line, so there each profile
   row keeps its full name and the heading row is not drawn (owner, 2026-10-02). */
.ds-weapons tr.wg-head { display: none; }
.wn-prof { display: none; }

/* Phones and narrow windows (≤560px): the table STAYS a table, tightened until it fits.
   Six stat columns plus a name is a lot for a phone, and this block used to hand the whole
   width back to the name by stacking each weapon into a card — three weapons then filled a
   screen that a table shows in a quarter of it, which is what makes a datasheet slow to read
   mid-game. So the columns are squeezed instead: smaller type, cells padded to almost nothing,
   the name column dropped to `min-width: 0` and given `width: 99%` so it absorbs whatever the
   six stat columns leave and wraps inside it, and the ability tags moved off the name's line
   onto their own beneath it. Nothing is hidden and nothing scrolls sideways.

   The floor used to be ~380px, and it was the tags that set it: `.keyword` is `white-space:
   nowrap` everywhere else, so `[DEVASTATING WOUNDS]` was a ~130px word the name column could not
   go under. Now that a tag may break (above), the floor is the six stat columns plus a readable
   name — MEASURED at 300px of card (2026-10-04, all 1283 sheets: at 304px, a 320px phone, no
   table is wider than the card, no number wraps, no word breaks, 124 of 6986 names take two
   lines and none three). Every phone in circulation keeps the table; the stacked layout below
   is the fallback for a narrower box, not a phone layout. */
@container dscard (max-width: 560px) {
  .ds-weapons table { font-size: 0.74rem; }
  .ds-weapons th {
    padding: 0.25rem 0.15rem;
    font-size: 0.55rem;
    letter-spacing: 0.3px;
  }
  /* …the six stat labels, not the block's name: that one keeps the full size (see the base rule). */
  .ds-weapons th.wname { font-size: 0.68rem; letter-spacing: 1px; }
  .ds-weapons td { padding: 0.3rem 0.15rem; }
  /* The numbers a size up from the squeezed table's (owner, 2026-09-30: "the numbers are tiny
     though there is room") — the stat columns spread over half the row, so they have it; the
     weapon's name reads at the same size (owner, the same day), wrapping in its half if it must.
     A size up again on a tighter line (owner, the same day: "the rows are tall, a larger font fits
     without making them taller") — 1.25rem × 1.2 is the line 1.02rem × 1.5 used to take. */
  /* The name takes a SHARE of the row, not everything that is left. `width: 99%` (what this
     was until 2026-08-27) squeezes the six stat columns to their content minimum and parks them
     against the right edge, so a row reading "Bolt pistol ×9" spent about 40% of its width on
     nothing — the void a reader has to cross to get from the name to the numbers, and the first
     thing anyone comparing this card to the GW app points at. At 50% the slack goes to the stat
     columns instead and they spread across their half — half rather than the 45% first tried,
     because at 45% a name like "Plasma pistol – supercharge ×2" wrapped on a 390px phone and
     did not on a 400px one.

     The cost, stated plainly: the ability tags live in this cell, so they now have ~50% of the
     row to wrap in, and a weapon carrying three of them takes a second line. That is why the
     keyword pills below are allowed to break. */
  .ds-weapons .wname {
    /* 55, not 50 (2026-10-02): measured over all 2432 weapon names on a 390px phone with "×5",
       50% broke 281 of them over two lines; the profile heading row cut that to 81 and this to
       27. The stat columns cannot be squeezed by it — where their values are wide ("D6+3") the
       table simply does not give the name its share. */
    width: calc(var(--wname-share) * 100%);
    min-width: 0;
    padding-left: 0.35rem;
  }
  .ds-weapons .wname-text { display: block; }
  /* Half a row is not enough for "Plasma Incinerator – supercharge ×5": measured over all 2432
     weapon names, 208 of the 281 that broke on a 390px phone were a profile. The weapon's name and
     count go on a heading row, closed up to the profiles under it, and each profile shows only
     what tells it apart. */
  .ds-weapons tr.wg-head { display: table-row; }
  .ds-weapons tr.wg-head td { padding-bottom: 0; border-bottom: none; }
  .ds-weapons tr.wg-start td { border-top: none; }
  .wn-prof { display: inline; }
  .wn-full { display: none; }
  /* Tags under the name rather than beside it: on the same line they are what pushes the six
     stat columns off the screen. */
  /* The tags run under the whole row, not just the name's half: the stat cells are one line tall,
     so the space under the numbers is free. In the name's half a long tag broke inside its pill —
     "[LETHAL HITS: NON-" over "MONSTER/VEHICLE]" in one tall frame (2026-09-30). Inline-size
     containment keeps the tags out of the column's own minimum, so the stat columns keep their
     share and the table its width. */
  /* The row's width is the name column's divided by its share — `--wname-share`, the one number
     both rules read. `200%` was right only while the share was 50%: at 55% it ran the tags 10% past
     the card's edge (2026-10-02). A percentage, not `cqw`: a length in px counts toward the cell's
     minimum width and pushed the whole table wider than the card. */
  .wtags { display: block; contain: inline-size; width: calc(100% / var(--wname-share) - 0.35rem); margin: 0.15rem 0 0; }
  .wtag { font-size: 0.6rem; }
  .wtag :deep(.keyword) { letter-spacing: 0; padding: 0 3px; }
  .wprofile-arrow { width: 10px; height: 7px; margin-right: 0.25rem; }
}

/* Narrower than any phone (≤300px): now the table gives up and each weapon becomes its own
   small card — the weapon name on its own line, the statline as a labelled six-column grid,
   then its ability tags. Same markup either way — no second template, no JS media query, and no
   risk of the two drifting — via `tr { display: grid }` plus `display: contents` on the name
   cell so its name and tags become grid items in their own right. The column labels come back as
   `td::before { content: attr(data-label) }`, since the shared `thead` is gone.

   Placed after the compact-table block above so it wins at equal specificity where the two
   disagree. 300 rather than the 560 this started as, the 380 it was until the tags were allowed
   to break, and the 340 picked by eye after that — which handed a 320-356px phone (and the
   roster modal on a 360px one) the stacked cards a few pixels short of a table that fitted.
   `npm run weapon-table` reads this number back and renders every sheet just above it: the
   table must fit the card, no number may wrap, no word may break, no name may take more than
   three lines.

   The `thead` is not hidden outright: its FIRST cell is the "Ranged Weapons"/"Melee Weapons"
   caption, which is the only thing telling the two blocks apart once they are stacked cards, so
   it survives as a section label above the group while the six stat headers go. Reusing that
   cell keeps one source for the text (and its translation) instead of adding a second one. */
@container dscard (max-width: 300px) {
  /* Undo the squeeze above — a card has room to be read, and only the table needed it. */
  .ds-weapons table { font-size: 0.82rem; }
  .wtag { font-size: 0.72rem; }
  .wtag :deep(.keyword) { letter-spacing: 0.2px; padding: 0 5px; }

  .ds-weapons table,
  .ds-weapons thead,
  .ds-weapons tbody,
  .ds-weapons thead tr { display: block; }
  /* Section caption: the accent-coloured label above the group, not the filled bar it is on a
     table (there is no row of columns left for it to head). */
  .ds-weapons th { display: none; }
  .ds-weapons th.wname {
    display: block;
    width: auto; /* not the table's 50% name share: the label above a stack of cards spans it */
    min-width: 0;
    padding: 0 0.1rem 0.3rem;
    background: none;
    color: var(--accent-ink);
    font-size: 0.68rem;
  }

  /* Each weapon (or each group of profiles) is its own card. */
  .ds-weapons tbody tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.05rem 0.2rem;
    margin-bottom: 0.25rem;
    padding: 0.35rem 0.4rem 0.4rem;
    border: 1px solid var(--border);
    background: color-mix(in srgb, var(--text-primary) 3%, transparent);
  }
  .ds-weapons tbody tr:last-child { margin-bottom: 0; }
  .ds-weapons td {
    display: block;
    padding: 0;
    border: none;
    text-align: center;
  }
  /* The name cell dissolves so its two children lay out as grid items themselves: the name on
     the first row, the tags after the stats (hence `order`, which the stat cells leave at 0). */
  .ds-weapons td.wname { display: contents; }
  .ds-weapons .wname-text {
    grid-column: 1 / -1;
    text-align: left;
    margin-bottom: 0.1rem;
  }
  .ds-weapons .wtags {
    grid-column: 1 / -1;
    order: 1;
    display: flex;
    flex-wrap: wrap;
    /* Undo the table's run under the whole row (above): the grid cell is the row already, and a
       200% width ran the tags off a 320px screen (2026-09-30). */
    width: auto;
    contain: none;
    gap: 0.25rem;
    margin: 0.2rem 0 0;
  }
  .ds-weapons .wtag { margin: 0; }
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
     between them, and the seams between them are drawn as internal dividers. */
  .ds-weapons tbody tr.wg-head,
  .ds-weapons tbody tr.wg-start,
  .ds-weapons tbody tr.wg-mid,
  .ds-weapons tbody tr.wg-end {
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }
  .ds-weapons tr.wg-head td,
  .ds-weapons tr.wg-start td,
  .ds-weapons tr.wg-mid td,
  .ds-weapons tr.wg-end td { background: none; }
  .ds-weapons tbody tr.wg-head,
  .ds-weapons tbody tr.wg-start,
  .ds-weapons tbody tr.wg-mid {
    margin-bottom: 0;
    border-bottom: none;
  }
  /* The heading opens the card; the first profile carries on inside it. */
  .ds-weapons tbody tr.wg-head { display: grid; padding-bottom: 0; }
  .ds-weapons tbody tr.wg-start { border-top: none; }
  .ds-weapons tbody tr.wg-mid,
  .ds-weapons tbody tr.wg-end { border-top: 1px dashed var(--border); }
}
/* Both hosts set their own `color` at a higher specificity than a bare class — `.ds-weapons td`
   and `.ds-stat-box` are class+element — so the mark has to match that or the value stays the
   default colour and only the asterisk shows. */
.ds-weapons td.ds-stat-mod,
.ds-weapons tbody td.ds-stat-mod { color: var(--accent-ink); }
</style>
