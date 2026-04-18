/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coroam: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#FFD700', // Gold/Premium feel
        }
      }
    },
  },
  plugins: [],
}
