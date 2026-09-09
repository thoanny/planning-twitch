import '@/assets/main.css';
import '@globalhive/vuejs-tour/dist/style.css';
import 'primeicons/primeicons.css';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import { definePreset } from '@primeuix/themes';
import { createApp } from 'vue';
import App from './App.vue';

const PrimeUILicenseKey = import.meta.env.VITE_PRIMEUI_LICENSE_KEY;

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

app.use(pinia);
app.use(PrimeVue, {
  theme: { preset: AuraPreset },
  license: PrimeUILicenseKey,
});
app.use(ToastService);

app.mount('#app');
