const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight:{
        "almost-screen":"60vh"
      },
      fontFamily:{
        sanchez:['Sanchez', ...defaultTheme.fontFamily.serif],
        merriweather:['Merriweather', ...defaultTheme.fontFamily.serif],
        montserrat:['Montserrat', ...defaultTheme.fontFamily.sans],
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
