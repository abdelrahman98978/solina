/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        toyota: {
          red: '#EB0A1E',
          darkRed: '#BA0817',
          deepRed: '#8E0611',
          black: '#000000',
          dark: '#121212',
          surface: '#F5F5F5',
          card: '#FFFFFF',
          border: '#E5E5E5',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        }
      },
      fontFamily: {
        arabic: ['"Cairo"', '"Readex Pro"', 'sans-serif'],
        display: ['"Cairo"', 'sans-serif'],
      },
      boxShadow: {
        'toyota': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'toyota-hover': '0 12px 30px -4px rgba(235, 10, 30, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'card-glow': '0 0 25px rgba(235, 10, 30, 0.15)',
      }
    },
  },
  plugins: [],
}
