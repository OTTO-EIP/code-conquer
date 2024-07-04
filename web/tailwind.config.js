/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(19,45,70,1) 0%, rgba(1,195,141,1) 50%, rgba(105,110,121,1) 100%);',
      },
      colors: {
        'green': '#27c906',
        'light-grey': 'rgba(0,0,0,0.1)',
        'back': '#132D46'
      }
    },
  },
  plugins: [],
}

