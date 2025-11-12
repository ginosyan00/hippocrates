/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main color from Figma
        main: {
          10: '#F5F6FF',
          100: '#3A6FF8',
        },
        // Secondary color from Figma
        secondary: {
          10: '#FFF9F6',
          100: '#14CC26',
        },
        // Text colors from Figma
        text: {
          10: '#A9A9A9',
          50: '#676767',
          100: '#1C1C1C',
        },
        // Background colors from Figma
        bg: {
          primary: '#FBFBFB',
          white: '#FFFFFF',
        },
        // Stroke/Border color from Figma
        stroke: '#F1F1F1',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '15px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

