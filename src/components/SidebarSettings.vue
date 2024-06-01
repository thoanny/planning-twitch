<script setup>
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings.js';
import draggable from 'vuedraggable';

import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import colors from '@/data/colors.json';
import patterns from '@/data/patterns.json';
import fonts from '@/data/fonts.json';
import socials from '@/data/socials.json';

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);

if (!settings.value.pattern?.code) {
  settings.value.pattern = patterns.find((pattern) => pattern.code === 'topography');
}
if (!settings.value.color?.code) {
  settings.value.color = colors.find((color) => color.code === 'purple');
}
if (!settings.value.font?.code) {
  settings.value.font = fonts.find((font) => font.code === 'sans');
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-2 mb-4">
      <label for="title">Titre du planning</label>
      <InputText id="title" v-model="settings.title" autocomplete="off" />
    </div>

    <h4>Apparence</h4>

    <div class="flex flex-col gap-2 mb-4">
      <label for="logo">Image du logo</label>
      <div class="flex items-center gap-2">
        <InputText id="logo" v-model="settings.logo" type="url" autocomplete="off" class="flex-1" />
        <Button
          :icon="settings.align ? 'pi pi-align-right' : 'pi pi-align-left'"
          outlined
          severity="secondary"
          @click="settings.align = !settings.align"
        />
      </div>
    </div>

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

    <div class="flex flex-col gap-2 mb-4" v-if="settings.pattern.code === 'custom'">
      <label for="background-landscape">Image de fond (paysage)</label>
      <InputText
        id="background-landscape"
        v-model="settings.background.landscape"
        type="url"
        autocomplete="off"
      />
    </div>

    <div class="flex flex-col gap-2 mb-4" v-if="settings.pattern.code === 'custom'">
      <label for="background-landscape">Image de fond (portrait)</label>
      <InputText
        id="background-landscape"
        v-model="settings.background.portrait"
        type="url"
        autocomplete="off"
      />
    </div>

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
          v-model="settings.hideEmpty.landscape"
          inputId="hide-empty-landscape"
          :binary="true"
        />
        <label for="hide-empty-landscape"> Paysage </label>
      </div>

      <div class="flex align-items-center gap-2 mb-4">
        <Checkbox
          v-model="settings.hideEmpty.portrait"
          inputId="hide-empty-portrait"
          :binary="true"
        />
        <label for="hide-empty-portrait"> Portrait </label>
      </div>
    </div>

    <h4>Réseaux sociaux numériques</h4>

    <draggable v-model="settings.links" item-key="type" handle=".handle" class="mt-4 space-y-2">
      <template #item="{ element: link }">
        <div class="grid grid-cols-2 gap-2">
          <div class="flex gap-2 items-center">
            <div class="handle cursor-grab"><span class="pi pi-bars"></span></div>
            <Dropdown
              v-model="link.type"
              :options="socials"
              optionLabel="name"
              placeholder="Type"
              class="w-full"
            />
          </div>
          <InputText
            v-model="link.value"
            placeholder="Pseudo / URL"
            class="w-full"
            autocomplete="off"
          />
        </div>
      </template>
    </draggable>
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
