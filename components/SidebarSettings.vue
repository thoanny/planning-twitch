<script setup>
import colors from "~/data/colors.json";
import patterns from "~/data/patterns.json";
import fonts from "~/data/fonts.json";

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);
</script>

<template>
  <div class="space-y-3">
    <h4>Apparence</h4>

    <UCheckbox v-model="settings.borderRadius" label="Bords arrondis" />

    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
      <UFormGroup label="Couleur principale" class="w-full">
        <USelectMenu
          v-model="settings.background.color"
          :options="colors"
          option-attribute="name"
        >
          <template #label>
            <span
              :class="[
                `bg-${settings.background.color.id}-400`,
                'inline-block h-4 w-4 flex-shrink-0 rounded-full',
              ]"
              aria-hidden="true"
            ></span>
            <span class="truncate">{{ settings.background.color.name }}</span>
          </template>

          <template #option="{ option: color }">
            <span
              :class="[
                `bg-${color.id}-400`,
                'inline-block h-4 w-4 flex-shrink-0 rounded-full',
              ]"
              aria-hidden="true"
            ></span>
            <span class="truncate">{{ color.name }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>
      <UFormGroup label="Image de fond" class="w-full">
        <USelectMenu v-model="settings.background.pattern" :options="patterns">
        </USelectMenu>
      </UFormGroup>
    </div>

    <UFormGroup label="Typographie">
      <USelectMenu
        v-model="settings.font"
        :options="fonts"
        option-attribute="name"
      >
        <template #label>
          <span class="truncate" :class="`font-${settings.font.id}`">{{
            settings.font.name
          }}</span>
        </template>

        <template #option="{ option: font }">
          <span class="truncate" :class="`font-${font.id}`">{{
            font.name
          }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>

    <h4>Contenu</h4>

    <UFormGroup label="Titre du planning">
      <UInput v-model="settings.title.text" />
    </UFormGroup>
    <UCheckbox
      v-model="settings.hideEmpty"
      label="Masquer les jours sans événement"
    />

    <h4>Réseaux sociaux numériques</h4>

    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
      <UFormGroup label="Twitch">
        <UInput v-model="settings.links.twitch" />
      </UFormGroup>
      <UFormGroup label="Instagram">
        <UInput v-model="settings.links.instagram" />
      </UFormGroup>
      <UFormGroup label="X (Twitter)">
        <UInput v-model="settings.links.twitter" />
      </UFormGroup>
      <UFormGroup label="YouTube">
        <UInput v-model="settings.links.youtube" />
      </UFormGroup>
      <UFormGroup label="TikTok">
        <UInput v-model="settings.links.tiktok" />
      </UFormGroup>
    </div>
  </div>
</template>
