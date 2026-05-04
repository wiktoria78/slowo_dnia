/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#722F37',
        secondary: '#C9A227',
        background: '#FDF5E6',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        accent: '#228B22',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Merriweather', 'serif'],
        'ui': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}