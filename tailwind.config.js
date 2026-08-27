/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgLight: '#F7F7F7',
        surfaceLight: '#FFFFFF',
        textPrimary: '#111111',
        textSecondary: '#666666',
        accentBlue: '#2563EB',
        accentGreen: '#22C55E',
        borderLight: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
      },
    },
  },
  plugins: [],
};
