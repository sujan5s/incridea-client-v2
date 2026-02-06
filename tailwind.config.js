/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        liquid: 'liquid 1s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'move-left': 'move-left 60s linear infinite',
      },
      keyframes: {
        liquid: {
          '0%, 100%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(50%)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'move-left': {
          '0%': { 'background-position-x': '0px' },
          '100%': { 'background-position-x': '-1920px' }, // Moves to left by one full standard width
        },
      },
      animation: {
        liquid: 'liquid 1s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'move-left': 'move-left 60s linear infinite',
        'parallax-fast': 'move-left 20s linear infinite',
        'parallax-mid': 'move-left 40s linear infinite',
        'parallax-slow': 'move-left 60s linear infinite',
      },
    },
  },
  plugins: [ require('tailwind-scrollbar'),],
  plugins: [],
} 

