/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        heritageBrown: '#4B2C20',
        heritageGold: '#D49D35',
        leafGreen: '#557C3E',
        chiliRed: '#9E1B1B',
      },
    },
  },
  plugins: [],
};
