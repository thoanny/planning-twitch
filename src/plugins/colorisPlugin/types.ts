import type { ColorisOptions } from '@melloware/coloris'

import type VueColoris from './components/VueColoris.vue'

type InputOptions = {
  previewOnly?: boolean
}
export type PluginOptions = Partial<Omit<ColorisOptions, 'onChange'>> & InputOptions

export * from './index'

declare module 'vue' {
  interface GlobalComponents {
    VueColoris: typeof VueColoris
  }
}
