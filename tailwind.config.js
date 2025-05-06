/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006D6F',
          dark: '#005657',
          light: '#42898b',
        },
        secondary: {
          DEFAULT: '#18794e',
          dark: '#145e3e',
          light: '#4b9e72',
        },
        accent: {
          DEFAULT: '#00B5B8',
          dark: '#009698',
          light: '#33c4c6',
        },
        success: {
          DEFAULT: '#16a34a',
          dark: '#15803d',
          light: '#4ade80',
        },
        warning: {
          DEFAULT: '#ca8a04',
          dark: '#a16207',
          light: '#facc15',
        },
        error: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
          light: '#f87171',
        },
        background: '#ffffff',
        input: '#e5e7eb',
        ring: '#006D6F',
      },
      borderRadius: {
        DEFAULT: '0.375rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};