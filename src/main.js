import '@/assets/main.css';
import '@globalhive/vuejs-tour/dist/style.css';
import 'primeicons/primeicons.css';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import { createColoris } from './plugins/colorisPlugin';

import { definePreset } from '@primeuix/themes';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const AuraPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    },
    surface: {
      0: '#ffffff',
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
  },
});

const coloris = createColoris({
  theme: 'polaroid',
  alpha: false,
  swatches: [
    '#faf5ff', // 50
    '#9810fa', // 600
    '#8200db', // 700
    '#6e11b0', // 800
    '#f7fee7',
    '#5ea500',
    '#497d00',
    '#3c6300',
  ],
});

app.use(pinia);
app.use(PrimeVue, {
  theme: { preset: AuraPreset },
});
app.use(ToastService);
app.use(coloris);

app.mount('#app');
