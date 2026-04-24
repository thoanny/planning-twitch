<script setup lang="ts">
import Coloris from '@melloware/coloris';
import { computed, inject, onMounted } from 'vue';

import { injectionKey, type PluginOptions } from '../types';

const props = defineProps<{
  options?: PluginOptions;
  value?: string;
  modelValue?: string;
  inputId?: string;
}>();
const emits = defineEmits<{
  (e: 'change', color: string): void;
  (e: 'update:model-value', color: string): void;
}>();

const globalOptions = inject(injectionKey) as PluginOptions;
const mergedOptions = computed(() => ({ ...globalOptions, ...props.options }));
const key = (Math.random() + 1).toString(36).substring(5);

const currentValue = computed(() => props.value ?? props.modelValue ?? '');

const onChangeCallback: Coloris.OnChangeCallback = (color: string) => {
  if (props.modelValue !== undefined) emits('update:model-value', color);
  emits('change', color);
};

onMounted(() => {
  const alreadyInitalised = document.querySelector('.clr-field') !== null;

  if (!alreadyInitalised) {
    Coloris.init();
    Coloris({
      ...globalOptions,
      onChange: onChangeCallback,
      el: '.coloris',
    });
  }

  Coloris.setInstance(`[data-clr-key="${key}"]`, {
    ...mergedOptions.value,
    onChange: onChangeCallback,
  });
});
</script>

<template>
  <div class="coloris-input-wrapper" :class="{ previewOnly: mergedOptions.previewOnly }">
    <input
      type="text"
      class="coloris p-inputtext p-component p-filled"
      :data-clr-key="key"
      :value="currentValue"
      :id="inputId"
    />
  </div>
</template>

<style scoped>
.coloris-input-wrapper :deep(button) {
  border-radius: var(--p-form-field-border-radius);
  cursor: pointer;
  pointer-events: all;
  height: calc(100% - 2px - 1rem);
  width: auto;
  aspect-ratio: 1;
  right: 0.5rem;
  border: 1px solid var(--p-surface-300);
  overflow: hidden;
}
.coloris-input-wrapper :deep(button:after) {
  box-shadow: none;
  border-radius: 0;
}
.coloris-input-wrapper input.coloris {
}
.coloris-input-wrapper.previewOnly :deep(button) {
  width: 100%;
  border-radius: var(--p-form-field-border-radius);
}
.coloris-input-wrapper.previewOnly input.coloris {
  width: 40px;
  height: 40px;
}
</style>
