<script setup>
import MediaDropdown from '@/components/MediaDropdown.vue';
import MediaUploader from '@/components/MediaUploader.vue';
import fonts from '@/data/fonts.json';
import patterns from '@/data/patterns.json';
import socials from '@/data/socials.json';
import { useSettingsStore } from '@/stores/settings.js';
import { storeToRefs } from 'pinia';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
  Checkbox,
  InputText,
  Select,
  SelectButton,
  Slider,
} from 'primevue';
import draggable from 'vuedraggable';

const settingsStore = useSettingsStore();
const { resetData } = settingsStore;
const { data: settings } = storeToRefs(settingsStore);
</script>

<template>
  <MediaUploader class="" />

  <!-- <Select :options="[]" optionLabel="name" placeholder="Set de paramètres" class="w-full mt-4" /> -->

  <div class="-mx-4 -mb-4">
    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader>Général</AccordionHeader>
        <AccordionContent>
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
            <Select
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
            </Select>
          </div>
          <div class="flex flex-col gap-2 mb-4">
            <label for="settings.fontColor">Couleur du texte</label>
            <VueColoris v-model="settings.fontColor" inputId="settings.fontColor" />
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
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader>Fond</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-2 mb-4">
            <label for="settings.backgroundColor">Couleur de fond</label>
            <VueColoris v-model="settings.backgroundColor" inputId="settings.backgroundColor" />
          </div>
          <div class="flex flex-col w-full gap-2 mb-4">
            <label for="settings.backgroundPattern">Image de fond</label>
            <Select
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
            </Select>
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
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="2">
        <AccordionHeader>Logo</AccordionHeader>
        <AccordionContent>
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
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="3">
        <AccordionHeader>Titre</AccordionHeader>
        <AccordionContent>
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
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="4">
        <AccordionHeader>Événements</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-2 mb-4">
            <label for="settings.eventBackgroundPrimaryColor">Couleur principale</label>
            <VueColoris
              v-model="settings.eventBackgroundPrimaryColor"
              inputId="settings.eventBackgroundPrimaryColor"
            />
          </div>
          <div class="flex flex-col gap-2 mb-4">
            <label for="settings.eventBackgroundSecondaryColor">Couleur secondaire</label>
            <VueColoris
              v-model="settings.eventBackgroundSecondaryColor"
              inputId="settings.eventBackgroundSecondaryColor"
            />
          </div>
          <div class="flex flex-col gap-2 mb-4">
            <label for="settings.eventFontColor">Couleur de texte</label>
            <VueColoris v-model="settings.eventFontColor" inputId="settings.eventFontColor" />
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
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="5">
        <AccordionHeader>Liens</AccordionHeader>
        <AccordionContent>
          <div class="flex flex-col gap-2 mb-4">
            <label>Réseaux sociaux numériques</label>
            <draggable v-model="settings.links" item-key="type" handle=".handle" class="space-y-2">
              <template #item="{ element: link }">
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex gap-2 items-center">
                    <div class="handle cursor-grab"><span class="pi pi-bars"></span></div>
                    <Select
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
            <VueColoris
              v-model="settings.linkBackgroundColor"
              inputId="settings.linkBackgroundColor"
            />
          </div>
          <div class="flex flex-col gap-2 mb-4">
            <label for="settings.linkIconColor">Couleur de l'icône</label>
            <VueColoris v-model="settings.linkIconColor" inputId="settings.linkIconColor" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="settings.linkFontColor">Couleur du texte</label>
            <VueColoris v-model="settings.linkFontColor" inputId="settings.linkFontColor" />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
    <!-- TODO -->
    <div class="p-4">
      <Button
        label="Réinitialiser les paramètres"
        variant="outlined"
        severity="danger"
        size="small"
        class="w-full"
        @click="resetData"
      />
    </div>
  </div>
  <!-- <pre>{{ settings }}</pre> -->
</template>

<style scoped>
@reference 'tailwindcss';

label {
  @apply font-semibold;
}

.p-accordion {
  --p-accordion-header-active-color: var(--p-primary-color);
  --p-accordion-header-active-hover-color: var(--p-primary-color);
}
</style>
