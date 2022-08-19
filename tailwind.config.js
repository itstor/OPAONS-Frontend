/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'left-corner-decor': 'url("/images/background/left-corner-decor.png")',
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
        'secondary-100': '#FEFCF4',
        'secondary-200': '#FEF8E9',
        'secondary-300': '#FCF3DD',
        'secondary-400': '#FAEDD4',
        'secondary-500': '#F8E5C5',
        'secondary-600': '#D5B890',
        'secondary-700': '#B28E63',
        'secondary-800': '#8F683E',
        'secondary-900': '#774C25',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
