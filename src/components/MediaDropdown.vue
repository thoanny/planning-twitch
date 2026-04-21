<template>
  <Dropdown
    :options="medias"
    optionLabel="name"
    optionValue="id"
    placeholder="Sélectionnez un média"
    emptyMessage="Aucun média disponible"
    class="w-full"
    showClear
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        <img
          alt=""
          :src="medias?.find((media) => media.id == slotProps.value)?.dataUrl"
          :class="`mr-2 size-12 object-cover`"
        />
        <div>Média sélectionné</div>
      </div>
      <span v-else>
        <div class="flex items-center h-12">
          {{ slotProps.placeholder }}
        </div>
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center" style="max-width: 25rem">
        <img
          :alt="slotProps.option.name"
          :src="slotProps.option.dataUrl"
          :class="`mr-2 size-12 object-cover`"
        />
        <div class="truncate">{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import { useMediasStore } from '@/stores/medias';
import { storeToRefs } from 'pinia';
import Dropdown from 'primevue/dropdown';

const mediasStore = useMediasStore();
const { medias } = storeToRefs(mediasStore);
</script>
