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
      boxShadow: {
        'left-lg': '8px 0 15px -3px rgba(0, 0, 0, 0.1), 8px 0 6px -2px rgba(0, 0, 0, 0.05)',
        'left-md': '4px 0 10px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)',
        'left-sm': '2px 0 5px -3px rgba(0, 0, 0, 0.1), 2px 0 3px -2px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        'green': '#27c906',
        'light-grey': 'rgba(0,0,0,0.1)',
        'back': '#132D46',
        'customBronze': '#E4624C',
        'customGold': '#FDDB8D',
        'green-opacity-40': 'rgba(0, 128, 0, 0.05)',
        'customSilver': '#E0E4F8'
      },
    },
  },
  plugins: [],
}

