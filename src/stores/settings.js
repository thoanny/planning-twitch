import { defineStore } from 'pinia';
import { ref } from 'vue';

import colors from '@/data/colors.json';
import patterns from '@/data/patterns.json';
import fonts from '@/data/fonts.json';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const data = ref({
      rounded: true,
      color: colors.find((color) => color.code === 'purple'),
      pattern: patterns.find((pattern) => pattern.code === 'topography'),
      font: fonts.find((font) => font.code === 'sans'),
      title: 'Mon planning Twitch',
      hideEmpty: false,
      links: [
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
        {
          type: '',
          value: '',
        },
      ],
    });

    return { data };
  },
  {
    persist: {
      key: 'settings-v2',
    },
  },
);
