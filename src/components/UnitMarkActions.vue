<template>
  <!-- A unit's own rows in a "…" menu (an .act-list): pin, owned, copy the name, share. The unit's
       plate menu (FactionUnitSheet) and the unit list's chip menu (FactionUnitMenu) both carry
       them, around rows of their own. Each closes the menu first (`done`); what it did that has
       nothing left on screen to show it — a copy — is said (`say`). -->
  <button
    class="act-btn act-ico"
    @click="act(() => toggleUnitFavorite(slug, unitId))"
  >
    <i :class="fav ? 'wi wi-pin-on' : 'wi wi-pin-off'" />{{ fav ? labels.dsUnpinUnit : labels.dsPinUnit }}
  </button>
  <button
    class="act-btn act-ico"
    @click="act(() => toggleOwned(slug, unitId, name))"
  >
    <i :class="owned ? 'wi wi-own-on' : 'wi wi-own'" />{{ owned ? labels.dsOwnRemove : labels.dsOwnAdd }}
  </button>
  <button
    class="act-btn act-ico"
    @click="act(copyName)"
  >
    <i class="wi wi-copy" />{{ labels.dsCopyName }}
  </button>
  <button
    class="act-btn act-ico"
    @click="act(share)"
  >
    <i :class="canShare ? 'wi wi-share' : 'wi wi-link'" />{{ canShare ? labels.dsShare : labels.dsCopyLink }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useFavorites } from '../composables/useFavorites.js'
import { useCollection } from '../composables/useCollection.js'
import { canShare, copyText, shareUnit } from '../composables/useUnitShare.js'

const props = defineProps({
  slug: { type: String, required: true },
  unitId: { type: String, required: true },
  name: { type: String, required: true },
})
const emit = defineEmits(['done', 'say'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { isUnitFavorite, toggleUnitFavorite } = useFavorites()
const { isOwned, toggleOwned } = useCollection()
const fav = computed(() => isUnitFavorite(props.slug, props.unitId))
const owned = computed(() => isOwned(props.slug, props.unitId))

function act(fn) { emit('done'); fn() }
async function copyName() { if (await copyText(props.name)) emit('say', labels.value.dsCopied) }
async function share() { if (await shareUnit(props.slug, props.unitId, props.name, locale.value)) emit('say', labels.value.dsLinkCopied) }
</script>
