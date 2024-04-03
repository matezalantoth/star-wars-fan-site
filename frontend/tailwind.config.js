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
    extend: {},
  },
  plugins: [],
};
