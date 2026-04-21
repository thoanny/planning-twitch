<script setup>
import { useSettingsStore } from '@/stores/settings.js';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';

import fonts from '@/data/fonts.json';
import patterns from '@/data/patterns.json';
import socials from '@/data/socials.json';
import SelectButton from 'primevue/selectbutton';
import Slider from 'primevue/slider';
import MediaDropdown from './MediaDropdown.vue';
import MediaUploader from './MediaUploader.vue';

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);
</script>

<template>
  <MediaUploader class="" />

  <!-- <Dropdown :options="[]" optionLabel="name" placeholder="Set de paramètres" class="w-full mt-4" /> -->

  <div class="-mx-4 -mb-4">
    <Accordion :activeIndex="0">
      <AccordionTab header="Général">
        <!-- <div class="flex flex-col gap-2 mb-4">
          <label for="settings.name">Intitulé des paramètres</label>
          <InputText id="settings.name" v-model="settings.name" autocomplete="off" />
        </div> -->
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.title">Titre du planning</label>
          <InputText id="settings.title" v-model="settings.title" autocomplete="off" />
        </div>
        <div class="flex flex-col w-full gap-2 mb-4">
          <label for="settings.fontFamily">Typographie</label>
          <Dropdown
            v-model="settings.fontFamily"
            :options="fonts"
            optionLabel="name"
            optionValue="code"
            placeholder="Choisissez une typographie"
            class="w-full"
            id="settings.fontFamily"
          >
            <template #value="slotProps">
              <span :class="`font-${slotProps.value}`">
                {{ fonts.find((font) => font.code === slotProps.value)?.name }}
              </span>
            </template>
            <template #option="slotProps">
              <span :class="`font-${slotProps.option.code}`">{{ slotProps.option.name }}</span>
            </template>
          </Dropdown>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.fontColor">Couleur du texte</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.fontColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.fontColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.fontColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.borderRadius">Taille de l'arrondi</label>
          <div class="flex gap-2 items-center">
            <Slider
              v-model="settings.borderRadius"
              class="w-full"
              :min="0"
              :max="32"
              :step="4"
              id="settings.borderRadius"
            />
            <span class="w-12 text-end shrink-0">{{ settings.borderRadius }}px</span>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Fond">
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.backgroundColor">Couleur de fond</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.backgroundColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.backgroundColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.backgroundColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col w-full gap-2 mb-4">
          <label for="settings.backgroundPattern">Image de fond</label>
          <Dropdown
            v-model="settings.backgroundPattern"
            :options="patterns"
            optionLabel="name"
            optionValue="code"
            placeholder="Choisissez un fond"
            class="w-full"
            id="settings.backgroundPattern"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <div
                  class="h-12 w-24 border rounded bg-[50%]"
                  :class="[`bg-pattern-${slotProps.option.code}`]"
                ></div>
                <div class="truncate">
                  {{ slotProps.option.name }}
                </div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="flex flex-col gap-2 mb-4" v-if="settings.backgroundPattern === 'custom'">
          <label for="settings.landscapeBackgroundImage">Image de fond (paysage)</label>
          <MediaDropdown
            id="settings.landscapeBackgroundImage"
            v-model="settings.landscapeBackgroundImage"
          />
        </div>
        <div class="flex flex-col gap-2 mb-4" v-if="settings.backgroundPattern === 'custom'">
          <label for="settings.portraitBackgroundImage">Image de fond (portrait)</label>
          <MediaDropdown
            id="settings.portraitBackgroundImage"
            v-model="settings.portraitBackgroundImage"
          />
        </div>
      </AccordionTab>
      <AccordionTab header="Logo">
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.logoImage">Image du logo</label>
          <MediaDropdown v-model="settings.logoImage" id="settings.globalLogo" />
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="">Disposition du logo</label>
          <SelectButton
            v-model="settings.logoAlignment"
            optionLabel="name"
            optionValue="id"
            :options="[
              { id: 'left', name: 'Aligner à gauche' },
              { id: 'right', name: 'Aligner à droite' },
            ]"
            id="settings.logoAlignment"
            :pt="{ root: { class: 'w-full' } }"
            :allowEmpty="false"
          />
        </div>
      </AccordionTab>
      <AccordionTab header="Titre">
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.headingFontSizeLandscape">Taille (paysage)</label>
          <div class="flex gap-2 items-center">
            <Slider
              v-model="settings.headingFontSizeLandscape"
              class="w-full"
              :min="16"
              :max="96"
              :step="4"
              id="settings.headingFontSizeLandscape"
            />
            <span class="w-12 text-end shrink-0">{{ settings.headingFontSizeLandscape }}px</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.headingFontSizePortrait">Taille (portrait)</label>
          <div class="flex gap-2 items-center">
            <Slider
              v-model="settings.headingFontSizePortrait"
              class="w-full"
              :min="16"
              :max="96"
              :step="4"
              id="settings.headingFontSizePortrait"
            />
            <span class="w-12 text-end shrink-0">{{ settings.headingFontSizePortrait }}px</span>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Événements">
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.eventBackgroundPrimaryColor">Couleur principale</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.eventBackgroundPrimaryColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.eventBackgroundPrimaryColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.eventBackgroundPrimaryColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.eventBackgroundSecondaryColor">Couleur secondaire</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.eventBackgroundSecondaryColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.eventBackgroundSecondaryColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.eventBackgroundSecondaryColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.eventFontColor">Couleur de texte</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.eventFontColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.eventFontColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.eventFontColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.eventFontSizeLandscape">Taille du texte (paysage)</label>
          <div class="flex gap-2 items-center">
            <Slider
              v-model="settings.eventFontSizeLandscape"
              class="w-full"
              :min="16"
              :max="32"
              :step="4"
              id="settings.eventFontSizeLandscape"
            />
            <span class="w-12 text-end shrink-0">{{ settings.eventFontSizeLandscape }}px</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.eventFontSizePortrait">Taille du texte (portrait)</label>
          <div class="flex gap-2 items-center">
            <Slider
              v-model="settings.eventFontSizePortrait"
              class="w-full"
              :min="16"
              :max="32"
              :step="4"
              id="settings.eventFontSizePortrait"
            />
            <span class="w-12 text-end shrink-0">{{ settings.eventFontSizePortrait }}px</span>
          </div>
        </div>

        <div class="flex flex-col w-full gap-2 mb-4">
          <label>Masquer les jours sans événement</label>
          <div class="flex gap-4 items-center">
            <div class="flex align-items-center gap-2">
              <Checkbox
                v-model="settings.hideEmptyLandscape"
                inputId="settings.hideEmptyLandscape"
                :binary="true"
              />
              <label for="settings.hideEmptyLandscape" class="!font-normal"> Paysage </label>
            </div>

            <div class="flex align-items-center gap-2">
              <Checkbox
                v-model="settings.hideEmptyPortrait"
                inputId="settings.hideEmptyPortrait"
                :binary="true"
              />
              <label for="settings.hideEmptyPortrait" class="!font-normal"> Portrait </label>
            </div>
          </div>
        </div>
      </AccordionTab>
      <AccordionTab header="Liens">
        <div class="flex flex-col gap-2 mb-4">
          <label>Réseaux sociaux numériques</label>
          <draggable v-model="settings.links" item-key="type" handle=".handle" class="space-y-2">
            <template #item="{ element: link }">
              <div class="grid grid-cols-2 gap-2">
                <div class="flex gap-2 items-center">
                  <div class="handle cursor-grab"><span class="pi pi-bars"></span></div>
                  <Dropdown
                    v-model="link.type"
                    :options="socials"
                    optionLabel="name"
                    optionValue="code"
                    placeholder="Type"
                    class="w-full"
                    :showClear="true"
                  />
                </div>
                <InputText
                  v-model="link.value"
                  placeholder="Pseudo / URL"
                  class="w-full"
                  autocomplete="off"
                  :showClear="true"
                />
              </div>
            </template>
          </draggable>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.linkBackgroundColor">Couleur de fond</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.linkBackgroundColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.linkBackgroundColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.linkBackgroundColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="settings.linkIconColor">Couleur de l'icône</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.linkIconColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.linkIconColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.linkIconColor" />
          </InputGroup>
        </div>
        <div class="flex flex-col gap-2">
          <label for="settings.linkFontColor">Couleur du texte</label>
          <InputGroup>
            <InputGroupAddon :pt="{ root: { class: 'p-0' } }">
              <input
                type="color"
                v-model="settings.linkFontColor"
                class="block p-0 m-0 border-0 size-8 bg-transparent"
                id="settings.linkFontColor"
              />
            </InputGroupAddon>
            <InputText v-model="settings.linkFontColor" />
          </InputGroup>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
  <!-- <pre>{{ settings }}</pre> -->
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
