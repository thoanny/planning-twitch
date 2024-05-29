/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        quicksand: ['"Quicksand"', 'sans-serif'],
        arial: ['"Arial"', 'sans-serif'],
        'courier-new': ['"Courier New"', 'serif'],
        georgia: ['"Georgia"', 'serif'],
        impact: ['"Impact"', 'sans-serif'],
        'times-new-roman': ['"Times New Roman"', 'serif'],
        'trebuchet-ms': ['"Trebuchet MS"', 'sans-serif'],
        verdana: ['"Verdana"', 'sans-serif'],
        'josefin-sans': ['"Josefin Sans"', 'sans-serif'],
        jost: ['"Jost"', 'sans-serif'],
        lexend: ['"Lexend"', 'sans-serif'],
        'libre-franklin': ['"Libre Franklin"', 'sans-serif'],
        lora: ['"Lora"', 'serif'],
        'noto-serif': ['"Noto Serif"', 'serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        'roboto-flex': ['"Roboto Flex"', 'sans-serif'],
        rubik: ['"Rubik"', 'sans-serif'],
        urbanist: ['"Urbanist"', 'sans-serif'],
        vollkorn: ['"Vollkorn"', 'serif'],
        'work-sans': ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  safelist: [
    {
      pattern:
        /font-(montserrat|noto-sans|nunito|oswald|quicksand|arial|courier-new|georgia|impact|times-new-roman|trebuchet-ms|verdana|josefin-sans|jost|lexend|libre-franklin|lora|noto-serif|open-sans|outfit|roboto-flex|rubik|urbanist|vollkorn|work-sans)/,
    },
    {
      pattern:
        /bg-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|400|600|700|800)/,
    },
    {
      pattern:
        /text-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|500|600)/,
    },
    {
      pattern:
        /border-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(800)/,
    },
  ],
};
