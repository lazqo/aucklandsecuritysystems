import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Option A — Deep Navy + Warm Amber
        brand: {
          50:  '#EBF0F7',
          100: '#C8D5E8',
          200: '#96AACB',
          300: '#637FAC',
          400: '#3A5A8C',
          500: '#1E3D6D',
          600: '#0F2240', // primary deep navy
          700: '#091929',
          800: '#050F19',
          900: '#020609',
        },
        accent: {
          50:  '#FEF8ED',
          100: '#FCE9C2',
          200: '#F9CE7B',
          300: '#F4B03A',
          400: '#E8A020', // primary amber
          500: '#C88010',
          600: '#A06308',
          700: '#7C4705',
        },
        surface: {
          DEFAULT: '#F7F5F2', // warm off-white
          warm:    '#F0EDE8',
        },
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)',    'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
