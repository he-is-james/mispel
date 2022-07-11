/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#33658A',
        'sky': '#86BBD8',
        'camo': '#758E4F',
        'green': '#32CA54',
        'yellow': '#F6AE2D',
        'orange': '#F26419',
        'white': '#FFFFFF',
        'black': '#000000',
      },
    },
    fontFamily: {
      rubikone: ["rubik-one", "sans-serif"]
    }
  },
  plugins: [],
}
