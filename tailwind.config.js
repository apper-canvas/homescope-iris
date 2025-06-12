/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C5530',
        secondary: '#8B7355',
        accent: '#D4AF37',
        surface: {
          50: '#FAFAF8',
          100: '#F5F2ED',
          200: '#E5E0D8',
          300: '#D0C8B8',
          400: '#B8AC98',
          500: '#8B7355',
          600: '#6B5A45',
          700: '#4A3F35',
          800: '#2A2520',
          900: '#1A1510'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'Georgia', 'serif']
      },
      animation: {
        'heart': 'heart 0.3s ease-in-out',
        'lift': 'lift 0.2s ease-out'
      },
      keyframes: {
        heart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' }
        },
        lift: {
          'from': { transform: 'translateY(0)' },
          'to': { transform: 'translateY(-4px)' }
        }
      }
    },
  },
  plugins: [],
}