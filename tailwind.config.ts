import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0E1A',
          dark: '#060810',
          card: '#161B27',
        },
        github: '#0D1117',
        'accent-cyan': '#00D9FF',
        'accent-violet': '#7C3AED',
        'accent-amber': '#F59E0B',
        'accent-blue': '#4F8EF7',
        text: {
          primary: '#F0F6FC',
          muted: '#8B949E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        zh: ['"Noto Sans TC"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
