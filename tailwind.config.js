/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#111113',
          850: '#16161a',
          800: '#1c1c21',
          700: '#26262d',
          600: '#34343d',
          500: '#4a4a55',
        },
        blood: {
          400: '#ff4d5a',
          500: '#e11d2e',
          600: '#c0101f',
          700: '#8f0c17',
        },
        corner: {
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
