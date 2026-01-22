import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c5a059',
        'background-light': '#f9f8f6',
        'background-dark': '#1a2b3c',
        abyss: '#1a2b3c',
        ecru: '#f9f8f6',
        'warm-grey': '#f2f1ee',
        'cream-gold': '#f5f3ef',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
export default config
