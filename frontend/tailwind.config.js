/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'suns-purple': {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#843dff',
          600: '#7c1fff',
          700: '#6b0ef7',
          800: '#5a0dd3',
          900: '#4c0fa8',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}