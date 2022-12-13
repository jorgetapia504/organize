/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1440': '1440px',
        '600': '600px'
      },
      minHeight: {
        'mscreen': '800px'
      }
    },
  },
  plugins: [],
}
