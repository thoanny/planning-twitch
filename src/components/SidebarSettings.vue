<script setup>
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings.js';

import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

import colors from '@/data/colors.json';
import patterns from '@/data/patterns.json';
import fonts from '@/data/fonts.json';
import socials from '@/data/socials.json';

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);
</script>

<template>
  <div>
    <div class="flex flex-col gap-2 mb-4">
      <label for="title">Titre du planning</label>
      <InputText id="title" v-model="settings.title" autocomplete="off" />
    </div>

    <h4>Apparence</h4>

    <div class="flex align-items-center gap-2 mb-4">
      <Checkbox v-model="settings.rounded" inputId="rounded" :binary="true" />
      <label for="rounded"> Bords arrondis </label>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="flex flex-col w-full gap-2">
        <label>Couleur principale</label>
        <Dropdown
          v-model="settings.color"
          :options="colors"
          optionLabel="name"
          placeholder="Choisissez une couleur"
          class="w-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex gap-2 items-center">
              <span class="w-4 h-4 rounded-full" :class="`bg-${slotProps.value.code}-500`"> </span>
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex gap-2 items-center">
              <span class="w-4 h-4 rounded-full" :class="`bg-${slotProps.option.code}-500`"> </span>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label>Image de fond</label>

        <Dropdown
          v-model="settings.pattern"
          :options="patterns"
          optionLabel="name"
          placeholder="Choisissez un fond"
          class="w-full"
        />
      </div>
    </div>

    <!-- TODO : Ajouter une URL pour une image de fond custom -->
    <!-- TODO : Ajouter une URL pour un logo + positionnement du logo (gauche/droite) -->

    <div class="flex flex-col w-full gap-2 mb-4">
      <label>Typographie</label>

      <Dropdown
        v-model="settings.font"
        :options="fonts"
        optionLabel="name"
        placeholder="Choisissez une typographie"
        class="w-full"
      >
        <template #value="slotProps">
          <span :class="`font-${slotProps.value?.code}`">
            {{ slotProps.value ? slotProps.value.name : slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <span :class="`font-${slotProps.option.code}`">{{ slotProps.option.name }}</span>
        </template>
      </Dropdown>
    </div>

    <h4>Masquer les jours sans événement</h4>

    <div class="flex gap-4 items-center">
      <div class="flex align-items-center gap-2 mb-4">
        <Checkbox
          v-model="settings.hideEmptyLandscape"
          inputId="hide-empty-landscape"
          :binary="true"
        />
        <label for="hide-empty-landscape"> Paysage </label>
      </div>

      <div class="flex align-items-center gap-2 mb-4">
        <Checkbox
          v-model="settings.hideEmptyPortrait"
          inputId="hide-empty-portrait"
          :binary="true"
        />
        <label for="hide-empty-portrait"> Portrait </label>
      </div>
    </div>

    <h4>Réseaux sociaux numériques</h4>

    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2" v-for="i in [0, 1, 2, 3, 4]">
        <Dropdown
          v-model="settings.links[i].type"
          :options="socials"
          optionLabel="name"
          placeholder="Type"
          class="w-full"
        />
        <InputText
          v-model="settings.links[i].value"
          placeholder="Pseudo / URL"
          class="w-full"
          autocomplete="off"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
h4 {
  @apply my-0 uppercase mb-4;
  color: var(--primary-color);
}

label {
  @apply font-semibold;
}
</style>
