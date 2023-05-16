/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/hooks/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './node_modules/usehooks-ts/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage:{
        'landing': "url('../public/landing.jpg')"
      },
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        "theme-1-1": "#8EE4AF",
        "theme-1-2": "#EDF5E1",
        "theme-1-3": "#5CDB95",
        "theme-1-4": "#907163",
        "theme-1-5": "#379683",
      },
    },
    /*fontFamily: {
      sans: ['Roboto']
    },*/
  },
  plugins: [],
}

