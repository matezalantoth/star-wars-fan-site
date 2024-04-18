/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/sections/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '128': '26rem',
      },
      backgroundImage: {
        'hut-background': "url('/assets/hut.png')",
        'starwars-background': "url('./assets/test.png')",
      },
      animation: {
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
