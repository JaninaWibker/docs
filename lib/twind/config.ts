import { defineConfig } from '@twind/core'
import type { TwindConfig } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTypography from '@twind/preset-typography'
import presetTailwind from '@twind/preset-tailwind'
import presetTailwindForms from '@twind/preset-tailwind-forms'

// defaults otherwise provided by tailwind
export const fontFamily = {
  sans: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ],
  serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    '"Liberation Mono"',
    '"Courier New"',
    'monospace'
  ]
}

const primary = {
  100: '#F5E2FD',
  200: '#EFD5FB',
  300: '#CDAFEF',
  400: '#AA96DF',
  500: '#B275CE',
  600: '#8E75CE',
  700: '#694BB4',
  800: '#8070A9',
  900: '#5D4D80',
  1000: '#4F3879',
} as const

const secondary = {} as const

const positive = {
  200: '#CEFDDB',
  300: '#BCF5CB',
  400: '#7DED99',
  500: '#69D384',
  600: '#52BC6D',
  700: '#479E66',
  800: '#4D8466',
} as const

const negative = {
  200: '#FCD4D9',
  300: '#F8B0BF',
  400: '#E890A0',
  500: '#D77585',
  600: '#A97070',
  700: '#A54F5C',
  800: '#804D4D',
} as const

const lightPrimary = {
  200: primary['100'],
  300: primary['200'],
  400: primary['300'],
  500: primary['400'],
  600: primary['500'],
  700: primary['600'],
  800: primary['700'],
}

const lightSecondary = {}

const lightPositive = {
  200: positive['200'],
  300: positive['300'],
  400: positive['400'],
  500: positive['500'],
  600: positive['600'],
}

const lightNegative = {
  200: negative['200'],
  300: negative['300'],
  400: negative['400'],
  500: negative['500'],
  600: negative['600'],
}

const lightGray = {} as const

const darkPrimary = {
  200: primary['300'],
  300: primary['500'],
  400: primary['600'],
  500: primary['700'],
  600: primary['800'],
  700: primary['900'],
  800: primary['1000'],
}

const darkSecondary = {}

const darkPositive = {
  200: positive['400'],
  300: positive['500'],
  400: positive['600'],
  500: positive['700'],
  600: positive['800'],
}

const darkNegative = {
  200: negative['400'],
  300: negative['500'],
  400: negative['600'],
  500: negative['700'],
  600: negative['800'],
}

// TODO: turn these into base colors and add light/dark variants using base colors
const darkGray = {
  600: '#25282B',
  700: '#281C20',
  800: '#1B1B1B',
} as const

export const baseColors = {
  primary,
  secondary,
  positive,
  negative
}

export const lightColors = {
  'light-primary': lightPrimary,
  'light-secondary': lightSecondary,
  'light-positive': lightPositive,
  'light-negative': lightNegative,
  'light-gray': lightGray
}

export const darkColors = {
  'dark-primary': darkPrimary,
  'dark-secondary': darkSecondary,
  'dark-positive': darkPositive,
  'dark-negative': darkNegative,
  'dark-gray': darkGray
}

export const colors = {
  ...baseColors,
  ...lightColors,
  ...darkColors
}

export const config = defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...baseColors,
        ...lightColors,
        ...darkColors
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        space: ['var(--font-space)', ...fontFamily.sans]
      }
    }
  },
  presets: [presetAutoprefix(), presetTailwind(), presetTailwindForms(), presetTypography()]
}) as unknown as TwindConfig

export default config
