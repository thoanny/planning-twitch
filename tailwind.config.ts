import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        "noto-sans": ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
        nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans],
        oswald: ['"Oswald"', ...defaultTheme.fontFamily.sans],
        quicksand: ['"Quicksand"', ...defaultTheme.fontFamily.sans],
        arial: ['"Arial"', ...defaultTheme.fontFamily.sans],
        "courier-new": ['"Courier New"', ...defaultTheme.fontFamily.serif],
        georgia: ['"Georgia"', ...defaultTheme.fontFamily.serif],
        impact: ['"Impact"', ...defaultTheme.fontFamily.sans],
        "times-new-roman": [
          '"Times New Roman"',
          ...defaultTheme.fontFamily.serif,
        ],
        "trebuchet-ms": ['"Trebuchet MS"', ...defaultTheme.fontFamily.sans],
        verdana: ['"Verdana"', ...defaultTheme.fontFamily.sans],
        "josefin-sans": ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
        jost: ['"Jost"', ...defaultTheme.fontFamily.sans],
        lexend: ['"Lexend"', ...defaultTheme.fontFamily.sans],
        "libre-franklin": ['"Libre Franklin"', ...defaultTheme.fontFamily.sans],
        lora: ['"Lora"', ...defaultTheme.fontFamily.serif],
        "noto-serif": ['"Noto Serif"', ...defaultTheme.fontFamily.serif],
        "open-sans": ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        outfit: ['"Outfit"', ...defaultTheme.fontFamily.sans],
        "roboto-flex": ['"Roboto Flex"', ...defaultTheme.fontFamily.sans],
        rubik: ['"Rubik"', ...defaultTheme.fontFamily.sans],
        urbanist: ['"Urbanist"', ...defaultTheme.fontFamily.sans],
        vollkorn: ['"Vollkorn"', ...defaultTheme.fontFamily.serif],
        "work-sans": ['"Work Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
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
