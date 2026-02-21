/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎓 Traditional Academic Palette
        'tu-maroon': '#7B1E3A',      // Primary
        'tu-wine': '#5A1429',        // Secondary
        'tu-cream': '#F3E9DC',       // Accent
        'tu-off-white': '#FAFAF8',   // Background
        'tu-text': '#2B2B2B',        // Text
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
