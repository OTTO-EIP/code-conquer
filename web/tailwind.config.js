/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(138deg, rgba(91,86,167,1) 0%, rgba(5,0,83,1) 43%, rgba(80,75,156,1) 100%)',
      },
    },
  },
  plugins: [],
}

