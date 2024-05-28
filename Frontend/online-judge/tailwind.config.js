/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  theme: {
    extend: {},
  },
  plugins: [],
}
