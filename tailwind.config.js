/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'corner-login': 'url("/images/background/corner-decor.svg")',
      },
      colors: {
        'primary-100': '#FFF6E7',
        'primary-200': '#FDF0C4',
        'primary-300': '#FCE4A6',
        'primary-400': '#FAD891',
        'primary-500': '#F8C66D',
        'primary-600': '#D5A050',
        'primary-700': '#B27C36',
        'primary-800': '#8F5D22',
        'primary-900': '#774514',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
