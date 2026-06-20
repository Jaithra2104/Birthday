/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          300: '#ffb6c1',
          400: '#ff8da1',
          500: '#ff6b8b',
          900: '#881337',
        },
        gold: {
          400: '#facc15',
          500: '#eab308',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
