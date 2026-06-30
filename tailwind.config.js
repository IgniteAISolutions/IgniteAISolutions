/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#021129',
        ignite: {
          navy: '#021129',
          navy2: '#0a1b38',
          orange: '#F97316',
          orangeDark: '#e2530a',
          blue: '#3B82F6',
          light: '#EAF0FB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}