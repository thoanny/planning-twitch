<template>
  <InputColor v-model="model" format="hex">
    <InputColorSwatch @click="(e) => op.toggle(e)" style="cursor: pointer">
      <InputColorSwatchBackground />
    </InputColorSwatch>
    <Popover ref="op">
      <div class="w-72 p-3 space-y-3">
        <InputColorArea>
          <InputColorAreaBackground />
          <InputColorAreaHandle />
        </InputColorArea>
        <InputColorSlider>
          <InputColorSliderTrack />
          <InputColorSliderHandle />
        </InputColorSlider>
        <div class="flex items-center gap-2">
          <InputColorInput channel="hex" class="flex-1" />
          <InputColorEyeDropper iconOnly severity="secondary" variant="outlined">
            <template #icon>
              <EyeDropper />
            </template>
          </InputColorEyeDropper>
        </div>
        <div class="grid grid-cols-8 gap-2">
          <div
            class="color-swatch"
            :style="{ backgroundColor: color }"
            @click="model = color"
            v-for="color in swatches"
            :key="color"
          ></div>
        </div>
      </div>
    </Popover>
  </InputColor>
</template>

<script setup lang="js">
import { EyeDropper } from '@primeicons/vue';
import {
  InputColor,
  InputColorArea,
  InputColorAreaBackground,
  InputColorAreaHandle,
  InputColorEyeDropper,
  InputColorInput,
  InputColorSlider,
  InputColorSliderHandle,
  InputColorSliderTrack,
  InputColorSwatch,
  InputColorSwatchBackground,
  Popover,
} from 'primevue';
import { ref } from 'vue';

const model = defineModel();

const op = ref();

const swatches = [
  '#faf5ff', // 50
  '#9810fa', // 600
  '#8200db', // 700
  '#6e11b0', // 800
  '#f7fee7',
  '#5ea500',
  '#497d00',
  '#3c6300',
];
</script>

<style scoped>
.color-swatch {
  border: 1px solid var(--p-inputtext-border-color);
  border-radius: var(--p-inputtext-border-radius);
  width: 100%;
  aspect-ratio: 1;
}
.color-swatch:hover {
  border-color: var(--p-inputtext-hover-border-color);
}
</style>
